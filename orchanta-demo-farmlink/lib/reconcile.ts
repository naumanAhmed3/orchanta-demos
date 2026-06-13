/*
 * EBT Tax Reconciliation — pure, deterministic logic. No I/O, no randomness.
 *
 * Background (the problem this demo solves):
 *   Under federal SNAP rules, items paid with EBT are exempt from sales tax —
 *   in Hawaiʻi, from the General Excise Tax (GET) passed on at checkout
 *   (Oʻahu pass-on rate ≈ 4.712%, used here as an illustrative figure).
 *   Shopify, however, records GET on the FULL order at capture time and the
 *   EBT integration then issues a tax "refund" afterwards. That refund is
 *   computed line-by-line with truncating rounding, so it routinely lands one
 *   or two pennies short of the exact exemption — and the order's receipt and
 *   tax reports no longer match what the law requires.
 *
 * What this module does, per order:
 *   1. Allocates the SNAP-EBT tender across EBT-eligible lines (in cart order,
 *      the way checkout integrations apply it).
 *   2. Computes the EXACT tax exemption to the penny: GET is due only on the
 *      portion of the order NOT paid with EBT.
 *   3. Simulates Shopify's recorded-then-refunded behaviour (per-line
 *      truncation — the "a penny or two short" failure mode) so the drift is
 *      visible next to the corrected figure.
 *   4. Builds a compliant receipt: line items, EBT tender, an explicit
 *      tax-exempt line, and GET charged on the non-EBT portion only.
 *
 * All money is handled in integer cents. The GET rate is expressed as an
 * integer fraction (4712 / 100000) so every computation is exact and
 * deterministic — no floating-point drift of our own.
 */

export interface LineItem {
  /** Product name, Farm Link style (producer + product). */
  name: string;
  /** Quantity ordered. */
  qty: number;
  /** Unit price in cents. */
  unitCents: number;
  /** SNAP-EBT eligible? (staple groceries yes; hot/prepared food no). */
  ebtEligible: boolean;
}

export interface Order {
  id: string;
  /** Fictional customer name — sample data only. */
  customer: string;
  lines: LineItem[];
  /** SNAP-EBT tender offered on this order, in cents (0 = card only). */
  ebtTenderCents: number;
}

/** Oʻahu GET pass-on rate, ~4.712%, expressed as RATE_NUM / RATE_DEN. Illustrative. */
export const RATE_NUM = 4712;
export const RATE_DEN = 100000;
export const RATE_LABEL = "4.712%";

/** Exact tax on a base amount, rounded half-up to the penny (the lawful figure). */
function taxRounded(baseCents: number): number {
  return Math.round((baseCents * RATE_NUM) / RATE_DEN);
}

/** Truncated tax on a base amount — the per-line rounding Shopify's refund uses. */
function taxTruncated(baseCents: number): number {
  return Math.floor((baseCents * RATE_NUM) / RATE_DEN);
}

/** Line total in cents. */
export function lineTotalCents(line: LineItem): number {
  return line.qty * line.unitCents;
}

/** Order subtotal in cents (all lines, before tax). */
export function subtotalCents(order: Order): number {
  return order.lines.reduce((sum, line) => sum + lineTotalCents(line), 0);
}

/**
 * Allocate the EBT tender across eligible lines, in cart order, until the
 * tender is exhausted. Returns the EBT-paid amount per line (cents), aligned
 * with `order.lines`. Ineligible lines always get 0.
 */
export function allocateEbt(order: Order): number[] {
  let remaining = order.ebtTenderCents;
  return order.lines.map((line) => {
    if (!line.ebtEligible || remaining <= 0) return 0;
    const applied = Math.min(lineTotalCents(line), remaining);
    remaining -= applied;
    return applied;
  });
}

export interface Reconciliation {
  order: Order;
  subtotal: number;
  /** EBT applied per line (cents), aligned with order.lines. */
  ebtPerLine: number[];
  /** Total of the order paid with SNAP-EBT — the tax-exempt portion. */
  ebtExempt: number;
  /** Portion of the order GET still applies to (not paid with EBT). */
  taxableBase: number;
  /** GET Shopify records at capture: tax on the FULL order. */
  shopifyRecordedTax: number;
  /** The mis-rounded refund: per-line truncated tax on each EBT-paid amount. */
  shopifyRefund: number;
  /** Net tax left on the order after Shopify's refund. */
  shopifyNetTax: number;
  /** The lawful figure: GET on the non-EBT portion only, rounded to the penny. */
  correctTax: number;
  /** shopifyNetTax − correctTax: pennies over-collected (the reported bug). */
  driftCents: number;
  /** Card/other tender due: non-EBT portion of the subtotal + correct GET. */
  cardDue: number;
  /** Compliant order total: subtotal + correct GET. */
  total: number;
}

/** Reconcile one order: exact exemption vs Shopify's recorded-then-refunded tax. */
export function reconcileOrder(order: Order): Reconciliation {
  const subtotal = subtotalCents(order);
  const ebtPerLine = allocateEbt(order);
  const ebtExempt = ebtPerLine.reduce((sum, cents) => sum + cents, 0);
  const taxableBase = subtotal - ebtExempt;

  // Correct: GET due only on what was NOT paid with EBT, rounded once.
  const correctTax = taxRounded(taxableBase);

  // Shopify: tax recorded on the full order, then refunded per line with
  // truncation — the refund comes up short, leaving extra pennies of tax.
  const shopifyRecordedTax = taxRounded(subtotal);
  const shopifyRefund = ebtPerLine.reduce((sum, cents) => sum + taxTruncated(cents), 0);
  const shopifyNetTax = shopifyRecordedTax - shopifyRefund;

  return {
    order,
    subtotal,
    ebtPerLine,
    ebtExempt,
    taxableBase,
    shopifyRecordedTax,
    shopifyRefund,
    shopifyNetTax,
    correctTax,
    driftCents: shopifyNetTax - correctTax,
    cardDue: taxableBase + correctTax,
    total: subtotal + correctTax,
  };
}

export interface Summary {
  /** Total pennies of drift caught across all orders. */
  totalDriftCents: number;
  /** Orders whose Shopify net tax disagreed with the lawful figure. */
  ordersWithDrift: number;
  /** All orders are compliant after correction. */
  ordersCompliant: number;
  orderCount: number;
}

/** Roll up a batch of reconciliations for the summary strip. */
export function summarize(results: Reconciliation[]): Summary {
  return {
    totalDriftCents: results.reduce((sum, r) => sum + Math.abs(r.driftCents), 0),
    ordersWithDrift: results.filter((r) => r.driftCents !== 0).length,
    ordersCompliant: results.length,
    orderCount: results.length,
  };
}

/** Format integer cents as dollars, e.g. 153 → "$1.53". */
export function fmt(cents: number): string {
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  return `${sign}$${Math.floor(abs / 100)}.${String(abs % 100).padStart(2, "0")}`;
}

/** Format a drift as signed cents, e.g. 2 → "+2¢". */
export function fmtDrift(cents: number): string {
  if (cents === 0) return "0¢";
  return `${cents > 0 ? "+" : "−"}${Math.abs(cents)}¢`;
}

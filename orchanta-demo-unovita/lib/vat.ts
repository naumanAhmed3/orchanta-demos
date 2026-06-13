// lib/vat.ts — pure, deterministic Norwegian VAT (MVA) logic for the demo.
// No I/O, no randomness, no Date.now(): same input -> same output, always.
//
// Norwegian MVA rates modeled (the three Uno Vita actually handles today
// via manual Shopify collections):
//   25% — standard sats (health-tech devices, electronics)
//   15% — næringsmidler (food / supplements)
//    0% — export out of Norway (fritatt, e.g. Switzerland / Sweden)
//
// The point of the demo: per-LINE rate resolution from product class +
// destination, instead of per-collection guessing — and a check that
// compares what the manual-collection setup records vs. the correct split.

export type VatClass = "standard" | "food" | "export-zero";
export type Channel = "own" | "collective";

export interface OrderLine {
  name: string;
  nameEn: string;
  qty: number;
  /** Unit price excluding MVA, in the order's currency. */
  unitPriceExVat: number;
  /** True product class — drives the CORRECT rate. */
  vatClass: VatClass;
  /**
   * Rate (%) the current manual Shopify-collection setup records for this
   * line. Normally it matches; on Shopify Collective resold items the
   * supplier's collection rate leaks through and can be wrong.
   */
  manualCollectionRate: number;
  /** "collective" = resold via Shopify Collective from a partner store. */
  channel: Channel;
}

export interface Order {
  id: string;
  customer: string;
  destination: string; // e.g. "Oslo, Norge"
  country: "NO" | "CH" | "SE";
  currency: "NOK" | "CHF" | "SEK";
  b2b: boolean;
  lines: OrderLine[];
}

/** One slice of an MVA split: taxable base + tax at a single rate. */
export interface VatBucket {
  rate: number; // 0 | 15 | 25
  base: number; // grunnlag (ex-MVA)
  vat: number;
}

export interface LineCheck {
  line: OrderLine;
  lineTotalExVat: number;
  correctRate: number;
  correctVat: number;
  manualRate: number;
  manualVat: number;
  mismatch: boolean;
}

export interface OrderCheck {
  order: Order;
  lines: LineCheck[];
  /** Correct MVA split grouped per rate (the EHF "TaxSubtotal" view). */
  correctBuckets: VatBucket[];
  manualVatTotal: number;
  correctVatTotal: number;
  /** manual - correct, in order currency. Positive = customer overcharged. */
  deltaVat: number;
  totalExVat: number;
  totalIncVat: number; // using the CORRECT MVA
  hasMismatch: boolean;
}

export interface CheckSummary {
  orders: OrderCheck[];
  okCount: number;
  mismatchCount: number;
}

/** Round to 2 decimals, half away from zero — stable for money in a demo. */
export function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

/**
 * The CORRECT Norwegian MVA rate for a line:
 * export out of Norway -> 0%; food/supplements -> 15%; otherwise 25%.
 * (Destination wins over product class — an exported supplement is 0%.)
 */
export function correctRate(line: OrderLine, order: Order): number {
  if (order.country !== "NO" || line.vatClass === "export-zero") return 0;
  if (line.vatClass === "food") return 15;
  return 25;
}

/** Check a single order: manual-collection result vs. correct per-line MVA. */
export function checkOrder(order: Order): OrderCheck {
  const lines: LineCheck[] = order.lines.map((line) => {
    const lineTotalExVat = round2(line.qty * line.unitPriceExVat);
    const cr = correctRate(line, order);
    const correctVat = round2((lineTotalExVat * cr) / 100);
    const manualVat = round2((lineTotalExVat * line.manualCollectionRate) / 100);
    return {
      line,
      lineTotalExVat,
      correctRate: cr,
      correctVat,
      manualRate: line.manualCollectionRate,
      manualVat,
      mismatch: line.manualCollectionRate !== cr,
    };
  });

  // Group the correct figures per rate — exactly the shape an EHF invoice
  // (and a Tripletex voucher) wants its MVA subtotals in.
  const byRate = new Map<number, VatBucket>();
  for (const lc of lines) {
    const bucket = byRate.get(lc.correctRate) ?? { rate: lc.correctRate, base: 0, vat: 0 };
    bucket.base = round2(bucket.base + lc.lineTotalExVat);
    bucket.vat = round2(bucket.vat + lc.correctVat);
    byRate.set(lc.correctRate, bucket);
  }
  const correctBuckets = [...byRate.values()].sort((a, b) => b.rate - a.rate);

  const totalExVat = round2(lines.reduce((s, l) => s + l.lineTotalExVat, 0));
  const correctVatTotal = round2(lines.reduce((s, l) => s + l.correctVat, 0));
  const manualVatTotal = round2(lines.reduce((s, l) => s + l.manualVat, 0));

  return {
    order,
    lines,
    correctBuckets,
    manualVatTotal,
    correctVatTotal,
    deltaVat: round2(manualVatTotal - correctVatTotal),
    totalExVat,
    totalIncVat: round2(totalExVat + correctVatTotal),
    hasMismatch: lines.some((l) => l.mismatch),
  };
}

/** Run the MVA check across all orders. */
export function checkOrders(orders: Order[]): CheckSummary {
  const checked = orders.map(checkOrder);
  const mismatchCount = checked.filter((c) => c.hasMismatch).length;
  return { orders: checked, okCount: checked.length - mismatchCount, mismatchCount };
}

/** Format an amount like "1 234,50" (Norwegian style), deterministic. */
export function fmtAmount(n: number): string {
  const [int, dec] = n.toFixed(2).split(".");
  // \u00A0 (no-break space) so grouped amounts never wrap mid-number.
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0");
  return `${grouped},${dec}`;
}

/** "1 234,50 NOK" */
export function fmtMoney(n: number, currency: string): string {
  return `${fmtAmount(n)} ${currency}`;
}

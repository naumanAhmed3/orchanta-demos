// ---------------------------------------------------------------------------
// Sample order data + per-order profit math for the Tita Italia concept.
//
// Everything here is PURE and DETERMINISTIC: fictional-but-plausible orders
// built from real Tita Italia product CATEGORIES (Caviar, Fresh Truffles,
// Imported Italian Pasta, Truffle Oils, Balsamic Vinegar, Olive Oil, ...).
// No live data is read; all figures are illustrative demo numbers.
// ---------------------------------------------------------------------------

/** One line item on an order. Categories mirror titaitalia.com collections. */
export interface LineItem {
  /** Real Tita Italia category name (the product itself is fictional). */
  category: string;
  /** Short fictional product descriptor shown in the breakdown. */
  label: string;
  qty: number;
  /** Customer-facing unit price, USD. */
  unitPrice: number;
  /** Landed unit cost of goods (product + import/duty), USD. Illustrative. */
  unitCogs: number;
  /** Shipping weight per unit, lb — drives the carrier cost. */
  weightLb: number;
}

/** Raw order inputs — costs are derived, never hard-coded. */
export interface OrderInput {
  id: string;
  /** Fictional order date (text, no Date objects → fully deterministic). */
  date: string;
  /** Last-click acquisition channel for ad-spend allocation. */
  channel: "Meta Ads" | "Google Shopping" | "Email" | "Meta Retargeting";
  /** Ad spend attributed to this order by last-click, USD (0 = organic/owned). */
  adSpend: number;
  /** What the merchant pays the carrier for this box, USD (weight + cold chain). */
  carrierCost: number;
  /** True when the box needs an insulated cold pack (caviar / fresh truffles). */
  coldChain: boolean;
  items: LineItem[];
  /** Optional one-line note surfaced in the expanded P&L card. */
  note?: string;
}

/** Fully computed per-order P&L. */
export interface OrderPnl extends OrderInput {
  /** Sum of qty × unitPrice across items. */
  subtotal: number;
  /** Shipping charged to the customer ($0 when the free-shipping rule applies). */
  shippingCharged: number;
  /** Free-shipping threshold that applied to this order. */
  freeShipThreshold: number;
  /** subtotal + shippingCharged — the amount actually charged. */
  revenue: number;
  /** Sum of qty × unitCogs across items. */
  cogs: number;
  /** Payment processing fee: 2.9% of revenue + $0.30 (illustrative). */
  fees: number;
  /** Total box weight, lb. */
  weightLb: number;
  /** revenue − cogs − carrierCost − fees − adSpend. */
  netProfit: number;
  /** netProfit / revenue, as a percentage. */
  marginPct: number;
  /** Margin band used for color-coding. */
  band: "healthy" | "thin" | "loss";
}

// --- Policy constants (mirroring the store's published shipping rule) -------

/** Free shipping over $99 — Tita Italia's storewide rule. */
const FREE_SHIP_STANDARD = 99;
/** Caviar & Fresh Truffles ship free only over $200 (store's stated rule). */
const FREE_SHIP_PERISHABLE = 200;
/** Flat shipping charged to the customer below the threshold (illustrative). */
const FLAT_SHIP_STANDARD = 9.95;
/** Flat cold-chain shipping charged below the perishable threshold. */
const FLAT_SHIP_COLD = 14.95;

/** Payment fee model: 2.9% + 30¢ per transaction (illustrative card rate). */
const FEE_RATE = 0.029;
const FEE_FIXED = 0.3;

/** Margin bands: ≥18% healthy, 0–18% thin, below 0 a loss. */
const HEALTHY_MARGIN = 18;

const round2 = (n: number) => Math.round(n * 100) / 100;

/** USD formatter — always two decimals, minus sign preserved. */
export function usd(n: number): string {
  const sign = n < 0 ? "−" : "";
  return `${sign}$${Math.abs(n).toFixed(2)}`;
}

/** Percent formatter, one decimal. */
export function pct(n: number): string {
  const sign = n < 0 ? "−" : "";
  return `${sign}${Math.abs(n).toFixed(1)}%`;
}

/** Derive the full P&L for one order from its raw inputs. */
export function computePnl(input: OrderInput): OrderPnl {
  const subtotal = round2(
    input.items.reduce((s, it) => s + it.qty * it.unitPrice, 0)
  );
  const cogs = round2(
    input.items.reduce((s, it) => s + it.qty * it.unitCogs, 0)
  );
  const weightLb = round2(
    input.items.reduce((s, it) => s + it.qty * it.weightLb, 0)
  );

  // Free-shipping rule: $99 storewide, $200 for cold-chain (caviar/truffle) boxes.
  const freeShipThreshold = input.coldChain
    ? FREE_SHIP_PERISHABLE
    : FREE_SHIP_STANDARD;
  const flatShip = input.coldChain ? FLAT_SHIP_COLD : FLAT_SHIP_STANDARD;
  const shippingCharged = subtotal >= freeShipThreshold ? 0 : flatShip;

  const revenue = round2(subtotal + shippingCharged);
  const fees = round2(revenue * FEE_RATE + FEE_FIXED);
  const netProfit = round2(
    revenue - cogs - input.carrierCost - fees - input.adSpend
  );
  const marginPct = round2((netProfit / revenue) * 100);
  const band: OrderPnl["band"] =
    marginPct < 0 ? "loss" : marginPct < HEALTHY_MARGIN ? "thin" : "healthy";

  return {
    ...input,
    subtotal,
    shippingCharged,
    freeShipThreshold,
    revenue,
    cogs,
    fees,
    weightLb,
    netProfit,
    marginPct,
    band,
  };
}

// --- Six fictional orders (real categories, demo numbers) -------------------

const ORDER_INPUTS: OrderInput[] = [
  {
    id: "TI-2401",
    date: "Jun 2",
    channel: "Meta Ads",
    adSpend: 18.2,
    carrierCost: 19.5, // light 2-lb cold pack, express
    coldChain: true,
    items: [
      { category: "Caviar", label: "Oscietra 50 g tin", qty: 1, unitPrice: 189.0, unitCogs: 113.0, weightLb: 0.6 },
      { category: "Caviar Accessories", label: "Mother-of-pearl spoon", qty: 1, unitPrice: 24.0, unitCogs: 9.0, weightLb: 0.3 },
    ],
    note: "High ticket, light box — premium cold pack still leaves room.",
  },
  {
    id: "TI-2402",
    date: "Jun 3",
    channel: "Google Shopping",
    adSpend: 12.6,
    carrierCost: 22.4, // overnight cold-chain for fresh truffles
    coldChain: true,
    items: [
      { category: "Fresh Truffles", label: "Summer truffle 60 g", qty: 1, unitPrice: 145.0, unitCogs: 92.0, weightLb: 0.4 },
      { category: "Truffle Slicers", label: "Stainless slicer", qty: 1, unitPrice: 32.0, unitCogs: 13.0, weightLb: 0.5 },
    ],
    note: "Under the $200 truffle threshold, so the customer paid cold shipping.",
  },
  {
    id: "TI-2403",
    date: "Jun 5",
    channel: "Meta Ads",
    adSpend: 16.8,
    carrierCost: 26.9, // 14+ lb ground box — pasta cases, oil bottles, jars
    coldChain: false,
    items: [
      { category: "Imported Italian Pasta", label: "Artisan bronze-cut, 500 g", qty: 6, unitPrice: 6.95, unitCogs: 3.9, weightLb: 1.1 },
      { category: "Olive Oil", label: "Extra virgin, 1 L", qty: 2, unitPrice: 24.5, unitCogs: 15.8, weightLb: 2.4 },
      { category: "Tomato Sauces", label: "San Marzano jar", qty: 2, unitPrice: 8.95, unitCogs: 4.6, weightLb: 1.5 },
    ],
    note: "Cleared $99 free shipping by $9.60 — then 14.4 lb of pantry weight put the carrier bill on the house. The order looks fine in Shopify; it loses money.",
  },
  {
    id: "TI-2404",
    date: "Jun 6",
    channel: "Email",
    adSpend: 0, // owned channel — nothing to allocate
    carrierCost: 11.2,
    coldChain: false,
    items: [
      { category: "Truffle Oils", label: "White truffle oil 250 ml", qty: 1, unitPrice: 28.0, unitCogs: 13.5, weightLb: 1.0 },
      { category: "Truffle-Infused Sauces", label: "Truffle & porcini jar", qty: 2, unitPrice: 16.5, unitCogs: 8.2, weightLb: 1.2 },
    ],
    note: "Repeat customer from the newsletter — $0 ad cost is the whole story.",
  },
  {
    id: "TI-2405",
    date: "Jun 8",
    channel: "Meta Retargeting",
    adSpend: 19.4,
    carrierCost: 14.6,
    coldChain: false,
    items: [
      { category: "Balsamic Vinegar", label: "Aged 12-year, 250 ml", qty: 1, unitPrice: 58.0, unitCogs: 34.0, weightLb: 1.8 },
      { category: "Torrone", label: "Almond torrone bar", qty: 1, unitPrice: 22.0, unitCogs: 12.4, weightLb: 1.1 },
      { category: "Salt & Seasonings", label: "Truffle sea salt", qty: 1, unitPrice: 12.5, unitCogs: 6.1, weightLb: 0.6 },
    ],
    note: "Healthy product margin, but retargeting spend takes a real bite.",
  },
  {
    id: "TI-2406",
    date: "Jun 9",
    channel: "Google Shopping",
    adSpend: 9.3,
    carrierCost: 11.8,
    coldChain: false,
    items: [
      { category: "Bottarga", label: "Mullet bottarga 120 g", qty: 1, unitPrice: 42.0, unitCogs: 26.5, weightLb: 0.7 },
      { category: "Imported Italian Pasta", label: "Spaghettoni 500 g", qty: 2, unitPrice: 7.95, unitCogs: 4.4, weightLb: 1.1 },
    ],
    note: "Small basket: the $0.30 fixed fee and flat shipping weigh more here.",
  },
];

/** The six computed orders, in date order. */
export const ORDERS: OrderPnl[] = ORDER_INPUTS.map(computePnl);

// --- Roll-up for the summary strip ------------------------------------------

export interface Summary {
  totalRevenue: number;
  totalNet: number;
  /** Net of all six orders ÷ revenue of all six orders. */
  blendedMarginPct: number;
  best: OrderPnl;
  worst: OrderPnl;
  totalAdSpend: number;
}

export function computeSummary(orders: OrderPnl[]): Summary {
  const totalRevenue = round2(orders.reduce((s, o) => s + o.revenue, 0));
  const totalNet = round2(orders.reduce((s, o) => s + o.netProfit, 0));
  const totalAdSpend = round2(orders.reduce((s, o) => s + o.adSpend, 0));
  const byMargin = [...orders].sort((a, b) => b.marginPct - a.marginPct);
  return {
    totalRevenue,
    totalNet,
    blendedMarginPct: round2((totalNet / totalRevenue) * 100),
    best: byMargin[0],
    worst: byMargin[byMargin.length - 1],
    totalAdSpend,
  };
}

export const SUMMARY: Summary = computeSummary(ORDERS);

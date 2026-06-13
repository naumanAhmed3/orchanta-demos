/*
 * Sample orders — fictional but realistic Farm Link-style grocery baskets
 * (local producers, Oʻahu staples). Demo data only: fictional customers,
 * fictional producer names, hand-picked prices so the rounding drift in
 * Shopify's EBT tax refund is visible. All amounts in integer cents.
 */
import type { Order } from "./reconcile";

export const SAMPLE_ORDERS: Order[] = [
  {
    id: "#FL-2371",
    customer: "K. Nakamura",
    // Fully paid with SNAP-EBT → entire order is tax-exempt by law.
    ebtTenderCents: 1850,
    lines: [
      { name: "Kahuku sweet corn (4 ears)", qty: 4, unitCents: 195, ebtEligible: true },
      { name: "Hāmākua aliʻi mushrooms", qty: 1, unitCents: 650, ebtEligible: true },
      { name: "Green papaya", qty: 1, unitCents: 420, ebtEligible: true },
    ],
  },
  {
    id: "#FL-2372",
    customer: "M. Santos",
    // Split tender: EBT covers the eligible groceries; the hot plate is
    // not SNAP-eligible, so it rides on the card with GET due.
    ebtTenderCents: 1855,
    lines: [
      { name: "Waiʻanae salad mix", qty: 1, unitCents: 550, ebtEligible: true },
      { name: "Local eggs (dozen)", qty: 1, unitCents: 875, ebtEligible: true },
      { name: "Apple bananas (bunch)", qty: 1, unitCents: 430, ebtEligible: true },
      { name: "Laulau plate (hot, prepared)", qty: 1, unitCents: 1400, ebtEligible: false },
    ],
  },
  {
    id: "#FL-2373",
    customer: "L. Kahale",
    // Split tender: EBT balance covers only part of the eligible items;
    // the remainder of the groceries goes on the card and stays taxable.
    ebtTenderCents: 2000,
    lines: [
      { name: "Hāmākua oyster mushrooms", qty: 1, unitCents: 650, ebtEligible: true },
      { name: "Fresh poi (1 lb)", qty: 1, unitCents: 540, ebtEligible: true },
      { name: "Kalo, table taro (2 lb)", qty: 1, unitCents: 720, ebtEligible: true },
      { name: "Country sourdough loaf", qty: 1, unitCents: 900, ebtEligible: true },
    ],
  },
  {
    id: "#FL-2374",
    customer: "T. Fonoti",
    // No EBT — card only. GET applies to the whole order; nothing to refund,
    // so Shopify's figure already matches the lawful one.
    ebtTenderCents: 0,
    lines: [
      { name: "Kaʻū coffee, medium roast", qty: 1, unitCents: 1800, ebtEligible: true },
      { name: "Macadamia nuts, roasted", qty: 1, unitCents: 950, ebtEligible: true },
    ],
  },
  {
    id: "#FL-2375",
    customer: "R. Watanabe",
    // Fully paid with SNAP-EBT → fully exempt, but the per-line refund
    // rounding still leaves a stray penny on the books.
    ebtTenderCents: 2020,
    lines: [
      { name: "Okinawan sweet potato (2 lb)", qty: 1, unitCents: 530, ebtEligible: true },
      { name: "Waimānalo baby greens", qty: 1, unitCents: 850, ebtEligible: true },
      { name: "Chili pepper water", qty: 1, unitCents: 640, ebtEligible: true },
    ],
  },
];

/** The order whose compliant receipt we preview after reconciling. */
export const RECEIPT_ORDER_ID = "#FL-2372";

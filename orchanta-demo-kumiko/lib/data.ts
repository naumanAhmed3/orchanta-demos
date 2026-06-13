/**
 * Product data sourced from the live Kumiko Lash store on 13 Jun 2026:
 * https://kumikolash.com/products.json
 * Titles, prices, compare-at prices, and availability are REAL store values.
 * The bundle's line price is computed as 3 x the real single-pair price
 * (the live store prices the bundle via its mix-and-match builder).
 */

export type LashStyle = "fairy" | "princess" | "starlight" | "rawedge" | "bundle";

export interface Product {
  id: string;
  /** Real product title from kumikolash.com */
  title: string;
  /** Short display name for cards and the cart */
  name: string;
  /** Real one-line positioning, condensed from her own product copy */
  tagline: string;
  price: number;
  compareAt: number | null;
  available: boolean;
  style: LashStyle;
  /** Real URL on her store */
  url: string;
  /** Note shown when a value is computed rather than read from the store */
  priceNote?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "fairy",
    title: "Kumiko Fairy Wispy Lashes | Soft Everyday Wispy Lashes",
    name: "Fairy Wispy Lashes",
    tagline: "Soft, everyday texture that blends at the root",
    price: 12.99,
    compareAt: 18.99,
    available: true,
    style: "fairy",
    url: "https://kumikolash.com/products/fairy-wispy-lashes",
  },
  {
    id: "princess",
    title: "Kumiko Princess Doll Lashes | Doll-Eye Wispy Lashes",
    name: "Princess Doll Lashes",
    tagline: "Instant doll-eye lift with soft, layered spikes",
    price: 12.99,
    compareAt: 18.99,
    available: true,
    style: "princess",
    url: "https://kumikolash.com/products/princess-doll-lashes",
  },
  {
    id: "starlight",
    title: "Kumiko Starlight Spiky Lashes | Dramatic Wispy Lashes",
    name: "Starlight Spiky Lashes",
    tagline: "Crisp, defined spikes — drama without the weight",
    price: 12.99,
    compareAt: 18.99,
    available: true,
    style: "starlight",
    url: "https://kumikolash.com/products/starlight-spiky-lashes",
  },
  {
    id: "rawedge",
    title: "Kumiko Raw Edge Lash Trio | 3-Pair Mix Set",
    name: "Raw Edge Lash Trio",
    tagline: "3-pair mix set with a raw, undone finish",
    price: 12.99,
    compareAt: 18.99,
    available: false, // genuinely sold out on the live store
    style: "rawedge",
    url: "https://kumikolash.com/products/raw-edge-lash-trio",
  },
  {
    id: "bundle",
    title: "Handmade Lash Bundle | Mix & Match 3-Pair Set",
    name: "Mix & Match Bundle",
    tagline: "Pick any three: Fairy, Princess, Starlight",
    price: 38.97, // computed: 3 x $12.99 (real single-pair price)
    compareAt: null,
    available: true,
    style: "bundle",
    url: "https://kumikolash.com/products/handmade-lash-bundle",
    priceNote: "3 pairs at the real $12.99 single-pair price",
  },
];

/** Facts pulled verbatim-or-condensed from her own product pages — nothing invented. */
export const TRUST_FACTS = [
  { stat: "1 year", label: "of daily Amazon orders — now shipping direct" },
  { stat: "Small batch", label: "handmade and finished by hand in Los Angeles" },
  { stat: "10–15 wears", label: "reusable with proper care" },
  { stat: "12+ hours", label: "of comfort on a thin, flexible band" },
];

export function money(n: number): string {
  return `$${n.toFixed(2)}`;
}

export function getProduct(id: string): Product {
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown product: ${id}`);
  return p;
}

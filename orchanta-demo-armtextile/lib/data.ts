// Sample export catalog for A.R.M Textile (illustrative specs — demo only).
// Product lines mirror the real categories listed on armtextile.com:
// terry towels, waffle bathrobes, cotton bedding, hospital/spa linen,
// sauna sets, bar mops and terry/waffle slippers.

export type Weave = "Terry" | "Waffle" | "Percale" | "Dobby";

export type Product = {
  id: string;
  name: string;
  category: string;
  /** Short selling line shown under the title. */
  blurb: string;
  gsm: string;
  size: string;
  material: string;
  weave: Weave;
  colors: string[];
  /** Minimum order quantity. */
  moq: string;
  /** Tailwind utility used to render a fabric-texture swatch in CSS (no images). */
  swatch: string;
};

export const CATALOG: Product[] = [
  {
    id: "twl-bath-600",
    name: "Premium Bath Towel",
    category: "Terry Towels",
    blurb: "Plush double-loop terry with woven dobby border.",
    gsm: "600 GSM",
    size: "70 × 140 cm",
    material: "100% combed cotton",
    weave: "Terry",
    colors: ["White", "Ivory", "Sage", "Charcoal"],
    moq: "MOQ 500 pcs / colour",
    swatch: "swatch-terry-ivory",
  },
  {
    id: "twl-hand-500",
    name: "Hand Towel",
    category: "Terry Towels",
    blurb: "Quick-dry hotel-weight hand towel, even pile.",
    gsm: "500 GSM",
    size: "50 × 90 cm",
    material: "100% ring-spun cotton",
    weave: "Terry",
    colors: ["White", "Stone", "Navy"],
    moq: "MOQ 1,000 pcs",
    swatch: "swatch-terry-stone",
  },
  {
    id: "robe-waffle-320",
    name: "Cotton Waffle Bathrobe",
    category: "Bathrobes",
    blurb: "Lightweight waffle weave with shawl collar, unisex sizing.",
    gsm: "320 GSM",
    size: "S – XXL",
    material: "100% cotton waffle",
    weave: "Waffle",
    colors: ["White", "Grey", "Beige"],
    moq: "MOQ 300 pcs",
    swatch: "swatch-waffle-grey",
  },
  {
    id: "bed-percale-200",
    name: "Cotton Bed Linen Set",
    category: "Bedding",
    blurb: "Flat + fitted sheet with two pillowcases, crisp percale.",
    gsm: "200 TC",
    size: "Queen / King",
    material: "100% cotton percale",
    weave: "Percale",
    colors: ["White", "Sage", "Dusty Blue"],
    moq: "MOQ 250 sets",
    swatch: "swatch-percale-blue",
  },
  {
    id: "hosp-linen-180",
    name: "Hospital & Spa Linen Set",
    category: "Healthcare",
    blurb: "Bleach-safe poly-cotton, repeat-wash colourfast.",
    gsm: "180 GSM",
    size: "Standard / Large",
    material: "65/35 poly-cotton",
    weave: "Dobby",
    colors: ["White", "Mint", "Sky"],
    moq: "MOQ 1,000 pcs",
    swatch: "swatch-dobby-mint",
  },
  {
    id: "sauna-waffle-set",
    name: "Cotton Waffle Sauna Set",
    category: "Spa & Sauna",
    blurb: "Waffle wrap with adjustable closure plus matching slippers.",
    gsm: "240 GSM",
    size: "One size + 40–45 EU",
    material: "100% cotton waffle",
    weave: "Waffle",
    colors: ["White", "Aqua", "Sand"],
    moq: "MOQ 300 sets",
    swatch: "swatch-waffle-aqua",
  },
  {
    id: "barmop-terry-16",
    name: "Cotton Bar Mop",
    category: "Kitchen & Cleaning",
    blurb: "Heavy ribbed terry for kitchens and back-of-house.",
    gsm: "400 GSM",
    size: "40 × 48 cm",
    material: "100% cotton terry",
    weave: "Terry",
    colors: ["White", "White w/ stripe"],
    moq: "MOQ 2,000 pcs",
    swatch: "swatch-terry-white",
  },
  {
    id: "slip-terry-closed",
    name: "Terry Hotel Slippers",
    category: "Hospitality",
    blurb: "Closed-toe terry slipper with non-slip sole, hotel grade.",
    gsm: "—",
    size: "Open / Closed toe",
    material: "Cotton terry upper",
    weave: "Terry",
    colors: ["White", "Beige"],
    moq: "MOQ 1,000 pairs",
    swatch: "swatch-terry-beige",
  },
];

export type Certification = {
  label: string;
  detail: string;
};

// Capability strip — illustrative figures for the concept, labelled as such.
export const CAPABILITIES: Certification[] = [
  { label: "OEKO-TEX® style testing", detail: "Standard 100 class assurance (illustrative)" },
  { label: "Monthly capacity", detail: "~120,000 pcs across terry & bedding lines" },
  { label: "Typical lead time", detail: "35–45 days FOB Karachi after sampling" },
  { label: "Sampling", detail: "Custom GSM, size & colour on request" },
];

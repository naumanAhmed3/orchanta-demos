// Sample catalog data for the Tex Mart International export-catalog concept.
// All specifications are illustrative and shown for demonstration only.

export type Category = "towels" | "bathrobes" | "fabric" | "baby";

export interface Product {
  id: string;
  name: string;
  category: Category;
  categoryLabel: string;
  blurb: string;
  composition: string;
  weight: string; // GSM or fabric weight
  size: string;
  colors: string[];
  moq: string;
}

export const COMPANY = {
  name: "Tex Mart International",
  city: "Faisalabad, Pakistan",
  since: "1995",
  tagline:
    "Terry towels, bathrobes, cotton fabric & baby garments — Faisalabad, since 1995",
  contactPerson: "Anwar Ali",
  contactRole: "Chief Executive",
} as const;

export const MARKETS = [
  "Russia",
  "Middle East",
  "Europe",
  "USA",
] as const;

export const TRUST_POINTS = [
  { value: "30+ yrs", label: "Family-run export manufacturer" },
  { value: "4 regions", label: "Russia · Middle East · Europe · USA" },
  { value: "MOQ-friendly", label: "Trial orders welcomed" },
] as const;

export const CAPABILITIES = [
  {
    value: "4 product lines",
    label: "Terry towels, bathrobes, woven fabric & baby garments",
  },
  {
    value: "~40 ft containers / mo",
    label: "Illustrative monthly export capacity",
  },
  {
    value: "30–45 days",
    label: "Typical production lead time after sample approval",
  },
  {
    value: "OEM / private label",
    label: "Custom GSM, sizes, colors & buyer labelling",
  },
] as const;

export const PRODUCTS: Product[] = [
  {
    id: "twl-bath-550",
    name: "Premium Terry Bath Towel",
    category: "towels",
    categoryLabel: "Terry towels",
    blurb:
      "Dense double-loop terry with dobby border — a hospitality-grade everyday bath towel.",
    composition: "100% combed cotton",
    weight: "550 GSM",
    size: "70 × 140 cm",
    colors: ["White", "Ivory", "Slate", "Navy", "Sage"],
    moq: "500 pcs / color",
  },
  {
    id: "twl-hand-500",
    name: "Hotel Hand Towel",
    category: "towels",
    categoryLabel: "Terry towels",
    blurb:
      "Ring-spun hand towel with reinforced selvage, built for high-turn laundry cycles.",
    composition: "100% ring-spun cotton",
    weight: "500 GSM",
    size: "50 × 90 cm",
    colors: ["White", "Stone", "Charcoal"],
    moq: "1,000 pcs / color",
  },
  {
    id: "twl-beach-450",
    name: "Velour Beach Towel",
    category: "towels",
    categoryLabel: "Terry towels",
    blurb:
      "Sheared cotton velour face for reactive prints — retail and resort programs.",
    composition: "100% cotton velour",
    weight: "450 GSM",
    size: "90 × 170 cm",
    colors: ["Print to artwork", "White ground"],
    moq: "800 pcs / design",
  },
  {
    id: "rob-shawl-400",
    name: "Shawl-Collar Terry Bathrobe",
    category: "bathrobes",
    categoryLabel: "Bathrobes",
    blurb:
      "Unisex shawl-collar robe with twin patch pockets and self-tie belt — spa & hotel staple.",
    composition: "100% cotton terry",
    weight: "400 GSM",
    size: "S / M / L / XL",
    colors: ["White", "Grey", "Navy"],
    moq: "300 pcs / size run",
  },
  {
    id: "rob-waffle-320",
    name: "Waffle Weave Bathrobe",
    category: "bathrobes",
    categoryLabel: "Bathrobes",
    blurb:
      "Lightweight honeycomb waffle robe — fast-drying, popular for warm-climate hospitality.",
    composition: "100% cotton waffle",
    weight: "320 GSM",
    size: "S / M / L / XL",
    colors: ["White", "Beige", "Powder blue"],
    moq: "300 pcs / size run",
  },
  {
    id: "fab-greige-120",
    name: "Cotton Greige Fabric (Loom State)",
    category: "fabric",
    categoryLabel: "Cotton fabric",
    blurb:
      "Loom-state woven base for bleaching, dyeing or printing — sold by the running metre.",
    composition: "100% cotton, plain weave",
    weight: "120 GSM",
    size: '63" width',
    colors: ["Greige (loom state)"],
    moq: "3,000 m / construction",
  },
  {
    id: "fab-dyed-110",
    name: "Dyed Cotton Poplin",
    category: "fabric",
    categoryLabel: "Cotton fabric",
    blurb:
      "Sanforized, peach-finish poplin in solid dyes — apparel and home-textile cut goods.",
    composition: "100% cotton poplin",
    weight: "110 GSM",
    size: '58" width',
    colors: ["Dyed to shade card"],
    moq: "2,000 m / shade",
  },
  {
    id: "bby-swaddle-set",
    name: "Baby Muslin Swaddle Set",
    category: "baby",
    categoryLabel: "Baby garments",
    blurb:
      "Pre-washed double-gauze muslin swaddles, gift-boxed in pastel three-packs.",
    composition: "100% cotton muslin",
    weight: "Double gauze",
    size: "70 × 70 cm · 3-pack",
    colors: ["Cloud", "Blush", "Mint", "Butter"],
    moq: "500 sets / colorway",
  },
];

export const CATEGORY_FILTERS: { key: Category | "all"; label: string }[] = [
  { key: "all", label: "All products" },
  { key: "towels", label: "Terry towels" },
  { key: "bathrobes", label: "Bathrobes" },
  { key: "fabric", label: "Cotton fabric" },
  { key: "baby", label: "Baby garments" },
];

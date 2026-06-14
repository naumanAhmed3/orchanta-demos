// Sample data for the Miinoor live-shopping working concept. Labeled as sample in the UI.

export type Product = {
  id: string;
  name: string;
  price: number;
  blurb: string;
  emoji: string;
};

export type Seller = {
  id: string;
  handle: string;
  name: string;
  category: string;
  viewers: string;
  // tailwind-ish gradient stops for the animated stream backdrop
  from: string;
  via: string;
  to: string;
  products: Product[];
};

export const sellers: Seller[] = [
  {
    id: "amara",
    handle: "@amaramakes",
    name: "Amara",
    category: "Handmade jewelry",
    viewers: "1.2k watching",
    from: "#fed324",
    via: "#f59e0b",
    to: "#171717",
    products: [
      {
        id: "p-hoops",
        name: "Gold hoop earrings",
        price: 24,
        blurb: "14k-gold-fill, featherlight, made-to-order.",
        emoji: "✨",
      },
      {
        id: "p-cuff",
        name: "Hammered cuff",
        price: 29,
        blurb: "Hand-forged brass, one-size adjustable.",
        emoji: "💛",
      },
      {
        id: "p-stack",
        name: "Stacking ring trio",
        price: 27,
        blurb: "Mix-and-match set of three.",
        emoji: "💍",
      },
    ],
  },
  {
    id: "deck",
    handle: "@deckstreetwear",
    name: "Deck",
    category: "Streetwear drops",
    viewers: "864 watching",
    from: "#171717",
    via: "#3f3f46",
    to: "#fed324",
    products: [
      {
        id: "p-hoodie",
        name: "Oversized hoodie",
        price: 38,
        blurb: "Heavyweight fleece, boxy fit, limited run.",
        emoji: "🧥",
      },
      {
        id: "p-cap",
        name: "Embroidered cap",
        price: 22,
        blurb: "Structured 6-panel, gold stitch logo.",
        emoji: "🧢",
      },
      {
        id: "p-tee",
        name: "Boxy graphic tee",
        price: 26,
        blurb: "Garment-dyed cotton, drop-shoulder.",
        emoji: "👕",
      },
    ],
  },
];

export const AI_GREETING =
  "Hi, I am your Miinoor assistant. What are you shopping for today?";

export const TAGLINE = "Your Platform. Your Power.";

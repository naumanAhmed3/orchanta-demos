// All product facts below are taken verbatim from hiprimal.vercel.app (fetched 13 Jun 2026).
// Nothing here is invented: organ amounts, nutrient call-outs, trust claims, sourcing,
// testing and guarantee details all appear on HiPrimal's own published page.

export type Plan = {
  id: "once" | "subscribe";
  label: string;
  price: string;
  perDay: string;
  note: string;
  badge?: string;
};

export const PLANS: Plan[] = [
  {
    id: "once",
    label: "One-time purchase",
    price: "$45",
    perDay: "$1.50/day",
    note: "60 capsules · 30-day supply",
  },
  {
    id: "subscribe",
    label: "Subscribe & Save 10%",
    price: "$40.50",
    perDay: "$1.35/day",
    note: "Ships every 30 days · skip or cancel anytime",
    badge: "Best value",
  },
];

export type Organ = {
  num: string;
  name: string;
  mg: string;
  line: string;
};

// One-liners condensed from HiPrimal's own "What's inside" copy — named nutrients,
// no invented health claims.
export const ORGANS: Organ[] = [
  {
    num: "01",
    name: "Liver",
    mg: "600 mg",
    line: "The most concentrated food source of heme iron, plus retinol, B12, choline, and copper.",
  },
  {
    num: "02",
    name: "Heart",
    mg: "300 mg",
    line: "Nature’s richest source of CoQ10, with riboflavin (B2), taurine, and selenium.",
  },
  {
    num: "03",
    name: "Kidney",
    mg: "200 mg",
    line: "Dense in selenium and B12, with naturally occurring DAO enzymes.",
  },
  {
    num: "04",
    name: "Spleen",
    mg: "200 mg",
    line: "Gram for gram, one of the richest food sources of heme iron.",
  },
  {
    num: "05",
    name: "Pancreas",
    mg: "200 mg",
    line: "A traditional source of digestive enzymes, valued in nose-to-tail eating.",
  },
  {
    num: "06",
    name: "Thymus",
    mg: "200 mg",
    line: "A classic glandular, traditionally valued for its role in immune support.",
  },
];

export type Trust = {
  icon: "shield" | "flask" | "refresh" | "truck";
  label: string;
};

// Only HiPrimal's real, published claims.
export const TRUST: Trust[] = [
  { icon: "shield", label: "FDA-registered GMP facility" },
  { icon: "flask", label: "Third-party tested every batch" },
  { icon: "refresh", label: "60-day money-back guarantee" },
  { icon: "truck", label: "Free US shipping" },
];

export type Faq = {
  q: string;
  a: string;
};

export const FAQS: Faq[] = [
  {
    q: "Where do the organs come from?",
    a: "Pasture-raised, grass-fed and grass-finished Argentine cattle from regenerative ranches — freeze-dried raw within hours of harvest to preserve heat-sensitive nutrients.",
  },
  {
    q: "How is each batch tested?",
    a: "Every batch is tested by independent, accredited US laboratories — heavy metals (ICP-MS), microbiology, and identity & purity — and the reports are published, not “available on request.”",
  },
  {
    q: "How does the 60-day guarantee work?",
    a: "Email within 60 days of delivery for a full refund — including opened pouches. No return forms, no restocking fees.",
  },
];

// Demo knowledge base for the Little Big Flavour Kits concept.
// All content is illustrative / sample data built by Orchanta for a demo.
// Kit names and details are modelled on the brand's real public range.

export type Kit = {
  name: string;
  blurb: string;
  spice: string; // human-readable heat note
  diet: string[]; // dietary tags
  contains: string[]; // notable allergen-relevant ingredients
};

export const KITS: Kit[] = [
  {
    name: "Chicken Curry Kit",
    blurb:
      "The family favourite — whole and ground spices with creamy coconut milk. Add your own chicken.",
    spice: "Mild base you can dial up — the chilli sachet is optional.",
    diet: ["Add-your-own-protein"],
    contains: ["Coconut"],
  },
  {
    name: "Red Lentil (Dhal) Curry Kit",
    blurb:
      "Slow, golden, comforting dhal with cumin, curry leaves, fenugreek and coconut milk.",
    spice: "Gentle and warming — a great first curry.",
    diet: ["Vegan", "Vegetarian"],
    contains: ["Coconut"],
  },
  {
    name: "Mixed Vegetable Curry Kit",
    blurb:
      "A quick weeknight curry that pairs perfectly with rice and your favourite frozen veg.",
    spice: "Mild to medium.",
    diet: ["Vegetarian", "Vegan-friendly"],
    contains: ["Coconut"],
  },
  {
    name: "Sweet Potato Curry Kit",
    blurb:
      "Plant-based sunshine — Sri Lankan curry powder with turmeric, cinnamon and mustard seeds.",
    spice: "Balanced, mild to medium.",
    diet: ["Vegan", "Vegetarian"],
    contains: ["Coconut", "Mustard"],
  },
  {
    name: "Cashew Nut & Pea Curry Kit",
    blurb:
      "Creamy and nutty — soak the cashews overnight for extra oomph. Serves four.",
    spice: "Mild and creamy.",
    diet: ["Vegan", "Vegetarian"],
    contains: ["Cashew nuts", "Coconut"],
  },
  {
    name: "Mustard Fish Curry Kit",
    blurb:
      "A curry with intent — zesty mustard up front softened by sweet coconut. Add your own fish.",
    spice: "Medium with a mustard kick.",
    diet: ["Pescatarian"],
    contains: ["Mustard", "Coconut", "Fish (add your own)"],
  },
  {
    name: "Prawn Curry Kit",
    blurb:
      "Coastal Sri Lanka in a pan — red chilli, turmeric, cinnamon and curry leaves.",
    spice: "Medium.",
    diet: ["Pescatarian"],
    contains: ["Crustaceans (add your own)", "Coconut"],
  },
  {
    name: "Pol Sambol Kit",
    blurb:
      "A bright, fiery coconut relish with lemon — pile it on rice, roti or anything that needs life.",
    spice: "Fiery — it is the spicy one.",
    diet: ["Vegan", "Vegetarian"],
    contains: ["Coconut"],
  },
];

// Compact lookup used by the AI Spice Guide demo answers.
export const FAQ: { chip: string; answer: string; upsell: string }[] = [
  {
    chip: "Which kit should I start with?",
    answer:
      "Start with the Chicken Curry Kit — it is the family favourite, the spice level is easy to adjust, and you just add your own chicken. Prefer plant-based? The Red Lentil (Dhal) Curry Kit is the gentlest, most comforting place to begin.",
    upsell: "New here? The 3-kits-a-month subscription is the tastiest way to explore the range.",
  },
  {
    chip: "How spicy is the Chicken Curry kit?",
    answer:
      "It has a mild, coconut-rich base that the whole table can enjoy — the chilli sachet is kept separate, so you decide the heat. Leave it out for little ones, or stir it all in for a proper kick.",
    upsell: "Want it fierier? Add the Pol Sambol Kit on the side for a bright, spicy lift.",
  },
  {
    chip: "Any nut allergens?",
    answer:
      "The one to watch is the Cashew Nut & Pea Curry Kit, which contains cashew nuts. The Chicken, Red Lentil (Dhal), Mixed Vegetable and Sweet Potato kits are made without nuts. Allergen notes here are illustrative for the demo — the printed pack label is always the final word.",
    upsell: "Cooking nut-free for guests? The Mixed Vegetable Curry Kit is a crowd-pleaser.",
  },
  {
    chip: "I'm vegetarian — what works?",
    answer:
      "Plenty! The Red Lentil (Dhal), Mixed Vegetable, Sweet Potato and Cashew Nut & Pea kits are all vegetarian, and the Pol Sambol relish brings the heat. Several are fully vegan too.",
    upsell: "Make it a feast — add the Mixed Vegetable Curry Kit to your Dhal for a two-curry spread.",
  },
];

// Sample order used by the fulfilment automation demo.
export const SAMPLE_ORDER = {
  id: "LBF-10482",
  customer: "Priya M.",
  place: "Beckenham, Kent",
  items: [
    { kit: "Chicken Curry Kit", qty: 2 },
    { kit: "Red Lentil (Dhal) Curry Kit", qty: 1 },
    { kit: "Pol Sambol Kit", qty: 1 },
  ],
  total: "£19.50",
};

export type Step = { label: string; log: string };

export const PIPELINE: Step[] = [
  {
    label: "Order received",
    log: "Order LBF-10482 captured from the shop and validated.",
  },
  {
    label: "Pick list by kit",
    log: "2x Chicken · 1x Dhal · 1x Pol Sambol grouped for the packing bench.",
  },
  {
    label: "Shipping label created",
    log: "Royal Mail Tracked 48 label generated for Beckenham BR3.",
  },
  {
    label: "Dispatch + tracking email sent",
    log: "Customer emailed a friendly dispatch note with live tracking.",
  },
  {
    label: "Review request scheduled",
    log: "A gentle review request is queued for 5 days after delivery.",
  },
];

// Illustrative ops numbers for the systems dashboard (sample data).
export const DASHBOARD = {
  ordersToday: 27,
  bestKit: "Chicken Curry Kit",
  bestKitShare: "31%",
  lowStock: { spice: "Roasted curry powder", left: 14, unit: "kits worth" },
  subscribers: 184,
  subscribersTrend: "+12 this month",
};

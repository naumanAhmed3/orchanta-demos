export type Flavour = {
  id: string;
  name: string;
  accent: string;        // accent colour the UI shifts to
  accentSoft: string;    // soft tint for backgrounds
  pouchTop: string;      // pouch gradient stops
  pouchBottom: string;
  surface: string;       // the matcha "liquid" surface tint
  note: string;          // tasting note
  oneTime: string;       // one-off price (40g pouch)
};

export const FLAVOURS: Flavour[] = [
  {
    id: "ceremonial",
    name: "Ceremonial Grade",
    accent: "#5A6B3B",
    accentSoft: "#E8EBD9",
    pouchTop: "#7E9356",
    pouchBottom: "#4C5C32",
    surface: "#8FA866",
    note: "Pure first-harvest Uji leaf — vegetal, sweet, no bitterness. The morning ritual, undiluted.",
    oneTime: "£28",
  },
  {
    id: "vanilla",
    name: "Vanilla Velvet",
    accent: "#C9A24B",
    accentSoft: "#F4ECD6",
    pouchTop: "#E0C277",
    pouchBottom: "#B98F3C",
    surface: "#D8BC74",
    note: "Madagascan vanilla folded into ceremonial matcha — soft, creamy, dessert-quiet.",
    oneTime: "£28",
  },
  {
    id: "coconut",
    name: "Coconut Cloud",
    accent: "#B7A98E",
    accentSoft: "#F2D9C2",
    pouchTop: "#EDE3D2",
    pouchBottom: "#C7B79A",
    surface: "#E2D6BE",
    note: "Toasted coconut and matcha — light, tropical, like a calm holiday in a cup.",
    oneTime: "£28",
  },
  {
    id: "raspberry",
    name: "Raspberry Silk",
    accent: "#C75C7A",
    accentSoft: "#F7DFE6",
    pouchTop: "#E08AA1",
    pouchBottom: "#B14868",
    surface: "#D87693",
    note: "Tart wild raspberry against grassy matcha — bright, silky, unmistakably pink.",
    oneTime: "£28",
  },
  {
    id: "strawberry",
    name: "Strawberry Whirl",
    accent: "#E9A6B4",
    accentSoft: "#FBE6EB",
    pouchTop: "#F2B9C5",
    pouchBottom: "#D87E92",
    surface: "#EFAEBD",
    note: "Sun-ripe strawberry whirled through matcha — playful, rounded, gently sweet.",
    oneTime: "£28",
  },
  {
    id: "blueberry",
    name: "Blueberry Burst",
    accent: "#7E6CC4",
    accentSoft: "#E7E1F4",
    pouchTop: "#A091D8",
    pouchBottom: "#5E4DA0",
    surface: "#8C7CCB",
    note: "Wild blueberry meets ceremonial matcha — deep, juicy, a little bit decadent.",
    oneTime: "£28",
  },
];

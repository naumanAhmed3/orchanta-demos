// Sample data for the Set My Hair Salon booking concept (demo only).
// Service list mirrors the real menu the salon advertises (cuts/styling,
// colour, keratin/smoothing, hair treatments, facials, bridal makeup);
// PKR figures are ILLUSTRATIVE "sample pricing", not the salon's live rates.

export type Service = {
  id: string;
  name: string;
  /** Short selling line shown under the title. */
  blurb: string;
  /** Illustrative price in PKR (sample pricing). */
  price: number;
  /** Typical chair time, shown as a chip. */
  duration: string;
  /** Tailwind class for the CSS-rendered tile texture (no images). */
  tile: string;
};

export const SERVICES: Service[] = [
  {
    id: "cut",
    name: "Haircut & Style",
    blurb: "Consultation, precision cut and a finished blow-out.",
    price: 2500,
    duration: "45 min",
    tile: "tile-cut",
  },
  {
    id: "blowdry",
    name: "Blow-dry & Styling",
    blurb: "Wash, blow-dry and heat styling for any occasion.",
    price: 1800,
    duration: "40 min",
    tile: "tile-blowdry",
  },
  {
    id: "color",
    name: "Hair Colour",
    blurb: "Root touch-up or full global colour, ammonia-free options.",
    price: 6500,
    duration: "90 min",
    tile: "tile-color",
  },
  {
    id: "highlights",
    name: "Highlights / Balayage",
    blurb: "Hand-painted dimension, toned to your skin tone.",
    price: 12000,
    duration: "2.5 hrs",
    tile: "tile-highlights",
  },
  {
    id: "keratin",
    name: "Keratin / Smoothing",
    blurb: "Frizz-control smoothing treatment, weeks of manageability.",
    price: 15000,
    duration: "3 hrs",
    tile: "tile-keratin",
  },
  {
    id: "treatment",
    name: "Hair Treatment",
    blurb: "Deep-conditioning mask and scalp care, salon-grade.",
    price: 3500,
    duration: "45 min",
    tile: "tile-treatment",
  },
  {
    id: "facial",
    name: "Signature Facial",
    blurb: "Cleanse, exfoliate and hydrate, tailored to your skin.",
    price: 4000,
    duration: "60 min",
    tile: "tile-facial",
  },
  {
    id: "bridal",
    name: "Bridal Makeup",
    blurb: "Full bridal look with trial, lashes and draping.",
    price: 35000,
    duration: "By appointment",
    tile: "tile-bridal",
  },
];

// Gallery cards are rendered purely in CSS (no hotlinked images). Each one
// shows a "before -> after" idea for a service the salon offers.
export type LookCard = {
  id: string;
  label: string;
  before: string;
  after: string;
  /** before tile class + after tile class */
  beforeTile: string;
  afterTile: string;
};

export const GALLERY: LookCard[] = [
  {
    id: "g-color",
    label: "Colour refresh",
    before: "Grown-out roots",
    after: "Glossy single-tone colour",
    beforeTile: "tile-before-dull",
    afterTile: "tile-color",
  },
  {
    id: "g-balayage",
    label: "Balayage",
    before: "Flat, one-dimensional",
    after: "Sun-kissed dimension",
    beforeTile: "tile-before-flat",
    afterTile: "tile-highlights",
  },
  {
    id: "g-keratin",
    label: "Keratin smoothing",
    before: "Frizz & flyaways",
    after: "Sleek, smooth finish",
    beforeTile: "tile-before-frizz",
    afterTile: "tile-keratin",
  },
  {
    id: "g-bridal",
    label: "Bridal look",
    before: "Bare canvas",
    after: "Full bridal makeup",
    beforeTile: "tile-before-bare",
    afterTile: "tile-bridal",
  },
];

// Optional stylist pick for the booking widget.
export const STYLISTS: string[] = [
  "Any available stylist",
  "Senior stylist",
  "Colour specialist",
  "Bridal & makeup",
];

// Deterministic day chips (the salon is open every day, 10am-8pm).
export const DAYS: string[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Hourly slots, 10:00 AM through 7:00 PM (last appointment).
export const SLOTS: string[] = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
];

export const SALON = {
  name: "Set My Hair Salon",
  short: "Set My Hair",
  tagline: "Hair, colour & bridal — Johar Town, Lahore",
  address: "428-E Johar Town Main Boulevard, Allah Hoo Chowk, Lahore",
  area: "Johar Town, Lahore",
  hours: "Open every day, 10am – 8pm",
  // WhatsApp number used to compose the pre-filled message (digits only).
  whatsapp: "923293663666",
  whatsappDisplay: "+92 329 3663666",
} as const;

/** Format a PKR amount as "PKR 2,500". */
export function pkr(amount: number): string {
  return `PKR ${amount.toLocaleString("en-PK")}`;
}

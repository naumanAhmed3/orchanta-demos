// Static, deterministic content for the BS Studio demo.
// No runtime network calls, no secrets. Only the studio's real, verifiable facts.

export const studio = {
  name: "BS Studio",
  owner: "Ossama Adnan",
  fullName: "BS Studio by Ossama Adnan",
  tagline: "Wedding & bridal photography — Lahore",
  // Only verifiable social proof.
  proof: "11 years · 47K+ on Instagram",
  city: "Lahore, Pakistan",
  address: "M1-57 Eden Tower, Main Boulevard, Gulberg III, Lahore",
  // Real WhatsApp line: +92 323 8817254
  whatsappDisplay: "+92 323 8817254",
  whatsappNumber: "923238817254",
  instagramHandle: "@_bsstudiobyossamaadnan",
} as const;

export type GalleryFrame = {
  // CSS gradient used for the duotone film-frame placeholder (no real images).
  gradient: string;
  // Editorial aspect ratio so the grid reads like a real portfolio.
  ratio: string;
};

export type GalleryCategory = {
  id: string;
  title: string;
  blurb: string;
  frames: GalleryFrame[];
};

export const galleries: GalleryCategory[] = [
  {
    id: "weddings",
    title: "Weddings",
    blurb: "Full-day coverage from baraat to rukhsati.",
    frames: [
      { gradient: "linear-gradient(150deg,#2a2622 0%,#6e5a3f 60%,#c9a86a 100%)", ratio: "4 / 5" },
      { gradient: "linear-gradient(150deg,#3a2f28 0%,#8a6f4c 70%,#e6d2a8 100%)", ratio: "3 / 4" },
      { gradient: "linear-gradient(150deg,#241f1b 0%,#5a4733 65%,#b9925d 100%)", ratio: "1 / 1" },
    ],
  },
  {
    id: "bridal",
    title: "Bridal",
    blurb: "Indoor & outdoor bridal portraits.",
    frames: [
      { gradient: "linear-gradient(150deg,#3b2b2b 0%,#9a6f63 65%,#e8c9bd 100%)", ratio: "3 / 4" },
      { gradient: "linear-gradient(150deg,#2c2422 0%,#7d5a4e 70%,#d8b3a3 100%)", ratio: "1 / 1" },
      { gradient: "linear-gradient(150deg,#241d1c 0%,#6b4a44 65%,#caa193 100%)", ratio: "4 / 5" },
    ],
  },
  {
    id: "events",
    title: "Mehndi & Events",
    blurb: "Mehndi nights, nikkah & receptions.",
    frames: [
      { gradient: "linear-gradient(150deg,#23241b 0%,#5f6a3c 65%,#b6c178 100%)", ratio: "1 / 1" },
      { gradient: "linear-gradient(150deg,#2a2420 0%,#7a5f3c 70%,#d9bf7e 100%)", ratio: "4 / 5" },
      { gradient: "linear-gradient(150deg,#241f23 0%,#5d4763 65%,#b59ac4 100%)", ratio: "3 / 4" },
    ],
  },
  {
    id: "portraits",
    title: "Portraits & Family",
    blurb: "Studio portraits, family & product shoots.",
    frames: [
      { gradient: "linear-gradient(150deg,#211f1d 0%,#544f47 65%,#a39684 100%)", ratio: "1 / 1" },
      { gradient: "linear-gradient(150deg,#252321 0%,#5e5750 70%,#b3a89a 100%)", ratio: "3 / 4" },
      { gradient: "linear-gradient(150deg,#1f1d1c 0%,#4d4640 65%,#9c8f7e 100%)", ratio: "4 / 5" },
    ],
  },
];

export type Package = {
  name: string;
  price: string;
  includes: string[];
  featured?: boolean;
};

// Illustrative only — labelled "sample packages" in the UI.
export const packages: Package[] = [
  {
    name: "Nikkah",
    price: "Half-day",
    includes: [
      "Up to 4 hours coverage",
      "1 lead photographer",
      "120+ edited photos",
      "Online gallery delivery",
    ],
  },
  {
    name: "Full Wedding",
    price: "Multi-event",
    featured: true,
    includes: [
      "Baraat · Mehndi · Reception",
      "2 photographers + cinematographer",
      "Highlight film + 400+ edited photos",
      "Premium album included",
    ],
  },
  {
    name: "Bridal Shoot",
    price: "Indoor / outdoor",
    includes: [
      "Up to 3 hours session",
      "Location of your choice",
      "80+ retouched portraits",
      "Styling guidance",
    ],
  },
];

export const eventTypes = [
  "Full Wedding",
  "Nikkah",
  "Mehndi",
  "Bridal Shoot",
] as const;

export const cities = ["Lahore", "Islamabad", "Karachi", "Faisalabad"] as const;

export type EventType = (typeof eventTypes)[number];
export type City = (typeof cities)[number];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Deterministic date formatter: parses an ISO yyyy-mm-dd string with no
// timezone/Date dependency so output is identical on server and client.
export function formatDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  const [, y, m, d] = match;
  const month = MONTHS[Number(m) - 1] ?? "";
  return `${Number(d)} ${month} ${y}`;
}

// Builds the pre-filled WhatsApp enquiry message.
export function buildEnquiry(opts: {
  event: EventType;
  city: City;
  iso: string;
  name: string;
}): string {
  const who = opts.name.trim() ? opts.name.trim() : "(add your name)";
  return `Hi Ossama, is ${formatDate(opts.iso)} available for a ${opts.event} in ${opts.city}? — name: ${who}`;
}

// Default selected date for the demo (deterministic, no Date.now()).
export const DEFAULT_DATE = "2026-12-12";

// Static, deterministic data for the Islamabad Driving Center demo.
// No runtime network calls — everything renders client-side.

export type Course = {
  id: string;
  name: string;
  badge: string;
  priceLabel: string; // exactly as advertised
  priceValue: string; // short form for summaries
  blurb: string;
  includes: string[];
  transmission: string;
  sessions: string;
};

export type Branch = {
  id: string;
  name: string;
  address: string;
  city: string;
  hours: string;
};

// Prices shown are the school's published Instagram package prices.
export const COURSES: Course[] = [
  {
    id: "standard",
    name: "Standard Course",
    badge: "Most popular",
    priceLabel: "Rs 20,000",
    priceValue: "Rs 20,000",
    blurb: "Get road-ready with structured lessons and full license support.",
    includes: [
      "10 driving sessions, one-on-one",
      "Manual or automatic car",
      "Traffic-signs & road-rules class",
      "License processing help (city traffic police)",
    ],
    transmission: "Manual / Automatic",
    sessions: "10 sessions",
  },
  {
    id: "premium",
    name: "Premium Course",
    badge: "Fastest to licensed",
    priceLabel: "Rs 35,000",
    priceValue: "Rs 35,000",
    blurb: "More wheel time, motorway practice and end-to-end license handling.",
    includes: [
      "18 driving sessions, flexible timing",
      "Manual & automatic, both covered",
      "Motorway + city traffic confidence drives",
      "Full license processing (motorway & city police)",
    ],
    transmission: "Manual & Automatic",
    sessions: "18 sessions",
  },
];

export const BRANCHES: Branch[] = [
  {
    id: "i10",
    name: "I-10 Markaz (Head Office)",
    address: "Office #8, Zahid Plaza, I-10 Markaz",
    city: "Islamabad",
    hours: "Mon–Sat, 9:00 AM – 7:00 PM",
  },
  {
    id: "i84",
    name: "I-8/4 Branch",
    address: "Office #1, Plot 2F, Pakiza Market, I-8/4",
    city: "Islamabad",
    hours: "Mon–Sat, 9:00 AM – 7:00 PM",
  },
  {
    id: "shamsabad",
    name: "Shamsabad Branch",
    address: "Office #25, Maryam Hall Plaza, near Shamsabad Metro Station",
    city: "Rawalpindi",
    hours: "Mon–Sat, 9:00 AM – 7:00 PM",
  },
];

export const TIME_SLOTS: string[] = [
  "8:00 AM",
  "10:00 AM",
  "12:00 PM",
  "3:00 PM",
  "5:00 PM",
];

// The school enrols over WhatsApp on this number.
export const WHATSAPP_NUMBER = "923005086950";
export const WHATSAPP_DISPLAY = "0300 5086950";

// A fixed default start date so the demo is fully deterministic (no Date() at render).
export const DEFAULT_START_DATE = "2026-06-16";

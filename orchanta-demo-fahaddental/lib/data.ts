// Static, deterministic data for the Fahad Dental Square demo.
// No network calls, no secrets — everything renders client-side from here.

export const CLINIC = {
  name: "Fahad Dental Square",
  wordmarkLead: "Fahad Dental",
  wordmarkTail: "Square",
  tagline: "Modern dentistry in Chaklala Scheme 3, Rawalpindi",
  area: "Chaklala Scheme 3, Rawalpindi",
  address: "Chaklala Scheme 3 Market, near Subway Burger, Rawalpindi",
  phoneDisplay: "+92 333 9205864",
  // Used on the live site to open WhatsApp (wa.me/<digits>). Not dialled in this demo.
  whatsappNumber: "923339205864",
  consultationFee: "Consultation Rs 800",
} as const;

export const DOCTOR = {
  name: "Dr. Fahad Mustafa",
  title: "BDS · Certified Endodontist · Certified Implantologist",
  experience: "~10 years in clinical dentistry",
  bio:
    "Dr. Fahad Mustafa leads the clinic with a calm, patient-first approach — taking time to explain each step, keep treatment gentle, and answer questions before you decide.",
  credentials: [
    "BDS (Bachelor of Dental Surgery)",
    "Certified in Endodontics (C-Endo) — root canal care",
    "Certified in Implantology (C-Implant) — dental implants",
    "~10 years of hands-on clinical experience",
  ],
} as const;

export type Service = {
  id: string;
  name: string;
  blurb: string;
};

// The same six services power the booking picker and the services grid.
export const SERVICES: Service[] = [
  {
    id: "rct",
    name: "Root Canal (RCT)",
    blurb: "Save a decayed or aching tooth with gentle, careful root canal treatment.",
  },
  {
    id: "implant",
    name: "Dental Implant",
    blurb: "Replace a missing tooth with a natural-looking, long-lasting implant.",
  },
  {
    id: "braces",
    name: "Metallic Braces",
    blurb: "Straighten crowded or uneven teeth with a tailored braces plan.",
  },
  {
    id: "whitening",
    name: "Teeth Whitening",
    blurb: "Brighten stained teeth safely in a comfortable in-clinic visit.",
  },
  {
    id: "scaling",
    name: "Scaling & Polishing",
    blurb: "Remove plaque and surface stains to keep gums healthy and breath fresh.",
  },
  {
    id: "checkup",
    name: "Checkup, Filling & Extraction",
    blurb: "A thorough exam with tooth-coloured fillings or a careful extraction when needed.",
  },
];

export type Slot = { id: string; label: string };

// Fixed, plausible evening-friendly slots (demo content).
export const SLOTS: Slot[] = [
  { id: "11", label: "11:00 AM" },
  { id: "12", label: "12:00 PM" },
  { id: "13", label: "1:00 PM" },
  { id: "16", label: "4:00 PM" },
  { id: "17", label: "5:00 PM" },
  { id: "18", label: "6:00 PM" },
  { id: "19", label: "7:00 PM" },
  { id: "20", label: "8:00 PM" },
];

export const HOURS: { day: string; time: string }[] = [
  { day: "Mon – Sat", time: "11:00 AM – 2:00 PM · 4:00 PM – 9:00 PM" },
  { day: "Sunday", time: "By appointment" },
];

export type DayOption = { id: string; weekday: string; date: string; month: string };

// Build the next `count` days starting today. Called client-side after mount
// so the live demo always shows current dates without a hydration mismatch.
export function buildDays(count = 6): DayOption[] {
  const out: DayOption[] = [];
  const now = new Date();
  for (let i = 0; i < count; i += 1) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    out.push({
      id: d.toISOString().slice(0, 10),
      weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
      date: String(d.getDate()),
      month: d.toLocaleDateString("en-US", { month: "short" }),
    });
  }
  return out;
}

export function dayLabel(d: DayOption): string {
  return `${d.weekday} ${d.date} ${d.month}`;
}

// Build the exact pre-filled WhatsApp message a patient would send.
export function buildWhatsappMessage(
  serviceName: string,
  day: string,
  slot: string,
  name: string,
): string {
  const who = name.trim() ? name.trim() : "___";
  return `Hi Dr. Fahad, I'd like to book ${serviceName} on ${day} at ${slot} — name: ${who}`;
}

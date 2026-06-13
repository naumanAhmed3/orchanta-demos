// Sample data for the Uptail concept (built by Orchanta). Fictional inbound leads and
// conversations; named customers (Ironhack, Glovo, Elha) are Uptail's real public references,
// used illustratively. Metrics are kept within Uptail's real claimed ranges.

export type Source = "Meta Ad" | "Website form" | "Google Ad";
export type Sender = "agent" | "lead" | "system";
export type StageId = "engaged" | "qualified" | "objection" | "booked" | "synced";

export const STAGES: { id: StageId; label: string }[] = [
  { id: "engaged", label: "Engaged" },
  { id: "qualified", label: "Qualified" },
  { id: "objection", label: "Objection cleared" },
  { id: "booked", label: "Booked" },
  { id: "synced", label: "CRM synced" },
];

export interface Msg { from: Sender; text: string; stage?: StageId }
export interface Lead {
  id: string;
  name: string;
  initials: string;
  source: Source;
  account: string;
  vertical: string;
  reply: string; // first-reply latency
  revenue: number;
  recovered?: boolean;
  booking: { slot: string; with: string; crm: string };
  convo: Msg[];
}

export const leads: Lead[] = [
  {
    id: "lucia",
    name: "Lucía Romero",
    initials: "LR",
    source: "Meta Ad",
    account: "Ironhack",
    vertical: "Data Analytics bootcamp",
    reply: "6s",
    revenue: 3200,
    booking: { slot: "Thu · 10:30", with: "Marta — Admissions", crm: "HubSpot" },
    convo: [
      { from: "agent", text: "Hi Lucía! 👋 Saw you're interested in the Data Analytics bootcamp — looking to start full-time or part-time?", stage: "engaged" },
      { from: "lead", text: "Part-time, I'm working right now." },
      { from: "agent", text: "Perfect — the part-time cohort runs evenings over 6 months. Do you have a budget in mind, or want info on financing?", stage: "qualified" },
      { from: "lead", text: "Financing would help honestly, it feels expensive." },
      { from: "agent", text: "Totally get it — we offer 0% instalments and an income-share option, most part-timers use one. Want me to book 15 min with an admissions advisor?", stage: "objection" },
      { from: "lead", text: "Yes please, Thursday works." },
      { from: "agent", text: "Done ✅ Thursday 10:30 with Marta (Admissions). Calendar invite + WhatsApp reminder sent. See you then!", stage: "booked" },
      { from: "system", text: "Synced to HubSpot · stage → Meeting booked · transcript attached", stage: "synced" },
    ],
  },
  {
    id: "andres",
    name: "Andrés Gómez",
    initials: "AG",
    source: "Google Ad",
    account: "Elha",
    vertical: "Residential solar",
    reply: "7s",
    revenue: 4500,
    booking: { slot: "Fri · 10:00", with: "Free roof survey", crm: "Zoho" },
    convo: [
      { from: "agent", text: "Hola Andrés ☀️ You asked for a solar quote — is this for a home you own, and roughly what's your monthly electricity bill?", stage: "engaged" },
      { from: "lead", text: "Yes, my house. Around €180 a month." },
      { from: "agent", text: "At €180/mo you'd typically cut 60–80% with a 5–6kW system, often paid back in ~6 years. Want a free roof survey for an exact figure?", stage: "qualified" },
      { from: "lead", text: "Is the survey actually free? Last company charged me." },
      { from: "agent", text: "100% free, no obligation — we only earn if you decide to install. I can get a surveyor out this week. Friday morning OK?", stage: "objection" },
      { from: "lead", text: "Friday at 10 works." },
      { from: "agent", text: "Perfect ✅ Friday 10:00 roof survey booked — you'll get a same-day quote. ☀️", stage: "booked" },
      { from: "system", text: "Synced to Zoho CRM · stage → Survey booked", stage: "synced" },
    ],
  },
  {
    id: "thomas",
    name: "Thomas Müller",
    initials: "TM",
    source: "Website form",
    account: "Glovo Partners",
    vertical: "Courier signup",
    reply: "4s",
    revenue: 1800,
    booking: { slot: "Tomorrow · 17:00", with: "Partner onboarding", crm: "Salesforce" },
    convo: [
      { from: "agent", text: "Hi Thomas! 🛵 Thanks for signing up to deliver with Glovo. Do you already have a bike, e-bike or car?", stage: "engaged" },
      { from: "lead", text: "E-bike. How much can I make?" },
      { from: "agent", text: "Nice — e-bike couriers in your zone average €11–14/hr at peak. Weekends, weekdays, or both?", stage: "qualified" },
      { from: "lead", text: "Both, but the signup form was confusing tbh." },
      { from: "agent", text: "No worries — I'll get you through it in 2 minutes on a quick onboarding call. Tomorrow 5pm work?", stage: "objection" },
      { from: "lead", text: "Yeah that works." },
      { from: "agent", text: "Booked ✅ Tomorrow 17:00 onboarding with the partner team — bring your ID + e-bike details. 🚀", stage: "booked" },
      { from: "system", text: "Synced to Salesforce · stage → Onboarding scheduled", stage: "synced" },
    ],
  },
  {
    id: "emma",
    name: "Emma Fischer",
    initials: "EF",
    source: "Meta Ad",
    account: "Re-engagement",
    vertical: "No-show recovery",
    reply: "5s",
    revenue: 2800,
    recovered: true,
    booking: { slot: "Tomorrow · 16:00", with: "Rebooked call", crm: "HubSpot" },
    convo: [
      { from: "agent", text: "Hi Emma! We had a call booked today but couldn't reach you — no stress at all. Want me to find a better time? 😊", stage: "engaged" },
      { from: "lead", text: "Sorry, work got mad. Still interested though." },
      { from: "agent", text: "Totally understand! Would tomorrow afternoon suit better, or earlier in the week?", stage: "qualified" },
      { from: "lead", text: "Tomorrow afternoon is good." },
      { from: "agent", text: "Sorted ✅ Rebooked for tomorrow 16:00 — I'll send a WhatsApp reminder an hour before so it doesn't slip. 🙌", stage: "booked" },
      { from: "system", text: "Synced to HubSpot · no-show → Rebooked · recovered", stage: "synced" },
    ],
  },
];

export const stats = {
  responseRate: "68%",
  conversion: "47%",
  avgReply: "6s",
  meetingsToday: 13,
  pipelineBase: 38400, // € booked earlier today, before the lead playing now
};

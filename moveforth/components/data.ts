// Sample campaign data for the Moveforth Creative Automation Pipeline concept.
// All copy is realistic sample data for the fictional client "Northbeam Ops".

export const BRIEF = {
  client: "Northbeam Ops",
  category: "B2B field-service / maintenance SaaS",
  audience: "Ops leads at mid-market facilities teams",
  offer: "Cut unplanned downtime 30%",
  tone: "Confident, no-nonsense",
};

export const BRAND_TOKENS = {
  palette: [
    { hex: "#CB4003", label: "Accent" },
    { hex: "#511901", label: "Deep" },
    { hex: "#0C0C0D", label: "Canvas" },
    { hex: "#FFFFFF", label: "Type" },
    { hex: "#9CA3AF", label: "Muted" },
  ],
  dataTags: ["#05A1B5", "#CB0B6E", "#009C88"],
  toneTags: ["Confident", "No-nonsense", "B2B", "Ops-first"],
  type: { display: "Spline Sans", body: "Inter" },
};

// Streamed line-by-line "reasoning" for the Claude node.
export const CLAUDE_STREAM: string[] = [
  "Parsing brief → Northbeam Ops · B2B maintenance SaaS",
  "Audience: ops leads, mid-market facilities — risk-averse, ROI-driven",
  "Core promise: cut unplanned downtime 30% → lead with the cost of NOT acting",
  "Locking brand kit: burnt-orange accent, Spline Sans display, no hype",
  "Mapping 3 angles across awareness → consideration → conversion…",
];

export type AngleKind = "static" | "ugc" | "carousel";

export interface Angle {
  id: string;
  index: number;
  name: string;
  kind: AngleKind;
  kindLabel: string;
  stage: string;
  rationale: string;
}

export const ANGLES: Angle[] = [
  {
    id: "downtime",
    index: 1,
    name: "Downtime is a choice",
    kind: "static",
    kindLabel: "Static ad",
    stage: "Awareness",
    rationale: "Reframe downtime as a decision, not bad luck.",
  },
  {
    id: "in-sync",
    index: 2,
    name: "Your techs, finally in sync",
    kind: "ugc",
    kindLabel: "UGC · 15s",
    stage: "Consideration",
    rationale: "Show the daily chaos collapsing into one shared queue.",
  },
  {
    id: "audit",
    index: 3,
    name: "Audit-ready in one tap",
    kind: "carousel",
    kindLabel: "Carousel",
    stage: "Conversion",
    rationale: "De-risk the buy for compliance-driven ops.",
  },
];

// --- Creative payloads ---

export const STATIC_AD = {
  eyebrow: "NORTHBEAM OPS",
  headline: "Downtime is a choice.",
  stat: "30%",
  statCaption: "less unplanned downtime in the first 90 days",
  body: "Stop reacting to breakdowns. Northbeam flags failing assets before they cost you a shift.",
  cta: "See your downtime score",
};

export const UGC_SCRIPT = {
  duration: "0:15",
  beats: [
    {
      label: "HOOK",
      time: "0–3s",
      line: "My techs used to find out a machine was down from the angry email.",
    },
    {
      label: "DEMO",
      time: "3–12s",
      line: "Now Northbeam pings the right tech the second a reading drifts — one queue, no group chats, no guessing.",
    },
    {
      label: "CTA",
      time: "12–15s",
      line: "If your floor still runs on luck, book the 20-minute teardown.",
    },
  ],
  broll: "Phone alert → tech taps Accept → floor dashboard flips to green",
};

export const CAROUSEL = {
  slides: [
    { kicker: "01", title: "Every fix, logged automatically." },
    { kicker: "02", title: "Filter by asset, tech, or date — in seconds." },
    { kicker: "03", title: "Export a full audit pack in one tap." },
  ],
  cta: "Be audit-ready",
};

// Batch dramatization — extra on-brand cuts/sizes produced in the same run.
export const VARIANT_THUMBS = [
  { ratio: "1:1", kind: "Feed" },
  { ratio: "4:5", kind: "Feed" },
  { ratio: "9:16", kind: "Story" },
  { ratio: "9:16", kind: "Reel" },
  { ratio: "16:9", kind: "Display" },
  { ratio: "1:1", kind: "Retarget" },
  { ratio: "4:5", kind: "Carousel" },
  { ratio: "9:16", kind: "Story" },
  { ratio: "1:1", kind: "Email" },
];

export const BATCH = { variants: 12, seconds: 38 };

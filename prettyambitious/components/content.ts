// Real, verbatim content from Aditi Mishra / Pretty Ambitious.
// Surface mockups below are illustrative reconstructions using her real copy.

export const WORDMARK = "PRETTY AMBITIOUS";
export const BYLINE = "by Aditi Mishra";
export const TAGLINE =
  "For those who've been called too ambitious, too restless, too much.";
export const NEWSLETTER_LINE =
  "Tech, business, careers & smart reads for people who want more from life. 38,000+ readers.";
export const BIO_CHIP =
  "Founder, Pretty Ambitious · ex-LinkedIn · Chief of Staff @ Round · London.";

export const PARTNERS = ["Microsoft", "ServiceNow", "Meta", "Wise"];

export const PILLARS = [
  "Tech & AI",
  "Careers",
  "Money",
  "Creator economy",
] as const;

export type Pillar = (typeof PILLARS)[number];

export const POSTS: { title: string; pillar: Pillar; kicker: string }[] = [
  { title: "you are not a brand", pillar: "Creator economy", kicker: "Essay" },
  { title: "stop prompting. start thinking.", pillar: "Tech & AI", kicker: "Field notes" },
  {
    title: "the richer i get the more scared i become",
    pillar: "Money",
    kicker: "Letter",
  },
  { title: "how to get a job in 2026", pillar: "Careers", kicker: "Guide" },
  {
    title: "you're not bad at this. you just have taste 💅",
    pillar: "Creator economy",
    kicker: "Essay",
  },
];

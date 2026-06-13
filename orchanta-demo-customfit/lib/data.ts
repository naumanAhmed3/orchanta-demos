// All preview-card copy comes from the site's own published page metadata
// (customfitcollegecounseling.com — archived render of the homepage, Oct 2024).
// Nothing here is invented; the previews themselves are simulated for demo purposes.

export const site = {
  domain: "customfitcollegecounseling.com",
  url: "https://www.customfitcollegecounseling.com/",
  siteName: "CFCC",
  ogTitle: "College Prep | CFCC | Florida",
  ogDescription:
    "Here at CFCC we help find your perfect fit. Both with SAT and ACT Prep, as well as College Prep.",
};

export const crawlerLog = {
  today: {
    ua: "facebookexternalhit/1.1",
    line: "GET / → 500",
    note: "server error — nothing to render, no preview shown",
  },
  fixed: {
    ua: "facebookexternalhit/1.1",
    line: "GET / → 200 + og:title, og:image",
    note: "prerendered snapshot served — rich preview shown",
  },
};

export type Step = { n: string; title: string; body: string };

export const steps: Step[] = [
  {
    n: "1",
    title: "Detect the crawler",
    body: "A lightweight edge proxy sits in front of your homepage and recognizes link-preview crawlers by user-agent — facebookexternalhit, Twitterbot, WhatsApp and friends.",
  },
  {
    n: "2",
    title: "Serve a clean snapshot",
    body: "Crawlers get a prerendered OG snapshot: a clean 200 response with og:title, og:description and og:image — exactly what Messenger and iMessage need to build the card.",
  },
  {
    n: "3",
    title: "Humans pass straight through",
    body: "Parents and students are routed directly to your Wix site as always — zero changes to your Wix site, your editor, or your content.",
  },
];

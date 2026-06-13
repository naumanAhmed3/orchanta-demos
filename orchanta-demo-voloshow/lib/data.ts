/*
  All content is deterministic demo data — no AI calls, no network.
  Credit-pack numbers mirror Voloshow's live catalog (voloshow.com/pricing,
  read 13 Jun 2026): Basic $10/mo · 300 credits, Plus $24/mo · 800 credits,
  Pro $66/mo · 4,000 credits; images ≈ 1 credit, short videos ≈ 5 credits.
*/

export type PresetId = "serum" | "sneaker" | "coffee";

export interface Preset {
  id: PresetId;
  chip: string;
  prompt: string;
  renderNote: string;
}

export const presets: Preset[] = [
  {
    id: "serum",
    chip: "Skincare serum on marble",
    prompt:
      "Amber serum bottle on a white marble counter, soft morning window light, catalog-ready",
    renderNote: "1 credit · 1:1 catalog crop",
  },
  {
    id: "sneaker",
    chip: "Sneaker in violet studio",
    prompt:
      "Running sneaker floating in a dark studio, violet rim light, teal accent glow, ad hero shot",
    renderNote: "1 credit · 4:5 ad crop",
  },
  {
    id: "coffee",
    chip: "Coffee bag, warm kitchen",
    prompt:
      "Kraft coffee bag on a wooden kitchen counter, warm afternoon light, lifestyle scene",
    renderNote: "1 credit · 4:5 lifestyle crop",
  },
];

export interface UseCase {
  id: "product" | "video" | "cutout";
  title: string;
  blurb: string;
  beforeLabel: string;
  afterLabel: string;
}

export const useCases: UseCase[] = [
  {
    id: "product",
    title: "Product photos",
    blurb:
      "Turn a flat phone snapshot into a styled, catalog-ready scene — white-background, lifestyle, or studio.",
    beforeLabel: "Phone snapshot",
    afterLabel: "Styled scene",
  },
  {
    id: "video",
    title: "Social video",
    blurb:
      "Animate a still product shot into a short clip with camera motion — sized for Reels, TikTok, and Shorts.",
    beforeLabel: "Static image",
    afterLabel: "5s motion clip",
  },
  {
    id: "cutout",
    title: "Background removal",
    blurb:
      "Upload, get a clean transparent cutout in one step — ready for marketplaces and design tools.",
    beforeLabel: "Cluttered shot",
    afterLabel: "Clean cutout",
  },
];

export interface Pack {
  name: string;
  price: string;
  per: string;
  credits: string;
  images: string;
  videos: string;
  perImage: string;
  featured: boolean;
}

export const packs: Pack[] = [
  {
    name: "Basic",
    price: "$10",
    per: "/month",
    credits: "300 credits",
    images: "≈ 300 product photos",
    videos: "or ≈ 60 short videos",
    perImage: "about 3.3¢ per image",
    featured: false,
  },
  {
    name: "Plus",
    price: "$24",
    per: "/month",
    credits: "800 credits",
    images: "≈ 800 product photos",
    videos: "or ≈ 160 short videos",
    perImage: "about 3¢ per image",
    featured: true,
  },
  {
    name: "Pro",
    price: "$66",
    per: "/month",
    credits: "4,000 credits",
    images: "≈ 4,000 product photos",
    videos: "or ≈ 800 short videos",
    perImage: "under 1.7¢ per image",
    featured: false,
  },
];

export interface Step {
  n: string;
  title: string;
  body: string;
}

export const steps: Step[] = [
  {
    n: "1",
    title: "Pick a tool or a prompt",
    body: "Start from a sample prompt, your own words, or an upload — no account needed for your first three renders.",
  },
  {
    n: "2",
    title: "See the cost before you spend",
    body: "Every generation shows its exact credit cost up front. Failed or cancelled tasks release their credits automatically.",
  },
  {
    n: "3",
    title: "Download, ready to post",
    body: "Export in store and social sizes. Resize, compress, and convert tools run free in your browser — nothing uploaded.",
  },
];

export interface TrustPoint {
  title: string;
  body: string;
}

export const trustPoints: TrustPoint[] = [
  {
    title: "No credit roulette",
    body: "The exact credit estimate is shown before you submit — never after.",
  },
  {
    title: "Failed tasks cost nothing",
    body: "Errors, cancels, and timeouts release reserved credits back to you.",
  },
  {
    title: "Local tools stay local",
    body: "Resize, compress, and convert run in your browser at zero credits.",
  },
];

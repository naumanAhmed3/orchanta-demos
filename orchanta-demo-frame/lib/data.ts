// Sample data for the Frame concept (built by Orchanta). Class names, studios, postcodes and
// prices are Frame's real ones; the Need-State → class mapping is a plausible interpretation
// (Frame doesn't publish an official mapping), and instructor first-names + "spots left" are
// illustrative sample data.

export type NeedId = "energy" | "calm" | "strong" | "happy";
export type ClassType = "Yoga" | "Sweat" | "Pilates" | "Sculpt" | "Party" | "Mumhood";

export interface NeedState {
  id: NeedId;
  n: string;
  name: string;
  tagline: string;
  color: string;
  text: string;
}

export const needStates: NeedState[] = [
  { id: "energy", n: "01", name: "Find Your Energy", tagline: "Sweat it out, switch on.", color: "#e60f20", text: "#ffffff" },
  { id: "calm", n: "02", name: "Calm the F*** Down", tagline: "Slow down, breathe, release.", color: "#c8f746", text: "#0a0a0a" },
  { id: "strong", n: "03", name: "Strong AF", tagline: "Build real, lasting strength.", color: "#0a0a0a", text: "#ffffff" },
  { id: "happy", n: "04", name: "Happy High", tagline: "Dance it out, leave grinning.", color: "#ff88be", text: "#0a0a0a" },
];

export const studios: Record<string, { name: string; address: string }> = {
  shoreditch: { name: "Frame Shoreditch", address: "29 New Inn Yard, EC2A 3EY" },
  kingscross: { name: "Frame Kings Cross", address: "Arthouse, 1 York Way, N1C 4AS" },
  angel: { name: "Frame Angel", address: "Angel Central, 21 Parkfield St, N1 0PS" },
  hammersmith: { name: "Frame Hammersmith", address: "Unit 17, Livat, Kings St, W6 0PZ" },
  victoria: { name: "Frame Victoria", address: "4 Bridge Pl, SW1V 1AF" },
};

export interface Session {
  id: string;
  time: string;
  cls: string;
  need: NeedId;
  type: ClassType;
  studio: keyof typeof studios | string;
  instructor: string;
  tier: "Signature" | "All In";
  price: number;
  reformer: boolean;
  spots: number;
  desc: string;
}

export const sessions: Session[] = [
  { id: "s1", time: "07:00", cls: "Reformer Pilates", need: "strong", type: "Pilates", studio: "shoreditch", instructor: "Mia", tier: "All In", price: 24, reformer: true, spots: 4, desc: "Low-impact, high-burn. Build deep core and full-body strength on the reformer." },
  { id: "s2", time: "08:15", cls: "Dynamic Vinyasa Yoga", need: "energy", type: "Yoga", studio: "kingscross", instructor: "Remi", tier: "Signature", price: 17, reformer: false, spots: 8, desc: "Breath-led flow that wakes the whole body up. Leave buzzing." },
  { id: "s3", time: "09:30", cls: "Dance Cardio", need: "energy", type: "Party", studio: "angel", instructor: "Lola", tier: "Signature", price: 17, reformer: false, spots: 6, desc: "A banging playlist and zero choreography pressure. Just move." },
  { id: "s4", time: "10:00", cls: "Slow Flow Yoga", need: "calm", type: "Yoga", studio: "victoria", instructor: "Noa", tier: "Signature", price: 17, reformer: false, spots: 10, desc: "Unhurried, grounding flow to take the edge off the day." },
  { id: "s5", time: "12:15", cls: "Ass & Abs", need: "strong", type: "Sculpt", studio: "shoreditch", instructor: "Jess", tier: "Signature", price: 17, reformer: false, spots: 3, desc: "Exactly what it says. Glutes and core, 45 focused minutes." },
  { id: "s6", time: "12:30", cls: "Mat Pilates", need: "strong", type: "Pilates", studio: "hammersmith", instructor: "Alex", tier: "Signature", price: 17, reformer: false, spots: 7, desc: "Controlled, precise, deeply effective. No kit, all core." },
  { id: "s7", time: "13:00", cls: "Rebounding", need: "energy", type: "Sweat", studio: "kingscross", instructor: "Theo", tier: "Signature", price: 17, reformer: false, spots: 5, desc: "Trampoline cardio that feels like play and burns like a run." },
  { id: "s8", time: "17:45", cls: "Sweat and Burn", need: "energy", type: "Sweat", studio: "hammersmith", instructor: "Jess", tier: "Signature", price: 17, reformer: false, spots: 2, desc: "Full-body HIIT to shake off the day and get serotoned." },
  { id: "s9", time: "18:00", cls: "Frame Barre", need: "strong", type: "Sculpt", studio: "angel", instructor: "Sage", tier: "Signature", price: 17, reformer: false, spots: 6, desc: "Tiny movements, big shakes. Long, strong, lifted." },
  { id: "s10", time: "18:30", cls: "Music Video", need: "happy", type: "Party", studio: "shoreditch", instructor: "Lola", tier: "Signature", price: 17, reformer: false, spots: 9, desc: "Learn a routine to one banger. Leave feeling like a popstar." },
  { id: "s11", time: "19:00", cls: "Candlelit Yin Yoga", need: "calm", type: "Yoga", studio: "victoria", instructor: "Noa", tier: "Signature", price: 17, reformer: false, spots: 11, desc: "Long, candle-lit holds. The big let go your nervous system needs." },
  { id: "s12", time: "19:15", cls: "Dynamic Reformer Pilates", need: "strong", type: "Pilates", studio: "kingscross", instructor: "Mia", tier: "All In", price: 24, reformer: true, spots: 4, desc: "Faster-paced reformer. Strength and sweat in equal measure." },
  { id: "s13", time: "19:45", cls: "The Big Let Go", need: "calm", type: "Yoga", studio: "angel", instructor: "Sage", tier: "Signature", price: 17, reformer: false, spots: 8, desc: "Restorative release work to properly calm the f*** down." },
  { id: "s14", time: "20:00", cls: "Flow State", need: "happy", type: "Party", studio: "hammersmith", instructor: "Theo", tier: "Signature", price: 17, reformer: false, spots: 7, desc: "Movement, music and a room full of good energy. Pure mood-lift." },
];

export const introOffer = "Try any 3 classes in 2 weeks for £40 · includes Reformer";

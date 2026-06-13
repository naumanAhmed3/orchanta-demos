/* Program facts (names, ages, formats) come from salastraining.com.
   Prices are illustrative for this concept — final pricing is set by Salas Training. */

export const SIBLING_DISCOUNT = 0.2; // 20% off the second player

export type Tier = {
  id: string;
  name: string;
  tagline: string;
  ages: string;
  monthly: number;
  annual: number; // package deal: 10x monthly = 2 months free
  featured?: boolean;
  includes: string[];
};

export const TIERS: Tier[] = [
  {
    id: "salas-training",
    name: "Salas Training",
    tagline: "Foundational development",
    ages: "Ages 1.5–10",
    monthly: 149,
    annual: 1490,
    includes: [
      "Futbolito Tots, Juniors & Ballers groups",
      "Group classes & school partnerships",
      "Private pods with friends or teammates",
      "Camps — no-school days, breaks & summer",
    ],
  },
  {
    id: "stfc-elite-lab",
    name: "STFC Elite Lab",
    tagline: "1-on-1 & small private groups",
    ages: "All ages · competitive players",
    monthly: 329,
    annual: 3290,
    featured: true,
    includes: [
      "Personalised 1-on-1 Lab sessions",
      "Plans built around each player’s weaknesses",
      "Small private group options",
      "Long-term development goals & check-ins",
    ],
  },
  {
    id: "buenavista-fc",
    name: "Buenavista FC",
    tagline: "Year-round club training",
    ages: "Ages 6–12",
    monthly: 179,
    annual: 1790,
    includes: [
      "Training 2x per week, all year round",
      "Two-hour sessions in the Sunset Park area",
      "Skill development, teamwork & game play",
      "Winter sessions at a Park Slope indoor facility",
    ],
  },
];

export function formatUSD(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

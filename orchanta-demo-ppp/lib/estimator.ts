// Guaranteed-rent estimator. Figures are modelled from public 2026 Newcastle market-rent data
// (clearly indicative, not PPP's actual offer). Base = NE6/Heaton; areas apply a local multiplier.

export const areas = [
  { id: "ne1", label: "NE1 · City Centre", mult: 1.25 },
  { id: "ne2", label: "NE2 · Jesmond", mult: 1.45 },
  { id: "ne34", label: "NE3/NE4 · Gosforth & West", mult: 1.10 },
  { id: "ne6", label: "NE6 · Heaton & Byker", mult: 1.0 },
  { id: "gates", label: "Gateshead", mult: 0.95 },
  { id: "sund", label: "Sunderland", mult: 0.85 },
];

export const bedroomOptions = [
  { id: "studio", label: "Studio", base: 625 },
  { id: "1", label: "1 bedroom", base: 775 },
  { id: "2", label: "2 bedrooms", base: 975 },
  { id: "3", label: "3 bedrooms", base: 1200 },
  { id: "4", label: "4 bedrooms", base: 1450 },
];

export const propertyTypes = [
  { id: "flat", label: "Flat / Apartment", mult: 1.0 },
  { id: "terraced", label: "Terraced house", mult: 1.02 },
  { id: "semi", label: "Semi / Detached", mult: 1.05 },
];

export const contracts = [
  { id: "2", label: "2 years", pct: 0.88 },
  { id: "3", label: "3 years", pct: 0.9 },
  { id: "5", label: "5 years", pct: 0.93 },
];

export interface EstimateInput { area: string; bedroom: string; type: string; furnished: boolean; contract: string }
export interface Estimate {
  market: number;
  guaranteed: number;
  guaranteedPct: number;
  standardNetAnnual: number;
  pppNetAnnual: number;
  annualDiff: number;
}

export function estimate(i: EstimateInput): Estimate {
  const a = areas.find((x) => x.id === i.area) ?? areas[3];
  const b = bedroomOptions.find((x) => x.id === i.bedroom) ?? bedroomOptions[2];
  const t = propertyTypes.find((x) => x.id === i.type) ?? propertyTypes[0];
  const c = contracts.find((x) => x.id === i.contract) ?? contracts[1];
  const market = Math.round((b.base * a.mult * t.mult * (i.furnished ? 1.05 : 1)) / 5) * 5;
  const guaranteed = Math.round((market * c.pct) / 5) * 5;
  // standard letting, net: ~1 month void a year (11 months let) minus ~11% agency + management fees
  const standardNetAnnual = Math.round(market * 11 * 0.89);
  const pppNetAnnual = guaranteed * 12;
  return { market, guaranteed, guaranteedPct: c.pct, standardNetAnnual, pppNetAnnual, annualDiff: pppNetAnnual - standardNetAnnual };
}

export const gbp = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");

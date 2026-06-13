// Deterministic checkout-rate engine for the simulator. No network calls.
//
// It models the exact gap from Strahltechnik Express's Shopify Community post:
// the Carrier Service API request does NOT include the buyer's USt-IdNr. /
// VAT-exempt status, so the carrier-calculated rate is computed as if every
// buyer were a gross-paying consumer. A B2B customer in another EU country
// with a valid USt-IdNr. should pay the NET rate (Reverse-Charge, §13b /
// Art. 196 MwStSystRL) — today they are charged destination VAT on shipping.
//
// "withApp" = a custom carrier-service app that receives the buyer's B2B/VAT
// status (customer metafield, validated against VIES) and returns the right rate.
// All rates are illustrative demo figures (Beispieldaten).

import {
  CARRIER_SERVICES,
  COUNTRIES,
  type Country,
  type CountryCode,
  type CustomerType,
  type PresetId,
} from "./data";

export interface RateLine {
  service: string;
  carrier: string;
  eta: string;
  /** Net carrier rate, EUR. */
  net: number;
  /** VAT rate applied to this line (0 when Reverse-Charge applies). */
  vatRate: number;
  /** Amount the customer is charged at checkout, EUR. */
  charged: number;
  /** Short tax label shown under the price, e.g. "inkl. 19 % USt.". */
  taxLabel: string;
}

export interface SimulationResult {
  country: Country;
  /** True when Reverse-Charge applies: B2B, valid USt-IdNr., destination ≠ DE. */
  reverseCharge: boolean;
  /** Rates a correct, VAT-aware carrier-service app would return. */
  withApp: RateLine[];
  /** Rates today's setup returns (Carrier Service API without VAT status). */
  today: RateLine[];
  /** Overcharge today vs. correct, per service, EUR (0 when today is correct). */
  deltas: number[];
  /** Largest per-order overcharge across services, EUR. */
  maxDelta: number;
}

export interface VatIdCheck {
  /** Format matches the destination country's USt-IdNr. pattern. */
  valid: boolean;
  /** Message for the simulated VIES check, German. */
  message: string;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

export function getCountry(code: CountryCode): Country {
  // COUNTRIES covers every CountryCode, so the lookup always succeeds.
  return COUNTRIES.find((c) => c.code === code) as Country;
}

/** Client-side format check, presented as a simulated VIES lookup (Demo-Modus). */
export function checkVatId(raw: string, country: Country): VatIdCheck {
  const id = raw.replace(/[\s.-]/g, "").toUpperCase();
  if (id.length === 0) {
    return {
      valid: false,
      message: `USt-IdNr. eingeben — Format ${country.code}: ${country.vatIdHint} (z. B. ${country.vatIdExample})`,
    };
  }
  if (!id.startsWith(country.code)) {
    return {
      valid: false,
      message: `Länderkennzeichen passt nicht zu ${country.name} — erwartet wird „${country.code}…“.`,
    };
  }
  if (!country.vatIdPattern.test(id)) {
    return {
      valid: false,
      message: `Ungültiges Format für ${country.name} — erwartet: ${country.vatIdHint} (z. B. ${country.vatIdExample}).`,
    };
  }
  return {
    valid: true,
    message: `Format gültig — simulierte VIES-Prüfung: ${id} ✓ (Demo-Modus, keine echte Abfrage)`,
  };
}

function buildLine(
  service: { service: string; carrier: string; eta: string },
  net: number,
  vatRate: number,
  taxLabel: string,
): RateLine {
  return {
    service: service.service,
    carrier: service.carrier,
    eta: service.eta,
    net,
    vatRate,
    charged: round2(net * (1 + vatRate)),
    taxLabel,
  };
}

const pct = (rate: number) => `${Math.round(rate * 100)} %`;

/**
 * Compute both rate tables for one checkout scenario.
 * - B2C: gross rates incl. destination-country VAT (OSS) — today already correct.
 * - B2B DE: domestic, no Reverse-Charge — VAT is charged, today already correct.
 * - B2B EU (valid USt-IdNr.): Reverse-Charge → net rate; today wrongly charges gross.
 * - B2B without a valid USt-IdNr.: treated like B2C (gross) until the ID validates.
 */
export function simulateRates(
  presetId: PresetId,
  countryCode: CountryCode,
  customerType: CustomerType,
  vatIdValid: boolean,
): SimulationResult {
  const country = getCountry(countryCode);
  const services = CARRIER_SERVICES[presetId];
  const cfg = customerType === "b2b" && vatIdValid;
  const reverseCharge = cfg && country.code !== "DE";

  const grossLabel = `inkl. ${pct(country.vatRate)} USt.`;

  const withApp = services.map((s) => {
    const net = s.net[country.code];
    if (reverseCharge) {
      return buildLine(s, net, 0, "netto — Reverse-Charge (Art. 196 MwStSystRL)");
    }
    if (cfg && country.code === "DE") {
      return buildLine(s, net, 0.19, "inkl. 19 % USt. (Inland, kein Reverse-Charge)");
    }
    return buildLine(s, net, country.vatRate, grossLabel);
  });

  // Today: the carrier service never learns the VAT status → always gross.
  const today = services.map((s) =>
    buildLine(s, s.net[country.code], country.vatRate, grossLabel),
  );

  const deltas = today.map((t, i) => round2(t.charged - withApp[i].charged));
  const maxDelta = deltas.reduce((m, d) => (d > m ? d : m), 0);

  return { country, reverseCharge, withApp, today, deltas, maxDelta };
}

/** German price formatting, e.g. "11,60 €". Deterministic for SSR + client. */
export function eur(n: number): string {
  const [int, frac] = n.toFixed(2).split(".");
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${grouped},${frac} €`;
}

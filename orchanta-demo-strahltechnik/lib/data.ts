// Static demo data for the VAT-aware shipping-rate simulator.
// All figures are illustrative example data (Beispieldaten) — not live carrier prices
// and not Strahltechnik Express's actual shipping table.

export type CustomerType = "b2c" | "b2b";
export type CountryCode = "DE" | "AT" | "NL" | "FR";
export type PresetId = "parcel" | "pallet";

export interface Country {
  code: CountryCode;
  /** German display name, as the shop's checkout would show it. */
  name: string;
  /** Standard VAT rate applied to B2C shipments into this country (OSS distance selling). */
  vatRate: number;
  /** USt-IdNr. format for the simulated VIES check. */
  vatIdPattern: RegExp;
  /** A correctly formatted example USt-IdNr. for this country. */
  vatIdExample: string;
  /** Human-readable description of the expected format. */
  vatIdHint: string;
}

export const COUNTRIES: Country[] = [
  {
    code: "DE",
    name: "Deutschland",
    vatRate: 0.19,
    vatIdPattern: /^DE[0-9]{9}$/,
    vatIdExample: "DE123456789",
    vatIdHint: "DE + 9 Ziffern",
  },
  {
    code: "AT",
    name: "Österreich",
    vatRate: 0.2,
    vatIdPattern: /^ATU[0-9]{8}$/,
    vatIdExample: "ATU12345678",
    vatIdHint: "ATU + 8 Ziffern",
  },
  {
    code: "NL",
    name: "Niederlande",
    vatRate: 0.21,
    vatIdPattern: /^NL[0-9]{9}B[0-9]{2}$/,
    vatIdExample: "NL123456789B01",
    vatIdHint: "NL + 9 Ziffern + B + 2 Ziffern",
  },
  {
    code: "FR",
    name: "Frankreich",
    vatRate: 0.2,
    vatIdPattern: /^FR[0-9A-Z]{2}[0-9]{9}$/,
    vatIdExample: "FR12345678901",
    vatIdHint: "FR + 2 Zeichen + 9 Ziffern",
  },
];

export interface CartPreset {
  id: PresetId;
  label: string;
  /** What is in the simulated cart. */
  contents: string;
  weight: string;
  /** Net merchandise value, EUR — display only. */
  goodsNet: number;
}

export const CART_PRESETS: CartPreset[] = [
  {
    id: "parcel",
    label: "Kleinteile-Paket",
    contents: "Strahldüsen, Düsenhalter & Verschleißteile",
    weight: "4,5 kg",
    goodsNet: 186.5,
  },
  {
    id: "pallet",
    label: "80-kg-Palette",
    contents: "Sandstrahlkabine + Strahlmittel (Spedition)",
    weight: "80 kg",
    goodsNet: 1240.0,
  },
];

export interface CarrierService {
  service: string;
  carrier: string;
  eta: string;
  /** Net carrier rate in EUR per destination country (illustrative). */
  net: Record<CountryCode, number>;
}

/** Carrier services offered per cart preset — net base rates, VAT is applied on top. */
export const CARRIER_SERVICES: Record<PresetId, CarrierService[]> = {
  parcel: [
    {
      service: "Paket Standard",
      carrier: "DHL",
      eta: "1–2 Werktage (DE) · 2–4 (EU)",
      net: { DE: 5.79, AT: 11.6, NL: 11.6, FR: 13.45 },
    },
    {
      service: "Paket Express",
      carrier: "DHL Express",
      eta: "nächster Werktag",
      net: { DE: 12.9, AT: 24.5, NL: 24.5, FR: 27.9 },
    },
  ],
  pallet: [
    {
      service: "Spedition bis 100 kg",
      carrier: "Palettenversand",
      eta: "2–3 Werktage (DE) · 4–6 (EU)",
      net: { DE: 49.0, AT: 89.0, NL: 94.0, FR: 109.0 },
    },
  ],
};

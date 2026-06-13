// lib/data.ts — fictional example data only (eksempeldata), clearly demo-scale.
// Names, org numbers, prices and order IDs are invented; products are merely
// *typical* of a health-technology & supplements store.

import type { Order } from "./vat";

/** Five fictional orders mixing the three MVA classes Uno Vita handles. */
export const ORDERS: Order[] = [
  {
    // Mixed-rate domestic order: a 25% device + a 15% supplement in ONE order.
    id: "#30412",
    customer: "Kari Nordmann",
    destination: "Oslo, Norge",
    country: "NO",
    currency: "NOK",
    b2b: false,
    lines: [
      {
        name: "PEMF-terapimatte Pro",
        nameEn: "PEMF therapy mat",
        qty: 1,
        unitPriceExVat: 11992,
        vatClass: "standard",
        manualCollectionRate: 25,
        channel: "own",
      },
      {
        name: "Omega-3 marine olje, 500 ml",
        nameEn: "Omega-3 marine oil",
        qty: 2,
        unitPriceExVat: 339.13,
        vatClass: "food",
        manualCollectionRate: 15,
        channel: "own",
      },
    ],
  },
  {
    // B2B clinic order, standard 25%.
    id: "#30413",
    customer: "Klinikk Balanse AS",
    destination: "Bergen, Norge",
    country: "NO",
    currency: "NOK",
    b2b: true,
    lines: [
      {
        name: "Rødlysterapi-panel 600W",
        nameEn: "Red-light therapy panel",
        qty: 2,
        unitPriceExVat: 7196,
        vatClass: "standard",
        manualCollectionRate: 25,
        channel: "own",
      },
    ],
  },
  {
    // Export to Switzerland: 0% (fritatt), settled in CHF.
    id: "#30414",
    customer: "Thomas Keller",
    destination: "Zürich, Sveits",
    country: "CH",
    currency: "CHF",
    b2b: false,
    lines: [
      {
        name: "Infrarød knemassasjer",
        nameEn: "Infrared knee massager",
        qty: 1,
        unitPriceExVat: 219,
        vatClass: "export-zero",
        manualCollectionRate: 0,
        channel: "own",
      },
    ],
  },
  {
    // THE PROBLEM CASE — Shopify Collective resold supplement: it is a
    // næringsmiddel (correct: 15%), but the partner store's collection rate
    // (25%) leaks through, so the manual setup records the wrong MVA.
    id: "#30415",
    customer: "Per Hansen",
    destination: "Stavanger, Norge",
    country: "NO",
    currency: "NOK",
    b2b: false,
    lines: [
      {
        name: "Vitamin D3 + K2 dråper",
        nameEn: "Vitamin D3 + K2 drops",
        qty: 3,
        unitPriceExVat: 295.65,
        vatClass: "food",
        manualCollectionRate: 25, // <- wrong: supplier collection says 25%
        channel: "collective",
      },
    ],
  },
  {
    // Export to Sweden, settled in SEK: 0% out of Norway.
    id: "#30416",
    customer: "Hälsohuset Norden AB",
    destination: "Stockholm, Sverige",
    country: "SE",
    currency: "SEK",
    b2b: true,
    lines: [
      {
        name: "Kollagenpulver, 12-pack",
        nameEn: "Collagen powder, 12-pack",
        qty: 1,
        unitPriceExVat: 2868,
        vatClass: "export-zero",
        manualCollectionRate: 0,
        channel: "own",
      },
    ],
  },
];

/** The order the EHF/Tripletex panel demonstrates (mixed 25% + 15%). */
export const EHF_ORDER_ID = "#30412";

/** Fixed, fictional invoice metadata — deterministic on purpose. */
export const EHF_META = {
  standard: "EHF Faktura 3.0 (PEPPOL BIS Billing 3.0)",
  invoiceNo: "F-2026-1042",
  issueDate: "1. juni 2026",
  dueDate: "15. juni 2026",
  seller: "Uno Vita AS (demo)",
  sellerOrgNr: "999 888 777 MVA", // fictional
  buyerOrgNr: "—",
  tripletexVoucher: "Bilag 2026-0617",
  tripletexLedger: "3000 Salg / 2700 Utgående MVA",
  syncedAtLabel: "i dag kl. 09:42", // fixed label — simulated, not a clock
};

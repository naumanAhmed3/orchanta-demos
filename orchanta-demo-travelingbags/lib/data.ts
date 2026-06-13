/**
 * Demo catalog for the Traveling Bags Box-Fit & Rate Estimator.
 *
 * Product names mirror real listings on travelingbagsmke.com (Travelpro,
 * Briggs & Riley, Osprey, Ricardo Beverly Hills are brands the store carries).
 * Shipping dimensions and weights are TYPICAL PUBLISHED LUGGAGE SPECS used for
 * illustration only — in production these would come straight from each
 * product's metafields in Shopify.
 */

/** Outer dimensions in inches: [length, width, height]. */
export type Dims = readonly [number, number, number];

export interface Product {
  id: string;
  /** Display name, mirroring the live listing title. */
  name: string;
  brand: string;
  /** Per-item ship dimensions (outer, incl. wheels/handles), inches. */
  dims: Dims;
  /** Actual item weight in pounds. */
  weightLb: number;
}

export interface Box {
  id: string;
  name: string;
  /** Inner dimensions of the carton, inches. */
  dims: Dims;
  /** Empty-carton weight in pounds (added to actual weight). */
  tareLb: number;
}

export interface Zone {
  id: string;
  /** Carrier zone label. */
  name: string;
  /** Example destination from New Berlin, WI. */
  example: string;
  /** Illustrative rate model: base + perLb x billable lb. */
  base: number;
  perLb: number;
}

/** Small demo catalog — 8 items the store actually lists. */
export const PRODUCTS: Product[] = [
  {
    id: "platinum-elite-25",
    name: 'Platinum Elite 25" Expandable Spinner Suiter',
    brand: "Travelpro",
    dims: [25.5, 18, 11.25],
    weightLb: 11.4,
  },
  {
    id: "baseline-global-co",
    name: "Baseline Global Carry-On Spinner",
    brand: "Briggs & Riley",
    dims: [21, 14, 9],
    weightLb: 10.3,
  },
  {
    id: "baseline-medium",
    name: "Baseline Medium Expandable Spinner",
    brand: "Briggs & Riley",
    dims: [26, 19, 12.5],
    weightLb: 12.5,
  },
  {
    id: "tourlite-25",
    name: 'Tourlite 25" Expandable Spinner',
    brand: "Travelpro",
    dims: [25, 17.5, 11],
    weightLb: 7.9,
  },
  {
    id: "maxlite-19",
    name: 'Maxlite 5 19" International Carry-On Spinner',
    brand: "Travelpro",
    dims: [19, 13, 9],
    weightLb: 5.4,
  },
  {
    id: "crew-underseat-tote",
    name: "Crew Classic Underseat Tote",
    brand: "Travelpro",
    dims: [16, 12, 7.5],
    weightLb: 2.4,
  },
  {
    id: "daylite-plus",
    name: "Daylite Plus Backpack",
    brand: "Osprey",
    dims: [19, 11, 9],
    weightLb: 1.5,
  },
  {
    id: "packing-cube-set",
    name: "Carry-On Packing Cube Set (X111)",
    brand: "Briggs & Riley",
    dims: [14, 10, 4],
    weightLb: 1.2,
  },
];

/** The store's standard carton library, smallest to largest. */
export const BOXES: Box[] = [
  { id: "tote", name: "Tote & Accessory Carton", dims: [18, 14, 10], tareLb: 0.8 },
  { id: "carry-on", name: "Carry-On Carton", dims: [24, 16, 12], tareLb: 1.2 },
  { id: "single-spinner", name: "Single Spinner Carton", dims: [28, 20, 14], tareLb: 1.6 },
  { id: "double-pack", name: "Double-Pack Carton", dims: [30, 22, 18], tareLb: 2.1 },
  { id: "oversize-twin", name: "Oversize Twin Carton", dims: [40, 24, 20], tareLb: 2.8 },
];

/** Illustrative ground rates by zone, shipping from New Berlin, WI 53151. */
export const ZONES: Zone[] = [
  { id: "z2", name: "Zone 2", example: "Chicago, IL", base: 9.5, perLb: 0.42 },
  { id: "z4", name: "Zone 4", example: "Atlanta, GA", base: 12.0, perLb: 0.58 },
  { id: "z6", name: "Zone 6", example: "Denver, CO", base: 15.5, perLb: 0.74 },
  { id: "z8", name: "Zone 8", example: "Los Angeles, CA", base: 19.0, perLb: 0.92 },
];

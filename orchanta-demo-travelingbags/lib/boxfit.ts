/**
 * Deterministic box-fit + dimensional-weight engine.
 *
 * Everything here is pure math — no network, no randomness — so the same
 * order always produces the same packing plan and the same quote.
 *
 * Model (kept honest for a demo):
 *  - An item fits a carton if its sorted dimensions are <= the carton's
 *    sorted dimensions (it can be rotated, not folded).
 *  - A carton's usable volume is PACK_FACTOR x its cubic volume, reserving
 *    headroom for padding and imperfect nesting.
 *  - Dimensional weight = carton L x W x H / 139 (standard domestic divisor),
 *    rounded UP. The carrier bills whichever is greater: dimensional weight
 *    or actual weight (items + carton tare).
 */

import { BOXES, ZONES, type Box, type Dims, type Product, type Zone } from "./data";

/** Share of a carton's cubic volume that items may occupy. */
export const PACK_FACTOR = 0.85;

/** Domestic dimensional-weight divisor (in^3 per lb). */
export const DIM_DIVISOR = 139;

export interface PackedBox {
  box: Box;
  items: Product[];
  /** Sum of item volumes, in^3. */
  usedCubicIn: number;
  /** usedCubicIn / box volume, as 0-100. */
  fillPct: number;
  /** Items + carton tare, rounded up to the billing pound. */
  actualLb: number;
  /** ceil(box volume / DIM_DIVISOR). */
  dimLb: number;
  /** max(actualLb, dimLb) — what the carrier charges on. */
  billableLb: number;
  billedBy: "dimensional" | "actual";
}

export interface ZoneQuote {
  zone: Zone;
  /** Sum of per-box rates for the order, USD. */
  total: number;
}

export interface Estimate {
  items: Product[];
  totalCubicIn: number;
  boxes: PackedBox[];
  quotes: ZoneQuote[];
}

/** L x W x H in cubic inches. */
export function cubicIn(dims: Dims): number {
  return dims[0] * dims[1] * dims[2];
}

/** Sorted copy, largest dimension first. */
function sorted(dims: Dims): [number, number, number] {
  return [...dims].sort((a, b) => b - a) as [number, number, number];
}

/** True if the item can physically go inside the carton (rotation allowed). */
export function fitsIn(item: Dims, box: Dims): boolean {
  const i = sorted(item);
  const b = sorted(box);
  return i[0] <= b[0] && i[1] <= b[1] && i[2] <= b[2];
}

/** Usable item volume of a carton after the padding reserve. */
function capacity(box: Box): number {
  return cubicIn(box.dims) * PACK_FACTOR;
}

/** Smallest carton that holds every item dimensionally AND by volume. */
function smallestSingleBox(items: Product[]): Box | null {
  const need = items.reduce((sum, p) => sum + cubicIn(p.dims), 0);
  // BOXES is ordered smallest -> largest, so the first hit is the best fit.
  for (const box of BOXES) {
    const allFit = items.every((p) => fitsIn(p.dims, box.dims));
    if (allFit && need <= capacity(box)) return box;
  }
  return null;
}

/**
 * Split an order across cartons: first-fit-decreasing by item volume.
 * New cartons open as a Double-Pack (the workhorse size) when the item fits
 * it, otherwise as the smallest carton that holds the item. After packing,
 * each carton is shrunk to the smallest size that still holds its contents.
 */
function multiBoxPlan(items: Product[]): { box: Box; items: Product[] }[] {
  const workhorse = BOXES.find((b) => b.id === "double-pack") ?? BOXES[BOXES.length - 1];
  const byVolume = [...items].sort((a, b) => cubicIn(b.dims) - cubicIn(a.dims));
  const open: { box: Box; items: Product[]; used: number }[] = [];

  for (const item of byVolume) {
    const vol = cubicIn(item.dims);
    const slot = open.find(
      (o) => fitsIn(item.dims, o.box.dims) && o.used + vol <= capacity(o.box),
    );
    if (slot) {
      slot.items.push(item);
      slot.used += vol;
    } else {
      const box = fitsIn(item.dims, workhorse.dims)
        ? workhorse
        : (BOXES.find((b) => fitsIn(item.dims, b.dims)) ?? workhorse);
      open.push({ box, items: [item], used: vol });
    }
  }

  // Shrink: re-run the single-box pick per carton so nothing ships oversized.
  return open.map((o) => ({ box: smallestSingleBox(o.items) ?? o.box, items: o.items }));
}

/** Dim weight, actual weight, and the billed figure for one packed carton. */
function weighBox(box: Box, items: Product[]): PackedBox {
  const usedCubicIn = items.reduce((sum, p) => sum + cubicIn(p.dims), 0);
  const actualLb = Math.ceil(items.reduce((sum, p) => sum + p.weightLb, 0) + box.tareLb);
  const dimLb = Math.ceil(cubicIn(box.dims) / DIM_DIVISOR);
  const billableLb = Math.max(actualLb, dimLb);
  return {
    box,
    items,
    usedCubicIn,
    fillPct: Math.round((usedCubicIn / cubicIn(box.dims)) * 100),
    actualLb,
    dimLb,
    billableLb,
    billedBy: dimLb >= actualLb ? "dimensional" : "actual",
  };
}

/** Full estimate for an order: packing plan, weights, and zone quotes. */
export function estimate(items: Product[]): Estimate {
  const totalCubicIn = items.reduce((sum, p) => sum + cubicIn(p.dims), 0);

  let plan: { box: Box; items: Product[] }[] = [];
  if (items.length > 0) {
    const single = smallestSingleBox(items);
    plan = single ? [{ box: single, items }] : multiBoxPlan(items);
  }

  const boxes = plan.map((p) => weighBox(p.box, p.items));
  const quotes = ZONES.map((zone) => ({
    zone,
    total:
      Math.round(
        boxes.reduce((sum, b) => sum + zone.base + zone.perLb * b.billableLb, 0) * 100,
      ) / 100,
  }));

  return { items, totalCubicIn, boxes, quotes };
}

/** "25.5 x 18 x 11.25 in" style label (uses the multiplication sign). */
export function dimsLabel(dims: Dims): string {
  return `${dims[0]} × ${dims[1]} × ${dims[2]} in`;
}

/** Format a USD amount, always two decimals. */
export function usd(n: number): string {
  return `$${n.toFixed(2)}`;
}

// Demo data for the IDM Imagineering "Scan-to-Order" concept.
// One fictional-but-plausible product in IDM's own naming style ("… vIDM").
// Everything is deterministic — the order ref derives from the selection.

export const PRODUCT = {
  name: "Patrol Helmet vIDM — Display Kit",
  short: "Patrol Helmet vIDM",
  payloadName: "Patrol Helmet vIDM Display Kit",
  blurb:
    "A workshop-finished, 3D-printed display helmet on a weighted stand. Fictional product, real ordering flow.",
};

export type ColourOption = {
  code: string;
  label: string;
  note: string;
  deltaPence: number;
  swatch: string;
};

export type SizeOption = {
  code: string;
  label: string;
  detail: string;
  pricePence: number;
};

export const COLOURS: ColourOption[] = [
  { code: "GRY", label: "Primed Grey", note: "ready to paint", deltaPence: 0, swatch: "#9a9aa0" },
  { code: "BLK", label: "Matte Black", note: "workshop finish", deltaPence: 600, swatch: "#26262a" },
  { code: "MAG", label: "IDM Magenta", note: "hand-finished gloss", deltaPence: 900, swatch: "#ba23b8" },
];

export const SIZES: SizeOption[] = [
  { code: "S4", label: "1:4 Shelf", detail: "approx. 70 mm", pricePence: 2400 },
  { code: "S2", label: "1:2 Display", detail: "approx. 140 mm", pricePence: 4800 },
  { code: "S1", label: "1:1 Showpiece", detail: "approx. 280 mm", pricePence: 9500 },
];

export const PAY_LINES = [
  "Bank: IDM Imagineering 00-00-00 12345678",
  "PayPal: paypal.me/IDMImagineering",
  "Card (Stripe): buy.stripe.com/idm-demo",
];

export const MIN_QTY = 1;
export const MAX_QTY = 5;

export function formatGBP(pence: number): string {
  return `£${(pence / 100).toFixed(2)}`;
}

export function totalPence(colour: ColourOption, size: SizeOption, qty: number): number {
  return (size.pricePence + colour.deltaPence) * qty;
}

export function orderRef(colour: ColourOption, size: SizeOption, qty: number): string {
  return `IDM-${size.code}${colour.code}-Q${qty}`;
}

/** Builds the human-readable order summary the QR code carries. */
export function buildPayload(colour: ColourOption, size: SizeOption, qty: number): string {
  return [
    "IDM IMAGINEERING - ORDER",
    `Ref: ${orderRef(colour, size, qty)}`,
    `Item: ${PRODUCT.payloadName}`,
    `Colour: ${colour.label}`,
    `Size: ${size.label} (${size.detail})`,
    `Qty: ${qty}`,
    `Total: ${formatGBP(totalPence(colour, size, qty))}`,
    "Pay (quote the ref):",
    ...PAY_LINES,
    "Demo by Orchanta - not a live order",
  ].join("\n");
}

export type ParsedOrder = {
  ref: string;
  item: string;
  colour: string;
  size: string;
  qty: string;
  total: string;
  pay: string[];
};

/** Decodes the QR payload back into an order — proving the round trip. */
export function parsePayload(payload: string): ParsedOrder | null {
  const lines = payload.split("\n");
  const field = (prefix: string) =>
    lines.find((l) => l.startsWith(prefix))?.slice(prefix.length).trim() ?? "";
  const payStart = lines.findIndex((l) => l.startsWith("Pay"));
  const parsed: ParsedOrder = {
    ref: field("Ref:"),
    item: field("Item:"),
    colour: field("Colour:"),
    size: field("Size:"),
    qty: field("Qty:"),
    total: field("Total:"),
    pay: payStart >= 0 ? lines.slice(payStart + 1, payStart + 4) : [],
  };
  if (!parsed.ref || !parsed.item || !parsed.total || parsed.pay.length !== 3) return null;
  return parsed;
}

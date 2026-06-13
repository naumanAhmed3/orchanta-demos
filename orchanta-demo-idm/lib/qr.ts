// Tiny QR encoding layer for the demo. Encoding is done fully client-side by the
// pure-JS `qrcode` package (no canvas, no network); this module exposes just the
// module matrix plus an SVG path builder so the code renders as crisp vectors.

import { create } from "qrcode";

export type QrMatrix = {
  /** Modules per side (no quiet zone). */
  size: number;
  /** True where the module is dark. */
  get: (row: number, col: number) => boolean;
};

/** Encodes text into a QR module matrix (error-correction level M). */
export function encodeQr(text: string): QrMatrix {
  const qr = create(text, { errorCorrectionLevel: "M" });
  const { size, data } = qr.modules;
  return {
    size,
    get: (row, col) => !!data[row * size + col],
  };
}

/**
 * Builds a single SVG path drawing every dark module as a 1x1 unit square,
 * offset by the quiet zone. Render inside viewBox `0 0 size+2q size+2q`.
 */
export function qrToSvgPath(matrix: QrMatrix, quietZone = 4): string {
  const parts: string[] = [];
  for (let r = 0; r < matrix.size; r++) {
    for (let c = 0; c < matrix.size; c++) {
      if (matrix.get(r, c)) {
        parts.push(`M${c + quietZone} ${r + quietZone}h1v1h-1z`);
      }
    }
  }
  return parts.join("");
}

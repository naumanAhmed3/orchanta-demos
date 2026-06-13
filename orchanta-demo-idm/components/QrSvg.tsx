"use client";

import { useMemo } from "react";
import { encodeQr, qrToSvgPath } from "../lib/qr";

const QUIET = 4;

/** Renders `text` as a real, scannable QR code in crisp SVG — all client-side. */
export default function QrSvg({ text, label }: { text: string; label: string }) {
  const { path, units } = useMemo(() => {
    const matrix = encodeQr(text);
    return { path: qrToSvgPath(matrix, QUIET), units: matrix.size + QUIET * 2 };
  }, [text]);

  return (
    <svg
      viewBox={`0 0 ${units} ${units}`}
      role="img"
      aria-label={label}
      className="h-auto w-full"
      shapeRendering="crispEdges"
    >
      <rect width={units} height={units} fill="#ffffff" />
      <path d={path} fill="#1a1a1a" />
    </svg>
  );
}

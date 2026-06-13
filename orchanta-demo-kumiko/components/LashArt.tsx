import type { LashStyle } from "@/lib/data";

interface StyleSpec {
  count: number;
  /** base lash length in viewBox units */
  length: number;
  /** extra length added to alternating "spike" lashes */
  spike: number;
  /** stroke width */
  weight: number;
}

const SPECS: Record<Exclude<LashStyle, "bundle">, StyleSpec> = {
  fairy: { count: 13, length: 16, spike: 3, weight: 1.5 }, // soft, even, everyday
  princess: { count: 11, length: 18, spike: 6, weight: 1.9 }, // rounded doll-eye clusters
  starlight: { count: 9, length: 22, spike: 10, weight: 2.1 }, // sharp dramatic spikes
  rawedge: { count: 12, length: 18, spike: 7, weight: 1.7 }, // undone, mixed finish
};

/**
 * Deterministic CSS/SVG stand-in for product photography: a lid curve with a
 * lash silhouette tuned per style. No images are hotlinked from the store.
 */
export default function LashArt({ style }: { style: LashStyle }) {
  if (style === "bundle") {
    return (
      <div className="flex items-center justify-center gap-3" aria-hidden="true">
        {(["fairy", "princess", "starlight"] as const).map((s) => (
          <div key={s} className="w-1/4">
            <LashArt style={s} />
          </div>
        ))}
      </div>
    );
  }

  const spec = SPECS[style];
  const lashes = [];
  for (let i = 0; i < spec.count; i++) {
    const t = i / (spec.count - 1); // 0..1 across the lid
    // Lid curve: quadratic from (10,46) to (110,46) peaking at y=30
    const x = 10 + 100 * t;
    const lid = 46 - 16 * (4 * t * (1 - t)); // y on the curve
    const isSpike = i % 2 === 0;
    const len = spec.length + (isSpike ? spec.spike : 0);
    // Lashes fan outward: tilt grows toward the edges
    const tilt = (t - 0.5) * 26;
    const tipX = x + tilt * (len / 20);
    const tipY = lid - len * (0.82 + 0.18 * (4 * t * (1 - t)));
    const ctrlX = x + tilt * 0.3;
    const ctrlY = lid - len * 0.55;
    lashes.push(
      <path
        key={i}
        d={`M${x.toFixed(1)} ${lid.toFixed(1)} Q${ctrlX.toFixed(1)} ${ctrlY.toFixed(1)} ${tipX.toFixed(1)} ${tipY.toFixed(1)}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={spec.weight}
        strokeLinecap="round"
      />,
    );
  }

  return (
    <svg viewBox="0 0 120 60" className="w-full text-rust" aria-hidden="true">
      <path
        d="M10 46 Q60 14 110 46"
        fill="none"
        stroke="currentColor"
        strokeWidth={spec.weight + 1.1}
        strokeLinecap="round"
      />
      {lashes}
    </svg>
  );
}

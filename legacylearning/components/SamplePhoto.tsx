import type { ScanSample } from "@/lib/lessons";

function AppleArt() {
  return (
    <svg viewBox="0 0 120 120" className="h-24 w-24 drop-shadow-sm" aria-hidden>
      <path d="M70 30c2-10 11-15 18-15-1 9-7 16-15 16" fill="#2BA6A4" />
      <path
        d="M60 32c14-9 38-3 38 24 0 24-16 46-30 46-5 0-7-3-8-3s-3 3-8 3c-14 0-30-22-30-46 0-27 24-33 38-24Z"
        fill="#FF8A5B"
      />
      <path
        d="M60 36c-9-5-22-2-22 18 0 9 4 19 9 26"
        stroke="#fff"
        strokeOpacity="0.45"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function BallArt() {
  return (
    <svg viewBox="0 0 120 120" className="h-24 w-24 drop-shadow-sm" aria-hidden>
      <circle cx="60" cy="62" r="40" fill="#2BA6A4" />
      <path d="M60 22v80M20 62h80" stroke="#fff" strokeWidth="5" strokeOpacity="0.75" />
      <path
        d="M32 34c16 12 40 12 56 0M32 90c16-12 40-12 56 0"
        stroke="#fff"
        strokeWidth="5"
        strokeOpacity="0.55"
        fill="none"
      />
      <circle cx="46" cy="48" r="9" fill="#fff" fillOpacity="0.4" />
    </svg>
  );
}

export function SamplePhoto({ sample }: { sample: ScanSample }) {
  if (sample.kind === "math") {
    return (
      <div className="paper-grid flex h-full w-full items-center justify-center rounded-2xl px-3">
        <span
          className="font-display text-3xl font-semibold text-navy sm:text-4xl"
          style={{ transform: "rotate(-2deg)" }}
        >
          {sample.label}
        </span>
      </div>
    );
  }

  if (sample.kind === "object") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-1 rounded-2xl bg-gradient-to-b from-white to-cream-200">
        {sample.art === "ball" ? <BallArt /> : <AppleArt />}
        <span className="font-display text-lg font-semibold text-navy">{sample.label}</span>
      </div>
    );
  }

  if (sample.kind === "sight") {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-gold/25 to-coral/20">
        <span className="rounded-xl bg-white px-5 py-2 font-display text-3xl font-semibold text-navy shadow-soft sm:text-4xl">
          {sample.label}
        </span>
      </div>
    );
  }

  // handwriting word on lined paper
  return (
    <div className="paper-lined flex h-full w-full items-end justify-center rounded-2xl pb-3">
      <span
        className="font-display text-4xl font-medium text-coral sm:text-5xl"
        style={{ transform: "rotate(-3deg)", letterSpacing: "0.04em" }}
      >
        {sample.label}
      </span>
    </div>
  );
}

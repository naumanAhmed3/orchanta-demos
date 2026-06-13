import type { UseCase } from "@/lib/data";

/*
  Compact before → after visuals, CSS/SVG only. Deterministic — no images,
  no network. Each pair is intentionally small: proof, not decoration.
*/

function BottleGlyph({ tone, x = 0, y = 0 }: { tone: "flat" | "rich"; x?: number; y?: number }) {
  const body = tone === "flat" ? "#a8a8a8" : "url(#uc-prod-glass)";
  const label = tone === "flat" ? "#c4c4c4" : "#f8f4ea";
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="86" y="52" width="38" height="76" rx="7" fill={body} />
      <rect x="96" y="34" width="18" height="20" rx="3" fill={tone === "flat" ? "#8a8a8a" : "#2b2b2e"} />
      <rect x="91" y="78" width="28" height="30" rx="4" fill={label} />
      <line x1="96" y1="88" x2="114" y2="88" stroke={tone === "flat" ? "#9a9a9a" : "#9b8a68"} strokeWidth="2.5" />
      <line x1="98" y1="96" x2="112" y2="96" stroke={tone === "flat" ? "#b0b0b0" : "#c9bda1"} strokeWidth="2" />
    </g>
  );
}

function ProductBefore() {
  return (
    <svg viewBox="0 0 210 150" className="h-full w-full" role="img" aria-label="Before: plain phone snapshot of a bottle on a grey background">
      <rect width="210" height="150" fill="#7d7d80" />
      <rect width="210" height="150" fill="#6f6f72" opacity="0.5" />
      <ellipse cx="105" cy="132" rx="42" ry="7" fill="#4f4f52" opacity="0.8" />
      <BottleGlyph tone="flat" />
      {/* harsh flash hotspot */}
      <circle cx="105" cy="58" r="30" fill="#ffffff" opacity="0.14" />
    </svg>
  );
}

function ProductAfter() {
  return (
    <svg viewBox="0 0 210 150" className="h-full w-full" role="img" aria-label="After: the same bottle styled on marble with soft window light">
      <defs>
        <linearGradient id="uc-prod-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f7f2e9" />
          <stop offset="1" stopColor="#e3d9c5" />
        </linearGradient>
        <linearGradient id="uc-prod-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d99a45" />
          <stop offset="1" stopColor="#8a5212" />
        </linearGradient>
      </defs>
      <rect width="210" height="150" fill="url(#uc-prod-bg)" />
      <path d="M0 38 C 50 28, 90 48, 150 38 S 200 30, 210 40" stroke="#cdbfa6" strokeWidth="1.5" fill="none" opacity="0.5" />
      <polygon points="0,0 80,0 28,150 0,150" fill="#ffffff" opacity="0.2" />
      <rect y="118" width="210" height="32" fill="#d6c9b2" />
      <ellipse cx="105" cy="128" rx="44" ry="6" fill="#8d7c5e" opacity="0.3" />
      <BottleGlyph tone="rich" />
      <path d="M58 120 C 52 106, 62 96, 72 94 C 73 106, 68 114, 58 120 Z" fill="#8fae7e" opacity="0.85" />
    </svg>
  );
}

function VideoBefore() {
  return (
    <svg viewBox="0 0 210 150" className="h-full w-full" role="img" aria-label="Before: a static product image">
      <rect width="210" height="150" fill="#17171d" />
      <rect x="35" y="25" width="140" height="100" rx="8" fill="#23232c" stroke="#2e2e33" />
      <circle cx="70" cy="55" r="10" fill="#3c3c46" />
      <path d="M48 110 L 90 72 L 118 96 L 142 78 L 162 110 Z" fill="#3c3c46" />
      <text x="105" y="142" textAnchor="middle" fontSize="10" fill="#6f6f76" fontFamily="inherit">
        still.jpg
      </text>
    </svg>
  );
}

function VideoAfter() {
  return (
    <svg viewBox="0 0 210 150" className="h-full w-full" role="img" aria-label="After: the still animated into a short clip with camera motion">
      <defs>
        <linearGradient id="uc-vid-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="hsl(263,90%,60%)" />
          <stop offset="1" stopColor="hsl(166,100%,46%)" />
        </linearGradient>
      </defs>
      <rect width="210" height="150" fill="#100a1f" />
      <rect x="35" y="25" width="140" height="100" rx="8" fill="#1c1430" stroke="hsl(263 90% 51%)" strokeOpacity="0.6" />
      <path d="M48 110 L 90 72 L 118 96 L 142 78 L 162 110 Z" fill="#41345f" />
      <circle cx="70" cy="55" r="10" fill="#52447a" />
      {/* motion streaks */}
      <g className="streak">
        <line x1="52" y1="44" x2="84" y2="44" stroke="hsl(166,100%,52%)" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
        <line x1="120" y1="58" x2="156" y2="58" stroke="#ff66cc" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
        <line x1="84" y1="36" x2="108" y2="36" stroke="hsl(263,90%,68%)" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      </g>
      {/* play badge */}
      <circle cx="105" cy="75" r="17" fill="#0a0616" stroke="url(#uc-vid-ring)" strokeWidth="2.5" />
      <path d="M100 67 L 114 75 L 100 83 Z" fill="#eeeeee" />
      {/* timeline */}
      <rect x="45" y="132" width="120" height="4" rx="2" fill="#2e2e33" />
      <rect x="45" y="132" width="52" height="4" rx="2" fill="url(#uc-vid-ring)" />
      <text x="175" y="138" textAnchor="middle" fontSize="9" fill="#9e9e9e" fontFamily="inherit">
        0:05
      </text>
    </svg>
  );
}

function HeadphoneGlyph() {
  return (
    <g>
      <path d="M75 92 a30 30 0 0 1 60 0" fill="none" stroke="#2c2c34" strokeWidth="9" strokeLinecap="round" />
      <rect x="66" y="88" width="16" height="28" rx="7" fill="hsl(263 90% 51%)" />
      <rect x="128" y="88" width="16" height="28" rx="7" fill="hsl(263 90% 51%)" />
      <rect x="70" y="92" width="8" height="20" rx="4" fill="#1c1c22" />
      <rect x="132" y="92" width="8" height="20" rx="4" fill="#1c1c22" />
    </g>
  );
}

function CutoutBefore() {
  return (
    <svg viewBox="0 0 210 150" className="h-full w-full" role="img" aria-label="Before: headphones photographed on a cluttered desk">
      <rect width="210" height="150" fill="#5c5246" />
      {/* clutter */}
      <rect x="6" y="14" width="62" height="40" rx="4" fill="#6e6254" transform="rotate(-7 37 34)" />
      <rect x="140" y="10" width="64" height="34" rx="4" fill="#4c4338" transform="rotate(6 172 27)" />
      <circle cx="180" cy="116" r="22" fill="#6a5d4d" />
      <rect x="10" y="104" width="54" height="34" rx="4" fill="#71655a" transform="rotate(9 37 121)" />
      <line x1="120" y1="132" x2="200" y2="146" stroke="#3e362d" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="105" cy="122" rx="46" ry="8" fill="#3e362d" opacity="0.6" />
      <HeadphoneGlyph />
    </svg>
  );
}

function CutoutAfter() {
  return (
    <div className="checker h-full w-full">
      <svg viewBox="0 0 210 150" className="h-full w-full" role="img" aria-label="After: the same headphones as a clean transparent cutout">
        <HeadphoneGlyph />
        <path d="M75 92 a30 30 0 0 1 60 0" fill="none" stroke="hsl(166,100%,46%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        <text x="105" y="140" textAnchor="middle" fontSize="9" fill="#9e9e9e" fontFamily="inherit">
          transparent .png
        </text>
      </svg>
    </div>
  );
}

const art: Record<UseCase["id"], { before: () => React.ReactNode; after: () => React.ReactNode }> = {
  product: { before: ProductBefore, after: ProductAfter },
  video: { before: VideoBefore, after: VideoAfter },
  cutout: { before: CutoutBefore, after: CutoutAfter },
};

export default function UseCaseArt({ useCase }: { useCase: UseCase }) {
  const pair = art[useCase.id];
  return (
    <div className="flex items-stretch gap-2">
      <figure className="min-w-0 flex-1">
        <div className="aspect-7/5 overflow-hidden rounded-lg border border-line-2">
          {pair.before()}
        </div>
        <figcaption className="mt-1.5 text-center text-[11px] text-dim">
          {useCase.beforeLabel}
        </figcaption>
      </figure>
      <div className="flex items-center pb-5 text-teal" aria-hidden="true">
        →
      </div>
      <figure className="min-w-0 flex-1">
        <div className="aspect-7/5 overflow-hidden rounded-lg border border-violet/40">
          {pair.after()}
        </div>
        <figcaption className="mt-1.5 text-center text-[11px] text-mute">
          {useCase.afterLabel}
        </figcaption>
      </figure>
    </div>
  );
}

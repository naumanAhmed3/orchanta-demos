import type { PresetId } from "@/lib/data";

/*
  Deterministic, CSS/SVG-composed "result" mocks for the hero simulation.
  Clearly labeled as sample output by the parent — no real AI generation.
*/

function SerumScene() {
  return (
    <svg viewBox="0 0 480 360" className="h-full w-full" role="img" aria-label="Sample render: amber serum bottle on a marble counter in soft morning light">
      <defs>
        <linearGradient id="serum-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f7f2e9" />
          <stop offset="1" stopColor="#e6ddcc" />
        </linearGradient>
        <linearGradient id="serum-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d99a45" />
          <stop offset="0.55" stopColor="#b06f1f" />
          <stop offset="1" stopColor="#8a5212" />
        </linearGradient>
        <linearGradient id="serum-counter" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ded3bf" />
          <stop offset="1" stopColor="#cfc2aa" />
        </linearGradient>
      </defs>
      <rect width="480" height="360" fill="url(#serum-bg)" />
      {/* marble veins */}
      <path d="M0 84 C 90 64, 150 110, 250 88 S 420 64, 480 92" stroke="#cdbfa6" strokeWidth="2" fill="none" opacity="0.5" />
      <path d="M0 150 C 120 132, 210 168, 320 146 S 440 130, 480 150" stroke="#d6c9b2" strokeWidth="1.5" fill="none" opacity="0.45" />
      <path d="M60 0 C 80 60, 50 120, 90 200" stroke="#d8ccb6" strokeWidth="1.5" fill="none" opacity="0.35" />
      {/* window light beam */}
      <polygon points="0,0 190,0 70,360 0,360" fill="#ffffff" opacity="0.18" />
      <polygon points="210,0 260,0 160,360 120,360" fill="#ffffff" opacity="0.10" />
      {/* counter */}
      <rect y="268" width="480" height="92" fill="url(#serum-counter)" />
      <line x1="0" y1="268" x2="480" y2="268" stroke="#bfb097" strokeWidth="2" />
      {/* shadow */}
      <ellipse cx="248" cy="292" rx="92" ry="14" fill="#8d7c5e" opacity="0.3" />
      {/* bottle */}
      <rect x="214" y="148" width="68" height="142" rx="12" fill="url(#serum-glass)" />
      <rect x="222" y="156" width="10" height="120" rx="5" fill="#ffffff" opacity="0.35" />
      {/* label */}
      <rect x="220" y="196" width="56" height="58" rx="6" fill="#f8f4ea" />
      <line x1="230" y1="212" x2="266" y2="212" stroke="#9b8a68" strokeWidth="3" />
      <line x1="234" y1="224" x2="262" y2="224" stroke="#c9bda1" strokeWidth="2" />
      <line x1="234" y1="234" x2="262" y2="234" stroke="#c9bda1" strokeWidth="2" />
      <circle cx="248" cy="246" r="3" fill="#b06f1f" />
      {/* dropper */}
      <rect x="234" y="120" width="28" height="32" rx="5" fill="#2b2b2e" />
      <rect x="244" y="100" width="8" height="24" rx="4" fill="#3c3c40" />
      {/* companion pebble + leaf */}
      <ellipse cx="338" cy="284" rx="26" ry="12" fill="#cabd9f" />
      <ellipse cx="338" cy="281" rx="26" ry="12" fill="#d8ccb0" />
      <path d="M150 270 C 138 244, 158 224, 176 220 C 178 244, 168 262, 150 270 Z" fill="#8fae7e" opacity="0.85" />
      <path d="M152 268 C 160 250, 168 236, 174 224" stroke="#6e8f5f" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function SneakerScene() {
  return (
    <svg viewBox="0 0 480 360" className="h-full w-full" role="img" aria-label="Sample render: sneaker floating in a dark studio with violet rim light">
      <defs>
        <radialGradient id="snk-bg" cx="0.5" cy="0.42" r="0.85">
          <stop offset="0" stopColor="#241445" />
          <stop offset="1" stopColor="#0a0616" />
        </radialGradient>
        <linearGradient id="snk-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="hsl(263,90%,60%)" />
          <stop offset="1" stopColor="hsl(166,100%,46%)" />
        </linearGradient>
        <linearGradient id="snk-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#41415a" />
          <stop offset="1" stopColor="#23232f" />
        </linearGradient>
      </defs>
      <rect width="480" height="360" fill="url(#snk-bg)" />
      <ellipse cx="240" cy="330" rx="170" ry="20" fill="hsl(263 90% 51%)" opacity="0.18" />
      <circle cx="240" cy="172" r="118" fill="none" stroke="url(#snk-ring)" strokeWidth="3" opacity="0.85" />
      <circle cx="240" cy="172" r="134" fill="none" stroke="hsl(263 90% 60%)" strokeWidth="1" opacity="0.3" />
      {/* floating shadow */}
      <ellipse cx="240" cy="282" rx="96" ry="12" fill="#000000" opacity="0.55" />
      {/* sole */}
      <path d="M138 224 C 140 244, 168 252, 220 252 L 330 250 C 352 249, 360 240, 358 228 L 352 218 L 146 214 Z" fill="#e8e8ee" />
      <path d="M138 224 C 140 244, 168 252, 220 252 L 330 250 C 352 249, 360 240, 358 228" fill="none" stroke="hsl(166,100%,46%)" strokeWidth="3" opacity="0.9" />
      {/* upper */}
      <path d="M146 216 C 142 184, 158 152, 192 144 C 214 140, 228 150, 246 162 C 270 178, 296 188, 330 192 C 348 194, 356 204, 354 218 Z" fill="url(#snk-body)" />
      {/* heel accent */}
      <path d="M150 212 C 148 188, 158 162, 184 150 C 178 174, 176 196, 178 212 Z" fill="hsl(263 90% 51%)" opacity="0.75" />
      {/* side curve accent */}
      <path d="M196 214 C 224 196, 262 196, 318 212" stroke="hsl(166,100%,46%)" strokeWidth="4" fill="none" opacity="0.9" />
      {/* laces */}
      <line x1="222" y1="164" x2="248" y2="178" stroke="#cfcfdd" strokeWidth="4" strokeLinecap="round" />
      <line x1="238" y1="158" x2="266" y2="172" stroke="#cfcfdd" strokeWidth="4" strokeLinecap="round" />
      <line x1="256" y1="154" x2="284" y2="168" stroke="#cfcfdd" strokeWidth="4" strokeLinecap="round" />
      {/* rim light */}
      <path d="M192 144 C 214 140, 228 150, 246 162 C 270 178, 296 188, 330 192" stroke="#ff66cc" strokeWidth="2" fill="none" opacity="0.8" />
      {/* sparkles */}
      <circle cx="120" cy="96" r="2.5" fill="#ff66cc" opacity="0.9" />
      <circle cx="372" cy="120" r="2" fill="hsl(166,100%,60%)" opacity="0.9" />
      <circle cx="338" cy="70" r="1.5" fill="#cfcfdd" opacity="0.8" />
      <circle cx="96" cy="208" r="1.5" fill="hsl(263,90%,70%)" opacity="0.8" />
    </svg>
  );
}

function CoffeeScene() {
  return (
    <svg viewBox="0 0 480 360" className="h-full w-full" role="img" aria-label="Sample render: kraft coffee bag on a wooden counter in warm afternoon light">
      <defs>
        <linearGradient id="cof-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f2e3cb" />
          <stop offset="1" stopColor="#e0c39c" />
        </linearGradient>
        <linearGradient id="cof-bag" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#cfa069" />
          <stop offset="1" stopColor="#a87b46" />
        </linearGradient>
        <linearGradient id="cof-wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9a6b3f" />
          <stop offset="1" stopColor="#7c5430" />
        </linearGradient>
      </defs>
      <rect width="480" height="360" fill="url(#cof-bg)" />
      {/* window light */}
      <polygon points="300,0 400,0 480,150 480,40" fill="#fff6e2" opacity="0.5" />
      <polygon points="240,0 280,0 420,360 360,360" fill="#fff6e2" opacity="0.28" />
      {/* back shelf line */}
      <line x1="0" y1="120" x2="480" y2="120" stroke="#c8a878" strokeWidth="2" opacity="0.6" />
      {/* mug silhouette on shelf */}
      <path d="M64 92 h44 v26 a8 8 0 0 1 -8 8 h-28 a8 8 0 0 1 -8 -8 Z" fill="#b08c5c" opacity="0.8" />
      <path d="M108 96 q14 6 0 16" stroke="#b08c5c" strokeWidth="5" fill="none" opacity="0.8" />
      {/* counter */}
      <rect y="276" width="480" height="84" fill="url(#cof-wood)" />
      <line x1="0" y1="298" x2="480" y2="298" stroke="#6b4626" strokeWidth="1.5" opacity="0.7" />
      <line x1="0" y1="322" x2="480" y2="322" stroke="#6b4626" strokeWidth="1" opacity="0.5" />
      {/* shadow */}
      <ellipse cx="236" cy="288" rx="98" ry="13" fill="#4a2f17" opacity="0.35" />
      {/* kraft bag */}
      <path d="M180 156 L 296 156 L 304 286 L 172 286 Z" fill="url(#cof-bag)" />
      <rect x="176" y="142" width="124" height="24" rx="5" fill="#8a6236" />
      <line x1="176" y1="166" x2="300" y2="166" stroke="#774f27" strokeWidth="2" />
      {/* bag label */}
      <circle cx="238" cy="208" r="26" fill="#f4ead7" />
      <circle cx="238" cy="208" r="26" fill="none" stroke="#8a6236" strokeWidth="2" />
      <path d="M238 196 c 7 6, 7 18, 0 24 c -7 -6, -7 -18, 0 -24 Z" fill="#7c5430" />
      <line x1="206" y1="248" x2="270" y2="248" stroke="#f4ead7" strokeWidth="4" />
      <line x1="214" y1="260" x2="262" y2="260" stroke="#e9dcc1" strokeWidth="3" />
      {/* beans */}
      <g fill="#6e4a26">
        <ellipse cx="334" cy="282" rx="11" ry="7" transform="rotate(-18 334 282)" />
        <ellipse cx="354" cy="290" rx="11" ry="7" transform="rotate(14 354 290)" />
        <ellipse cx="140" cy="286" rx="11" ry="7" transform="rotate(22 140 286)" />
      </g>
      <g stroke="#4a2f17" strokeWidth="1.5" fill="none">
        <path d="M327 285 q 7 -6 14 -5" />
        <path d="M347 293 q 7 -5 14 -4" />
        <path d="M134 290 q 6 -7 13 -6" />
      </g>
      {/* steam hint */}
      <path d="M86 78 q 4 -8 0 -14 q -4 -6 0 -12" stroke="#caa572" strokeWidth="2.5" fill="none" opacity="0.7" />
    </svg>
  );
}

export default function SampleArt({ variant }: { variant: PresetId }) {
  if (variant === "serum") return <SerumScene />;
  if (variant === "sneaker") return <SneakerScene />;
  return <CoffeeScene />;
}

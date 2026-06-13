// Product visual recreated as pure SVG/CSS in HiPrimal's own palette —
// no imagery is hotlinked from the brand's site.
export function Pouch() {
  return (
    <div className="relative mx-auto w-full max-w-105">
      {/* Arch backdrop */}
      <div
        aria-hidden="true"
        className="bg-bone-deep absolute inset-x-4 top-6 bottom-0 rounded-t-full"
      />

      <svg
        viewBox="0 0 380 480"
        role="img"
        aria-label="HiPrimal pouch — six freeze-dried beef organs, 60 capsules"
        className="relative mx-auto block w-[78%] drop-shadow-[0_24px_40px_rgb(34_28_23_/_0.28)]"
      >
        <defs>
          <linearGradient id="pouchBody" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#451115" />
            <stop offset="0.18" stopColor="#5e1b21" />
            <stop offset="0.55" stopColor="#6a2228" />
            <stop offset="0.86" stopColor="#5e1b21" />
            <stop offset="1" stopColor="#451115" />
          </linearGradient>
          <linearGradient id="pouchSheen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fbf7ed" stopOpacity="0.14" />
            <stop offset="0.25" stopColor="#fbf7ed" stopOpacity="0.02" />
            <stop offset="1" stopColor="#fbf7ed" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Pouch body with gusset taper */}
        <path
          d="M52 56 Q52 40 68 40 L312 40 Q328 40 328 56 L322 408 Q321 444 285 450 Q238 458 190 458 Q142 458 95 450 Q59 444 58 408 Z"
          fill="url(#pouchBody)"
        />
        {/* Heat-seal strip */}
        <path
          d="M52 56 Q52 40 68 40 L312 40 Q328 40 328 56 L327.4 74 L52.6 74 Z"
          fill="#451115"
        />
        <line
          x1="56"
          y1="78"
          x2="324"
          y2="78"
          stroke="#fbf7ed"
          strokeOpacity="0.25"
          strokeDasharray="3 4"
        />
        {/* Tear notches */}
        <circle cx="52" cy="60" r="4" fill="var(--color-bone)" />
        <circle cx="328" cy="60" r="4" fill="var(--color-bone)" />
        {/* Sheen */}
        <path
          d="M52 56 Q52 40 68 40 L312 40 Q328 40 328 56 L322 408 Q321 444 285 450 Q238 458 190 458 Q142 458 95 450 Q59 444 58 408 Z"
          fill="url(#pouchSheen)"
        />

        {/* Label */}
        <text
          x="190"
          y="138"
          textAnchor="middle"
          fill="#e9dcd4"
          fontSize="11"
          fontWeight="600"
          letterSpacing="3.2"
          style={{ fontFamily: "var(--font-body)" }}
        >
          GRASS-FED · FOR WOMEN
        </text>
        <text
          x="190"
          y="196"
          textAnchor="middle"
          fill="#fbf7ed"
          fontSize="52"
          fontWeight="560"
          letterSpacing="-1"
          style={{ fontFamily: "var(--font-display)" }}
        >
          hi
          <tspan fontStyle="italic" fontWeight="420" fill="#c99a8e">
            primal
          </tspan>
        </text>
        <text
          x="190"
          y="232"
          textAnchor="middle"
          fill="#e9dcd4"
          fontSize="13"
          fontStyle="italic"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Six freeze-dried beef organs
        </text>

        <line
          x1="120"
          y1="262"
          x2="260"
          y2="262"
          stroke="#c99a8e"
          strokeOpacity="0.55"
          strokeWidth="1"
        />

        <text
          x="190"
          y="296"
          textAnchor="middle"
          fill="#e9dcd4"
          fontSize="10.5"
          letterSpacing="1.6"
          style={{ fontFamily: "var(--font-body)" }}
        >
          LIVER · HEART · KIDNEY
        </text>
        <text
          x="190"
          y="316"
          textAnchor="middle"
          fill="#e9dcd4"
          fontSize="10.5"
          letterSpacing="1.6"
          style={{ fontFamily: "var(--font-body)" }}
        >
          SPLEEN · PANCREAS · THYMUS
        </text>

        <text
          x="190"
          y="368"
          textAnchor="middle"
          fill="#fbf7ed"
          fontSize="15"
          fontWeight="600"
          style={{ fontFamily: "var(--font-body)" }}
        >
          1,700 mg per serving
        </text>
        <text
          x="190"
          y="396"
          textAnchor="middle"
          fill="#c99a8e"
          fontSize="11"
          letterSpacing="1.4"
          style={{ fontFamily: "var(--font-body)" }}
        >
          60 CAPSULES — 30-DAY SUPPLY
        </text>
      </svg>

      {/* Floating fact chips — real claims from the brand's page */}
      <div className="border-line bg-paper text-ink absolute top-14 -left-1 border px-3 py-2 text-[11px] font-semibold shadow-[0_8px_20px_rgb(34_28_23_/_0.12)] sm:left-2">
        Batch 001 · lab results published
      </div>
      <div className="border-line bg-paper text-ink absolute -right-1 bottom-10 border px-3 py-2 text-[11px] font-semibold shadow-[0_8px_20px_rgb(34_28_23_/_0.12)] sm:right-2">
        Freeze-dried raw, never heat-dried
      </div>
    </div>
  );
}

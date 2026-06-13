// Farm Link Hawaiʻi wordmark — recreated in SVG (not hotlinked), after their round
// farm-badge logo: cream ring with a dotted inner ring, dark-brown center, and a
// striped green leaf. Wordmark set in DM Sans, like their live theme.
export function FarmLinkLogo({ subtitle }: { subtitle?: string }) {
  return (
    <span className="inline-flex select-none items-center gap-3">
      <svg width="44" height="44" viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="31" fill="#f8f3e2" />
        <circle cx="32" cy="32" r="30" fill="none" stroke="#2b2118" strokeWidth="1.6" />
        <circle
          cx="32"
          cy="32"
          r="26"
          fill="none"
          stroke="#2b2118"
          strokeWidth="1.4"
          strokeDasharray="0.1 3.4"
          strokeLinecap="round"
        />
        <circle cx="32" cy="32" r="22" fill="#2b2118" />
        <path d="M32 13.5 C 21.5 21, 19.5 36, 30.5 50 C 43.5 41, 45 24.5, 32 13.5 Z" fill="#4a986d" />
        <path
          d="M31.6 16 C 27.5 26, 27.5 38, 30.8 47"
          fill="none"
          stroke="#2b2118"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M28.8 25.5 L 36.8 21.5 M27.8 31.5 L 38.4 26.5 M28 37.5 L 39 31.8 M29.4 43 L 38.2 38"
          fill="none"
          stroke="#2b2118"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
      <span className="leading-tight">
        <span className="block text-[17px] font-bold tracking-tight text-ink">
          Farm Link Hawaiʻi
        </span>
        {subtitle && (
          <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-green">
            {subtitle}
          </span>
        )}
      </span>
    </span>
  );
}

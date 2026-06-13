// Tita Italia wordmark — recreated in SVG (not hotlinked): the gold heraldic
// crest from titaitalia.com, simplified — gold shield + ribbon flourishes with
// "TITA" in black Roman serif caps and "ITALIAN" beneath, matching the
// site's gold (#dfb94e) announcement bar and black serif logotype.
export function TitaLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex select-none items-center gap-3">
      <svg
        width={compact ? 40 : 52}
        height={compact ? 34 : 44}
        viewBox="0 0 60 50"
        fill="none"
        aria-hidden="true"
      >
        {/* side ribbon flourishes */}
        <path
          d="M8 10 C2 14 1 26 7 32 C3 27 4 16 10 12 Z M52 10 C58 14 59 26 53 32 C57 27 56 16 50 12 Z"
          fill="var(--color-gold-deep)"
        />
        <path d="M4 6 h14 l-3 5 H7 Z M42 6 h14 l-4 5 h-7 Z" fill="var(--color-gold)" />
        <path d="M10 39 h40 l-3 5 H13 Z" fill="var(--color-gold)" />
        {/* shield */}
        <path
          d="M14 8 h32 v18 c0 9 -7 14 -16 17 c-9 -3 -16 -8 -16 -17 Z"
          fill="var(--color-gold)"
          stroke="var(--color-ink)"
          strokeWidth="1.6"
        />
        {/* divider between TITA and ITALIAN fields */}
        <line x1="16" y1="27" x2="44" y2="27" stroke="var(--color-ink)" strokeWidth="1.2" />
        <text
          x="30"
          y="22.5"
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontWeight="700"
          fontSize="13"
          letterSpacing="1"
          fill="var(--color-ink)"
        >
          TITA
        </text>
        <text
          x="30"
          y="35"
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontWeight="600"
          fontSize="6"
          letterSpacing="1.4"
          fill="var(--color-ink)"
        >
          ITALIAN
        </text>
      </svg>
      {!compact && (
        <span className="leading-tight">
          <span className="font-display block text-[20px] font-bold tracking-[0.18em] text-ink">
            TITA ITALIA
          </span>
          <span className="block text-[10.5px] uppercase tracking-[0.22em] text-gold-deep">
            Gourmet Italian · Miami, est. 2008
          </span>
        </span>
      )}
    </span>
  );
}

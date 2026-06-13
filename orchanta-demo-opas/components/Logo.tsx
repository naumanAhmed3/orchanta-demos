// Opa's Smoked Meats wordmark — recreated as SVG + type (never hotlinked):
// sausage-links-on-a-string mark, heavy "Opa's" display wordmark, letterspaced
// "SMOKED MEATS", and the brick-red "Fredericksburg, Texas" line from their logo.
export function OpasLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex select-none items-center gap-3">
      <svg
        width={compact ? 26 : 34}
        height={compact ? 26 : 34}
        viewBox="0 0 34 34"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M7 4 C11 13, 23 21, 27 30" stroke="var(--color-tan)" strokeWidth="1.6" fill="none" />
        <rect x="3" y="6" width="13" height="6.5" rx="3.25" fill="var(--color-bark)" transform="rotate(30 9.5 9.25)" />
        <rect x="10.5" y="14" width="13" height="6.5" rx="3.25" fill="var(--color-brick)" transform="rotate(30 17 17.25)" />
        <rect x="18" y="22" width="13" height="6.5" rx="3.25" fill="var(--color-bark)" transform="rotate(30 24.5 25.25)" />
      </svg>
      <span className="leading-none">
        {!compact && (
          <span className="block text-[8px] font-bold tracking-[0.3em] text-tan">~ SINCE 1947 ~</span>
        )}
        <span className={`font-display block text-bark ${compact ? "text-[18px]" : "mt-0.5 text-[24px]"}`}>
          Opa&rsquo;s
        </span>
        <span className={`block font-bold tracking-[0.26em] text-bark ${compact ? "mt-0.5 text-[7px]" : "mt-1 text-[9px]"}`}>
          SMOKED MEATS
        </span>
        {!compact && (
          <span className="mt-0.5 block text-[7px] font-bold tracking-[0.22em] text-brick">
            FREDERICKSBURG, TEXAS
          </span>
        )}
      </span>
    </span>
  );
}

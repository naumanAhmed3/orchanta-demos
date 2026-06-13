// Custom Fit College Counseling wordmark — recreated in SVG + type (not hotlinked):
// a rosewood mortarboard mark with the practice name in Cormorant Garamond.
export function Logo() {
  return (
    <span className="inline-flex select-none items-center gap-3">
      <svg width="38" height="38" viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="31" fill="var(--color-blush)" />
        <path d="M32 16 L52 25 L32 34 L12 25 Z" fill="var(--color-rosewood)" />
        <path
          d="M22 30.5 V39 c0 4 20 4 20 0 v-8.5 l-10 4.5 Z"
          fill="var(--color-rose)"
        />
        <rect x="50.6" y="25" width="2.8" height="12" rx="1.4" fill="var(--color-espresso)" />
        <circle cx="52" cy="39.5" r="2.6" fill="var(--color-espresso)" />
      </svg>
      <span className="leading-tight">
        <span className="font-display block text-[24px] font-semibold tracking-tight text-espresso">
          Custom Fit
        </span>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-rosewood">
          College Counseling
        </span>
      </span>
    </span>
  );
}

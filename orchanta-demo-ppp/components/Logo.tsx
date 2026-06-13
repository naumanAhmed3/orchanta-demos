// PPP logo — recreated in SVG (not hotlinked): a gold key-with-house-roof mark + the
// "ProPropertyProjects Ltd" wordmark in Cormorant, with the "Exceeding Expectations" tagline.
export function PPPLogo({ dark = true, showTagline = false }: { dark?: boolean; showTagline?: boolean }) {
  const gold = "var(--color-gold)";
  const knock = dark ? "var(--color-ink)" : "var(--color-paper)";
  const text = dark ? "var(--color-paper)" : "var(--color-ink)";
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <svg width="48" height="22" viewBox="0 0 60 26" fill="none" aria-hidden="true">
        <g fill={gold}>
          <path d="M3 13 L13 3 L23 13 V21 a2 2 0 0 1-2 2 H5 a2 2 0 0 1-2-2 Z" />
          <rect x="23" y="11" width="27" height="4" rx="1" />
          <rect x="45" y="15" width="3" height="5" />
          <rect x="50" y="15" width="3" height="6" />
        </g>
        <rect x="9.5" y="13.5" width="7" height="6.5" fill={knock} />
      </svg>
      <span className="leading-tight">
        <span className="font-display font-bold tracking-tight" style={{ fontSize: 19, color: text }}>
          ProPropertyProjects
        </span>
        <span className="ml-1 text-[10px] font-semibold" style={{ color: gold }}>Ltd</span>
        {showTagline && (
          <span className="font-display block text-[11px] italic" style={{ color: gold }}>Exceeding Expectations</span>
        )}
      </span>
    </span>
  );
}

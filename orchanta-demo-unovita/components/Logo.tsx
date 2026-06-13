// Uno Vita wordmark — recreated in code (not hotlinked): the orange arc-and-dot
// figure above lowercase "uno" (solid orange) + "vita" (orange outline),
// matching the mark on unovita.com. Heavy Nunito Sans, all lowercase.
export function UnoVitaLogo({ size = 26 }: { size?: number }) {
  const uno = "var(--color-uno)";
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      {/* Abstract "person" mark: big arc + dot, small smile-arc + dot. */}
      <svg
        width={size * 1.35}
        height={size * 1.08}
        viewBox="0 0 54 43"
        fill="none"
        aria-hidden="true"
      >
        <path d="M10 22 A 13 13 0 0 1 36 22" stroke={uno} strokeWidth="8" strokeLinecap="round" />
        <circle cx="46" cy="14" r="6" fill={uno} />
        <path d="M17 31 A 9.5 9.5 0 0 0 36 31" stroke={uno} strokeWidth="5.5" strokeLinecap="round" />
        <circle cx="9" cy="33" r="3.5" fill={uno} />
      </svg>
      <span
        className="font-display leading-none tracking-tight"
        style={{ fontSize: size, fontWeight: 900 }}
      >
        <span style={{ color: uno }}>uno</span>
        <span style={{ color: "transparent", WebkitTextStroke: `1.4px ${uno}` }}>vita</span>
      </span>
    </span>
  );
}

// uptail logo — recreated in SVG (not hotlinked): purple-gradient rounded square with a white
// "up" tail glyph + lowercase "uptail" wordmark.
export function UptailLogo({ size = 22 }: { size?: number }) {
  const box = size + 10;
  return (
    <span className="inline-flex items-center gap-2 select-none">
      <span
        className="grid place-items-center shadow-sm"
        style={{ width: box, height: box, borderRadius: box * 0.28, background: "linear-gradient(135deg,#7f00ff,#6a00ff)" }}
      >
        <svg width={box * 0.6} height={box * 0.6} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 15.5 L12 7.5 L19 15.5" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 7.5 L12 18.5" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      </span>
      <span className="font-display font-extrabold tracking-tight text-ink" style={{ fontSize: size }}>
        uptail
      </span>
    </span>
  );
}

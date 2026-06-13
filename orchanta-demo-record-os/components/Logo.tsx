// Record OS logo, recreated faithfully in SVG to match record-os.com:
// a stacked-database cylinder + bold "Record" wordmark + small "OS" superscript.
export function DbMark({ size = 26, color = "var(--color-ink-2)" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g fill={color}>
        <ellipse cx="12" cy="5.4" rx="7.4" ry="2.9" />
        <path d="M4.6 5.4c0 1.6 3.31 2.9 7.4 2.9s7.4-1.3 7.4-2.9v4.1c0 1.6-3.31 2.9-7.4 2.9s-7.4-1.3-7.4-2.9z" opacity="0.92" />
        <path d="M4.6 12.6c0 1.6 3.31 2.9 7.4 2.9s7.4-1.3 7.4-2.9v4.1c0 1.6-3.31 2.9-7.4 2.9s-7.4-1.3-7.4-2.9z" opacity="0.82" />
      </g>
    </svg>
  );
}

export function Logo({ scale = 1 }: { scale?: number }) {
  return (
    <span className="inline-flex items-center gap-2 select-none" style={{ fontSize: 22 * scale }}>
      <DbMark size={26 * scale} />
      <span className="font-bold tracking-tight text-ink-2 leading-none" style={{ fontSize: 22 * scale }}>
        Record
      </span>
      <span className="font-semibold text-mute leading-none" style={{ fontSize: 11 * scale, alignSelf: "flex-start", marginTop: 2 * scale }}>
        OS
      </span>
    </span>
  );
}

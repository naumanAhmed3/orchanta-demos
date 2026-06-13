// Frame wordmark — recreated as a slanted bold condensed "FRAME" (not their SVG).
export function FrameLogo({ size = 28, color = "var(--color-ink)" }: { size?: number; color?: string }) {
  return (
    <span className="display skew" style={{ fontSize: size, color, lineHeight: 1 }}>
      FRAME
    </span>
  );
}

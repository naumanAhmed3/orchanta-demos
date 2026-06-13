// HiPrimal wordmark — recreated from the brand's own published styling:
// Fraunces serif, "hi" upright + "primal" italic in oxblood (rose on dark surfaces).
// No images are hotlinked from the brand's site.
export function Logo({
  onDark = false,
  size = 26,
}: {
  onDark?: boolean;
  size?: number;
}) {
  return (
    <span
      className="font-display leading-none tracking-tight select-none"
      style={{
        fontSize: size,
        fontWeight: 560,
        color: onDark ? "var(--color-paper)" : "var(--color-ink)",
      }}
    >
      hi
      <em
        style={{
          fontWeight: 420,
          color: onDark ? "var(--color-rose)" : "var(--color-oxblood)",
        }}
      >
        primal
      </em>
    </span>
  );
}

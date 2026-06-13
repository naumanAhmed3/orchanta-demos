// Quin wordmark the way the live site sets it — Copperplate-style caps
// (Cinzel here), 0.22em tracking — followed by the concept tag "agent run".
export function QuinLogo() {
  return (
    <span className="inline-flex items-baseline gap-3 select-none">
      <span
        className="font-display font-bold uppercase text-ink"
        style={{ fontSize: 24, letterSpacing: "0.22em", lineHeight: 1 }}
      >
        Quin
      </span>
      <span aria-hidden="true" className="h-4 w-px self-center bg-line-2" />
      <span className="q-eyebrow text-ink-2">agent run</span>
    </span>
  );
}

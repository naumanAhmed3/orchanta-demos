export function Mark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="M24 9 L37 31 L31.5 31 L24 18.2 L16.5 31 L11 31 Z" fill="currentColor" />
      <path
        d="M11 38.5 A 16 12 0 0 1 37 38.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <Mark className={`h-7 w-7 ${light ? "text-white" : "text-indigo"}`} />
      <span className="leading-none">
        <span
          className={`font-display block text-[21px] font-medium tracking-tight ${
            light ? "text-white" : "text-ink"
          }`}
        >
          Aliro
        </span>
        <span
          className={`eyebrow block text-[9px] font-semibold ${light ? "text-white/60" : "text-muted"}`}
        >
          Consulting
        </span>
      </span>
    </span>
  );
}

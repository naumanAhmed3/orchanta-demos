export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden
        className="relative grid h-9 w-9 place-items-center rounded-md bg-brand font-heading text-lg font-bold text-white"
      >
        A
        <span className="absolute bottom-1.5 h-[3px] w-4 rounded-full bg-sky" />
      </span>
      <span className="leading-none">
        <span className="block font-heading text-lg font-bold tracking-tight text-ink">
          A.R.M <span className="text-brand">Textile</span>
        </span>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
          Manufacturer &amp; Exporter
        </span>
      </span>
    </span>
  );
}

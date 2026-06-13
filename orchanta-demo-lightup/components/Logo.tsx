// Lightup-toned wordmark, recreated in SVG (not hotlinked). The mark echoes the
// lightupnet.de landing page: a Tiefblau/Dunkelorange split tile with a white divider.
export function LightupLogo() {
  return (
    <span className="inline-flex select-none items-center gap-2.5">
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
        <defs>
          <clipPath id="lu-r">
            <rect width="32" height="32" rx="7" />
          </clipPath>
        </defs>
        <g clipPath="url(#lu-r)">
          <rect width="32" height="32" fill="var(--color-blau)" />
          <rect x="17.5" width="14.5" height="32" fill="var(--color-orange)" />
          <rect x="14.5" width="3" height="32" fill="var(--color-paper)" />
        </g>
      </svg>
      <span className="leading-tight">
        <span className="block text-[19px] font-bold tracking-tight text-blau">
          Lightup <span className="font-semibold text-orange">Ops</span>
        </span>
        <span className="block text-[11px] font-medium text-steel">
          Konzept für Lightup Network Solutions
        </span>
      </span>
    </span>
  );
}

// IDM Imagineering wordmark — recreated in code (not hotlinked): a magenta
// 3D-print layered cube mark + "IDM IMAGINEERING" in their heading style
// (lead word magenta, rest ink), with the model-makers strapline.
export function IDMLogo({ showTagline = true }: { showTagline?: boolean }) {
  return (
    <span className="inline-flex select-none items-center gap-2.5">
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2 21 7 12 12 3 7Z" fill="#d24fd0" />
        <path d="M3 7 12 12V22L3 17Z" fill="#ba23b8" />
        <path d="M21 7V17L12 22V12Z" fill="#93158f" />
        <g stroke="#ffffff" strokeWidth="0.8" opacity="0.55">
          <path d="M3 10.4 12 15.4M3 13.8 12 18.8" />
          <path d="M21 10.4 12 15.4M21 13.8 12 18.8" />
        </g>
      </svg>
      <span className="leading-tight">
        <span className="idm-h block text-[17px] tracking-tight">
          <span className="text-magenta">IDM</span>{" "}
          <span className="text-ink">Imagineering</span>
        </span>
        {showTagline && (
          <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-mute">
            Model Makers · Props · Cosplay · 3D Print
          </span>
        )}
      </span>
    </span>
  );
}

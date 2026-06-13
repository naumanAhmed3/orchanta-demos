// Strahltechnik Express wordmark — recreated in type (not hotlinked), mirroring the
// store's logo: "Strahltechnik" in signal orange + "Express" in dark slate (or paper
// on dark surfaces), set in the site's condensed PT Sans Narrow bold.
export function StrahltechnikLogo({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className="font-display inline-flex select-none items-baseline leading-none">
      <span className="text-[24px] font-bold tracking-tight text-orange sm:text-[28px]">
        Strahltechnik
      </span>
      <span
        className={`text-[24px] font-bold tracking-tight sm:text-[28px] ${
          onDark ? "text-paper" : "text-slate"
        }`}
      >
        Express
      </span>
    </span>
  );
}

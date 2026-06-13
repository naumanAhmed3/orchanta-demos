export default function Logo() {
  return (
    <span className="inline-flex items-center gap-3">
      <span
        aria-hidden="true"
        className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-teal shadow-sm"
      >
        <svg viewBox="0 0 64 64" className="h-7 w-7" role="img" aria-label="">
          <path
            d="M16 30h32v6a16 16 0 0 1-16 16 16 16 0 0 1-16-16z"
            fill="#fcc04c"
          />
          <rect x="13" y="27" width="38" height="5" rx="2.5" fill="#e0a21e" />
          <path
            d="M26 24c-3-3 1-6-2-9M32 22c-3-3 1-6-2-9M38 24c-3-3 1-6-2-9"
            fill="none"
            stroke="#fcf1cd"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle cx="32" cy="41" r="3.4" fill="#c16452" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block font-display text-lg font-bold text-teal-ink">
          Little Big Flavour Kits
        </span>
        <span className="block text-xs font-semibold tracking-wide text-terracotta">
          The true taste of Sri Lanka
        </span>
      </span>
    </span>
  );
}

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Legacy Learning Group mark"
      fill="none"
    >
      <g stroke="#F6B43C" strokeWidth="2.6" strokeLinecap="round">
        <path d="M32 14.5V10" />
        <path d="M21 17.5l-2.6-3.4" />
        <path d="M43 17.5l2.6-3.4" />
      </g>
      <path
        d="M21 24a11 11 0 0 1 22 0"
        stroke="#F6B43C"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M12 33c7-3 14-3 20 1 6-4 13-4 20-1v17c-7-3-14-3-20 1-6-4-13-4-20-1V33Z"
        fill="#163E5C"
      />
      <path d="M32 34v17" stroke="#FBF7EF" strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M18 38c4-1.4 8-1.4 11 .3M18 43c4-1.4 8-1.4 11 .3"
        stroke="#2BA6A4"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M46 38c-4-1.4-8-1.4-11 .3M46 43c-4-1.4-8-1.4-11 .3"
        stroke="#FF8A5B"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5 leading-none">
      <LogoMark className="h-9 w-9 shrink-0 drop-shadow-sm" />
      <span className="flex flex-col">
        <span className="leading-tight">
          <span className="font-display text-[1.15rem] font-semibold tracking-tight text-navy">
            Legacy
          </span>{" "}
          <span className="text-[1.05rem] font-semibold tracking-tight text-teal-600">
            Learning Group
          </span>
        </span>
        {!compact && (
          <span className="text-[0.7rem] font-medium tracking-wide text-ink/55">
            Every child writes their legacy.
          </span>
        )}
      </span>
    </span>
  );
}

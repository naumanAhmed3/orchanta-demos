type LogoProps = {
  className?: string;
  tone?: "light" | "dark";
};

// Studio wordmark with a small aperture mark. Pure SVG + type, no images.
export default function Logo({ className, tone = "dark" }: LogoProps) {
  const ink = tone === "light" ? "#f8f3ea" : "#221f1b";
  const accent = "#b0915e";

  return (
    <span
      className={`inline-flex items-center gap-2.5 ${className ?? ""}`}
      aria-label="BS Studio by Ossama Adnan"
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 64 64"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="32" cy="32" r="20" fill="none" stroke={accent} strokeWidth="2.4" />
        <path
          d="M32 12 L43 30 H21 Z M52 32 L41 50 H52 Z M12 32 L23 14 V32 Z M32 52 L21 34 H43 Z"
          fill={accent}
          opacity="0.85"
          transform="rotate(20 32 32)"
        />
        <circle cx="32" cy="32" r="6.5" fill="none" stroke={ink} strokeWidth="2" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className="font-display text-[1.35rem] font-semibold tracking-wide"
          style={{ color: ink }}
        >
          BS Studio
        </span>
        <span
          className="text-[0.58rem] font-medium uppercase tracking-[0.32em]"
          style={{ color: accent }}
        >
          by Ossama Adnan
        </span>
      </span>
    </span>
  );
}

type LogoProps = {
  variant?: "light" | "dark";
};

// School wordmark: a steering-wheel mark + "Islamabad Driving Center".
// Pure SVG/markup — no external images, no hotlinks.
export default function Logo({ variant = "dark" }: LogoProps) {
  const wordColor = variant === "light" ? "text-white" : "text-navy";
  const subColor = variant === "light" ? "text-white/70" : "text-slate-500";

  return (
    <div className="flex items-center gap-3">
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy ring-2 ring-accent/70"
        aria-hidden="true"
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent"
        >
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="2.6" />
          <path d="M12 3.2v6.2M4.3 16.5l5.4-3.1M19.7 16.5l-5.4-3.1" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className={`block text-[15px] font-extrabold tracking-tight ${wordColor}`}>
          Islamabad Driving Center
        </span>
        <span className={`block text-[11px] font-semibold uppercase tracking-[0.18em] ${subColor}`}>
          Pvt Ltd · Since 2009
        </span>
      </span>
    </div>
  );
}

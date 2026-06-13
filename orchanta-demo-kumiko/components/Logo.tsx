export default function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const wordmark = size === "lg" ? "text-4xl" : "text-2xl";
  return (
    <span className="inline-flex items-end gap-2 select-none">
      <svg
        viewBox="0 0 44 26"
        aria-hidden="true"
        className={size === "lg" ? "w-10 h-6" : "w-8 h-5"}
      >
        <path
          d="M4 20 Q22 6 40 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path d="M9 16.5 L6.5 11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M15.5 13.5 L14 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M22 12.5 L21.5 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M28.5 13.5 L30 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M35 16.5 L37.5 11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <span className="leading-none">
        <span className={`font-display ${wordmark} tracking-tight`}>Kumiko</span>{" "}
        <span className="text-[0.7em] tracking-[0.28em] uppercase align-baseline">
          Lash
        </span>
      </span>
    </span>
  );
}

export function DropMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 3C16 3 5 14.5 5 22C5 28.0751 9.9249 33 16 33C22.0751 33 27 28.0751 27 22C27 14.5 16 3 16 3Z"
        fill="currentColor"
      />
      <ellipse cx="12.5" cy="19.5" rx="2.6" ry="3.4" fill="#FFFFFF" fillOpacity="0.55" />
    </svg>
  );
}

export function Wordmark({
  className = "",
  dropClass = "text-cyan",
  textClass = "text-petrol",
}: {
  className?: string;
  dropClass?: string;
  textClass?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <DropMark className={`h-7 w-7 -mt-px ${dropClass}`} />
      <span
        className={`display-tight text-2xl font-semibold tracking-tight ${textClass}`}
      >
        Coco<span className="font-normal italic">Clean</span>
      </span>
    </span>
  );
}

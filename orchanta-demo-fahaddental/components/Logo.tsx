import { CLINIC } from "@/lib/data";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand shadow-sm">
        <svg
          width="22"
          height="22"
          viewBox="0 0 32 32"
          aria-hidden="true"
          fill="none"
        >
          <path
            d="M16 7c-2.4-1.7-5.3-2.1-7.4-.7C6.5 7.7 5.6 10 6 13.1c.3 2.3.7 3.6 1 5.9.3 2.3.4 5 1.7 6.6.9 1.1 2.1.6 2.4-1 .3-1.6.4-3.6 1-5 .3-.9 1-1.3 1.9-1.3s1.6.4 1.9 1.3c.6 1.4.7 3.4 1 5 .3 1.6 1.5 2.1 2.4 1 1.3-1.6 1.4-4.3 1.7-6.6.3-2.3.7-3.6 1-5.9.4-3.1-.5-5.4-2.6-6.8-2.1-1.4-5-1-7.4.7Z"
            fill="#ffffff"
          />
        </svg>
      </span>
      <span className="font-display text-lg font-bold leading-none tracking-tight">
        <span className="text-ink">{CLINIC.wordmarkLead}</span>{" "}
        <span className="text-accent">{CLINIC.wordmarkTail}</span>
      </span>
    </span>
  );
}

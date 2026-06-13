import type { Category } from "@/lib/data";

// Lightweight inline SVG marks per product line — no external/hotlinked images.
export default function ProductIcon({
  category,
  className = "",
}: {
  category: Category;
  className?: string;
}) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (category) {
    case "towels":
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <rect x="11" y="8" width="26" height="32" rx="3" {...common} />
          <line x1="11" y1="15" x2="37" y2="15" {...common} />
          <line x1="11" y1="33" x2="37" y2="33" {...common} />
          <line x1="16" y1="19" x2="16" y2="29" {...common} />
          <line x1="20" y1="19" x2="20" y2="29" {...common} />
          <line x1="24" y1="19" x2="24" y2="29" {...common} />
          <line x1="28" y1="19" x2="28" y2="29" {...common} />
          <line x1="32" y1="19" x2="32" y2="29" {...common} />
        </svg>
      );
    case "bathrobes":
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <path d="M18 9l6 6 6-6" {...common} />
          <path d="M18 9c-4 2-6 6-6 12v18h24V21c0-6-2-10-6-12" {...common} />
          <path d="M24 15v25" {...common} />
          <path d="M12 24l-3 3M36 24l3 3" {...common} />
          <path d="M14 33h7" {...common} />
        </svg>
      );
    case "fabric":
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <path d="M9 14c5-3 10-3 15 0s10 3 15 0v8c-5 3-10 3-15 0s-10-3-15 0z" {...common} />
          <path d="M9 26c5-3 10-3 15 0s10 3 15 0v8c-5 3-10 3-15 0s-10-3-15 0z" {...common} />
        </svg>
      );
    case "baby":
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <path d="M24 10l13 7v6c0 9-6 13-13 15-7-2-13-6-13-15v-6z" {...common} />
          <circle cx="24" cy="23" r="5" {...common} />
          <path d="M24 28v6M20 31h8" {...common} />
        </svg>
      );
  }
}

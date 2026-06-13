import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/* Heritage — an arch / doorway into the old quarter */
export function IconHeritage(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 21V10a7 7 0 0 1 14 0v11" />
      <path d="M3 21h18" />
      <path d="M9 21v-6a3 3 0 0 1 6 0v6" />
      <path d="M12 3v1.5" />
    </svg>
  );
}

/* Cuisine — a shared bowl / table */
export function IconCuisine(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 11h16a8 8 0 0 1-16 0Z" />
      <path d="M2 21h20" />
      <path d="M12 3c-1.2 1-1.2 2.5 0 3.5" />
      <path d="M8.5 4.5c-.9.8-.9 1.8 0 2.6" />
      <path d="M15.5 4.5c-.9.8-.9 1.8 0 2.6" />
    </svg>
  );
}

/* Festivals — a lit flame / candle */
export function IconFestival(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3c2.5 2.4 4 4.6 4 7a4 4 0 0 1-8 0c0-1.4.6-2.7 1.6-3.8" />
      <path d="M12 14c1.2-.8 1.8-1.8 1.8-3" opacity="0.6" />
      <path d="M8 21h8" />
      <path d="M10 17.5h4V21h-4Z" />
    </svg>
  );
}

/* Community — people / connection */
export function IconCommunity(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="8" cy="9" r="2.6" />
      <circle cx="16" cy="9" r="2.6" />
      <path d="M3.5 19a4.5 4.5 0 0 1 9 0" />
      <path d="M11.5 19a4.5 4.5 0 0 1 9 0" />
    </svg>
  );
}

/* Scholar / book — used in experiences */
export function IconScholar(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5Z" />
      <path d="M4 5.5V20.5" />
      <path d="M9 8h7M9 11.5h7" />
    </svg>
  );
}

export function IconCompass(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base} width={14} height={14} {...props}>
      <path d="m4 12 5 5L20 6" />
    </svg>
  );
}

export function IconArrow(props: IconProps) {
  return (
    <svg {...base} width={18} height={18} {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function IconSpark(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" opacity="0.7" />
      <path d="M12 8.5 13.2 11l2.5 1-2.5 1L12 15.5 10.8 13l-2.5-1 2.5-1Z" />
    </svg>
  );
}

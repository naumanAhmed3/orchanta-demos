import type { SVGProps } from "react";

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function IconCheck(p: IconProps) {
  return (
    <svg {...base} width="16" height="16" aria-hidden {...p}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function IconRefresh(p: IconProps) {
  return (
    <svg {...base} width="16" height="16" aria-hidden {...p}>
      <path d="M21 12a9 9 0 1 1-2.64-6.36" />
      <path d="M21 3v5h-5" />
    </svg>
  );
}

export function IconDownload(p: IconProps) {
  return (
    <svg {...base} width="16" height="16" aria-hidden {...p}>
      <path d="M12 3v12" />
      <path d="m7 11 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

export function IconForward(p: IconProps) {
  return (
    <svg {...base} width="16" height="16" aria-hidden {...p}>
      <path d="m4 5 9 7-9 7V5Z" />
      <path d="m13 5 9 7-9 7V5Z" />
    </svg>
  );
}

export function IconArrow(p: IconProps) {
  return (
    <svg {...base} width="16" height="16" aria-hidden {...p}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function IconBolt(p: IconProps) {
  return (
    <svg {...base} width="16" height="16" aria-hidden {...p}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  );
}

export function IconBrief(p: IconProps) {
  return (
    <svg {...base} width="16" height="16" aria-hidden {...p}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M8 12h8M8 16h5" />
    </svg>
  );
}

export function StatusDot({ state }: { state: "idle" | "active" | "done" }) {
  const color =
    state === "done"
      ? "bg-teal"
      : state === "active"
        ? "bg-orange animate-node-pulse"
        : "bg-line-strong";
  return <span className={cx("inline-block size-2 rounded-full", color)} aria-hidden />;
}

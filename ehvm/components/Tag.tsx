"use client";

export function Tag({
  label,
  fg,
  bg,
  dot = false,
}: {
  label: string;
  fg: string;
  bg: string;
  dot?: boolean;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-medium whitespace-nowrap"
      style={{ color: fg, background: bg }}
    >
      {dot && (
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: fg }}
        />
      )}
      {label}
    </span>
  );
}

import { COMPANY } from "@/lib/data";

export default function Logo({
  tone = "navy",
  className = "",
}: {
  tone?: "navy" | "light";
  className?: string;
}) {
  const wordColor = tone === "light" ? "text-white" : "text-navy";
  const subColor = tone === "light" ? "text-mist" : "text-slate";
  const markBg = tone === "light" ? "bg-white text-navy" : "bg-navy text-white";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden="true"
        className={`grid h-9 w-9 place-items-center rounded-md font-display text-[15px] font-extrabold leading-none ${markBg}`}
      >
        TM
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[17px] font-extrabold tracking-tight ${wordColor}`}
        >
          {COMPANY.name}
        </span>
        <span
          className={`mt-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] ${subColor}`}
        >
          Faisalabad · Since {COMPANY.since}
        </span>
      </span>
    </span>
  );
}

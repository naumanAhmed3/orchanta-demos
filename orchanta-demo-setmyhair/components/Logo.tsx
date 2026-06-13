import { SALON } from "@/lib/data";

/**
 * Salon wordmark. Pure type + CSS (no image): an elegant serif "Set My Hair"
 * with a small monogram badge and a gold "SALON · LAHORE" subline.
 */
export default function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const text = tone === "light" ? "text-blush" : "text-plum";
  const sub = tone === "light" ? "text-gold-soft" : "text-gold";

  return (
    <span className="inline-flex items-center gap-3 select-none">
      <span
        aria-hidden="true"
        className="grid h-9 w-9 place-items-center rounded-xl bg-plum text-blush shadow-sm"
      >
        <span className="font-heading text-xl italic leading-none">S</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-heading text-2xl font-semibold tracking-tight ${text}`}>
          {SALON.short}
        </span>
        <span className={`text-[0.6rem] font-medium uppercase tracking-[0.28em] ${sub}`}>
          Salon · Lahore
        </span>
      </span>
    </span>
  );
}

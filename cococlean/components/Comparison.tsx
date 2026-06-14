"use client";

import { useEffect, useRef, useState } from "react";

type Cell = boolean | "partial";

const columns = ["Coco Clean", "Plastic jugs", "Pods", "Liquid"];

const rows: { label: string; cells: Cell[] }[] = [
  { label: "Zero plastic packaging", cells: [true, false, "partial", false] },
  { label: "Fragrance free", cells: [true, false, false, "partial"] },
  { label: "Biodegradable formula", cells: [true, false, false, "partial"] },
  { label: "Works in HE + hard water", cells: [true, true, true, true] },
  { label: "Just ½ TBSP per load", cells: [true, false, true, false] },
  { label: "No microplastic film", cells: [true, true, false, true] },
];

function Mark({ state, on }: { state: Cell; on: boolean }) {
  if (state === true) {
    return (
      <span
        className={`inline-flex h-7 w-7 items-center justify-center rounded-full bg-cyan/15 text-cyan transition-all duration-500 ${
          on ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
          <path
            d="M4 10.5l3.5 3.5L16 5.5"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }
  if (state === "partial") {
    return (
      <span
        className={`inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink/8 text-ink/45 transition-all duration-500 ${
          on ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      >
        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
          <path d="M5 10h10" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      </span>
    );
  }
  return (
    <span
      className={`inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink/6 text-ink/35 transition-all duration-500 ${
        on ? "scale-100 opacity-100" : "scale-50 opacity-0"
      }`}
    >
      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
        <path
          d="M6 6l8 8M14 6l-8 8"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function Comparison() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();
        const reduce = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        if (reduce) {
          setRevealed(rows.length);
          return;
        }
        rows.forEach((_, i) => {
          setTimeout(() => setRevealed((r) => Math.max(r, i + 1)), 280 * i);
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="difference" className="bg-cream-2 texture-card py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-6" ref={ref}>
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan">
            The honest comparison
          </p>
          <h2 className="display-tight mt-3 text-[clamp(2rem,5vw,3.2rem)] font-semibold text-petrol">
            Why Coco Clean Is Different
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-ink/65">
            Scroll and watch it fill in. No fine print, no greenwashing — just
            what&apos;s in the box vs. what&apos;s on the shelf.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-[1.8rem] border border-petrol/10 bg-white shadow-card">
          {/* header */}
          <div className="grid grid-cols-[1.4fr_repeat(4,1fr)] items-center gap-1 bg-petrol px-3 py-4 text-cream sm:px-5">
            <span className="text-xs font-bold uppercase tracking-wider text-cream/60">
              Feature
            </span>
            {columns.map((c, i) => (
              <span
                key={c}
                className={`text-center text-[11px] font-extrabold leading-tight sm:text-sm ${
                  i === 0 ? "text-cyan" : "text-cream/70"
                }`}
              >
                {c}
              </span>
            ))}
          </div>

          {/* rows */}
          {rows.map((row, ri) => {
            const on = ri < revealed;
            return (
              <div
                key={row.label}
                className={`grid grid-cols-[1.4fr_repeat(4,1fr)] items-center gap-1 border-t border-petrol/8 px-3 py-3.5 transition-colors sm:px-5 ${
                  ri % 2 ? "bg-cream-2/40" : "bg-white"
                }`}
              >
                <span
                  className={`text-[13px] font-bold text-petrol transition-all duration-500 sm:text-sm ${
                    on ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                  }`}
                >
                  {row.label}
                </span>
                {row.cells.map((cell, ci) => (
                  <span key={ci} className="flex justify-center">
                    <Mark state={cell} on={on} />
                  </span>
                ))}
              </div>
            );
          })}
        </div>

        <p className="mt-5 text-center text-[11px] font-semibold uppercase tracking-wider text-ink/45">
          Sample comparison populated from Coco Clean&apos;s live site
        </p>
      </div>
    </section>
  );
}

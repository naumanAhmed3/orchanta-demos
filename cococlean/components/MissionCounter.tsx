"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, run: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration]);
  return value;
}

export function MissionCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  const bottles = useCountUp(100, run);
  const loads = useCountUp(80, run, 1500);
  const tbsp = useCountUp(50, run, 1500);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setRun(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="mission" className="relative bg-cream py-20 sm:py-24" ref={ref}>
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.2rem] bg-petrol texture-deep px-6 py-12 text-center text-cream shadow-card sm:px-12 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-soft">
            The Coco Clean mission
          </p>
          <h2 className="display-tight mx-auto mt-4 max-w-3xl text-[clamp(1.9rem,5vw,3.1rem)] font-semibold">
            Replace{" "}
            <span className="relative whitespace-nowrap text-cyan">
              {bottles} million
            </span>{" "}
            plastic detergent bottles
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-cream/75">
            Every powder pouch that ships is a plastic jug that never gets made.
            Here&apos;s the running tally we&apos;re building toward.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <Stat value={`${bottles}M`} label="Plastic bottles to replace" />
            <Stat value={`${loads}`} label="Loads per powder bundle" highlight />
            <Stat value={`${tbsp}%`} label="Less product per wash vs liquid" />
          </div>

          <p className="mt-8 text-[11px] font-semibold uppercase tracking-wider text-cream/50">
            Sample figures populated from Coco Clean&apos;s live site
          </p>
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  label,
  highlight = false,
}: {
  value: string;
  label: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border px-5 py-7 ${
        highlight
          ? "border-cyan/50 bg-cyan/10"
          : "border-cream/15 bg-petrol-2/40"
      }`}
    >
      <div className="display-tight text-5xl font-semibold text-cyan tabular-nums">
        {value}
      </div>
      <div className="mt-2 text-sm font-semibold text-cream/70">{label}</div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import type { ScanSample, TargetConfig } from "@/lib/lessons";
import { prefersReducedMotion } from "@/lib/lessons";
import { SamplePhoto } from "./SamplePhoto";
import { Stars } from "./Stars";

type Phase = "idle" | "scanning" | "done";

export function ScanPanel({
  target,
  onSuccess,
}: {
  target: TargetConfig;
  onSuccess: () => void;
}) {
  const [activeId, setActiveId] = useState(target.samples[0].id);
  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<ScanSample | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset when the vision target changes (re-point).
  useEffect(() => {
    setActiveId(target.samples[0].id);
    setPhase("idle");
    setResult(null);
    if (timer.current) clearTimeout(timer.current);
  }, [target.id, target.samples]);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const active = target.samples.find((s) => s.id === activeId) ?? target.samples[0];

  function runScan(sample: ScanSample) {
    if (timer.current) clearTimeout(timer.current);
    setActiveId(sample.id);
    setResult(null);

    if (prefersReducedMotion()) {
      setPhase("done");
      setResult(sample);
      onSuccess();
      return;
    }
    setPhase("scanning");
    timer.current = setTimeout(() => {
      setPhase("done");
      setResult(sample);
      onSuccess();
    }, 1500);
  }

  return (
    <section
      className="flex flex-col rounded-3xl border border-navy/10 bg-white/85 p-4 shadow-soft sm:p-5"
      aria-label="Scan a sample"
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-teal/15 text-teal-600">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M4 8a2 2 0 0 1 2-2h1l1-2h6l1 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <circle cx="12" cy="12.5" r="3.4" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </span>
        <div>
          <h3 className="font-display text-base font-semibold leading-none text-navy">
            Scan it
          </h3>
          <p className="mt-0.5 text-[0.78rem] text-ink/60">
            Tap a sample — Vision reads the work.
          </p>
        </div>
      </div>

      {/* Camera frame */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-cream-200">
        <SamplePhoto sample={active} />

        {/* corner brackets */}
        <span className="pointer-events-none absolute inset-2 rounded-xl">
          {["left-1 top-1 border-l-2 border-t-2", "right-1 top-1 border-r-2 border-t-2", "left-1 bottom-1 border-l-2 border-b-2", "right-1 bottom-1 border-r-2 border-b-2"].map(
            (pos) => (
              <span
                key={pos}
                className={`absolute h-5 w-5 rounded-[3px] border-teal/70 ${pos}`}
              />
            )
          )}
        </span>

        <span className="absolute left-2 top-2 rounded-full bg-navy/80 px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wider text-cream">
          Sample
        </span>

        {/* scan sweep */}
        {phase === "scanning" && (
          <span
            className="animate-scan reduce-hide pointer-events-none absolute inset-x-0 top-0 h-1/3"
            style={{
              background:
                "linear-gradient(to bottom, rgba(43,166,164,0) 0%, rgba(43,166,164,0.28) 60%, rgba(43,166,164,0.9) 100%)",
              boxShadow: "0 6px 14px rgba(43,166,164,0.45)",
            }}
          />
        )}
        {phase === "scanning" && (
          <span className="absolute inset-x-0 bottom-0 bg-navy/75 py-1 text-center text-[0.7rem] font-semibold text-cream">
            Scanning the work…
          </span>
        )}
      </div>

      {/* Sample picker */}
      <div className="mt-3 flex flex-wrap gap-2">
        {target.samples.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => runScan(s)}
            aria-pressed={activeId === s.id}
            className={`flex-1 min-w-[5.5rem] rounded-xl border px-2.5 py-2 text-left transition active:scale-[0.98] ${
              activeId === s.id && phase !== "idle"
                ? "border-teal bg-teal/10"
                : "border-navy/10 bg-cream/60 hover:border-teal/60 hover:bg-white"
            }`}
          >
            <span className="block font-display text-base font-semibold leading-tight text-navy">
              {s.label}
            </span>
            <span className="block text-[0.66rem] leading-tight text-ink/55">{s.sub}</span>
          </button>
        ))}
      </div>

      {/* Result */}
      <div className="mt-3 min-h-[5.5rem]" aria-live="polite">
        {phase === "done" && result ? (
          <div className="animate-reveal rounded-2xl border border-teal/25 bg-gradient-to-br from-teal/10 to-cream p-3.5">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-wide text-teal-600">
                <span className="h-1.5 w-1.5 rounded-full bg-teal" /> Vision saw
              </span>
              <Stars count={result.stars} />
            </div>
            <p className="mt-1.5 font-display text-lg font-semibold text-navy">
              “{result.saw}”
            </p>
            <p className="mt-1 text-sm leading-snug text-ink/80">{result.coaching}</p>
          </div>
        ) : (
          <div className="grid h-[5.5rem] place-items-center rounded-2xl border border-dashed border-navy/15 text-center text-[0.8rem] text-ink/45">
            {phase === "scanning" ? "Reading the work…" : "Tap a sample above to see what Vision reads."}
          </div>
        )}
      </div>
    </section>
  );
}

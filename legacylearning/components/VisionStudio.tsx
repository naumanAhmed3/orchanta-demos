"use client";

import { useState } from "react";
import { TARGETS, type TargetId, getTarget } from "@/lib/lessons";
import { Wordmark } from "./Logo";
import { WritePanel } from "./WritePanel";
import { ScanPanel } from "./ScanPanel";
import { LessonRail } from "./LessonRail";

const ZERO: Record<TargetId, number> = {
  handwriting: 0,
  worksheet: 0,
  object: 0,
  flashcard: 0,
};

export function VisionStudio() {
  const [targetId, setTargetId] = useState<TargetId>("handwriting");
  const [progress, setProgress] = useState<Record<TargetId, number>>(ZERO);
  const [celebrateKey, setCelebrateKey] = useState(0);

  const target = getTarget(targetId);

  function handleSuccess() {
    setProgress((p) => ({
      ...p,
      [targetId]: Math.min(p[targetId] + 1, target.lesson.length),
    }));
    setCelebrateKey((k) => k + 1);
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Tablet bezel */}
      <div className="relative rounded-[2rem] bg-gradient-to-b from-[#0e2a40] to-[#16344b] p-2.5 shadow-[0_40px_80px_-30px_rgba(14,42,64,0.7)] sm:rounded-[2.4rem] sm:p-4">
        <span className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cream/30 sm:top-2.5" />

        <div className="overflow-hidden rounded-[1.5rem] bg-cream sm:rounded-[1.9rem]">
          {/* App bar */}
          <header className="flex items-center justify-between gap-3 border-b border-navy/10 bg-white/70 px-4 py-3 sm:px-6">
            <Wordmark />
            <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-gold/20 px-2.5 py-1 text-[0.68rem] font-semibold text-navy sm:inline-flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-coral" />
              Working concept
            </span>
          </header>

          <div className="px-4 py-5 sm:px-6 sm:py-6">
            {/* Disclaimer banner */}
            <div className="mb-4 flex items-start gap-2 rounded-2xl border border-gold/40 bg-gold/12 px-3.5 py-2.5 text-[0.78rem] leading-snug text-navy">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="mt-0.5 shrink-0">
                <circle cx="12" cy="12" r="9" stroke="#163E5C" strokeWidth="1.8" />
                <path d="M12 8h.01M11 12h1v4h1" stroke="#163E5C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>
                <strong className="font-semibold">Working concept · sample recognition</strong> — not
                live OpenAI Vision. Recognition is mocked to show the loop on a tablet.
              </span>
            </div>

            {/* Hero */}
            <div className="mb-5 max-w-2xl">
              <p className="mb-1 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-teal-600">
                The risky core, working
              </p>
              <h1 className="font-display text-3xl font-semibold leading-[1.05] text-navy sm:text-4xl">
                See it. Coach it. <span className="text-coral">Celebrate it.</span>
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-ink/70 sm:text-base">
                A tablet learning loop where the camera reads a child&apos;s work, returns gentle
                letter-formation coaching, and celebrates the win — the recognition-to-feedback path
                your MVP rides on.
              </p>
            </div>

            {/* Re-point the Vision target */}
            <div className="mb-5 rounded-2xl border border-navy/10 bg-white/60 p-3.5">
              <div className="mb-2.5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h2 className="font-display text-sm font-semibold text-navy">
                  Re-point the Vision target
                </h2>
                <p className="text-[0.74rem] text-ink/55">
                  Aim the same engine at whatever your MVP truly needs.
                </p>
              </div>
              <div role="tablist" aria-label="Vision target" className="flex flex-wrap gap-2">
                {TARGETS.map((t) => {
                  const active = t.id === targetId;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setTargetId(t.id)}
                      className={`group rounded-xl border px-3 py-2 text-left transition active:scale-[0.98] ${
                        active
                          ? "border-teal bg-teal text-cream shadow-soft"
                          : "border-navy/12 bg-cream/70 text-navy hover:border-teal/60 hover:bg-white"
                      }`}
                    >
                      <span className="block text-sm font-semibold leading-tight">{t.label}</span>
                      <span
                        className={`block text-[0.66rem] leading-tight ${active ? "text-cream/80" : "text-ink/50"}`}
                      >
                        {t.tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Two interactive zones */}
            <div className="grid gap-4 lg:grid-cols-2">
              <WritePanel target={target} onSuccess={handleSuccess} />
              <ScanPanel target={target} onSuccess={handleSuccess} />
            </div>

            {/* Adaptive lesson + reward */}
            <div className="mt-4">
              <LessonRail
                target={target}
                completed={progress[targetId]}
                celebrateKey={celebrateKey}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-6 flex flex-col items-center gap-1 text-center text-[0.74rem] text-ink/45">
        <p>
          Legacy Learning Group — working concept built by Orchanta. Sample data only; no live API
          calls.
        </p>
      </footer>
    </div>
  );
}

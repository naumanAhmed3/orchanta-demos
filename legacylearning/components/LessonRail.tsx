"use client";

import { useEffect, useState } from "react";
import type { TargetConfig } from "@/lib/lessons";

const SPARKLES = [
  { dx: "-46px", dy: "-30px" },
  { dx: "44px", dy: "-34px" },
  { dx: "-30px", dy: "26px" },
  { dx: "34px", dy: "24px" },
  { dx: "0px", dy: "-50px" },
  { dx: "-54px", dy: "4px" },
  { dx: "54px", dy: "2px" },
];

export function LessonRail({
  target,
  completed,
  celebrateKey,
}: {
  target: TargetConfig;
  completed: number;
  celebrateKey: number;
}) {
  const total = target.lesson.length;
  const done = Math.min(completed, total);
  const pct = Math.round((done / total) * 100);
  const [celebrate, setCelebrate] = useState(false);

  const R = 30;
  const C = 2 * Math.PI * R;
  const offset = C * (1 - done / total);

  useEffect(() => {
    if (celebrateKey === 0) return;
    setCelebrate(true);
    const t = setTimeout(() => setCelebrate(false), 2200);
    return () => clearTimeout(t);
  }, [celebrateKey]);

  const currentIndex = Math.min(done, total - 1);

  return (
    <section
      className="relative flex flex-col gap-4 rounded-3xl border border-navy/10 bg-gradient-to-br from-navy to-navy-700 p-4 text-cream shadow-soft sm:flex-row sm:items-center sm:p-5"
      aria-label="Lesson progress"
    >
      {/* Progress ring */}
      <div className="relative grid shrink-0 place-items-center">
        <svg width="84" height="84" viewBox="0 0 84 84" aria-hidden>
          <circle cx="42" cy="42" r={R} fill="none" stroke="rgba(251,247,239,0.18)" strokeWidth="8" />
          <circle
            cx="42"
            cy="42"
            r={R}
            fill="none"
            stroke="#F6B43C"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={offset}
            transform="rotate(-90 42 42)"
            className="ring-progress"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="font-display text-xl font-semibold leading-none">{pct}%</span>
          <span className="text-[0.6rem] uppercase tracking-wide text-cream/65">done</span>
        </div>

        {/* Reward burst */}
        {celebrate && (
          <>
            <span
              key={`star-${celebrateKey}`}
              className="animate-star pointer-events-none absolute -top-3 -right-3 text-2xl"
              aria-hidden
            >
              ⭐
            </span>
            <span className="reduce-hide pointer-events-none absolute inset-0" aria-hidden>
              {SPARKLES.map((s, i) => (
                <span
                  key={`${celebrateKey}-${i}`}
                  className="animate-sparkle absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-gold"
                  style={{ ["--dx" as string]: s.dx, ["--dy" as string]: s.dy }}
                />
              ))}
            </span>
          </>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-base font-semibold">{target.lessonKind}</h3>
          <span className="text-[0.72rem] text-cream/70">
            {done}/{total} mastered
          </span>
        </div>

        {/* Adaptive steps */}
        <div className="mt-2.5 flex flex-wrap gap-2">
          {target.lesson.map((step, i) => {
            const isDone = i < done;
            const isCurrent = i === currentIndex && !isDone;
            return (
              <span
                key={step}
                className={`grid h-9 min-w-9 place-items-center rounded-xl px-2 text-sm font-semibold transition ${
                  isDone
                    ? "bg-gold text-navy"
                    : isCurrent
                      ? "animate-pulse-ring border-2 border-teal bg-navy text-cream"
                      : "border border-cream/20 bg-navy text-cream/45"
                }`}
              >
                {isDone ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 13l4 4 10-11" stroke="#163E5C" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <span className="font-display">{step}</span>
                )}
              </span>
            );
          })}
        </div>

        <p className="mt-2.5 text-[0.78rem] leading-snug text-cream/75">
          {done >= total
            ? "Whole set mastered — Legacy nudges up to the next level."
            : `Next up: ${target.lesson[currentIndex]} — each win unlocks the next step.`}
        </p>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { FAQ } from "@/lib/data";

export default function SpiceGuide() {
  const [active, setActive] = useState<number | null>(null);
  const current = active === null ? null : FAQ[active];

  return (
    <section
      id="ai"
      aria-labelledby="ai-heading"
      className="card p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className="pill bg-teal/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-deep">
          The AI
        </span>
        <span className="pill bg-gold/25 px-3 py-1 text-xs font-bold text-ink">
          AI assistant — demo
        </span>
      </div>

      <h3
        id="ai-heading"
        className="mt-4 font-display text-2xl font-bold text-teal-ink sm:text-3xl"
      >
        AI Spice Guide
      </h3>
      <p className="mt-2 max-w-prose text-sm text-ink-soft sm:text-base">
        A friendly helper for your shop that answers kit questions in your brand
        voice and nudges shoppers to the right curry. Tap a question to see a
        tailored reply.
      </p>

      {/* Chat surface */}
      <div className="mt-6 rounded-2xl bg-cream-soft p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal text-sm font-bold text-paper"
          >
            LB
          </span>
          <p className="rounded-2xl rounded-tl-sm bg-paper px-4 py-3 text-sm text-ink shadow-sm">
            Hi! I&apos;m the Little Big Spice Guide. Ask me anything about our
            Sri Lankan curry kits.
          </p>
        </div>

        {current && (
          <div className="mt-4">
            <div className="flex justify-end">
              <p className="rise-in max-w-[85%] rounded-2xl rounded-tr-sm bg-teal px-4 py-2.5 text-sm font-semibold text-paper">
                {current.chip}
              </p>
            </div>
            <div className="mt-3 flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal text-sm font-bold text-paper"
              >
                LB
              </span>
              <div className="rise-in max-w-[85%] rounded-2xl rounded-tl-sm bg-paper px-4 py-3 text-sm text-ink shadow-sm">
                <p>{current.answer}</p>
                <p className="mt-2 font-semibold text-terracotta">
                  → {current.upsell}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Preset question chips — real buttons */}
      <p className="mt-5 text-xs font-bold uppercase tracking-wider text-ink-soft">
        Try a question
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {FAQ.map((item, i) => (
          <button
            key={item.chip}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            className={`pill border px-4 py-2 text-left text-sm font-semibold transition ${
              active === i
                ? "border-teal bg-teal text-paper"
                : "border-teal/30 bg-paper text-teal-deep hover:border-teal hover:bg-teal/5"
            }`}
          >
            {item.chip}
          </button>
        ))}
      </div>
    </section>
  );
}

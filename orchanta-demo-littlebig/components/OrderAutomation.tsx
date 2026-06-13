"use client";

import { useState } from "react";
import { PIPELINE, SAMPLE_ORDER } from "@/lib/data";

export default function OrderAutomation() {
  const [done, setDone] = useState(false);

  return (
    <section
      id="automation"
      aria-labelledby="automation-heading"
      className="card p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className="pill bg-terracotta/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-terracotta">
          The automation
        </span>
        <span className="pill bg-gold/25 px-3 py-1 text-xs font-bold text-ink">
          Sample data — demo
        </span>
      </div>

      <h3
        id="automation-heading"
        className="mt-4 font-display text-2xl font-bold text-teal-ink sm:text-3xl"
      >
        Order to fulfilment automation
      </h3>
      <p className="mt-2 max-w-prose text-sm text-ink-soft sm:text-base">
        Every new order runs the same tidy pipeline — no copy-pasting between
        the shop, the packing bench and your inbox. Press the button to watch a
        sample order flow through.
      </p>

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,18rem)_1fr]">
        {/* Sample order card */}
        <div className="rounded-2xl bg-cream-soft p-4">
          <div className="flex items-center justify-between">
            <span className="font-display text-base font-bold text-teal-ink">
              Order {SAMPLE_ORDER.id}
            </span>
            <span className="pill bg-teal/10 px-2.5 py-0.5 text-xs font-bold text-teal-deep">
              New
            </span>
          </div>
          <p className="mt-1 text-xs text-ink-soft">
            {SAMPLE_ORDER.customer} · {SAMPLE_ORDER.place}
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-ink">
            {SAMPLE_ORDER.items.map((it) => (
              <li key={it.kit} className="flex justify-between gap-3">
                <span>{it.kit}</span>
                <span className="font-bold text-teal-deep">x{it.qty}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center justify-between border-t border-ink/10 pt-2 text-sm">
            <span className="text-ink-soft">Total</span>
            <span className="font-bold text-ink">{SAMPLE_ORDER.total}</span>
          </div>

          <button
            type="button"
            onClick={() => setDone(true)}
            className="mt-4 w-full rounded-xl bg-teal px-4 py-2.5 text-sm font-bold text-paper transition hover:bg-teal-deep"
          >
            Run automation
          </button>
          {done && (
            <button
              type="button"
              onClick={() => setDone(false)}
              className="mt-2 w-full rounded-xl border border-teal/30 bg-paper px-4 py-2 text-sm font-semibold text-teal-deep transition hover:bg-teal/5"
            >
              Reset
            </button>
          )}
        </div>

        {/* Pipeline */}
        <div>
          <ol className="space-y-2.5">
            {PIPELINE.map((step, i) => (
              <li
                key={step.label}
                className={`flex items-start gap-3 rounded-xl border p-3 transition ${
                  done
                    ? "rise-in border-teal/25 bg-teal/5"
                    : "border-ink/10 bg-paper opacity-70"
                }`}
                style={done ? { animationDelay: `${i * 70}ms` } : undefined}
              >
                <span
                  aria-hidden="true"
                  className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    done
                      ? "bg-teal text-paper"
                      : "bg-ink/10 text-ink-soft"
                  }`}
                >
                  {done ? "✓" : i + 1}
                </span>
                <span>
                  <span className="block text-sm font-bold text-ink">
                    {step.label}
                  </span>
                  <span className="block text-xs text-ink-soft">
                    {done ? step.log : "Waiting…"}
                  </span>
                </span>
              </li>
            ))}
          </ol>

          {done && (
            <p className="rise-in mt-3 rounded-xl bg-gold/25 px-4 py-2.5 text-sm font-bold text-ink">
              Automation complete — every step ran hands-free in seconds.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

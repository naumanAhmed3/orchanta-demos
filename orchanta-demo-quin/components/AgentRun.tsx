"use client";

import { useEffect, useMemo, useState } from "react";
import { TRANSACTIONS, DEMO_USER_ID, formatCents } from "../lib/data";
import { runAgent, type Finding, type ActionDraft } from "../lib/agent";

// The centerpiece: the transaction feed the agent observes, the Run button,
// and the four-step plan rendered as a timeline. Steps reveal one at a time,
// but every output is computed up front by the pure loop in lib/agent.ts —
// the pacing is theater, the results are deterministic.

const PHASE_LABEL = { observe: "1 · observe", detect: "2 · detect", decide: "3 · decide", act: "4 · act" } as const;

export function AgentRun() {
  // The whole run is pure and synchronous; compute it once.
  const steps = useMemo(() => runAgent(TRANSACTIONS), []);
  const [started, setStarted] = useState(false);
  const [revealed, setRevealed] = useState(0);
  const [approved, setApproved] = useState(false);

  // Reveal the next step on a short timer while a run is in flight.
  useEffect(() => {
    if (!started || revealed >= steps.length) return;
    const t = setTimeout(() => setRevealed((r) => r + 1), revealed === 0 ? 400 : 750);
    return () => clearTimeout(t);
  }, [started, revealed, steps.length]);

  const running = started && revealed < steps.length;
  const done = started && revealed >= steps.length;

  const finding = steps[1].output as Finding;
  const draft = steps[3].output as ActionDraft;
  // Once detect has fired, tie the finding back to the feed rows it used.
  const flaggedMerchant = revealed >= 2 ? finding.merchant : null;

  function handleRun() {
    setApproved(false);
    setRevealed(0);
    setStarted(true);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* ---- Transactions feed -------------------------------------- */}
      <section aria-label="Transactions">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="q-eyebrow text-ink">Transactions · sample data</h2>
          <span className="font-mono text-[11px] text-ink-3">user_id = {DEMO_USER_ID}</span>
        </div>
        <ul className="mt-3 overflow-hidden rounded-[6px] border border-line">
          {TRANSACTIONS.map((t) => {
            const flagged = flaggedMerchant === t.merchant;
            return (
              <li
                key={t.id}
                className={`flex items-baseline gap-3 border-b border-line px-3 py-[7px] text-[13px] last:border-b-0 ${
                  flagged ? "bg-amber-50" : "bg-surface"
                }`}
              >
                <span className="q-num w-[78px] shrink-0 font-mono text-[11px] text-ink-3">{t.posted_at}</span>
                <span className="min-w-0 flex-1 truncate text-ink">{t.merchant}</span>
                <span className={`hidden text-[11px] sm:inline ${flagged ? "text-pending" : "text-ink-3"}`}>
                  {flagged ? "⚑ creep" : t.category}
                </span>
                <span className={`q-num w-[88px] shrink-0 text-right font-medium ${t.amount_cents > 0 ? "text-positive" : "text-ink"}`}>
                  {formatCents(t.amount_cents)}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ---- Run control --------------------------------------------- */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={handleRun}
          disabled={running}
          className="rounded-[6px] border border-ink bg-ink px-5 py-2.5 text-[14px] font-medium tracking-[0.02em] text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {running ? "Agent running…" : done ? "Run again" : "Run agent"}
        </button>
        <p className="text-[12.5px] text-ink-2">
          One plan, four steps — each emits a typed contract you can read below.
        </p>
      </div>

      {/* ---- Timeline ------------------------------------------------ */}
      <ol aria-label="Agent plan" className="flex flex-col gap-3">
        {steps.map((step, i) => {
          const isDone = started && i < revealed;
          const isRunning = started && i === revealed && revealed < steps.length;
          const isActStep = step.phase === "act";
          // The act draft flips to approved when the human signs off.
          const output =
            isActStep && approved
              ? { ...draft, status: "approved_by_user", approved_at: "2026-06-12T18:05:00+05:00" }
              : step.output;

          return (
            <li
              key={step.phase}
              className={`rounded-[6px] border bg-surface transition-opacity ${
                isDone ? "border-line-2" : "border-line"
              } ${!started || isDone || isRunning ? "opacity-100" : "opacity-60"}`}
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 px-4 pt-3">
                <span className="q-eyebrow text-ink-2">{PHASE_LABEL[step.phase]}</span>
                <span className="text-[14px] font-medium text-ink">{step.title}</span>
                <span className="ml-auto text-[11px] text-ink-3">
                  {isDone ? (isActStep && !approved ? "⏸ awaiting approval" : "✓ done") : isRunning ? "● running…" : "queued"}
                </span>
              </div>

              {isDone ? (
                <div className="step-in px-4 pb-4">
                  <p className="mt-1 text-[13px] leading-relaxed text-ink-2">{step.summary}</p>
                  <div className="mt-2.5 overflow-hidden rounded-[6px] border border-line">
                    <div className="flex items-center gap-2 border-b border-white/10 bg-navy px-3 py-1.5">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-info" />
                      <span className="font-mono text-[11px] font-medium text-white/85">{step.contractName}</span>
                      <span className="ml-auto font-mono text-[10px] text-white/40">structured output</span>
                    </div>
                    <pre className="q-num m-0 overflow-x-auto bg-navy p-3 font-mono text-[11.5px] leading-[1.55] text-slate-200">
                      {JSON.stringify(output, null, 2)}
                    </pre>
                  </div>

                  {isActStep && (
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      {approved ? (
                        <span className="rounded-[6px] bg-sunken px-3 py-1.5 text-[12.5px] font-medium text-positive">
                          ✓ Approved — demo mode, nothing was sent
                        </span>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => setApproved(true)}
                            className="rounded-[6px] border border-positive px-4 py-2 text-[13px] font-medium text-positive transition-colors hover:bg-emerald-50"
                          >
                            Approve action
                          </button>
                          <span className="text-[12px] text-ink-3">The agent drafts; the human decides.</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="px-4 pb-3" />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

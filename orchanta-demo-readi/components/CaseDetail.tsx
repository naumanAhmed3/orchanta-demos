"use client";

import { cad, fmtDate, type Lender, type TapeRow } from "../lib/data";
import type { ClassifyResult } from "../lib/classify";

export default function CaseDetail({
  lender,
  rows,
  imported,
  classification,
  caseStatus,
  actionApplied,
  onClassify,
  onApply,
}: {
  lender: Lender;
  rows: TapeRow[];
  imported: boolean;
  classification: ClassifyResult | null;
  caseStatus: string;
  actionApplied: boolean;
  onClassify: () => void;
  onApply: () => void;
}) {
  const cf = lender.caseFile;
  const loan = rows.find((r) => r.loan_id === cf.loan_id);

  return (
    <section className="rounded-xl border border-line bg-paper">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line-soft px-4 py-3">
        <div>
          <h2 className="font-display text-[16px] font-semibold text-pine">
            Case detail — NSF collections
          </h2>
          <p className="text-[11.5px] text-mute">
            one open case per the trial scope · borrower reply triaged with structured output
          </p>
        </div>
        {imported && (
          <span
            className={`rounded-full px-2.5 py-1 text-[11.5px] font-semibold ${
              actionApplied ? "bg-ok-soft text-ok" : "bg-bad-soft text-bad"
            }`}
          >
            {caseStatus}
          </span>
        )}
      </div>

      {!imported || !loan ? (
        <p className="px-4 py-6 text-[13px] text-mute">
          Import the loan tape above to open the NSF queue for {lender.name}.
        </p>
      ) : (
        <div className="fade-up grid gap-4 px-4 py-4 md:grid-cols-2">
          {/* Left: loan summary + timeline */}
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-[12px] text-pine">{cf.loan_id}</span>
              <span className="text-[15px] font-semibold">{cf.borrower}</span>
              <span className="rounded bg-warn-soft px-1.5 py-0.5 text-[10px] font-semibold uppercase text-warn">
                fictional
              </span>
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-[12.5px]">
              {[
                ["Principal balance", cad.format(loan.principal_balance)],
                ["Rate (1st mtg)", `${loan.rate.toFixed(2)}%`],
                ["Monthly payment", cad.format(cf.monthly_payment)],
                ["Renewal date", fmtDate(loan.renewal_date)],
                ["Property", `${loan.property_city}, ON`],
                ["Payment status", loan.payment_status],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg bg-sage-soft px-2.5 py-2">
                  <dt className="text-[10.5px] uppercase tracking-wide text-faint">{k}</dt>
                  <dd className="mt-0.5 font-semibold text-ink">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-4 mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-faint">
              Timeline
            </div>
            <ol className="space-y-2 border-l-2 border-sage pl-3">
              {cf.timeline.map((t) => (
                <li key={t.date} className="text-[12.5px]">
                  <span className="font-mono text-[11px] text-faint">{fmtDate(t.date)}</span>
                  <div className="text-ink">{t.label}</div>
                </li>
              ))}
            </ol>
          </div>

          {/* Right: inbound reply + classification */}
          <div>
            <div className="rounded-lg border border-line-soft">
              <div className="border-b border-line-soft bg-sage-soft px-3 py-2 text-[11.5px]">
                <div>
                  <span className="text-faint">From:</span>{" "}
                  <span className="font-mono">{cf.reply.from}</span>
                  <span className="ml-2 text-faint">{fmtDate(cf.reply.received)}</span>
                </div>
                <div className="mt-0.5 font-semibold text-ink">{cf.reply.subject}</div>
              </div>
              <p className="px-3 py-2.5 text-[13px] leading-relaxed text-ink">{cf.reply.body}</p>
            </div>

            <button
              onClick={onClassify}
              className="mt-3 w-full rounded-lg bg-pine px-3.5 py-2 text-[13px] font-semibold text-sage transition-colors hover:bg-pine-2"
            >
              Classify reply
            </button>

            {classification && (
              <div className="fade-up mt-3">
                <div className="mb-1.5 flex items-center justify-between text-[11px]">
                  <span className="font-semibold uppercase tracking-wide text-faint">
                    Structured output
                  </span>
                  <span className="rounded bg-warn-soft px-1.5 py-0.5 font-semibold text-warn">
                    simulated model output (deterministic in demo)
                  </span>
                </div>
                <pre className="scroll-thin overflow-x-auto rounded-lg bg-pine p-3 font-mono text-[11.5px] leading-relaxed text-sage">
                  {JSON.stringify(
                    {
                      intent: classification.intent,
                      amount: classification.amount,
                      date: classification.date,
                      confidence: classification.confidence,
                      next_action: classification.next_action,
                    },
                    null,
                    2,
                  )}
                </pre>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {classification.evidence.map((e) => (
                    <span
                      key={e}
                      className="rounded-full bg-sage px-2 py-0.5 font-mono text-[10.5px] text-pine"
                    >
                      “{e}”
                    </span>
                  ))}
                </div>
                <button
                  onClick={onApply}
                  disabled={actionApplied}
                  className="mt-3 w-full rounded-lg border border-pine px-3.5 py-2 text-[13px] font-semibold text-pine transition-colors hover:bg-sage-soft disabled:cursor-default disabled:border-line disabled:text-faint"
                >
                  {actionApplied
                    ? "Next action applied — status updated"
                    : `Apply next action (${classification.next_action})`}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

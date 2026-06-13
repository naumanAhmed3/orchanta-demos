"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Logo } from "./Logo";
import { taxpayer, taxYear, transactions } from "../lib/data";
import { compute, reviewSteps, homeOfficeSuggestion, gbp } from "../lib/tax";

const STEPS = reviewSteps();

export default function Workspace() {
  const [reviewStarted, setReviewStarted] = useState(false);
  const [revealed, setRevealed] = useState(0);
  const [homeOfficeApplied, setHomeOfficeApplied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const reviewed = reviewStarted && revealed >= STEPS.length;
  const calc = useMemo(() => compute(transactions, homeOfficeApplied), [homeOfficeApplied]);
  const saving = useMemo(() => {
    const before = compute(transactions, false).totalDue;
    const after = compute(transactions, true).totalDue;
    return before - after;
  }, []);

  const startReview = useCallback(() => {
    setReviewStarted(true);
    setRevealed(0);
    STEPS.forEach((_, i) => {
      timers.current.push(setTimeout(() => setRevealed(i + 1), 620 * (i + 1)));
    });
  }, []);

  return (
    <main className="mx-auto w-full max-w-[1180px] px-4 pb-14 sm:px-6">
      {/* top bar */}
      <header className="flex flex-col gap-3 border-b border-line py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="hidden h-5 w-px bg-line sm:block" />
          <span className="hidden text-sm text-mute sm:block">Self Assessment</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-line bg-card px-2.5 py-1 text-[11px] text-mute">{taxpayer.name}</span>
          <span className="rounded-full border border-teal/25 bg-teal-soft px-2.5 py-1 text-[11px] font-medium text-teal">
            Prototype by Orchanta for Record OS
          </span>
        </div>
      </header>

      {/* taxpayer summary */}
      <section className="flex flex-col gap-3 py-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-ink-2">
            {taxpayer.name}
            <span className="ml-2 text-base font-normal text-mute">· {taxYear} return</span>
          </h1>
          <p className="mt-1 text-[13px] text-mute">
            {taxpayer.trade} · {taxpayer.basis} · UTR {taxpayer.utr} · imported from {taxpayer.bank}
          </p>
        </div>
        <StatusChip ready={reviewed} submitted={submitted} />
      </section>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)]">
        {/* transactions */}
        <section className="rounded-2xl border border-line bg-card">
          <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
            <h2 className="text-sm font-semibold text-ink-2">Transactions</h2>
            <span className="text-[12px] text-mute">{transactions.length} imported · {taxYear}</span>
          </div>
          <div className="scroll-thin max-h-[560px] overflow-y-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="sticky top-0 bg-card text-[11px] uppercase tracking-wide text-faint">
                <tr className="border-b border-line-2">
                  <th className="px-5 py-2 font-medium">Date</th>
                  <th className="px-2 py-2 font-medium">Description</th>
                  <th className="px-2 py-2 font-medium">Category</th>
                  <th className="px-5 py-2 text-right font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => {
                  const excluded = t.flag === "disallow";
                  const income = t.type === "income";
                  return (
                    <tr key={t.id} className="border-b border-line-2 last:border-0 align-top">
                      <td className="whitespace-nowrap px-5 py-2.5 text-mute">{t.date}</td>
                      <td className={`px-2 py-2.5 ${excluded ? "text-faint line-through" : "text-ink"}`}>{t.desc}</td>
                      <td className="px-2 py-2.5">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-teal/60" />
                          <span className="text-mute">{t.category}</span>
                          {excluded ? (
                            <span className="ml-1 rounded bg-amber-soft px-1.5 py-0.5 text-[10px] font-medium text-amber">Excluded</span>
                          ) : t.type === "expense" ? (
                            <span className="ml-1 rounded bg-green-soft px-1.5 py-0.5 text-[10px] font-medium text-green">Allowable</span>
                          ) : null}
                        </span>
                      </td>
                      <td className={`whitespace-nowrap px-5 py-2.5 text-right tabular-nums ${income ? "font-medium text-teal" : excluded ? "text-faint line-through" : "text-ink"}`}>
                        {income ? "+" : "−"}{gbp(Math.abs(t.amount))}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* right column: AI review + computation */}
        <div className="flex flex-col gap-5">
          {/* Record AI review */}
          <section className="rounded-2xl border border-line bg-card p-5">
            <div className="mb-3 flex items-center gap-2">
              <span className="grid h-6 w-6 place-items-center rounded-md bg-teal-soft text-teal">
                <span className="h-2.5 w-2.5 rounded-full border-[2px] border-teal" />
              </span>
              <h2 className="text-sm font-semibold text-ink-2">Record AI</h2>
            </div>

            {!reviewStarted ? (
              <>
                <p className="mb-4 text-[13px] leading-relaxed text-mute">
                  Checks every transaction against HMRC rules, categorises your costs, and finds reliefs you have missed — before you file.
                </p>
                <button
                  onClick={startReview}
                  className="inline-flex items-center gap-2 rounded-lg bg-teal px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-teal-2"
                >
                  Review with Record AI <span>→</span>
                </button>
              </>
            ) : (
              <div className="space-y-2.5">
                <ol className="space-y-2">
                  {STEPS.slice(0, revealed).map((s, i) => (
                    <li key={i} className="fade-up flex gap-2 text-[12.5px] leading-relaxed text-ink">
                      <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-teal-soft text-[10px] font-semibold text-teal">{i + 1}</span>
                      <span>{s}</span>
                    </li>
                  ))}
                  {revealed < STEPS.length ? (
                    <li className="pulse pl-6 text-[12.5px] text-mute">reviewing your return…</li>
                  ) : null}
                </ol>

                {reviewed && !homeOfficeApplied ? (
                  <div className="fade-up rounded-xl border border-teal/25 bg-teal-soft/60 p-3.5">
                    <div className="text-[12px] font-semibold text-teal">Relief found · {homeOfficeSuggestion.label}</div>
                    <p className="mt-1 text-[12px] leading-relaxed text-ink">{homeOfficeSuggestion.detail}</p>
                    <button
                      onClick={() => setHomeOfficeApplied(true)}
                      className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-teal px-3 py-1.5 text-[12px] font-semibold text-white transition-colors hover:bg-teal-2"
                    >
                      Apply · claim {gbp(homeOfficeSuggestion.amount)}
                    </button>
                  </div>
                ) : null}

                {homeOfficeApplied ? (
                  <div className="fade-up flex items-center gap-2 rounded-xl border border-green/25 bg-green-soft px-3.5 py-2.5 text-[12.5px] text-green">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-green/15">✓</span>
                    Use-of-home applied — you saved {gbp(saving)} in tax.
                  </div>
                ) : null}
              </div>
            )}
          </section>

          {/* Self Assessment computation */}
          <section className="rounded-2xl border border-line bg-card p-5">
            <h2 className="mb-3 text-sm font-semibold text-ink-2">Self Assessment {taxYear}</h2>
            <dl className="text-[13px]">
              <Row label="Turnover" value={gbp(calc.turnover)} />
              <Row label="Allowable expenses" value={"−" + gbp(calc.allowableExpenses)} muted />
              {calc.homeOffice > 0 ? <Row label="Use of home" value={"−" + gbp(calc.homeOffice)} muted hl /> : null}
              <Row label="Net profit" value={gbp(calc.netProfit)} strong divider />
              <Row label="Personal allowance" value={"−" + gbp(calc.personalAllowance)} muted />
              <Row label="Taxable income" value={gbp(calc.taxableIncome)} divider />
              <Row label="Income tax" value={gbp(calc.incomeTax)} />
              <Row label="Class 4 NIC" value={gbp(calc.class4)} />
              <Row label="Class 2 NIC" value={gbp(calc.class2)} muted />
              <div className="mt-2 flex items-center justify-between rounded-xl bg-teal-soft px-3.5 py-3">
                <span className="text-[13px] font-semibold text-ink-2">Total due to HMRC</span>
                <span className="text-[17px] font-bold tabular-nums text-teal">{gbp(calc.totalDue)}</span>
              </div>
              <p className="mt-1.5 px-1 text-[11px] text-faint">
                Effective rate {(calc.effectiveRate * 100).toFixed(1)}% · payable by 31 Jan 2026
              </p>
            </dl>

            {submitted ? (
              <div className="fade-up mt-4 rounded-xl border border-green/25 bg-green-soft px-3.5 py-3 text-[12.5px] text-green">
                <div className="font-semibold">Submitted to HMRC — sample</div>
                <div className="mt-0.5 text-green/90">Making Tax Digital reference RX-2425-0049182 · receipt sent.</div>
              </div>
            ) : (
              <button
                disabled={!reviewed}
                onClick={() => setSubmitted(true)}
                className={`mt-4 w-full rounded-lg px-4 py-2.5 text-[13px] font-semibold transition-colors ${
                  reviewed ? "bg-ink-2 text-white hover:bg-ink" : "cursor-not-allowed bg-line-2 text-faint"
                }`}
              >
                {reviewed ? "Submit to HMRC · Making Tax Digital" : "Review with Record AI to file"}
              </button>
            )}
          </section>
        </div>
      </div>

      <footer className="pt-6 text-center text-[11px] text-faint">
        Sample data — fictional sole trader. Tailored prototype built by Orchanta to show Record OS the AI-assisted Self Assessment flow.
      </footer>
    </main>
  );
}

function StatusChip({ ready, submitted }: { ready: boolean; submitted: boolean }) {
  const s = submitted
    ? { t: "Filed", c: "border-green/25 bg-green-soft text-green" }
    : ready
      ? { t: "Ready to file", c: "border-teal/25 bg-teal-soft text-teal" }
      : { t: "Draft", c: "border-line bg-card text-mute" };
  return <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12px] font-medium ${s.c}`}>{s.t}</span>;
}

function Row({ label, value, muted, strong, hl, divider }: { label: string; value: string; muted?: boolean; strong?: boolean; hl?: boolean; divider?: boolean }) {
  return (
    <div className={`flex items-center justify-between py-1.5 ${divider ? "mt-1 border-t border-line-2 pt-2.5" : ""}`}>
      <dt className={`${hl ? "text-teal" : muted ? "text-mute" : strong ? "text-ink-2" : "text-ink"} ${strong ? "font-semibold" : ""}`}>{label}</dt>
      <dd className={`tabular-nums ${hl ? "text-teal" : muted ? "text-mute" : "text-ink-2"} ${strong ? "font-semibold" : ""}`}>{value}</dd>
    </div>
  );
}

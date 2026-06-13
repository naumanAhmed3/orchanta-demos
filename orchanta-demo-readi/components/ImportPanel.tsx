"use client";

import { cad, daysFrom, fmtDate, type Lender, type TapeRow } from "../lib/data";
import type { AuditEntry } from "./CopilotApp";

const STATUS_STYLES: Record<TapeRow["payment_status"], string> = {
  current: "bg-ok-soft text-ok",
  late: "bg-warn-soft text-warn",
  NSF: "bg-bad-soft text-bad",
};

export default function ImportPanel({
  lender,
  rows,
  batch,
  asOf,
  imported,
  audit,
  onImport,
}: {
  lender: Lender;
  rows: TapeRow[];
  batch: string;
  asOf: string;
  imported: boolean;
  audit: AuditEntry[];
  onImport: () => void;
}) {
  const nsf = rows.filter((r) => r.payment_status === "NSF").length;
  const renewals = rows.filter((r) => {
    const d = daysFrom(asOf, r.renewal_date);
    return d >= 0 && d <= 60;
  }).length;

  return (
    <section className="rounded-xl border border-line bg-paper">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line-soft px-4 py-3">
        <div>
          <h2 className="font-display text-[16px] font-semibold text-pine">Loan-tape import</h2>
          <p className="text-[11.5px] text-mute">
            CSV servicing tape · idempotent by batch checksum · every run audited
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-sage px-2 py-1 font-mono text-[11px] text-pine">
            batch {batch}
          </span>
          <button
            onClick={onImport}
            className="rounded-lg bg-pine px-3.5 py-2 text-[13px] font-semibold text-sage transition-colors hover:bg-pine-2"
          >
            Import tape
          </button>
        </div>
      </div>

      <div className="px-4 py-3">
        {!imported ? (
          <>
            <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-faint">
              Staged file — {lender.name.toLowerCase().split(" ")[0]}_tape_2026-06-10.csv
            </div>
            <pre className="scroll-thin max-w-full overflow-x-auto rounded-lg bg-sage-soft p-3 font-mono text-[11.5px] leading-relaxed text-ink">
              {lender.csv}
            </pre>
            <p className="mt-2 text-[12px] text-mute">
              Press <span className="font-semibold text-ink">Import tape</span> to parse and load
              the {rows.length} rows above. Run it twice — the second run is a no-op.
            </p>
          </>
        ) : (
          <div className="fade-up">
            <div className="mb-2.5 flex flex-wrap gap-1.5 text-[11.5px] font-semibold">
              <span className="rounded-full bg-sage px-2.5 py-1 text-pine">{rows.length} loans</span>
              <span className="rounded-full bg-bad-soft px-2.5 py-1 text-bad">{nsf} NSF</span>
              <span className="rounded-full bg-warn-soft px-2.5 py-1 text-warn">
                {renewals} renewals ≤ 60 days
              </span>
            </div>
            <div className="scroll-thin overflow-x-auto rounded-lg border border-line-soft">
              <table className="w-full min-w-[640px] border-collapse text-[12.5px]">
                <thead>
                  <tr className="bg-sage-soft text-left text-[11px] uppercase tracking-wide text-mute">
                    <th className="px-3 py-2 font-semibold">Loan</th>
                    <th className="px-3 py-2 font-semibold">Borrower</th>
                    <th className="px-3 py-2 font-semibold">City (ON)</th>
                    <th className="px-3 py-2 text-right font-semibold">Balance</th>
                    <th className="px-3 py-2 text-right font-semibold">Rate</th>
                    <th className="px-3 py-2 font-semibold">Status</th>
                    <th className="px-3 py-2 font-semibold">Renewal</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.loan_id} className="border-t border-line-soft">
                      <td className="px-3 py-2 font-mono text-[11.5px] text-pine">{r.loan_id}</td>
                      <td className="px-3 py-2">{r.borrower}</td>
                      <td className="px-3 py-2 text-mute">{r.property_city}</td>
                      <td className="px-3 py-2 text-right">{cad.format(r.principal_balance)}</td>
                      <td className="px-3 py-2 text-right">{r.rate.toFixed(2)}%</td>
                      <td className="px-3 py-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${STATUS_STYLES[r.payment_status]}`}
                        >
                          {r.payment_status}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-mute">{fmtDate(r.renewal_date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {audit.length > 0 && (
          <div className="mt-3">
            <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-faint">
              Import audit
            </div>
            <ul className="space-y-1.5">
              {audit.map((a) => (
                <li
                  key={a.n}
                  className="fade-up flex flex-wrap items-baseline gap-x-2 rounded-lg bg-sage-soft px-3 py-2 font-mono text-[11.5px]"
                >
                  <span className="text-faint">{a.ts}</span>
                  <span className="font-bold text-pine">import #{a.n}</span>
                  <span className="text-mute">batch {a.batch}</span>
                  <span className="text-mute">actor {a.actor}</span>
                  <span className={a.n === 1 ? "text-ok" : "text-warn"}>{a.result}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

// The centerpiece: 5 fictional orders -> "Kjør MVA-kontroll" runs the pure
// logic in lib/vat.ts and shows, per order, what the manual-collection setup
// records today vs. the correct per-line MVA split — flagging the Shopify
// Collective resold item whose supplier rate leaks through.

import { useState } from "react";
import { ORDERS } from "@/lib/data";
import { checkOrders, fmtMoney, type OrderCheck } from "@/lib/vat";

// Deterministic and pure, so it can be computed once at module load;
// the button only reveals the result columns (like running the real job).
const SUMMARY = checkOrders(ORDERS);

const CLASS_LABEL: Record<string, string> = {
  standard: "25% standard",
  food: "15% næringsmiddel",
  "export-zero": "0% eksport",
};

function RateBadge({ rate, wrong }: { rate: number; wrong?: boolean }) {
  const tone = wrong
    ? "bg-alert-soft text-alert"
    : rate === 0
      ? "bg-vita-soft text-vita"
      : "bg-uno-soft text-uno-deep";
  return (
    <span className={`inline-block rounded px-1.5 py-0.5 text-[11px] font-semibold tnum ${tone}`}>
      {rate}%
    </span>
  );
}

function OrderRow({ check, ran }: { check: OrderCheck; ran: boolean }) {
  const { order } = check;
  return (
    <>
      <tr className="border-t border-line align-top">
        <td className="px-3 py-2.5 font-semibold text-ink tnum whitespace-nowrap">
          {order.id}
          <span className="mt-0.5 block text-[11px] font-normal text-soft">
            {order.b2b ? "B2B" : "B2C"} · {order.currency}
          </span>
        </td>
        <td className="px-3 py-2.5">
          <span className="font-medium text-ink">{order.customer}</span>
          <span className="mt-0.5 block text-[11px] text-mute">{order.destination}</span>
        </td>
        <td className="px-3 py-2.5">
          {check.lines.map((lc) => (
            <div key={lc.line.name} className="mb-1.5 last:mb-0">
              <span className="text-[13px] text-ink-2">
                {lc.line.qty} × {lc.line.name}
              </span>
              <span className="ml-1.5 inline-flex items-center gap-1 align-middle">
                <span className="rounded bg-shell px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-mute">
                  {CLASS_LABEL[lc.line.vatClass]}
                </span>
                {lc.line.channel === "collective" && (
                  <span className="rounded bg-ink px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    Collective
                  </span>
                )}
              </span>
            </div>
          ))}
        </td>
        <td className="px-3 py-2.5 text-right tnum whitespace-nowrap">
          {fmtMoney(check.totalExVat, order.currency)}
        </td>
        {ran ? (
          <>
            <td className="px-3 py-2.5 text-right tnum whitespace-nowrap">
              {check.lines.map((lc) => (
                <div
                  key={lc.line.name}
                  className="mb-1.5 flex items-center justify-end gap-1.5 last:mb-0"
                >
                  <RateBadge rate={lc.manualRate} wrong={lc.mismatch} />
                  <span className={lc.mismatch ? "font-semibold text-alert" : ""}>
                    {fmtMoney(lc.manualVat, order.currency)}
                  </span>
                </div>
              ))}
            </td>
            <td className="px-3 py-2.5 text-right tnum whitespace-nowrap">
              {check.lines.map((lc) => (
                <div
                  key={lc.line.name}
                  className="mb-1.5 flex items-center justify-end gap-1.5 last:mb-0"
                >
                  <RateBadge rate={lc.correctRate} />
                  <span className="font-medium text-ink">
                    {fmtMoney(lc.correctVat, order.currency)}
                  </span>
                </div>
              ))}
            </td>
            <td className="px-3 py-2.5 whitespace-nowrap">
              {check.hasMismatch ? (
                <span className="inline-block rounded-md bg-alert-soft px-2 py-1 text-[11px] font-bold text-alert">
                  Avvik {fmtMoney(check.deltaVat, order.currency)}
                </span>
              ) : (
                <span className="inline-block rounded-md bg-vita-soft px-2 py-1 text-[11px] font-bold text-vita">
                  OK
                </span>
              )}
            </td>
          </>
        ) : (
          <td className="px-3 py-2.5 text-right text-soft" colSpan={3}>
            —
          </td>
        )}
      </tr>
      {ran && check.hasMismatch && (
        <tr className="border-t border-dashed border-line">
          <td
            colSpan={7}
            className="bg-alert-soft/60 px-3 py-2 text-[12px] text-ink-2"
          >
            <strong className="text-alert">Shopify Collective-vare:</strong>{" "}
            partnerbutikkens kolleksjon registrerer 25 %, men «{check.lines[0].line.name}» er et
            næringsmiddel — riktig sats er 15 %. Kunden er overbelastet med{" "}
            <strong className="tnum">{fmtMoney(check.deltaVat, order.currency)}</strong>, og
            MVA-meldingen blir feil.{" "}
            <span className="text-mute">
              (Collective resold item recorded at the supplier&apos;s 25% — correct rate is 15%.)
            </span>
          </td>
        </tr>
      )}
    </>
  );
}

export function VatConsole() {
  const [ran, setRan] = useState(false);

  return (
    <section className="rounded-2xl border border-line bg-paper shadow-sm">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line px-4 py-4 sm:px-5">
        <div>
          <h2 className="font-display text-lg font-extrabold text-ink">
            MVA-kontroll på dagens ordrer
          </h2>
          <p className="mt-0.5 text-[12px] text-mute">
            VAT check across today&apos;s orders — manual collections vs. correct per-line rates
          </p>
        </div>
        <button
          type="button"
          onClick={() => setRan(true)}
          className="rounded-lg bg-uno px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-uno-deep"
        >
          Kjør MVA-kontroll
        </button>
      </div>

      {ran && (
        <div className="fade-up flex flex-wrap items-center gap-2 border-b border-line bg-shell px-4 py-2.5 text-[13px] sm:px-5">
          <span className="rounded-md bg-vita-soft px-2 py-0.5 font-bold text-vita">
            {SUMMARY.okCount} ordrer OK
          </span>
          <span className="rounded-md bg-alert-soft px-2 py-0.5 font-bold text-alert">
            {SUMMARY.mismatchCount} avvik funnet
          </span>
          <span className="text-mute">
            — avviket ligger på Shopify Collective-varen i ordre #30415.
          </span>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-[13px]">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wider text-soft">
              <th className="px-3 pb-2 pt-3 font-semibold">Ordre</th>
              <th className="px-3 pb-2 pt-3 font-semibold">Kunde / destinasjon</th>
              <th className="px-3 pb-2 pt-3 font-semibold">Varelinjer · MVA-klasse</th>
              <th className="px-3 pb-2 pt-3 text-right font-semibold">Sum eks. MVA</th>
              <th className="px-3 pb-2 pt-3 text-right font-semibold">
                Manuelt i dag
                <span className="block normal-case tracking-normal text-soft">
                  collection-sats
                </span>
              </th>
              <th className="px-3 pb-2 pt-3 text-right font-semibold">
                Korrekt MVA
                <span className="block normal-case tracking-normal text-soft">
                  per varelinje
                </span>
              </th>
              <th className="px-3 pb-2 pt-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {SUMMARY.orders.map((check) => (
              <OrderRow key={check.order.id} check={check} ran={ran} />
            ))}
          </tbody>
        </table>
      </div>

      <p className="border-t border-line px-4 py-2.5 text-[11px] text-soft sm:px-5">
        Satser: 25 % standard (helseteknologi) · 15 % næringsmidler (kosttilskudd) · 0 % eksport ut
        av Norge. Alle ordrer er fiktive eksempeldata.
      </p>
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";
import { RECEIPT_ORDER_ID, SAMPLE_ORDERS } from "../lib/data";
import {
  RATE_LABEL,
  fmt,
  fmtDrift,
  lineTotalCents,
  reconcileOrder,
  summarize,
  type Order,
  type Reconciliation,
} from "../lib/reconcile";

/** Tender badge: how the order was paid. */
function TenderBadge({ order }: { order: Order }) {
  const subtotal = order.lines.reduce((s, l) => s + lineTotalCents(l), 0);
  const label =
    order.ebtTenderCents === 0
      ? "Card"
      : order.ebtTenderCents >= subtotal
        ? "SNAP-EBT"
        : "EBT + card";
  const tone =
    order.ebtTenderCents === 0
      ? "bg-cream text-mute"
      : "bg-green-tint text-green-deep";
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${tone}`}>
      {label}
    </span>
  );
}

/** Drift badge: pennies Shopify's refund left on the books. */
function DriftBadge({ cents }: { cents: number }) {
  if (cents === 0) {
    return (
      <span className="inline-block rounded-full bg-green-tint px-2 py-0.5 text-[11px] font-bold text-green-deep">
        0¢ ✓
      </span>
    );
  }
  return (
    <span className="inline-block rounded-full bg-coral-tint px-2 py-0.5 text-[11px] font-bold text-coral">
      {fmtDrift(cents)}
    </span>
  );
}

/** Compliant receipt preview for one reconciled order. */
function ReceiptPreview({ rec }: { rec: Reconciliation }) {
  const { order } = rec;
  return (
    <div className="fade-up rounded-2xl border border-line bg-paper p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[15px] font-bold text-ink">Compliant receipt preview</h3>
        <span className="rounded-full bg-cream px-2.5 py-1 text-[11px] font-semibold text-mute">
          {order.id} · {order.customer}
        </span>
      </div>
      <div className="tabular mt-4 space-y-1.5 border-t border-dashed border-line pt-4 text-[13px]">
        {order.lines.map((line, i) => (
          <div key={line.name} className="flex items-baseline justify-between gap-3">
            <span className="text-ink">
              {line.qty > 1 ? `${line.qty} × ` : ""}
              {line.name}
              {rec.ebtPerLine[i] > 0 && (
                <span className="ml-1.5 rounded bg-green-tint px-1 py-px text-[10px] font-bold text-green-deep">
                  EBT
                </span>
              )}
            </span>
            <span className="text-ink">{fmt(lineTotalCents(line))}</span>
          </div>
        ))}
        <div className="!mt-3 flex justify-between border-t border-dashed border-line pt-3 font-semibold text-ink">
          <span>Subtotal</span>
          <span>{fmt(rec.subtotal)}</span>
        </div>
        <div className="flex justify-between text-green-deep">
          <span>SNAP-EBT paid portion — tax-exempt</span>
          <span>{fmt(rec.ebtExempt)}</span>
        </div>
        <div className="flex justify-between text-mute">
          <span>
            GET {RATE_LABEL} on non-EBT portion ({fmt(rec.taxableBase)})
          </span>
          <span>{fmt(rec.correctTax)}</span>
        </div>
        <div className="!mt-3 flex justify-between border-t border-dashed border-line pt-3 text-[14px] font-bold text-ink">
          <span>Total</span>
          <span>{fmt(rec.total)}</span>
        </div>
        <div className="flex justify-between text-mute">
          <span>Tender — SNAP-EBT</span>
          <span>{fmt(rec.ebtExempt)}</span>
        </div>
        <div className="flex justify-between text-mute">
          <span>Tender — card</span>
          <span>{fmt(rec.cardDue)}</span>
        </div>
      </div>
      <p className="mt-4 border-t border-dashed border-line pt-3 text-[11px] leading-relaxed text-soft">
        EBT-paid items are exempt from sales tax under federal SNAP law; GET is charged on the
        non-EBT portion only. Receipt mirrors the corrected books — sample data.
      </p>
    </div>
  );
}

export default function Reconciler() {
  const [reconciled, setReconciled] = useState(false);

  // Deterministic: same inputs, same pennies, every run.
  const results = useMemo(() => SAMPLE_ORDERS.map(reconcileOrder), []);
  const summary = useMemo(() => summarize(results), [results]);
  const receiptRec = results.find((r) => r.order.id === RECEIPT_ORDER_ID) ?? results[0];

  return (
    <div>
      {/* Orders table */}
      <div className="rounded-2xl border border-line bg-paper p-2 sm:p-3">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-[13px]">
            <thead>
              <tr className="border-b border-line text-[11px] uppercase tracking-[0.08em] text-soft">
                <th className="px-3 py-2.5 font-semibold">Order</th>
                <th className="px-3 py-2.5 font-semibold">Tender</th>
                <th className="px-3 py-2.5 text-right font-semibold">Subtotal</th>
                <th className="px-3 py-2.5 text-right font-semibold">GET recorded</th>
                {reconciled && (
                  <>
                    <th className="px-3 py-2.5 text-right font-semibold">Refund issued</th>
                    <th className="px-3 py-2.5 text-right font-semibold">Tax left (Shopify)</th>
                    <th className="px-3 py-2.5 text-right font-semibold text-green-deep">
                      Correct tax
                    </th>
                    <th className="px-3 py-2.5 text-right font-semibold">Drift</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="tabular">
              {results.map((rec) => (
                <tr key={rec.order.id} className="border-b border-line last:border-b-0">
                  <td className="px-3 py-3">
                    <div className="font-bold text-ink">{rec.order.id}</div>
                    <div className="text-[12px] text-mute">
                      {rec.order.customer} · {rec.order.lines.length} items
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <TenderBadge order={rec.order} />
                  </td>
                  <td className="px-3 py-3 text-right text-ink">{fmt(rec.subtotal)}</td>
                  <td className="px-3 py-3 text-right text-mute">{fmt(rec.shopifyRecordedTax)}</td>
                  {reconciled && (
                    <>
                      <td className="fade-up px-3 py-3 text-right text-mute">
                        −{fmt(rec.shopifyRefund)}
                      </td>
                      <td
                        className={`fade-up px-3 py-3 text-right font-semibold ${
                          rec.driftCents !== 0 ? "text-coral" : "text-mute"
                        }`}
                      >
                        {fmt(rec.shopifyNetTax)}
                      </td>
                      <td className="fade-up px-3 py-3 text-right font-bold text-green-deep">
                        {fmt(rec.correctTax)}
                      </td>
                      <td className="fade-up px-3 py-3 text-right">
                        <DriftBadge cents={rec.driftCents} />
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action / hint row */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        {!reconciled ? (
          <>
            <button
              type="button"
              onClick={() => setReconciled(true)}
              className="rounded-full bg-sun px-6 py-3 text-[14px] font-bold text-ink transition-colors hover:bg-sun-deep"
            >
              Reconcile orders
            </button>
            <span className="text-[12px] text-mute">
              Recomputes each exemption to the penny and flags Shopify’s rounding drift.
            </span>
          </>
        ) : (
          <span className="rounded-full bg-green-tint px-4 py-2 text-[13px] font-semibold text-green-deep">
            Reconciled — {summary.orderCount} orders checked, exemptions exact to the penny.
          </span>
        )}
      </div>

      {/* Results: summary strip + receipt preview */}
      {reconciled && (
        <div className="mt-6 space-y-6">
          <div className="fade-up grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-line bg-paper p-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-soft">
                Total drift caught
              </div>
              <div className="mt-1 text-[26px] font-bold text-coral">
                {fmt(summary.totalDriftCents)}
              </div>
              <div className="mt-1 text-[12px] text-mute">
                {summary.totalDriftCents}¢ of mis-rounded tax across {summary.ordersWithDrift} of{" "}
                {summary.orderCount} orders — corrected.
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-paper p-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-soft">
                Orders compliant
              </div>
              <div className="mt-1 text-[26px] font-bold text-green">
                {summary.ordersCompliant} / {summary.orderCount}
              </div>
              <div className="mt-1 text-[12px] text-mute">
                Every EBT exemption exact; receipts match the books.
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-paper p-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-soft">
                Audit export
              </div>
              <div className="mt-1 text-[26px] font-bold text-ink">CSV</div>
              <div className="mt-1 text-[12px] text-mute">
                One-click export of corrected figures for GET filing — demo hint.
              </div>
            </div>
          </div>

          <ReceiptPreview rec={receiptRec} />
        </div>
      )}
    </div>
  );
}

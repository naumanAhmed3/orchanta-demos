"use client";

// EHF / Tripletex panel: for ONE order (#30412, mixed 25% + 15%) we render a
// mock EHF-invoice summary built from the same pure lib/vat.ts figures, and a
// simulated "sync to Tripletex" success state with an audit entry.
// Everything here is clearly labeled SIMULERT — nothing is sent anywhere.

import { useState } from "react";
import { EHF_META, EHF_ORDER_ID, ORDERS } from "@/lib/data";
import { checkOrder, fmtMoney } from "@/lib/vat";

// Deterministic: the EHF summary is derived once from the example order.
const ORDER = ORDERS.find((o) => o.id === EHF_ORDER_ID)!;
const CHECK = checkOrder(ORDER);

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] font-semibold uppercase tracking-wider text-soft">
        {label}
      </dt>
      <dd className="mt-0.5 text-[13px] font-medium text-ink">{value}</dd>
    </div>
  );
}

export function EhfPanel() {
  const [synced, setSynced] = useState(false);

  return (
    <section className="rounded-2xl border border-line bg-paper shadow-sm">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line px-4 py-4 sm:px-5">
        <div>
          <h2 className="font-display text-lg font-extrabold text-ink">
            EHF-faktura og Tripletex-bilag
          </h2>
          <p className="mt-0.5 text-[12px] text-mute">
            EHF invoice &amp; accounting voucher for order {ORDER.id} — generated from the same
            per-line MVA split
          </p>
        </div>
        <span className="rounded-md border border-line bg-shell px-2 py-1 text-[11px] font-semibold text-mute">
          Simulert — ingen data sendes
        </span>
      </div>

      <div className="grid gap-0 lg:grid-cols-2">
        {/* Left: the mock EHF invoice summary */}
        <div className="border-b border-line p-4 sm:p-5 lg:border-b-0 lg:border-r">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-uno-deep">
            {EHF_META.standard}
          </p>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
            <Field label="Fakturanr." value={EHF_META.invoiceNo} />
            <Field label="Ordre" value={ORDER.id} />
            <Field label="Fakturadato" value={EHF_META.issueDate} />
            <Field label="Forfall" value={EHF_META.dueDate} />
            <Field label="Selger" value={EHF_META.seller} />
            <Field label="Org.nr. (fiktivt)" value={EHF_META.sellerOrgNr} />
            <Field label="Kjøper" value={`${ORDER.customer}, ${ORDER.destination}`} />
            <Field label="Valuta" value={ORDER.currency} />
          </dl>

          <table className="tnum mt-4 w-full border-collapse text-[13px]">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-wider text-soft">
                <th className="border-b border-line pb-1.5 font-semibold">MVA-sats</th>
                <th className="border-b border-line pb-1.5 text-right font-semibold">
                  Grunnlag
                </th>
                <th className="border-b border-line pb-1.5 text-right font-semibold">
                  MVA
                </th>
              </tr>
            </thead>
            <tbody>
              {CHECK.correctBuckets.map((b) => (
                <tr key={b.rate}>
                  <td className="py-1.5 font-medium text-ink">{b.rate} %</td>
                  <td className="py-1.5 text-right">{fmtMoney(b.base, ORDER.currency)}</td>
                  <td className="py-1.5 text-right">{fmtMoney(b.vat, ORDER.currency)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-line font-bold text-ink">
                <td className="pt-2">Sum</td>
                <td className="pt-2 text-right">{fmtMoney(CHECK.totalExVat, ORDER.currency)}</td>
                <td className="pt-2 text-right">{fmtMoney(CHECK.correctVatTotal, ORDER.currency)}</td>
              </tr>
              <tr className="text-ink">
                <td className="pt-1 font-bold" colSpan={2}>
                  Å betale inkl. MVA
                </td>
                <td className="pt-1 text-right font-extrabold text-uno-deep">
                  {fmtMoney(CHECK.totalIncVat, ORDER.currency)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Right: the simulated Tripletex sync */}
        <div className="p-4 sm:p-5">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-soft">
            Regnskap · Tripletex
            <span className="ml-1.5 font-medium normal-case tracking-normal">
              (accounting sync, simulated)
            </span>
          </p>

          {synced ? (
            <div className="fade-up">
              <div className="flex items-center gap-2.5 rounded-xl border border-vita bg-vita-soft px-3.5 py-3">
                <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
                  <circle cx="11" cy="11" r="11" fill="var(--color-vita)" />
                  <path
                    d="M6.5 11.5 L9.5 14.5 L15.5 8"
                    stroke="#fff"
                    strokeWidth="2.2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <p className="text-sm font-bold text-vita">
                    Bilag opprettet i Tripletex (simulert)
                  </p>
                  <p className="text-[12px] text-ink-2">
                    {EHF_META.tripletexVoucher} · EHF sendt via aksesspunkt — simulert, ingen
                    reell overføring.
                  </p>
                </div>
              </div>

              <p className="mb-1.5 mt-4 text-[10px] font-semibold uppercase tracking-wider text-soft">
                Revisjonslogg · Audit log
              </p>
              <ul className="space-y-1.5 text-[12px]">
                <li className="flex items-start gap-2 rounded-lg bg-shell px-3 py-2">
                  <span className="tnum whitespace-nowrap font-semibold text-mute">
                    {EHF_META.syncedAtLabel}
                  </span>
                  <span className="text-ink-2">
                    Ordre {ORDER.id} → {EHF_META.invoiceNo} bokført som{" "}
                    {EHF_META.tripletexVoucher} ({EHF_META.tripletexLedger}). MVA-linjer: 25 % og
                    15 % — kilde: MVA-kontrollen over.
                  </span>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <p className="text-[13px] leading-relaxed text-ink-2">
                Når MVA-splitten per linje er riktig, kan hvert salg bokføres automatisk:
                EHF-faktura ut til bedriftskunder, og et ferdig bilag med riktige MVA-koder i
                Tripletex — uten manuell punching.
              </p>
              <p className="mt-1.5 text-[11px] text-mute">
                With the per-line split correct, every sale can post itself: EHF out, voucher into
                Tripletex.
              </p>
              <button
                type="button"
                onClick={() => setSynced(true)}
                className="mt-4 rounded-lg border-2 border-uno px-4 py-2 text-sm font-bold text-uno-deep transition-colors hover:bg-uno-soft"
              >
                Synkroniser til Tripletex (simulert)
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

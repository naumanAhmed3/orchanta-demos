"use client";

// Profit-per-order dashboard: summary strip + the six-order table.
// Clicking (or pressing Enter/Space on) a row expands its full P&L card.
// All numbers come from lib/data.ts — pure, deterministic sample data.

import { useState } from "react";
import { ORDERS, SUMMARY, usd, pct, type OrderPnl } from "../lib/data";

const BAND_STYLE: Record<
  OrderPnl["band"],
  { label: string; text: string; chip: string; dot: string }
> = {
  healthy: {
    label: "Healthy",
    text: "text-green-deep",
    chip: "bg-green-soft text-green-deep",
    dot: "bg-green",
  },
  thin: {
    label: "Thin",
    text: "text-gold-deep",
    chip: "bg-gold-soft text-gold-deep",
    dot: "bg-gold",
  },
  loss: {
    label: "Loss",
    text: "text-red",
    chip: "bg-red-soft text-red",
    dot: "bg-red",
  },
};

export default function ProfitDashboard() {
  const [openId, setOpenId] = useState<string | null>(null);
  const toggle = (id: string) => setOpenId((cur) => (cur === id ? null : id));

  return (
    <div>
      {/* ---- Summary strip ---- */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <SummaryCard
          label="Blended net margin"
          value={pct(SUMMARY.blendedMarginPct)}
          sub={`${usd(SUMMARY.totalNet)} net on ${usd(SUMMARY.totalRevenue)} across 6 orders`}
        />
        <SummaryCard
          label="Best order"
          value={`${SUMMARY.best.id} · ${pct(SUMMARY.best.marginPct)}`}
          sub={`${usd(SUMMARY.best.netProfit)} net — ${SUMMARY.best.channel}`}
          accent="text-green-deep"
        />
        <SummaryCard
          label="Worst order"
          value={`${SUMMARY.worst.id} · ${pct(SUMMARY.worst.marginPct)}`}
          sub={`${usd(SUMMARY.worst.netProfit)} net — free shipping on a heavy box`}
          accent="text-red"
        />
      </div>
      <p className="mt-3 text-[12px] leading-relaxed text-mute">
        Ad spend is allocated per order by last-click channel (
        {usd(SUMMARY.totalAdSpend)} total here); owned channels like email
        carry $0. Transaction fees use an illustrative 2.9% + 30¢ card rate.
      </p>

      {/* ---- Orders table ---- */}
      <div className="scroll-thin mt-5 overflow-x-auto rounded-xl border border-line bg-paper">
        <table className="w-full min-w-[760px] border-collapse text-[13.5px]">
          <thead>
            <tr className="border-b border-line bg-cream text-left text-[11px] uppercase tracking-[0.12em] text-mute">
              <th className="px-4 py-3 font-semibold">Order</th>
              <th className="px-3 py-3 font-semibold">Basket</th>
              <th className="px-3 py-3 text-right font-semibold">Revenue</th>
              <th className="px-3 py-3 text-right font-semibold">COGS</th>
              <th className="px-3 py-3 text-right font-semibold">Shipping</th>
              <th className="px-3 py-3 text-right font-semibold">Fees</th>
              <th className="px-3 py-3 text-right font-semibold">Ad spend</th>
              <th className="px-3 py-3 text-right font-semibold">Net profit</th>
              <th className="px-4 py-3 text-right font-semibold">Margin</th>
            </tr>
          </thead>
          <tbody>
            {ORDERS.map((o) => (
              <OrderRow
                key={o.id}
                order={o}
                open={openId === o.id}
                onToggle={() => toggle(o.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[12px] text-mute">
        Click any order to see its full P&amp;L breakdown. Sample orders built
        from real Tita Italia categories — all figures illustrative.
      </p>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  sub,
  accent = "text-ink",
}: {
  label: string;
  value: string;
  sub: string;
  accent?: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-paper px-4 py-3.5">
      <div className="text-[11px] uppercase tracking-[0.14em] text-mute">
        {label}
      </div>
      <div className={`tabular mt-1 text-[22px] font-extrabold ${accent}`}>
        {value}
      </div>
      <div className="mt-0.5 text-[12px] text-mute">{sub}</div>
    </div>
  );
}

function OrderRow({
  order: o,
  open,
  onToggle,
}: {
  order: OrderPnl;
  open: boolean;
  onToggle: () => void;
}) {
  const band = BAND_STYLE[o.band];
  const basket = o.items
    .map((it) => (it.qty > 1 ? `${it.qty}× ${it.category}` : it.category))
    .join(", ");

  return (
    <>
      <tr
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
        className={`cursor-pointer border-b border-line transition-colors hover:bg-cream focus:outline-none focus-visible:bg-cream ${
          open ? "bg-cream" : ""
        }`}
      >
        <td className="whitespace-nowrap px-4 py-3 font-bold text-ink">
          <span
            className={`mr-2 inline-block h-2 w-2 rounded-full align-middle ${band.dot}`}
          />
          <button
            type="button"
            aria-expanded={open}
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            className="cursor-pointer font-bold text-ink focus:outline-none"
          >
            {o.id}
          </button>
          <span className="ml-2 font-normal text-mute">{o.date}</span>
        </td>
        <td className="max-w-[230px] px-3 py-3 text-mute">{basket}</td>
        <td className="tabular px-3 py-3 text-right">{usd(o.revenue)}</td>
        <td className="tabular px-3 py-3 text-right text-mute">
          −{usd(o.cogs).slice(1)}
        </td>
        <td className="tabular px-3 py-3 text-right text-mute">
          −{usd(o.carrierCost).slice(1)}
        </td>
        <td className="tabular px-3 py-3 text-right text-mute">
          −{usd(o.fees).slice(1)}
        </td>
        <td className="tabular px-3 py-3 text-right text-mute">
          {o.adSpend === 0 ? "$0.00" : `−${usd(o.adSpend).slice(1)}`}
        </td>
        <td className={`tabular px-3 py-3 text-right font-bold ${band.text}`}>
          {usd(o.netProfit)}
        </td>
        <td className="px-4 py-3 text-right">
          <span
            className={`tabular inline-block rounded-full px-2 py-0.5 text-[12px] font-bold ${band.chip}`}
          >
            {pct(o.marginPct)}
          </span>
        </td>
      </tr>
      {open && (
        <tr className="border-b border-line">
          <td colSpan={9} className="bg-cream px-4 py-4 sm:px-6">
            <Breakdown order={o} />
          </td>
        </tr>
      )}
    </>
  );
}

function Breakdown({ order: o }: { order: OrderPnl }) {
  const band = BAND_STYLE[o.band];
  return (
    <div className="fade-up rounded-xl border border-line bg-paper p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-[16px] font-bold tracking-wide text-ink">
          {o.id} — per-order P&amp;L breakdown
        </h3>
        <span
          className={`rounded-full px-2.5 py-0.5 text-[12px] font-bold ${band.chip}`}
        >
          {band.label} · {pct(o.marginPct)} net margin
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Line items */}
        <div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-mute">
            Items ({o.weightLb.toFixed(1)} lb box
            {o.coldChain ? ", cold chain" : ""})
          </div>
          <ul className="mt-2 space-y-1.5 text-[13px]">
            {o.items.map((it) => (
              <li
                key={`${o.id}-${it.category}-${it.label}`}
                className="flex justify-between gap-3"
              >
                <span>
                  <span className="font-semibold text-ink">
                    {it.qty}× {it.category}
                  </span>{" "}
                  <span className="text-mute">— {it.label}</span>
                </span>
                <span className="tabular whitespace-nowrap text-mute">
                  {usd(it.qty * it.unitPrice)}
                  <span className="ml-1 text-[11.5px]">
                    (cost {usd(it.qty * it.unitCogs)})
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[12.5px] leading-relaxed text-mute">
            {o.shippingCharged === 0 ? (
              <>
                Subtotal {usd(o.subtotal)} cleared the{" "}
                <span className="font-semibold text-ink">
                  free-shipping threshold (${o.freeShipThreshold})
                </span>
                , so the customer paid $0 shipping — the carrier cost below is
                absorbed.
              </>
            ) : (
              <>
                Subtotal {usd(o.subtotal)} is under the $
                {o.freeShipThreshold} threshold, so the customer paid{" "}
                {usd(o.shippingCharged)} shipping.
              </>
            )}
          </p>
        </div>

        {/* Waterfall */}
        <div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-mute">
            Revenue → net profit
          </div>
          <dl className="mt-2 space-y-1.5 text-[13px]">
            <PnlLine label={`Revenue (incl. ${usd(o.shippingCharged)} shipping charged)`} value={usd(o.revenue)} strong />
            <PnlLine label="Product costs (COGS)" value={`−${usd(o.cogs).slice(1)}`} />
            <PnlLine label="Carrier shipping cost" value={`−${usd(o.carrierCost).slice(1)}`} />
            <PnlLine label="Transaction fee (2.9% + 30¢, illustrative)" value={`−${usd(o.fees).slice(1)}`} />
            <PnlLine
              label={`Allocated ad spend — ${o.channel}`}
              value={o.adSpend === 0 ? "$0.00" : `−${usd(o.adSpend).slice(1)}`}
            />
            <div className="border-t border-line pt-1.5">
              <PnlLine
                label="Net profit"
                value={usd(o.netProfit)}
                strong
                valueClass={band.text}
              />
            </div>
          </dl>
          {o.note && (
            <p
              className={`mt-3 rounded-lg px-3 py-2 text-[12.5px] leading-relaxed ${
                o.band === "loss"
                  ? "bg-red-soft text-red"
                  : "bg-gold-soft text-gold-deep"
              }`}
            >
              {o.note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function PnlLine({
  label,
  value,
  strong = false,
  valueClass = "text-ink",
}: {
  label: string;
  value: string;
  strong?: boolean;
  valueClass?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className={strong ? "font-semibold text-ink" : "text-mute"}>
        {label}
      </dt>
      <dd
        className={`tabular whitespace-nowrap ${
          strong ? `font-extrabold ${valueClass}` : "text-ink"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

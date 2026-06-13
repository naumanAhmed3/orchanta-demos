"use client";

import { useMemo, useState } from "react";
import { PRODUCTS } from "@/lib/data";
import { DIM_DIVISOR, cubicIn, dimsLabel, estimate, usd } from "@/lib/boxfit";

const MAX_ITEMS = 4;

/** Box-Fit & Rate Estimator: pick items, see cartons, weights, and rates. */
export default function Estimator() {
  // Start with the store's bread-and-butter case: one big, light spinner.
  const [selected, setSelected] = useState<string[]>(["platinum-elite-25"]);

  const order = useMemo(
    () => estimate(PRODUCTS.filter((p) => selected.includes(p.id))),
    [selected],
  );

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < MAX_ITEMS
          ? [...prev, id]
          : prev,
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[5fr_4fr]">
      {/* ---------------- Catalog picker ---------------- */}
      <section aria-label="Order items">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-lg font-bold text-deep">Build a test order</h2>
          <p className="text-sm text-mute tnum">
            {selected.length} of {MAX_ITEMS} items
          </p>
        </div>
        <p className="mt-1 text-sm text-mute">
          Pick up to {MAX_ITEMS} items. Ship dims are typical published specs —
          illustrative for this demo.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {PRODUCTS.map((p) => {
            const active = selected.includes(p.id);
            const full = !active && selected.length >= MAX_ITEMS;
            return (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => toggle(p.id)}
                  aria-pressed={active}
                  disabled={full}
                  className={`w-full rounded-lg border p-3 text-left transition-colors ${
                    active
                      ? "border-brand-navy bg-sky-soft"
                      : "border-line bg-paper hover:border-sky"
                  } ${full ? "opacity-45" : "cursor-pointer"}`}
                >
                  <span className="flex items-start justify-between gap-2">
                    <span className="text-sm font-bold leading-snug text-ink">
                      {p.name}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border text-[10px] font-bold ${
                        active
                          ? "border-brand-navy bg-brand-navy text-paper"
                          : "border-line text-transparent"
                      }`}
                    >
                      ✓
                    </span>
                  </span>
                  <span className="mt-1 block text-xs text-mute">{p.brand}</span>
                  <span className="mt-2 block text-xs text-deep tnum">
                    {dimsLabel(p.dims)} · {p.weightLb} lb ·{" "}
                    {cubicIn(p.dims).toLocaleString("en-US")} in³
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ---------------- Results ---------------- */}
      <section aria-label="Shipping estimate" className="flex flex-col gap-4">
        {order.items.length === 0 ? (
          <div className="rounded-lg border border-dashed border-line bg-panel p-6 text-sm text-mute">
            Select at least one item to size the order.
          </div>
        ) : (
          <>
            {/* Per-item dims + cubic total */}
            <div className="rounded-lg border border-line bg-paper p-4">
              <h2 className="text-sm font-bold uppercase tracking-wide text-mute">
                Total cubic inches
              </h2>
              <p className="mt-1 text-4xl font-bold text-brand-navy tnum">
                {order.totalCubicIn.toLocaleString("en-US")}
                <span className="ml-1 text-base font-medium text-mute">in³</span>
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {order.items.map((p) => (
                  <li
                    key={p.id}
                    className="rounded-full bg-sky-soft px-3 py-1 text-xs text-deep tnum"
                  >
                    {p.name.split(" ").slice(0, 3).join(" ")} · {dimsLabel(p.dims)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Box fit + billable weight per carton */}
            {order.boxes.map((b, i) => (
              <div key={i} className="rounded-lg border border-line bg-paper p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-sm font-bold text-deep">
                    {order.boxes.length > 1 ? `Box ${i + 1}: ` : "Best-fit box: "}
                    {b.box.name}
                  </h3>
                  <span className="text-xs text-mute tnum">{dimsLabel(b.box.dims)}</span>
                </div>

                {/* Fill bar */}
                <div
                  role="img"
                  aria-label={`Carton ${b.fillPct}% full`}
                  className="mt-3 h-3 w-full overflow-hidden rounded-full bg-panel"
                >
                  <div
                    className="h-full rounded-full bg-action"
                    style={{ width: `${Math.min(b.fillPct, 100)}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-mute tnum">
                  {b.usedCubicIn.toLocaleString("en-US")} in³ packed · {b.fillPct}% of
                  carton volume
                </p>

                {/* Dimensional vs actual */}
                <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div
                    className={`rounded-md border p-2 ${
                      b.billedBy === "actual"
                        ? "border-brand-red bg-brand-red/5"
                        : "border-line"
                    }`}
                  >
                    <dt className="text-xs text-mute">Actual weight</dt>
                    <dd className="font-bold text-ink tnum">{b.actualLb} lb</dd>
                  </div>
                  <div
                    className={`rounded-md border p-2 ${
                      b.billedBy === "dimensional"
                        ? "border-brand-red bg-brand-red/5"
                        : "border-line"
                    }`}
                  >
                    <dt className="text-xs text-mute">
                      Dim weight (÷{DIM_DIVISOR})
                    </dt>
                    <dd className="font-bold text-ink tnum">{b.dimLb} lb</dd>
                  </div>
                </dl>
                <p className="mt-2 text-sm">
                  Carrier bills{" "}
                  <strong className="text-brand-red">
                    {b.billableLb} lb {b.billedBy}
                  </strong>{" "}
                  — {b.billedBy === "dimensional"
                    ? "big-but-light luggage pays for the space it takes."
                    : "the contents outweigh the carton volume here."}
                </p>
              </div>
            ))}

            {/* Packing plan */}
            <div className="rounded-lg border border-brand-navy bg-sky-soft p-4">
              <h3 className="text-sm font-bold text-brand-navy">Order packing plan</h3>
              {order.boxes.length === 1 ? (
                <p className="mt-1 text-sm text-ink">
                  Everything ships together in one {order.boxes[0].box.name}.
                </p>
              ) : (
                <ol className="mt-2 grid gap-2">
                  {order.boxes.map((b, i) => (
                    <li key={i} className="text-sm text-ink">
                      <span className="font-bold">
                        Box {i + 1} — {b.box.name}:
                      </span>{" "}
                      {b.items.map((p) => p.name).join(" + ")}
                    </li>
                  ))}
                </ol>
              )}
            </div>

            {/* Zone rates */}
            <div className="rounded-lg border border-line bg-paper p-4">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-sm font-bold text-deep">
                  Estimated rate by zone
                </h3>
                <span className="rounded-full bg-panel px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-mute">
                  Illustrative rates
                </span>
              </div>
              <table className="mt-3 w-full text-sm">
                <thead>
                  <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-mute">
                    <th className="py-1.5 font-medium">Zone</th>
                    <th className="py-1.5 font-medium">Example</th>
                    <th className="py-1.5 text-right font-medium">Order rate</th>
                  </tr>
                </thead>
                <tbody>
                  {order.quotes.map((q) => (
                    <tr key={q.zone.id} className="border-b border-line last:border-0">
                      <td className="py-1.5 font-bold text-ink">{q.zone.name}</td>
                      <td className="py-1.5 text-mute">{q.zone.example}</td>
                      <td className="py-1.5 text-right font-bold text-brand-navy tnum">
                        {usd(q.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-2 text-xs text-mute">
                From New Berlin, WI 53151 · billed on{" "}
                {order.boxes.reduce((s, b) => s + b.billableLb, 0)} lb across{" "}
                {order.boxes.length} carton{order.boxes.length === 1 ? "" : "s"} ·
                demo rate card, not a carrier quote.
              </p>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

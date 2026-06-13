"use client";

import { useMemo, useState } from "react";
import { CATALOG, type Product } from "@/lib/data";

type Basket = Record<string, number>;

function ProductCard({
  product,
  qty,
  onAdd,
  onInc,
  onDec,
}: {
  product: Product;
  qty: number;
  onAdd: () => void;
  onInc: () => void;
  onDec: () => void;
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-line bg-white shadow-sm transition hover:shadow-md">
      <div className={`swatch ${product.swatch} h-28 w-full`} aria-hidden />
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-center justify-between gap-2">
          <span className="rounded-full bg-paper px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand">
            {product.category}
          </span>
          <span className="text-[11px] font-semibold text-ink-soft">{product.weave}</span>
        </div>
        <h3 className="text-base font-semibold text-ink">{product.name}</h3>
        <p className="mt-1 text-sm text-ink-soft">{product.blurb}</p>

        <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[12px]">
          <Spec label="Weight" value={product.gsm} />
          <Spec label="Size" value={product.size} />
          <Spec label="Material" value={product.material} />
          <Spec label="MOQ" value={product.moq} />
        </dl>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.colors.map((c) => (
            <span
              key={c}
              className="rounded border border-line px-1.5 py-0.5 text-[11px] text-ink-soft"
            >
              {c}
            </span>
          ))}
        </div>

        <div className="mt-4 flex-1" />
        {qty > 0 ? (
          <div className="flex items-center justify-between rounded-lg border border-brand/30 bg-brand/5 p-1.5">
            <span className="pl-1.5 text-sm font-medium text-brand">In quote</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={onDec}
                aria-label={`Reduce ${product.name} quantity`}
                className="grid h-7 w-7 place-items-center rounded-md bg-white text-ink shadow-sm ring-1 ring-line transition hover:bg-paper"
              >
                –
              </button>
              <span className="min-w-7 text-center text-sm font-semibold tabular-nums text-ink">
                {qty}
              </span>
              <button
                type="button"
                onClick={onInc}
                aria-label={`Increase ${product.name} quantity`}
                className="grid h-7 w-7 place-items-center rounded-md bg-brand text-white shadow-sm transition hover:bg-brand-600"
              >
                +
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={onAdd}
            className="w-full rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600"
          >
            Add to quote
          </button>
        )}
      </div>
    </article>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-wide text-ink-soft/70">{label}</dt>
      <dd className="font-medium text-ink">{value}</dd>
    </div>
  );
}

export default function CatalogQuote() {
  const [basket, setBasket] = useState<Basket>({});
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const lines = useMemo(
    () =>
      CATALOG.filter((p) => (basket[p.id] ?? 0) > 0).map((p) => ({
        product: p,
        qty: basket[p.id],
      })),
    [basket],
  );
  const totalUnits = lines.reduce((sum, l) => sum + l.qty, 0);

  const add = (id: string) => setBasket((b) => ({ ...b, [id]: (b[id] ?? 0) + 1 }));
  const dec = (id: string) =>
    setBasket((b) => {
      const next = (b[id] ?? 0) - 1;
      const copy = { ...b };
      if (next <= 0) delete copy[id];
      else copy[id] = next;
      return copy;
    });

  const openQuote = () => {
    setSent(false);
    setOpen(true);
  };
  const closeQuote = () => setOpen(false);

  return (
    <section id="catalog" className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
      <div className="mb-8 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
          Sample export catalog
        </p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
          Pick your items, build a quote in minutes
        </h2>
        <p className="mt-2 text-ink-soft">
          Eight representative SKUs with the export specs buyers ask for first — GSM,
          dimensions, composition and MOQ. Add what you need and request a quote.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {CATALOG.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            qty={basket[p.id] ?? 0}
            onAdd={() => add(p.id)}
            onInc={() => add(p.id)}
            onDec={() => dec(p.id)}
          />
        ))}
      </div>

      {/* Sticky quote bar */}
      <div className="sticky bottom-4 z-30 mt-8 flex items-center justify-between gap-3 rounded-xl border border-line bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
        <div className="text-sm">
          <span className="font-semibold text-ink">{lines.length}</span>
          <span className="text-ink-soft"> item{lines.length === 1 ? "" : "s"} · </span>
          <span className="font-semibold text-ink tabular-nums">{totalUnits}</span>
          <span className="text-ink-soft"> unit{totalUnits === 1 ? "" : "s"} in quote</span>
        </div>
        <button
          type="button"
          onClick={openQuote}
          className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-95"
        >
          Request quote
        </button>
      </div>

      {open && (
        <QuoteModal
          lines={lines}
          totalUnits={totalUnits}
          sent={sent}
          onSend={() => setSent(true)}
          onClose={closeQuote}
        />
      )}
    </section>
  );
}

function QuoteModal({
  lines,
  totalUnits,
  sent,
  onSend,
  onClose,
}: {
  lines: { product: Product; qty: number }[];
  totalUnits: number;
  sent: boolean;
  onSend: () => void;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-3 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Quote request"
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {sent ? (
          <div className="p-6 text-center sm:p-8">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand/10 text-2xl text-brand">
              ✓
            </div>
            <h3 className="mt-4 text-xl font-bold text-ink">Quote request sent — demo mode (no email sent)</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-ink-soft">
              In the live version this reaches A.R.M Textile&apos;s export desk instantly with
              your selected items and contact details — no personal Gmail, no guesswork.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-ink">Your quote request</h3>
                <p className="mt-0.5 text-sm text-ink-soft">
                  Review your items and add contact details.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close quote"
                className="grid h-8 w-8 place-items-center rounded-md text-ink-soft transition hover:bg-paper"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 rounded-xl border border-line">
              {lines.length === 0 ? (
                <p className="px-4 py-5 text-center text-sm text-ink-soft">
                  No items yet — add products from the catalog, or send an open enquiry.
                </p>
              ) : (
                <ul className="divide-y divide-line">
                  {lines.map(({ product, qty }) => (
                    <li key={product.id} className="flex items-center justify-between px-4 py-2.5 text-sm">
                      <span className="font-medium text-ink">{product.name}</span>
                      <span className="text-ink-soft">
                        {product.gsm !== "—" ? `${product.gsm} · ` : ""}qty {qty}
                      </span>
                    </li>
                  ))}
                  <li className="flex items-center justify-between bg-paper px-4 py-2.5 text-sm font-semibold text-ink">
                    <span>Total</span>
                    <span className="tabular-nums">
                      {lines.length} item{lines.length === 1 ? "" : "s"} · {totalUnits} units
                    </span>
                  </li>
                </ul>
              )}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Company" placeholder="Buyer / importer name" />
              <Field label="Contact name" placeholder="Your name" />
              <Field label="Work email" placeholder="you@company.com" type="email" />
              <Field label="Destination country" placeholder="e.g. Germany" />
            </div>
            <label className="mt-3 block">
              <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                Notes
              </span>
              <textarea
                rows={2}
                placeholder="Target GSM, sizes, colours, delivery window…"
                className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none transition focus:border-brand"
              />
            </label>

            <button
              type="button"
              onClick={onSend}
              className="mt-5 w-full rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-95"
            >
              Send quote request
            </button>
            <p className="mt-2 text-center text-[11px] text-ink-soft">
              Demo mode — nothing is emailed. Concept by Orchanta.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none transition focus:border-brand"
      />
    </label>
  );
}

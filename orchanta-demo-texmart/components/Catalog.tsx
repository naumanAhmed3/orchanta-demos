"use client";

import { useMemo, useState } from "react";
import {
  PRODUCTS,
  CATEGORY_FILTERS,
  MARKETS,
  type Category,
  type Product,
} from "@/lib/data";
import ProductIcon from "./ProductIcon";

type Basket = Record<string, number>;
type Stage = "browsing" | "review" | "sent";

interface BuyerForm {
  company: string;
  name: string;
  email: string;
  country: string;
  market: string;
  notes: string;
}

const EMPTY_BUYER: BuyerForm = {
  company: "",
  name: "",
  email: "",
  country: "",
  market: "",
  notes: "",
};

export default function Catalog() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [basket, setBasket] = useState<Basket>({});
  const [stage, setStage] = useState<Stage>("browsing");
  const [buyer, setBuyer] = useState<BuyerForm>(EMPTY_BUYER);

  const visible = useMemo(
    () =>
      filter === "all"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === filter),
    [filter],
  );

  const lines = useMemo(
    () =>
      PRODUCTS.filter((p) => (basket[p.id] ?? 0) > 0).map((p) => ({
        product: p,
        qty: basket[p.id],
      })),
    [basket],
  );

  const lineCount = lines.length;

  function add(id: string) {
    setBasket((b) => ({ ...b, [id]: (b[id] ?? 0) + 1 }));
  }
  function step(id: string, delta: number) {
    setBasket((b) => {
      const next = Math.max(0, (b[id] ?? 0) + delta);
      const copy = { ...b };
      if (next === 0) delete copy[id];
      else copy[id] = next;
      return copy;
    });
  }
  function removeLine(id: string) {
    setBasket((b) => {
      const copy = { ...b };
      delete copy[id];
      return copy;
    });
  }
  function resetAll() {
    setBasket({});
    setBuyer(EMPTY_BUYER);
    setStage("browsing");
  }

  const countLabel = `${lineCount} ${lineCount === 1 ? "item" : "items"} in your inquiry`;

  return (
    <>
      {/* ===== Catalogue ===== */}
      <section id="catalogue" className="scroll-mt-20 bg-cream py-14 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-5">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-thread">
              Sample catalogue
            </span>
            <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
              Browse by spec, build an inquiry
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate">
              Every SKU carries the export details a buyer asks for first — GSM,
              size, composition, colour options and MOQ. Add what fits your
              programme, then send one consolidated inquiry.
            </p>
          </div>

          {/* Filters */}
          <div className="mt-7 flex flex-wrap gap-2">
            {CATEGORY_FILTERS.map((f) => {
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFilter(f.key)}
                  aria-pressed={active}
                  className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
                    active
                      ? "border-navy bg-navy text-white"
                      : "border-line bg-paper text-slate hover:border-navy hover:text-navy"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                qty={basket[p.id] ?? 0}
                onAdd={() => add(p.id)}
                onStep={(d) => step(p.id, d)}
              />
            ))}
          </div>
          <p className="mt-6 text-xs italic text-slate">
            Specifications shown are illustrative samples for this concept, not a
            live price list.
          </p>
        </div>
      </section>

      {/* ===== Inquiry panel ===== */}
      <section id="inquiry" className="scroll-mt-20 border-t border-line bg-sand py-14 sm:py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-thread">
              Your inquiry
            </span>
            <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
              One basket, one message to the mill
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate">
              Today overseas buyers are funnelled to a single Gmail address. This
              flow gives them a structured request — items, quantities and target
              market — so the first reply can already quote.
            </p>

            <div className="mt-6 rounded-card border border-line bg-paper p-5">
              <p className="text-sm font-bold text-navy" aria-live="polite">
                {countLabel}
              </p>

              {lineCount === 0 ? (
                <p className="mt-3 text-sm text-slate">
                  No products added yet. Use{" "}
                  <span className="font-semibold text-navy">Add to inquiry</span>{" "}
                  on any card above to start your request.
                </p>
              ) : (
                <ul className="mt-4 divide-y divide-line">
                  {lines.map(({ product, qty }) => (
                    <li
                      key={product.id}
                      className="flex flex-wrap items-center gap-3 py-3"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-ink">
                          {product.name}
                        </p>
                        <p className="text-xs text-slate">
                          {product.weight} · {product.size}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Stepper
                          label={`Decrease ${product.name}`}
                          symbol="−"
                          onClick={() => step(product.id, -1)}
                        />
                        <span className="w-9 text-center text-sm font-semibold tabular-nums text-ink">
                          {qty}
                        </span>
                        <Stepper
                          label={`Increase ${product.name}`}
                          symbol="+"
                          onClick={() => step(product.id, 1)}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLine(product.id)}
                        className="text-xs font-semibold text-slate underline-offset-2 hover:text-thread-700 hover:underline"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <button
                type="button"
                onClick={() => setStage("review")}
                disabled={lineCount === 0}
                className="mt-5 w-full rounded-lg bg-navy px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-navy-700 disabled:cursor-not-allowed disabled:bg-mist disabled:text-slate"
              >
                Send inquiry
              </button>
            </div>
          </div>

          {/* Side note */}
          <aside className="rounded-card border border-navy/15 bg-navy-900 p-6 text-mist">
            <h3 className="font-display text-lg font-bold text-white">
              Why this matters for Tex Mart
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed">
              <li className="flex gap-2.5">
                <Tick />
                <span>
                  Buyers in Russia, the Middle East, Europe and the USA can
                  self-serve specs at any hour, in any timezone.
                </span>
              </li>
              <li className="flex gap-2.5">
                <Tick />
                <span>
                  Each inquiry arrives structured — no more decoding loose email
                  threads before a quote can go out.
                </span>
              </li>
              <li className="flex gap-2.5">
                <Tick />
                <span>
                  The catalogue doubles as a shareable line sheet for trade fairs
                  and sourcing agents.
                </span>
              </li>
            </ul>
          </aside>
        </div>
      </section>

      {/* ===== Modal ===== */}
      {stage !== "browsing" && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="inq-modal-title"
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/55 p-3 sm:items-center sm:p-6"
        >
          <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-card bg-paper shadow-2xl">
            {stage === "review" ? (
              <ReviewBody
                lines={lines}
                buyer={buyer}
                setBuyer={setBuyer}
                onClose={() => setStage("browsing")}
                onConfirm={() => setStage("sent")}
              />
            ) : (
              <SentBody buyer={buyer} lineCount={lineCount} onReset={resetAll} />
            )}
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- sub-components ---------- */

function ProductCard({
  product,
  qty,
  onAdd,
  onStep,
}: {
  product: Product;
  qty: number;
  onAdd: () => void;
  onStep: (delta: number) => void;
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-card border border-line bg-paper transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between gap-3 bg-sand px-5 py-4 text-navy">
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-thread-700">
          {product.categoryLabel}
        </span>
        <ProductIcon category={product.category} className="h-9 w-9 text-navy" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-base font-bold leading-snug text-ink">
          {product.name}
        </h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-slate">
          {product.blurb}
        </p>

        <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-[13px]">
          <Spec label="Weight" value={product.weight} />
          <Spec label="Size" value={product.size} />
          <Spec label="Composition" value={product.composition} />
          <Spec label="MOQ" value={product.moq} />
        </dl>

        <div className="mt-3">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-slate">
            Colours
          </span>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {product.colors.map((c) => (
              <span
                key={c}
                className="rounded-full border border-line bg-cream px-2 py-0.5 text-[11px] font-medium text-ink"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 pt-1">
          {qty === 0 ? (
            <button
              type="button"
              onClick={onAdd}
              className="w-full rounded-lg border border-navy bg-paper px-4 py-2.5 text-sm font-bold text-navy transition-colors hover:bg-navy hover:text-white"
            >
              Add to inquiry
            </button>
          ) : (
            <div className="flex items-center justify-between rounded-lg border border-navy bg-navy px-2 py-1.5 text-white">
              <Stepper
                label={`Decrease ${product.name}`}
                symbol="−"
                tone="light"
                onClick={() => onStep(-1)}
              />
              <span className="text-sm font-bold tabular-nums">
                {qty} added
              </span>
              <Stepper
                label={`Increase ${product.name}`}
                symbol="+"
                tone="light"
                onClick={() => onStep(1)}
              />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate">
        {label}
      </dt>
      <dd className="font-medium text-ink">{value}</dd>
    </div>
  );
}

function Stepper({
  label,
  symbol,
  onClick,
  tone = "navy",
}: {
  label: string;
  symbol: string;
  onClick: () => void;
  tone?: "navy" | "light";
}) {
  const cls =
    tone === "light"
      ? "border-white/30 text-white hover:bg-white/15"
      : "border-line text-navy hover:border-navy hover:bg-mist";
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`grid h-8 w-8 place-items-center rounded-md border text-lg font-bold leading-none transition-colors ${cls}`}
    >
      {symbol}
    </button>
  );
}

function Tick() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="mt-0.5 h-4 w-4 flex-none text-thread"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-xs font-semibold text-slate">{label}</span>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-line bg-cream px-3 py-2 text-sm text-ink outline-none placeholder:text-slate/60 focus:border-navy focus:bg-paper"
      />
    </label>
  );
}

function ReviewBody({
  lines,
  buyer,
  setBuyer,
  onClose,
  onConfirm,
}: {
  lines: { product: Product; qty: number }[];
  buyer: BuyerForm;
  setBuyer: React.Dispatch<React.SetStateAction<BuyerForm>>;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div>
      <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-4">
        <div>
          <h2
            id="inq-modal-title"
            className="font-display text-lg font-extrabold text-navy"
          >
            Review your inquiry
          </h2>
          <p className="text-xs text-slate">
            Confirm the basket and tell us where it ships.
          </p>
        </div>
        <button
          type="button"
          aria-label="Close inquiry"
          onClick={onClose}
          className="grid h-8 w-8 flex-none place-items-center rounded-md border border-line text-slate hover:border-navy hover:text-navy"
        >
          ✕
        </button>
      </div>

      <div className="px-6 py-5">
        <ul className="divide-y divide-line rounded-lg border border-line">
          {lines.map(({ product, qty }) => (
            <li
              key={product.id}
              className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm"
            >
              <span className="min-w-0 truncate font-medium text-ink">
                {product.name}
              </span>
              <span className="flex-none font-semibold tabular-nums text-navy">
                × {qty}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field
            id="f-company"
            label="Company"
            value={buyer.company}
            onChange={(v) => setBuyer((b) => ({ ...b, company: v }))}
            placeholder="Your company"
          />
          <Field
            id="f-name"
            label="Contact name"
            value={buyer.name}
            onChange={(v) => setBuyer((b) => ({ ...b, name: v }))}
            placeholder="Buyer name"
          />
          <Field
            id="f-email"
            label="Email"
            type="email"
            value={buyer.email}
            onChange={(v) => setBuyer((b) => ({ ...b, email: v }))}
            placeholder="you@company.com"
          />
          <Field
            id="f-country"
            label="Country"
            value={buyer.country}
            onChange={(v) => setBuyer((b) => ({ ...b, country: v }))}
            placeholder="Destination country"
          />
          <label htmlFor="f-market" className="block sm:col-span-2">
            <span className="text-xs font-semibold text-slate">
              Destination market
            </span>
            <select
              id="f-market"
              value={buyer.market}
              onChange={(e) =>
                setBuyer((b) => ({ ...b, market: e.target.value }))
              }
              className="mt-1 w-full rounded-lg border border-line bg-cream px-3 py-2 text-sm text-ink outline-none focus:border-navy focus:bg-paper"
            >
              <option value="">Select a market…</option>
              {MARKETS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="f-notes" className="block sm:col-span-2">
            <span className="text-xs font-semibold text-slate">
              Notes (optional)
            </span>
            <textarea
              id="f-notes"
              rows={2}
              value={buyer.notes}
              onChange={(e) =>
                setBuyer((b) => ({ ...b, notes: e.target.value }))
              }
              placeholder="Target GSM, custom sizes, labelling, ship date…"
              className="mt-1 w-full resize-none rounded-lg border border-line bg-cream px-3 py-2 text-sm text-ink outline-none placeholder:text-slate/60 focus:border-navy focus:bg-paper"
            />
          </label>
        </div>

        <p className="mt-4 text-xs italic text-slate">
          Demo mode — no email is sent and no data leaves your browser.
        </p>
      </div>

      <div className="flex flex-col-reverse gap-2 border-t border-line px-6 py-4 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-line px-5 py-2.5 text-sm font-semibold text-slate hover:border-navy hover:text-navy"
        >
          Back to catalogue
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-lg bg-thread px-5 py-2.5 text-sm font-bold text-white hover:bg-thread-700"
        >
          Confirm &amp; send inquiry
        </button>
      </div>
    </div>
  );
}

function SentBody({
  buyer,
  lineCount,
  onReset,
}: {
  buyer: BuyerForm;
  lineCount: number;
  onReset: () => void;
}) {
  return (
    <div className="px-6 py-10 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-thread/12 text-thread">
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="mt-4 font-display text-xl font-extrabold text-navy">
        Inquiry sent — demo mode (no email sent)
      </h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate">
        In a live build, this {lineCount}-line request
        {buyer.market ? ` for ${buyer.market}` : ""} would reach the Tex Mart
        sales desk instantly, ready to quote — instead of a blank Gmail.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 rounded-lg bg-navy px-6 py-2.5 text-sm font-bold text-white hover:bg-navy-700"
      >
        Start a new inquiry
      </button>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import QrSvg from "./QrSvg";
import {
  COLOURS,
  SIZES,
  MIN_QTY,
  MAX_QTY,
  PRODUCT,
  buildPayload,
  parsePayload,
  formatGBP,
  totalPence,
  orderRef,
} from "../lib/data";

export default function Configurator() {
  const [colourCode, setColourCode] = useState(COLOURS[0].code);
  const [sizeCode, setSizeCode] = useState(SIZES[1].code);
  const [qty, setQty] = useState(1);

  const colour = COLOURS.find((c) => c.code === colourCode) ?? COLOURS[0];
  const size = SIZES.find((s) => s.code === sizeCode) ?? SIZES[1];

  const payload = useMemo(() => buildPayload(colour, size, qty), [colour, size, qty]);
  const decoded = useMemo(() => parsePayload(payload), [payload]);

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      {/* STEP 1 — configure */}
      <section className="rounded-xl border border-line bg-paper p-5" aria-labelledby="step-configure">
        <StepTag n={1} label="Configure" />
        <h3 id="step-configure" className="idm-h mt-2 text-[17px]">
          <span className="text-magenta">{PRODUCT.short}</span>
        </h3>
        <p className="mt-1 text-[13px] leading-snug text-mute">{PRODUCT.blurb}</p>

        <div className="mt-4">
          <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-mute">Colour</div>
          <div className="mt-2 flex flex-col gap-2">
            {COLOURS.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => setColourCode(c.code)}
                aria-pressed={c.code === colour.code}
                className={`flex items-center gap-2.5 rounded-lg border px-3 py-2 text-left text-[14px] transition-colors ${
                  c.code === colour.code
                    ? "border-magenta bg-magenta-soft font-bold text-ink"
                    : "border-line bg-paper text-ink hover:border-magenta"
                }`}
              >
                <span
                  className="h-4 w-4 shrink-0 rounded-full border border-line"
                  style={{ background: c.swatch }}
                  aria-hidden="true"
                />
                <span className="flex-1">
                  {c.label} <span className="text-[12px] font-normal text-mute">— {c.note}</span>
                </span>
                <span className="text-[12px] font-semibold text-mute">
                  {c.deltaPence === 0 ? "incl." : `+£${(c.deltaPence / 100).toFixed(0)}`}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-mute">Size</div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {SIZES.map((s) => (
              <button
                key={s.code}
                type="button"
                onClick={() => setSizeCode(s.code)}
                aria-pressed={s.code === size.code}
                className={`rounded-lg border px-2 py-2 text-center transition-colors ${
                  s.code === size.code
                    ? "border-magenta bg-magenta-soft"
                    : "border-line bg-paper hover:border-magenta"
                }`}
              >
                <span className="block text-[13px] font-bold leading-tight">{s.label}</span>
                <span className="block text-[11px] text-mute">{s.detail}</span>
                <span className="block text-[12px] font-semibold text-magenta-deep">
                  £{(s.pricePence / 100).toFixed(0)}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-mute">Quantity</div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQty((q) => Math.max(MIN_QTY, q - 1))}
              className="h-8 w-8 rounded-lg border border-line text-[16px] font-bold text-ink transition-colors hover:border-magenta"
            >
              −
            </button>
            <span className="w-9 text-center text-[15px] font-bold" aria-live="polite">
              {qty}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))}
              className="h-8 w-8 rounded-lg border border-line text-[16px] font-bold text-ink transition-colors hover:border-magenta"
            >
              +
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-baseline justify-between rounded-lg bg-panel px-3.5 py-3">
          <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-mute">Total</span>
          <span className="text-[24px] font-black text-ink" aria-live="polite">
            {formatGBP(totalPence(colour, size, qty))}
          </span>
        </div>
      </section>

      {/* STEP 2 — the QR is the order */}
      <section
        className="rounded-xl border-2 border-magenta bg-paper p-5"
        aria-labelledby="step-scan"
      >
        <StepTag n={2} label="Scan" accent />
        <h3 id="step-scan" className="idm-h mt-2 text-[17px]">
          <span className="text-magenta">This code</span> <span className="text-ink">is the order</span>
        </h3>
        <p className="mt-1 text-[13px] leading-snug text-mute">
          Updates live with every choice. Scan it with any phone camera — no app, no typing, no
          plug-in hunt.
        </p>
        <div className="mx-auto mt-4 max-w-[280px] rounded-lg border border-line-soft p-2">
          <QrSvg
            text={payload}
            label={`QR code containing the order: ${PRODUCT.short}, ${colour.label}, ${size.label}, quantity ${qty}, total ${formatGBP(totalPence(colour, size, qty))}`}
          />
        </div>
        <p className="mt-3 text-center text-[12px] text-mute">
          Order ref <span className="font-bold text-ink">{orderRef(colour, size, qty)}</span> — carries
          product, colour, size, quantity, total &amp; payment details.
        </p>
      </section>

      {/* STEP 3 — decoded round trip */}
      <section className="rounded-xl border border-line bg-panel p-5" aria-labelledby="step-pay">
        <StepTag n={3} label="Pay" />
        <h3 id="step-pay" className="idm-h mt-2 text-[17px]">
          <span className="text-magenta">What</span> <span className="text-ink">the customer sees</span>
        </h3>
        <p className="mt-1 text-[13px] leading-snug text-mute">
          Decoded straight back out of the QR above — the round trip, proven.
        </p>

        {decoded ? (
          <div className="mt-4 rounded-xl border border-line bg-paper p-4 shadow-sm">
            <div className="flex items-baseline justify-between border-b border-line-soft pb-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-magenta">
                IDM Imagineering — Order
              </span>
              <span className="text-[11px] font-semibold text-mute">{decoded.ref}</span>
            </div>
            <div className="mt-3 text-[14px] font-bold leading-snug">{decoded.item}</div>
            <dl className="mt-2 space-y-1 text-[13px]">
              <Row k="Colour" v={decoded.colour} />
              <Row k="Size" v={decoded.size} />
              <Row k="Qty" v={decoded.qty} />
            </dl>
            <div className="mt-3 flex items-baseline justify-between rounded-lg bg-magenta-soft px-3 py-2">
              <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-magenta-deep">
                Total
              </span>
              <span className="text-[18px] font-black text-ink">{decoded.total}</span>
            </div>
            <div className="mt-3 text-[11px] font-bold uppercase tracking-[0.12em] text-mute">
              Pay — quote the ref
            </div>
            <ul className="mt-1.5 space-y-1 text-[12.5px] text-ink">
              {decoded.pay.map((p) => (
                <li key={p} className="flex items-start gap-1.5">
                  <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-magenta" aria-hidden="true" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <pre className="scroll-thin mt-4 overflow-x-auto rounded-xl border border-line bg-paper p-4 text-[12px] leading-relaxed">
            {payload}
          </pre>
        )}
      </section>
    </div>
  );
}

function StepTag({ n, label, accent = false }: { n: number; label: string; accent?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full text-[12px] font-black text-white ${
          accent ? "bg-magenta" : "bg-ink"
        }`}
      >
        {n}
      </span>
      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-mute">{label}</span>
    </span>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-mute">{k}</dt>
      <dd className="text-right font-semibold">{v}</dd>
    </div>
  );
}

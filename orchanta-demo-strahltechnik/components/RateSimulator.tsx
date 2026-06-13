"use client";

// Checkout-rate simulator: shows the carrier-calculated shipping rates exactly as the
// Shopify checkout would render them — once as today's setup returns them (Carrier
// Service API without the buyer's VAT status) and once as the custom carrier-service
// app would return them (VAT-aware: Reverse-Charge net rates for EU B2B).

import { useState } from "react";
import {
  CART_PRESETS,
  COUNTRIES,
  type CountryCode,
  type CustomerType,
  type PresetId,
} from "../lib/data";
import { checkVatId, eur, getCountry, simulateRates, type RateLine } from "../lib/rates";

const isExample = (id: string) => COUNTRIES.some((c) => c.vatIdExample === id);

export default function RateSimulator() {
  const [presetId, setPresetId] = useState<PresetId>("parcel");
  const [countryCode, setCountryCode] = useState<CountryCode>("AT");
  const [customerType, setCustomerType] = useState<CustomerType>("b2c");
  const [vatId, setVatId] = useState("");

  const country = getCountry(countryCode);
  const preset = CART_PRESETS.find((p) => p.id === presetId) ?? CART_PRESETS[0];
  const vatCheck = checkVatId(vatId, country);
  const result = simulateRates(presetId, countryCode, customerType, vatCheck.valid);
  const wrongToday = result.maxDelta > 0;

  function selectType(type: CustomerType) {
    setCustomerType(type);
    // Demo convenience: pre-fill a correctly formatted example USt-IdNr. (editable).
    if (type === "b2b" && (vatId === "" || isExample(vatId))) {
      setVatId(country.vatIdExample);
    }
  }

  function selectCountry(code: CountryCode) {
    setCountryCode(code);
    if (customerType === "b2b" && (vatId === "" || isExample(vatId))) {
      setVatId(getCountry(code).vatIdExample);
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-paper shadow-sm">
      {/* Checkout-style header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-slate-deep px-4 py-3 sm:px-6">
        <div className="font-display text-[17px] font-bold tracking-wide text-paper">
          Checkout · Versand
        </div>
        <div className="rounded bg-orange px-2 py-0.5 text-[11px] font-bold text-paper">
          Raten-Simulator
        </div>
      </div>

      <div className="grid grid-cols-1 gap-0 lg:grid-cols-[320px_1fr]">
        {/* Controls */}
        <div className="space-y-5 border-b border-line bg-haze p-4 sm:p-5 lg:border-b-0 lg:border-r">
          <div>
            <div className="mb-1.5 text-[12px] font-bold uppercase tracking-wide text-mute">
              Kundentyp
            </div>
            <div className="grid grid-cols-2 gap-1 rounded-lg border border-line bg-paper p-1">
              <button
                type="button"
                aria-pressed={customerType === "b2c"}
                onClick={() => selectType("b2c")}
                className={`rounded-md px-2 py-2 text-left transition-colors ${
                  customerType === "b2c"
                    ? "bg-slate-deep text-paper"
                    : "text-mute hover:text-ink"
                }`}
              >
                <span className="block text-[13px] font-bold">Privatkunde (B2C)</span>
                <span className="block text-[11px] opacity-80">ohne USt-IdNr.</span>
              </button>
              <button
                type="button"
                aria-pressed={customerType === "b2b"}
                onClick={() => selectType("b2b")}
                className={`rounded-md px-2 py-2 text-left transition-colors ${
                  customerType === "b2b"
                    ? "bg-slate-deep text-paper"
                    : "text-mute hover:text-ink"
                }`}
              >
                <span className="block text-[13px] font-bold">Geschäftskunde (B2B)</span>
                <span className="block text-[11px] opacity-80">mit USt-IdNr.</span>
              </button>
            </div>
          </div>

          <div>
            <div className="mb-1.5 text-[12px] font-bold uppercase tracking-wide text-mute">
              Lieferland
            </div>
            <div className="flex flex-wrap gap-1.5">
              {COUNTRIES.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  aria-pressed={c.code === countryCode}
                  onClick={() => selectCountry(c.code)}
                  className={`rounded-md border px-2.5 py-1.5 text-[13px] font-bold transition-colors ${
                    c.code === countryCode
                      ? "border-orange bg-orange text-paper"
                      : "border-line bg-paper text-mute hover:text-ink"
                  }`}
                >
                  {c.code} · {c.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-1.5 text-[12px] font-bold uppercase tracking-wide text-mute">
              Warenkorb
            </div>
            <div className="space-y-1.5">
              {CART_PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={p.id === presetId}
                  onClick={() => setPresetId(p.id)}
                  className={`block w-full rounded-md border p-2.5 text-left transition-colors ${
                    p.id === presetId
                      ? "border-orange bg-orange-soft"
                      : "border-line bg-paper hover:border-soft"
                  }`}
                >
                  <span className="block text-[13px] font-bold text-ink">{p.label}</span>
                  <span className="block text-[12px] text-mute">{p.contents}</span>
                  <span className="block text-[12px] text-mute">
                    {p.weight} · Warenwert {eur(p.goodsNet)} netto
                  </span>
                </button>
              ))}
            </div>
          </div>

          {customerType === "b2b" && (
            <div className="fade-up">
              <label
                htmlFor="vat-id"
                className="mb-1.5 block text-[12px] font-bold uppercase tracking-wide text-mute"
              >
                USt-IdNr. des Käufers
              </label>
              <input
                id="vat-id"
                type="text"
                value={vatId}
                onChange={(e) => setVatId(e.target.value)}
                placeholder={country.vatIdExample}
                autoComplete="off"
                spellCheck={false}
                className="w-full rounded-md border border-line bg-paper px-3 py-2 font-mono text-[14px] text-ink outline-none focus:border-orange"
              />
              <p
                className={`mt-1.5 rounded-md px-2.5 py-1.5 text-[12px] leading-snug ${
                  vatCheck.valid ? "bg-ok-soft text-ok" : "bg-bad-soft text-bad"
                }`}
              >
                {vatCheck.message}
              </p>
            </div>
          )}
        </div>

        {/* Rates output */}
        <div className="p-4 sm:p-5">
          <p className="mb-3 text-[13px] text-mute">
            Lieferung nach <strong className="text-ink">{country.name}</strong> ·{" "}
            {preset.label} ·{" "}
            {customerType === "b2b"
              ? vatCheck.valid
                ? country.code === "DE"
                  ? "Geschäftskunde, Inland — kein Reverse-Charge"
                  : "Geschäftskunde mit gültiger USt-IdNr. — Reverse-Charge"
                : "Geschäftskunde ohne gültige USt-IdNr. — Bruttopreise"
              : "Privatkunde — Bruttopreise"}
          </p>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <RatePanel
              title="Heute — Carrier Service API"
              subtitle="kennt den USt-Status nicht"
              lines={result.today}
              deltas={result.deltas}
              tone={wrongToday ? "bad" : "neutral"}
              badge={wrongToday ? "falsche Rate" : "korrekt"}
            />
            <RatePanel
              title="Mit Custom Carrier-App"
              subtitle="kennt B2B-/USt-Status des Käufers"
              lines={result.withApp}
              deltas={result.withApp.map(() => 0)}
              tone="good"
              badge="korrekt"
            />
          </div>

          <div
            className={`mt-3 rounded-lg px-3.5 py-2.5 text-[13px] leading-snug ${
              wrongToday ? "bg-bad-soft text-bad" : "bg-ok-soft text-ok"
            }`}
          >
            {wrongToday ? (
              <>
                <strong>
                  Heute werden bis zu {eur(result.maxDelta)} pro Bestellung zu viel
                  berechnet
                </strong>{" "}
                — die Rate ignoriert die gültige USt-IdNr. und schlägt{" "}
                {Math.round(country.vatRate * 100)} % USt. auf den Netto-Versandpreis,
                obwohl Reverse-Charge gilt.
              </>
            ) : (
              <>
                Für diesen Kundentyp rechnet der heutige Checkout korrekt — beide Raten
                sind identisch.
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function RatePanel({
  title,
  subtitle,
  lines,
  deltas,
  tone,
  badge,
}: {
  title: string;
  subtitle: string;
  lines: RateLine[];
  deltas: number[];
  tone: "neutral" | "good" | "bad";
  badge: string;
}) {
  const frame =
    tone === "bad"
      ? "border-bad"
      : tone === "good"
        ? "border-orange"
        : "border-line";
  const badgeCls =
    tone === "bad"
      ? "bg-bad text-paper"
      : tone === "good"
        ? "bg-orange text-paper"
        : "bg-ok-soft text-ok";

  return (
    <div className={`rounded-lg border ${frame} bg-paper`}>
      <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-line px-3 py-2.5">
        <div>
          <div className="text-[13px] font-bold text-ink">{title}</div>
          <div className="text-[11px] text-mute">{subtitle}</div>
        </div>
        <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${badgeCls}`}>
          {badge}
        </span>
      </div>
      <ul>
        {lines.map((line, i) => (
          <li
            key={line.service}
            className="flex items-start justify-between gap-3 border-b border-line px-3 py-2.5 last:border-b-0"
          >
            <div className="flex min-w-0 items-start gap-2">
              <span
                aria-hidden="true"
                className="mt-1 inline-block h-3 w-3 shrink-0 rounded-full border-2 border-soft"
              />
              <div className="min-w-0">
                <div className="text-[13px] font-bold text-ink">
                  {line.service}{" "}
                  <span className="font-normal text-mute">· {line.carrier}</span>
                </div>
                <div className="text-[11px] text-mute">{line.eta}</div>
              </div>
            </div>
            <div className="text-right">
              <div
                className={`text-[14px] font-bold ${
                  deltas[i] > 0 ? "text-bad" : "text-ink"
                }`}
              >
                {eur(line.charged)}
              </div>
              <div className="max-w-[150px] text-[10px] leading-tight text-mute">
                {line.taxLabel}
              </div>
              {deltas[i] > 0 && (
                <div className="mt-0.5 text-[11px] font-bold text-bad">
                  +{eur(deltas[i])} zu viel
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

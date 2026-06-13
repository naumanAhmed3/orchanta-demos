"use client";

import { useState } from "react";
import {
  BASE_NAV,
  PERSONAS,
  WHOLESALE_SKUS,
  showsWholesaleNav,
  type LogicMode,
  type Persona,
} from "../lib/data";
import { OpasLogo } from "./Logo";

export default function WholesaleSim() {
  const [persona, setPersona] = useState<Persona>(PERSONAS[0]);
  const [mode, setMode] = useState<LogicMode>("fixed");
  const visible = showsWholesaleNav(persona, mode);
  const isB2B = persona.id === "b2b-new";

  return (
    <div>
      {/* CONTROLS */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto]">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-mute">
            1 · Who&rsquo;s browsing the store?
          </div>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3" role="group" aria-label="Account switcher">
            {PERSONAS.map((p) => {
              const active = p.id === persona.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setPersona(p)}
                  className={`rounded-lg border px-3.5 py-3 text-left transition-colors ${
                    active
                      ? "border-bark bg-bark text-paper shadow-sm"
                      : "border-line bg-paper hover:border-tan"
                  }`}
                >
                  <span className="block text-[14px] font-bold">{p.label}</span>
                  <span className={`mt-0.5 block text-[11px] leading-snug ${active ? "text-tan" : "text-mute"}`}>
                    {p.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-mute">2 · Theme logic</div>
          <div className="mt-2 inline-flex rounded-lg border border-line bg-paper p-1" role="group" aria-label="Theme logic">
            <button
              type="button"
              aria-pressed={mode === "broken"}
              onClick={() => setMode("broken")}
              className={`rounded-md px-3.5 py-2.5 text-[12px] font-bold transition-colors ${
                mode === "broken" ? "bg-brick text-paper" : "text-mute hover:text-bark"
              }`}
            >
              Dawn today (broken)
            </button>
            <button
              type="button"
              aria-pressed={mode === "fixed"}
              onClick={() => setMode("fixed")}
              className={`rounded-md px-3.5 py-2.5 text-[12px] font-bold transition-colors ${
                mode === "fixed" ? "bg-okay text-paper" : "text-mute hover:text-bark"
              }`}
            >
              With the fix
            </button>
          </div>
        </div>
      </div>

      {/* SIMULATED STOREFRONT */}
      <div className="mt-6 overflow-hidden rounded-xl border border-line bg-paper shadow-sm">
        <div className="flex items-center gap-2 border-b border-line bg-cream px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-brick/70" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-tan" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-okay/60" aria-hidden="true" />
          <span className="ml-2 rounded-md bg-paper px-3 py-1 text-[11px] text-mute">
            opassmokedmeats.com — simulated storefront
          </span>
        </div>
        <div className="bg-bark py-1.5 text-center text-[10.5px] tracking-[0.14em] text-tan">
          SMOKED IN FREDERICKSBURG, TEXAS SINCE 1947 — SAMPLE BANNER
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-4">
          <OpasLogo compact />
          <nav className="flex flex-wrap items-center gap-1.5" aria-label="Simulated store navigation">
            {BASE_NAV.map((item) => (
              <span key={item} className="rounded-full px-3 py-1.5 text-[12px] font-semibold text-bark/80">
                {item}
              </span>
            ))}
            {visible ? (
              <span className="fade-up rounded-full border border-tan bg-tan-soft px-3 py-1.5 text-[12px] font-bold text-bark">
                Wholesale Catalog
              </span>
            ) : isB2B ? (
              <span className="rounded-full border border-dashed border-brick/60 px-3 py-1.5 text-[12px] font-semibold text-brick/70 line-through decoration-brick/50">
                Wholesale Catalog
              </span>
            ) : null}
          </nav>
          <span className="rounded-full border border-line bg-cream px-3 py-1.5 text-[11px] font-semibold text-mute">
            {persona.id === "guest" ? "Account: signed out" : `Signed in: ${persona.sub.split(" · ")[0]}`}
          </span>
        </div>
      </div>

      {/* VERDICT */}
      <p className="mt-3 flex items-start gap-2 text-[13px] leading-relaxed" aria-live="polite">
        <span
          className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${
            visible ? "bg-okay" : isB2B ? "bg-brick" : "bg-tan"
          }`}
          aria-hidden="true"
        />
        {visible ? (
          <span className="text-okay">
            <strong>Wholesale Catalog renders.</strong> This customer is assigned to{" "}
            {persona.companyLocationCount} company location, so the location-based check passes — even though
            the account was created today.
          </span>
        ) : isB2B ? (
          <span className="text-brick">
            <strong>Missing — this is your bug.</strong> The theme&rsquo;s <code className="font-semibold">customer.b2b?</code>{" "}
            check returns false for a brand-new company account that hasn&rsquo;t started a B2B session yet, so a
            paying wholesale customer never sees the link your test accounts see.
          </span>
        ) : (
          <span className="text-mute">
            Hidden — correct. A {persona.label.toLowerCase()} has no company location, so wholesale stays out of
            the nav either way.
          </span>
        )}
      </p>

      {/* CODE CALLOUT */}
      <div className="mt-6 overflow-hidden rounded-xl bg-bark-2 text-paper">
        <div className="border-b border-paper/10 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-tan">
          The one-line difference — sections/header.liquid
        </div>
        <button
          type="button"
          onClick={() => setMode("broken")}
          className={`block w-full px-5 py-4 text-left transition-colors ${
            mode === "broken" ? "bg-brick/15" : "hover:bg-paper/5"
          }`}
        >
          <span className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-brick px-2 py-0.5 text-[10px] font-bold tracking-wider">BROKEN</span>
            <code className="font-mono text-[12.5px] text-paper/90">{"{% if customer.b2b? %}"}</code>
          </span>
          <span className="mt-1.5 block text-[12px] leading-relaxed text-paper/60">
            Only true once the shopper is inside an active company-location session — so seasoned test logins
            pass it, while freshly created B2B customers fail it. Exactly the symptom on your store.
          </span>
        </button>
        <button
          type="button"
          onClick={() => setMode("fixed")}
          className={`block w-full px-5 py-4 text-left transition-colors ${
            mode === "fixed" ? "bg-okay/20" : "hover:bg-paper/5"
          }`}
        >
          <span className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-okay px-2 py-0.5 text-[10px] font-bold tracking-wider">FIXED</span>
            <code className="font-mono text-[12.5px] text-paper/90">
              {"{% if customer.company_available_locations_count > 0 %}"}
            </code>
          </span>
          <span className="mt-1.5 block text-[12px] leading-relaxed text-paper/60">
            True for any customer assigned to a company location — including one created a minute ago. Click
            either line to flip the simulation above.
          </span>
        </button>
      </div>

      {/* WHOLESALE CATALOG */}
      <div id="catalog" className="mt-10 scroll-mt-24">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-display text-[24px] text-bark">Wholesale catalog</h3>
          <span className="text-[12px] text-mute">Case pricing for stores, restaurants &amp; resellers — sample data</span>
        </div>

        {visible ? (
          <div className="fade-up mt-4">
            <p className="inline-flex items-center gap-2 rounded-full border border-okay/40 bg-okay/10 px-3.5 py-1.5 text-[12px] font-bold text-okay">
              <span className="h-2 w-2 rounded-full bg-okay" aria-hidden="true" />
              Wholesale pricing unlocked — Walnut Creek General Store
            </p>
            <div className="mt-3 overflow-x-auto rounded-xl border border-line bg-paper shadow-sm">
              <table className="w-full min-w-[640px] border-collapse text-left text-[13px]">
                <thead>
                  <tr className="border-b border-line bg-cream text-[11px] uppercase tracking-[0.12em] text-mute">
                    <th className="px-4 py-3 font-bold">Product</th>
                    <th className="px-4 py-3 font-bold">Case pack</th>
                    <th className="px-4 py-3 text-right font-bold">Retail ea.</th>
                    <th className="px-4 py-3 text-right font-bold">Wholesale ea.</th>
                    <th className="px-4 py-3 text-right font-bold">Case price</th>
                  </tr>
                </thead>
                <tbody>
                  {WHOLESALE_SKUS.map((sku) => (
                    <tr key={sku.name} className="border-b border-line/60 last:border-0">
                      <td className="px-4 py-3.5">
                        <span className="font-bold">{sku.name}</span>
                        <span className="mt-0.5 flex flex-wrap items-center gap-1.5">
                          <span className="text-[11px] text-mute">{sku.category}</span>
                          {sku.wholesaleOnly && (
                            <span className="rounded-full bg-bark px-2 py-0.5 text-[9.5px] font-bold tracking-wider text-tan">
                              WHOLESALE ONLY
                            </span>
                          )}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-mute">{sku.pack}</td>
                      <td className="px-4 py-3.5 text-right text-mute">{sku.retailEach}</td>
                      <td className="px-4 py-3.5 text-right font-bold text-bark">{sku.wholesaleEach}</td>
                      <td className="px-4 py-3.5 text-right font-bold text-brick">{sku.casePrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-dashed border-tan bg-cream px-6 py-10 text-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mx-auto">
              <rect x="5" y="10" width="14" height="10" rx="2" stroke="var(--color-tan)" strokeWidth="2" />
              <path d="M8 10 V7 a4 4 0 0 1 8 0 v3" stroke="var(--color-tan)" strokeWidth="2" fill="none" />
            </svg>
            {isB2B ? (
              <p className="mx-auto mt-3 max-w-md text-[13px] leading-relaxed text-brick">
                <strong>Locked out:</strong> a wholesale customer who can&rsquo;t see wholesale. Flip the theme
                logic above to <strong>With the fix</strong> to watch it unlock.
              </p>
            ) : (
              <p className="mx-auto mt-3 max-w-md text-[13px] leading-relaxed text-mute">
                Case pricing is reserved for wholesale accounts. Switch to the new wholesale account
                above to see it unlock.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

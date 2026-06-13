"use client";

import { useEffect, useState } from "react";
import { TIERS, SIBLING_DISCOUNT, formatUSD, type Tier } from "@/lib/data";

type Billing = "monthly" | "annual";

function renewalDate(billing: Billing): string {
  const d = new Date();
  if (billing === "annual") d.setFullYear(d.getFullYear() + 1);
  else d.setMonth(d.getMonth() + 1);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function Membership() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const [sibling, setSibling] = useState(false);
  const [selected, setSelected] = useState<Tier | null>(null);
  const [renewsOn, setRenewsOn] = useState<string | null>(null);

  const confirmed = renewsOn !== null;

  function close() {
    setSelected(null);
    setRenewsOn(null);
  }

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelected(null);
        setRenewsOn(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  const base = selected ? (billing === "annual" ? selected.annual : selected.monthly) : 0;
  const siblingPrice = sibling ? base * (1 - SIBLING_DISCOUNT) : 0;
  const total = base + siblingPrice;
  const playerCount = sibling ? 2 : 1;
  const monthlyEquivalent = selected ? (selected.monthly + (sibling ? selected.monthly * (1 - SIBLING_DISCOUNT) : 0)) * 12 : 0;
  const annualSavings = billing === "annual" ? monthlyEquivalent - total : 0;
  const per = billing === "annual" ? "/yr" : "/mo";

  return (
    <section aria-labelledby="memberships" className="mx-auto w-full max-w-5xl px-5 pb-16">
      <div className="mb-8 text-center">
        <h2 id="memberships" className="font-display text-xl font-extrabold uppercase tracking-[0.14em] sm:text-2xl">
          Select your pathway
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-cream-60">
          Every player’s journey is different. The commitment to improve is the same. Pick a
          program, choose monthly or annual, and you’re in.
        </p>
      </div>

      {/* Billing + sibling controls */}
      <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <div className="inline-flex rounded-full border border-line bg-surface p-1" role="group" aria-label="Billing period">
          <button
            type="button"
            onClick={() => setBilling("monthly")}
            aria-pressed={billing === "monthly"}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              billing === "monthly" ? "bg-crimson text-cream" : "text-cream-60 hover:text-cream"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBilling("annual")}
            aria-pressed={billing === "annual"}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              billing === "annual" ? "bg-crimson text-cream" : "text-cream-60 hover:text-cream"
            }`}
          >
            Annual · 2 months free
          </button>
        </div>

        <label className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2.5 text-sm text-cream-60 has-checked:border-gold has-checked:text-cream">
          <input
            type="checkbox"
            checked={sibling}
            onChange={(e) => setSibling(e.target.checked)}
            className="h-4 w-4 accent-[#8d0d14]"
          />
          Sibling add-on — 20% off the second player
        </label>
      </div>

      {/* Tier cards */}
      <div className="grid gap-5 md:grid-cols-3">
        {TIERS.map((tier) => {
          const price = billing === "annual" ? tier.annual : tier.monthly;
          return (
            <article
              key={tier.id}
              className={`flex flex-col rounded-card border bg-surface p-6 ${
                tier.featured ? "border-crimson glow-crimson" : "border-line"
              }`}
            >
              {tier.featured && (
                <p className="mb-3 inline-flex self-start rounded-full bg-crimson px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-cream">
                  Most committed
                </p>
              )}
              <h3 className="font-display text-base font-extrabold uppercase tracking-[0.1em]">{tier.name}</h3>
              <p className="mt-1 text-sm text-cream-60">{tier.tagline}</p>
              <p className="mt-3 inline-flex self-start rounded-full border border-line px-3 py-1 text-xs text-cream-60">
                {tier.ages}
              </p>

              <p className="mt-5 flex items-baseline gap-1.5">
                <span className="font-display text-3xl font-extrabold">{formatUSD(price)}</span>
                <span className="text-sm text-cream-60">{billing === "annual" ? "/year" : "/month"}</span>
              </p>
              {billing === "annual" && (
                <p className="mt-1 text-xs font-semibold text-gold">
                  Package deal — save {formatUSD(tier.monthly * 2)} vs monthly
                </p>
              )}

              <ul className="mt-5 flex-1 space-y-2 border-t border-line-soft pt-4">
                {tier.includes.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-cream-60">
                    <span aria-hidden className="mt-0.5 text-gold">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => setSelected(tier)}
                className={`mt-6 rounded-full px-5 py-3 text-sm font-bold transition-colors ${
                  tier.featured
                    ? "bg-crimson text-cream hover:bg-crimson-bright"
                    : "border border-line text-cream hover:border-crimson hover:bg-crimson"
                }`}
              >
                {`Join ${tier.name}`}
              </button>
            </article>
          );
        })}
      </div>

      <p className="mt-6 text-center text-xs text-cream-40">
        Pricing shown is illustrative for this concept — final tiers and rates are set by Salas
        Training. Memberships auto-renew and can be cancelled anytime.
      </p>

      {/* Checkout modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 sm:items-center"
          onClick={close}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Checkout summary for ${selected.name}`}
            onClick={(e) => e.stopPropagation()}
            className="fade-up w-full max-w-md rounded-card border border-line bg-surface-2 p-6 shadow-2xl"
          >
            {!confirmed ? (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-sm font-extrabold uppercase tracking-[0.14em]">
                      Checkout summary
                    </h3>
                    <p className="mt-1 text-xs text-cream-60">
                      {selected.name} · {billing === "annual" ? "Annual package" : "Monthly plan"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Close checkout"
                    className="rounded-full border border-line px-2.5 py-1 text-sm text-cream-60 hover:text-cream"
                  >
                    ✕
                  </button>
                </div>

                <dl className="mt-5 space-y-2.5 border-t border-line-soft pt-4 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-cream-60">
                      {selected.name} — Player 1 membership
                    </dt>
                    <dd className="font-semibold">
                      {formatUSD(base)}
                      <span className="text-cream-60">{per}</span>
                    </dd>
                  </div>
                  {sibling && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-cream-60">Sibling membership — 20% off</dt>
                      <dd className="font-semibold">
                        {formatUSD(siblingPrice)}
                        <span className="text-cream-60">{per}</span>
                      </dd>
                    </div>
                  )}
                  {billing === "annual" && (
                    <div className="flex justify-between gap-3 text-gold">
                      <dt>Package savings vs monthly</dt>
                      <dd className="font-semibold">−{formatUSD(annualSavings)}</dd>
                    </div>
                  )}
                  <div className="flex justify-between gap-3 border-t border-line-soft pt-3 text-base">
                    <dt className="font-bold">Total due today</dt>
                    <dd className="font-display font-extrabold">{formatUSD(total)}</dd>
                  </div>
                </dl>

                <p className="mt-3 text-xs text-cream-40">
                  {playerCount} player{playerCount > 1 ? "s" : ""} · auto-renews every{" "}
                  {billing === "annual" ? "year" : "month"} · cancel anytime. Card payments would be
                  handled by Stripe in the live build.
                </p>

                <button
                  type="button"
                  onClick={() => setRenewsOn(renewalDate(billing))}
                  className="mt-5 w-full rounded-full bg-crimson px-5 py-3.5 text-sm font-bold text-cream transition-colors hover:bg-crimson-bright"
                >
                  Demo checkout — no charge
                </button>
              </>
            ) : (
              <div className="text-center">
                <span aria-hidden className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-crimson glow-crimson text-xl text-cream">
                  ✓
                </span>
                <h3 className="mt-4 font-display text-sm font-extrabold uppercase tracking-[0.14em]">
                  Membership active — demo mode
                </h3>
                <p className="mt-2 text-sm text-cream-60">
                  {selected.name} · {playerCount} player{playerCount > 1 ? "s" : ""} ·{" "}
                  {billing === "annual" ? "annual package" : "monthly plan"}. No card was charged —
                  this is a working concept.
                </p>
                <p className="mt-4 rounded-[12px] border border-line bg-surface px-4 py-3 text-sm">
                  Auto-renews on <strong className="text-gold">{renewsOn}</strong> for{" "}
                  <strong>{formatUSD(total)}</strong>
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-5 w-full rounded-full border border-line px-5 py-3 text-sm font-bold text-cream hover:border-crimson"
                >
                  Back to programs
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

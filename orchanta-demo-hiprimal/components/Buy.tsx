"use client";

import { useEffect, useRef, useState } from "react";
import { PLANS, type Plan } from "@/lib/data";

// Buy box with a one-time vs Subscribe & Save toggle (simulated — this is a
// concept; no checkout, no charge) plus the mobile sticky add-to-cart bar.
export function Buy() {
  const [planId, setPlanId] = useState<Plan["id"]>("once");
  const [added, setAdded] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);

  const plan = PLANS.find((p) => p.id === planId) ?? PLANS[0];

  // Show the sticky bar once the main CTA scrolls out of view.
  useEffect(() => {
    const el = ctaRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { rootMargin: "-56px 0px 0px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const addToCart = () => setAdded(true);

  return (
    <div>
      {/* Plan toggle */}
      <div
        role="radiogroup"
        aria-label="Choose one-time purchase or subscribe and save"
        className="grid gap-2.5"
      >
        {PLANS.map((p) => {
          const selected = p.id === planId;
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => {
                setPlanId(p.id);
                setAdded(false);
              }}
              className={`flex items-center justify-between gap-4 border px-4 py-3.5 text-left transition-colors ${
                selected
                  ? "border-oxblood bg-paper shadow-[0_6px_18px_rgb(94_27_33_/_0.12)]"
                  : "border-line bg-paper/55 hover:border-ink-faint"
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={`grid h-4.5 w-4.5 flex-none place-items-center rounded-full border ${
                    selected ? "border-oxblood" : "border-line"
                  }`}
                >
                  {selected && (
                    <span className="bg-oxblood h-2.5 w-2.5 rounded-full" />
                  )}
                </span>
                <span>
                  <span className="flex items-center gap-2 text-[15px] font-semibold">
                    {p.label}
                    {p.badge && (
                      <span className="bg-oxblood text-paper px-1.5 py-0.5 text-[10px] font-semibold tracking-[0.08em] uppercase">
                        {p.badge}
                      </span>
                    )}
                  </span>
                  <span className="text-ink-soft mt-0.5 block text-[12.5px]">
                    {p.note}
                  </span>
                </span>
              </span>
              <span className="text-right">
                <span className="font-display block text-xl font-semibold">
                  {p.price}
                </span>
                <span className="text-ink-faint block text-[12px]">
                  {p.perDay}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* CTA */}
      <div ref={ctaRef} className="mt-5">
        <button
          type="button"
          onClick={addToCart}
          className="bg-oxblood text-paper hover:bg-oxblood-deep inline-flex w-full items-center justify-center gap-3 px-8 py-4 text-[15px] font-semibold tracking-[0.01em] transition-colors"
        >
          {added ? "Added ✓" : `Add to Cart — ${plan.price}`}
        </button>
        {added ? (
          <p className="text-oxblood fade-up mt-3 text-[13px] font-semibold">
            Added to cart (demo — no charge). On the live store this opens the
            cart drawer.
          </p>
        ) : (
          <p className="text-ink-faint mt-3 text-[13px]">
            {plan.id === "subscribe"
              ? "Subscription is simulated for this concept — skip or cancel anytime."
              : "60-day money-back guarantee on every order."}
          </p>
        )}
      </div>

      {/* Sticky add-to-cart bar — mobile only */}
      <div
        className={`border-line bg-paper fixed inset-x-0 bottom-0 z-50 border-t px-4 py-3 shadow-[0_-8px_24px_rgb(34_28_23_/_0.12)] transition-transform duration-200 md:hidden ${
          showSticky ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto flex max-w-150 items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-[13px] leading-tight font-semibold">
              HiPrimal · {plan.label}
            </p>
            <p className="text-ink-faint text-[12px] leading-tight">
              {plan.price} · {plan.perDay}
            </p>
          </div>
          <button
            type="button"
            onClick={addToCart}
            className="bg-oxblood text-paper flex-none px-5 py-3 text-[14px] font-semibold"
          >
            {added ? "Added ✓" : `Add — ${plan.price}`}
          </button>
        </div>
      </div>
    </div>
  );
}

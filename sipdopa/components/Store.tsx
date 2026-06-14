"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FLAVOURS, type Flavour } from "@/lib/flavours";
import Pouch from "@/components/Pouch";

const SUBSCRIBE_PRICE = 22; // £22/month

type CartItem = { id: string; name: string; plan: "subscribe" | "one-time"; price: number };

export default function Store() {
  const [active, setActive] = useState<Flavour>(FLAVOURS[0]);
  const [plan, setPlan] = useState<"subscribe" | "one-time">("subscribe");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [barVisible, setBarVisible] = useState(false);
  const [added, setAdded] = useState(false);

  // drive the global accent so the whole page shifts colour
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", active.accent);
    document.documentElement.style.setProperty("--accent-soft", active.accentSoft);
  }, [active]);

  // sticky bar appears after scrolling past the hero
  useEffect(() => {
    const onScroll = () => setBarVisible(window.scrollY > 360);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const oneTimePrice = useMemo(
    () => Number(active.oneTime.replace(/[^\d.]/g, "")),
    [active]
  );
  const price = plan === "subscribe" ? SUBSCRIBE_PRICE : oneTimePrice;
  const savingPct = Math.round(((oneTimePrice - SUBSCRIBE_PRICE) / oneTimePrice) * 100);

  const cartCount = cart.length;
  const cartTotal = cart.reduce((s, i) => s + i.price, 0);

  function addToCart() {
    setCart((c) => [
      ...c,
      { id: active.id + "-" + Date.now(), name: active.name, plan, price },
    ]);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  function removeFromCart(id: string) {
    setCart((c) => c.filter((i) => i.id !== id));
  }

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="bg-ritual relative overflow-hidden px-5 pb-10 pt-7 sm:px-8 sm:pt-10">
        <div className="mx-auto max-w-5xl">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="grid h-8 w-8 place-items-center rounded-lg font-display text-sm font-semibold text-cream transition-colors duration-700"
                style={{ background: active.accent }}
              >
                S
              </span>
              <span className="font-display text-lg font-semibold tracking-tight text-ink">
                Sip&nbsp;Dopa
              </span>
            </div>
            <button
              onClick={() => setDrawerOpen(true)}
              className="relative rounded-full border border-ink/10 bg-white/70 px-3 py-1.5 text-sm font-medium text-ink backdrop-blur transition hover:bg-white"
              aria-label="Open cart"
            >
              Cart
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11px] font-semibold text-cream transition-colors duration-700"
                    style={{ background: active.accent }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </header>

          <div className="mt-8 grid items-center gap-8 sm:mt-10 sm:grid-cols-2">
            {/* copy */}
            <div className="order-2 sm:order-1">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-3 py-1 text-xs font-medium uppercase tracking-wide text-matcha backdrop-blur"
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: active.accent }} />
                Six flavours. One matcha.
              </motion.p>

              <h1 className="mt-4 font-display text-5xl font-semibold leading-[0.95] tracking-tight text-ink sm:text-6xl">
                Sip the
                <br />
                <span className="italic" style={{ color: active.accent }}>
                  difference
                </span>
              </h1>

              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink/70">
                100% Japanese ceremonial grade, sourced from Uji, Japan. A daily ritual
                that takes thirty seconds and changes the whole morning.
                <span className="font-medium text-ink"> Scoop. Whisk. Done.</span>
              </p>

              <AnimatePresence mode="wait">
                <motion.p
                  key={active.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="mt-5 max-w-md rounded-2xl border border-ink/5 bg-white/55 p-4 text-sm leading-relaxed text-ink/75 backdrop-blur"
                >
                  <span className="font-medium" style={{ color: active.accent }}>
                    {active.name} —{" "}
                  </span>
                  {active.note}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* pouch */}
            <div className="order-1 flex justify-center sm:order-2">
              <Pouch flavour={active} />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FLAVOUR SELECTOR ---------- */}
      <section className="px-5 py-10 sm:px-8" id="flavours" aria-label="Choose your flavour">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl font-semibold text-ink">
              Choose your flavour
            </h2>
            <span className="text-xs text-ink/40">Tap to taste</span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {FLAVOURS.map((f) => {
              const isActive = f.id === active.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActive(f)}
                  aria-pressed={isActive}
                  className={`group relative flex items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-300 ${
                    isActive
                      ? "scale-[1.02] bg-white shadow-lg shadow-ink/5"
                      : "border-ink/8 bg-white/50 hover:bg-white"
                  }`}
                  style={{ borderColor: isActive ? f.accent : undefined }}
                >
                  <span
                    className="h-10 w-10 flex-shrink-0 rounded-full ring-2 ring-white transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(140deg, ${f.pouchTop}, ${f.pouchBottom})`,
                    }}
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-ink">
                      {f.name}
                    </span>
                    <span className="block text-[11px] text-ink/40">40g pouch</span>
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="flavour-check"
                      className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full text-[11px] text-cream"
                      style={{ background: f.accent }}
                    >
                      ✓
                    </motion.span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- PLAN TOGGLE / BUY ---------- */}
      <section className="px-5 pb-14 sm:px-8" aria-label="Choose your plan">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-3xl border border-ink/8 bg-white shadow-xl shadow-ink/5">
            <div
              className="h-1.5 w-full transition-colors duration-700"
              style={{ background: active.accent }}
            />
            <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-ink/40">
                  {active.name}
                </p>
                <p className="mt-1 text-sm text-ink/60">40g pouch (~16 servings)</p>

                {/* toggle */}
                <div className="mt-5 inline-flex rounded-full border border-ink/10 bg-pale/60 p-1 text-sm">
                  {(["subscribe", "one-time"] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPlan(p)}
                      className="relative rounded-full px-4 py-1.5 font-medium transition-colors"
                      style={{ color: plan === p ? "#FAF7F0" : "#1F2419" }}
                    >
                      {plan === p && (
                        <motion.span
                          layoutId="plan-pill"
                          className="absolute inset-0 rounded-full transition-colors duration-700"
                          style={{ background: active.accent }}
                          transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10">
                        {p === "subscribe" ? "Subscribe & save" : "One-time"}
                      </span>
                    </button>
                  ))}
                </div>

                <ul className="mt-5 space-y-2 text-sm text-ink/70">
                  <li className="flex items-center gap-2">
                    <Dot accent={active.accent} /> Free UK delivery, every month
                  </li>
                  <li className="flex items-center gap-2">
                    <Dot accent={active.accent} /> Swap flavour or skip any time
                  </li>
                  <li className="flex items-center gap-2">
                    <Dot accent={active.accent} />{" "}
                    {plan === "subscribe" ? "Cancel anytime, no fuss" : "No commitment"}
                  </li>
                </ul>
              </div>

              {/* price card */}
              <div className="flex flex-col justify-between rounded-2xl bg-cream p-5">
                <div>
                  <div className="flex items-baseline gap-1">
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={`${plan}-${price}`}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -14 }}
                        transition={{ duration: 0.28 }}
                        className="font-display text-5xl font-semibold text-ink"
                      >
                        £{price}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-sm text-ink/50">
                      {plan === "subscribe" ? "/month" : "one-off"}
                    </span>
                  </div>

                  <AnimatePresence mode="wait">
                    {plan === "subscribe" ? (
                      <motion.p
                        key="sub-save"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mt-2 text-sm"
                      >
                        <span
                          className="rounded-full px-2 py-0.5 text-xs font-semibold text-cream"
                          style={{ background: active.accent }}
                        >
                          Save {savingPct}%*
                        </span>{" "}
                        <span className="text-ink/50">
                          vs {active.oneTime} one-off · cancel anytime
                        </span>
                      </motion.p>
                    ) : (
                      <motion.p
                        key="one-save"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mt-2 text-sm text-ink/50"
                      >
                        Subscribe instead and pay just £{SUBSCRIBE_PRICE}/month.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={addToCart}
                  className="mt-5 w-full rounded-xl py-3 text-sm font-semibold text-cream shadow-lg transition-transform active:scale-[0.98]"
                  style={{
                    background: active.accent,
                    boxShadow: `0 14px 30px -12px ${active.accent}`,
                  }}
                >
                  {added ? "Added ✓" : `Add ${active.name} — £${price}`}
                </button>
                <p className="mt-2 text-center text-[11px] text-ink/35">
                  *Savings shown are SAMPLE figures for this demo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- BENEFITS ---------- */}
      <section className="px-5 pb-14 sm:px-8" aria-label="Benefits">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              "Energy that actually lasts",
              "Clarity without the crash",
              "Calm focus. All day.",
              "Good for your skin, too.",
            ].map((b, i) => (
              <motion.div
                key={b}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-ink/8 bg-white/60 p-4"
              >
                <span
                  className="grid h-8 w-8 place-items-center rounded-lg text-cream"
                  style={{ background: active.accent }}
                >
                  <Leaf />
                </span>
                <p className="mt-3 text-sm font-medium leading-snug text-ink">{b}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- SOURCING TRUST BLOCK ---------- */}
      <section className="px-5 pb-14 sm:px-8" aria-label="Sourcing">
        <div className="mx-auto max-w-5xl">
          <div
            className="relative overflow-hidden rounded-3xl p-7 sm:p-10"
            style={{ background: active.accentSoft }}
          >
            <div className="relative z-10 max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: active.accent }}>
                Sourced from Uji, Japan
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink">
                100% Japanese ceremonial grade
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
                Every pouch is single-origin, first-harvest leaf from the hills of Uji —
                the home of ceremonial matcha for over 800 years. Stone-milled, shade-grown,
                and never blended down. That&rsquo;s the difference you taste.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Gluten-free", "Vegan", "Organic"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border bg-white/70 px-3 py-1 text-xs font-medium text-ink"
                    style={{ borderColor: active.accent }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs text-ink/45">Gluten-free, vegan, organic.</p>
            </div>
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full opacity-30 blur-2xl transition-colors duration-700"
              style={{ background: active.accent }}
            />
          </div>
        </div>
      </section>

      {/* ---------- FOUNDING MEMBER + SAMPLE REVIEW ---------- */}
      <section className="px-5 pb-28 sm:px-8" aria-label="Founding members">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
          <div
            className="relative overflow-hidden rounded-3xl p-7 text-cream"
            style={{ background: active.accent }}
          >
            <span className="shimmer absolute inset-0" />
            <p className="relative text-xs font-semibold uppercase tracking-widest opacity-90">
              Founding Member
            </p>
            <h3 className="relative mt-3 font-display text-2xl font-semibold leading-tight">
              Join the first 500 — perks worth up to £204
            </h3>
            <p className="relative mt-2 text-sm leading-relaxed text-cream/85">
              Lock in founding-member pricing, a free ceremonial whisk, and early access to
              every new flavour. £22/month, cancel anytime.
            </p>
            <p className="relative mt-3 text-[11px] text-cream/60">
              &ldquo;worth up to £204&rdquo; is a SAMPLE first-year perk value for this demo.
            </p>
          </div>

          <div className="flex flex-col justify-center rounded-3xl border border-ink/8 bg-white p-7">
            <div className="flex items-center gap-1" aria-hidden>
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} style={{ color: active.accent }}>
                  ★
                </span>
              ))}
              <span className="ml-2 text-xs font-medium text-ink/40">
                4.9 · 312 reviews (SAMPLE)
              </span>
            </div>
            <p className="mt-3 font-display text-lg italic leading-snug text-ink">
              &ldquo;The first matcha that actually tastes like a treat and still gives me
              steady, calm energy. The Strawberry Whirl is unreal.&rdquo;
            </p>
            <p className="mt-3 text-sm text-ink/50">— Maya R., founding member (SAMPLE review)</p>
          </div>
        </div>
      </section>

      {/* ---------- STICKY MOBILE ADD-TO-CART BAR ---------- */}
      <AnimatePresence>
        {barVisible && (
          <motion.div
            initial={{ y: 90 }}
            animate={{ y: 0 }}
            exit={{ y: 90 }}
            transition={{ type: "spring", stiffness: 360, damping: 34 }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-cream/95 px-4 py-3 backdrop-blur-md"
          >
            <div className="mx-auto flex max-w-5xl items-center gap-3">
              <span
                className="h-9 w-9 flex-shrink-0 rounded-full ring-2 ring-white transition-colors duration-500"
                style={{
                  background: `linear-gradient(140deg, ${active.pouchTop}, ${active.pouchBottom})`,
                }}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">{active.name}</p>
                <p className="text-[11px] text-ink/45">
                  {plan === "subscribe" ? `£${SUBSCRIBE_PRICE}/month · cancel anytime` : `£${oneTimePrice} one-off`}
                </p>
              </div>
              <button
                onClick={() => setDrawerOpen(true)}
                className="relative rounded-xl border border-ink/10 px-3 py-2 text-sm font-medium text-ink"
                aria-label="View cart"
              >
                Cart
                {cartCount > 0 && (
                  <span
                    className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11px] font-semibold text-cream transition-colors duration-500"
                    style={{ background: active.accent }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={addToCart}
                className="flex-shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold text-cream transition-transform active:scale-95"
                style={{ background: active.accent }}
              >
                {added ? "Added ✓" : `Add · £${price}`}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- CART DRAWER ---------- */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-ink/30 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed inset-y-0 right-0 z-50 flex w-[88vw] max-w-sm flex-col bg-cream shadow-2xl"
              aria-label="Cart"
            >
              <div className="flex items-center justify-between border-b border-ink/8 px-5 py-4">
                <h3 className="font-display text-lg font-semibold text-ink">Your ritual</h3>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-full p-1 text-ink/50 hover:text-ink"
                  aria-label="Close cart"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-4">
                {cart.length === 0 ? (
                  <p className="mt-10 text-center text-sm text-ink/45">
                    Your cart is empty.
                    <br />
                    Pick a flavour to begin your ritual.
                  </p>
                ) : (
                  <ul className="space-y-3">
                    <AnimatePresence initial={false}>
                      {cart.map((item) => (
                        <motion.li
                          key={item.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="flex items-center gap-3 rounded-2xl border border-ink/8 bg-white p-3"
                        >
                          <span
                            className="h-10 w-10 flex-shrink-0 rounded-full"
                            style={{ background: `linear-gradient(140deg, ${active.pouchTop}, ${active.pouchBottom})` }}
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-ink">{item.name}</p>
                            <p className="text-[11px] text-ink/45">
                              {item.plan === "subscribe" ? "Subscription · £" + item.price + "/mo" : "One-time · £" + item.price}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-ink/40 hover:text-ink"
                            aria-label={`Remove ${item.name}`}
                          >
                            Remove
                          </button>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                )}
              </div>

              <div className="border-t border-ink/8 px-5 py-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink/60">Total</span>
                  <span className="font-display text-xl font-semibold text-ink">£{cartTotal}</span>
                </div>
                <button
                  disabled={cart.length === 0}
                  className="mt-3 w-full rounded-xl py-3 text-sm font-semibold text-cream transition disabled:opacity-40"
                  style={{ background: active.accent }}
                >
                  Checkout (demo)
                </button>
                <p className="mt-2 text-center text-[11px] text-ink/35">
                  Demo storefront · sample data only
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function Dot({ accent }: { accent: string }) {
  return <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />;
}

function Leaf() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3c5 1.5 7.5 5 6.5 11C13 13 10.5 9.5 12 3Z"
        fill="currentColor"
        opacity="0.95"
      />
      <path d="M12 4v9" stroke="#5A6B3B" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

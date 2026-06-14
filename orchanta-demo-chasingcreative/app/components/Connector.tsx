"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Step = "connect" | "authorizing" | "connected";
type Tab = "health" | "products" | "plan";

const ease = [0.22, 1, 0.36, 1] as const;

const SCOPES = [
  { scope: "read_products", why: "Read the catalog to build production plans" },
  { scope: "read_inventory", why: "Reflect what is in stock when planning shoots" },
  { scope: "read_content", why: "Pull store content and brand assets" },
];

const PRODUCTS = [
  { name: "Trailhead Jacket", price: "$148", sku: "TRL-JKT-01", tone: "#3d5a3e", i: "T" },
  { name: "Summit Hoodie", price: "$92", sku: "SMT-HD-04", tone: "#425237", i: "S" },
  { name: "Daybreak Tee", price: "$36", sku: "DAY-TEE-12", tone: "#8a9a6b", i: "D" },
  { name: "Range Cap", price: "$28", sku: "RNG-CAP-02", tone: "#6b6f66", i: "R" },
  { name: "Field Tote", price: "$54", sku: "FLD-TOT-07", tone: "#c08a3e", i: "F" },
  { name: "Ridgeline Bottle", price: "$32", sku: "RDG-BTL-03", tone: "#2f4731", i: "R" },
];

const CHECKS = [
  { label: "OAuth install · online token", note: "Authorization code grant, encrypted at rest", tag: "Ready" },
  { label: "Offline access token", note: "Background product sync after install", tag: "Ready" },
  { label: "HMAC request verification", note: "Every request and callback signature checked", tag: "Ready" },
  { label: "App Bridge session tokens", note: "Embedded auth inside the Shopify admin", tag: "Ready" },
  { label: "Webhook · app/uninstalled", note: "Cleans up store data on uninstall", tag: "Subscribed" },
  { label: "GDPR · customers/data_request", note: "Mandatory compliance webhook", tag: "Subscribed" },
  { label: "GDPR · customers/redact", note: "Mandatory compliance webhook", tag: "Subscribed" },
  { label: "GDPR · shop/redact", note: "Mandatory compliance webhook", tag: "Subscribed" },
  { label: "Product sync · create / update", note: "Catalog stays in step with the store", tag: "Active" },
  { label: "TLS · valid SSL certificate", note: "Required for App Store review", tag: "Ready" },
];

const PLAN = [
  { scene: "Scene 01 · Trailhead", shots: "Hero pack shot of the Trailhead Jacket, three angles, natural light" },
  { scene: "Scene 02 · On the move", shots: "Summit Hoodie and Range Cap, walking b-roll at 60 and 24 fps" },
  { scene: "Scene 03 · Studio flatlay", shots: "Daybreak Tee and Field Tote, top-down on a brand-green backdrop" },
];

function Check() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest text-cream">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </span>
  );
}

export default function Connector() {
  const [step, setStep] = useState<Step>("connect");
  const [tab, setTab] = useState<Tab>("health");
  const [planOpen, setPlanOpen] = useState(false);

  return (
    <div className="relative">
      {/* device card */}
      <div className="overflow-hidden rounded-[26px] border border-app-line bg-app text-ink shadow-[0_50px_120px_-30px_rgba(0,0,0,0.7)]">
        {/* top bar */}
        <div className="flex items-center justify-between border-b border-app-line bg-white/60 px-5 py-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-forest">
              <svg width="13" height="13" viewBox="0 0 48 48"><path d="M20 16.5 L34 24 L20 31.5 Z" fill="#f7f3ec" /></svg>
            </span>
            <span className="text-[12.5px] font-semibold text-ink/80">chasing-creative-demo.myshopify.com</span>
          </div>
          <span className="hidden items-center gap-1.5 rounded-full bg-forest/10 px-2.5 py-1 text-[11px] font-semibold text-forest sm:flex">
            <span className={`h-1.5 w-1.5 rounded-full ${step === "connected" ? "bg-forest" : "bg-amber"}`} />
            {step === "connected" ? "Connected" : "Not connected"}
          </span>
        </div>

        <div className="min-h-[420px]">
          <AnimatePresence mode="wait">
            {/* CONNECT */}
            {step === "connect" && (
              <motion.div
                key="connect"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease }}
                className="p-7 sm:p-10"
              >
                <p className="eyebrow text-[11px] font-semibold text-forest">Step one</p>
                <h3 className="font-display mt-3 text-[26px] font-semibold leading-tight text-ink sm:text-[30px]">
                  Connect your Shopify store
                </h3>
                <p className="mt-3 max-w-md text-[14px] leading-relaxed text-ink/55">
                  One install, then Productions AI reads the catalog and keeps it in sync on its own.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {SCOPES.map((s) => (
                    <span key={s.scope} className="rounded-full border border-app-line bg-white px-3 py-1.5 text-[12px] font-medium text-olive">
                      <code className="font-semibold text-forest">{s.scope}</code>
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setStep("authorizing")}
                  className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-forest px-6 py-3.5 text-[14px] font-semibold text-cream transition-all hover:bg-olive hover:shadow-lg"
                >
                  Connect your Shopify store
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </button>
              </motion.div>
            )}

            {/* AUTHORIZING */}
            {step === "authorizing" && (
              <motion.div
                key="auth"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease }}
                className="flex min-h-[420px] items-center justify-center p-7 sm:p-10"
              >
                <div className="w-full max-w-sm rounded-2xl border border-app-line bg-white p-6 shadow-sm">
                  <p className="eyebrow text-[10.5px] font-semibold text-ink/40">Shopify · install</p>
                  <h4 className="font-display mt-2 text-[18px] font-semibold leading-snug text-ink">
                    Productions AI wants to access your store
                  </h4>
                  <ul className="mt-4 space-y-2">
                    {SCOPES.map((s) => (
                      <li key={s.scope} className="flex items-start gap-2.5 text-[13px]">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />
                        <span className="text-ink/70"><code className="font-semibold text-forest">{s.scope}</code> · {s.why}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => {
                      setTimeout(() => setStep("connected"), 1050);
                    }}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-forest px-5 py-3 text-[14px] font-semibold text-cream transition-colors hover:bg-olive"
                  >
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                      className="inline-block h-4 w-4 rounded-full border-2 border-cream/40 border-t-cream"
                    />
                    Install app
                  </button>
                  <p className="mt-3 text-center text-[11px] text-ink/40">Mocked consent · no real store is contacted</p>
                </div>
              </motion.div>
            )}

            {/* CONNECTED */}
            {step === "connected" && (
              <motion.div
                key="connected"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex flex-col gap-2 border-b border-app-line bg-forest/5 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <motion.span
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 240, damping: 14 }}
                    >
                      <Check />
                    </motion.span>
                    <div>
                      <p className="text-[14px] font-bold text-ink">Store connected</p>
                      <p className="text-[11.5px] text-ink/50">6 products synced · last sync just now</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setStep("connect"); setPlanOpen(false); }}
                    className="self-start rounded-lg border border-app-line bg-white px-3 py-1.5 text-[12px] font-semibold text-olive hover:border-forest sm:self-auto"
                  >
                    Reset
                  </button>
                </div>

                {/* tabs */}
                <div className="flex gap-1 border-b border-app-line px-4 pt-3">
                  {([["health", "Readiness"], ["products", "Synced products"], ["plan", "Production plan"]] as [Tab, string][]).map(([t, label]) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`relative rounded-t-lg px-4 py-2.5 text-[13px] font-semibold transition-colors ${
                        tab === t ? "text-forest" : "text-ink/45 hover:text-ink"
                      }`}
                    >
                      {label}
                      {tab === t && <motion.span layoutId="tab" className="absolute -bottom-px left-2 right-2 h-0.5 rounded bg-forest" />}
                    </button>
                  ))}
                </div>

                <div className="p-6 sm:p-7">
                  {tab === "health" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h3 className="font-display text-[18px] font-semibold text-ink">App Store submission readiness</h3>
                          <p className="mt-1 text-[12.5px] text-ink/50">The exact gates Shopify reviews against, each handled.</p>
                        </div>
                        <div className="flex items-center gap-2 rounded-full bg-forest px-3.5 py-1.5 text-cream">
                          <span className="text-[15px] font-bold">10/10</span>
                          <span className="text-[11px] opacity-80">passing</span>
                        </div>
                      </div>
                      <motion.ul
                        className="mt-5 divide-y divide-app-line overflow-hidden rounded-2xl border border-app-line"
                        initial="hidden"
                        animate="show"
                        variants={{ show: { transition: { staggerChildren: 0.06 } } }}
                      >
                        {CHECKS.map((c) => (
                          <motion.li
                            key={c.label}
                            variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}
                            className="flex items-center justify-between gap-4 bg-white px-4 py-3"
                          >
                            <div className="flex items-center gap-3">
                              <Check />
                              <div>
                                <p className="text-[13.5px] font-semibold text-ink">{c.label}</p>
                                <p className="text-[12px] text-ink/50">{c.note}</p>
                              </div>
                            </div>
                            <span className="shrink-0 rounded-full bg-forest/10 px-2.5 py-1 text-[11px] font-semibold text-forest">{c.tag}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.div>
                  )}

                  {tab === "products" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <h3 className="font-display text-[18px] font-semibold text-ink">Synced from the store</h3>
                      <p className="mt-1 text-[12.5px] text-ink/50">Pulled via read_products. The catalog Productions AI plans against.</p>
                      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {PRODUCTS.map((p, i) => (
                          <motion.div
                            key={p.sku}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="overflow-hidden rounded-xl border border-app-line bg-white"
                          >
                            <div className="flex h-24 items-center justify-center font-display text-[26px] font-bold text-cream" style={{ background: p.tone }}>
                              {p.i}
                            </div>
                            <div className="p-3">
                              <p className="truncate text-[13px] font-semibold text-ink">{p.name}</p>
                              <p className="mt-0.5 text-[11.5px] text-ink/45">{p.sku}</p>
                              <p className="mt-1 text-[13px] font-bold text-forest">{p.price}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {tab === "plan" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <h3 className="font-display text-[18px] font-semibold text-ink">From catalog to production plan</h3>
                      <p className="mt-1 max-w-lg text-[12.5px] leading-relaxed text-ink/55">
                        Where the connector pays off. The synced catalog feeds straight into what
                        Productions AI already does best: turning inputs into a pre-production plan.
                      </p>
                      {!planOpen ? (
                        <button
                          onClick={() => setPlanOpen(true)}
                          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-amber px-5 py-3 text-[14px] font-semibold text-ink transition-transform hover:-translate-y-0.5"
                        >
                          Generate production plan from these products
                        </button>
                      ) : (
                        <motion.div className="mt-5 space-y-3" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
                          {PLAN.map((s) => (
                            <motion.div
                              key={s.scene}
                              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                              className="rounded-xl border border-app-line bg-white p-4"
                            >
                              <p className="text-[13.5px] font-bold text-olive">{s.scene}</p>
                              <p className="mt-1 text-[13px] text-ink/60">{s.shots}</p>
                            </motion.div>
                          ))}
                          <p className="text-[11.5px] text-ink/40">Illustrative plan generated from the synced demo catalog.</p>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

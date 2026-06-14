"use client";

import { motion } from "framer-motion";
import Connector from "./components/Connector";

const ease = [0.22, 1, 0.36, 1] as const;
const up = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.1 + i * 0.1, ease } }),
};

const WHY = [
  {
    t: "Pass review the first time",
    b: "Every gate Shopify checks, handled up front: HMAC, the mandatory GDPR webhooks, token handling, embedded auth.",
    icon: (
      <path d="M20 6 9 17l-5-5" />
    ),
  },
  {
    t: "Stay in sync, quietly",
    b: "Install once. Product create and update webhooks keep the catalog current with no manual re-imports.",
    icon: (
      <>
        <path d="M21 12a9 9 0 1 1-3-6.7" />
        <path d="M21 4v5h-5" />
      </>
    ),
  },
  {
    t: "Feeds your real product",
    b: "The synced catalog flows straight into Productions AI, turning a connected store into a pre-production plan.",
    icon: (
      <>
        <path d="M5 3v18" />
        <path d="M5 8h11l-2-3 2-3" />
      </>
    ),
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* concept strip */}
      <div className="relative z-50 border-b border-white/10 bg-black/40 text-center text-[11px] font-medium tracking-wide text-cream/70">
        <div className="mx-auto max-w-6xl px-4 py-2">
          Concept by Orchanta for Chasing Creative · an interactive idea, not a live Shopify app
        </div>
      </div>

      {/* HERO */}
      <section className="glow relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
            {/* left: copy */}
            <div>
              <motion.p custom={0} variants={up} initial="hidden" animate="show" className="eyebrow flex items-center gap-2.5 text-[11.5px] font-semibold text-sage">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-sage" />
                Chasing Creative · Productions AI
              </motion.p>

              <motion.h1 custom={1} variants={up} initial="hidden" animate="show" className="font-display mt-6 text-[40px] font-semibold leading-[1.02] tracking-[-0.02em] text-cream sm:text-[58px]">
                A Shopify connector,
                <br />
                built <span className="text-sage">rock solid.</span>
              </motion.h1>

              <motion.p custom={2} variants={up} initial="hidden" animate="show" className="mt-7 max-w-md text-[16px] leading-relaxed text-mutedark">
                A working concept of how the store connector for Chasingcreative.ai could behave end to
                end, the install, the product sync, and every check the App Store reviews against.
              </motion.p>

              <motion.div custom={3} variants={up} initial="hidden" animate="show" className="mt-9 flex flex-wrap items-center gap-5">
                <a href="#connector" className="group inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3.5 text-[14px] font-semibold text-canvas transition-colors hover:bg-sage">
                  Try the connector
                  <span className="transition-transform group-hover:translate-y-0.5">↓</span>
                </a>
                <span className="text-[13px] text-mutedark">Mocked data · no real store</span>
              </motion.div>

              <motion.div custom={4} variants={up} initial="hidden" animate="show" className="mt-10 flex items-center gap-6 border-t border-white/10 pt-6 text-[12.5px] text-mutedark">
                <span><span className="font-semibold text-cream">10/10</span> review gates</span>
                <span><span className="font-semibold text-cream">3</span> GDPR webhooks</span>
                <span><span className="font-semibold text-cream">1</span> click to sync</span>
              </motion.div>
            </div>

            {/* right: live connector */}
            <motion.div
              id="connector"
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.35, ease }}
              className="scroll-mt-20"
            >
              <Connector />
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="border-t border-white/10 bg-canvas2">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
            className="font-display max-w-xl text-[26px] font-semibold leading-tight tracking-[-0.01em] text-cream sm:text-[34px]"
          >
            What a rock-solid connector actually buys you.
          </motion.h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-3">
            {WHY.map((w, i) => (
              <motion.div
                key={w.t}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease }}
                className="bg-canvas2 p-8"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest/25 text-sage">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {w.icon}
                  </svg>
                </span>
                <h3 className="mt-6 text-[16.5px] font-semibold text-cream">{w.t}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-mutedark">{w.b}</p>
              </motion.div>
            ))}
          </div>

          <p className="mt-12 max-w-2xl text-[13px] leading-relaxed text-mutedark">
            Built by Orchanta as a concept for Blake at Chasing Creative. All data is mocked and no real
            store, tokens, or Shopify connection are used. The point is to show how we would take the
            connector to App-Store-ready, not to stand in for the real build.
          </p>
        </div>
      </section>
    </div>
  );
}

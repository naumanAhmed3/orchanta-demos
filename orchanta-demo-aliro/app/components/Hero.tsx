"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const lineUp = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: 0.15 + i * 0.12, ease },
  }),
};

export default function Hero() {
  return (
    <section className="mesh relative overflow-hidden border-b border-hairline">
      {/* faint editorial column lines */}
      <div className="hairline-grid pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-20 sm:px-8 sm:pb-32 sm:pt-28">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <motion.p
              custom={0}
              variants={lineUp}
              initial="hidden"
              animate="show"
              className="eyebrow flex items-center gap-3 text-[12px] font-semibold text-indigo"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo" />
              Healthcare advisory · Vietnam &amp; ASEAN
            </motion.p>

            <h1 className="font-display mt-7 text-[40px] font-medium leading-[1.04] tracking-[-0.01em] text-ink sm:text-[68px]">
              <motion.span custom={1} variants={lineUp} initial="hidden" animate="show" className="block">
                <span className="italic text-indigo">Access</span> to healthcare
              </motion.span>
              <motion.span custom={2} variants={lineUp} initial="hidden" animate="show" className="block">
                growth across Vietnam
              </motion.span>
              <motion.span custom={3} variants={lineUp} initial="hidden" animate="show" className="block">
                and ASEAN.
              </motion.span>
            </h1>

            <motion.p
              custom={4}
              variants={lineUp}
              initial="hidden"
              animate="show"
              className="mt-8 max-w-xl text-[16px] leading-relaxed text-muted sm:text-[17.5px]"
            >
              A strategy-first advisory firm for organisations moving with precision in the region.
              From market entry to long-term partnerships, we make complex markets navigable.
            </motion.p>

            <motion.div
              custom={5}
              variants={lineUp}
              initial="hidden"
              animate="show"
              className="mt-10 flex flex-wrap items-center gap-5"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-indigo px-7 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-indigo-deep"
              >
                Start a conversation
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
              <Link
                href="/who-we-are"
                className="text-[14px] font-semibold text-ink underline decoration-indigo/40 decoration-1 underline-offset-[6px] transition-colors hover:decoration-indigo"
              >
                Who we are
              </Link>
            </motion.div>
          </div>

          {/* right meta rail */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="hidden border-l border-hairline pl-7 lg:block"
          >
            <dl className="space-y-7 text-[13px]">
              {[
                ["Established", "2018"],
                ["Based in", "Ho Chi Minh City"],
                ["Footprint", "Vietnam & ASEAN"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="eyebrow text-[10.5px] font-semibold text-muted">{k}</dt>
                  <dd className="font-display mt-1.5 text-[20px] text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

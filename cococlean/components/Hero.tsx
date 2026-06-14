"use client";

import { motion } from "framer-motion";

const props = ["Fragrance free", "Zero plastics", "Biodegradable"];

export function Hero({ onShop }: { onShop: () => void }) {
  return (
    <section className="relative overflow-hidden bg-petrol texture-deep pt-28 pb-20 sm:pt-32 sm:pb-28">
      {/* ambient bubbles */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {[
          { l: "8%", t: "30%", s: 70, d: 0 },
          { l: "82%", t: "22%", s: 48, d: 1.2 },
          { l: "70%", t: "62%", s: 90, d: 0.6 },
          { l: "20%", t: "70%", s: 38, d: 1.8 },
          { l: "90%", t: "55%", s: 26, d: 0.9 },
        ].map((b, i) => (
          <span
            key={i}
            className="bubble"
            style={{
              left: b.l,
              top: b.t,
              width: b.s,
              height: b.s,
              animation: `float-bob ${5 + b.d}s ease-in-out ${b.d}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-pill border border-cyan/40 bg-petrol-2/60 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-cyan-soft"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            Plastic-free laundry
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="display-tight mt-5 text-[clamp(2.9rem,9vw,5.6rem)] font-semibold text-cream"
          >
            Cleans Like
            <br />
            A{" "}
            <span className="relative inline-block text-cyan">
              Dream
              <motion.svg
                viewBox="0 0 220 22"
                className="absolute -bottom-2 left-0 w-full text-cyan-soft"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.7 }}
              >
                <motion.path
                  d="M4 14C46 6 110 4 158 9c24 2.6 44 6 58 4"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-cream/80 lg:mx-0"
          >
            Only half a TBSP for regular loads. Really! Coco Clean replaces the
            jug with a powder that works in HE washers and hard water.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-7 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
          >
            <button
              onClick={onShop}
              className="w-full rounded-pill bg-cyan px-7 py-3.5 text-base font-extrabold text-petrol shadow-soft transition hover:bg-cyan-soft active:scale-95 sm:w-auto"
            >
              Shop the powder
            </button>
            <a
              href="#difference"
              className="w-full rounded-pill border border-cream/30 px-7 py-3.5 text-center text-base font-bold text-cream transition hover:border-cyan hover:text-cyan sm:w-auto"
            >
              Why it&apos;s different
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-bold text-cream/85 lg:justify-start"
          >
            {props.map((p) => (
              <li key={p} className="inline-flex items-center gap-2">
                <svg viewBox="0 0 20 20" className="h-4 w-4 text-cyan" fill="none">
                  <path
                    d="M4 10.5l3.5 3.5L16 5.5"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {p}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Cinematic powder → water wash */}
        <HeroWash />
      </div>
    </section>
  );
}

function HeroWash() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.15 }}
      className="relative mx-auto aspect-square w-full max-w-[420px]"
    >
      {/* Glass jar */}
      <div className="absolute inset-0 overflow-hidden rounded-[2.4rem] border border-cyan/25 bg-petrol-2/40 backdrop-blur-sm shadow-card">
        {/* rising clean-water wash */}
        <div
          className="absolute inset-x-0 bottom-0 h-[72%]"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,184,222,0.0) 0%, rgba(0,184,222,0.55) 35%, rgba(2,63,81,0.92) 100%)",
            animation: "wash-rise 1.6s cubic-bezier(.22,.8,.3,1) 0.5s both",
          }}
        >
          {/* wash surface ripples */}
          <span
            className="absolute left-1/2 top-1 h-16 w-16 -translate-x-1/2 rounded-full border-2 border-cyan-soft/60"
            style={{ animation: "ripple-out 2.4s ease-out 1.6s infinite" }}
          />
          <span
            className="absolute left-[35%] top-2 h-10 w-10 rounded-full border-2 border-cyan-soft/40"
            style={{ animation: "ripple-out 2.8s ease-out 2.1s infinite" }}
          />
        </div>

        {/* the half-tablespoon scoop of powder, dissolving */}
        <div className="absolute left-1/2 top-7 -translate-x-1/2 text-center">
          <div className="relative mx-auto h-16 w-28">
            {/* scoop */}
            <div className="absolute left-1/2 top-0 h-12 w-24 -translate-x-1/2 rounded-b-[1.6rem] rounded-t-md border-2 border-cyan-soft/70 bg-cream/95" />
            <div className="absolute left-1/2 top-1 h-3 w-16 -translate-x-1/2 rounded-full bg-cream" />
            {/* falling powder grains */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className="absolute top-11 h-1.5 w-1.5 rounded-full bg-cream-2"
                style={{
                  left: `${30 + i * 9}%`,
                  animation: `powder-fall ${1.6 + (i % 3) * 0.3}s ease-in ${
                    0.2 + i * 0.12
                  }s infinite`,
                }}
              />
            ))}
          </div>
          <div className="mt-2 rounded-pill bg-petrol/70 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cyan-soft">
            ½ TBSP · that&apos;s it
          </div>
        </div>
      </div>

      {/* floating product chip */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-5 -left-3 flex items-center gap-2 rounded-2xl bg-cream px-4 py-3 shadow-card sm:-left-6"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan/15 text-lg">
          🌊
        </span>
        <div className="leading-tight">
          <div className="text-sm font-extrabold text-petrol">80-load bundle</div>
          <div className="text-xs font-semibold text-ink/55">$29 · plastic-free</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

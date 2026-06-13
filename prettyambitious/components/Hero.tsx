"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  BIO_CHIP,
  BYLINE,
  NEWSLETTER_LINE,
  PARTNERS,
  TAGLINE,
  WORDMARK,
} from "./content";

export default function Hero({ reduce }: { reduce: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [notified, setNotified] = useState(false);

  // Portrait parallax (gated behind reduced motion)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -64]);
  const portraitScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, reduce ? 1 : 1.06]
  );

  // Magnetic "Notify me" button
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 14 });
  const sy = useSpring(my, { stiffness: 220, damping: 14 });
  const onMagnet = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 18);
    my.set(((e.clientY - (r.top + r.height / 2)) / r.height) * 14);
  };
  const resetMagnet = () => {
    mx.set(0);
    my.set(0);
  };

  const revealUp = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 26 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <section
      ref={sectionRef}
      className="paper-grain relative overflow-hidden px-5 pt-10 pb-16 sm:pt-14"
    >
      <div className="mx-auto max-w-6xl">
        {/* ---- Magazine nameplate ---- */}
        <div className="border-y hairline py-5 sm:py-7">
          <div className="overflow-hidden">
            <motion.h1
              className="font-display leading-[0.92] text-ink"
              style={{ fontSize: "var(--text-masthead)" }}
              initial={
                reduce
                  ? { opacity: 0 }
                  : { clipPath: "inset(0 100% 0 0)", opacity: 0, y: 18 }
              }
              animate={
                reduce
                  ? { opacity: 1 }
                  : { clipPath: "inset(0 0% 0 0)", opacity: 1, y: 0 }
              }
              transition={{ duration: reduce ? 0.2 : 1.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="block text-center tracking-[0.04em] sm:tracking-[0.07em]">
                {WORDMARK}
              </span>
            </motion.h1>
          </div>
          <motion.p
            className="mt-3 text-center text-[11px] uppercase tracking-[0.42em] text-muted sm:text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduce ? 0 : 0.7, duration: 0.6 }}
          >
            {BYLINE}
          </motion.p>
        </div>

        {/* ---- Editorial split ---- */}
        <div className="mt-10 grid items-center gap-10 lg:mt-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.p
              className="text-xs uppercase tracking-[0.3em] text-terracotta"
              {...revealUp}
              transition={{ delay: reduce ? 0 : 0.85, duration: 0.6 }}
            >
              The website · the design system · one brand
            </motion.p>

            <motion.h2
              className="font-display mt-4 leading-[1.02] text-ink"
              style={{ fontSize: "var(--text-h1)" }}
              {...revealUp}
              transition={{ delay: reduce ? 0 : 0.95, duration: 0.7 }}
            >
              Too ambitious, too restless,{" "}
              <span className="italic text-terracotta">&lsquo;too much&rsquo;</span>{" "}
              — and finally,{" "}
              <span className="relative whitespace-nowrap">
                one brand
                <span
                  className="absolute -bottom-1 left-0 h-[3px] w-full"
                  style={{ background: "var(--accent)" }}
                />
              </span>
              .
            </motion.h2>

            <motion.p
              className="mt-6 max-w-md text-base leading-relaxed text-ink-soft"
              {...revealUp}
              transition={{ delay: reduce ? 0 : 1.05, duration: 0.7 }}
            >
              {TAGLINE}
            </motion.p>

            {/* Notify field */}
            <motion.form
              className="mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                setNotified(true);
              }}
              {...revealUp}
              transition={{ delay: reduce ? 0 : 1.15, duration: 0.7 }}
            >
              <label className="sr-only" htmlFor="notify">
                Email address
              </label>
              <input
                id="notify"
                type="email"
                required
                placeholder="you@want-more.com"
                className="flex-1 border-b-2 border-ink/20 bg-transparent px-1 py-3 text-base text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-ink"
              />
              <div
                onMouseMove={onMagnet}
                onMouseLeave={resetMagnet}
                className="self-start"
              >
                <motion.button
                  type="submit"
                  style={{ x: sx, y: sy, backgroundColor: "var(--accent)" }}
                  className="rounded-[var(--demo-radius)] px-6 py-3 text-sm font-semibold tracking-wide text-paper shadow-sm"
                  whileTap={{ scale: 0.96 }}
                >
                  {notified ? "You're on the list ✦" : "Notify me"}
                </motion.button>
              </div>
            </motion.form>

            <motion.p
              className="mt-5 max-w-md text-sm text-muted"
              {...revealUp}
              transition={{ delay: reduce ? 0 : 1.25, duration: 0.7 }}
            >
              {NEWSLETTER_LINE}
            </motion.p>
          </div>

          {/* Portrait placeholder w/ parallax */}
          <motion.div
            className="relative mx-auto w-full max-w-sm"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: reduce ? 0 : 0.6, duration: 0.9 }}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--demo-radius)] border hairline">
              <motion.div
                style={{ y: portraitY, scale: portraitScale }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blush via-paper-2 to-[#e9ddcf]" />
                <div
                  className="absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-70 blur-2xl"
                  style={{ background: "var(--accent)" }}
                />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="font-display text-7xl leading-none text-ink">
                    A.
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.3em] text-ink-soft">
                    portrait — placeholder
                  </p>
                </div>
              </motion.div>
            </div>
            <div className="mt-4 rounded-[var(--demo-radius)] border hairline bg-paper px-4 py-3 text-center text-[13px] text-ink-soft">
              {BIO_CHIP}
            </div>
          </motion.div>
        </div>

        {/* Partner strip (illustrative) */}
        <motion.div
          className="mt-12 border-t hairline pt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-center text-[10px] uppercase tracking-[0.35em] text-muted">
            As seen across — illustrative
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {PARTNERS.map((p) => (
              <span
                key={p}
                className="font-display text-lg tracking-wide text-ink/55"
              >
                {p}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, type CSSProperties } from "react";

export default function Hero() {
  const layerA = useRef<HTMLDivElement | null>(null);
  const layerB = useRef<HTMLDivElement | null>(null);

  // Parallax-lite: gentle, transform-only, disabled for reduced motion.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (layerA.current) layerA.current.style.transform = `translate3d(0, ${y * 0.06}px, 0)`;
        if (layerB.current) layerB.current.style.transform = `translate3d(0, ${y * -0.045}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 95% at 12% 0%, #ffffff 0%, #fbf8f1 42%, #e7f2ec 100%)",
      }}
    >
      {/* Decorative floating layers */}
      <div ref={layerA} aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="float absolute -left-16 top-10 h-64 w-64 rounded-full bg-mint opacity-60 blur-2xl" />
        <div className="float-slow absolute right-[-4rem] top-24 h-72 w-72 rounded-full bg-sky-soft opacity-60 blur-2xl" />
      </div>
      <div ref={layerB} aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="breathe absolute bottom-[-3rem] left-1/3 h-56 w-56 rounded-full bg-mint-deep opacity-30 blur-3xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1180px] items-center gap-12 px-5 pb-20 pt-12 sm:px-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-28 lg:pt-16">
        {/* Copy */}
        <div className="hero-enter max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-mint-deep bg-shell/70 px-3.5 py-1.5 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-teal-deep">
            <span className="breathe inline-block h-2 w-2 rounded-full bg-teal" />
            our mental health matters
          </span>

          <h1 className="font-display mt-6 text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-ink text-balance sm:text-[3.4rem] lg:text-[3.9rem]">
            A gentle place to find{" "}
            <span className="sheen-text">support</span>, before the crisis.
          </h1>

          <p className="mt-5 max-w-lg text-pretty text-[1.1rem] leading-relaxed text-ink-soft">
            YouthWell empowers youth &amp; families across Santa Barbara County
            with tools to manage their mental wellness — and a caring village to
            help them navigate the journey.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#finder"
              className="lift inline-flex items-center gap-2 rounded-full bg-teal px-6 py-3.5 text-[1.02rem] font-extrabold text-shell shadow-[0_16px_34px_-16px_rgba(29,106,95,0.95)]"
            >
              Find support now
              <Arrow />
            </a>
            <a
              href="#pathways"
              className="inline-flex items-center gap-2 rounded-full border-2 border-teal px-5 py-3 text-[1.02rem] font-bold text-teal-deep transition-colors duration-200 hover:bg-mint"
            >
              Explore pathways
            </a>
          </div>

          <p className="mt-7 flex items-center gap-2.5 text-[0.98rem] font-semibold text-ink-soft">
            <ShieldHeart />
            No one should suffer in silence.
          </p>
        </div>

        {/* Illustration: a "village of support" */}
        <div className="relative">
          <VillageIllustration />
        </div>
      </div>

      {/* Soft wave divider */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 90"
        className="block h-[60px] w-full"
        preserveAspectRatio="none"
      >
        <path d="M0 60 C 280 110 520 10 760 40 C 1000 70 1220 20 1440 50 L1440 90 L0 90 Z" fill="#fffdf8" />
      </svg>
    </section>
  );
}

function VillageIllustration() {
  const dash = (len: number, delay?: string): CSSProperties =>
    ({ "--len": len, ...(delay ? { animationDelay: delay } : {}) }) as CSSProperties;

  return (
    <div className="hero-enter relative mx-auto w-full max-w-[460px]">
      <div className="relative rounded-[2rem] border border-mint-deep/50 bg-shell/80 p-6 shadow-[0_30px_70px_-34px_rgba(27,58,55,0.5)] backdrop-blur-sm">
        <svg viewBox="0 0 360 300" className="w-full" role="img" aria-label="A connected village of support around a young person">
          <defs>
            <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e7f2ec" />
              <stop offset="100%" stopColor="#fffdf8" />
            </linearGradient>
            <radialGradient id="hero-sun" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f4c95d" />
              <stop offset="100%" stopColor="#f4c95d" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect x="0" y="0" width="360" height="300" rx="18" fill="url(#hero-sky)" />
          <circle cx="296" cy="60" r="60" fill="url(#hero-sun)" className="breathe" />
          <circle cx="296" cy="60" r="18" fill="#f4c95d" />

          {/* connecting paths drawing in */}
          <g stroke="#8fc9ad" strokeWidth="2.4" fill="none" strokeLinecap="round">
            <path className="draw-path" style={dash(220)} d="M180 168 C 130 150 110 110 96 86" />
            <path className="draw-path" style={dash(220, "0.7s")} d="M180 168 C 232 152 250 112 268 90" />
            <path className="draw-path" style={dash(220, "1s")} d="M180 168 C 132 196 112 224 104 244" />
            <path className="draw-path" style={dash(220, "1.3s")} d="M180 168 C 232 196 252 222 262 244" />
          </g>

          {/* support nodes */}
          <Node x={96} y={80} fill="#5fa8cc" label="P" />
          <Node x={268} y={84} fill="#2c8c7e" label="S" />
          <Node x={104} y={250} fill="#e98a5b" label="E" />
          <Node x={262} y={250} fill="#8fc9ad" label="C" />

          {/* center: the young person + heart */}
          <circle cx="180" cy="168" r="40" fill="#2c8c7e" />
          <circle cx="180" cy="168" r="40" fill="none" stroke="#fffdf8" strokeWidth="3" opacity="0.7" />
          <path
            d="M180 188S162 176 162 163.5A4.9 4.9 0 0 1 180 159.5A4.9 4.9 0 0 1 198 163.5C198 176 180 188 180 188Z"
            fill="#fffdf8"
          />
        </svg>

        {/* floating stat chip */}
        <div className="float absolute -bottom-5 -left-3 flex items-center gap-3 rounded-2xl border border-mint-deep/60 bg-shell px-4 py-3 shadow-[0_18px_40px_-22px_rgba(27,58,55,0.55)]">
          <span className="font-display text-2xl font-bold text-teal">60+</span>
          <span className="text-[0.82rem] font-semibold leading-tight text-ink-soft">
            community partners,
            <br />
            one warm handoff
          </span>
        </div>
      </div>
    </div>
  );
}

function Node({ x, y, fill, label }: { x: number; y: number; fill: string; label: string }) {
  return (
    <g className="float-slow">
      <circle cx={x} cy={y} r="22" fill={fill} />
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fontSize="15"
        fontWeight="800"
        fill="#fffdf8"
        fontFamily="var(--font-sans)"
      >
        {label}
      </text>
    </g>
  );
}

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldHeart() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2.5 19 5v6c0 4.6-3 8.4-7 9.5-4-1.1-7-4.9-7-9.5V5l7-2.5Z" fill="#d6ecdf" stroke="#2c8c7e" strokeWidth="1.4" />
      <path d="M12 15.5s-3.2-2.1-3.2-4.3a1.8 1.8 0 0 1 3.2-1 1.8 1.8 0 0 1 3.2 1c0 2.2-3.2 4.3-3.2 4.3Z" fill="#2c8c7e" />
    </svg>
  );
}

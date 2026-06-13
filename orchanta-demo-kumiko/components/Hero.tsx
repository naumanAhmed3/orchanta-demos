"use client";

import { useState } from "react";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  function join(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim().length > 3 && email.includes("@")) setJoined(true);
  }

  return (
    <section className="hero-field relative overflow-hidden">
      {/* lash-curve motif, recreated as SVG — no store imagery is hotlinked */}
      <svg
        viewBox="0 0 600 220"
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-6 w-[26rem] text-lilac opacity-70 max-md:w-60"
      >
        <path d="M40 180 Q300 20 560 180" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M120 132 L96 84" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M220 96 L208 44" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M300 86 L298 32" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M380 96 L392 44" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M480 132 L504 84" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>

      <div className="relative mx-auto max-w-5xl px-5 pb-14 pt-16 md:pb-20 md:pt-24">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-violet">
          Designed in Los Angeles · Finished by hand
        </p>
        <h1 className="font-display mt-4 max-w-2xl text-5xl leading-[1.05] tracking-tight md:text-6xl">
          Handmade wispy lashes,{" "}
          <em className="text-flame">direct from the maker</em>
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-maroon/80">
          Three signature styles — Fairy, Princess, and Starlight — finished in
          small batches on thin flexible bands you can wear all day and reuse
          10–15 times.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#bestsellers"
            className="rounded-full bg-rust px-7 py-3.5 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-flame"
          >
            Shop bestsellers
          </a>
          <span className="text-sm text-maroon/70">
            $12.99 a pair · every style
          </span>
        </div>

        {/* First-order discount capture — simulated for the demo */}
        <div className="mt-10 max-w-lg rounded-2xl border border-line bg-cream/90 p-5 shadow-[0_8px_30px_rgba(118,30,11,0.07)]">
          {joined ? (
            <p className="fade-up text-sm leading-relaxed" role="status">
              <span className="font-display text-xl italic text-violet">
                You&apos;re on the list.
              </span>
              <br />
              Your first-order code would land in your inbox right about now.
              <span className="text-maroon/60">
                {" "}
                (Demo mode — nothing was stored or sent.)
              </span>
            </p>
          ) : (
            <>
              <p className="text-sm font-medium">
                Get 10% off your first order
                <span className="ml-2 text-xs font-normal text-maroon/60">
                  illustrative demo offer
                </span>
              </p>
              <form onSubmit={join} className="mt-3 flex gap-2 max-sm:flex-col">
                <label htmlFor="hero-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="hero-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="min-w-0 flex-1 rounded-full border border-line bg-white px-5 py-3 text-sm outline-none placeholder:text-maroon/40 focus:border-iris"
                />
                <button
                  type="submit"
                  className="rounded-full bg-maroon px-6 py-3 text-sm font-medium text-lilac transition-colors hover:bg-flame hover:text-cream"
                >
                  Claim 10% off
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

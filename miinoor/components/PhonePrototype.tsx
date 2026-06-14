"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import AiAssistant from "./AiAssistant";
import BuySheet from "./BuySheet";
import Reactions from "./Reactions";
import { TAGLINE, sellers, type Product } from "./data";

export default function PhonePrototype() {
  const [sellerIdx, setSellerIdx] = useState(0);
  const [active, setActive] = useState<Product | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const seller = sellers[sellerIdx];

  function showToast(label: string) {
    setToast(label);
    window.setTimeout(() => setToast(null), 2400);
  }

  function switchSeller(dir: 1 | -1) {
    setActive(null);
    setSellerIdx((i) => (i + dir + sellers.length) % sellers.length);
  }

  return (
    <div className="relative">
      {/* PHONE FRAME */}
      <div className="relative mx-auto w-[min(100vw,380px)] sm:w-[360px]">
        <div className="relative overflow-hidden rounded-[var(--radius-phone)] bg-black p-[10px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)] ring-1 ring-black/80 sm:p-3">
          {/* screen */}
          <div className="relative h-[720px] max-h-[82vh] overflow-hidden rounded-[2.1rem] bg-jet">
            {/* notch */}
            <div className="absolute left-1/2 top-2 z-50 h-6 w-32 -translate-x-1/2 rounded-full bg-black" />

            {/* ---- LIVE STREAM SCREEN ---- */}
            <AnimatePresence mode="wait">
              <motion.div
                key={seller.id}
                initial={{ opacity: 0, x: 36 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -36 }}
                transition={{ duration: 0.32, ease: "easeOut" }}
                className="absolute inset-0"
              >
                {/* animated stream backdrop (no real video file) */}
                <div
                  className="animate-live-drift absolute inset-0"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${seller.from}, ${seller.via}, ${seller.to})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/45" />

                <Reactions />

                {/* top bar */}
                <div className="absolute inset-x-0 top-0 z-30 flex items-center gap-2 px-4 pt-9">
                  <span className="flex items-center gap-1 rounded-full bg-red-600 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white">
                    <span className="h-2 w-2 animate-pulse-dot rounded-full bg-white" />
                    Live
                  </span>
                  <span className="rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                    👁 {seller.viewers}
                  </span>
                  <span className="ml-auto select-none text-lg font-extrabold lowercase tracking-tight text-gold drop-shadow">
                    mi<span className="text-black">i</span>noor
                  </span>
                </div>

                {/* seller identity */}
                <div className="absolute left-4 top-[68px] z-30 flex items-center gap-2 rounded-full bg-black/40 py-1 pl-1 pr-3 backdrop-blur-sm">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-sm font-extrabold text-jet ring-1 ring-white/30">
                    {seller.name[0]}
                  </span>
                  <div className="leading-none">
                    <p className="text-xs font-bold text-white">{seller.handle}</p>
                    <p className="mt-0.5 text-[10px] text-white/70">{seller.category}</p>
                  </div>
                  <button
                    type="button"
                    className="ml-1 rounded-full bg-gold px-2.5 py-1 text-[10px] font-extrabold text-jet"
                  >
                    + Follow
                  </button>
                </div>

                {/* FLOATING PRODUCT CARDS pinned over the video */}
                <div className="absolute inset-x-0 bottom-[150px] z-30 space-y-2.5 px-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">
                    Tap to shop the stream
                  </p>
                  {seller.products.slice(0, 2).map((p, i) => (
                    <motion.button
                      type="button"
                      key={p.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.12 }}
                      onClick={() => setActive(p)}
                      className="flex w-full items-center gap-3 rounded-2xl border border-white/15 bg-black/55 p-2.5 text-left backdrop-blur-md transition active:scale-[0.98]"
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-soft text-2xl">
                        {p.emoji}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-white">{p.name}</p>
                        <p className="text-xs text-white/65">${p.price} · tap to buy</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-gold px-3 py-1.5 text-xs font-extrabold text-jet">
                        Shop
                      </span>
                    </motion.button>
                  ))}
                </div>

                {/* bottom action / seller switcher */}
                <div className="absolute inset-x-0 bottom-0 z-30 flex items-center gap-2 border-t border-white/10 bg-black/55 px-4 py-3 backdrop-blur-md">
                  <button
                    type="button"
                    aria-label="Previous live seller"
                    onClick={() => switchSeller(-1)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition active:scale-90"
                  >
                    ‹
                  </button>
                  <div className="flex-1 text-center">
                    <p className="text-[11px] text-white/60">
                      Live seller {sellerIdx + 1} of {sellers.length}
                    </p>
                    <p className="text-xs font-semibold text-white">
                      Swipe to the next creator
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label="Next live seller"
                    onClick={() => switchSeller(1)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-jet transition active:scale-90"
                  >
                    ›
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* AI assistant lives above the stream, persists across seller switches */}
            <AiAssistant
              key={`ai-${seller.id}`}
              seller={seller}
              onOpen={() => setActive(null)}
              onAddProduct={(p) => setActive(p)}
            />

            {/* Buy sheet */}
            <BuySheet
              product={active}
              onClose={() => setActive(null)}
              onConfirmed={showToast}
            />

            {/* Confirmation toast */}
            <AnimatePresence>
              {toast && (
                <motion.div
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  className="absolute left-1/2 top-16 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-gold px-4 py-2.5 text-xs font-bold text-jet shadow-lg"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-jet text-gold">
                    ✓
                  </span>
                  {toast}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* tagline under the phone (desktop accent) */}
        <p className="mt-5 text-center text-sm font-semibold text-ink/60">
          {TAGLINE}
        </p>
      </div>
    </div>
  );
}

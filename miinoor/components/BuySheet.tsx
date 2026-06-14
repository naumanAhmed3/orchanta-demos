"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Product } from "./data";

type Stage = "idle" | "added" | "bought";

export default function BuySheet({
  product,
  onClose,
  onConfirmed,
}: {
  product: Product | null;
  onClose: () => void;
  onConfirmed: (label: string) => void;
}) {
  const [stage, setStage] = useState<Stage>("idle");

  useEffect(() => {
    if (product) setStage("idle");
  }, [product]);

  function buy() {
    setStage("bought");
    onConfirmed(`Order placed — ${product?.name}`);
    window.setTimeout(onClose, 950);
  }

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-40 flex flex-col justify-end bg-black/35"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 33 }}
            onClick={(e) => e.stopPropagation()}
            className="rounded-t-3xl bg-paper px-5 pb-7 pt-3"
          >
            <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-black/15" />

            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-soft text-3xl">
                {product.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-base font-bold leading-tight text-ink">
                  {product.name}
                </p>
                <p className="mt-0.5 text-sm text-ink/55">{product.blurb}</p>
              </div>
              <p className="shrink-0 text-xl font-extrabold text-ink">
                ${product.price}
              </p>
            </div>

            <div className="mt-3 flex items-center gap-2 rounded-xl bg-gold-soft px-3 py-2 text-xs text-ink/70">
              <span aria-hidden>🚚</span>
              Ships from a Miinoor creator · free returns in 30 days
            </div>

            {/* Two-tap checkout */}
            <div className="mt-5">
              {stage === "idle" && (
                <button
                  type="button"
                  onClick={() => setStage("added")}
                  className="w-full rounded-full border-2 border-jet bg-paper py-3.5 text-sm font-bold text-jet transition active:scale-[0.98]"
                >
                  Add to bag · ${product.price}
                </button>
              )}

              {stage === "added" && (
                <motion.button
                  type="button"
                  initial={{ scale: 0.97, opacity: 0.6 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onClick={buy}
                  className="relative w-full overflow-hidden rounded-full bg-jet py-3.5 text-sm font-bold text-gold transition active:scale-[0.98]"
                >
                  <span className="relative z-10">Buy now · 1 tap</span>
                  <span className="shimmer absolute inset-0" />
                </motion.button>
              )}

              {stage === "bought" && (
                <div className="w-full rounded-full bg-gold py-3.5 text-center text-sm font-extrabold text-jet">
                  ✓ Done — see you in the stream
                </div>
              )}

              <p className="mt-2 text-center text-[11px] text-ink/40">
                {stage === "idle"
                  ? "Tap once to add — you stay in the live stream"
                  : stage === "added"
                    ? "One more tap to check out · sample flow, no real charge"
                    : "Sample order — nothing was charged"}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

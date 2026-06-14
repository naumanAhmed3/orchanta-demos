"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AI_GREETING, type Product, type Seller } from "./data";

type Msg = { id: number; role: "ai" | "user"; text: string; product?: Product };

const SUGGESTIONS = [
  "find me something under $30",
  "what's good for a gift?",
  "show me the bestseller",
];

export default function AiAssistant({
  seller,
  onOpen,
  onAddProduct,
}: {
  seller: Seller;
  onOpen: () => void;
  onAddProduct: (p: Product) => void;
}) {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: 0, role: "ai", text: AI_GREETING },
  ]);
  const idRef = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9999, behavior: "smooth" });
  }, [msgs, typing]);

  function curate(query: string) {
    const q = query.toLowerCase();
    const underMatch = q.match(/under \$?(\d+)/);
    let pick: Product | undefined;
    let lead = "";

    if (underMatch) {
      const cap = Number(underMatch[1]);
      const within = seller.products
        .filter((p) => p.price <= cap)
        .sort((a, b) => a.price - b.price);
      pick = within[0] ?? [...seller.products].sort((a, b) => a.price - b.price)[0];
      lead =
        within.length > 0
          ? `Under $${cap}? This one's a steal at $${pick.price}:`
          : `Nothing under $${cap} in this stream, but the closest pick is $${pick.price}:`;
    } else if (q.includes("gift")) {
      pick = seller.products[0];
      lead = "For a gift, this is the crowd favourite right now:";
    } else {
      pick = [...seller.products].sort((a, b) => b.price - a.price)[0];
      lead = "Here's what's trending in this drop:";
    }
    return { pick, lead };
  }

  function ask(query: string) {
    const userId = idRef.current++;
    setMsgs((m) => [...m, { id: userId, role: "user", text: query }]);
    setTyping(true);
    window.setTimeout(() => {
      const { pick, lead } = curate(query);
      setTyping(false);
      setMsgs((m) => [
        ...m,
        { id: idRef.current++, role: "ai", text: lead, product: pick },
      ]);
    }, 900);
  }

  return (
    <>
      {/* Floating assistant bubble */}
      <button
        type="button"
        aria-label="Open Miinoor AI assistant"
        onClick={() => {
          setOpen(true);
          onOpen();
        }}
        className="animate-bob absolute bottom-28 right-3 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-jet shadow-[0_8px_24px_rgba(0,0,0,0.35)] ring-2 ring-black/80 transition active:scale-95"
      >
        <span className="text-2xl" aria-hidden>
          ✦
        </span>
        <span className="absolute -right-0.5 -top-0.5 h-3 w-3 animate-pulse-dot rounded-full bg-black ring-2 ring-gold" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 flex flex-col justify-end bg-black/35 backdrop-blur-[1px]"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[78%] flex-col rounded-t-3xl bg-paper"
            >
              <div className="flex items-center gap-2 border-b border-black/10 px-4 py-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-jet ring-1 ring-black/80">
                  ✦
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-bold text-ink">Miinoor assistant</p>
                  <p className="text-[11px] text-ink/50">curating from this live stream</p>
                </div>
                <button
                  type="button"
                  aria-label="Close assistant"
                  onClick={() => setOpen(false)}
                  className="ml-auto rounded-full px-2 py-1 text-ink/40 hover:text-ink"
                >
                  ✕
                </button>
              </div>

              <div
                ref={scrollRef}
                className="no-scrollbar flex-1 space-y-3 overflow-y-auto px-4 py-4"
              >
                {msgs.map((m) => (
                  <div key={m.id}>
                    <div
                      className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-snug ${
                        m.role === "ai"
                          ? "bg-gold-soft text-ink"
                          : "ml-auto bg-jet text-paper"
                      }`}
                    >
                      {m.text}
                    </div>
                    {m.product && (
                      <div className="mt-2 max-w-[82%] rounded-2xl border border-black/10 bg-paper p-3 shadow-sm">
                        <div className="flex items-center gap-3">
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-soft text-xl">
                            {m.product.emoji}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-ink">
                              {m.product.name}
                            </p>
                            <p className="text-xs text-ink/55">${m.product.price}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            onAddProduct(m.product!);
                            setOpen(false);
                          }}
                          className="mt-2.5 w-full rounded-full bg-jet py-2 text-xs font-bold text-paper transition active:scale-[0.98]"
                        >
                          View in stream
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                {typing && (
                  <div className="flex w-14 items-center justify-center gap-1 rounded-2xl bg-gold-soft px-3 py-3">
                    <Dot d={0} />
                    <Dot d={0.15} />
                    <Dot d={0.3} />
                  </div>
                )}
              </div>

              <div className="border-t border-black/10 px-3 pb-5 pt-3">
                <div className="no-scrollbar flex gap-2 overflow-x-auto">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => ask(s)}
                      className="shrink-0 rounded-full border border-jet/15 bg-gold-soft px-3 py-1.5 text-xs font-medium text-ink transition active:scale-95"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Dot({ d }: { d: number }) {
  return (
    <motion.span
      className="h-2 w-2 rounded-full bg-ink/40"
      animate={{ y: [0, -4, 0] }}
      transition={{ repeat: Infinity, duration: 0.8, delay: d }}
    />
  );
}

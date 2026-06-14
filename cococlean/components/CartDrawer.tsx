"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./cart";
import { DropMark } from "./Logo";

export function CartDrawer() {
  const { open, closeCart, lines, subtotal, setQty, remove, count, lastAdded } =
    useCart();

  const freeShipAt = 35;
  const toFree = Math.max(0, freeShipAt - subtotal);
  const progress = Math.min(100, (subtotal / freeShipAt) * 100);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-petrol/45 backdrop-blur-sm"
          />
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-[400px] flex-col bg-cream shadow-card"
            role="dialog"
            aria-label="Cart"
          >
            <div className="flex items-center justify-between border-b border-petrol/10 bg-petrol px-5 py-4 text-cream">
              <span className="inline-flex items-center gap-2 text-lg font-extrabold">
                <DropMark className="h-5 w-5 text-cyan" />
                Your cart
                <span className="rounded-pill bg-cyan px-2 py-0.5 text-xs font-extrabold text-petrol">
                  {count}
                </span>
              </span>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="rounded-full p-1.5 transition hover:bg-petrol-2"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* free-ship progress */}
            <div className="border-b border-petrol/10 bg-cream-2/60 px-5 py-3">
              <p className="text-xs font-bold text-petrol" data-testid="ship-msg">
                {toFree > 0
                  ? `$${toFree} from free plastic-free shipping`
                  : "You unlocked free plastic-free shipping!"}
              </p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-petrol/10">
                <motion.div
                  className="h-full rounded-full bg-cyan"
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", damping: 24 }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center text-ink/55">
                  <DropMark className="h-12 w-12 text-cyan/40" />
                  <p className="mt-3 font-bold text-petrol">Your cart is empty</p>
                  <p className="mt-1 text-sm">Add a powder to get started.</p>
                </div>
              ) : (
                <ul className="space-y-3" data-testid="cart-lines">
                  {lines.map((l) => (
                    <li
                      key={l.product.id}
                      className="flex gap-3 rounded-2xl border border-petrol/10 bg-white p-3"
                    >
                      <div className="flex h-16 w-14 flex-none items-center justify-center rounded-xl bg-petrol texture-deep">
                        <div className="h-10 w-8 rounded-md bg-cream-2" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-extrabold text-petrol">
                          {l.product.name}
                        </p>
                        <p className="text-xs font-bold text-cyan">
                          ${l.product.price}{" "}
                          <span className="font-semibold text-ink/40 line-through">
                            ${l.product.reg}
                          </span>
                        </p>
                        <div className="mt-2 inline-flex items-center gap-2 rounded-pill border border-petrol/12 px-1.5 py-1">
                          <button
                            onClick={() => setQty(l.product.id, l.qty - 1)}
                            aria-label="Decrease quantity"
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-cream-2 text-petrol transition hover:bg-cyan/20"
                          >
                            −
                          </button>
                          <span className="w-5 text-center text-sm font-extrabold text-petrol tabular-nums">
                            {l.qty}
                          </span>
                          <button
                            onClick={() => setQty(l.product.id, l.qty + 1)}
                            aria-label="Increase quantity"
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-cream-2 text-petrol transition hover:bg-cyan/20"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => remove(l.product.id)}
                        aria-label="Remove item"
                        className="self-start text-xs font-bold text-ink/40 transition hover:text-petrol"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-petrol/10 bg-white px-5 py-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-ink/60">Subtotal</span>
                <span
                  className="display-tight text-2xl font-semibold text-petrol tabular-nums"
                  data-testid="subtotal"
                >
                  ${subtotal}
                </span>
              </div>
              <button
                disabled={lines.length === 0}
                className="mt-3 w-full rounded-pill bg-petrol px-6 py-3.5 text-base font-extrabold text-cream transition hover:bg-cyan hover:text-petrol active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Checkout — sample only
              </button>
              <p className="mt-2 text-center text-[11px] font-semibold uppercase tracking-wider text-ink/40">
                {lastAdded ? `Added: ${lastAdded} · ` : ""}Sample storefront — no
                real charge
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

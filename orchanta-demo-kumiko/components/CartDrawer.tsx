"use client";

import { getProduct, money } from "@/lib/data";
import type { CartLine } from "@/components/cart";

export default function CartDrawer({
  open,
  lines,
  onClose,
  onSetQty,
}: {
  open: boolean;
  lines: CartLine[];
  onClose: () => void;
  onSetQty: (id: string, qty: number) => void;
}) {
  if (!open) return null;

  const subtotal = lines.reduce(
    (sum, l) => sum + getProduct(l.id).price * l.qty,
    0,
  );

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-label="Your bag">
      <button
        type="button"
        aria-label="Close bag"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-maroon/40"
      />
      <aside className="slide-in absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-cream shadow-2xl">
        <header className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-display text-xl">Your bag</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-line px-3 py-1 text-xs hover:bg-blush"
          >
            Close
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <p className="pt-8 text-center text-sm text-maroon/60">
              Your bag is empty.
            </p>
          ) : (
            <ul className="space-y-4">
              {lines.map((l) => {
                const p = getProduct(l.id);
                return (
                  <li
                    key={l.id}
                    className="rounded-xl border border-line bg-white p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-lg leading-tight">
                          {p.name}
                        </p>
                        <p className="mt-0.5 text-xs text-maroon/60">
                          {money(p.price)}
                          {p.priceNote ? ` · ${p.priceNote}` : " per pair"}
                        </p>
                      </div>
                      <p className="text-sm font-medium">
                        {money(p.price * l.qty)}
                      </p>
                    </div>
                    <div className="mt-3 inline-flex items-center gap-3 rounded-full border border-line px-2 py-1">
                      <button
                        type="button"
                        aria-label={`Decrease ${p.name} quantity`}
                        onClick={() => onSetQty(l.id, l.qty - 1)}
                        className="px-2 text-sm hover:text-flame"
                      >
                        −
                      </button>
                      <span className="min-w-4 text-center text-sm">
                        {l.qty}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase ${p.name} quantity`}
                        onClick={() => onSetQty(l.id, l.qty + 1)}
                        className="px-2 text-sm hover:text-flame"
                      >
                        +
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <footer className="border-t border-line px-5 py-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-maroon/70">Subtotal</span>
            <span className="font-medium">{money(subtotal)}</span>
          </div>
          <button
            type="button"
            disabled={lines.length === 0}
            className="mt-3 w-full rounded-full bg-rust py-3.5 text-sm font-medium text-cream transition-colors hover:bg-flame disabled:opacity-40"
          >
            Checkout (demo — no charge)
          </button>
          <p className="mt-2 text-center text-[11px] text-maroon/50">
            Simulated cart — this concept never takes payment.
          </p>
        </footer>
      </aside>
    </div>
  );
}

"use client";

import { useState } from "react";
import Logo from "@/components/Logo";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import ProductGrid from "@/components/ProductGrid";
import CartDrawer from "@/components/CartDrawer";
import StickyBuyBar from "@/components/StickyBuyBar";
import type { CartLine } from "@/components/cart";

export default function Page() {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const count = lines.reduce((n, l) => n + l.qty, 0);

  function quickShop(id: string) {
    setLines((prev) => {
      const hit = prev.find((l) => l.id === id);
      if (hit) {
        return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l));
      }
      return [...prev, { id, qty: 1 }];
    });
    setDrawerOpen(true);
  }

  function setQty(id: string, qty: number) {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
    );
  }

  return (
    <div className="pb-20 md:pb-0">
      {/* Announcement bar — copy grounded in her own product pages */}
      <p className="bg-maroon px-4 py-2 text-center text-xs tracking-wide text-lilac">
        Handmade in small batches · designed in Los Angeles ₍^ ⩊ ^₎
      </p>

      <header className="sticky top-0 z-30 border-b border-line bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
          <Logo />
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="rounded-full border border-rust px-4 py-2 text-xs font-medium tracking-wide transition-colors hover:bg-rust hover:text-cream"
          >
            Bag ({count})
          </button>
        </div>
      </header>

      <main>
        <Hero />
        <TrustStrip />
        <ProductGrid onQuickShop={quickShop} />

        {/* Founder note — grounded in her real story, no invented claims */}
        <section className="border-t border-line bg-blush/50">
          <div className="mx-auto max-w-3xl px-5 py-14 text-center md:py-16">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-violet">
              From the founder
            </p>
            <p className="font-display mt-4 text-2xl leading-snug md:text-3xl">
              After a year of daily orders on Amazon, Kumiko now ships every
              pair direct —{" "}
              <em className="text-flame">
                same handmade lashes, no middleman
              </em>
              .
            </p>
            <p className="mt-4 text-sm text-maroon/70">
              Every order is packed by the person who finished your lashes.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-maroon text-lilac">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-5 py-10 text-center">
          <Logo />
          <p className="text-xs text-lilac/70">
            A working concept built by Orchanta for Kumiko Lash — demo mode. No
            payments, no data stored. Product names and prices from
            kumikolash.com.
          </p>
        </div>
      </footer>

      <CartDrawer
        open={drawerOpen}
        lines={lines}
        onClose={() => setDrawerOpen(false)}
        onSetQty={setQty}
      />
      <StickyBuyBar onQuickShop={quickShop} />
    </div>
  );
}

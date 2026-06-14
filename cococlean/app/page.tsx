"use client";

import { CartProvider, useCart } from "@/components/cart";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { MissionCounter } from "@/components/MissionCounter";
import { Comparison } from "@/components/Comparison";
import { Shop } from "@/components/Shop";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";

function SampleBanner() {
  return (
    <div className="bg-cyan py-1.5 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-petrol">
      Bespoke theme demo · sample data populated from Coco Clean&apos;s live site
    </div>
  );
}

function Page() {
  const { openCart } = useCart();
  const scrollToShop = () => {
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <SampleBanner />
      <Nav onCart={openCart} />
      <main>
        <Hero onShop={scrollToShop} />
        <MissionCounter />
        <Comparison />
        <Shop />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}

export default function Home() {
  return (
    <CartProvider>
      <Page />
    </CartProvider>
  );
}

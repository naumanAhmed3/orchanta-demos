"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart, type Product } from "./cart";

const products: Product[] = [
  {
    id: "powder",
    name: "Laundry Detergent Powder",
    price: 16,
    reg: 20,
    blurb: "Fragrance-free powder. ½ TBSP per regular load. Really.",
  },
  {
    id: "oxi",
    name: "Oxi Booster & Cleaner",
    price: 16,
    reg: 20,
    blurb: "Plant-based oxygen boost for stains, whites and whole-home cleaning.",
  },
];

const enzymes = [
  {
    name: "Protease",
    role: "Breaks down protein stains — sweat, grass, food.",
  },
  {
    name: "Amylase",
    role: "Lifts starchy residue — sauces, baby food, gravy.",
  },
  {
    name: "Lipase",
    role: "Cuts through oils and greasy collar marks.",
  },
  {
    name: "Coconut surfactant",
    role: "Plant-derived clean; rinses fully, no plastic film.",
  },
];

export function Shop() {
  return (
    <section id="shop" className="bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan">
              Shop the refill-free range
            </p>
            <h2 className="display-tight mt-3 text-[clamp(2rem,5vw,3.2rem)] font-semibold text-petrol">
              Pick your powder
            </h2>
          </div>
          <span className="rounded-pill bg-cyan/12 px-4 py-1.5 text-xs font-bold text-petrol">
            Free plastic-free shipping over $35
          </span>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <ProductCard product={products[0]} featured />
          <div className="grid gap-6">
            <ProductCard product={products[1]} />
            <BundleCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function PriceTag({ price, reg }: { price: number; reg: number }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="display-tight text-3xl font-semibold text-petrol">
        ${price}
      </span>
      <span className="text-sm font-bold text-ink/40 line-through">${reg}</span>
      <span className="rounded-pill bg-cyan/15 px-2 py-0.5 text-[11px] font-extrabold text-petrol">
        Sample price
      </span>
    </div>
  );
}

function ProductCard({
  product,
  featured = false,
}: {
  product: Product;
  featured?: boolean;
}) {
  const { add } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-[1.8rem] border border-petrol/10 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-[0_30px_70px_-30px_rgba(2,63,81,0.6)] sm:p-7 ${
        featured ? "lg:row-span-1" : ""
      }`}
    >
      {/* product visual */}
      <div className="relative mb-5 flex h-44 items-center justify-center overflow-hidden rounded-2xl bg-petrol texture-deep sm:h-56">
        <div className="relative h-28 w-24 rounded-xl bg-cream-2 shadow-soft">
          <div className="absolute inset-x-3 top-3 h-8 rounded-md bg-cyan/20" />
          <div className="absolute inset-x-3 top-12 space-y-1.5">
            <div className="h-1.5 w-3/4 rounded-full bg-petrol/25" />
            <div className="h-1.5 w-1/2 rounded-full bg-petrol/15" />
          </div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-extrabold uppercase tracking-wider text-petrol/70">
            Coco Clean
          </div>
        </div>
        <span className="absolute right-3 top-3 rounded-pill bg-cyan px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-petrol">
          Plastic-free
        </span>
      </div>

      <h3 className="display-tight text-2xl font-semibold text-petrol">
        {product.name}
      </h3>
      <p className="mt-2 text-sm text-ink/65">{product.blurb}</p>

      <div className="mt-4">
        <PriceTag price={product.price} reg={product.reg} />
      </div>

      {/* Bespoke ingredient / enzyme reveal */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mt-5 flex w-full items-center justify-between rounded-xl border border-petrol/12 bg-cream-2/50 px-4 py-3 text-left text-sm font-bold text-petrol transition hover:border-cyan/50"
      >
        What&apos;s inside — enzymes &amp; actives
        <svg
          viewBox="0 0 20 20"
          className={`h-4 w-4 text-cyan transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
        >
          <path
            d="M5 8l5 5 5-5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="reveal"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <ul className="mt-3 space-y-2.5 rounded-xl bg-cream-2/40 p-4">
              {enzymes.map((e, i) => (
                <motion.li
                  key={e.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="flex gap-3"
                >
                  <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-cyan/15 text-[11px] font-extrabold text-petrol">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-snug text-ink/75">
                    <span className="font-extrabold text-petrol">{e.name}</span>{" "}
                    — {e.role}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => add(product)}
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-pill bg-petrol px-6 py-3.5 text-base font-extrabold text-cream transition hover:bg-cyan hover:text-petrol active:scale-95"
      >
        Add to cart · ${product.price}
      </button>
    </div>
  );
}

function BundleCard() {
  const { add } = useCart();
  const bundle: Product = {
    id: "bundle",
    name: "80-Load Plastic-Free Bundle",
    price: 29,
    reg: 40,
    blurb: "Powder + Oxi Booster. 80 loads, one plastic jug never made.",
  };
  return (
    <div className="relative overflow-hidden rounded-[1.8rem] bg-petrol texture-deep p-6 text-cream shadow-card sm:p-7">
      <span className="inline-flex items-center gap-1.5 rounded-pill bg-cyan px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-petrol">
        Best value
      </span>
      <h3 className="display-tight mt-4 text-2xl font-semibold">
        {bundle.name}
      </h3>
      <p className="mt-2 text-sm text-cream/75">{bundle.blurb}</p>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="display-tight text-4xl font-semibold text-cyan">
          ${bundle.price}
        </span>
        <span className="text-sm font-bold text-cream/40 line-through">
          ${bundle.reg}
        </span>
        <span className="rounded-pill bg-cream/10 px-2 py-0.5 text-[11px] font-extrabold text-cyan-soft">
          Sample price
        </span>
      </div>
      <button
        onClick={() => add(bundle)}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-pill bg-cyan px-6 py-3.5 text-base font-extrabold text-petrol transition hover:bg-cyan-soft active:scale-95"
      >
        Add bundle · $29
      </button>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Wordmark } from "./Logo";

export function Nav({ onCart }: { onCart: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/85 backdrop-blur-md shadow-[0_8px_30px_-18px_rgba(2,63,81,0.4)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-6">
        <Wordmark />
        <div className="hidden items-center gap-7 text-sm font-semibold text-petrol/80 md:flex">
          <a href="#shop" className="transition hover:text-cyan">
            Shop
          </a>
          <a href="#difference" className="transition hover:text-cyan">
            Why Coco Clean
          </a>
          <a href="#mission" className="transition hover:text-cyan">
            Our Mission
          </a>
        </div>
        <button
          onClick={onCart}
          className="group inline-flex items-center gap-2 rounded-pill bg-petrol px-4 py-2 text-sm font-bold text-cream transition hover:bg-petrol-2 active:scale-95"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
            <path
              d="M3 4h2l1.6 11.2a1.5 1.5 0 0 0 1.49 1.3h8.8a1.5 1.5 0 0 0 1.47-1.2L20 7H6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="9" cy="20" r="1.4" fill="currentColor" />
            <circle cx="17" cy="20" r="1.4" fill="currentColor" />
          </svg>
          Cart
        </button>
      </nav>
    </header>
  );
}

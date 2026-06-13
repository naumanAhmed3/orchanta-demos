"use client";

import { useEffect, useState } from "react";
import BrandMark from "./BrandMark";

const NAV = [
  { label: "Pathways", href: "#pathways" },
  { label: "Find resources", href: "#finder" },
  { label: "Programs", href: "#programs" },
  { label: "About", href: "#about" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(251,248,241,0.88)" : "transparent",
        backdropFilter: scrolled ? "saturate(140%) blur(10px)" : "none",
        boxShadow: scrolled ? "0 10px 30px -22px rgba(27,58,55,0.5)" : "none",
        borderBottom: scrolled ? "1px solid rgba(143,201,173,0.4)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between gap-4 px-5 py-3.5 sm:px-7">
        <a href="#top" className="flex items-center gap-2.5" aria-label="YouthWell home">
          <BrandMark className="h-9 w-9 shrink-0" />
          <span className="font-display text-[1.35rem] font-semibold leading-none text-ink">
            Youth<span className="text-teal">Well</span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-[0.95rem] font-semibold text-ink-soft transition-colors duration-200 hover:bg-mint hover:text-teal-deep"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#donate"
          className="lift inline-flex items-center gap-2 rounded-full bg-coral px-4 py-2.5 text-[0.95rem] font-extrabold text-shell shadow-[0_10px_24px_-12px_rgba(212,112,63,0.9)]"
        >
          <HeartIcon />
          Donate
        </a>
      </div>
    </header>
  );
}

function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 20.5S3.5 14.7 3.5 8.9A4.6 4.6 0 0 1 12 6.3a4.6 4.6 0 0 1 8.5 2.6c0 5.8-8.5 11.6-8.5 11.6Z" />
    </svg>
  );
}

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BIO_CHIP, NEWSLETTER_LINE, TAGLINE, WORDMARK } from "./content";

type Mode = "today" | "unified";

function SurfaceFrame({
  label,
  channel,
  children,
}: {
  label: string;
  channel: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="overflow-hidden rounded-[var(--demo-radius)] border hairline bg-paper">
      <figcaption className="flex items-center justify-between border-b hairline px-4 py-2.5">
        <span className="text-xs font-semibold tracking-wide text-ink">
          {label}
        </span>
        <span className="text-[10px] uppercase tracking-[0.22em] text-muted">
          {channel}
        </span>
      </figcaption>
      <div className="relative aspect-[16/9] w-full overflow-hidden">{children}</div>
    </figure>
  );
}

/* ----- TODAY (fragmented) variants ----- */
function WebsiteToday() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white px-4 text-center">
      <p className="text-lg font-bold text-gray-700" style={{ fontFamily: "Arial, sans-serif" }}>
        Pretty Ambitious
      </p>
      <p className="text-[11px] text-gray-400" style={{ fontFamily: "Arial, sans-serif" }}>
        Welcome to my website
      </p>
      <span className="mt-1 rounded bg-blue-600 px-3 py-1 text-[10px] font-medium text-white">
        Subscribe
      </span>
      <span className="absolute bottom-1 right-2 text-[8px] text-gray-300">
        Made with Wix
      </span>
    </div>
  );
}
function SubstackToday() {
  return (
    <div className="absolute inset-0 bg-white">
      <div className="flex items-center gap-2 bg-[#ff6719] px-4 py-2">
        <span className="grid h-4 w-4 place-items-center rounded-[2px] bg-white text-[9px] font-bold text-[#ff6719]">
          S
        </span>
        <span className="text-[11px] font-semibold text-white">Substack</span>
      </div>
      <div className="px-4 py-4" style={{ fontFamily: "Georgia, serif" }}>
        <p className="text-sm font-bold text-gray-800">Aditi&apos;s Newsletter</p>
        <p className="mt-1 text-[10px] text-gray-400">No header image · default theme</p>
      </div>
    </div>
  );
}
function InstagramToday() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 px-4 text-center">
      <p
        className="text-base font-black uppercase tracking-tight text-white drop-shadow"
        style={{ fontFamily: "Impact, Arial Black, sans-serif" }}
      >
        5 TIPS!! 🔥
      </p>
      <span className="absolute bottom-2 right-2 text-[9px] text-white/80">@prettyambitious</span>
    </div>
  );
}
function LinkedinToday() {
  return (
    <div className="absolute inset-0 bg-[#f3f2ef]">
      <div className="h-1/2 bg-[#0a66c2]" />
      <div className="-mt-5 ml-4 h-10 w-10 rounded-full border-4 border-white bg-gray-300" />
      <p className="ml-4 mt-1 text-[12px] font-semibold text-gray-800" style={{ fontFamily: "Arial, sans-serif" }}>
        Aditi Mishra
      </p>
      <p className="ml-4 text-[10px] text-gray-500" style={{ fontFamily: "Arial, sans-serif" }}>
        Marketing Leader | Creator
      </p>
    </div>
  );
}

/* ----- UNIFIED (one identity) variants — all read live tokens ----- */
function MastheadRule({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-display tracking-[0.18em] text-ink" style={{ fontFamily: "var(--display-font)" }}>
      {children}
    </span>
  );
}
function WebsiteUnified() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center bg-paper px-5">
      <div className="border-y hairline py-2 text-center">
        <MastheadRule>{WORDMARK}</MastheadRule>
      </div>
      <p className="mt-2 text-[10px] leading-snug text-ink-soft">{TAGLINE}</p>
      <span
        className="mt-2 self-start rounded-[var(--demo-radius)] px-3 py-1 text-[10px] font-semibold text-paper"
        style={{ backgroundColor: "var(--accent)" }}
      >
        Notify me
      </span>
    </div>
  );
}
function SubstackUnified() {
  return (
    <div className="absolute inset-0 bg-paper">
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ backgroundColor: "var(--accent)" }}
      >
        <MastheadRule>
          <span className="text-[11px] text-paper">{WORDMARK}</span>
        </MastheadRule>
        <span className="text-[9px] uppercase tracking-widest text-paper/80">Letter №14</span>
      </div>
      <div className="px-4 py-3">
        <p className="font-display text-sm text-ink">the richer i get the more scared i become</p>
        <p className="mt-1 text-[9px] leading-snug text-muted">{NEWSLETTER_LINE}</p>
      </div>
    </div>
  );
}
function InstagramUnified() {
  return (
    <div className="absolute inset-0 flex flex-col justify-between bg-ink p-4 text-paper">
      <span className="text-[9px] uppercase tracking-[0.28em] text-paper/60">
        Creator economy
      </span>
      <p className="font-display text-xl leading-tight">you are not a brand</p>
      <div className="flex items-center justify-between">
        <span className="text-[9px] uppercase tracking-[0.2em] text-paper/70">
          {WORDMARK}
        </span>
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: "var(--accent)" }}
        />
      </div>
    </div>
  );
}
function LinkedinUnified() {
  return (
    <div className="absolute inset-0 bg-paper">
      <div className="relative h-1/2 bg-ink px-4 py-3">
        <MastheadRule>
          <span className="text-[11px] text-paper">{WORDMARK}</span>
        </MastheadRule>
        <span
          className="absolute right-4 top-3 h-2 w-2 rounded-full"
          style={{ backgroundColor: "var(--accent)" }}
        />
      </div>
      <div className="-mt-5 ml-4 grid h-10 w-10 place-items-center rounded-full border-4 border-paper bg-blush font-display text-sm text-ink">
        A
      </div>
      <p className="ml-4 mt-1 text-[10px] leading-snug text-ink-soft">{BIO_CHIP}</p>
    </div>
  );
}

const SURFACES = [
  { label: "Website hero", channel: "prettyambitious.co.uk", Today: WebsiteToday, Unified: WebsiteUnified },
  { label: "Substack header", channel: "Newsletter", Today: SubstackToday, Unified: SubstackUnified },
  { label: "Instagram tile", channel: "@prettyambitious", Today: InstagramToday, Unified: InstagramUnified },
  { label: "LinkedIn banner", channel: "Profile", Today: LinkedinToday, Unified: LinkedinUnified },
];

export default function Surfaces() {
  const [mode, setMode] = useState<Mode>("today");
  const unified = mode === "unified";

  return (
    <section className="px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta">
              The problem, solved
            </p>
            <h2
              className="font-display mt-3 leading-tight"
              style={{ fontSize: "var(--text-h2)" }}
            >
              One brand, every surface.
            </h2>
            <p className="mt-3 max-w-md text-sm text-ink-soft">
              &ldquo;I have 300K+ followers but my brand looks like 4 different
              people run it.&rdquo; Flip the switch.
            </p>
          </div>

          {/* Segmented toggle — QA click target */}
          <div
            role="group"
            aria-label="Compare brand states"
            className="inline-flex shrink-0 rounded-full border hairline bg-paper-2 p-1 text-sm"
          >
            <button
              type="button"
              onClick={() => setMode("today")}
              aria-pressed={!unified}
              className={`rounded-full px-5 py-2 font-medium transition-colors ${
                !unified ? "bg-ink text-paper" : "text-muted"
              }`}
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => setMode("unified")}
              aria-pressed={unified}
              className="rounded-full px-5 py-2 font-medium transition-colors"
              style={
                unified
                  ? { backgroundColor: "var(--accent)", color: "#faf6f1" }
                  : { color: "var(--color-muted)" }
              }
            >
              Unified
            </button>
          </div>
        </div>

        {/* Status caption — deterministic, mode-specific text */}
        <p className="mt-6 text-sm font-medium">
          {unified ? (
            <span style={{ color: "var(--accent)" }}>
              Four surfaces, one identity — every surface rendered from one system.
            </span>
          ) : (
            <span className="text-muted">
              Four surfaces, four signatures — it looks like four different people run it.
            </span>
          )}
        </p>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SURFACES.map(({ label, channel, Today, Unified }) => (
            <SurfaceFrame key={label} label={label} channel={channel}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={mode}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.32 }}
                >
                  {unified ? <Unified /> : <Today />}
                </motion.div>
              </AnimatePresence>
            </SurfaceFrame>
          ))}
        </div>

        <p className="mt-5 text-[11px] text-muted">
          Substack, Instagram &amp; LinkedIn frames are illustrative
          reconstructions using Aditi&apos;s real copy.
        </p>
      </div>
    </section>
  );
}

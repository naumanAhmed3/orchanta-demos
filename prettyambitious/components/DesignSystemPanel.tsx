"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { FontKey } from "./DemoApp";

const SWATCHES: { name: string; hue: number }[] = [
  { name: "Magenta", hue: 339 },
  { name: "Terracotta", hue: 22 },
  { name: "Plum", hue: 318 },
  { name: "Ink-rose", hue: 4 },
  { name: "Teal", hue: 172 },
  { name: "Gold", hue: 41 },
];

const swatchColor = (h: number) => `hsl(${h} 71% 57%)`;

export default function DesignSystemPanel({
  hue,
  radius,
  fontKey,
  onHue,
  onRadius,
  onFont,
}: {
  hue: number;
  radius: number;
  fontKey: FontKey;
  onHue: (h: number) => void;
  onRadius: (r: number) => void;
  onFont: (f: FontKey) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border hairline bg-ink px-4 py-3 text-xs font-semibold tracking-wide text-paper shadow-lg transition-transform hover:-translate-y-0.5"
      >
        <span
          className="inline-block h-3 w-3 rounded-full"
          style={{ backgroundColor: "var(--accent)" }}
        />
        Live design system
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed right-0 top-0 z-50 flex h-full w-[88vw] max-w-[360px] flex-col overflow-y-auto border-l hairline bg-paper shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              aria-label="Design system tokens"
            >
              <div className="flex items-center justify-between border-b hairline px-5 py-4">
                <div>
                  <p className="font-display text-lg leading-none">The system</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-muted">
                    Reusable tokens
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full border hairline px-3 py-1 text-xs text-ink"
                >
                  Close ✕
                </button>
              </div>

              <div className="space-y-7 px-5 py-6">
                <p className="text-[13px] leading-relaxed text-ink-soft">
                  Change a token here and it re-skins the hero{" "}
                  <em>and</em> all four surface previews at once — proof it&apos;s
                  a system, not a one-off page.
                </p>

                {/* Accent hue */}
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">
                      Accent
                    </span>
                    <span
                      className="h-5 w-5 rounded-full border border-white shadow"
                      style={{ backgroundColor: "var(--accent)" }}
                    />
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={360}
                    value={hue}
                    onChange={(e) => onHue(Number(e.target.value))}
                    className="token-range mt-3"
                    aria-label="Accent hue"
                  />
                  <div className="mt-3 flex flex-wrap gap-2">
                    {SWATCHES.map((s) => {
                      const active = Math.abs(s.hue - hue) < 2;
                      return (
                        <button
                          key={s.name}
                          type="button"
                          onClick={() => onHue(s.hue)}
                          title={s.name}
                          className="h-8 w-8 rounded-full transition-transform hover:scale-110"
                          style={{
                            backgroundColor: swatchColor(s.hue),
                            outline: active ? "2px solid #16130f" : "none",
                            outlineOffset: "2px",
                          }}
                          aria-label={`Set accent ${s.name}`}
                          aria-pressed={active}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Display font */}
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">
                    Display typeface
                  </span>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {(
                      [
                        { key: "serif", label: "Fraunces", note: "Editorial serif" },
                        { key: "sans", label: "Inter", note: "Modern grotesque" },
                      ] as { key: FontKey; label: string; note: string }[]
                    ).map((f) => {
                      const active = fontKey === f.key;
                      return (
                        <button
                          key={f.key}
                          type="button"
                          onClick={() => onFont(f.key)}
                          className="rounded-[var(--demo-radius)] border px-3 py-2 text-left transition-colors"
                          style={{
                            borderColor: active ? "var(--accent)" : "var(--color-hairline)",
                            backgroundColor: active ? "var(--accent-soft)" : "transparent",
                          }}
                          aria-pressed={active}
                        >
                          <span
                            className="block text-base text-ink"
                            style={{
                              fontFamily:
                                f.key === "serif"
                                  ? 'var(--font-fraunces), serif'
                                  : "var(--font-inter), sans-serif",
                            }}
                          >
                            {f.label}
                          </span>
                          <span className="text-[10px] text-muted">{f.note}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Corner radius */}
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">
                      Corner radius
                    </span>
                    <span className="text-xs tabular-nums text-muted">{radius}px</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={24}
                    value={radius}
                    onChange={(e) => onRadius(Number(e.target.value))}
                    className="token-range mt-3"
                    aria-label="Corner radius"
                  />
                </div>

                {/* Type scale */}
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">
                    Type scale
                  </span>
                  <div className="mt-3 space-y-2 border-t hairline pt-3">
                    <p className="font-display text-3xl leading-none">Display</p>
                    <p className="font-display text-xl leading-none">Headline</p>
                    <p className="text-sm text-ink-soft">Body — for people who want more.</p>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-muted">
                      Caption / kicker
                    </p>
                  </div>
                </div>

                {/* Component chips */}
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">
                    Components
                  </span>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span
                      className="rounded-[var(--demo-radius)] px-3 py-1.5 text-xs font-semibold text-paper"
                      style={{ backgroundColor: "var(--accent)" }}
                    >
                      Button
                    </span>
                    <span
                      className="rounded-full border px-3 py-1.5 text-xs"
                      style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
                    >
                      Tag
                    </span>
                    <span className="rounded-[var(--demo-radius)] border-b-2 border-ink/20 px-3 py-1.5 text-xs text-muted">
                      Input field
                    </span>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

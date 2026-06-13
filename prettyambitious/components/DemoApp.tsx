"use client";

import { useEffect, useRef, useState } from "react";
import {
  MotionConfig,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import Hero from "./Hero";
import Surfaces from "./Surfaces";
import DesignSystemPanel from "./DesignSystemPanel";
import ContentGrid from "./ContentGrid";
import { WORDMARK, BYLINE } from "./content";

export type FontKey = "serif" | "sans";

const SAT = 71;
const LIGHT = 57;
const FONT_STACKS: Record<FontKey, string> = {
  serif: 'var(--font-fraunces), "Times New Roman", Georgia, serif',
  sans: "var(--font-inter), system-ui, -apple-system, sans-serif",
};

export default function DemoApp() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  // UI-facing state (slider positions, active chips) ------------------
  const [hueState, setHueState] = useState(339);
  const [radiusState, setRadiusState] = useState(6);
  const [fontKey, setFontKey] = useState<FontKey>("serif");

  // Animated motion values that actually drive the CSS variables ------
  const hue = useMotionValue(339);
  const radius = useMotionValue(6);
  const springCfg = reduce
    ? { duration: 0.001 }
    : { stiffness: 140, damping: 18, mass: 0.6 };
  const hueSpring = useSpring(hue, springCfg);
  const radiusSpring = useSpring(radius, springCfg);

  const accentColor = useTransform(
    hueSpring,
    (h) => `hsl(${h.toFixed(1)} ${SAT}% ${LIGHT}%)`
  );
  const radiusPx = useTransform(radiusSpring, (r) => `${r.toFixed(1)}px`);

  // Write the springs into CSS vars on the demo root (bulletproof, SSR-safe)
  useMotionValueEvent(accentColor, "change", (v) =>
    rootRef.current?.style.setProperty("--accent", v)
  );
  useMotionValueEvent(radiusPx, "change", (v) =>
    rootRef.current?.style.setProperty("--demo-radius", v)
  );

  // Sync once on mount so the var matches the hsl model exactly.
  useEffect(() => {
    rootRef.current?.style.setProperty("--accent", accentColor.get());
    rootRef.current?.style.setProperty("--demo-radius", radiusPx.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onHue = (h: number) => {
    setHueState(h);
    hue.set(h);
  };
  const onRadius = (r: number) => {
    setRadiusState(r);
    radius.set(r);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={rootRef}
        className="demo-root relative min-h-screen bg-paper text-ink"
        style={{ "--display-font": FONT_STACKS[fontKey] } as React.CSSProperties}
      >
        {/* fixed brand nameplate / top status bar */}
        <header className="sticky top-0 z-30 border-b hairline bg-paper/85 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
            <span className="font-display text-sm tracking-[0.32em] uppercase">
              PA
            </span>
            <span className="hidden text-[11px] uppercase tracking-[0.28em] text-muted sm:block">
              {WORDMARK} · {BYLINE}
            </span>
            <span className="rounded-full border hairline px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted">
              Working concept
            </span>
          </div>
        </header>

        <Hero reduce={!!reduce} />
        <Surfaces />
        <ContentGrid />

        <footer className="border-t hairline px-5 py-10 text-center">
          <p className="font-display text-2xl">Pretty Ambitious</p>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
            A working concept by Orchanta. Surface mockups (Substack, Instagram,
            LinkedIn) and the partner strip are illustrative reconstructions
            built from Aditi&apos;s real copy — drag the system panel to re-skin
            the whole brand live.
          </p>
        </footer>

        {/* Live design-system drawer — re-skins every surface above */}
        <DesignSystemPanel
          hue={hueState}
          radius={radiusState}
          fontKey={fontKey}
          onHue={onHue}
          onRadius={onRadius}
          onFont={setFontKey}
        />

        {/* spring-tracked accent swatch in the corner (proof the var is live) */}
        <motion.div
          aria-hidden
          className="pointer-events-none fixed bottom-5 left-5 z-20 hidden h-3 w-3 rounded-full md:block"
          style={{ backgroundColor: accentColor }}
        />
      </div>
    </MotionConfig>
  );
}

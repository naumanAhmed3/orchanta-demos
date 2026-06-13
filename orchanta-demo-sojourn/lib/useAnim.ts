"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/* ----------------------------------------------- reduced-motion preference */
const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

/** Tracks the user's reduced-motion preference via an external store. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(REDUCE_QUERY).matches,
    () => false,
  );
}

/* --------------------------------------------------------- scroll reveal */
/** Fires once when the element scrolls into view. */
export function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      // Graceful fallback: reveal on the next frame (no sync setState in body).
      const id = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(id);
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ------------------------------------------------------------- count up */
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Animates a number towards `target`. Re-runs smoothly from the current
 * displayed value whenever `target` changes. Respects reduced motion.
 */
export function useCountUp(target: number, active = true, duration = 1500): number {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);
  const valueRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active || reduced) return;
    const from = valueRef.current;
    const to = target;
    const start = performance.now();

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const current = from + (to - from) * easeOutCubic(p);
      valueRef.current = current;
      setValue(current);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [target, active, duration, reduced]);

  return reduced ? target : value;
}

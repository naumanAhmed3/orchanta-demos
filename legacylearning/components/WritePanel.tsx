"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { TargetConfig } from "@/lib/lessons";
import { prefersReducedMotion } from "@/lib/lessons";

type Phase = "idle" | "scanning" | "done";

export function WritePanel({
  target,
  onSuccess,
}: {
  target: TargetConfig;
  onSuccess: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const drawing = useRef(false);
  const [hasInk, setHasInk] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [guideKey, setGuideKey] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 9;
    ctx.strokeStyle = "#FF8A5B";
  }, []);

  useEffect(() => {
    setupCanvas();
    const ro = new ResizeObserver(() => setupCanvas());
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [setupCanvas]);

  // Reset board when the target changes.
  useEffect(() => {
    clearBoard();
    setGuideKey((k) => k + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.id]);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  function pos(e: React.PointerEvent<HTMLCanvasElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  function start(e: React.PointerEvent<HTMLCanvasElement>) {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    const { x, y } = pos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    if (phase === "done") setPhase("idle");
  }

  function move(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = pos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    if (!hasInk) setHasInk(true);
  }

  function end() {
    drawing.current = false;
  }

  function clearBoard() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasInk(false);
    setPhase("idle");
    if (timer.current) clearTimeout(timer.current);
  }

  function scan() {
    if (!hasInk) {
      setPhase("idle");
      setGuideKey((k) => k + 1);
      return;
    }
    if (timer.current) clearTimeout(timer.current);
    if (prefersReducedMotion()) {
      setPhase("done");
      onSuccess();
      return;
    }
    setPhase("scanning");
    timer.current = setTimeout(() => {
      setPhase("done");
      onSuccess();
    }, 1500);
  }

  const glyph = target.write.glyph;
  const guideSize = glyph.length > 2 ? 120 : 230;

  return (
    <section
      className="flex flex-col rounded-3xl border border-navy/10 bg-white/85 p-4 shadow-soft sm:p-5"
      aria-label="Write and recognise"
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-coral/15 text-coral">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M4 20l4-1 9.5-9.5a2 2 0 0 0 0-2.8l-.2-.2a2 2 0 0 0-2.8 0L5 16l-1 4Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div>
          <h3 className="font-display text-base font-semibold leading-none text-navy">
            Write it
          </h3>
          <p className="mt-0.5 text-[0.78rem] text-ink/60">{target.write.prompt}</p>
        </div>
      </div>

      {/* Canvas + trace guide */}
      <div
        ref={wrapRef}
        className="paper-lined relative aspect-[4/3] w-full touch-none overflow-hidden rounded-2xl border border-navy/10"
      >
        <svg
          key={guideKey}
          viewBox="0 0 320 240"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden
        >
          <text
            x="160"
            y="170"
            textAnchor="middle"
            className="font-display animate-draw"
            style={{ fontSize: guideSize, fontWeight: 600 }}
            fill="none"
            stroke="#163E5C"
            strokeOpacity="0.22"
            strokeWidth="2"
          >
            {glyph}
          </text>
        </svg>

        <canvas
          ref={canvasRef}
          className="relative h-full w-full cursor-crosshair"
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerLeave={end}
          onPointerCancel={end}
        />

        {!hasInk && phase === "idle" && (
          <span className="pointer-events-none absolute inset-x-0 bottom-2 text-center text-[0.74rem] font-medium text-navy/45">
            Trace over the guide with your finger
          </span>
        )}

        {phase === "scanning" && (
          <span
            className="animate-scan reduce-hide pointer-events-none absolute inset-x-0 top-0 h-1/3"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,138,91,0) 0%, rgba(255,138,91,0.25) 60%, rgba(255,138,91,0.85) 100%)",
            }}
          />
        )}
      </div>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={scan}
          className="flex-1 rounded-xl bg-navy px-3 py-2.5 text-sm font-semibold text-cream transition hover:bg-navy-700 active:scale-[0.98]"
        >
          Scan my writing
        </button>
        <button
          type="button"
          onClick={clearBoard}
          className="rounded-xl border border-navy/15 bg-cream/60 px-3 py-2.5 text-sm font-semibold text-navy transition hover:bg-white active:scale-[0.98]"
        >
          Clear
        </button>
      </div>

      {/* Recognition result */}
      <div className="mt-3 min-h-[5.5rem]" aria-live="polite">
        {phase === "done" ? (
          <div className="animate-reveal rounded-2xl border border-coral/25 bg-gradient-to-br from-coral/10 to-cream p-3.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[0.72rem] font-semibold uppercase tracking-wide text-coral">
                Recognised
              </span>
              <span className="rounded-full bg-navy px-2 py-0.5 text-[0.72rem] font-semibold text-cream">
                {target.write.confidence}% match
              </span>
            </div>
            <p className="mt-1.5 font-display text-lg font-semibold text-navy">
              You wrote “{target.write.recognized}”
            </p>
            <p className="mt-1 text-sm leading-snug text-ink/80">{target.write.coaching}</p>
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-2.5 py-1 text-[0.72rem] font-medium text-teal-600">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h12M13 7l5 5-5 5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Stroke order: {target.write.strokeHint}
            </p>
          </div>
        ) : (
          <div className="grid h-[5.5rem] place-items-center rounded-2xl border border-dashed border-navy/15 text-center text-[0.8rem] text-ink/45">
            {phase === "scanning"
              ? "Reading the strokes…"
              : "Write, then tap Scan to get gentle coaching."}
          </div>
        )}
      </div>
    </section>
  );
}

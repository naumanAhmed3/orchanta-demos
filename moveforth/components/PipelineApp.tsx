"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ANGLES, VARIANT_THUMBS, BATCH } from "./data";
import {
  PipelineRail,
  BriefIntake,
  ClaudeNode,
  HiggsfieldNode,
  type Step,
} from "./Nodes";
import { CreativeCard } from "./AdCreatives";
import { cx, IconForward, IconBolt } from "./ui";

const STREAM_LEN = 5; // CLAUDE_STREAM.length

export default function PipelineApp() {
  const prefersReduced = useReducedMotion();
  const reduced = !!prefersReduced;

  // Start in the COMPLETED state so first paint (and the preview screenshot) show
  // the full result. "Run pipeline" replays the animated sequence.
  const [step, setStep] = useState<Step>(4);
  const [streamLines, setStreamLines] = useState(STREAM_LEN);
  const [anglesGrouped, setAnglesGrouped] = useState(true);
  const [rendering, setRendering] = useState(false);
  const [frames, setFrames] = useState(true);
  const [variants, setVariants] = useState(BATCH.variants);
  const [seconds, setSeconds] = useState(BATCH.seconds);
  const [running, setRunning] = useState(false);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const countIvl = useRef<ReturnType<typeof setInterval> | null>(null);

  function clearAll() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (countIvl.current) {
      clearInterval(countIvl.current);
      countIvl.current = null;
    }
  }
  useEffect(() => () => clearAll(), []);

  const at = (ms: number, fn: () => void) =>
    timers.current.push(setTimeout(fn, ms));

  function finishState() {
    setStep(4);
    setStreamLines(STREAM_LEN);
    setAnglesGrouped(true);
    setRendering(false);
    setFrames(true);
    setVariants(BATCH.variants);
    setSeconds(BATCH.seconds);
    setRunning(false);
  }

  function runPipeline() {
    if (running) return;
    clearAll();

    if (reduced) {
      finishState();
      return;
    }

    // reset
    setRunning(true);
    setStep(0);
    setStreamLines(0);
    setAnglesGrouped(false);
    setRendering(false);
    setFrames(false);
    setVariants(0);
    setSeconds(0);

    // 01 — read brief + lock brand kit
    at(40, () => setStep(1));

    // 02 — Claude streams reasoning, then groups angles
    at(760, () => setStep(2));
    for (let k = 1; k <= STREAM_LEN; k++) {
      at(760 + k * 420, () => setStreamLines(k));
    }
    at(760 + STREAM_LEN * 420 + 180, () => setAnglesGrouped(true));

    // 03 — Higgsfield renders + count-up
    at(3300, () => {
      setStep(3);
      setRendering(true);
      const total = 1400;
      const stepMs = 55;
      let elapsed = 0;
      countIvl.current = setInterval(() => {
        elapsed += stepMs;
        const p = Math.min(1, elapsed / total);
        setVariants(Math.round(p * BATCH.variants));
        setSeconds(Math.round(p * BATCH.seconds));
        if (p >= 1 && countIvl.current) {
          clearInterval(countIvl.current);
          countIvl.current = null;
        }
      }, stepMs);
    });
    at(4850, () => {
      setRendering(false);
      setFrames(true);
      setVariants(BATCH.variants);
      setSeconds(BATCH.seconds);
    });

    // 04 — reveal output grid
    at(5100, () => setStep(4));
    at(6000, () => setRunning(false));
  }

  const outputRevealed = step >= 4;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-14 pt-5 sm:px-6 sm:pt-7">
      {/* Header */}
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-lg bg-orange/12 text-orange ring-1 ring-orange/25">
            <IconForward width={18} height={18} />
          </span>
          <div>
            <div className="font-display text-lg font-bold leading-none tracking-tight">
              move<span className="text-orange">forth</span>
            </div>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
              Creative Automation Pipeline
            </div>
          </div>
        </div>
        <div className="text-[11px] text-faint sm:text-right">
          in partnership with{" "}
          <span className="font-semibold text-ink/80">Orchanta</span>
        </div>
      </header>

      {/* Concept banner */}
      <div className="mt-4 flex items-start gap-2 rounded-lg border border-line bg-surface/60 px-3 py-2 text-[11px] leading-snug text-muted">
        <span className="mt-px inline-block size-1.5 shrink-0 rounded-full bg-orange" />
        <span>
          <span className="font-semibold text-ink/80">Working concept</span> ·
          sample outputs — visuals are placeholders, not live AI generation.
        </span>
      </div>

      {/* Control row */}
      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <h1 className="font-display text-2xl font-bold leading-[1.05] tracking-tight sm:text-[2rem]">
            Brief in, on-brand ad batch out.
          </h1>
          <p className="mt-2 text-[13px] leading-snug text-muted">
            One brief orchestrates Claude for angles, copy &amp; UGC scripts into
            a generative-visual render — every output locked to the brand kit.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={cx(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors",
              running
                ? "border-orange/40 bg-orange/10 text-orange"
                : "border-teal/30 bg-teal/[0.07] text-teal",
            )}
          >
            <span
              className={cx(
                "size-1.5 rounded-full",
                running ? "animate-node-pulse bg-orange" : "bg-teal",
              )}
            />
            {running ? "Generating…" : `Batch ready · ${BATCH.variants}`}
          </span>
          <button
            type="button"
            onClick={runPipeline}
            disabled={running}
            className={cx(
              "group inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all",
              running
                ? "cursor-not-allowed bg-orange/30 text-white/70"
                : "bg-orange text-white shadow-[0_10px_30px_-12px_rgba(203,64,3,0.9)] hover:bg-orange-bright active:translate-y-px",
            )}
          >
            <IconForward
              width={16}
              height={16}
              className={running ? "animate-pulse" : "transition-transform group-hover:translate-x-0.5"}
            />
            Run pipeline
          </button>
        </div>
      </div>

      {/* Pipeline rail */}
      <div className="mt-5">
        <PipelineRail step={step} />
      </div>

      {/* Working nodes */}
      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-3">
        <BriefIntake step={step} reduced={reduced} />
        <ClaudeNode
          step={step}
          reduced={reduced}
          streamLines={streamLines}
          anglesGrouped={anglesGrouped}
        />
        <HiggsfieldNode
          step={step}
          reduced={reduced}
          rendering={rendering}
          frames={frames}
          variants={variants}
          seconds={seconds}
        />
      </div>

      {/* Output grid */}
      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-md bg-orange/12 text-orange ring-1 ring-orange/25">
            <IconBolt width={15} height={15} />
          </span>
          <div>
            <h2 className="font-display text-base font-semibold leading-tight">
              Output · on-brand batch
            </h2>
            <p className="text-[11px] text-faint">
              3 hero concepts + 9 resized cuts · all in the locked kit
            </p>
          </div>
        </div>
        <span className="hidden font-mono text-[11px] text-muted sm:block tabular-nums">
          {BATCH.variants} variants · {BATCH.seconds}s
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ANGLES.map((a, i) => (
          <motion.div
            key={a.id}
            initial={false}
            animate={{
              opacity: outputRevealed ? 1 : 0,
              y: outputRevealed ? 0 : 16,
            }}
            transition={{
              duration: reduced ? 0 : 0.5,
              delay: reduced || !outputRevealed ? 0 : i * 0.12,
            }}
          >
            <CreativeCard angle={a} />
          </motion.div>
        ))}
      </div>

      {/* Variant batch strip */}
      <div className="mt-4 rounded-xl border border-line bg-surface/60 p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-faint">
            Same batch · 9 more cuts
          </span>
          <span className="font-mono text-[10px] text-faint">auto-resized</span>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-9">
          {VARIANT_THUMBS.map((t, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{
                opacity: outputRevealed ? 1 : 0,
                scale: outputRevealed ? 1 : 0.9,
              }}
              transition={{
                duration: reduced ? 0 : 0.35,
                delay: reduced || !outputRevealed ? 0 : 0.3 + i * 0.04,
              }}
              className="relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-md border border-line bg-canvas p-1.5"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(6rem 5rem at 120% -20%, rgba(203,64,3,0.3), transparent 60%)",
                }}
              />
              <span className="relative font-mono text-[9px] text-faint">
                {t.ratio}
              </span>
              <span className="relative font-display text-[10px] font-bold leading-none text-orange">
                Aa
              </span>
              <span className="relative truncate text-[8px] text-muted">
                {t.kind}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 flex flex-col items-center gap-1 border-t border-line pt-5 text-center">
        <div className="text-[11px] text-muted">
          A working concept built for{" "}
          <span className="font-semibold text-ink/80">Moveforth Studio</span> by{" "}
          <span className="font-semibold text-ink/80">Orchanta</span>.
        </div>
        <div className="text-[10px] text-faint">
          Sample data · placeholder visuals · no live AI generation.
        </div>
      </footer>
    </main>
  );
}

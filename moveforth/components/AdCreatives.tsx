"use client";

import { useEffect, useRef, useState } from "react";
import {
  ANGLES,
  STATIC_AD,
  UGC_SCRIPT,
  CAROUSEL,
  type Angle,
} from "./data";
import {
  cx,
  IconCheck,
  IconRefresh,
  IconDownload,
  IconArrow,
} from "./ui";

/* ---------- Creative previews (pure CSS/SVG — no external images) ---------- */

function StaticAdPreview() {
  return (
    <div className="relative flex aspect-[4/5] flex-col overflow-hidden rounded-lg bg-canvas p-4 ring-1 ring-line sm:p-5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(22rem 16rem at 110% -10%, rgba(203,64,3,0.32), transparent 60%)",
        }}
      />
      <div className="relative flex h-full flex-col">
        <span className="text-[10px] font-semibold tracking-[0.22em] text-muted">
          {STATIC_AD.eyebrow}
        </span>
        <h4 className="mt-2 font-display text-[1.6rem] font-bold leading-[1.04] tracking-tight sm:text-3xl">
          {STATIC_AD.headline}
        </h4>
        <div className="mt-3 flex items-end gap-2">
          <span className="font-display text-5xl font-bold leading-none text-orange sm:text-6xl">
            {STATIC_AD.stat}
          </span>
          <span className="mb-1 max-w-[9rem] text-[11px] leading-tight text-muted">
            {STATIC_AD.statCaption}
          </span>
        </div>
        <p className="mt-3 text-[12.5px] leading-snug text-ink/80">
          {STATIC_AD.body}
        </p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange px-3 py-1.5 text-[11px] font-semibold text-white">
            {STATIC_AD.cta}
            <IconArrow width={13} height={13} />
          </span>
          <span className="text-[10px] font-semibold tracking-wide text-faint">
            northbeam<span className="text-orange">.</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function HeadSilhouette() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="h-full w-full"
      aria-hidden
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <linearGradient id="rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#CB4003" stopOpacity="0.9" />
          <stop offset="1" stopColor="#511901" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <g fill="#1c1c20" stroke="url(#rim)" strokeWidth="1.5">
        <circle cx="60" cy="44" r="20" />
        <path d="M24 120c0-22 16-36 36-36s36 14 36 36" />
      </g>
    </svg>
  );
}

function UgcScriptPreview() {
  return (
    <div className="flex flex-col gap-3">
      {/* talking-head frame */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-surface-2 ring-1 ring-line">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(16rem 12rem at 50% 120%, rgba(203,64,3,0.28), transparent 60%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 mx-auto h-[78%] w-[46%] opacity-90">
          <HeadSilhouette />
        </div>
        <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2 py-1 text-[10px] font-semibold text-ink/90 backdrop-blur">
          <span className="size-1.5 animate-node-pulse rounded-full bg-magenta" />
          REC
        </span>
        <span className="absolute right-2.5 top-2.5 rounded-full bg-black/55 px-2 py-1 text-[10px] font-semibold text-ink/90 backdrop-blur">
          {UGC_SCRIPT.duration}
        </span>
        <div className="absolute inset-x-3 bottom-2.5 rounded bg-black/55 px-2 py-1 text-center text-[10px] leading-tight text-ink/85 backdrop-blur">
          “…one queue, no group chats, no guessing.”
        </div>
      </div>
      {/* beats */}
      <ol className="flex flex-col gap-2">
        {UGC_SCRIPT.beats.map((b) => (
          <li key={b.label} className="flex gap-2.5">
            <div className="flex w-14 shrink-0 flex-col items-start pt-0.5">
              <span className="text-[10px] font-bold tracking-wide text-orange">
                {b.label}
              </span>
              <span className="text-[9px] text-faint">{b.time}</span>
            </div>
            <p className="text-[12px] leading-snug text-ink/85">{b.line}</p>
          </li>
        ))}
      </ol>
      <div className="rounded-md border border-line bg-surface-2/60 px-2.5 py-1.5 text-[10.5px] text-muted">
        <span className="font-semibold text-ink/70">B-roll · </span>
        {UGC_SCRIPT.broll}
      </div>
    </div>
  );
}

function CarouselPreview() {
  const [i, setI] = useState(0);
  const n = CAROUSEL.slides.length;
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % n), 2800);
    return () => clearInterval(t);
  }, [n]);
  const slide = CAROUSEL.slides[i];
  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-canvas p-4 ring-1 ring-line sm:p-5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(18rem 14rem at -10% 120%, rgba(81,25,1,0.6), transparent 60%)",
          }}
        />
        <div className="relative flex h-full flex-col">
          <span className="font-display text-4xl font-bold leading-none text-orange/90 sm:text-5xl">
            {slide.kicker}
          </span>
          <h4 className="mt-auto font-display text-xl font-semibold leading-tight tracking-tight sm:text-2xl">
            {slide.title}
          </h4>
          {i === n - 1 && (
            <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-orange px-3 py-1.5 text-[11px] font-semibold text-white">
              {CAROUSEL.cta}
              <IconArrow width={13} height={13} />
            </span>
          )}
        </div>
        {/* edge slide hint */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-black/40 to-transparent" />
      </div>
      <div className="flex items-center justify-center gap-1.5">
        {CAROUSEL.slides.map((_, k) => (
          <button
            key={k}
            type="button"
            onClick={() => setI(k)}
            aria-label={`Slide ${k + 1}`}
            className={cx(
              "h-1.5 rounded-full transition-all",
              k === i ? "w-5 bg-orange" : "w-1.5 bg-line-strong hover:bg-muted",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function Preview({ angle }: { angle: Angle }) {
  if (angle.kind === "static") return <StaticAdPreview />;
  if (angle.kind === "ugc") return <UgcScriptPreview />;
  return <CarouselPreview />;
}

/* ---------- Card chrome with Approve / Regenerate / Export ---------- */

function ActionButton({
  onClick,
  active,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border px-2 py-1.5 text-[11px] font-semibold transition-colors",
        active
          ? "border-teal/40 bg-teal/10 text-teal"
          : "border-line bg-surface-2/40 text-muted hover:border-line-strong hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

export function CreativeCard({ angle }: { angle: Angle }) {
  const [approved, setApproved] = useState(false);
  const [version, setVersion] = useState(1);
  const [regenerating, setRegenerating] = useState(false);
  const [exported, setExported] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  function regenerate() {
    if (regenerating) return;
    setRegenerating(true);
    timers.current.push(
      setTimeout(() => {
        setRegenerating(false);
        setVersion((v) => v + 1);
      }, 950),
    );
  }

  function exportCreative() {
    setExported(true);
    timers.current.push(setTimeout(() => setExported(false), 1900));
  }

  return (
    <div
      className={cx(
        "relative flex flex-col rounded-xl border bg-surface p-4 transition-all duration-300",
        approved
          ? "border-orange/50 shadow-[0_0_0_1px_rgba(203,64,3,0.35),0_18px_50px_-22px_rgba(203,64,3,0.5)]"
          : "border-line shadow-[0_18px_50px_-30px_rgba(0,0,0,0.9)]",
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className="rounded-md bg-orange/12 px-2 py-0.5 text-[10px] font-semibold text-orange ring-1 ring-orange/25">
            {angle.kindLabel}
          </span>
          <span className="rounded-md bg-surface-2 px-2 py-0.5 text-[10px] font-semibold text-muted ring-1 ring-line">
            {angle.stage}
          </span>
        </div>
        <span className="font-mono text-[10px] text-faint">v{version}</span>
      </div>

      <h3 className="mb-3 font-display text-base font-semibold leading-tight tracking-tight">
        {angle.name}
      </h3>

      <div className="relative overflow-hidden rounded-lg">
        <Preview angle={angle} />
        {regenerating && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-canvas/70 backdrop-blur-[2px]">
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <div className="animate-sweep absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-orange/45 to-transparent" />
            </div>
            <span className="relative inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-[11px] font-semibold text-ink">
              <IconRefresh className="animate-spin" />
              Regenerating · on-brand
            </span>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center gap-1.5">
        <ActionButton onClick={() => setApproved((a) => !a)} active={approved}>
          <IconCheck width={13} height={13} />
          {approved ? "Approved" : "Approve"}
        </ActionButton>
        <ActionButton onClick={regenerate}>
          <IconRefresh width={13} height={13} />
          Regenerate
        </ActionButton>
        <ActionButton onClick={exportCreative}>
          <IconDownload width={13} height={13} />
          Export
        </ActionButton>
      </div>

      <div
        aria-live="polite"
        className={cx(
          "pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-teal/15 px-3 py-1 text-[10.5px] font-semibold text-teal ring-1 ring-teal/30 transition-all duration-300",
          exported ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        )}
      >
        Exported PNG · sample
      </div>
    </div>
  );
}

export function OutputCards() {
  return ANGLES.map((a) => <CreativeCard key={a.id} angle={a} />);
}

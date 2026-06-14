"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  type Deal,
  type Stage,
  STAGES,
  STAGE_COLOR,
  CATEGORY_COLOR,
} from "@/lib/data";
import { fmtUSD } from "@/lib/format";
import { useCountUp } from "./useCountUp";

function StageValue({ value }: { value: number }) {
  const v = useCountUp(value);
  return <span className="num">{fmtUSD(v)}</span>;
}

function PipelineCard({
  deal,
  onOpen,
  onMove,
  onDragStart,
}: {
  deal: Deal;
  onOpen: () => void;
  onMove: (dir: 1 | -1) => void;
  onDragStart: () => void;
}) {
  const cat = CATEGORY_COLOR[deal.category];
  const idx = STAGES.indexOf(deal.stage);
  return (
    <motion.div
      layout
      layoutId={`pipe-${deal.id}`}
      draggable
      onDragStart={onDragStart}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 34 }}
      className="group cursor-grab rounded-lg border border-line bg-card p-2.5 shadow-sm active:cursor-grabbing"
    >
      <button
        onClick={onOpen}
        className="block w-full text-left"
        aria-label={`Open ${deal.name} deal card`}
      >
        <div className="flex items-start justify-between gap-2">
          <span className="text-[13px] font-medium text-ink">{deal.name}</span>
          <span
            className="mt-0.5 h-2 w-2 shrink-0 rounded-full"
            style={{ background: cat.fg }}
            title={deal.category}
          />
        </div>
        <div className="num mt-1 text-[11px] text-ink-soft">
          {fmtUSD(deal.asking)} · {deal.mrrMultiple.toFixed(1)}×
        </div>
      </button>
      <div className="mt-2 flex items-center justify-between opacity-0 transition group-hover:opacity-100 focus-within:opacity-100">
        <button
          onClick={() => onMove(-1)}
          disabled={idx === 0}
          aria-label={`Move ${deal.name} to previous stage`}
          className="rounded px-1.5 py-0.5 text-[14px] leading-none text-ink-faint transition hover:bg-canvas hover:text-ink disabled:opacity-30"
        >
          ‹
        </button>
        <span className="text-[9px] uppercase tracking-wide text-ink-faint">
          move stage
        </span>
        <button
          onClick={() => onMove(1)}
          disabled={idx === STAGES.length - 1}
          aria-label={`Move ${deal.name} to next stage`}
          className="rounded px-1.5 py-0.5 text-[14px] leading-none text-ink-faint transition hover:bg-canvas hover:text-ink disabled:opacity-30"
        >
          ›
        </button>
      </div>
    </motion.div>
  );
}

export function Pipeline({
  deals,
  onOpen,
  onStageChange,
}: {
  deals: Deal[];
  onOpen: (deal: Deal) => void;
  onStageChange: (dealId: string, stage: Stage) => void;
}) {
  let dragId: string | null = null;

  const moveBy = (deal: Deal, dir: 1 | -1) => {
    const idx = STAGES.indexOf(deal.stage);
    const next = idx + dir;
    if (next < 0 || next >= STAGES.length) return;
    onStageChange(deal.id, STAGES[next]);
  };

  return (
    <div className="thin-scroll -mx-1 flex gap-3 overflow-x-auto px-1 pb-2">
      {STAGES.map((stage) => {
        const col = deals.filter((d) => d.stage === stage);
        const total = col.reduce((s, d) => s + d.asking, 0);
        const c = STAGE_COLOR[stage];
        return (
          <div
            key={stage}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (dragId) onStageChange(dragId, stage);
              dragId = null;
            }}
            className="flex w-[200px] shrink-0 flex-col rounded-xl border border-line bg-canvas/50 p-2"
          >
            <div className="mb-2 flex items-center justify-between px-1">
              <span
                className="rounded-md px-1.5 py-0.5 text-[11px] font-semibold"
                style={{ color: c.fg, background: c.bg }}
              >
                {stage}
              </span>
              <span className="text-[10px] text-ink-faint num">{col.length}</span>
            </div>
            <div className="num mb-2 px-1 text-[12px] font-semibold text-ink">
              <StageValue value={total} />
              <span className="ml-1 text-[10px] font-normal text-ink-faint">
                in stage
              </span>
            </div>
            <div className="flex min-h-[60px] flex-col gap-2">
              <AnimatePresence mode="popLayout">
                {col.map((deal) => (
                  <PipelineCard
                    key={deal.id}
                    deal={deal}
                    onOpen={() => onOpen(deal)}
                    onMove={(dir) => moveBy(deal, dir)}
                    onDragStart={() => {
                      dragId = deal.id;
                    }}
                  />
                ))}
              </AnimatePresence>
              {col.length === 0 && (
                <div className="rounded-lg border border-dashed border-line py-4 text-center text-[11px] text-ink-faint">
                  Drop here
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import {
  type Deal,
  CATEGORY_COLOR,
  STAGE_COLOR,
  BUYERS,
} from "@/lib/data";
import { fmtUSD, fmtUSDFull, fmtCount } from "@/lib/format";
import { Sparkline } from "./Sparkline";
import { Tag } from "./Tag";

function Metric({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-lg border border-line bg-canvas/60 px-3 py-2.5">
      <div className="text-[10px] uppercase tracking-wide text-ink-faint">
        {label}
      </div>
      <div className="num mt-0.5 text-[15px] font-semibold text-ink">
        {value}
      </div>
      {sub && <div className="num mt-0.5 text-[10px] text-ink-soft">{sub}</div>}
    </div>
  );
}

function ChurnSplit({ involuntary }: { involuntary: number }) {
  const voluntary = 100 - involuntary;
  return (
    <div>
      <div className="flex h-2.5 w-full overflow-hidden rounded-full">
        <motion.div
          className="h-full"
          style={{ background: "var(--color-orange)" }}
          initial={{ width: 0 }}
          animate={{ width: `${voluntary}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <motion.div
          className="h-full"
          style={{ background: "var(--color-purple)" }}
          initial={{ width: 0 }}
          animate={{ width: `${involuntary}%` }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        />
      </div>
      <div className="mt-1.5 flex justify-between text-[10px] text-ink-soft">
        <span className="num">
          <span
            className="mr-1 inline-block h-1.5 w-1.5 rounded-full align-middle"
            style={{ background: "var(--color-orange)" }}
          />
          Voluntary {voluntary}%
        </span>
        <span className="num">
          Involuntary {involuntary}%
          <span
            className="ml-1 inline-block h-1.5 w-1.5 rounded-full align-middle"
            style={{ background: "var(--color-purple)" }}
          />
        </span>
      </div>
    </div>
  );
}

function MixBar({ organic }: { organic: number }) {
  const paid = 100 - organic;
  return (
    <div>
      <div className="flex h-2.5 w-full overflow-hidden rounded-full">
        <motion.div
          className="h-full"
          style={{ background: "var(--color-green)" }}
          initial={{ width: 0 }}
          animate={{ width: `${organic}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <motion.div
          className="h-full"
          style={{ background: "var(--color-blue)" }}
          initial={{ width: 0 }}
          animate={{ width: `${paid}%` }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        />
      </div>
      <div className="mt-1.5 flex justify-between text-[10px] text-ink-soft">
        <span className="num">
          <span
            className="mr-1 inline-block h-1.5 w-1.5 rounded-full align-middle"
            style={{ background: "var(--color-green)" }}
          />
          Organic {organic}%
        </span>
        <span className="num">
          Paid {paid}%
          <span
            className="ml-1 inline-block h-1.5 w-1.5 rounded-full align-middle"
            style={{ background: "var(--color-blue)" }}
          />
        </span>
      </div>
    </div>
  );
}

export function DealCard({ deal, onClose }: { deal: Deal; onClose: () => void }) {
  const cat = CATEGORY_COLOR[deal.category];
  const stage = STAGE_COLOR[deal.stage];
  const cohortLabels = ["D0", "D7", "D14", "D30", "D60", "D90", "D180"];
  const readyCount = deal.diligence.filter((d) => d.ready).length;

  const matches = BUYERS.filter(
    (b) =>
      b.mandate.includes(deal.category) &&
      deal.asking >= b.checkLow &&
      deal.asking <= b.checkHigh,
  ).slice(0, 3);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-stretch justify-end bg-ink/25 backdrop-blur-[2px] sm:items-center sm:justify-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${deal.name} deal card`}
        className="thin-scroll flex w-full max-w-2xl flex-col overflow-y-auto bg-card shadow-2xl sm:rounded-2xl"
        initial={{ x: 40, opacity: 0, scale: 0.99 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        exit={{ x: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-line bg-card/95 px-5 py-4 backdrop-blur sm:px-6">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-lg font-semibold text-ink">
                {deal.name}
              </h2>
              <Tag label={deal.category} fg={cat.fg} bg={cat.bg} dot />
              <Tag label={deal.stage} fg={stage.fg} bg={stage.bg} />
            </div>
            <p className="mt-1 text-[13px] leading-snug text-ink-soft">
              {deal.blurb}
            </p>
            <p className="num mt-0.5 text-[11px] text-ink-faint">
              {deal.platform} · asking {fmtUSDFull(deal.asking)}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close deal card"
            className="shrink-0 rounded-md px-2 py-1 text-ink-faint transition hover:bg-canvas hover:text-ink"
          >
            ✕
          </button>
        </div>

        <div className="space-y-5 px-5 py-5 sm:px-6">
          {/* top metric grid */}
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            <Metric label="ARR" value={fmtUSD(deal.arr)} sub={`${fmtUSD(deal.mrr)} MRR`} />
            <Metric
              label="Multiple"
              value={`${deal.mrrMultiple.toFixed(1)}× MRR`}
              sub={`${deal.ebitdaMultiple.toFixed(1)}× EBITDA`}
            />
            <Metric
              label="Retention"
              value={`${deal.d30}% D30`}
              sub={`${deal.d90}% D90`}
            />
            <Metric
              label="MAU / DAU"
              value={fmtCount(deal.mau)}
              sub={`${fmtCount(deal.dau)} DAU`}
            />
          </div>

          {/* retention cohort sparkline */}
          <section className="rounded-xl border border-line bg-canvas/40 p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-[13px] font-semibold text-ink">
                Retention cohort
              </h3>
              <span className="num text-[11px] text-ink-soft">
                {deal.churn}% monthly churn
              </span>
            </div>
            <Sparkline
              values={deal.cohort}
              labels={cohortLabels}
              color={cat.fg}
            />
          </section>

          {/* LTV/CAC + churn split + acquisition mix */}
          <div className="grid gap-3 sm:grid-cols-3">
            <section className="rounded-xl border border-line bg-canvas/40 p-4">
              <h3 className="text-[13px] font-semibold text-ink">Unit economics</h3>
              <div className="mt-2.5 flex items-end gap-3">
                <div>
                  <div className="num text-2xl font-semibold text-ink">
                    {(deal.ltv / deal.cac).toFixed(1)}×
                  </div>
                  <div className="text-[10px] uppercase tracking-wide text-ink-faint">
                    LTV / CAC
                  </div>
                </div>
                <div className="num pb-0.5 text-[11px] text-ink-soft">
                  ${deal.ltv} LTV · ${deal.cac} CAC
                </div>
              </div>
              <div className="num mt-2 text-[11px] text-ink-soft">
                Payback {deal.paybackMonths.toFixed(1)} mo
              </div>
            </section>

            <section className="rounded-xl border border-line bg-canvas/40 p-4">
              <h3 className="mb-3 text-[13px] font-semibold text-ink">
                Churn split
              </h3>
              <ChurnSplit involuntary={deal.involuntaryChurnShare} />
            </section>

            <section className="rounded-xl border border-line bg-canvas/40 p-4">
              <h3 className="mb-3 text-[13px] font-semibold text-ink">
                Acquisition mix
              </h3>
              <MixBar organic={deal.organicShare} />
            </section>
          </div>

          {/* due diligence checklist */}
          <section className="rounded-xl border border-line bg-canvas/40 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[13px] font-semibold text-ink">
                Due-diligence readiness
              </h3>
              <span className="num text-[11px] text-ink-soft">
                {readyCount}/{deal.diligence.length} ready
              </span>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {deal.diligence.map((d, i) => (
                <motion.li
                  key={d.label}
                  className="flex items-center gap-2 rounded-lg bg-card px-3 py-2 text-[13px]"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                >
                  <span
                    className="grid h-4 w-4 shrink-0 place-items-center rounded-full text-[10px] font-bold text-white"
                    style={{
                      background: d.ready
                        ? "var(--color-green)"
                        : "var(--color-orange)",
                    }}
                  >
                    {d.ready ? "✓" : "!"}
                  </span>
                  <span
                    className={d.ready ? "text-ink" : "text-ink-soft"}
                  >
                    {d.label}
                  </span>
                  <span
                    className="num ml-auto text-[10px] font-medium"
                    style={{
                      color: d.ready
                        ? "var(--color-green)"
                        : "var(--color-orange)",
                    }}
                  >
                    {d.ready ? "Ready" : "Missing"}
                  </span>
                </motion.li>
              ))}
            </ul>
          </section>

          {/* matched buyers preview */}
          <section className="rounded-xl border border-line bg-canvas/40 p-4">
            <h3 className="mb-2 text-[13px] font-semibold text-ink">
              Top buyer matches
            </h3>
            {matches.length === 0 ? (
              <p className="text-[12px] text-ink-soft">
                No buyer in the pool currently matches this mandate + check size.
              </p>
            ) : (
              <ul className="space-y-1.5">
                {matches.map((b) => (
                  <li
                    key={b.id}
                    className="flex items-center justify-between gap-2 text-[12px]"
                  >
                    <span className="truncate text-ink">{b.name}</span>
                    <span className="num shrink-0 text-ink-soft">
                      {fmtUSD(b.checkLow)}–{fmtUSD(b.checkHigh)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-2 text-[10px] text-ink-faint">
              Full matching with mandate fit lives in the &ldquo;Match buyers&rdquo; panel.
            </p>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
}

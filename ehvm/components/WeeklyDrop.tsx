"use client";

import { motion } from "framer-motion";
import { type Deal, CATEGORY_COLOR } from "@/lib/data";
import { fmtUSD } from "@/lib/format";

export function WeeklyDrop({
  deals,
  onOpen,
}: {
  deals: Deal[];
  onOpen: (deal: Deal) => void;
}) {
  // "Newly listed" = anything in the Listed stage — auto-assembled, no manual prep.
  const listed = deals.filter((d) => d.stage === "Listed");
  const total = listed.reduce((s, d) => s + d.asking, 0);

  return (
    <div className="rounded-xl border border-line bg-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-[14px] font-semibold text-ink">
            This week&rsquo;s drop
          </h3>
          <p className="text-[11px] text-ink-soft">
            Auto-assembled from newly-listed apps — replaces the manual
            newsletter prep.
          </p>
        </div>
        <div className="text-right">
          <div className="num text-[15px] font-semibold text-ink">
            {fmtUSD(total)}
          </div>
          <div className="text-[10px] text-ink-faint">
            {listed.length} new this week
          </div>
        </div>
      </div>

      {listed.length === 0 ? (
        <p className="mt-3 text-[12px] text-ink-soft">
          No newly-listed apps in this filter.
        </p>
      ) : (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {listed.map((deal, i) => {
            const cat = CATEGORY_COLOR[deal.category];
            return (
              <motion.button
                key={deal.id}
                onClick={() => onOpen(deal)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
                className="flex items-center gap-3 rounded-lg border border-line bg-canvas/50 p-2.5 text-left transition hover:border-line-strong hover:bg-canvas"
                aria-label={`Open ${deal.name} in this week's drop`}
              >
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[12px] font-bold"
                  style={{ color: cat.fg, background: cat.bg }}
                >
                  {deal.name.slice(0, 2)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-[13px] font-medium text-ink">
                      {deal.name}
                    </span>
                    <span className="num shrink-0 text-[12px] font-semibold text-ink">
                      {fmtUSD(deal.asking)}
                    </span>
                  </div>
                  <p className="truncate text-[11px] text-ink-soft">
                    {deal.category} · {deal.mrrMultiple.toFixed(1)}× MRR · D30{" "}
                    {deal.d30}%
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      )}
    </div>
  );
}

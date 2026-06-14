"use client";

import { motion } from "framer-motion";
import { type Deal, BUYERS, CATEGORY_COLOR } from "@/lib/data";
import { fmtUSD } from "@/lib/format";

function scoreBuyer(deal: Deal, buyer: (typeof BUYERS)[number]) {
  let reasons: string[] = [];
  let score = 0;
  if (buyer.mandate.includes(deal.category)) {
    score += 2;
    reasons.push(`${deal.category} mandate`);
  }
  if (deal.asking >= buyer.checkLow && deal.asking <= buyer.checkHigh) {
    score += 2;
    reasons.push("check size fits");
  } else if (
    deal.asking >= buyer.checkLow * 0.7 &&
    deal.asking <= buyer.checkHigh * 1.3
  ) {
    score += 1;
    reasons.push("near check range");
  }
  if (deal.d30 >= 38) {
    score += 1;
    reasons.push("strong D30");
  }
  return { score, reasons };
}

export function BuyerPanel({
  deal,
  onPickDeal,
}: {
  deal: Deal | null;
  onPickDeal: () => void;
}) {
  if (!deal) {
    return (
      <div className="rounded-xl border border-dashed border-line bg-canvas/40 p-5 text-center">
        <p className="text-[13px] text-ink-soft">
          Select a deal to surface buyer matches from the
          <span className="font-medium text-ink"> 125+ vetted-buyer pool</span>.
        </p>
        <button
          onClick={onPickDeal}
          className="mt-3 rounded-lg border border-line-strong bg-card px-3 py-1.5 text-[12px] font-medium text-ink transition hover:bg-canvas"
        >
          Match buyers for top deal
        </button>
      </div>
    );
  }

  const cat = CATEGORY_COLOR[deal.category];
  const ranked = BUYERS.map((b) => ({ buyer: b, ...scoreBuyer(deal, b) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="text-[13px] text-ink-soft">Buyers for</span>
        <span
          className="rounded-md px-2 py-0.5 text-[12px] font-semibold"
          style={{ color: cat.fg, background: cat.bg }}
        >
          {deal.name}
        </span>
        <span className="num text-[12px] text-ink-faint">
          asking {fmtUSD(deal.asking)} · {deal.category}
        </span>
      </div>
      <div className="space-y-2">
        {ranked.map((r, i) => (
          <motion.div
            key={r.buyer.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
            className="rounded-lg border border-line bg-card p-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="truncate text-[13px] font-medium text-ink">
                    {r.buyer.name}
                  </span>
                  <span className="rounded bg-canvas px-1.5 py-0.5 text-[10px] text-ink-soft">
                    {r.buyer.type}
                  </span>
                </div>
                <p className="mt-1 text-[11px] leading-snug text-ink-soft">
                  {r.buyer.note}
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {r.reasons.map((reason) => (
                    <span
                      key={reason}
                      className="rounded px-1.5 py-0.5 text-[10px] font-medium"
                      style={{
                        color: "var(--color-green)",
                        background: "var(--color-green-soft)",
                      }}
                    >
                      {reason}
                    </span>
                  ))}
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="num text-[11px] text-ink-soft">
                  {fmtUSD(r.buyer.checkLow)}–{fmtUSD(r.buyer.checkHigh)}
                </div>
                <div className="mt-1 flex justify-end gap-0.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span
                      key={n}
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        background:
                          n <= r.score
                            ? "var(--color-orange)"
                            : "var(--color-line-strong)",
                      }}
                    />
                  ))}
                </div>
                <div className="num mt-0.5 text-[10px] text-ink-faint">
                  fit {r.score}/5
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <p className="mt-3 text-[10px] text-ink-faint">
        Sample matching across 40+ PE firms, app roll-ups &amp; public cos in
        health / gaming / edu. Mandate &amp; check-size fit only — not investment
        advice.
      </p>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { type Deal, CATEGORY_COLOR, STAGE_COLOR } from "@/lib/data";
import { fmtUSD, fmtCount } from "@/lib/format";
import { Tag } from "./Tag";

export type SortKey =
  | "name"
  | "arr"
  | "mrrMultiple"
  | "d30"
  | "asking"
  | "mau";

type Col = {
  key: SortKey;
  label: string;
  align: "left" | "right";
  render: (d: Deal) => React.ReactNode;
};

const columns: Col[] = [
  {
    key: "name",
    label: "App / Game",
    align: "left",
    render: (d) => (
      <div className="flex items-center gap-2">
        <span className="font-medium text-ink">{d.name}</span>
        <Tag
          label={d.category}
          fg={CATEGORY_COLOR[d.category].fg}
          bg={CATEGORY_COLOR[d.category].bg}
          dot
        />
      </div>
    ),
  },
  {
    key: "arr",
    label: "ARR",
    align: "right",
    render: (d) => <span className="num">{fmtUSD(d.arr)}</span>,
  },
  {
    key: "mrrMultiple",
    label: "Multiple",
    align: "right",
    render: (d) => (
      <span className="num">
        {d.mrrMultiple.toFixed(1)}×
        <span className="ml-1 text-ink-faint">/ {d.ebitdaMultiple.toFixed(1)}×</span>
      </span>
    ),
  },
  {
    key: "d30",
    label: "Retention",
    align: "right",
    render: (d) => (
      <span className="num">
        {d.d30}%
        <span className="ml-1 text-ink-faint">/ {d.d90}%</span>
      </span>
    ),
  },
  {
    key: "mau",
    label: "MAU / DAU",
    align: "right",
    render: (d) => (
      <span className="num">
        {fmtCount(d.mau)}
        <span className="ml-1 text-ink-faint">/ {fmtCount(d.dau)}</span>
      </span>
    ),
  },
  {
    key: "asking",
    label: "Asking",
    align: "right",
    render: (d) => (
      <span className="num font-semibold text-ink">{fmtUSD(d.asking)}</span>
    ),
  },
];

export function PortfolioTable({
  deals,
  sortKey,
  sortDir,
  onSort,
  onOpen,
}: {
  deals: Deal[];
  sortKey: SortKey;
  sortDir: "asc" | "desc";
  onSort: (key: SortKey) => void;
  onOpen: (deal: Deal) => void;
}) {
  return (
    <div className="thin-scroll overflow-x-auto rounded-xl border border-line bg-card">
      <table className="w-full min-w-[640px] border-collapse text-[13px]">
        <thead>
          <tr className="border-b border-line text-left">
            {columns.map((c) => (
              <th
                key={c.key}
                className={`px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-ink-faint ${
                  c.align === "right" ? "text-right" : "text-left"
                }`}
              >
                <button
                  onClick={() => onSort(c.key)}
                  className={`inline-flex items-center gap-1 transition hover:text-ink ${
                    sortKey === c.key ? "text-ink" : ""
                  }`}
                >
                  {c.label}
                  <span className="text-[9px]">
                    {sortKey === c.key ? (sortDir === "asc" ? "▲" : "▼") : "↕"}
                  </span>
                </button>
              </th>
            ))}
            <th className="px-3 py-2.5 text-right text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
              Stage
            </th>
          </tr>
        </thead>
        <tbody>
          {deals.map((d, i) => {
            const stage = STAGE_COLOR[d.stage];
            return (
              <motion.tr
                key={d.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: Math.min(i * 0.02, 0.2) }}
                className="group cursor-pointer border-b border-line/70 transition last:border-0 hover:bg-canvas/70"
                onClick={() => onOpen(d)}
              >
                {columns.map((c, ci) => (
                  <td
                    key={c.key}
                    className={`px-3 py-2.5 ${
                      c.align === "right" ? "text-right" : "text-left"
                    }`}
                  >
                    {ci === 0 ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpen(d);
                        }}
                        className="text-left"
                        aria-label={`Open ${d.name} deal card`}
                      >
                        {c.render(d)}
                      </button>
                    ) : (
                      c.render(d)
                    )}
                  </td>
                ))}
                <td className="px-3 py-2.5 text-right">
                  <Tag label={d.stage} fg={stage.fg} bg={stage.bg} />
                </td>
              </motion.tr>
            );
          })}
          {deals.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="px-3 py-8 text-center text-[13px] text-ink-soft"
              >
                No deals match this filter.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

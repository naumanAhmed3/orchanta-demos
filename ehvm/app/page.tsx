"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  DEALS,
  STAGES,
  type Deal,
  type Stage,
  type Category,
  CATEGORY_COLOR,
} from "@/lib/data";
import { fmtUSD } from "@/lib/format";
import { useCountUp } from "@/components/useCountUp";
import { PortfolioTable, type SortKey } from "@/components/PortfolioTable";
import { DealCard } from "@/components/DealCard";
import { Pipeline } from "@/components/Pipeline";
import { BuyerPanel } from "@/components/BuyerPanel";
import { WeeklyDrop } from "@/components/WeeklyDrop";

const CATEGORIES: Category[] = [
  "AI",
  "Game",
  "Productivity",
  "Health",
  "Education",
  "Finance",
];

type Tab = "portfolio" | "pipeline" | "drop";

function Wordmark() {
  return (
    <div className="flex items-center gap-2">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-[12px] font-bold tracking-tight text-canvas">
        EH
      </span>
      <div className="flex items-center gap-1.5">
        <span className="text-[15px] font-bold tracking-tight text-ink">
          EHVM Deal Desk
        </span>
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--color-orange)" }}
        />
      </div>
    </div>
  );
}

function TotalCounter({ value, count }: { value: number; count: number }) {
  const v = useCountUp(value);
  return (
    <div className="rounded-xl border border-line bg-card px-4 py-3">
      <div className="text-[11px] uppercase tracking-wide text-ink-faint">
        Total asking value
      </div>
      <div className="num mt-0.5 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        {fmtUSD(v)}
      </div>
      <div className="num mt-0.5 text-[11px] text-ink-soft">
        across {count} live deal{count === 1 ? "" : "s"} · recomputes as you filter
      </div>
    </div>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-card px-4 py-3">
      <div className="text-[11px] uppercase tracking-wide text-ink-faint">
        {label}
      </div>
      <div className="num mt-0.5 text-lg font-semibold text-ink">{value}</div>
    </div>
  );
}

export default function Home() {
  const [deals, setDeals] = useState<Deal[]>(DEALS);
  const [tab, setTab] = useState<Tab>("portfolio");
  const [catFilter, setCatFilter] = useState<Category | "All">("All");
  const [stageFilter, setStageFilter] = useState<Stage | "All">("All");
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("asking");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [openDeal, setOpenDeal] = useState<Deal | null>(null);
  const [buyerDeal, setBuyerDeal] = useState<Deal | null>(null);

  const filtered = useMemo(() => {
    let list = deals.filter((d) => {
      if (catFilter !== "All" && d.category !== catFilter) return false;
      if (stageFilter !== "All" && d.stage !== stageFilter) return false;
      if (query && !d.name.toLowerCase().includes(query.toLowerCase()))
        return false;
      return true;
    });
    const dir = sortDir === "asc" ? 1 : -1;
    list = [...list].sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name) * dir;
      return ((a[sortKey] as number) - (b[sortKey] as number)) * dir;
    });
    return list;
  }, [deals, catFilter, stageFilter, query, sortKey, sortDir]);

  const totalAsking = filtered.reduce((s, d) => s + d.asking, 0);
  const totalArr = filtered.reduce((s, d) => s + d.arr, 0);
  const avgD30 =
    filtered.length > 0
      ? Math.round(filtered.reduce((s, d) => s + d.d30, 0) / filtered.length)
      : 0;

  const onSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "name" ? "asc" : "desc");
    }
  };

  const openDealCard = (d: Deal) => {
    setOpenDeal(d);
    setBuyerDeal(d); // selecting a deal also drives the Match-buyers panel
  };

  const onStageChange = (dealId: string, stage: Stage) => {
    setDeals((prev) =>
      prev.map((d) => (d.id === dealId ? { ...d, stage } : d)),
    );
    setBuyerDeal((bd) => (bd && bd.id === dealId ? { ...bd, stage } : bd));
  };

  // keep openDeal/buyerDeal in sync with latest deal data
  const liveOpen = openDeal
    ? deals.find((d) => d.id === openDeal.id) ?? openDeal
    : null;
  const liveBuyer = buyerDeal
    ? deals.find((d) => d.id === buyerDeal.id) ?? buyerDeal
    : null;

  const tabs: { id: Tab; label: string }[] = [
    { id: "portfolio", label: "Portfolio" },
    { id: "pipeline", label: "Pipeline" },
    { id: "drop", label: "This week's drop" },
  ];

  return (
    <div className="min-h-screen">
      {/* concept banner */}
      <div className="bg-ink px-4 py-2 text-center text-[11px] font-medium text-canvas/90">
        Working concept · sample data only · built by Orchanta for EHVM Apps
        Capital
      </div>

      {/* header */}
      <header className="sticky top-0 z-30 border-b border-line bg-canvas/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Wordmark />
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1 rounded-lg border border-line bg-card p-0.5 sm:flex">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`relative rounded-md px-3 py-1.5 text-[12px] font-medium transition ${
                    tab === t.id ? "text-ink" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {tab === t.id && (
                    <motion.span
                      layoutId="tabpill"
                      className="absolute inset-0 rounded-md bg-canvas"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{t.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* mobile tabs */}
        <div className="flex gap-1 overflow-x-auto border-t border-line px-4 py-2 sm:hidden">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`shrink-0 rounded-md px-3 py-1.5 text-[12px] font-medium transition ${
                tab === t.id
                  ? "bg-card text-ink"
                  : "text-ink-soft"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {/* hero intro */}
        <div className="mb-5">
          <h1 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
            One system of record for apps &amp; games M&amp;A
          </h1>
          <p className="mt-1 max-w-2xl text-[13px] leading-relaxed text-ink-soft">
            Spreadsheets and a weekly newsletter, replaced by a live deal desk:
            portfolio, deal cards, a drag-or-click pipeline, buyer matching, and
            an auto-assembled weekly drop.
          </p>
        </div>

        {/* top stats */}
        <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <TotalCounter value={totalAsking} count={filtered.length} />
          <StatPill label="Portfolio ARR" value={fmtUSD(totalArr)} />
          <StatPill label="Avg D30 retention" value={`${avgD30}%`} />
          <StatPill label="Vetted buyers" value="125+" />
        </div>

        {/* filter bar */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search app / game…"
            className="w-full rounded-lg border border-line bg-card px-3 py-1.5 text-[13px] text-ink outline-none transition placeholder:text-ink-faint focus:border-line-strong sm:w-52"
          />
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setCatFilter("All")}
              className={`rounded-md px-2.5 py-1 text-[12px] font-medium transition ${
                catFilter === "All"
                  ? "bg-ink text-canvas"
                  : "border border-line bg-card text-ink-soft hover:text-ink"
              }`}
            >
              All
            </button>
            {CATEGORIES.map((c) => {
              const col = CATEGORY_COLOR[c];
              const active = catFilter === c;
              return (
                <button
                  key={c}
                  onClick={() => setCatFilter(active ? "All" : c)}
                  className="rounded-md px-2.5 py-1 text-[12px] font-medium transition"
                  style={{
                    color: active ? "#fff" : col.fg,
                    background: active ? col.fg : col.bg,
                  }}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        {/* stage filter (portfolio only) */}
        {tab === "portfolio" && (
          <div className="mb-4 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] uppercase tracking-wide text-ink-faint">
              Stage
            </span>
            <button
              onClick={() => setStageFilter("All")}
              className={`rounded-md px-2 py-0.5 text-[11px] font-medium transition ${
                stageFilter === "All"
                  ? "bg-ink text-canvas"
                  : "border border-line bg-card text-ink-soft hover:text-ink"
              }`}
            >
              All
            </button>
            {STAGES.map((s) => (
              <button
                key={s}
                onClick={() =>
                  setStageFilter((cur) => (cur === s ? "All" : s))
                }
                className={`rounded-md px-2 py-0.5 text-[11px] font-medium transition ${
                  stageFilter === s
                    ? "bg-ink text-canvas"
                    : "border border-line bg-card text-ink-soft hover:text-ink"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* views */}
        {tab === "portfolio" && (
          <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
            <PortfolioTable
              deals={filtered}
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={onSort}
              onOpen={openDealCard}
            />
            <aside className="rounded-xl border border-line bg-canvas/40 p-4">
              <h2 className="mb-3 text-[13px] font-semibold text-ink">
                Match buyers
              </h2>
              <BuyerPanel
                deal={liveBuyer}
                onPickDeal={() => setBuyerDeal(filtered[0] ?? deals[0])}
              />
            </aside>
          </div>
        )}

        {tab === "pipeline" && (
          <div className="space-y-4">
            <p className="text-[12px] text-ink-soft">
              Drag a deal across stages, or hover a card and use the arrows. Each
              column shows its rolled-up asking value.
            </p>
            <Pipeline
              deals={filtered}
              onOpen={openDealCard}
              onStageChange={onStageChange}
            />
          </div>
        )}

        {tab === "drop" && (
          <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
            <WeeklyDrop deals={filtered} onOpen={openDealCard} />
            <aside className="rounded-xl border border-line bg-canvas/40 p-4">
              <h2 className="mb-3 text-[13px] font-semibold text-ink">
                Match buyers
              </h2>
              <BuyerPanel
                deal={liveBuyer}
                onPickDeal={() =>
                  setBuyerDeal(
                    filtered.find((d) => d.stage === "Listed") ??
                      filtered[0] ??
                      deals[0],
                  )
                }
              />
            </aside>
          </div>
        )}

        {/* footer */}
        <footer className="mt-10 border-t border-line pt-5 text-[11px] text-ink-faint">
          <p>
            EHVM Deal Desk — a working concept by{" "}
            <span className="font-medium text-ink-soft">Orchanta</span>. All
            figures, apps, games and buyers shown are{" "}
            <span className="font-medium text-ink-soft">sample data</span> for
            demonstration only.
          </p>
        </footer>
      </main>

      <AnimatePresence>
        {liveOpen && (
          <DealCard
            deal={liveOpen}
            onClose={() => setOpenDeal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

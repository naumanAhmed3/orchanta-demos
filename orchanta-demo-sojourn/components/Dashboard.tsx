"use client";

import { useState } from "react";
import { HERO, RANGES, TABS, type RangeKey, type TabKey } from "@/lib/data";
import { CountUp } from "./Charts";
import { ReportPanel } from "./Panels";

function VineMotif() {
  return (
    <svg
      className="float-motif pointer-events-none absolute -right-6 top-2 h-64 w-64 opacity-70 sm:right-6 lg:h-80 lg:w-80"
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="100" cy="86" r="58" stroke="var(--gold-400)" strokeWidth="0.8" opacity="0.5" />
      <circle cx="100" cy="86" r="40" stroke="var(--gold-400)" strokeWidth="0.8" opacity="0.35" />
      {/* wine glass silhouette */}
      <path
        d="M76 54 Q100 96 124 54 Q124 92 100 100 L100 138 M84 142 H116"
        stroke="var(--gold-400)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path d="M80 60 Q100 86 120 60" fill="var(--gold-400)" opacity="0.18" />
      {/* grape cluster */}
      {[
        [150, 120],
        [160, 132],
        [140, 132],
        [155, 144],
        [145, 156],
        [150, 132],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="6" fill="var(--rose-300)" opacity="0.5" />
      ))}
    </svg>
  );
}

export default function Dashboard() {
  const [tab, setTab] = useState<TabKey>("club");
  const [range, setRange] = useState<RangeKey>("12M");
  const hero = HERO[range];
  const caption = RANGES.find((r) => r.key === range)?.caption ?? "";

  return (
    <div>
      {/* ----------------------------------------------------------- hero */}
      <header className="relative overflow-hidden grain text-[var(--cream-50)]">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(120% 120% at 85% -10%, #7a1e2d 0%, #54121f 42%, #3b0d18 78%, #2b0a13 100%)",
          }}
        />
        <div className="shell relative pt-7 pb-2">
          <nav className="flex items-center justify-between gap-4">
            <div className="rise" style={{ animationDelay: "60ms" }}>
              <p className="serif text-xl tracking-tight text-[var(--cream-50)]">Sojourn Cellars</p>
              <p className="kicker text-[0.6rem] text-[var(--gold-200)]">Custom Analytics Studio</p>
            </div>
            <span className="pill pill-live rise" style={{ animationDelay: "140ms" }}>
              <span className="dot" /> Live · Demo mode
            </span>
          </nav>
        </div>

        <div className="shell relative pb-16 pt-10 sm:pt-14">
          <VineMotif />
          <p className="kicker rise text-[var(--gold-200)]" style={{ animationDelay: "120ms" }}>
            Sonoma · Shopify · Custom Reporting
          </p>
          <h1
            className="rise mt-4 max-w-3xl text-4xl leading-[1.04] sm:text-6xl"
            style={{ animationDelay: "220ms" }}
          >
            The reports off-the-shelf
            <br />
            apps <span className="italic text-[var(--gold-400)]">can&rsquo;t</span> build.
          </h1>
          <p
            className="rise mt-5 max-w-xl text-[1.02rem] leading-relaxed text-[rgba(247,241,231,0.82)]"
            style={{ animationDelay: "320ms" }}
          >
            A custom analytics layer over your Shopify data — wine club lifetime value,
            allocation sell-through, channel margin and cohort retention, composed into one
            elegant board. Every figure below is sample data.
          </p>

          {/* KPI strip */}
          <div
            className="rise mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[rgba(231,212,166,0.22)] bg-[rgba(231,212,166,0.16)] lg:grid-cols-4"
            style={{ animationDelay: "420ms" }}
          >
            {hero.map((stat) => (
              <div
                key={stat.label}
                className="bg-[rgba(43,10,19,0.36)] px-5 py-5 backdrop-blur-sm"
              >
                <p className="kicker text-[0.58rem] text-[var(--gold-200)]">{stat.label}</p>
                <p className="serif mt-2 text-lg leading-none tracking-tight sm:text-[1.85rem]">
                  <CountUp
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </p>
                <p className="mt-1.5 text-[0.7rem] text-[rgba(247,241,231,0.6)]">{stat.hint}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="gold-rule" />
      </header>

      {/* --------------------------------------------------- sticky controls */}
      <div className="sticky top-0 z-30 border-b border-[var(--hairline)] bg-[rgba(251,247,239,0.86)] backdrop-blur-md">
        <div className="shell py-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div
              className="flex gap-2 overflow-x-auto pb-1"
              role="tablist"
              aria-label="Reports"
            >
              {TABS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={tab === t.key}
                  data-active={tab === t.key}
                  className="tab-btn shrink-0"
                  onClick={() => setTab(t.key)}
                >
                  <span className="tab-label">{t.label}</span>
                  <span className="tab-sub">{t.sub}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3 lg:justify-end">
              <span className="hidden text-[0.74rem] text-[var(--ink-500)] sm:inline">{caption}</span>
              <div className="range-group" role="group" aria-label="Date range">
                {RANGES.map((r) => (
                  <button
                    key={r.key}
                    type="button"
                    data-active={range === r.key}
                    aria-pressed={range === r.key}
                    className="range-btn"
                    onClick={() => setRange(r.key)}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------- panel */}
      <main className="shell py-10 sm:py-14">
        <div key={tab} className="panel-enter">
          <ReportPanel tab={tab} range={range} />
        </div>
      </main>
    </div>
  );
}

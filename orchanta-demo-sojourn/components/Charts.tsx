"use client";

import { ReactNode } from "react";
import { useInView, useCountUp } from "@/lib/useAnim";
import { formatStat, formatNumber, compactCurrency } from "@/lib/format";
import type { Bar, Series, Channel, Stat } from "@/lib/data";
import { COHORTS, COHORT_MONTHS } from "@/lib/data";

/* ---------------------------------------------------------------- CountUp */
export function CountUp({
  value,
  active = true,
  prefix,
  suffix,
  decimals,
}: {
  value: number;
  active?: boolean;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const n = useCountUp(value, active);
  return <span className="tnum">{formatStat(n, { prefix, suffix, decimals })}</span>;
}

/* ---------------------------------------------------------------- Reveal */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- InViewCard */
export function InViewCard({
  children,
  className = "",
  title,
  note,
}: {
  children: (active: boolean) => ReactNode;
  className?: string;
  title?: string;
  note?: boolean;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`card reveal p-5 sm:p-7 ${inView ? "in" : ""} ${className}`}>
      {title && (
        <div className="mb-5 flex items-start justify-between gap-3">
          <h3 className="text-lg sm:text-xl text-[var(--wine-800)]">{title}</h3>
          {note && (
            <span className="pill pill-gold shrink-0 text-[0.6rem]">Sample data</span>
          )}
        </div>
      )}
      {children(inView)}
    </div>
  );
}

/* ---------------------------------------------------------------- StatGrid */
export function StatGrid({ stats }: { stats: Stat[] }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {stats.map((s) => (
        <StatCard key={s.label} stat={s} active={inView} />
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- StatCard */
function Delta({ delta }: { delta?: number }) {
  if (delta === undefined || delta === 0) {
    return <span className="text-[0.72rem] font-semibold text-[var(--ink-500)]">— flat</span>;
  }
  const up = delta > 0;
  return (
    <span className={`text-[0.72rem] font-semibold ${up ? "delta-up" : "delta-down"}`}>
      {up ? "▲" : "▼"} {Math.abs(delta).toFixed(1)}%
    </span>
  );
}

export function StatCard({ stat, active }: { stat: Stat; active: boolean }) {
  return (
    <div className="card card-soft p-5 sm:p-6 transition-transform duration-300 hover:-translate-y-1">
      <p className="kicker text-[0.62rem] text-[var(--ink-500)]">{stat.label}</p>
      <p className="serif mt-2 text-3xl sm:text-[2.1rem] leading-none text-[var(--wine-800)]">
        <CountUp
          value={stat.value}
          active={active}
          prefix={stat.prefix}
          suffix={stat.suffix}
          decimals={stat.decimals}
        />
      </p>
      <div className="mt-2.5 flex items-center gap-2">
        <Delta delta={stat.delta} />
      </div>
      <p className="mt-2 text-[0.78rem] leading-snug text-[var(--ink-500)]">{stat.hint}</p>
    </div>
  );
}

/* ---------------------------------------------------------------- BarList */
export function BarList({
  items,
  active,
  mode,
}: {
  items: Bar[];
  active: boolean;
  mode: "percent" | "currency";
}) {
  const max = Math.max(...items.map((i) => i.value));
  return (
    <div className="flex flex-col gap-5">
      {items.map((item, i) => {
        const pct = mode === "percent" ? item.value : (item.value / max) * 100;
        return (
          <div key={item.label}>
            <div className="flex items-baseline justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-[0.92rem] font-semibold text-[var(--ink-900)]">
                  {item.label}
                </p>
                <p className="text-[0.72rem] text-[var(--ink-500)]">{item.sub}</p>
              </div>
              <p className="serif shrink-0 text-lg text-[var(--wine-700)]">
                {mode === "percent" ? (
                  <CountUp value={item.value} active={active} suffix="%" />
                ) : (
                  <CountUp value={item.value} active={active} prefix="$" />
                )}
              </p>
            </div>
            <div className="mt-2 bar-track">
              <div
                className={`bar-fill ${item.gold ? "gold" : ""}`}
                style={{
                  width: active ? `${pct}%` : "0%",
                  transitionDelay: `${i * 110}ms`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------- LineArea */
export function LineArea({
  id,
  series,
  active,
  variant = "area",
  gold = false,
}: {
  id: string;
  series: Series;
  active: boolean;
  variant?: "line" | "area";
  gold?: boolean;
}) {
  const W = 600;
  const H = 210;
  const padX = 14;
  const padTop = 18;
  const padBottom = 16;
  const { values, labels } = series;
  const n = values.length;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;

  const pts = values.map((v, i) => {
    const x = padX + (i / (n - 1)) * (W - padX * 2);
    const y = padTop + (1 - (v - min) / span) * (H - padTop - padBottom);
    return { x, y };
  });

  const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L ${pts[n - 1].x.toFixed(1)} ${H - padBottom} L ${pts[0].x.toFixed(1)} ${H - padBottom} Z`;
  const last = pts[n - 1];

  const stroke = gold ? "var(--gold-500)" : "var(--wine-600)";
  const fillTop = gold ? "rgba(201,165,92,0.34)" : "rgba(134,34,49,0.30)";
  const fillBot = gold ? "rgba(201,165,92,0)" : "rgba(134,34,49,0)";

  return (
    <div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="img"
        aria-label="Trend chart with sample data"
        style={{ display: "block", height: "auto" }}
      >
        <defs>
          <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fillTop} />
            <stop offset="100%" stopColor={fillBot} />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75].map((g) => (
          <line
            key={g}
            x1={padX}
            x2={W - padX}
            y1={padTop + g * (H - padTop - padBottom)}
            y2={padTop + g * (H - padTop - padBottom)}
            stroke="var(--hairline)"
            strokeWidth={1}
          />
        ))}

        {variant === "area" && (
          <path
            d={areaPath}
            fill={`url(#grad-${id})`}
            className={`spark-area ${active ? "draw" : ""}`}
          />
        )}

        <path
          d={linePath}
          stroke={stroke}
          pathLength={1}
          vectorEffect="non-scaling-stroke"
          className={`spark-line ${active ? "draw" : ""}`}
        />

        <circle
          cx={last.x}
          cy={last.y}
          r={5}
          fill={stroke}
          className={`spark-area ${active ? "draw" : ""}`}
        />
        <circle
          cx={last.x}
          cy={last.y}
          r={9}
          fill="none"
          stroke={stroke}
          strokeOpacity={0.3}
          className={`spark-area ${active ? "draw" : ""}`}
        />
      </svg>
      <div className="mt-1 flex justify-between px-1">
        {labels.map((l) => (
          <span key={l} className="text-[0.66rem] font-medium text-[var(--ink-500)]">
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- Donut */
export function Donut({
  value,
  active,
  caption,
}: {
  value: number;
  active: boolean;
  caption: string;
}) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const target = circ * (1 - value / 100);
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <svg viewBox="0 0 140 140" width="150" height="150" role="img" aria-label={caption}>
          <circle cx="70" cy="70" r={r} fill="none" stroke="var(--cream-100)" strokeWidth="14" />
          <circle
            cx="70"
            cy="70"
            r={r}
            fill="none"
            stroke="var(--wine-600)"
            strokeWidth="14"
            strokeLinecap="round"
            transform="rotate(-90 70 70)"
            className={`ring-value ${active ? "draw" : ""}`}
            style={
              {
                "--circ": `${circ}`,
                "--target": `${target}`,
              } as React.CSSProperties
            }
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="serif text-3xl text-[var(--wine-800)]">
            <CountUp value={value} active={active} suffix="%" decimals={1} />
          </span>
        </div>
      </div>
      <p className="mt-1 text-center text-[0.78rem] text-[var(--ink-500)]">{caption}</p>
    </div>
  );
}

/* ---------------------------------------------------------------- Channels */
export function ChannelChart({ channels, active }: { channels: Channel[]; active: boolean }) {
  const total = channels.reduce((s, c) => s + c.revenue, 0);
  const colors = ["var(--wine-700)", "var(--gold-500)", "var(--rose-300)"];
  return (
    <div>
      <p className="kicker text-[0.62rem] text-[var(--ink-500)]">Revenue composition</p>
      <div className="mt-3 flex h-4 w-full overflow-hidden rounded-full border border-[var(--hairline)] bg-[var(--cream-100)]">
        {channels.map((c, i) => (
          <div
            key={c.name}
            className="h-full transition-all duration-1000"
            style={{
              width: active ? `${(c.revenue / total) * 100}%` : "0%",
              background: colors[i % colors.length],
              transitionDelay: `${i * 120}ms`,
            }}
          />
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-5">
        {channels.map((c, i) => (
          <div key={c.name}>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: colors[i % colors.length] }}
                />
                <span className="truncate text-[0.92rem] font-semibold text-[var(--ink-900)]">
                  {c.name}
                </span>
              </div>
              <div className="flex shrink-0 items-baseline gap-3">
                <span className="text-[0.8rem] text-[var(--ink-500)]">{compactCurrency(c.revenue)}</span>
                <span className="serif text-lg text-[var(--wine-700)]">
                  <CountUp value={c.margin} active={active} suffix="%" />
                </span>
              </div>
            </div>
            <div className="mt-2 bar-track">
              <div
                className="bar-fill"
                style={{
                  width: active ? `${c.margin}%` : "0%",
                  background: colors[i % colors.length],
                  transitionDelay: `${i * 120}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[0.72rem] text-[var(--ink-500)]">
        Bars show gross margin per channel; segment widths show revenue share.
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------- Cohorts */
function heat(v: number): { bg: string; fg: string } {
  const t = Math.max(0, Math.min(1, (v - 70) / 30));
  const a = 0.1 + t * 0.82;
  return { bg: `rgba(110, 20, 35, ${a.toFixed(3)})`, fg: t > 0.45 ? "#fbf6ec" : "#54121f" };
}

export function CohortGrid({ active }: { active: boolean }) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[34rem]">
        <div
          className="grid items-center gap-2"
          style={{ gridTemplateColumns: `7.5rem repeat(${COHORT_MONTHS.length}, 1fr)` }}
        >
          <span className="text-[0.7rem] font-semibold text-[var(--ink-500)]">Cohort</span>
          {COHORT_MONTHS.map((m) => (
            <span key={m} className="text-center text-[0.7rem] font-semibold text-[var(--ink-500)]">
              {m}
            </span>
          ))}

          {COHORTS.map((row, r) => (
            <CohortRow key={row.cohort} row={row} r={r} active={active} />
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 text-[0.72rem] text-[var(--ink-500)]">
          <span>Lower</span>
          <span className="h-3 w-24 rounded-full" style={{ background: "linear-gradient(90deg, rgba(110,20,35,0.12), rgba(110,20,35,0.92))" }} />
          <span>Higher retention</span>
        </div>
      </div>
    </div>
  );
}

function CohortRow({
  row,
  r,
  active,
}: {
  row: { cohort: string; size: number; values: (number | null)[] };
  r: number;
  active: boolean;
}) {
  return (
    <>
      <div className="py-1">
        <p className="text-[0.82rem] font-semibold text-[var(--ink-900)]">{row.cohort}</p>
        <p className="text-[0.66rem] text-[var(--ink-500)]">{row.size} members</p>
      </div>
      {row.values.map((v, c) => {
        if (v === null) {
          return (
            <div
              key={c}
              className="flex h-11 items-center justify-center rounded-[9px] border border-dashed border-[var(--hairline)] text-[0.7rem] text-[var(--ink-500)]"
            >
              ·
            </div>
          );
        }
        const { bg, fg } = heat(v);
        return (
          <div
            key={c}
            className={`cohort-cell flex h-11 items-center justify-center text-[0.82rem] font-semibold tnum ${active ? "show" : ""}`}
            style={{
              background: bg,
              color: fg,
              transitionDelay: `${(r * COHORT_MONTHS.length + c) * 45}ms`,
            }}
          >
            {formatNumber(v)}%
          </div>
        );
      })}
    </>
  );
}

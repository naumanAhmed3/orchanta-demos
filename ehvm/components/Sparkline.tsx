"use client";

import { motion } from "framer-motion";

/** Animated retention-cohort sparkline. Values are % of cohort still active. */
export function Sparkline({
  values,
  labels,
  color = "var(--color-blue)",
  height = 92,
}: {
  values: number[];
  labels?: string[];
  color?: string;
  height?: number;
}) {
  const W = 280;
  const H = height;
  const padX = 6;
  const padY = 10;
  const max = 100;
  const n = values.length;
  const stepX = (W - padX * 2) / (n - 1);
  const y = (v: number) => padY + (1 - v / max) * (H - padY * 2);
  const points = values.map((v, i) => [padX + i * stepX, y(v)] as const);

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`)
    .join(" ");
  const areaPath =
    `M ${points[0][0].toFixed(1)} ${(H - padY).toFixed(1)} ` +
    points.map((p) => `L ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ") +
    ` L ${points[n - 1][0].toFixed(1)} ${(H - padY).toFixed(1)} Z`;

  const gradId = `spark-${color.replace(/[^a-z0-9]/gi, "")}`;

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ height: H }}
        role="img"
        aria-label="Retention cohort curve"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[25, 50, 75].map((g) => (
          <line
            key={g}
            x1={padX}
            x2={W - padX}
            y1={y(g)}
            y2={y(g)}
            stroke="var(--color-line)"
            strokeWidth="1"
          />
        ))}
        <motion.path
          d={areaPath}
          fill={`url(#${gradId})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        />
        <motion.path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p[0]}
            cy={p[1]}
            r="2.6"
            fill="var(--color-card)"
            stroke={color}
            strokeWidth="1.5"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, delay: 0.4 + i * 0.06 }}
          />
        ))}
      </svg>
      {labels && (
        <div className="mt-1 flex justify-between text-[10px] text-ink-faint num">
          {labels.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      )}
    </div>
  );
}

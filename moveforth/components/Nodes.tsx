"use client";

import { motion } from "framer-motion";
import {
  BRIEF,
  BRAND_TOKENS,
  CLAUDE_STREAM,
  ANGLES,
} from "./data";
import { cx, StatusDot, IconBrief, IconBolt, IconForward } from "./ui";

export type Step = 0 | 1 | 2 | 3 | 4;
type NodeState = "idle" | "active" | "done";

function nodeState(step: Step, threshold: Step): NodeState {
  if (step < threshold) return "idle";
  if (step === threshold) return "active";
  return "done";
}

const ANGLE_TAG = ["#05A1B5", "#CB0B6E", "#009C88"];

/* ---------------- Pipeline rail (left→right stages) ---------------- */

const RAIL = [
  { n: "01", label: "Brief intake", threshold: 1 as Step },
  { n: "02", label: "Claude · strategy", threshold: 2 as Step },
  { n: "03", label: "Higgsfield · render", threshold: 3 as Step },
  { n: "04", label: "On-brand batch", threshold: 4 as Step },
];

export function PipelineRail({ step }: { step: Step }) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-line bg-surface/70 p-3 sm:flex-row sm:items-center sm:gap-0">
      {RAIL.map((s, i) => {
        const st = nodeState(step, s.threshold);
        return (
          <div key={s.n} className="flex items-center gap-2 sm:flex-1">
            <div
              className={cx(
                "flex flex-1 items-center gap-2.5 rounded-lg border px-3 py-2 transition-colors duration-300",
                st === "idle"
                  ? "border-line bg-transparent"
                  : st === "active"
                    ? "border-orange/50 bg-orange/8"
                    : "border-teal/30 bg-teal/[0.06]",
              )}
            >
              <StatusDot state={st} />
              <div className="min-w-0">
                <div className="font-mono text-[10px] leading-none text-faint">
                  {s.n}
                </div>
                <div
                  className={cx(
                    "truncate text-[12px] font-semibold leading-tight",
                    st === "idle" ? "text-muted" : "text-ink",
                  )}
                >
                  {s.label}
                </div>
              </div>
            </div>
            {i < RAIL.length - 1 && (
              <div className="flex shrink-0 items-center justify-center sm:px-1">
                <div
                  className={cx(
                    "hidden h-[2px] w-7 sm:block",
                    step > s.threshold ? "flow-line" : "bg-line-strong",
                  )}
                />
                <IconForward
                  className={cx(
                    "rotate-90 sm:rotate-0",
                    step >= s.threshold ? "text-orange" : "text-line-strong",
                  )}
                  width={14}
                  height={14}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- Node shell ---------------- */

function NodeShell({
  n,
  title,
  state,
  icon,
  children,
}: {
  n: string;
  title: string;
  state: NodeState;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cx(
        "flex h-full flex-col rounded-xl border bg-surface p-4 transition-colors duration-300",
        state === "active" ? "border-orange/40" : "border-line",
      )}
    >
      <header className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className={cx(
              "grid size-7 place-items-center rounded-md ring-1",
              state === "idle"
                ? "bg-surface-2 text-muted ring-line"
                : "bg-orange/12 text-orange ring-orange/25",
            )}
          >
            {icon}
          </span>
          <div>
            <div className="font-mono text-[10px] leading-none text-faint">
              {n}
            </div>
            <h3 className="font-display text-sm font-semibold leading-tight">
              {title}
            </h3>
          </div>
        </div>
        <StatusDot state={state} />
      </header>
      {children}
    </section>
  );
}

/* ---------------- 01 · Brief intake ---------------- */

function Field({
  label,
  value,
  editable,
}: {
  label: string;
  value: string;
  editable?: boolean;
}) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] items-center gap-2">
      <span className="text-[10px] font-semibold uppercase tracking-wide text-faint">
        {label}
      </span>
      {editable ? (
        <input
          defaultValue={value}
          spellCheck={false}
          aria-label={label}
          className="w-full rounded border border-line bg-surface-2/50 px-2 py-1 text-[12px] text-ink outline-none transition-colors focus:border-orange/60"
        />
      ) : (
        <span className="truncate text-[12px] font-medium text-ink">
          {value}
        </span>
      )}
    </div>
  );
}

export function BriefIntake({
  step,
  reduced,
}: {
  step: Step;
  reduced: boolean;
}) {
  const state = nodeState(step, 1);
  const show = step >= 1;
  const dur = reduced ? 0 : 0.4;
  return (
    <NodeShell n="01" title="Brief intake" state={state} icon={<IconBrief />}>
      <div className="flex flex-col gap-2">
        <Field label="Client" value={BRIEF.client} />
        <Field label="Category" value={BRIEF.category} />
        <Field label="Audience" value={BRIEF.audience} editable />
        <Field label="Offer" value={BRIEF.offer} editable />
        <Field label="Tone" value={BRIEF.tone} editable />
      </div>

      <div className="mt-3 rounded-lg border border-line bg-surface-2/40 p-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-faint">
            Brand kit
          </span>
          <span
            className={cx(
              "text-[10px] font-semibold transition-colors",
              show ? "text-teal" : "text-faint",
            )}
          >
            {show ? "● locked" : "○ pending"}
          </span>
        </div>

        {/* palette */}
        <div className="flex gap-1.5">
          {BRAND_TOKENS.palette.map((c, i) => (
            <motion.div
              key={c.hex}
              initial={false}
              animate={{ opacity: show ? 1 : 0.25, scale: show ? 1 : 0.8 }}
              transition={{ duration: dur, delay: show ? i * 0.05 : 0 }}
              className="flex-1"
            >
              <div
                className="h-7 rounded ring-1 ring-white/10"
                style={{ background: c.hex }}
              />
              <div className="mt-1 text-center text-[8px] text-faint">
                {c.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* type specimen */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <motion.div
            initial={false}
            animate={{ opacity: show ? 1 : 0.25, y: show ? 0 : 4 }}
            transition={{ duration: dur, delay: show ? 0.28 : 0 }}
            className="rounded border border-line bg-canvas px-2 py-1.5"
          >
            <div className="font-display text-lg font-bold leading-none">
              Aa
            </div>
            <div className="mt-1 text-[9px] text-faint">
              {BRAND_TOKENS.type.display}
            </div>
          </motion.div>
          <motion.div
            initial={false}
            animate={{ opacity: show ? 1 : 0.25, y: show ? 0 : 4 }}
            transition={{ duration: dur, delay: show ? 0.34 : 0 }}
            className="rounded border border-line bg-canvas px-2 py-1.5"
          >
            <div className="text-lg font-medium leading-none">Aa</div>
            <div className="mt-1 text-[9px] text-faint">
              {BRAND_TOKENS.type.body}
            </div>
          </motion.div>
        </div>

        {/* tone tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {BRAND_TOKENS.toneTags.map((t, i) => (
            <motion.span
              key={t}
              initial={false}
              animate={{ opacity: show ? 1 : 0.25, scale: show ? 1 : 0.85 }}
              transition={{ duration: dur, delay: show ? 0.4 + i * 0.05 : 0 }}
              className="rounded-full border border-line bg-surface px-2 py-0.5 text-[10px] font-medium text-muted"
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </NodeShell>
  );
}

/* ---------------- 02 · Claude — strategy ---------------- */

export function ClaudeNode({
  step,
  reduced,
  streamLines,
  anglesGrouped,
}: {
  step: Step;
  reduced: boolean;
  streamLines: number;
  anglesGrouped: boolean;
}) {
  const state = nodeState(step, 2);
  const dur = reduced ? 0 : 0.35;
  return (
    <NodeShell n="02" title="Claude · strategy" state={state} icon={<IconBolt />}>
      {/* streamed reasoning */}
      <div className="scroll-soft min-h-[112px] rounded-lg border border-line bg-canvas p-3">
        <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-faint">
          <span className="size-1.5 rounded-full bg-orange" />
          reasoning
        </div>
        <ul className="flex flex-col gap-1">
          {CLAUDE_STREAM.map((line, i) => {
            const visible = i < streamLines;
            const isLast = i === streamLines - 1;
            return (
              <motion.li
                key={i}
                initial={false}
                animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 3 }}
                transition={{ duration: reduced ? 0 : 0.2 }}
                className={cx(
                  "font-mono text-[11px] leading-snug text-ink/80",
                  isLast && state === "active" && !reduced && "caret",
                )}
              >
                <span className="text-orange/70">›</span> {line}
              </motion.li>
            );
          })}
        </ul>
      </div>

      {/* grouped angles */}
      <div className="mt-3 flex flex-col gap-1.5">
        <div className="text-[10px] font-semibold uppercase tracking-wide text-faint">
          3 angles
        </div>
        {ANGLES.map((a, i) => (
          <motion.div
            key={a.id}
            initial={false}
            animate={{
              opacity: anglesGrouped ? 1 : 0,
              x: anglesGrouped ? 0 : -8,
            }}
            transition={{ duration: dur, delay: anglesGrouped ? i * 0.1 : 0 }}
            className="flex items-center gap-2 rounded-lg border border-line bg-surface-2/40 px-2.5 py-1.5"
          >
            <span
              className="grid size-5 shrink-0 place-items-center rounded text-[10px] font-bold text-white"
              style={{ background: ANGLE_TAG[i] }}
            >
              {a.index}
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[12px] font-semibold leading-tight">
                {a.name}
              </div>
              <div className="truncate text-[10px] text-faint">
                {a.kindLabel} · {a.stage}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </NodeShell>
  );
}

/* ---------------- 03 · Higgsfield — render ---------------- */

export function HiggsfieldNode({
  step,
  reduced,
  rendering,
  frames,
  variants,
  seconds,
}: {
  step: Step;
  reduced: boolean;
  rendering: boolean;
  frames: boolean;
  variants: number;
  seconds: number;
}) {
  const state = nodeState(step, 3);
  return (
    <NodeShell
      n="03"
      title="Higgsfield · render"
      state={state}
      icon={<IconForward />}
    >
      <p className="mb-3 text-[11px] leading-snug text-muted">
        Batch-renders on-brand variants from the locked tokens — every frame
        stays inside the kit.
      </p>

      {/* render frame */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-line bg-canvas">
        {/* skeleton blocks */}
        <div
          className={cx(
            "absolute inset-0 flex flex-col gap-2 p-3 transition-opacity duration-500",
            frames ? "opacity-0" : "opacity-100",
          )}
        >
          <div className="h-3 w-1/3 rounded bg-surface-2" />
          <div className="h-6 w-3/4 rounded bg-surface-2" />
          <div className="mt-auto h-4 w-2/5 rounded bg-surface-2" />
        </div>
        {/* rendered mini-composition */}
        <div
          className={cx(
            "absolute inset-0 flex flex-col p-3 transition-opacity duration-500",
            frames ? "opacity-100" : "opacity-0",
          )}
          style={{
            backgroundImage:
              "radial-gradient(14rem 10rem at 110% -20%, rgba(203,64,3,0.28), transparent 60%)",
          }}
        >
          <span className="text-[8px] font-semibold tracking-[0.2em] text-muted">
            NORTHBEAM OPS
          </span>
          <span className="mt-1 font-display text-base font-bold leading-none">
            Downtime is a choice.
          </span>
          <span className="mt-auto font-display text-3xl font-bold leading-none text-orange">
            30%
          </span>
        </div>
        {/* generation sweep */}
        {rendering && !reduced && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="animate-sweep absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-orange/40 to-transparent" />
          </div>
        )}
      </div>

      {/* count-up chip */}
      <div className="mt-3 flex items-center justify-between rounded-lg border border-orange/25 bg-orange/[0.07] px-3 py-2">
        <div className="flex items-baseline gap-1.5">
          <span className="font-display text-2xl font-bold leading-none text-orange tabular-nums">
            {variants}
          </span>
          <span className="text-[11px] font-medium text-ink/80">
            on-brand variants
          </span>
        </div>
        <span className="font-mono text-[12px] text-muted tabular-nums">
          {seconds}s
        </span>
      </div>
    </NodeShell>
  );
}

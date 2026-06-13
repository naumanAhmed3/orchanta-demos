"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  sessions as seed,
  fleet,
  FAILURE_LABEL,
  type Session,
  type Channel,
  type SessionStatus,
} from "../lib/data";
import { diagnose, type Diagnosis } from "../lib/diagnose";

/* ---------- small presentational helpers ---------- */

function ChannelTag({ channel }: { channel: Channel }) {
  const map: Record<Channel, { label: string; dot: string }> = {
    call: { label: "Call", dot: "bg-volt-2" },
    whatsapp: { label: "WhatsApp", dot: "bg-ok" },
    email: { label: "Email", dot: "bg-warn" },
  };
  const c = map[channel];
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] text-mute">
      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}

function StatusBadge({ status }: { status: SessionStatus }) {
  const map: Record<SessionStatus, { label: string; cls: string }> = {
    failed: { label: "Failed", cls: "bg-bad/15 text-bad border-bad/30" },
    charging: { label: "Charging", cls: "bg-volt/15 text-volt border-volt/30" },
    completed: { label: "Completed", cls: "bg-mute/10 text-mute border-line" },
    recovered: { label: "Recovered", cls: "bg-ok/15 text-ok border-ok/30" },
  };
  const s = map[status];
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${s.cls}`}>
      {s.label}
    </span>
  );
}

function Kpi({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: string }) {
  return (
    <div className="rounded-xl border border-line bg-panel px-4 py-3">
      <div className="text-[11px] uppercase tracking-wide text-mute">{label}</div>
      <div className={`mt-1 text-xl font-semibold ${accent ?? "text-soft"}`}>{value}</div>
      {sub ? <div className="mt-0.5 text-[11px] text-mute">{sub}</div> : null}
    </div>
  );
}

/* ---------- recovery run state machine ---------- */

type RunPhase = "steps" | "action" | "message" | "done";
interface RunState {
  id: string;
  revealedSteps: number;
  phase: RunPhase;
}

export default function ControlRoom() {
  const [list, setList] = useState<Session[]>(seed);
  const [selectedId, setSelectedId] = useState<string>("VW-2271");
  const [run, setRun] = useState<RunState | null>(null);
  const [recoveredBoost, setRecoveredBoost] = useState(0);
  const [filterFailed, setFilterFailed] = useState(true);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);
  useEffect(() => () => clearTimers(), [clearTimers]);

  const selected = useMemo(() => list.find((s) => s.id === selectedId) ?? null, [list, selectedId]);
  const dia: Diagnosis | null = useMemo(() => (selected?.failure ? diagnose(selected) : null), [selected]);

  const failedNow = list.filter((s) => s.status === "failed").length;
  const recoveredToday = 18 + recoveredBoost;

  const select = useCallback(
    (id: string) => {
      clearTimers();
      setRun(null);
      setSelectedId(id);
    },
    [clearTimers],
  );

  const startRecovery = useCallback(
    (s: Session) => {
      const d = diagnose(s);
      clearTimers();
      setRun({ id: s.id, revealedSteps: 0, phase: "steps" });
      const step = 640;
      d.steps.forEach((_, i) => {
        timers.current.push(
          setTimeout(() => {
            setRun((r) => (r && r.id === s.id ? { ...r, revealedSteps: i + 1 } : r));
          }, step * (i + 1)),
        );
      });
      const afterSteps = step * (d.steps.length + 1);
      timers.current.push(
        setTimeout(() => setRun((r) => (r && r.id === s.id ? { ...r, phase: "action" } : r)), afterSteps),
      );
      timers.current.push(
        setTimeout(() => setRun((r) => (r && r.id === s.id ? { ...r, phase: "message" } : r)), afterSteps + 850),
      );
      timers.current.push(
        setTimeout(() => {
          setRun((r) => (r && r.id === s.id ? { ...r, phase: "done" } : r));
          setList((prev) => prev.map((x) => (x.id === s.id ? { ...x, status: "recovered" } : x)));
          setRecoveredBoost((b) => b + 1);
        }, afterSteps + 1850),
      );
    },
    [clearTimers],
  );

  const visible = filterFailed ? list.filter((s) => s.status === "failed" || s.status === "recovered") : list;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1240px] flex-col px-4 pb-12 sm:px-6">
      {/* Header */}
      <header className="flex flex-col gap-3 border-b border-line py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-volt/15 text-volt">
            <span className="h-3.5 w-3.5 rounded-full border-2 border-volt" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold tracking-tight text-soft">Enera</span>
              <span className="text-mute">Control Room</span>
            </div>
            <div className="text-[11px] text-mute">The AI Driver Experience Platform — hear + help</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-panel px-2.5 py-1 text-[11px] text-mute">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-ok" /> Live
          </span>
          <span className="rounded-full border border-volt/30 bg-volt/10 px-2.5 py-1 text-[11px] font-medium text-volt">
            Prototype by Orchanta for Enera
          </span>
        </div>
      </header>

      {/* KPI strip */}
      <section className="grid grid-cols-2 gap-3 py-5 sm:grid-cols-3 lg:grid-cols-5">
        <Kpi label="Charger uptime" value={fleet.uptime} sub={`${fleet.chargers} chargers · ${fleet.sites} sites`} />
        <Kpi
          label="Charge success"
          value={fleet.chargeSuccess}
          sub={`${fleet.failRate} fail without help`}
          accent="text-warn"
        />
        <Kpi label="Failing now" value={String(failedNow)} sub="needs attention" accent={failedNow ? "text-bad" : "text-ok"} />
        <Kpi label="Recovered today" value={String(recoveredToday)} sub="by the agent" accent="text-ok" />
        <Kpi label="Avg time to recover" value={fleet.avgRecover} sub="hear → help" accent="text-volt-2" />
      </section>

      {/* Main split */}
      <section className="grid flex-1 grid-cols-1 gap-5 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        {/* Left — Hear: live sessions */}
        <div className="flex min-h-0 flex-col rounded-2xl border border-line bg-ink-2">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-medium text-soft">
              <span className="text-volt-2">Hear</span>
              <span className="text-mute">· Live sessions</span>
            </div>
            <div className="flex rounded-lg border border-line p-0.5 text-[11px]">
              <button
                onClick={() => setFilterFailed(true)}
                className={`rounded-md px-2 py-1 transition-colors ${filterFailed ? "bg-panel-2 text-soft" : "text-mute"}`}
              >
                Needs attention
              </button>
              <button
                onClick={() => setFilterFailed(false)}
                className={`rounded-md px-2 py-1 transition-colors ${!filterFailed ? "bg-panel-2 text-soft" : "text-mute"}`}
              >
                All
              </button>
            </div>
          </div>
          <div className="scroll-thin max-h-[560px] overflow-y-auto p-2">
            {visible.map((s) => {
              const active = s.id === selectedId;
              const actionable = s.status === "failed";
              return (
                <button
                  key={s.id}
                  onClick={() => select(s.id)}
                  className={`mb-1.5 w-full rounded-xl border px-3 py-2.5 text-left transition-colors ${
                    active ? "border-volt/50 bg-panel" : "border-transparent hover:border-line hover:bg-panel/60"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 truncate">
                      {actionable ? <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-bad" /> : null}
                      <span className="truncate text-sm font-medium text-soft">
                        {s.site} · {s.stall}
                      </span>
                    </div>
                    <StatusBadge status={s.status} />
                  </div>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <span className="truncate text-[12px] text-mute">
                      {s.driver} · {s.vehicle}
                    </span>
                    <ChannelTag channel={s.channel} />
                  </div>
                  {s.failure ? (
                    <div className="mt-1.5 inline-flex items-center rounded-md bg-bad/10 px-1.5 py-0.5 text-[11px] text-bad">
                      {FAILURE_LABEL[s.failure]}
                    </div>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right — Help: telemetry + resolution agent */}
        <div className="flex min-h-0 flex-col rounded-2xl border border-line bg-ink-2">
          {!selected || !selected.failure ? (
            <EmptyState recovered={selected?.status === "recovered"} />
          ) : (
            <DetailPanel
              key={selected.id}
              session={selected}
              dia={dia as Diagnosis}
              run={run && run.id === selected.id ? run : null}
              onStart={() => startRecovery(selected)}
            />
          )}
        </div>
      </section>

      <footer className="pt-6 text-center text-[11px] text-mute">
        Sample data — fictional operator Voltway Networks. Tailored prototype built by Orchanta to show Enera the hear → help recovery flow.
      </footer>
    </main>
  );
}

/* ---------- right-panel states ---------- */

function EmptyState({ recovered }: { recovered?: boolean }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 p-10 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-full border border-line text-volt-2">
        <span className="h-4 w-4 rounded-full border-2 border-volt-2" />
      </span>
      <div className="text-sm font-medium text-soft">
        {recovered ? "This session was already recovered" : "Select a failing session"}
      </div>
      <div className="max-w-xs text-[12px] text-mute">
        {recovered
          ? "Pick a session that needs attention to watch the agent diagnose and recover it."
          : "Pick a session on the left to see its telemetry and watch the agent diagnose and recover it — end to end."}
      </div>
    </div>
  );
}

function DetailPanel({
  session,
  dia,
  run,
  onStart,
}: {
  session: Session;
  dia: Diagnosis;
  run: RunState | null;
  onStart: () => void;
}) {
  const t = session.telemetry;
  const phase = run?.phase ?? null;
  const showAction = phase === "action" || phase === "message" || phase === "done";
  const showMessage = phase === "message" || phase === "done";
  const done = phase === "done";

  return (
    <div className="scroll-thin flex max-h-[620px] flex-1 flex-col overflow-y-auto">
      {/* session header */}
      <div className="border-b border-line px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-soft">
              {session.site} · {session.stall}
            </div>
            <div className="text-[12px] text-mute">
              {session.id} · {session.driver} · {session.vehicle} · started {session.startedAt}
            </div>
          </div>
          <StatusBadge status={session.status} />
        </div>
        <div className="mt-3 flex items-start gap-2 rounded-lg border border-line bg-panel px-3 py-2">
          <ChannelTag channel={session.channel} />
          <p className="text-[13px] leading-relaxed text-soft">{session.driverMessage}</p>
        </div>
      </div>

      {/* telemetry */}
      <div className="border-b border-line px-5 py-4">
        <div className="mb-2 text-[11px] uppercase tracking-wide text-mute">Live telemetry</div>
        <dl className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
          {t
            ? (
                [
                  ["Connector", t.connector],
                  ["State", t.connectorState],
                  ["RFID / auth", t.rfid],
                  ["Payment", t.payment],
                  ["Firmware", t.firmware],
                  ["OCPP", t.ocpp],
                ] as const
              ).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 border-b border-line/60 pb-1 text-[12px]">
                  <dt className="shrink-0 text-mute">{k}</dt>
                  <dd className="text-right text-soft">{v}</dd>
                </div>
              ))
            : null}
        </dl>
      </div>

      {/* resolution agent */}
      <div className="px-5 py-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-soft">
            <span className="text-volt-2">Help</span>
            <span className="text-mute">· Resolution agent</span>
          </div>
          {dia ? <span className="text-[11px] text-mute">confidence {dia.confidence}%</span> : null}
        </div>

        {!run ? (
          <button
            onClick={onStart}
            className="group inline-flex items-center gap-2 rounded-xl bg-volt px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-volt/90"
          >
            Diagnose and recover
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </button>
        ) : (
          <div className="space-y-4">
            {/* root cause */}
            <div className="fade-up rounded-xl border border-line bg-panel px-4 py-3">
              <div className="text-[11px] uppercase tracking-wide text-volt-2">Root cause</div>
              <p className="mt-1 text-[13px] leading-relaxed text-soft">{dia.rootCause}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {dia.evidence.map((e) => (
                  <span key={e} className="rounded-md bg-ink px-2 py-0.5 text-[11px] text-mute">
                    {e}
                  </span>
                ))}
              </div>
            </div>

            {/* reasoning steps */}
            <ol className="space-y-1.5">
              {dia.steps.slice(0, run.revealedSteps).map((s, i) => (
                <li key={i} className="fade-up flex gap-2 text-[12px] leading-relaxed text-soft">
                  <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-volt/15 text-[10px] text-volt">
                    {i + 1}
                  </span>
                  <span>{s}</span>
                </li>
              ))}
              {run.phase === "steps" && run.revealedSteps < dia.steps.length ? (
                <li className="flex gap-2 pl-6 text-[12px] text-mute">
                  <span className="live-dot">analysing telemetry…</span>
                </li>
              ) : null}
            </ol>

            {/* action taken */}
            {showAction ? (
              <div className="fade-up rounded-xl border border-volt-2/30 bg-volt-2/5 px-4 py-3">
                <div className="text-[11px] uppercase tracking-wide text-volt-2">Action taken · ETA {dia.eta}</div>
                <p className="mt-1 text-[13px] leading-relaxed text-soft">{dia.action}</p>
              </div>
            ) : null}

            {/* driver message */}
            {showMessage ? (
              <div className="fade-up">
                <div className="mb-1.5 flex items-center gap-2 text-[11px] text-mute">
                  Message <ChannelTag channel={session.channel} />
                </div>
                <div className="max-w-[88%] rounded-2xl rounded-tl-sm border border-volt/30 bg-volt/10 px-3.5 py-2.5 text-[13px] leading-relaxed text-soft">
                  {dia.driverMessage}
                </div>
              </div>
            ) : null}

            {/* recovered confirmation */}
            {done ? (
              <div className="fade-up flex items-center gap-2 rounded-xl border border-ok/30 bg-ok/10 px-4 py-2.5 text-[13px] text-ok">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-ok/20">✓</span>
                Session recovered — driver is charging. Avg time to recover: {fleet.avgRecover}.
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

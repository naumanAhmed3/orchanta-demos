"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { UptailLogo } from "./Logo";
import { leads, stats, STAGES, type Lead, type Sender } from "../lib/data";

const eur = (n: number) => "€" + n.toLocaleString("en-GB");

export default function UptailDemo() {
  const [activeId, setActiveId] = useState(leads[0].id);
  const [revealed, setRevealed] = useState(0);
  const [typing, setTyping] = useState<Sender | null>(null);
  const [playing, setPlaying] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const active = useMemo(() => leads.find((l) => l.id === activeId)!, [activeId]);

  const clear = useCallback(() => { timers.current.forEach(clearTimeout); timers.current = []; }, []);

  const play = useCallback((lead: Lead) => {
    clear();
    setRevealed(0); setTyping(null); setPlaying(true);
    let delay = 450;
    lead.convo.forEach((m, i) => {
      if (m.from !== "system") {
        const at = delay;
        timers.current.push(setTimeout(() => setTyping(m.from), at));
        delay += m.from === "agent" ? 780 : 950;
      }
      const revealAt = delay;
      timers.current.push(setTimeout(() => { setTyping(null); setRevealed(i + 1); }, revealAt));
      delay += m.from === "system" ? 500 : 620;
    });
    timers.current.push(setTimeout(() => setPlaying(false), delay));
  }, [clear]);

  useEffect(() => { play(leads[0]); return () => timers.current.forEach(clearTimeout); }, [play]);

  const select = (lead: Lead) => { setActiveId(lead.id); play(lead); };

  const shown = active.convo.slice(0, revealed);
  const doneStages = useMemo(() => new Set(shown.filter((m) => m.stage).map((m) => m.stage)), [shown]);
  const booked = doneStages.has("booked");
  const pipeline = stats.pipelineBase + (booked ? active.revenue : 0);

  return (
    <div className="relative min-h-screen">
      <div className="glow pointer-events-none absolute inset-x-0 top-0 h-[320px]" />
      <main className="relative mx-auto w-full max-w-[1200px] px-4 pb-12 sm:px-6">
        {/* header */}
        <header className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <UptailLogo size={22} />
            <span className="hidden text-[12px] text-mute sm:block">· AI sales workforce for inbound</span>
          </div>
          <span className="rounded-full border border-line bg-card px-2.5 py-1 text-[11px] font-semibold text-purple">
            Concept by Orchanta for Uptail
          </span>
        </header>

        <h1 className="font-display max-w-2xl text-[28px] font-extrabold leading-[1.1] text-ink sm:text-[36px]">
          Watch an AI agent <span className="text-purple">close a lead</span>, live.
        </h1>
        <p className="mt-2 max-w-xl text-[14px] text-mute">
          A real inbound lead, qualified on WhatsApp in seconds — objection handled, meeting booked, CRM synced, revenue landed. No human touched it.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[230px_minmax(0,1fr)_290px]">
          {/* LEFT — inbound feed */}
          <section className="rounded-2xl border border-line bg-card p-3">
            <div className="mb-2 flex items-center justify-between px-1">
              <span className="text-[12px] font-semibold text-ink">Inbound</span>
              <span className="inline-flex items-center gap-1 text-[11px] text-mute"><span className="pulse h-1.5 w-1.5 rounded-full bg-ok" /> live</span>
            </div>
            <div className="space-y-1.5">
              {leads.map((l) => {
                const on = l.id === activeId;
                return (
                  <button key={l.id} onClick={() => select(l)} className={`flex w-full items-center gap-2.5 rounded-xl border px-2.5 py-2 text-left transition-colors ${on ? "border-purple/40 bg-surface" : "border-transparent hover:bg-surface/60"}`}>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[11px] font-bold text-white" style={{ background: "linear-gradient(135deg,#7f00ff,#9950e2)" }}>{l.initials}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-semibold text-ink">{l.name}</span>
                      <span className="block truncate text-[11px] text-mute">{l.account} · {l.vertical}</span>
                    </span>
                    <span className="shrink-0 rounded-full bg-surface-2 px-1.5 py-0.5 text-[9px] font-medium text-purple-mid">{l.source}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* CENTER — WhatsApp thread */}
          <section className="flex min-h-[460px] flex-col overflow-hidden rounded-2xl border border-line bg-card">
            <div className="flex items-center gap-2.5 border-b border-line-2 px-4 py-3">
              <span className="grid h-9 w-9 place-items-center rounded-full text-[12px] font-bold text-white" style={{ background: "linear-gradient(135deg,#7f00ff,#9950e2)" }}>{active.initials}</span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-semibold text-ink">{active.name}</div>
                <div className="flex items-center gap-1.5 text-[11px] text-mute"><span className="h-1.5 w-1.5 rounded-full bg-ok" /> online · via WhatsApp</div>
              </div>
              <span className="rounded-full bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-purple">Uptail agent · {active.reply} reply</span>
            </div>

            <div className="scroll-thin flex-1 space-y-2 overflow-y-auto bg-surface/40 px-4 py-4" style={{ maxHeight: 440 }}>
              {shown.map((m, i) =>
                m.from === "system" ? (
                  <div key={i} className="pop mx-auto w-fit max-w-[90%] rounded-full bg-surface-2 px-3 py-1 text-center font-mono text-[10px] text-purple-mid">
                    {m.text}
                  </div>
                ) : (
                  <div key={i} className={`flex ${m.from === "agent" ? "justify-end" : "justify-start"}`}>
                    <div className={`pop max-w-[80%] rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed ${m.from === "agent" ? "rounded-br-sm bg-wa-bubble text-ink" : "rounded-bl-sm border border-line-2 bg-card text-ink"}`}>
                      {m.text}
                    </div>
                  </div>
                ),
              )}
              {typing ? (
                <div className={`flex ${typing === "agent" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex items-center gap-1 rounded-2xl px-3.5 py-3 ${typing === "agent" ? "bg-wa-bubble" : "border border-line-2 bg-card"}`}>
                    <span className="dot h-1.5 w-1.5 rounded-full bg-mute" />
                    <span className="dot h-1.5 w-1.5 rounded-full bg-mute" />
                    <span className="dot h-1.5 w-1.5 rounded-full bg-mute" />
                  </div>
                </div>
              ) : null}

              {booked ? (
                <div className="pop mx-auto mt-1 flex w-fit items-center gap-2 rounded-xl border border-purple/30 bg-card px-3 py-2 text-[12px]">
                  <span className="grid h-6 w-6 place-items-center rounded-md bg-purple/10 text-purple">📅</span>
                  <span className="text-ink"><strong>{active.booking.slot}</strong> · {active.booking.with}</span>
                </div>
              ) : null}
            </div>

            <div className="flex items-center justify-between border-t border-line-2 px-4 py-2.5">
              <span className="font-mono text-[10px] text-faint">80+ languages · 24/7 · voice + WhatsApp</span>
              <button onClick={() => play(active)} disabled={playing} className={`rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-colors ${playing ? "cursor-default bg-surface text-faint" : "bg-purple text-white hover:bg-purple-deep"}`}>
                {playing ? "Playing…" : "↻ Replay"}
              </button>
            </div>
          </section>

          {/* RIGHT — pipeline */}
          <section className="flex flex-col gap-4">
            <div className="rounded-2xl border border-line bg-card p-4">
              <div className="mb-3 text-[12px] font-semibold text-ink">Live pipeline</div>
              <ol className="space-y-2">
                {STAGES.map((s) => {
                  const done = doneStages.has(s.id);
                  return (
                    <li key={s.id} className="flex items-center gap-2.5 text-[12.5px]">
                      <span className={`grid h-5 w-5 place-items-center rounded-full text-[10px] transition-colors ${done ? "bg-ok text-white" : "border border-line text-faint"}`}>{done ? "✓" : ""}</span>
                      <span className={done ? "font-medium text-ink" : "text-faint"}>{s.label}</span>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className={`rounded-2xl border p-4 transition-colors ${booked ? "border-yellow/50 bg-yellow/5" : "border-line bg-card"}`}>
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-ink">Pipeline today</span>
                {booked ? <span className="pop rounded-full bg-yellow px-2 py-0.5 text-[11px] font-bold text-ink">+{eur(active.revenue)}</span> : null}
              </div>
              <div className="font-mono mt-1 text-[26px] font-bold text-ink">{eur(pipeline)}</div>
              <div className="mt-1 text-[11px] text-mute">{booked ? (active.recovered ? "no-show recovered → rebooked" : `synced to ${active.booking.crm}`) : "qualifying…"}</div>
            </div>

            <div className="rounded-2xl border border-line bg-card p-4">
              <Stat k="Response rate" v={stats.responseRate} />
              <Stat k="Conversion" v={stats.conversion} />
              <Stat k="Avg first reply" v={stats.avgReply} />
              <Stat k="Meetings booked today" v={String(stats.meetingsToday)} />
              <Stat k="Agent" v="active 24/7" last />
            </div>
          </section>
        </div>

        <footer className="pt-6 text-center text-[11px] text-faint">
          Sample inbound + conversations — tailored concept built by Orchanta for Uptail. Customer names are Uptail’s real references, shown illustratively.
        </footer>
      </main>
    </div>
  );
}

function Stat({ k, v, last }: { k: string; v: string; last?: boolean }) {
  return (
    <div className={`flex items-center justify-between py-1.5 ${last ? "" : "border-b border-line-2"}`}>
      <span className="text-[12px] text-mute">{k}</span>
      <span className="font-mono text-[12px] font-medium text-ink">{v}</span>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { FrameLogo } from "./Logo";
import {
  needStates, sessions, studios, introOffer,
  type NeedId, type ClassType, type Session,
} from "../lib/data";

const TYPES: (ClassType | "All")[] = ["All", "Yoga", "Sweat", "Pilates", "Sculpt", "Party"];

export default function FrameApp() {
  const [need, setNeed] = useState<NeedId | null>(null);
  const [studioF, setStudioF] = useState<string>("all");
  const [typeF, setTypeF] = useState<ClassType | "All">("All");
  const [picked, setPicked] = useState<Session | null>(null);
  const [booked, setBooked] = useState(false);

  const accent = need ? needStates.find((n) => n.id === need)!.color : "#e60f20";

  const list = useMemo(
    () =>
      sessions.filter(
        (s) =>
          (!need || s.need === need) &&
          (studioF === "all" || s.studio === studioF) &&
          (typeF === "All" || s.type === typeF),
      ),
    [need, studioF, typeF],
  );

  const openBooking = (s: Session) => { setPicked(s); setBooked(false); };
  const closeBooking = () => { setPicked(null); setBooked(false); };

  return (
    <main className="mx-auto w-full max-w-[1120px] px-4 pb-20 sm:px-6">
      {/* intro offer */}
      <div className="-mx-4 mb-0 bg-red px-4 py-2 text-center text-[12px] font-semibold uppercase tracking-wide text-white sm:-mx-6">
        {introOffer}
      </div>

      {/* header */}
      <header className="flex items-center justify-between py-4">
        <div className="flex items-baseline gap-3">
          <FrameLogo size={30} />
          <span className="hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-mute sm:block">feel-good fitness</span>
        </div>
        <span className="rounded-full border border-line bg-panel px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-mute">
          Concept by Orchanta for Frame
        </span>
      </header>

      {/* hero */}
      <section className="pt-4 pb-7">
        <h1 className="display text-[42px] text-ink sm:text-[64px]">
          How do you want<br />to feel today?
        </h1>
        <p className="mt-3 max-w-md text-[15px] text-mute">
          Pick your Need State — your timetable sorts itself, and you book in a tap.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {needStates.map((n) => {
            const active = need === n.id;
            const count = sessions.filter((s) => s.need === n.id).length;
            return (
              <button
                key={n.id}
                onClick={() => setNeed(active ? null : n.id)}
                className={`group relative overflow-hidden rounded-2xl p-4 text-left transition-transform duration-150 ${active ? "scale-[1.02]" : "hover:scale-[1.01]"}`}
                style={{ background: n.color, color: n.text, outline: active ? `3px solid ${n.text}` : "none", outlineOffset: -3 }}
              >
                <div className="display text-[13px] opacity-80">Need State {n.n}</div>
                <div className="display mt-7 text-[26px] leading-[0.92]">{n.name}</div>
                <div className="mt-2 text-[12px] font-medium opacity-90">{n.tagline}</div>
                <div className="mt-3 text-[11px] font-semibold uppercase tracking-wide opacity-80">
                  {count} classes today {active ? "· showing →" : ""}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* timetable */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-2 border-t-2 border-ink pt-4">
          <h2 className="display text-[26px] text-ink sm:text-[32px]">
            Today
            {need ? <span style={{ color: accent }}> · {needStates.find((n) => n.id === need)!.name}</span> : <span className="text-mute"> · all moods</span>}
          </h2>
          {(need || studioF !== "all" || typeF !== "All") && (
            <button onClick={() => { setNeed(null); setStudioF("all"); setTypeF("All"); }} className="text-[12px] font-semibold uppercase tracking-wide text-mute underline">
              Clear filters
            </button>
          )}
        </div>

        {/* filters */}
        <div className="mt-3 flex flex-col gap-2">
          <Chips
            options={["all", ...Object.keys(studios)]}
            value={studioF}
            onChange={setStudioF}
            label={(k) => (k === "all" ? "All studios" : studios[k].name.replace("Frame ", ""))}
          />
          <Chips options={TYPES} value={typeF} onChange={(v) => setTypeF(v as ClassType | "All")} label={(k) => String(k)} />
        </div>

        {/* sessions */}
        <div className="mt-4 divide-y divide-line border-y border-line">
          {list.length === 0 ? (
            <div className="py-10 text-center text-[14px] text-mute">No classes match — try another studio or type.</div>
          ) : (
            list.map((s) => {
              const st = studios[s.studio];
              const nColor = needStates.find((n) => n.id === s.need)!.color;
              return (
                <button key={s.id} onClick={() => openBooking(s)} className="fade-up flex w-full items-center gap-4 py-3.5 text-left transition-colors hover:bg-panel">
                  <div className="w-14 shrink-0">
                    <div className="display text-[20px] text-ink">{s.time}</div>
                  </div>
                  <span className="h-10 w-1 shrink-0 rounded-full" style={{ background: nColor }} />
                  <div className="min-w-0 flex-1">
                    <div className="display text-[19px] leading-none text-ink">{s.cls}</div>
                    <div className="mt-1 truncate text-[12px] text-mute">
                      {st.name.replace("Frame ", "")} · with {s.instructor} · {s.type}
                    </div>
                  </div>
                  <div className="hidden shrink-0 items-center gap-2 sm:flex">
                    {s.reformer && <span className="rounded bg-ink px-1.5 py-0.5 text-[10px] font-semibold uppercase text-white">incl. Reformer</span>}
                    <span className="text-[12px] font-medium text-mute">{s.spots} spots</span>
                  </div>
                  <div className="w-[88px] shrink-0 text-right">
                    <div className="text-[12px] text-mute">{s.tier}</div>
                    <div className="display text-[18px] text-ink">£{s.price}</div>
                  </div>
                  <span className="ml-1 hidden rounded-lg bg-red px-3 py-2 text-[12px] font-bold uppercase tracking-wide text-white sm:inline-block">Book</span>
                </button>
              );
            })
          )}
        </div>
      </section>

      <footer className="mt-10 border-t border-line pt-5 text-[11px] text-mute">
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {Object.values(studios).map((st) => (
            <span key={st.name}>{st.name} · {st.address}</span>
          ))}
        </div>
        <p className="mt-3">Sample timetable — concept built by Orchanta for Frame. Class names, studios and prices are Frame’s; the Need-State match and instructors shown are illustrative.</p>
      </footer>

      {/* booking drawer */}
      {picked && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true">
          <div className="overlay-in absolute inset-0 bg-black/50" onClick={closeBooking} />
          <div className="sheet-in relative w-full max-w-[460px] rounded-t-3xl bg-paper p-6 sm:rounded-3xl">
            {!booked ? (
              <>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="display text-[13px]" style={{ color: needStates.find((n) => n.id === picked.need)!.color }}>
                      {needStates.find((n) => n.id === picked.need)!.name}
                    </div>
                    <h3 className="display mt-1 text-[30px] leading-none text-ink">{picked.cls}</h3>
                  </div>
                  <button onClick={closeBooking} className="text-[22px] leading-none text-mute">×</button>
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-ink">{picked.desc}</p>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-[13px]">
                  <Info label="When" value={`Today · ${picked.time}`} />
                  <Info label="Teacher" value={picked.instructor} />
                  <Info label="Studio" value={studios[picked.studio].name} />
                  <Info label="Address" value={studios[picked.studio].address} />
                </dl>
                <div className="mt-4 flex items-center justify-between rounded-xl bg-panel px-4 py-3">
                  <div>
                    <div className="text-[12px] text-mute">{picked.tier}{picked.reformer ? " · incl. Reformer" : ""}</div>
                    <div className="display text-[22px] text-ink">£{picked.price} · 1 credit</div>
                  </div>
                  <span className="text-[12px] font-medium text-mute">{picked.spots} spots left</span>
                </div>
                <button onClick={() => setBooked(true)} className="mt-4 w-full rounded-xl bg-red py-3.5 text-[15px] font-bold uppercase tracking-wide text-white transition-transform hover:scale-[1.01]">
                  Book my spot
                </button>
              </>
            ) : (
              <div className="py-4 text-center">
                <div className="display text-[44px] leading-none text-ink">You’re in 🔥</div>
                <p className="mt-3 text-[15px] text-ink">
                  Get serotoned. See you at <strong>{studios[picked.studio].name}</strong>, today at {picked.time} for {picked.cls}.
                </p>
                <p className="mt-1 text-[12px] text-mute">A confirmation and your QR entry would land in the Frame app.</p>
                <button onClick={closeBooking} className="mt-5 w-full rounded-xl border-2 border-ink py-3 text-[14px] font-bold uppercase tracking-wide text-ink">
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

function Chips({ options, value, onChange, label }: { options: string[]; value: string; onChange: (v: string) => void; label: (k: string) => string }) {
  return (
    <div className="scroll-thin flex gap-2 overflow-x-auto pb-1">
      {options.map((o) => {
        const active = value === o;
        return (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-[12px] font-semibold uppercase tracking-wide transition-colors ${active ? "border-ink bg-ink text-white" : "border-line bg-paper text-mute hover:border-ink"}`}
          >
            {label(o)}
          </button>
        );
      })}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wide text-mute">{label}</dt>
      <dd className="mt-0.5 text-ink">{value}</dd>
    </div>
  );
}

"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import {
  CLINIC,
  SERVICES,
  SLOTS,
  buildDays,
  buildWhatsappMessage,
  dayLabel,
} from "@/lib/data";

const DAY_COUNT = 6;

// True only on the client. The server/hydration snapshot is `false`, so the
// date grid renders as placeholders during SSR and fills in after mount —
// keeping dates current at view time with no hydration mismatch.
const subscribe = () => () => {};
function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

function StepBadge({ n, label }: { n: number; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white">
        {n}
      </span>
      <span className="text-sm font-semibold text-ink">{label}</span>
    </div>
  );
}

export default function BookingFlow() {
  const [serviceId, setServiceId] = useState<string>(SERVICES[0].id);
  const [dayId, setDayId] = useState<string | null>(null);
  const [slotId, setSlotId] = useState<string>(SLOTS[3].id);
  const [name, setName] = useState<string>("");
  const [confirmed, setConfirmed] = useState<boolean>(false);

  const isClient = useIsClient();
  const days = useMemo(
    () => (isClient ? buildDays(DAY_COUNT) : []),
    [isClient],
  );

  const service = SERVICES.find((s) => s.id === serviceId) ?? SERVICES[0];
  const slot = SLOTS.find((s) => s.id === slotId) ?? SLOTS[0];
  // Falls back to the first available day until the patient picks one.
  const activeDayId = dayId ?? days[0]?.id ?? null;
  const day = days.find((d) => d.id === activeDayId) ?? null;

  const reset = () => setConfirmed(false);

  const message = buildWhatsappMessage(
    service.name,
    day ? dayLabel(day) : "your chosen day",
    slot.label,
    name,
  );

  return (
    <section id="book" className="scroll-mt-20 bg-brand-tint py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-5">
        <div className="text-center">
          <span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
            Book in 30 seconds
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Book your appointment on WhatsApp
          </h2>
          <p className="mt-2 text-muted">
            Pick a service, a day and a time — we&apos;ll open WhatsApp with your
            request ready to send.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl border border-line bg-surface shadow-sm">
          <div className="space-y-7 p-6 sm:p-8">
            {/* Step 1 — service */}
            <div>
              <StepBadge n={1} label="Choose a service" />
              <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {SERVICES.map((s) => {
                  const active = s.id === serviceId;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setServiceId(s.id);
                        reset();
                      }}
                      aria-pressed={active}
                      className={`rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition ${
                        active
                          ? "border-brand bg-brand text-white shadow-sm"
                          : "border-line bg-white text-ink hover:border-brand"
                      }`}
                    >
                      {s.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2 — day */}
            <div>
              <StepBadge n={2} label="Pick a day" />
              <div className="mt-3 grid grid-cols-3 gap-2.5 sm:grid-cols-6">
                {days.length === 0
                  ? Array.from({ length: DAY_COUNT }).map((_, i) => (
                      <div
                        key={i}
                        aria-hidden="true"
                        className="h-[58px] rounded-xl border border-line bg-brand-soft/40"
                      />
                    ))
                  : days.map((d) => {
                      const active = d.id === activeDayId;
                      return (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => {
                            setDayId(d.id);
                            reset();
                          }}
                          aria-pressed={active}
                          className={`flex flex-col items-center rounded-xl border px-2 py-2 transition ${
                            active
                              ? "border-brand bg-brand text-white shadow-sm"
                              : "border-line bg-white text-ink hover:border-brand"
                          }`}
                        >
                          <span className="text-xs font-medium opacity-80">
                            {d.weekday}
                          </span>
                          <span className="text-lg font-bold leading-tight">
                            {d.date}
                          </span>
                          <span className="text-xs opacity-80">{d.month}</span>
                        </button>
                      );
                    })}
              </div>
            </div>

            {/* Step 3 — time */}
            <div>
              <StepBadge n={3} label="Pick a time slot" />
              <div className="mt-3 grid grid-cols-3 gap-2.5 sm:grid-cols-4">
                {SLOTS.map((s) => {
                  const active = s.id === slotId;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setSlotId(s.id);
                        reset();
                      }}
                      aria-pressed={active}
                      className={`rounded-xl border px-2 py-2.5 text-sm font-semibold transition ${
                        active
                          ? "border-brand bg-brand text-white shadow-sm"
                          : "border-line bg-white text-ink hover:border-brand"
                      }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4 — name (optional) */}
            <div>
              <StepBadge n={4} label="Your name (optional)" />
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  reset();
                }}
                placeholder="e.g. Ahmed Raza"
                className="mt-3 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink outline-none placeholder:text-muted/70 focus:border-brand"
              />
            </div>

            <button
              type="button"
              onClick={() => setConfirmed(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-base font-bold text-white shadow-sm transition hover:brightness-95"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.13c-.25.69-1.46 1.34-2 1.39-.51.05-1.17.07-1.89-.12-.43-.14-.99-.32-1.7-.63-2.99-1.29-4.94-4.3-5.09-4.5-.15-.2-1.21-1.61-1.21-3.07 0-1.46.76-2.18 1.04-2.48.27-.3.59-.37.79-.37l.57.01c.18.01.43-.07.67.51.25.6.84 2.06.91 2.21.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.18-.31.39-.45.53-.15.15-.3.31-.13.6.18.3.79 1.3 1.69 2.11 1.17 1.04 2.15 1.36 2.46 1.51.3.15.48.13.66-.08.18-.2.76-.89.96-1.19.2-.3.4-.25.67-.15.27.1 1.71.81 2.01.96.3.15.5.22.57.35.07.12.07.71-.18 1.39Z" />
              </svg>
              Book on WhatsApp
            </button>

            {/* Confirmation panel */}
            {confirmed && (
              <div className="rounded-2xl border border-[#25D366]/30 bg-[#f0fbf3] p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-bold text-ink">
                    Here&apos;s your WhatsApp message
                  </p>
                  <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] font-semibold text-accent">
                    Demo mode
                  </span>
                </div>

                <div className="mt-3 rounded-2xl rounded-tl-sm bg-[#dcf8c6] p-3.5 text-sm leading-relaxed text-[#0b3d2e] shadow-sm">
                  {message}
                </div>

                <p className="mt-3 text-xs font-medium text-muted">
                  Demo — opens WhatsApp on the live site (no message sent here).
                  On the real site this button opens a chat to {CLINIC.phoneDisplay}{" "}
                  with the message above already typed in.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

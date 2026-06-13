"use client";

import { useMemo, useState } from "react";
import {
  BRANCHES,
  COURSES,
  TIME_SLOTS,
  DEFAULT_START_DATE,
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY,
} from "@/lib/data";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Deterministic date formatter — parses the YYYY-MM-DD string directly
// so there is no timezone or Date() drift between server and client.
function formatDate(value: string): string {
  const [y, m, d] = value.split("-").map((n) => Number.parseInt(n, 10));
  if (!y || !m || !d) return "your chosen date";
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export default function BookingWidget() {
  const [courseId, setCourseId] = useState(COURSES[0].id);
  const [branchId, setBranchId] = useState(BRANCHES[0].id);
  const [date, setDate] = useState(DEFAULT_START_DATE);
  const [slot, setSlot] = useState(TIME_SLOTS[0]);
  const [confirmed, setConfirmed] = useState(false);

  const course = useMemo(
    () => COURSES.find((c) => c.id === courseId) ?? COURSES[0],
    [courseId],
  );
  const branch = useMemo(
    () => BRANCHES.find((b) => b.id === branchId) ?? BRANCHES[0],
    [branchId],
  );

  const whatsappMessage = useMemo(() => {
    return (
      `Assalam-o-Alaikum Islamabad Driving Center! I'd like to reserve a seat.\n` +
      `• Course: ${course.name} (${course.priceValue})\n` +
      `• Branch: ${branch.name}, ${branch.city}\n` +
      `• Start: ${formatDate(date)} at ${slot}\n` +
      `Please confirm my booking. Thank you!`
    );
  }, [course, branch, date, slot]);

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  const chip = (active: boolean) =>
    `rounded-lg border px-4 py-3 text-left text-sm font-semibold transition ${
      active
        ? "border-navy bg-navy text-white shadow-sm"
        : "border-slate-200 bg-white text-ink hover:border-navy/40 hover:bg-cloud"
    }`;

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Selection column */}
      <div className="lg:col-span-3 rounded-card border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <fieldset className="mb-6">
          <legend className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
            1. Choose your course
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {COURSES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCourseId(c.id)}
                aria-pressed={courseId === c.id}
                className={chip(courseId === c.id)}
              >
                <span className="block">{c.name}</span>
                <span
                  className={`mt-1 block text-xs font-medium ${
                    courseId === c.id ? "text-accent" : "text-slate-500"
                  }`}
                >
                  {c.priceLabel} · {c.sessions}
                </span>
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Package prices as advertised on the school&apos;s Instagram.
          </p>
        </fieldset>

        <fieldset className="mb-6">
          <legend className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
            2. Choose a branch
          </legend>
          <div className="grid gap-3 sm:grid-cols-3">
            {BRANCHES.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setBranchId(b.id)}
                aria-pressed={branchId === b.id}
                className={chip(branchId === b.id)}
              >
                <span className="block">{b.name.replace(" (Head Office)", "")}</span>
                <span
                  className={`mt-1 block text-xs font-medium ${
                    branchId === b.id ? "text-accent" : "text-slate-500"
                  }`}
                >
                  {b.city}
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-6 sm:grid-cols-2">
          <fieldset>
            <legend className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
              3. Start date
            </legend>
            <input
              type="date"
              value={date}
              min={DEFAULT_START_DATE}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-ink outline-none focus:border-navy focus:ring-2 focus:ring-navy/20"
              aria-label="Start date"
            />
          </fieldset>

          <fieldset>
            <legend className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
              4. Time slot
            </legend>
            <div className="flex flex-wrap gap-2">
              {TIME_SLOTS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSlot(s)}
                  aria-pressed={slot === s}
                  className={`rounded-lg border px-3 py-2 text-xs font-bold transition ${
                    slot === s
                      ? "border-navy bg-navy text-white"
                      : "border-slate-200 bg-white text-ink hover:border-navy/40"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <button
          type="button"
          onClick={() => setConfirmed(true)}
          className="mt-7 w-full rounded-xl bg-accent px-6 py-4 text-base font-extrabold text-navy shadow-sm transition hover:brightness-95 active:translate-y-px"
        >
          Reserve my seat
        </button>
      </div>

      {/* Summary / confirmation column */}
      <div className="lg:col-span-2">
        <div className="h-full rounded-card border border-slate-200 bg-navy p-6 text-white shadow-sm sm:p-7">
          {!confirmed ? (
            <div className="flex h-full flex-col">
              <h3 className="text-sm font-bold uppercase tracking-wider text-accent">
                Your booking
              </h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-white/60">Course</dt>
                  <dd className="text-right font-semibold">{course.name}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-white/60">Price</dt>
                  <dd className="text-right font-semibold text-accent">{course.priceLabel}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-white/60">Branch</dt>
                  <dd className="text-right font-semibold">{branch.name.replace(" (Head Office)", "")}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-white/60">Start</dt>
                  <dd className="text-right font-semibold">{formatDate(date)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-white/60">Slot</dt>
                  <dd className="text-right font-semibold">{slot}</dd>
                </div>
              </dl>
              <p className="mt-auto pt-6 text-xs text-white/55">
                Review your choices, then reserve. We&apos;ll confirm the seat over WhatsApp.
              </p>
            </div>
          ) : (
            <div className="flex h-full flex-col">
              <span className="inline-flex items-center gap-2 self-start rounded-full bg-success-soft px-3 py-1 text-xs font-bold text-success">
                <span className="h-2 w-2 rounded-full bg-success" /> Seat reserved
              </span>
              <h3 className="mt-4 text-lg font-extrabold">
                You&apos;re booked, see you on the road.
              </h3>
              <dl className="mt-4 space-y-2 rounded-lg bg-white/5 p-4 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-white/60">Course</dt>
                  <dd className="text-right font-semibold">{course.name} · {course.priceLabel}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-white/60">Branch</dt>
                  <dd className="text-right font-semibold">{branch.name.replace(" (Head Office)", "")}, {branch.city}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-white/60">Start</dt>
                  <dd className="text-right font-semibold">{formatDate(date)} · {slot}</dd>
                </div>
              </dl>

              <div className="mt-4 rounded-lg border border-white/15 bg-white/5 p-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-accent">
                  Demo — confirms via WhatsApp on the live site
                </p>
                <p className="mt-2 whitespace-pre-line text-xs leading-relaxed text-white/80">
                  {whatsappMessage}
                </p>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block rounded-lg bg-accent px-4 py-2 text-xs font-extrabold text-navy"
                >
                  Send on WhatsApp ({WHATSAPP_DISPLAY})
                </a>
              </div>

              <button
                type="button"
                onClick={() => setConfirmed(false)}
                className="mt-4 self-start text-xs font-semibold text-white/60 underline underline-offset-4 hover:text-white"
              >
                Edit booking
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

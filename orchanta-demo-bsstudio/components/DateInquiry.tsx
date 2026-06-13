"use client";

import { useState } from "react";
import {
  buildEnquiry,
  cities,
  DEFAULT_DATE,
  eventTypes,
  studio,
  type City,
  type EventType,
} from "@/lib/data";

export default function DateInquiry() {
  const [event, setEvent] = useState<EventType>("Full Wedding");
  const [city, setCity] = useState<City>("Lahore");
  const [date, setDate] = useState<string>(DEFAULT_DATE);
  const [name, setName] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const message = buildEnquiry({ event, city, iso: date, name });
  const waLink = `https://wa.me/${studio.whatsappNumber}?text=${encodeURIComponent(message)}`;

  const pillBase =
    "rounded-full border px-4 py-2 text-sm font-medium tracking-wide transition-colors";
  const pillOn = "border-gold bg-gold text-charcoal";
  const pillOff = "border-line bg-paper text-charcoal-soft hover:border-gold/60";

  return (
    <section id="check-date" className="bg-charcoal text-ivory">
      <div className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
        <div className="mb-10 text-center">
          <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.4em] text-gold">
            Booking
          </p>
          <h2 className="font-display text-4xl font-light leading-tight tracking-tight sm:text-5xl">
            Check your date
          </h2>
          <p className="mx-auto mt-4 max-w-md text-ivory/70">
            Pick your event, date and city — we&apos;ll prepare a WhatsApp message
            for the studio in one tap.
          </p>
        </div>

        <div className="rounded-2xl border border-ivory/12 bg-ivory/[0.04] p-6 sm:p-9">
          {/* Event type — real buttons */}
          <fieldset className="mb-7">
            <legend className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold">
              Event type
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {eventTypes.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  aria-pressed={event === opt}
                  onClick={() => {
                    setEvent(opt);
                    setSubmitted(false);
                  }}
                  className={`${pillBase} ${event === opt ? pillOn : pillOff}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </fieldset>

          {/* City — real buttons */}
          <fieldset className="mb-7">
            <legend className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold">
              City
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {cities.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  aria-pressed={city === opt}
                  onClick={() => {
                    setCity(opt);
                    setSubmitted(false);
                  }}
                  className={`${pillBase} ${city === opt ? pillOn : pillOff}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Date + name — native inputs */}
          <div className="mb-8 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold">
                Event date
              </span>
              <input
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setSubmitted(false);
                }}
                className="w-full rounded-lg border border-ivory/15 bg-charcoal-soft px-4 py-3 text-ivory outline-none focus:border-gold"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold">
                Your name <span className="text-ivory/40">(optional)</span>
              </span>
              <input
                type="text"
                value={name}
                placeholder="e.g. Ayesha"
                onChange={(e) => {
                  setName(e.target.value);
                  setSubmitted(false);
                }}
                className="w-full rounded-lg border border-ivory/15 bg-charcoal-soft px-4 py-3 text-ivory placeholder:text-ivory/35 outline-none focus:border-gold"
              />
            </label>
          </div>

          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-gold px-6 py-4 text-base font-semibold tracking-wide text-charcoal transition-colors hover:bg-gold-deep hover:text-ivory"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.1 14.2c-.2.6-1.2 1.1-1.7 1.2-.4 0-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.5-2.6-1.1-4.3-3.8-4.4-4-.1-.2-1-1.4-1-2.6s.6-1.8.9-2.1c.2-.2.5-.3.6-.3h.5c.2 0 .4 0 .5.4l.7 1.7c.1.1.1.3 0 .5l-.3.5-.3.3c-.1.1-.3.3-.1.5.1.3.6 1 1.3 1.6.9.8 1.6 1 1.9 1.2.2.1.4 0 .5-.1l.6-.7c.2-.2.3-.2.5-.1l1.6.8c.2.1.4.2.4.3.1.1.1.6-.1 1.2Z" />
            </svg>
            Enquire on WhatsApp
          </button>

          {submitted && (
            <div
              role="status"
              className="mt-7 rounded-xl border border-gold/40 bg-ivory p-6 text-charcoal"
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-gold-deep">
                  Message ready
                </p>
                <span className="rounded-full bg-blush px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-charcoal-soft">
                  Demo — opens WhatsApp on the live site
                </span>
              </div>
              <p className="rounded-lg bg-ivory-soft p-4 font-display text-xl leading-snug text-charcoal">
                “{message}”
              </p>
              <p className="mt-4 text-sm text-charcoal-soft">
                On the live site this opens WhatsApp to{" "}
                <span className="font-medium text-charcoal">{studio.whatsappDisplay}</span> with the
                message pre-filled — no typing, no missed enquiries.
              </p>
              <p className="mt-2 break-all text-xs text-muted">{waLink}</p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-gold-deep underline-offset-8 hover:underline"
              >
                ← Edit details
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

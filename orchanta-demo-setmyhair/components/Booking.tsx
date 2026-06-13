"use client";

import { useState } from "react";
import { SERVICES, STYLISTS, DAYS, SLOTS, SALON } from "@/lib/data";

type ChipsProps = {
  label: string;
  options: string[];
  value: string;
  onChange: (next: string) => void;
};

function Chips({ label, options, value, onChange }: ChipsProps) {
  return (
    <fieldset>
      <legend className="text-xs font-medium uppercase tracking-[0.2em] text-rose-700">
        {label}
      </legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(opt)}
              className={
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors " +
                (active
                  ? "border-rose bg-rose text-paper shadow-sm"
                  : "border-line bg-paper text-plum hover:border-rose")
              }
            >
              {opt}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function Booking() {
  const [service, setService] = useState(SERVICES[0].name);
  const [stylist, setStylist] = useState(STYLISTS[0]);
  const [day, setDay] = useState(DAYS[0]);
  const [slot, setSlot] = useState(SLOTS[0]);
  const [booked, setBooked] = useState(false);

  // Reset the confirmation whenever a choice changes so the preview stays true.
  const pick = (setter: (v: string) => void) => (v: string) => {
    setter(v);
    setBooked(false);
  };

  const message =
    `Hi ${SALON.name}, I'd like to book ${service} on ${day} at ${slot}` +
    `${stylist === STYLISTS[0] ? "" : ` with ${stylist}`} — name: ___`;

  return (
    <section id="book" className="scroll-mt-8 bg-plum">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left: the picker */}
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-gold-soft">
            Book in 30 seconds
          </p>
          <h2 className="mt-2 font-heading text-4xl font-semibold text-blush">
            Book an appointment
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-blush/75">
            Choose what you&apos;d like, pick a day and time, and we&apos;ll
            open WhatsApp with your details ready to send.
          </p>

          <div className="mt-8 space-y-7 rounded-2xl bg-paper/95 p-6 shadow-lg backdrop-blur">
            <Chips
              label="Service"
              options={SERVICES.map((s) => s.name)}
              value={service}
              onChange={pick(setService)}
            />
            <Chips
              label="Stylist (optional)"
              options={STYLISTS}
              value={stylist}
              onChange={pick(setStylist)}
            />
            <Chips
              label="Day"
              options={DAYS}
              value={day}
              onChange={pick(setDay)}
            />
            <Chips
              label="Time slot"
              options={SLOTS}
              value={slot}
              onChange={pick(setSlot)}
            />

            <button
              type="button"
              onClick={() => setBooked(true)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25d366] px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <span aria-hidden="true">💬</span>
              Book on WhatsApp
            </button>
          </div>
        </div>

        {/* Right: the confirmation / preview */}
        <div className="flex flex-col justify-center">
          <div className="rounded-2xl border border-gold/30 bg-plum/40 p-6 ring-1 ring-blush/10">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-2xl font-semibold text-blush">
                {booked ? "Ready to send" : "Your appointment"}
              </h3>
              <span className="rounded-full bg-[#25d366]/15 px-3 py-1 text-xs font-medium text-[#7be8a3]">
                WhatsApp
              </span>
            </div>

            <dl className="mt-5 space-y-3 text-sm">
              {[
                ["Service", service],
                ["Stylist", stylist],
                ["Day", day],
                ["Time", slot],
                ["Where", SALON.area],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-blush/10 pb-2">
                  <dt className="text-blush/60">{k}</dt>
                  <dd className="text-right font-medium text-blush">{v}</dd>
                </div>
              ))}
            </dl>

            {booked ? (
              <div className="mt-6">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-soft">
                  Pre-filled WhatsApp message
                </p>
                <p className="mt-2 rounded-xl bg-paper px-4 py-3 text-sm leading-relaxed text-ink">
                  {message}
                </p>
                <p className="mt-3 text-xs text-blush/55">
                  Would send to {SALON.whatsappDisplay}. Demo — opens WhatsApp
                  on the live site.
                </p>
              </div>
            ) : (
              <p className="mt-6 text-sm leading-relaxed text-blush/65">
                Tap <span className="font-medium text-blush">Book on WhatsApp</span>{" "}
                to preview the message we&apos;ll send for you.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

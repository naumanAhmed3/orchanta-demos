"use client";

import { useState } from "react";

type Persona = "parent" | "teen" | "educator";

type Resource = { title: string; desc: string; tag: string };

const PERSONAS: { id: Persona; button: string; heading: string; lead: string }[] = [
  {
    id: "parent",
    button: "I'm a Parent",
    heading: "Support for parents and caregivers",
    lead: "You don't have to figure this out alone — here's where caring families start.",
  },
  {
    id: "teen",
    button: "I'm a Teen",
    heading: "Support made for you",
    lead: "Real tools, real people, and a space that meets you where you are.",
  },
  {
    id: "educator",
    button: "I'm an Educator",
    heading: "Support for your campus",
    lead: "Equip your staff and students to spot struggles early and respond with care.",
  },
];

const RESOURCES: Record<Persona, Resource[]> = {
  parent: [
    {
      title: "ParentConnect support group",
      desc: "A free, welcoming group where parents share, learn coping tools, and feel less alone.",
      tag: "Free • Weekly",
    },
    {
      title: "Family Care Coordination",
      desc: "A Wellness Navigator helps you map options and make a warm handoff to the right care.",
      tag: "1-to-1 support",
    },
    {
      title: "Resource Directory",
      desc: "Search therapists, treatment programs, and crisis lines for youth ages 5–25.",
      tag: "English & Spanish",
    },
  ],
  teen: [
    {
      title: "Student Portal & wellness tips",
      desc: "Self-care tools, screenings, and the 52-Week Wellness Journal to build resilience.",
      tag: "Ages 10–25",
    },
    {
      title: "Support groups for youth",
      desc: "Free virtual groups where you can talk openly and pick up tools that actually help.",
      tag: "Free • Confidential",
    },
    {
      title: "Youth Advocacy Board",
      desc: "Lead change on your campus — build public-speaking and leadership skills with peers.",
      tag: "Join the YAB",
    },
  ],
  educator: [
    {
      title: "Mental Health First Aid & QPR",
      desc: "Train staff to recognize warning signs and connect students to help with confidence.",
      tag: "Certified training",
    },
    {
      title: "Resource Rack Cards & posters",
      desc: "Ready-to-share materials that put help within reach in every classroom and hallway.",
      tag: "Free for schools",
    },
    {
      title: "Youth Linkages Network",
      desc: "Join 50+ counselors and navigators coordinating monthly to close the gaps in care.",
      tag: "Monthly meetup",
    },
  ],
};

export default function ResourceFinder() {
  const [selected, setSelected] = useState<Persona | null>(null);
  const active = PERSONAS.find((p) => p.id === selected) ?? null;

  return (
    <section id="finder" className="relative overflow-hidden bg-cream py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-sky-soft opacity-40 blur-3xl"
      />
      <div className="relative mx-auto w-full max-w-[1000px] px-5 sm:px-7">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[0.82rem] font-extrabold uppercase tracking-[0.16em] text-teal">
            Guided resource finder
          </p>
          <h2 className="font-display mt-3 text-[2.1rem] font-semibold leading-tight tracking-tight text-ink text-balance sm:text-[2.7rem]">
            Find your next step
          </h2>
          <p className="mt-4 text-pretty text-[1.08rem] text-ink-soft">
            Tell us who you are and we&apos;ll point you to the right support — no
            forms, no pressure.
          </p>
        </div>

        {/* Persona buttons — the core interactive flow */}
        <div
          role="group"
          aria-label="Choose who you are"
          className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-3"
        >
          {PERSONAS.map((p) => {
            const isActive = selected === p.id;
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setSelected(p.id)}
                className={`lift inline-flex items-center gap-2.5 rounded-full border-2 px-6 py-3.5 text-[1.02rem] font-bold transition-colors duration-200 ${
                  isActive
                    ? "border-teal bg-teal text-shell shadow-[0_16px_34px_-18px_rgba(29,106,95,0.95)]"
                    : "border-mint-deep bg-shell text-teal-deep hover:bg-mint"
                }`}
              >
                <PersonaGlyph id={p.id} active={isActive} />
                {p.button}
              </button>
            );
          })}
        </div>

        {/* Result panel */}
        <div aria-live="polite" className="mt-10">
          {active ? (
            <div
              key={active.id}
              className="hero-enter rounded-[1.75rem] border border-mint-deep/50 bg-shell p-6 shadow-[0_24px_60px_-34px_rgba(27,58,55,0.5)] sm:p-8"
            >
              <div className="flex items-start gap-3">
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mint text-teal-deep">
                  <PersonaGlyph id={active.id} active />
                </span>
                <div>
                  <h3 className="font-display text-[1.6rem] font-semibold leading-tight text-ink">
                    {active.heading}
                  </h3>
                  <p className="mt-1 text-[1.02rem] text-ink-soft">{active.lead}</p>
                </div>
              </div>

              <ul className="mt-6 grid gap-4 sm:grid-cols-3">
                {RESOURCES[active.id].map((r) => (
                  <li
                    key={r.title}
                    className="lift flex h-full flex-col rounded-2xl border border-mint-deep/40 bg-cream p-5"
                  >
                    <span className="inline-flex w-fit rounded-full bg-mint px-2.5 py-1 text-[0.72rem] font-extrabold uppercase tracking-wide text-teal-deep">
                      {r.tag}
                    </span>
                    <h4 className="font-display mt-3 text-[1.15rem] font-semibold leading-snug text-ink">
                      {r.title}
                    </h4>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">
                      {r.desc}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl bg-mint/60 px-5 py-4">
                <span className="text-[0.98rem] font-semibold text-teal-deep">
                  Prefer to talk it through with a real person?
                </span>
                <a
                  href="#programs"
                  className="inline-flex items-center gap-1.5 rounded-full bg-teal px-4 py-2 text-[0.92rem] font-bold text-shell"
                >
                  Connect with a navigator
                </a>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-xl rounded-[1.75rem] border-2 border-dashed border-mint-deep/60 bg-shell/70 px-6 py-10 text-center">
              <CompassIcon />
              <p className="mt-4 text-[1.05rem] font-semibold text-ink">
                Choose who you are above
              </p>
              <p className="mt-1 text-[0.98rem] text-ink-soft">
                We&apos;ll reveal resources matched to your situation.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function PersonaGlyph({ id, active }: { id: Persona; active: boolean }) {
  const stroke = active ? "currentColor" : "#1d6a5f";
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (id === "parent")
    return (
      <svg {...common}>
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
        <path d="M17 6v6M14 9h6" />
      </svg>
    );
  if (id === "teen")
    return (
      <svg {...common}>
        <circle cx="12" cy="7.5" r="3.2" />
        <path d="M5.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M3 9.5 12 5l9 4.5-9 4.5-9-4.5Z" />
      <path d="M7 11.5V16c0 1.3 2.2 2.4 5 2.4s5-1.1 5-2.4v-4.5" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2c8c7e"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mx-auto breathe"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </svg>
  );
}

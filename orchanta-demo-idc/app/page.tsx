import Logo from "@/components/Logo";
import BookingWidget from "@/components/BookingWidget";
import { BRANCHES, COURSES, WHATSAPP_DISPLAY } from "@/lib/data";

const TRUST = [
  { stat: "15+ yrs", label: "Teaching Islamabad to drive" },
  { stat: "Licensed", label: "Govt-certified instructors" },
  { stat: "3 branches", label: "Islamabad & Rawalpindi" },
  { stat: "License help", label: "Motorway & city traffic police" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Recovery banner — the hook */}
      <div className="bg-accent text-navy">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-1 px-4 py-2 text-center text-xs font-bold sm:flex-row sm:gap-2">
          <span>Your main site is currently down (HTTP 500).</span>
          <span className="font-extrabold underline underline-offset-2">
            This is a working replacement — book a seat below.
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Logo />
          <a
            href="#book"
            className="hidden rounded-lg bg-navy px-4 py-2 text-sm font-bold text-white sm:inline-block"
          >
            Book a seat
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-grid bg-navy text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
            Islamabad · Rawalpindi
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">
            Learn to drive with confidence — Islamabad &amp; Rawalpindi.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/75 sm:text-lg">
            Structured lessons, patient licensed instructors, and full help getting
            your driving license. Pick a course and reserve your seat in under a minute.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#book"
              className="rounded-xl bg-accent px-6 py-3 text-sm font-extrabold text-navy"
            >
              Reserve a seat
            </a>
            <a
              href="#courses"
              className="rounded-xl border border-white/25 px-6 py-3 text-sm font-bold text-white hover:bg-white/10"
            >
              See packages
            </a>
          </div>

          {/* Trust row */}
          <dl className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {TRUST.map((t) => (
              <div
                key={t.label}
                className="rounded-card border border-white/10 bg-white/5 p-4"
              >
                <dt className="text-lg font-extrabold text-accent">{t.stat}</dt>
                <dd className="mt-1 text-xs text-white/70">{t.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Booking centerpiece */}
      <section id="book" className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
            Book your course &amp; slot
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Choose a package, your nearest branch and a start time. On the live site
            this confirms instantly over WhatsApp — no phone tag, no missed calls.
          </p>
        </div>
        <BookingWidget />
      </section>

      {/* Course details */}
      <section id="courses" className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
            What each package includes
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Prices as advertised on the school&apos;s Instagram. No hidden fees.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {COURSES.map((c) => (
              <div
                key={c.id}
                className="flex flex-col rounded-card border border-slate-200 bg-cloud p-6 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-extrabold text-navy">{c.name}</h3>
                  <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-bold text-navy">
                    {c.badge}
                  </span>
                </div>
                <p className="mt-3 text-3xl font-extrabold text-navy">
                  {c.priceLabel}
                  <span className="ml-2 align-middle text-sm font-semibold text-slate-500">
                    {c.transmission}
                  </span>
                </p>
                <p className="mt-2 text-sm text-slate-600">{c.blurb}</p>
                <ul className="mt-5 space-y-2 text-sm text-ink">
                  {c.includes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-0.5 text-success" aria-hidden="true">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#book"
                  className="mt-6 inline-block rounded-lg bg-navy px-5 py-2.5 text-center text-sm font-bold text-white"
                >
                  Reserve {c.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Branch locator strip */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
          Find your nearest branch
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {BRANCHES.map((b) => (
            <div
              key={b.id}
              className="rounded-card border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-accent"
                  aria-hidden="true"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>
                <h3 className="font-extrabold text-navy">{b.name}</h3>
              </div>
              <p className="mt-3 text-sm text-slate-600">{b.address}</p>
              <p className="text-sm text-slate-600">{b.city}</p>
              <p className="mt-3 text-xs font-semibold text-slate-500">{b.hours}</p>
            </div>
          ))}
        </div>
      </section>

      {/* License processing explainer */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
              License processing
            </p>
            <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
              We don&apos;t just teach driving — we help you get licensed.
            </h2>
            <p className="mt-3 text-sm text-white/75">
              From learner&apos;s permit to your full license, our team walks you through
              every step with the motorway and city traffic police.
            </p>
          </div>
          <ol className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { n: "1", t: "Learn & practice", d: "Complete your sessions and pass our internal road-readiness check." },
              { n: "2", t: "Documents & test", d: "We prepare your paperwork and book your traffic-police driving test." },
              { n: "3", t: "Licensed", d: "Collect your license and drive with confidence on city roads & motorway." },
            ].map((step) => (
              <li key={step.n} className="rounded-card border border-white/10 bg-white/5 p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-extrabold text-navy">
                  {step.n}
                </span>
                <h3 className="mt-4 font-extrabold">{step.t}</h3>
                <p className="mt-2 text-sm text-white/70">{step.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <Logo />
            <div className="text-sm text-slate-600">
              <p className="font-semibold text-navy">Enrolment: {WHATSAPP_DISPLAY}</p>
              <p>Office #8, Zahid Plaza, I-10 Markaz, Islamabad</p>
            </div>
          </div>
          <p className="mt-8 border-t border-slate-100 pt-6 text-xs text-slate-400">
            A working concept built by Orchanta for Islamabad Driving Center — demo mode.
            Course prices reflect the school&apos;s published Instagram packages; figures and
            branch hours are illustrative for this preview.
          </p>
        </div>
      </footer>
    </div>
  );
}

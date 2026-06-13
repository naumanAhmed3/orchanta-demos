import Logo from "@/components/Logo";
import { CLINIC } from "@/lib/data";

const TRUST = [
  "10+ years of experience",
  "Implant & endo certified",
  "Gentle, patient-first care",
];

export default function Hero() {
  return (
    <header className="relative overflow-hidden border-b border-line bg-gradient-to-b from-brand-soft to-canvas">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 pt-6">
        <Logo />
        <a
          href="#book"
          className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark"
        >
          Book now
        </a>
      </div>

      <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:py-20">
        <span className="inline-block rounded-full border border-brand/20 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand">
          Chaklala Scheme 3 · Rawalpindi
        </span>
        <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
          {CLINIC.tagline}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
          Friendly, modern dental care from {CLINIC.name} — and a faster way to
          book. Choose a service and time, then confirm on WhatsApp in seconds.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
          {TRUST.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium text-ink"
            >
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="10" cy="10" r="10" fill="#0d7d8c" />
                <path d="m6 10.5 2.5 2.5L14 7.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t}
            </span>
          ))}
        </div>

        <div className="mt-8">
          <a
            href="#book"
            className="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3.5 text-base font-bold text-white shadow-sm transition hover:brightness-95"
          >
            Book an appointment
          </a>
        </div>
      </div>
    </header>
  );
}

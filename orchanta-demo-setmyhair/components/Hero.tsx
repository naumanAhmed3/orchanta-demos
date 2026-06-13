import Logo from "@/components/Logo";
import { SALON } from "@/lib/data";

const TRUST = [
  { icon: "📍", label: SALON.area },
  { icon: "🚶‍♀️", label: "Walk-in + appointment" },
  { icon: "💁‍♀️", label: "Women's salon" },
];

export default function Hero() {
  return (
    <header className="relative overflow-hidden border-b border-line bg-gradient-to-b from-paper to-blush">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blush-deep blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-gold-soft/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl px-6 pb-16 pt-7">
        <nav className="flex items-center justify-between gap-4">
          <Logo />
          <a
            href="#book"
            className="rounded-full bg-rose px-5 py-2 text-sm font-medium text-paper shadow-sm transition-colors hover:bg-rose-600"
          >
            Book now
          </a>
        </nav>

        <div className="mt-14 max-w-2xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-rose-700">
            Johar Town · since day one
          </p>
          <h1 className="font-heading text-5xl font-semibold leading-[1.05] text-plum sm:text-6xl">
            Hair, colour &amp; bridal
            <span className="block text-rose">made for you.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            {SALON.tagline}. Pick a service and a time below and book straight to
            our WhatsApp — no calls, no waiting on hold.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#book"
              className="rounded-full bg-plum px-6 py-3 text-sm font-medium text-blush shadow-sm transition-colors hover:bg-rose-700"
            >
              Book an appointment
            </a>
            <a
              href="#services"
              className="rounded-full border border-line bg-paper px-6 py-3 text-sm font-medium text-plum transition-colors hover:border-rose"
            >
              See services &amp; pricing
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-ink-soft">
            {TRUST.map((t) => (
              <li key={t.label} className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="text-base">
                  {t.icon}
                </span>
                <span>{t.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

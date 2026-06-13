import Logo from "./Logo";
import { studio } from "@/lib/data";

export default function Hero() {
  return (
    <header className="relative overflow-hidden bg-charcoal text-ivory grain">
      {/* Editorial gradient wash standing in for a cinematic cover frame. */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(120% 90% at 80% 0%, rgba(176,145,94,0.30) 0%, rgba(34,31,27,0) 55%), linear-gradient(160deg, #1b1916 0%, #2a2521 55%, #1f1c19 100%)",
        }}
      />
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6">
        <nav className="flex items-center justify-between py-6">
          <Logo tone="light" />
          <span className="hidden text-[0.7rem] font-medium uppercase tracking-[0.28em] text-gold sm:inline">
            {studio.city}
          </span>
        </nav>

        <div className="flex flex-1 flex-col justify-center py-16">
          <p className="mb-5 text-[0.72rem] font-semibold uppercase tracking-[0.4em] text-gold">
            Est. Lahore
          </p>
          <h1 className="max-w-3xl font-display text-5xl font-light leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            Quietly cinematic
            <br />
            <span className="text-gold">wedding stories.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light text-ivory/80">
            {studio.tagline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-2 font-medium tracking-wide text-ivory">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
              {studio.proof}
            </span>
            <a
              href="#check-date"
              className="font-medium uppercase tracking-[0.2em] text-gold underline-offset-8 hover:underline"
            >
              Check your date ↓
            </a>
          </div>
        </div>

        <div className="border-t border-ivory/10 py-5 text-[0.72rem] uppercase tracking-[0.28em] text-ivory/50">
          Weddings · Bridal · Mehndi & Events · Portraits
        </div>
      </div>
    </header>
  );
}

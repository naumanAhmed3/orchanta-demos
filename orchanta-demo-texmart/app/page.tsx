import Logo from "@/components/Logo";
import Catalog from "@/components/Catalog";
import {
  COMPANY,
  MARKETS,
  TRUST_POINTS,
  CAPABILITIES,
} from "@/lib/data";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <Logo />
          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate sm:flex">
            <a href="#catalogue" className="hover:text-navy">
              Catalogue
            </a>
            <a href="#capability" className="hover:text-navy">
              Capability
            </a>
            <a
              href="#inquiry"
              className="rounded-lg bg-navy px-4 py-2 text-white hover:bg-navy-700"
            >
              Start an inquiry
            </a>
          </nav>
          <a
            href="#inquiry"
            className="rounded-lg bg-navy px-3.5 py-2 text-sm font-semibold text-white hover:bg-navy-700 sm:hidden"
          >
            Inquiry
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #fff 0 1px, transparent 1px 11px), repeating-linear-gradient(0deg, #fff 0 1px, transparent 1px 11px)",
          }}
        />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:py-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-mist">
            Export catalogue & inquiry — working concept
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            {COMPANY.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mist sm:text-xl">
            {COMPANY.tagline}
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist/80">
            A buyer-facing catalogue that puts thirty years of terry and woven
            production behind a single, structured inquiry — built to match the
            markets Tex Mart already ships to.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#catalogue"
              className="rounded-lg bg-white px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-mist"
            >
              Browse the catalogue
            </a>
            <a
              href="#inquiry"
              className="rounded-lg border border-white/30 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              Build an inquiry
            </a>
          </div>

          {/* Trust row */}
          <dl className="mt-12 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-card border border-white/15 bg-white/15 sm:grid-cols-3">
            {TRUST_POINTS.map((t) => (
              <div key={t.value} className="bg-navy-900/60 px-5 py-4">
                <dt className="font-display text-xl font-extrabold text-white">
                  {t.value}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-mist">
                  {t.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Catalogue + inquiry (interactive) */}
      <Catalog />

      {/* Capability / export strip */}
      <section
        id="capability"
        className="scroll-mt-20 border-t border-line bg-navy-900 py-14 text-white sm:py-20"
      >
        <div className="mx-auto w-full max-w-6xl px-5">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-thread">
              Capability & capacity
            </span>
            <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
              Built for export, market by market
            </h2>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {MARKETS.map((m) => (
              <span
                key={m}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm font-semibold text-mist"
              >
                {m}
              </span>
            ))}
          </div>

          <dl className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((c) => (
              <div key={c.label} className="bg-navy-900 px-5 py-5">
                <dt className="font-display text-lg font-extrabold text-white">
                  {c.value}
                </dt>
                <dd className="mt-1.5 text-[13px] leading-snug text-mist">
                  {c.label}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-xs italic text-mist/70">
            Capacity, lead-time and market figures are illustrative samples for
            this concept.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line bg-ink py-10 text-mist">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between">
          <Logo tone="light" />
          <div className="text-sm leading-relaxed sm:text-right">
            <p className="font-semibold text-white">
              {COMPANY.contactPerson} · {COMPANY.contactRole}
            </p>
            <p className="text-mist/80">{COMPANY.city}</p>
          </div>
        </div>
        <div className="mx-auto mt-8 w-full max-w-6xl px-5">
          <p className="border-t border-white/10 pt-6 text-xs leading-relaxed text-mist/70">
            A working concept built by Orchanta for Tex Mart International —
            sample catalog, demo mode. Specifications, capacity and pricing are
            illustrative and not a live quotation.
          </p>
        </div>
      </footer>
    </div>
  );
}

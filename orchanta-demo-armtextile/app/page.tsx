import Logo from "@/components/Logo";
import CatalogQuote from "@/components/CatalogQuote";
import { CAPABILITIES } from "@/lib/data";

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden>
      <rect x="5" y="10.5" width="14" height="9" rx="2" fill="currentColor" />
      <path
        d="M8 10.5V8a4 4 0 0 1 8 0v2.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const TRUST = [
  "16+ years exporting",
  "Heimtextil exhibitor",
  "MOQ-friendly orders",
  "OEM & private label",
];

export default function Home() {
  return (
    <div className="min-h-dvh">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Logo />
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-1 text-[11px] font-semibold text-brand sm:inline-flex">
              <LockIcon />
              Secure HTTPS
            </span>
            <a
              href="#catalog"
              className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600"
            >
              View catalog
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky/15 blur-3xl"
        />
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1 text-xs font-semibold text-ink-soft">
            <LockIcon />
            <span className="text-brand">Secure</span> export storefront — concept
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.05] sm:text-5xl">
            Terry towels, bed linen &amp; hospital textiles — Faisalabad, since 2008
          </h1>
          <span aria-hidden className="mt-3 block h-1 w-20 rounded-full bg-sky" />
          <p className="mt-4 max-w-xl text-lg text-ink-soft">
            The trustworthy first impression an overseas buyer expects after meeting you at
            Heimtextil: clear specs, real MOQs and a one-click quote — all on a secure site.
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {TRUST.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-sm font-medium text-ink"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-sky" />
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#catalog"
              className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-95"
            >
              Browse the catalog
            </a>
            <span className="text-sm text-ink-soft">
              8 sample SKUs · GSM, size, MOQ on every item
            </span>
          </div>
        </div>
      </section>

      {/* Catalog + quote (interactive centerpiece) */}
      <CatalogQuote />

      {/* Capabilities / certifications strip */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
            <h2 className="text-2xl font-bold">Capability at a glance</h2>
            <p className="text-xs text-ink-soft">
              Figures illustrative for this concept — confirmed on enquiry.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((c) => (
              <div key={c.label} className="bg-white p-5">
                <p className="font-heading text-base font-semibold text-ink">{c.label}</p>
                <p className="mt-1 text-sm text-ink-soft">{c.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="font-heading text-lg font-bold text-white">
                A.R.M <span className="text-sky">Textile</span>
              </span>
              <p className="mt-1 text-sm text-white/60">
                Manufacturer &amp; exporter of terry towels, bedding &amp; spa/hospital linen.
                Faisalabad, Pakistan.
              </p>
            </div>
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">
              <LockIcon />
              Served over secure HTTPS
            </span>
          </div>
          <hr className="my-6 border-white/10" />
          <p className="text-xs text-white/50">
            A working concept built by Orchanta for A.R.M Textile — sample catalog, demo mode.
            Specifications and certifications shown are illustrative.
          </p>
        </div>
      </footer>
    </div>
  );
}

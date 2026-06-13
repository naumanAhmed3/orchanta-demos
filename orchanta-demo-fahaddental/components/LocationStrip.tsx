import { CLINIC, HOURS } from "@/lib/data";

export default function LocationStrip() {
  return (
    <section id="visit" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-5">
        <h2 className="text-3xl font-bold sm:text-4xl">Visit the clinic</h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {/* Map placeholder — no network calls, no hotlinked tiles */}
          <div className="relative flex min-h-[220px] items-center justify-center overflow-hidden rounded-3xl border border-line bg-brand-soft">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "linear-gradient(#cfe7e9 1px, transparent 1px), linear-gradient(90deg, #cfe7e9 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="relative flex flex-col items-center text-center">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 22s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z"
                  fill="#0d7d8c"
                />
                <circle cx="12" cy="11" r="2.6" fill="#fff" />
              </svg>
              <p className="mt-2 text-sm font-semibold text-brand-dark">
                {CLINIC.area}
              </p>
              <p className="text-xs text-muted">Map preview — demo placeholder</p>
            </div>
          </div>

          {/* Details */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                Address
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink">
                {CLINIC.address}
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                Appointments
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink">
                Phone &amp; WhatsApp
              </p>
              <p className="mt-1 text-sm font-semibold text-ink">
                {CLINIC.phoneDisplay}
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm sm:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                Hours
              </p>
              <ul className="mt-2 space-y-1.5">
                {HOURS.map((h) => (
                  <li
                    key={h.day}
                    className="flex items-center justify-between gap-3 text-sm text-ink"
                  >
                    <span className="font-medium">{h.day}</span>
                    <span className="text-muted">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

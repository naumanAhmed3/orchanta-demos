import { CLINIC, SERVICES } from "@/lib/data";

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-5">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold sm:text-4xl">Our services</h2>
          <p className="mt-2 text-muted">
            Everyday dentistry through to implants and braces — all under one
            roof, with clear pricing from the first visit.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div
              key={s.id}
              className="flex flex-col rounded-2xl border border-line bg-surface p-5 shadow-sm transition hover:border-brand"
            >
              <h3 className="text-lg font-semibold text-ink">{s.name}</h3>
              <p className="mt-2 grow text-sm leading-relaxed text-muted">
                {s.blurb}
              </p>
              <span className="mt-4 inline-block w-fit rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-dark">
                {CLINIC.consultationFee}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

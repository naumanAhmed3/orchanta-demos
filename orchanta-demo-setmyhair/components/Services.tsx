import { SERVICES, pkr } from "@/lib/data";

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-5xl scroll-mt-8 px-6 py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-rose-700">
            Menu
          </p>
          <h2 className="mt-2 font-heading text-4xl font-semibold text-plum">
            Services &amp; price list
          </h2>
        </div>
        <span className="rounded-full border border-gold-soft bg-paper px-3 py-1 text-xs font-medium uppercase tracking-wider text-gold">
          Sample pricing
        </span>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <article
            key={s.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-sm transition-shadow hover:shadow-md"
          >
            <div
              className={`tile ${s.tile} h-24 w-full`}
              role="img"
              aria-label={`${s.name} colour swatch`}
            />
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-heading text-xl font-semibold text-plum">
                  {s.name}
                </h3>
                <span className="shrink-0 rounded-full bg-blush-deep px-2.5 py-1 text-xs font-medium text-rose-700">
                  {s.duration}
                </span>
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                {s.blurb}
              </p>
              <p className="mt-4 font-heading text-2xl font-semibold text-rose">
                {pkr(s.price)}
                <span className="ml-1 text-xs font-medium uppercase tracking-wider text-ink-soft">
                  from
                </span>
              </p>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-ink-soft">
        Prices are illustrative sample pricing for this concept — final quotes
        are confirmed in salon.
      </p>
    </section>
  );
}

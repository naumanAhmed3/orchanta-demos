import { packages } from "@/lib/data";

export default function Packages() {
  return (
    <section id="packages" className="bg-ivory-soft">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.4em] text-gold-deep">
              Packages
            </p>
            <h2 className="font-display text-4xl font-light leading-tight tracking-tight text-charcoal sm:text-5xl">
              Coverage for every part of the celebration.
            </h2>
          </div>
          <span className="rounded-full border border-line bg-paper px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-muted">
            Sample packages
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {packages.map((pkg) => (
            <article
              key={pkg.name}
              className={`flex flex-col rounded-lg border p-7 ${
                pkg.featured
                  ? "border-gold bg-charcoal text-ivory shadow-lg shadow-charcoal/10"
                  : "border-line bg-paper text-charcoal"
              }`}
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-display text-2xl font-medium">{pkg.name}</h3>
                {pkg.featured && (
                  <span className="rounded-full bg-gold px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-charcoal">
                    Most booked
                  </span>
                )}
              </div>
              <p
                className={`mb-6 text-sm uppercase tracking-[0.2em] ${
                  pkg.featured ? "text-gold" : "text-gold-deep"
                }`}
              >
                {pkg.price}
              </p>
              <ul className="space-y-3 text-sm">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      className={pkg.featured ? "text-gold" : "text-gold-deep"}
                      aria-hidden="true"
                    >
                      ✦
                    </span>
                    <span className={pkg.featured ? "text-ivory/85" : "text-charcoal-soft"}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#check-date"
                className={`mt-7 inline-block text-sm font-semibold uppercase tracking-[0.18em] underline-offset-8 hover:underline ${
                  pkg.featured ? "text-gold" : "text-gold-deep"
                }`}
              >
                Check availability →
              </a>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted">
          Tiers and inclusions are illustrative for this concept — final pricing
          is confirmed directly with the studio.
        </p>
      </div>
    </section>
  );
}

import { galleries } from "@/lib/data";

export default function Portfolio() {
  return (
    <section id="portfolio" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.4em] text-gold-deep">
          Selected work
        </p>
        <h2 className="font-display text-4xl font-light leading-tight tracking-tight text-charcoal sm:text-5xl">
          A portfolio, organised the way couples book.
        </h2>
        <p className="mt-4 text-charcoal-soft">
          Browse by the moments that matter — every shoot delivered as a clean
          online gallery.
        </p>
      </div>

      <div className="space-y-16">
        {galleries.map((cat) => (
          <div key={cat.id}>
            <div className="mb-5 flex items-baseline justify-between border-b border-line pb-3">
              <h3 className="font-display text-2xl font-medium text-charcoal">
                {cat.title}
              </h3>
              <span className="text-sm text-muted">{cat.blurb}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {cat.frames.map((frame, i) => (
                <figure
                  key={`${cat.id}-${i}`}
                  className="film-frame"
                  style={{ aspectRatio: frame.ratio }}
                >
                  <div
                    className="h-full w-full"
                    style={{ background: frame.gradient }}
                    aria-hidden="true"
                  />
                  <figcaption className="absolute bottom-4 left-3 right-3 z-10 flex items-center justify-between text-[0.62rem] font-medium uppercase tracking-[0.22em] text-ivory/90">
                    <span>{cat.title}</span>
                    <span className="text-ivory/60">BS · {cat.id}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-10 text-center text-xs text-muted">
        Sample portfolio layout — placeholder frames stand in for the studio&apos;s
        real photography on the live site.
      </p>
    </section>
  );
}

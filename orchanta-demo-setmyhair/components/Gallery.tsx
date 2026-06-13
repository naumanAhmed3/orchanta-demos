import { GALLERY } from "@/lib/data";

function Swatch({ tile, caption }: { tile: string; caption: string }) {
  return (
    <div className="flex-1">
      <div className={`tile ${tile} h-28 w-full rounded-xl`} role="img" aria-label={caption} />
      <p className="mt-2 text-center text-xs text-ink-soft">{caption}</p>
    </div>
  );
}

export default function Gallery() {
  return (
    <section className="border-y border-line bg-blush-deep/50">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-rose-700">
            The transformation
          </p>
          <h2 className="mt-2 font-heading text-4xl font-semibold text-plum">
            Before &amp; after
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-ink-soft">
            Illustrative looks rendered for this concept — your stylist tailors
            every result in person.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {GALLERY.map((g) => (
            <article
              key={g.id}
              className="rounded-2xl border border-line bg-paper p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-lg font-semibold text-plum">
                  {g.label}
                </h3>
                <span className="rounded-full bg-blush-deep px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-rose-700">
                  Before → After
                </span>
              </div>
              <div className="mt-4 flex items-start gap-4">
                <Swatch tile={g.beforeTile} caption={g.before} />
                <span aria-hidden="true" className="self-center pt-2 text-2xl text-gold">
                  →
                </span>
                <Swatch tile={g.afterTile} caption={g.after} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

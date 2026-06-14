import { Wordmark } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-petrol texture-deep text-cream">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Wordmark dropClass="text-cyan" textClass="text-cream" />
            <p className="mt-4 max-w-xs text-sm text-cream/70">
              Cleans like a dream. Plastic-free laundry powder on a mission to
              replace 100 million plastic detergent bottles.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-xl bg-petrol-2/50 px-4 py-2.5 text-sm">
              <span className="text-base">🧪</span>
              <span>
                <span className="font-extrabold text-cyan-soft">
                  Chief Detergent Officer
                </span>
                <br />
                John W. Roulac
              </span>
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cream/50">
              Shop
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/80">
              <li>
                <a href="#shop" className="transition hover:text-cyan">
                  Laundry Detergent Powder
                </a>
              </li>
              <li>
                <a href="#shop" className="transition hover:text-cyan">
                  Oxi Booster &amp; Cleaner
                </a>
              </li>
              <li>
                <a href="#shop" className="transition hover:text-cyan">
                  80-load bundle
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cream/50">
              The promise
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/80">
              <li>Fragrance free</li>
              <li>Zero plastics</li>
              <li>Biodegradable</li>
              <li>HE &amp; hard water</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-cream/10 pt-6 text-xs text-cream/45 sm:flex-row sm:items-center">
          <p>Sample storefront concept · figures populated from Coco Clean&apos;s live site</p>
          <p>Bespoke theme demo — not affiliated checkout</p>
        </div>
      </div>
    </footer>
  );
}

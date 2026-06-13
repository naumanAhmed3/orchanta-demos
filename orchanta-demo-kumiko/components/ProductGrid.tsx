import { PRODUCTS, getProduct, money, type Product } from "@/lib/data";
import LashArt from "@/components/LashArt";

function Card({
  product,
  onQuickShop,
}: {
  product: Product;
  onQuickShop: (id: string) => void;
}) {
  const soldOut = !product.available;
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white">
      <div
        className={`card-field-${product.style} relative flex items-center justify-center px-8 py-10`}
      >
        {soldOut && (
          <span className="absolute left-3 top-3 rounded-full bg-maroon px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-lilac">
            Sold out
          </span>
        )}
        {product.compareAt !== null && !soldOut && (
          <span className="absolute left-3 top-3 rounded-full bg-flame px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-cream">
            Save {money(product.compareAt - product.price)}
          </span>
        )}
        <div className="w-full max-w-[180px] transition-transform duration-300 group-hover:scale-[1.04]">
          <LashArt style={product.style} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <h3 className="font-display text-xl leading-tight">{product.name}</h3>
        <p className="text-[13px] leading-snug text-maroon/70">
          {product.tagline}
        </p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <p className="text-sm">
            <span className="font-medium">{money(product.price)}</span>
            {product.compareAt !== null && (
              <span className="ml-2 text-maroon/45 line-through">
                {money(product.compareAt)}
              </span>
            )}
          </p>
          {soldOut ? (
            <span className="rounded-full border border-line px-4 py-2 text-xs text-maroon/50">
              Back soon
            </span>
          ) : (
            <button
              type="button"
              onClick={() => onQuickShop(product.id)}
              className="rounded-full border border-rust px-4 py-2 text-xs font-medium tracking-wide transition-colors hover:bg-rust hover:text-cream"
            >
              Quick shop
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ProductGrid({
  onQuickShop,
}: {
  onQuickShop: (id: string) => void;
}) {
  const singles = PRODUCTS.filter((p) => p.style !== "bundle");
  const bundle = getProduct("bundle");

  return (
    <section id="bestsellers" className="mx-auto max-w-5xl px-5 py-14 md:py-20">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-violet">
            Bestsellers
          </p>
          <h2 className="font-display mt-2 text-3xl tracking-tight md:text-4xl">
            Three signatures, one price
          </h2>
        </div>
        <p className="hidden text-sm text-maroon/60 sm:block">
          Real products · live prices from kumikolash.com
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {singles.map((p) => (
          <Card key={p.id} product={p} onQuickShop={onQuickShop} />
        ))}
      </div>

      {/* Bundle banner — the store's real mix-and-match set */}
      <div className="card-field-bundle mt-5 flex flex-wrap items-center justify-between gap-6 rounded-2xl p-7 text-cream md:p-9">
        <div className="max-w-md">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-pink">
            Handmade Lash Bundle ₍^ ⩊ ^₎
          </p>
          <h3 className="font-display mt-2 text-2xl leading-tight text-lilac md:text-3xl">
            {bundle.name} — {bundle.tagline.toLowerCase()}
          </h3>
          <p className="mt-2 text-sm text-cream/75">
            {money(bundle.price)} · {bundle.priceNote}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onQuickShop(bundle.id)}
          className="rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-maroon transition-colors hover:bg-pink"
        >
          Build your set
        </button>
      </div>
    </section>
  );
}

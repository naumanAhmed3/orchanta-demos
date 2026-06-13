"use client";

import { getProduct, money } from "@/lib/data";

/** Mobile-only sticky buy bar pinned to the bestseller. */
export default function StickyBuyBar({
  onQuickShop,
}: {
  onQuickShop: (id: string) => void;
}) {
  const fairy = getProduct("fairy");
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 px-4 py-3 backdrop-blur md:hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{fairy.name}</p>
          <p className="text-xs text-maroon/60">
            {money(fairy.price)}
            {fairy.compareAt !== null && (
              <span className="ml-1.5 line-through opacity-60">
                {money(fairy.compareAt)}
              </span>
            )}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onQuickShop(fairy.id)}
          className="shrink-0 rounded-full bg-rust px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-flame"
        >
          Add to bag
        </button>
      </div>
    </div>
  );
}

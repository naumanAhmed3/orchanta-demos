import Estimator from "@/components/Estimator";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Thin promo-style strip, like the store's announcement bar */}
      <div className="bg-brand-navy px-4 py-1.5 text-center text-xs font-medium text-paper">
        Internal ops concept · dimensional divisor 139 · all rates illustrative
      </div>

      {/* Header */}
      <header className="border-b border-line bg-paper">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <Logo />
          <div className="sm:text-right">
            <h1 className="text-xl font-bold text-deep">
              Box-Fit &amp; Rate Estimator
            </h1>
            <p className="text-sm text-mute">
              Dimension-aware shipping for multi-item orders
            </p>
          </div>
        </div>
      </header>

      {/* Main tool */}
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <p className="mb-6 max-w-3xl text-sm text-ink">
          Luggage is big but light, so carriers bill the box, not the bag. This
          tool reads per-item ship dimensions, totals the cubic inches, picks
          the best-fit carton, and shows whether dimensional or actual weight
          drives the rate — before the order hits the packing bench.
        </p>
        <Estimator />
      </main>

      {/* Footer */}
      <footer className="border-t border-line bg-panel px-4 py-5 text-center text-sm text-mute">
        A working concept built by Orchanta for Traveling Bags — rates
        illustrative, demo mode.
      </footer>
    </div>
  );
}

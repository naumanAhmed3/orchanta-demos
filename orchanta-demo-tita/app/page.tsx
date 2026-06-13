import { TitaLogo } from "../components/Logo";
import ProfitDashboard from "../components/ProfitDashboard";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Gold announcement strip — mirrors titaitalia.com's gold bar */}
      <div className="bg-gold px-4 py-2 text-center text-[12px] font-bold text-ink">
        Demo concept · sample data — free shipping over $99 ($200 for Caviar
        &amp; Fresh Truffles)
      </div>

      {/* Header */}
      <header className="border-b border-line bg-paper">
        <div className="mx-auto flex max-w-[1060px] flex-wrap items-center justify-between gap-3 px-5 py-5 sm:px-6">
          <TitaLogo />
          <span className="rounded-full border border-line px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-mute">
            Demo mode
          </span>
        </div>
      </header>

      {/* Intro + dashboard */}
      <section className="flex-1 bg-cream">
        <div className="mx-auto max-w-[1060px] px-5 py-10 sm:px-6 sm:py-12">
          <div className="font-display text-[12px] uppercase tracking-[0.22em] text-gold-deep">
            Profit per order
          </div>
          <h1 className="font-display mt-2 max-w-2xl text-[30px] font-bold leading-[1.12] text-ink sm:text-[38px]">
            True net profit on every order.
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-mute">
            What each order really earns after product costs (COGS), the
            carrier bill, transaction fees and the ad spend that brought it in
            — not just what Shopify shows as the sale.
          </p>

          <div className="mt-8">
            <ProfitDashboard />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line bg-paper">
        <div className="mx-auto flex max-w-[1060px] flex-wrap items-center justify-between gap-2 px-5 py-5 text-[12px] text-mute sm:px-6">
          <span>
            A working concept built by Orchanta for Tita Italia — sample data,
            demo mode.
          </span>
          <span className="font-display tracking-[0.18em] text-gold-deep">
            ORCHANTA
          </span>
        </div>
      </footer>
    </main>
  );
}

import { FarmLinkLogo } from "../components/Logo";
import Reconciler from "../components/Reconciler";
import { RATE_LABEL } from "../lib/reconcile";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Announcement strip — their green, their voice */}
      <div className="bg-green px-4 py-2 text-center text-[12px] font-semibold text-paper">
        Penny-perfect tax exemption for SNAP-EBT orders — every refund reconciled to the cent.
      </div>

      {/* Header */}
      <header className="border-b border-line bg-paper">
        <div className="mx-auto flex w-full max-w-[1040px] items-center justify-between gap-3 px-5 py-4 sm:px-6">
          <FarmLinkLogo subtitle="EBT Tax Reconciliation" />
          <span className="rounded-full border border-line bg-cream px-3 py-1.5 text-[11px] font-semibold text-mute">
            Ops console · demo mode
          </span>
        </div>
      </header>

      {/* Intro */}
      <section className="mx-auto w-full max-w-[1040px] px-5 pb-2 pt-10 sm:px-6">
        <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-green">
          SNAP-EBT · Shopify · Hawaiʻi GET
        </div>
        <h1 className="mt-2 max-w-2xl text-[30px] font-bold leading-tight text-ink sm:text-[38px]">
          EBT Tax Reconciliation
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-mute">
          EBT-paid items are tax-exempt by law — but Shopify records GET on the full order, then
          issues a refund that lands a penny or two short, so receipts and tax reports stop
          matching. This console recomputes every exemption exactly, shows the drift next to the
          corrected figure, and prints a receipt that holds up.
        </p>
        <p className="mt-2 text-[12px] text-soft">
          GET {RATE_LABEL} — Oʻahu pass-on rate, illustrative · five sample orders, fictional
          customers.
        </p>
      </section>

      {/* Reconciler */}
      <section className="mx-auto w-full max-w-[1040px] flex-1 px-5 py-8 sm:px-6">
        <Reconciler />
      </section>

      {/* Footer */}
      <footer className="bg-slate">
        <div className="mx-auto flex w-full max-w-[1040px] flex-wrap items-center justify-between gap-3 px-5 py-6 sm:px-6">
          <span className="text-[13px] text-paper/85">
            A working concept built by Orchanta for Farm Link Hawaiʻi — sample data, demo mode.
          </span>
          <span className="text-[12px] text-paper/55">
            No live store data · no real customers · figures illustrative
          </span>
        </div>
      </footer>
    </main>
  );
}

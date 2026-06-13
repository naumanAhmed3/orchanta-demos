import { EhfPanel } from "@/components/EhfPanel";
import { UnoVitaLogo } from "@/components/Logo";
import { VatConsole } from "@/components/VatConsole";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-5xl flex-col px-4 py-6 sm:px-6 sm:py-8">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-3">
        <UnoVitaLogo />
        <span className="rounded-full border border-uno bg-uno-soft px-3 py-1 text-[11px] font-bold text-uno-deep">
          Demo-modus · eksempeldata
        </span>
      </header>

      <div className="mt-7 sm:mt-9">
        <h1 className="font-display text-3xl font-black leading-tight text-ink sm:text-4xl">
          MVA riktig, regnskap automatisk
        </h1>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-2">
          Riktig norsk MVA — 0&nbsp;%, 15&nbsp;% og 25&nbsp;% — satt per varelinje i stedet for
          manuelle Shopify-kolleksjoner, også på Shopify Collective-varer. Og hvert salg bokført
          automatisk i Tripletex med EHF-faktura.
        </p>
        <p className="mt-1 text-[12px] text-mute">
          Correct Norwegian VAT per order line — and every sale posted to Tripletex automatically.
        </p>
      </div>

      <main className="mt-6 space-y-6 sm:mt-8">
        <VatConsole />
        <EhfPanel />
      </main>

      <footer className="mt-10 border-t border-line pt-4 pb-2 text-[12px] text-mute">
        A working concept built by <span className="font-semibold text-ink">Orchanta</span>{" "}
        for Uno Vita — eksempeldata, demo-modus.
      </footer>
    </div>
  );
}

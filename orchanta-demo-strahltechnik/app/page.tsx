import { StrahltechnikLogo } from "../components/Logo";
import RateSimulator from "../components/RateSimulator";

export default function Page() {
  return (
    <main>
      {/* Header — dark slate with the store's signal-orange accent */}
      <header className="border-b-4 border-orange bg-slate-deep">
        <div className="mx-auto max-w-[1060px] px-5 py-5 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <StrahltechnikLogo onDark />
            <span className="rounded border border-line-dark px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-soft">
              Orchanta · Konzept-Demo
            </span>
          </div>
          <h1 className="font-display mt-6 max-w-2xl text-[34px] font-bold leading-[1.05] text-paper sm:text-[44px]">
            Korrekte Versandkosten für jeden Kundentyp.
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-soft">
            VAT-aware carrier-calculated shipping rates — a working concept for the
            Shopify checkout of Strahltechnik Express.
          </p>
        </div>
      </header>

      {/* Problem framing */}
      <section className="bg-haze">
        <div className="mx-auto max-w-[1060px] px-5 py-8 sm:px-6">
          <div className="rounded-xl border-l-4 border-orange bg-paper p-4 shadow-sm sm:p-5">
            <div className="text-[12px] font-bold uppercase tracking-wide text-orange">
              Das Problem
            </div>
            <p className="mt-1.5 max-w-3xl text-[14px] leading-relaxed text-ink">
              Die Shopify <strong>Carrier Service API</strong> übergibt der
              Versandkosten-Berechnung weder die USt-IdNr. noch den
              Steuerbefreiungs-Status des Käufers. EU-Geschäftskunden mit
              Reverse-Charge sehen im Checkout deshalb falsche
              (Brutto-)Versandkosten. Eine Custom Carrier-Service-App, die den
              B2B-/USt-Status kennt, schließt genau diese Lücke — unten live
              durchspielbar.
            </p>
          </div>
        </div>
      </section>

      {/* Simulator centerpiece */}
      <section className="bg-haze pb-10">
        <div className="mx-auto max-w-[1060px] px-5 sm:px-6">
          <RateSimulator />
        </div>
      </section>

      {/* How the fix works */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1060px] px-5 py-10 sm:px-6">
          <h2 className="font-display text-[24px] font-bold text-slate sm:text-[28px]">
            So schließt die Custom-App die Lücke
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Step
              n="1"
              title="Checkout fragt die App an"
              body="Der Checkout holt die Versandraten nicht mehr blind vom Carrier, sondern von der eigenen Carrier-Service-App des Shops."
            />
            <Step
              n="2"
              title="App kennt den USt-Status"
              body="Die App liest den B2B-Status und die gegen VIES validierte USt-IdNr. aus dem Kundenprofil (Metafeld) — was die API selbst nicht mitliefert."
            />
            <Step
              n="3"
              title="Richtige Rate zurück"
              body="Netto bei Reverse-Charge in die EU, Brutto für Privatkunden, 19 % USt. im Inland — Versandkosten und Rechnung stimmen überein."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-orange bg-slate-deep">
        <div className="mx-auto max-w-[1060px] px-5 py-6 sm:px-6">
          <p className="text-[13px] leading-relaxed text-soft">
            A working concept built by <strong className="text-paper">Orchanta</strong>{" "}
            for Strahltechnik Express — Beispieldaten, Demo-Modus. Alle Raten und
            USt-Prüfungen sind simuliert; keine echten Carrier- oder VIES-Abfragen.
          </p>
        </div>
      </footer>
    </main>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-line bg-haze p-4">
      <div className="font-display flex h-8 w-8 items-center justify-center rounded-md bg-orange text-[16px] font-bold text-paper">
        {n}
      </div>
      <div className="mt-2.5 text-[14px] font-bold text-ink">{title}</div>
      <p className="mt-1 text-[13px] leading-relaxed text-mute">{body}</p>
    </div>
  );
}

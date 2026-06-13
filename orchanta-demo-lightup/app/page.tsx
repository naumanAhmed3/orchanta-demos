import { LightupLogo } from "@/components/Logo";
import { ProvisioningConsole } from "@/components/ProvisioningConsole";
import { SPEC_PARAGRAPH } from "@/lib/data";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-6 sm:px-6">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-blau pb-4">
        <LightupLogo />
        <span className="rounded-full border border-orange bg-orange-soft px-3 py-1 text-[11px] font-bold text-orange-deep">
          Demo-Modus · Beispieldaten
        </span>
      </header>

      {/* One-line promise */}
      <section className="py-7">
        <h1 className="max-w-3xl text-[22px] font-bold leading-snug text-blau sm:text-[26px]">
          Die Art von funktionierender Software, zu der Ihre Produktideen werden.
        </h1>
        <p className="mt-1.5 text-[13px] text-mute">
          The kind of working software your product ideas become — ein Mini-Ausschnitt aus dem
          ISP-Betrieb: Provisionierung, Statusverfolgung, Abrechnung.
        </p>
      </section>

      {/* Centerpiece: provisioning flow */}
      <main className="flex-1">
        <ProvisioningConsole />

        {/* From idea to spec */}
        <section className="mt-8 rounded-xl border border-line bg-paper p-5 shadow-sm">
          <h2 className="text-[15px] font-bold text-ink">
            Von der Idee zur Spezifikation
            <span className="ml-2 text-[12px] font-medium text-steel">From idea to spec</span>
          </h2>
          <p className="mt-2 text-[12px] text-mute">
            Der Ablauf oben wurde aus genau diesem einen Absatz gebaut — geschrieben, bevor eine
            Zeile Code entstand:
          </p>
          <blockquote className="mt-3 border-l-4 border-orange bg-mist px-4 py-3 text-[13px] leading-relaxed text-ink">
            {SPEC_PARAGRAPH}
          </blockquote>
          <p className="mt-3 text-[12px] font-semibold text-blau">
            Idee → Spezifikation → funktionierende Software.
            <span className="ml-1.5 font-medium text-steel">Idea → spec → working software. That&apos;s the engagement.</span>
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-10 border-t border-line pt-4 pb-2 text-center text-[12px] text-mute">
        A working concept built by Orchanta for Lightup Network Solutions — Beispieldaten, Demo-Modus.
      </footer>
    </div>
  );
}

import Logo from "@/components/Logo";
import SpiceGuide from "@/components/SpiceGuide";
import OrderAutomation from "@/components/OrderAutomation";
import OpsDashboard from "@/components/OpsDashboard";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-ink/10 bg-paper/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
          <Logo />
          <span className="pill hidden bg-teal/10 px-3 py-1 text-xs font-bold text-teal-deep sm:inline">
            Concept by Orchanta
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="spice-wash">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:py-20">
          <span className="pill inline-block bg-teal px-3 py-1 text-xs font-bold uppercase tracking-wider text-paper">
            AI · automation · systems
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight text-teal-ink sm:text-5xl">
            AI, automation and systems — tailored to your Sri Lankan curry kits.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-ink-soft sm:text-lg">
            You asked for someone who specialises in AI, automation and systems
            for small businesses. Here is a working concept built for Little Big
            Flavour Kits — three small but real pieces you could put to work,
            each shaped around the way you actually sell curry kits.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#ai"
              className="rounded-xl bg-teal px-5 py-2.5 text-sm font-bold text-paper transition hover:bg-teal-deep"
            >
              See the AI Spice Guide
            </a>
            <a
              href="#automation"
              className="rounded-xl border border-teal/30 bg-paper px-5 py-2.5 text-sm font-bold text-teal-deep transition hover:bg-teal/5"
            >
              Watch the automation
            </a>
          </div>
        </div>
      </section>

      {/* Sections */}
      <main className="mx-auto grid max-w-5xl gap-6 px-5 py-12 sm:gap-8 sm:py-16">
        <SpiceGuide />
        <OrderAutomation />
        <OpsDashboard />
      </main>

      {/* Footer */}
      <footer className="spice-wash border-t border-ink/10">
        <div className="mx-auto max-w-5xl px-5 py-8 text-center">
          <p className="font-display text-base font-bold text-teal-ink">
            A working concept built by Orchanta for Little Big Flavour Kits
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            Demo mode, sample data. Everything here runs in your browser — no
            real orders, customers or stock are affected.
          </p>
        </div>
      </footer>
    </div>
  );
}

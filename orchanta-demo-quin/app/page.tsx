import { QuinLogo } from "../components/Logo";
import { AgentRun } from "../components/AgentRun";
import { SchemaSidebar } from "../components/SchemaSidebar";

// One page: the blueprint stage and single white card from iamquin.ai,
// holding one agent slice end to end — feed, plan, contracts, data layer.
export default function Page() {
  return (
    <main className="bp-stage flex min-h-screen items-start justify-center px-4 py-8 sm:px-10 sm:py-14">
      <div className="bp-card w-full max-w-[1080px] px-5 py-7 sm:px-10 sm:py-9">
        <span aria-hidden="true" className="bp-corner tl" />
        <span aria-hidden="true" className="bp-corner tr" />
        <span aria-hidden="true" className="bp-corner bl" />
        <span aria-hidden="true" className="bp-corner br" />

        {/* Masthead */}
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-ink pb-4">
          <QuinLogo />
          <span className="q-eyebrow text-ink-3">An Orchanta concept</span>
        </header>

        <p className="mt-3 text-[12.5px] text-ink-2">
          Deterministic demo — the same loop runs on FastAPI + Supabase + Groq in production.
        </p>

        {/* Intro */}
        <section className="mt-6">
          <h1 className="font-display text-[15px] font-bold uppercase tracking-[0.06em] text-ink sm:text-[18px]">
            One agent slice, end to end
          </h1>
          <p className="mt-2 max-w-[640px] text-[14.5px] leading-relaxed text-ink-2">
            Quin observes a window of transactions, detects subscription creep,
            decides on an action, and drafts it for approval — four steps, each
            one a typed contract, never free-form prose.
          </p>
        </section>

        {/* Main grid: agent run + data layer */}
        <div className="mt-7 grid grid-cols-1 gap-9 lg:grid-cols-[minmax(0,1fr)_280px]">
          <AgentRun />
          <SchemaSidebar />
        </div>

        {/* Footer */}
        <footer className="mt-10 border-t border-line pt-4">
          <p className="q-eyebrow text-ink-3">
            A working concept built by Orchanta for Quin — sample data, demo mode.
          </p>
        </footer>
      </div>
    </main>
  );
}

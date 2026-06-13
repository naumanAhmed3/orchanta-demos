import { OpasLogo } from "../components/Logo";
import WholesaleSim from "../components/WholesaleSim";

export default function Page() {
  return (
    <main>
      <div className="rule-double" aria-hidden="true" />

      {/* HEADER */}
      <header className="border-b border-line bg-paper">
        <div className="mx-auto flex max-w-[1040px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-4 sm:px-6">
          <OpasLogo />
          <nav className="flex flex-wrap items-center gap-5 text-[13px] font-semibold text-mute" aria-label="Demo navigation">
            <a href="#fix" className="transition-colors hover:text-bark">The fix, live</a>
            <a href="#catalog" className="transition-colors hover:text-bark">Wholesale catalog</a>
            <a href="#ship" className="transition-colors hover:text-bark">How it ships</a>
          </nav>
          <span className="rounded-full border border-tan bg-tan-soft px-3 py-1 text-[11px] font-bold tracking-wider text-bark">
            ORCHANTA CONCEPT · DEMO MODE
          </span>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-bark text-paper">
        <div className="mx-auto max-w-[1040px] px-5 py-14 sm:px-6 sm:py-18">
          <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-tan">
            ~ A working concept for Opa&rsquo;s Smoked Meats ~
          </div>
          <h1 className="font-display mt-4 max-w-2xl text-[38px] leading-[1.08] sm:text-[52px]">
            Wholesale done right.
          </h1>
          <p className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-paper/75">
            Your <strong className="text-paper">Wholesale Catalog</strong> link shows up for some B2B test
            accounts — and disappears for newly created wholesale customers. It comes down to one line of
            Liquid in your Dawn theme. Below is a working simulation of the fixed experience: switch
            accounts and watch the nav respond.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href="#fix"
              className="rounded-lg bg-tan px-5 py-3 text-[14px] font-bold text-bark transition-colors hover:bg-tan-soft"
            >
              Try the account switcher
            </a>
            <span className="text-[12px] text-paper/55">
              Dawn theme · one-line patch · no apps, no replatform
            </span>
          </div>
        </div>
      </section>

      {/* SIMULATOR */}
      <section id="fix" className="scroll-mt-6 bg-cream">
        <div className="mx-auto max-w-[1040px] px-5 py-14 sm:px-6">
          <div className="mb-7 max-w-2xl">
            <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-brick">~ The fix, live ~</div>
            <h2 className="font-display mt-2 text-[28px] text-bark sm:text-[34px]">
              One nav. Every B2B customer. Reliably.
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-mute">
              Three shoppers, one storefront. The <strong className="text-bark">New B2B customer</strong> is the
              exact case that breaks on your store today — created this morning, assigned to a company
              location, never signed in before.
            </p>
          </div>
          <WholesaleSim />
        </div>
      </section>

      {/* HOW IT SHIPS */}
      <section id="ship" className="scroll-mt-6 bg-paper">
        <div className="mx-auto max-w-[1040px] px-5 py-14 sm:px-6">
          <div className="text-center">
            <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-brick">~ How it ships ~</div>
            <h2 className="font-display mt-2 text-[28px] text-bark sm:text-[34px]">
              A small, reviewable theme change
            </h2>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            <Step
              n="01"
              title="Patch the check"
              body="Swap the session-dependent check for the company-location check everywhere your theme gates wholesale — header, drawer menu, and any wholesale-only sections."
            />
            <Step
              n="02"
              title="Test like a real buyer"
              body="We verify against a freshly created B2B customer, an invited company contact, a retail account, and a guest — the matrix your support thread showed was missing."
            />
            <Step
              n="03"
              title="Hand it back documented"
              body="You get the exact diff in your Dawn theme with notes, so the next theme update never silently reintroduces the bug."
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-bark-2 text-paper/70">
        <div className="mx-auto max-w-[1040px] px-5 py-10 text-center sm:px-6">
          <div className="font-display text-[18px] text-tan">Opa&rsquo;s × Orchanta</div>
          <p className="mt-3 text-[12.5px] leading-relaxed">
            A working concept built by Orchanta for Opa&rsquo;s Smoked Meats — sample data, demo mode.
          </p>
          <p className="mt-1 text-[11.5px] text-paper/45">
            Not affiliated with Opa&rsquo;s Smoked Meats. No real customer data; all prices and accounts are fictional.
          </p>
        </div>
      </footer>
    </main>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-line bg-cream p-6">
      <div className="font-display text-[20px] text-tan">{n}</div>
      <h3 className="mt-2 text-[16px] font-bold text-bark">{title}</h3>
      <p className="mt-2 text-[13px] leading-relaxed text-mute">{body}</p>
    </div>
  );
}

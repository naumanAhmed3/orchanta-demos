import { Buy } from "@/components/Buy";
import { Logo } from "@/components/Logo";
import { Pouch } from "@/components/Pouch";
import { FAQS, ORGANS, TRUST, type Trust } from "@/lib/data";

function TrustIcon({ icon }: { icon: Trust["icon"] }) {
  const paths: Record<Trust["icon"], React.ReactNode> = {
    shield: (
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3zM9.5 12l2 2 3.5-4" />
    ),
    flask: (
      <path d="M10 3h4M11 3v5l-5.5 9.5A2 2 0 007.2 21h9.6a2 2 0 001.7-3.5L13 8V3M8.5 15h7" />
    ),
    refresh: (
      <path d="M20 12a8 8 0 11-2.3-5.6M20 4v4h-4M9.5 12.5l2 2 3.5-4" />
    ),
    truck: (
      <path d="M2 7h11v9H2zM13 10h4l3 3v3h-3M6.5 18.5a1.8 1.8 0 100-3.6 1.8 1.8 0 000 3.6zM16.5 18.5a1.8 1.8 0 100-3.6 1.8 1.8 0 000 3.6z" />
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="text-oxblood h-5.5 w-5.5 flex-none"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[icon]}
    </svg>
  );
}

export default function Home() {
  return (
    <div id="top">
      {/* Announcement bar — the brand's own real offer line */}
      <p className="bg-oxblood-deep text-paper px-4 py-2 text-center text-[12.5px] font-medium tracking-[0.02em]">
        Free US shipping&ensp;·&ensp;60-day money-back guarantee
      </p>

      {/* Header */}
      <header className="border-line-soft bg-bone/95 sticky top-0 z-40 border-b backdrop-blur-sm">
        <div className="mx-auto flex max-w-300 items-center justify-between px-6 py-4">
          <a href="#top" aria-label="HiPrimal — back to top">
            <Logo />
          </a>
          <nav
            aria-label="Page sections"
            className="text-ink-soft hidden items-center gap-7 text-[13.5px] font-medium sm:flex"
          >
            <a className="hover:text-ink transition-colors" href="#inside">
              What&rsquo;s inside
            </a>
            <a className="hover:text-ink transition-colors" href="#founder">
              Founder
            </a>
            <a className="hover:text-ink transition-colors" href="#faq">
              FAQ
            </a>
          </nav>
          <span className="border-oxblood text-oxblood border px-2.5 py-1 text-[10.5px] font-semibold tracking-[0.14em] uppercase">
            Orchanta concept
          </span>
        </div>
      </header>

      <main>
        {/* ============ ABOVE THE FOLD ============ */}
        <section className="mx-auto max-w-300 px-6 pt-10 pb-16 lg:pt-16 lg:pb-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Pouch />

            <div>
              <span className="kicker mb-4">
                Grass-fed beef organ supplement for women
              </span>
              <h1 className="font-display text-[clamp(38px,5vw,58px)] leading-[1.04] font-medium tracking-[-0.01em]">
                You&rsquo;re not lazy.{" "}
                <em className="text-oxblood font-normal">
                  You&rsquo;re depleted.
                </em>
              </h1>
              <p className="text-ink-soft mt-5 max-w-130 text-[16.5px] leading-relaxed">
                Heme iron, B12, and CoQ10 — the nutrients tired women are most
                often missing — from six freeze-dried grass-fed beef organs in
                two daily capsules. Nothing else.
              </p>

              <div className="mt-8">
                <Buy />
              </div>

              {/* Trust badges — only the brand's real claims */}
              <ul className="border-line-soft mt-7 grid grid-cols-1 gap-x-6 gap-y-3.5 border-t pt-6 min-[420px]:grid-cols-2">
                {TRUST.map((t) => (
                  <li
                    key={t.label}
                    className="flex items-center gap-2.5 text-[13.5px] font-medium"
                  >
                    <TrustIcon icon={t.icon} />
                    {t.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ============ WHAT'S INSIDE ============ */}
        <section id="inside" className="bg-bone-deep scroll-mt-20">
          <div className="mx-auto max-w-300 px-6 py-16 lg:py-24">
            <span className="kicker mb-4">What&rsquo;s inside</span>
            <h2 className="font-display max-w-[18em] text-[clamp(30px,4vw,46px)] leading-[1.06] font-medium tracking-[-0.01em]">
              Six organs, named nutrients,{" "}
              <em className="text-oxblood font-normal">nothing else.</em>
            </h2>
            <p className="text-ink-soft mt-4 max-w-[40em] text-[16px]">
              1,700 mg of freeze-dried grass-fed beef organs per two-capsule
              serving — every milligram on the label, not a marketing summary.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ORGANS.map((o) => (
                <article
                  key={o.name}
                  className="border-line-soft bg-paper border p-6"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="text-ink-faint text-[12px] font-semibold tracking-[0.18em]">
                      {o.num}
                    </span>
                    <span className="text-oxblood text-[12px] font-semibold tracking-[0.14em] uppercase">
                      {o.mg}
                    </span>
                  </div>
                  <h3 className="font-display mt-3 text-[24px] font-medium">
                    {o.name}
                  </h3>
                  <p className="text-ink-soft mt-2 text-[14px] leading-relaxed">
                    {o.line}
                  </p>
                </article>
              ))}
            </div>

            <p className="text-ink-soft mt-8 max-w-[46em] text-[13.5px]">
              <strong className="text-ink">Other ingredients:</strong> bovine
              gelatin (capsule). No fillers, no flow agents, no synthetic
              vitamins. Sourced from pasture-raised, grass-fed and
              grass-finished Argentine cattle, freeze-dried raw to preserve
              heat-sensitive nutrients.
            </p>
          </div>
        </section>

        {/* ============ FOUNDER ============ */}
        <section id="founder" className="bg-oxblood-deep scroll-mt-20">
          <div className="mx-auto max-w-200 px-6 py-16 text-center lg:py-24">
            <span className="border-rose text-rose mx-auto inline-block border px-3 py-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase">
              Formulated by a nurse
            </span>
            <blockquote className="font-display text-paper mt-7 text-[clamp(22px,3vw,32px)] leading-[1.35] font-normal">
              &ldquo;I spent most of my twenties tired, and nobody could tell
              me why. The answer turned out to be unglamorous: nutrients I
              simply wasn&rsquo;t eating. HiPrimal is the supplement I wish
              someone had handed me — organs from cattle we can trace,
              freeze-dried whole, tested every batch, nothing else in the
              capsule.&rdquo;
            </blockquote>
            <p className="text-rose mt-6 text-[14px] font-medium italic">
              — Founder, HiPrimal
            </p>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section id="faq" className="scroll-mt-20">
          <div className="mx-auto max-w-200 px-6 py-16 lg:py-24">
            <span className="kicker mb-4">FAQ</span>
            <h2 className="font-display text-[clamp(28px,3.6vw,40px)] leading-[1.08] font-medium tracking-[-0.01em]">
              Questions,{" "}
              <em className="text-oxblood font-normal">answered straight.</em>
            </h2>

            <div className="border-line-soft mt-8 border-t">
              {FAQS.map((f) => (
                <details key={f.q} className="faq border-line-soft border-b">
                  <summary className="flex items-center justify-between gap-4 py-5">
                    <span className="text-[16px] font-semibold">{f.q}</span>
                    <span
                      aria-hidden="true"
                      className="chev text-oxblood font-display flex-none text-[22px] leading-none"
                    >
                      +
                    </span>
                  </summary>
                  <p className="text-ink-soft -mt-1 pb-6 text-[15px] leading-relaxed">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>

            <p className="text-ink-faint mt-6 text-[13px]">
              Anything else? Email{" "}
              <span className="text-ink font-medium">hello@hiprimal.com</span>{" "}
              — a person reads every message.
            </p>
          </div>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="bg-ink">
        <div className="mx-auto max-w-300 px-6 py-12">
          <Logo onDark size={28} />
          <p className="text-bone-deep/80 mt-3 max-w-110 text-[13.5px]">
            Six freeze-dried grass-fed beef organs in two daily capsules.
            Built for women.
          </p>
          <p className="text-rose mt-7 text-[13px] font-medium">
            A working concept built by Orchanta for HiPrimal — demo mode. No
            orders are processed and no payment is taken.
          </p>
          <p className="text-bone-deep/60 mt-3 max-w-150 text-[12px]">
            These statements have not been evaluated by the FDA. This product
            is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
        {/* Spacer so the mobile sticky bar never covers the disclaimer */}
        <div className="h-20 md:hidden" aria-hidden="true" />
      </footer>
    </div>
  );
}

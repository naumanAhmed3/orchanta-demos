import { PPPLogo } from "../components/Logo";
import Estimator from "../components/Estimator";
import AppraisalForm from "../components/AppraisalForm";

export default function Page() {
  return (
    <main>
      {/* HERO + header (black) */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-6">
          <header className="flex items-center justify-between py-5">
            <PPPLogo dark />
            <nav className="hidden items-center gap-6 text-[13px] text-soft md:flex">
              <a href="#landlords" className="hover:text-paper">Landlords</a>
              <a href="#investors-deal" className="hover:text-paper">Investors</a>
              <a href="#stays-list" className="hover:text-paper">Stays</a>
            </nav>
            <a href="#estimator" className="rounded-lg bg-teal px-3.5 py-2 text-[13px] font-semibold text-white">Rent estimate</a>
          </header>

          <div className="py-14 sm:py-20">
            <div className="font-display text-[12px] uppercase tracking-[0.22em] text-gold">Exceeding Expectations</div>
            <h1 className="font-display mt-3 max-w-3xl text-[44px] font-bold leading-[1.04] sm:text-[64px]">
              Guaranteed rent. Zero voids.<br />
              <span className="text-teal">Exceeding expectations.</span>
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-soft">
              Fixed monthly income for North East landlords — no voids, no arrears, no agency fees.
              2–5 year company-let contracts, fully managed end to end.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#estimator" className="rounded-lg bg-teal px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-teal-deep">I’m a landlord →</a>
              <a href="#investors-deal" className="rounded-lg border border-line-dark px-5 py-3 text-[15px] font-semibold text-paper transition-colors hover:border-gold">I’m an investor</a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-soft">
              <span>Companies House 14946941</span><span className="text-gold">·</span>
              <span>Newcastle &amp; the North East</span><span className="text-gold">·</span>
              <span>Fully managed &amp; insured</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3-AUDIENCE SPLIT */}
      <section id="landlords" className="bg-cream">
        <div className="mx-auto max-w-[1080px] px-5 py-14 sm:px-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <AudienceCard tag="Landlords" accent="var(--color-teal)" title="Guaranteed Rent" body="Fixed rent every month, voids and arrears covered by us. 2–5 year company lets, zero agency fees, fully managed." cta="Get your estimate" href="#estimator" />
            <AudienceCard tag="Investors" accent="var(--color-gold)" title="PPP Sourcing" body="Hand-picked North East deals — below-market and high-yield — sourced and sent to you. Free, no obligation." cta="See a sample deal" href="#investors-deal" />
            <AudienceCard tag="Guests" accent="var(--color-ink)" title="Serviced Stays" body="Contractor, corporate, relocation and weekend stays across Newcastle. Book direct and save versus hotels." cta="Browse stays" href="#stays-list" />
          </div>
        </div>
      </section>

      {/* ESTIMATOR */}
      <section id="estimator" className="bg-paper">
        <div className="mx-auto max-w-[1080px] px-5 py-16 sm:px-6">
          <div className="mb-6 text-center">
            <div className="font-display text-[12px] uppercase tracking-[0.22em] text-teal-deep">For landlords</div>
            <h2 className="font-display mt-2 text-[34px] font-bold text-ink sm:text-[42px]">What would your rent be — guaranteed?</h2>
            <p className="mx-auto mt-2 max-w-xl text-[15px] text-mute">An indicative figure in seconds, before you ever pick up the phone.</p>
          </div>
          <Estimator />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[1080px] px-5 py-16 sm:px-6">
          <h2 className="font-display text-center text-[32px] font-bold text-ink sm:text-[40px]">How guaranteed rent works</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <Step n="01" title="Free appraisal" body="We view your property and agree a fixed monthly rent — based on the area, not on whether it’s occupied." />
            <Step n="02" title="Company let signed" body="A 2–5 year company-let contract, with a break clause so you can test the agreed figure." />
            <Step n="03" title="You get paid" body="The same fixed amount lands every month, while we handle lettings, maintenance, cleaning and every void." />
          </div>
        </div>
      </section>

      {/* INVESTORS — PPP Sourcing */}
      <section id="investors-deal" className="bg-ink text-paper">
        <div className="mx-auto max-w-[1080px] px-5 py-16 sm:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
            <div>
              <div className="font-display text-[12px] uppercase tracking-[0.22em] text-gold">PPP Sourcing</div>
              <h2 className="font-display mt-2 text-[32px] font-bold sm:text-[40px]">Investor deals, before they hit the market.</h2>
              <p className="mt-3 max-w-md text-[15px] text-soft">
                Below-market and high-yield North East opportunities, sourced and fully packaged — strategy, numbers and refurb worked out. Free weekly access, no obligation.
              </p>
              <a href="#appraisal" className="mt-5 inline-block rounded-lg bg-gold px-5 py-3 text-[15px] font-semibold text-ink transition-colors hover:bg-gold-deep">Request investor access →</a>
            </div>
            <div className="rounded-2xl border border-line-dark bg-ink-2 p-5">
              <div className="flex items-center justify-between">
                <span className="font-display text-[20px] font-semibold">2-bed terrace · Byker (NE6)</span>
                <span className="rounded bg-gold/20 px-2 py-0.5 text-[10px] font-semibold text-gold">SAMPLE DEAL</span>
              </div>
              <dl className="mt-4 space-y-2 text-[13px]">
                <DealRow k="Asking price" v="£135,000" />
                <DealRow k="Estimated refurb" v="£8,000" />
                <DealRow k="Post-refurb value" v="£165,000" />
                <DealRow k="Projected rent" v="£975 pcm" />
                <DealRow k="Gross yield" v="8.3%" hl />
                <DealRow k="Strategy" v="BRR · Serviced Accommodation" />
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICED STAYS */}
      <section id="stays-list" className="bg-paper">
        <div className="mx-auto max-w-[1080px] px-5 py-16 sm:px-6">
          <div className="mb-6">
            <div className="font-display text-[12px] uppercase tracking-[0.22em] text-teal-deep">For guests</div>
            <h2 className="font-display mt-2 text-[32px] font-bold text-ink sm:text-[40px]">Serviced stays across Newcastle</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <StayCard area="Quayside" beds="1-bed apartment · sleeps 2" tags="Contractor · Corporate" price="from £95 / night" />
            <StayCard area="Jesmond" beds="2-bed apartment · sleeps 4" tags="Weekend · Relocation" price="from £130 / night" />
          </div>
          <p className="mt-4 text-[12px] text-soft">Illustrative sample properties.</p>
        </div>
      </section>

      {/* APPRAISAL */}
      <section id="appraisal" className="bg-cream">
        <div className="mx-auto max-w-[640px] px-5 py-16 sm:px-6">
          <div className="mb-6 text-center">
            <h2 className="font-display text-[32px] font-bold text-ink sm:text-[38px]">Book your free appraisal</h2>
            <p className="mt-2 text-[15px] text-mute">Get your exact guaranteed monthly figure — no cost, no obligation.</p>
          </div>
          <AppraisalForm />
        </div>
      </section>

      {/* FOOTER (black) */}
      <footer className="bg-ink text-paper">
        <div className="mx-auto max-w-[1080px] px-5 py-10 sm:px-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <PPPLogo dark showTagline />
              <p className="mt-3 max-w-sm text-[13px] text-soft">Guaranteed rent, serviced accommodation and sourced investment deals across Newcastle and the North East.</p>
            </div>
            <div className="text-[13px] text-soft">
              <div className="text-paper">Get in touch</div>
              <a href="mailto:info@propropertyprojectsltd.com" className="mt-1 block text-teal">info@propropertyprojectsltd.com</a>
              <div className="mt-3 text-paper">Trust</div>
              <div className="mt-1">Companies House 14946941</div>
              <div>Fully managed · insured · 24/7 guest support</div>
            </div>
          </div>
          <div className="mt-8 border-t border-line-dark pt-5 text-[11px] text-soft">
            Concept site built by Orchanta for ProPropertyProjects. Figures and sample deals are illustrative; final guaranteed rent is confirmed after a free appraisal.
          </div>
        </div>
      </footer>
    </main>
  );
}

function AudienceCard({ tag, accent, title, body, cta, href }: { tag: string; accent: string; title: string; body: string; cta: string; href: string }) {
  return (
    <div className="flex flex-col rounded-2xl border border-line bg-paper p-6">
      <span className="h-1 w-10 rounded-full" style={{ background: accent }} />
      <div className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-mute">{tag}</div>
      <h3 className="font-display mt-1 text-[26px] font-semibold text-ink">{title}</h3>
      <p className="mt-2 flex-1 text-[14px] leading-relaxed text-mute">{body}</p>
      <a href={href} className="mt-4 text-[13px] font-semibold text-teal-deep">{cta} →</a>
    </div>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-line bg-paper p-6">
      <div className="font-display text-[34px] font-bold text-gold-deep">{n}</div>
      <h3 className="font-display mt-1 text-[22px] font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-[14px] leading-relaxed text-mute">{body}</p>
    </div>
  );
}

function DealRow({ k, v, hl }: { k: string; v: string; hl?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-line-dark pb-1.5">
      <dt className="text-soft">{k}</dt>
      <dd className={hl ? "font-semibold text-teal" : "text-paper"}>{v}</dd>
    </div>
  );
}

function StayCard({ area, beds, tags, price }: { area: string; beds: string; tags: string; price: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-paper">
      <div className="h-32 bg-gradient-to-br from-ink to-teal-deep" />
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-[22px] font-semibold text-ink">{area}</h3>
          <span className="text-[14px] font-semibold text-teal-deep">{price}</span>
        </div>
        <div className="mt-1 text-[13px] text-mute">{beds}</div>
        <div className="mt-2 text-[11px] font-medium uppercase tracking-wide text-soft">{tags}</div>
      </div>
    </div>
  );
}

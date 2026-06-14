import Link from "next/link";
import Hero from "./components/Hero";
import Reveal from "./components/Reveal";

const PILLARS = [
  {
    n: "01",
    title: "Market Access",
    body: "Entry strategy, regulatory pathways and pricing for healthcare organisations expanding into Vietnam and the wider ASEAN region.",
  },
  {
    n: "02",
    title: "Public-Private Partnerships",
    body: "Structuring and advising on partnerships between ministries, providers and private capital, to widen access to care.",
  },
  {
    n: "03",
    title: "Diagnostics & Supply Chain",
    body: "Practical advisory on diagnostics, distribution and supply resilience across fast-moving regional markets.",
  },
];

const APPROACH = [
  { t: "Senior by default", b: "The advisor you meet is the advisor who does the work, start to finish." },
  { t: "Local knowledge", b: "An honest read on how decisions actually get made on the ground." },
  { t: "Restraint", b: "Clear advice over noise. What we would do, and what we would not." },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* ETHOS — bold indigo band */}
      <section className="relative overflow-hidden bg-indigo text-white">
        <div className="mesh pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <p className="eyebrow text-[12px] font-semibold text-white/55">Our standard</p>
            <h2 className="font-display mt-6 max-w-4xl text-[30px] font-medium leading-[1.12] tracking-[-0.01em] sm:text-[46px]">
              A sharper firm. A wider footprint. A clearer story.{" "}
              <span className="italic text-white/65">Same advisors, same standards.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-[15.5px] leading-relaxed text-white/70">
              Aliro, from the Esperanto for access, was founded in 2018 to give organisations a steady
              hand in markets that reward local knowledge and punish guesswork. We stay deliberately
              small and senior.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SERVICES — editorial indexed list */}
      <section className="border-b border-hairline">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
          <Reveal>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xl">
                <p className="eyebrow text-[12px] font-semibold text-indigo">What we do</p>
                <h2 className="font-display mt-4 text-[30px] font-medium leading-tight tracking-[-0.01em] text-ink sm:text-[40px]">
                  Advisory built around access, not noise.
                </h2>
              </div>
              <Link href="/services" className="text-[13.5px] font-semibold text-indigo underline decoration-indigo/30 underline-offset-4 hover:decoration-indigo">
                All services →
              </Link>
            </div>
          </Reveal>

          <div className="mt-14 border-t border-hairline">
            {PILLARS.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.08}>
                <Link
                  href="/services"
                  className="group grid grid-cols-1 items-start gap-4 border-b border-hairline py-9 transition-colors hover:bg-paper2/60 sm:grid-cols-[auto_1fr_1.4fr] sm:gap-10 sm:px-3"
                >
                  <span className="font-display text-[18px] text-indigo/50">{p.n}</span>
                  <h3 className="font-display text-[24px] font-medium leading-snug text-ink transition-transform group-hover:translate-x-1 sm:text-[28px]">
                    {p.title}
                  </h3>
                  <p className="max-w-md text-[14.5px] leading-relaxed text-muted">{p.body}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="border-b border-hairline bg-paper2/50">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
          <Reveal>
            <p className="eyebrow text-[12px] font-semibold text-indigo">How we work</p>
            <h2 className="font-display mt-4 max-w-2xl text-[28px] font-medium leading-tight tracking-[-0.01em] text-ink sm:text-[36px]">
              Three habits a sophisticated client can feel.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-3">
            {APPROACH.map((a, i) => (
              <Reveal key={a.t} delay={i * 0.08} className="bg-paper">
                <div className="h-full p-8">
                  <span className="font-display text-[15px] text-indigo">0{i + 1}</span>
                  <h3 className="mt-5 text-[18px] font-semibold text-ink">{a.t}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted">{a.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-28 sm:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-[28px] border border-hairline bg-ink p-10 text-white sm:p-16">
              <div className="mesh pointer-events-none absolute inset-0 opacity-50" />
              <div className="relative flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
                <div className="max-w-xl">
                  <h2 className="font-display text-[28px] font-medium leading-tight tracking-[-0.01em] sm:text-[40px]">
                    Considering a move into the region?
                  </h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-white/65">
                    Tell us what you are weighing up. A short conversation is usually the fastest way
                    to see whether we are the right firm for it.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[14px] font-semibold text-ink transition-colors hover:bg-indigo hover:text-white"
                >
                  Get in touch
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

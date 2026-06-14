import Link from "next/link";
import Reveal from "../components/Reveal";

const PARTNERS = [
  { name: "Fabrice Gerard", role: "Founding Partner", initials: "FG" },
  { name: "Dr. My Gerard", role: "Partner, Clinical & Diagnostics", initials: "MG" },
  { name: "Richard Evison", role: "Senior Consulting Partner", initials: "RE" },
];

const VALUES = [
  { title: "Senior by default", body: "Small, senior teams. The advisor you meet is the advisor who does the work." },
  { title: "Local knowledge", body: "An honest read on how decisions actually get made across Vietnam and ASEAN." },
  { title: "Restraint", body: "Clear advice over noise. We tell you what we would do, and what we would not." },
];

export default function WhoWeAre() {
  return (
    <>
      <section className="mesh border-b border-hairline">
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-20 sm:px-8 sm:pt-24">
          <Reveal>
            <p className="eyebrow text-[12px] font-semibold text-indigo">Who we are</p>
            <h1 className="font-display mt-6 max-w-3xl text-[36px] font-medium leading-[1.06] tracking-[-0.01em] text-ink sm:text-[58px]">
              A firm built on <span className="italic text-indigo">access</span>, founded in 2018.
            </h1>
            <p className="mt-7 max-w-2xl text-[16px] leading-relaxed text-muted sm:text-[17.5px]">
              Aliro takes its name from the Esperanto word for access. That single idea runs through
              everything we advise on: helping healthcare organisations reach the markets, partners and
              patients they are built to serve, across Vietnam and the wider ASEAN region.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-hairline">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08} className="bg-paper">
                <div className="h-full p-8">
                  <span className="font-display text-[15px] text-indigo">0{i + 1}</span>
                  <h3 className="mt-5 text-[17px] font-semibold text-ink">{v.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <Reveal>
            <p className="eyebrow text-[12px] font-semibold text-indigo">Leadership</p>
            <h2 className="font-display mt-4 text-[28px] font-medium tracking-[-0.01em] text-ink sm:text-[36px]">
              The people you would work with.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {PARTNERS.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <div className="group h-full rounded-2xl border border-hairline bg-paper p-8 transition-colors hover:border-indigo/40">
                  <div className="font-display flex h-16 w-16 items-center justify-center rounded-full bg-indigo text-[19px] text-white">
                    {p.initials}
                  </div>
                  <h3 className="mt-6 text-[17px] font-semibold text-ink">{p.name}</h3>
                  <p className="mt-1 text-[13.5px] text-indigo">{p.role}</p>
                  <p className="mt-4 text-[13px] leading-relaxed text-muted">
                    Short partner biography, drawn from your own brief and content architecture.
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-6 text-[12px] text-muted">
            Names and roles shown for context. Portraits use initials as placeholders and biographies
            are illustrative, ready to be replaced with your approved copy.
          </p>
        </div>
      </section>

      <section className="border-t border-hairline bg-paper2/50">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-16 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="font-display max-w-lg text-[22px] font-medium leading-snug text-ink">
            Want the full story behind your brief reflected here?
          </p>
          <Link
            href="/contact"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-indigo px-7 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-indigo-deep"
          >
            Get in touch <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}

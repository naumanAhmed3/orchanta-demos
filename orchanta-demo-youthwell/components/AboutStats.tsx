import type { ReactNode } from "react";
import Reveal from "./Reveal";
import CountUp from "./CountUp";

type Stat = {
  value: ReactNode;
  label: string;
};

const STATS: Stat[] = [
  {
    value: <CountUp to={60} suffix="+" />,
    label: "community partners collaborating as one",
  },
  {
    value: <CountUp to={50} suffix="+" />,
    label: "navigators & counselors equipped each month",
  },
  {
    value: <>5–25</>,
    label: "the ages of youth & young adults we serve",
  },
  {
    value: <>2026</>,
    label: "our Integrated Center opens in Santa Barbara",
  },
];

export default function AboutStats() {
  return (
    <section id="about" className="bg-shell py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-7">
        <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <Reveal>
            <p className="text-[0.82rem] font-extrabold uppercase tracking-[0.16em] text-teal">
              Why we exist
            </p>
            <blockquote className="font-display mt-4 text-[1.9rem] font-semibold leading-[1.18] tracking-tight text-ink text-balance sm:text-[2.4rem]">
              &ldquo;By making a difference for one, we can affect many.&rdquo;
            </blockquote>
            <p className="mt-5 text-pretty text-[1.08rem] leading-relaxed text-ink-soft">
              Stigma keeps too many young people suffering quietly. YouthWell
              focuses on prevention and early intervention — meeting youth and
              families where they are, and building a village of support around
              them before a crisis ever begins.
            </p>
            <a
              href="#donate"
              className="mt-7 inline-flex items-center gap-2 rounded-full border-2 border-teal px-5 py-3 text-[1rem] font-bold text-teal-deep transition-colors duration-200 hover:bg-mint"
            >
              Help us reach more youth
            </a>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 110}>
                <div className="lift h-full rounded-3xl border border-mint-deep/40 bg-cream p-6">
                  <div className="font-display text-[2.8rem] font-bold leading-none text-teal sm:text-[3.1rem]">
                    {s.value}
                  </div>
                  <p className="mt-3 text-[0.98rem] leading-snug text-ink-soft">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

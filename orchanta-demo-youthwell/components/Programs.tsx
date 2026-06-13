import Reveal from "./Reveal";

type Program = {
  cadence: string;
  title: string;
  blurb: string;
  meta: string;
  accent: string;
  tint: string;
};

const PROGRAMS: Program[] = [
  {
    cadence: "Weekly",
    title: "Virtual Wellness Workshops",
    blurb:
      "Tools and tips for managing stress and building resilience — for students, parents, and anyone working with youth.",
    meta: "Free • Spanish interpretation",
    accent: "#2c8c7e",
    tint: "#d6ecdf",
  },
  {
    cadence: "Ongoing",
    title: "Support Groups",
    blurb:
      "ParentConnect, FamilyTools+, and youth groups (ages 10–25) — welcoming spaces to share and feel less alone.",
    meta: "Free • In-person & virtual",
    accent: "#5fa8cc",
    tint: "#cfe6f0",
  },
  {
    cadence: "Monthly",
    title: "Mental Health First Aid & QPR",
    blurb:
      "Certification training, in partnership with FSA, that prepares adults to recognize and respond to youth in distress.",
    meta: "Certified • Santa Barbara County",
    accent: "#d4703f",
    tint: "#f6ddcb",
  },
  {
    cadence: "Monthly",
    title: "Youth Linkages Network",
    blurb:
      "Navigators, school counselors, and probation officers coordinate care, with the SB County Education Office and BWell.",
    meta: "Partner meetup",
    accent: "#1d6a5f",
    tint: "#d6ecdf",
  },
];

export default function Programs() {
  return (
    <section
      id="programs"
      className="relative overflow-hidden py-20 sm:py-24"
      style={{
        background:
          "linear-gradient(180deg, #fbf8f1 0%, #eef6f1 100%)",
      }}
    >
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-7">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-[0.82rem] font-extrabold uppercase tracking-[0.16em] text-teal">
              Upcoming programs &amp; events
            </p>
            <h2 className="font-display mt-3 text-[2.1rem] font-semibold leading-tight tracking-tight text-ink text-balance sm:text-[2.7rem]">
              Always free, always close to home.
            </h2>
          </div>
          <a
            href="#finder"
            className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-teal px-5 py-2.5 text-[0.98rem] font-bold text-teal-deep transition-colors duration-200 hover:bg-mint"
          >
            View community calendar
          </a>
        </Reveal>

        <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROGRAMS.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <article className="lift flex h-full flex-col rounded-3xl border border-mint-deep/40 bg-shell p-6 shadow-[0_14px_36px_-26px_rgba(27,58,55,0.5)]">
                <span
                  className="inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.74rem] font-extrabold uppercase tracking-[0.08em]"
                  style={{ backgroundColor: p.tint, color: p.accent }}
                >
                  <CalDot color={p.accent} />
                  {p.cadence}
                </span>
                <h3 className="font-display mt-4 text-[1.3rem] font-semibold leading-snug text-ink">
                  {p.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[0.97rem] leading-relaxed text-ink-soft">
                  {p.blurb}
                </p>
                <p className="mt-4 border-t border-mint-deep/30 pt-3 text-[0.85rem] font-bold text-ink-soft">
                  {p.meta}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CalDot({ color }: { color: string }) {
  return (
    <svg width="9" height="9" viewBox="0 0 12 12" aria-hidden="true">
      <circle cx="6" cy="6" r="6" fill={color} opacity="0.85" />
    </svg>
  );
}

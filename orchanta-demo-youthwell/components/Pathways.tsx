import Reveal from "./Reveal";

type Pathway = {
  title: string;
  blurb: string;
  cta: string;
  accent: string;
  tint: string;
  icon: "support" | "parents" | "schools" | "involved";
};

const PATHWAYS: Pathway[] = [
  {
    title: "Get Support",
    blurb:
      "Free support groups, wellness workshops, and a navigator who helps you find the right care — at your pace.",
    cta: "Start here",
    accent: "#2c8c7e",
    tint: "#d6ecdf",
    icon: "support",
  },
  {
    title: "For Parents",
    blurb:
      "Practical tools, ParentConnect groups, and one-to-one family coordination so you never navigate alone.",
    cta: "Support your child",
    accent: "#5fa8cc",
    tint: "#cfe6f0",
    icon: "parents",
  },
  {
    title: "For Schools",
    blurb:
      "Mental Health First Aid, QPR training, and resource rack cards that put help within reach on every campus.",
    cta: "Bring it to school",
    accent: "#d4703f",
    tint: "#f6ddcb",
    icon: "schools",
  },
  {
    title: "Get Involved",
    blurb:
      "Join the Youth Advocacy Board, volunteer across the county, or partner with our 60+ member collaborative.",
    cta: "Lend a hand",
    accent: "#1d6a5f",
    tint: "#d6ecdf",
    icon: "involved",
  },
];

export default function Pathways() {
  return (
    <section id="pathways" className="bg-shell py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-7">
        <Reveal className="max-w-2xl">
          <p className="text-[0.82rem] font-extrabold uppercase tracking-[0.16em] text-teal">
            Find your way in
          </p>
          <h2 className="font-display mt-3 text-[2.1rem] font-semibold leading-tight tracking-tight text-ink text-balance sm:text-[2.7rem]">
            Wherever you are, there is a pathway for you.
          </h2>
          <p className="mt-4 text-pretty text-[1.08rem] text-ink-soft">
            Four clear ways in — so youth, families, and educators can reach the
            right help without guesswork.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PATHWAYS.map((p, i) => (
            <Reveal key={p.title} delay={i * 110}>
              <article className="lift group h-full rounded-3xl border border-mint-deep/40 bg-cream p-6 shadow-[0_14px_36px_-26px_rgba(27,58,55,0.5)]">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                  style={{ backgroundColor: p.tint, color: p.accent }}
                >
                  <PathIcon name={p.icon} />
                </span>
                <h3 className="font-display mt-5 text-[1.45rem] font-semibold leading-snug text-ink">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-[0.99rem] leading-relaxed text-ink-soft">
                  {p.blurb}
                </p>
                <span
                  className="mt-5 inline-flex items-center gap-1.5 text-[0.95rem] font-bold"
                  style={{ color: p.accent }}
                >
                  {p.cta}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PathIcon({ name }: { name: Pathway["icon"] }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "support":
      return (
        <svg {...common}>
          <path d="M12 20S4 15 4 9.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 8 2.5C20 15 12 20 12 20Z" />
        </svg>
      );
    case "parents":
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="3" />
          <circle cx="17" cy="9.5" r="2.2" />
          <path d="M3 20c0-3 2.2-5 5-5s5 2 5 5M14 20c0-2.2 1.4-3.8 3.2-3.8S20.4 17.8 20.5 20" />
        </svg>
      );
    case "schools":
      return (
        <svg {...common}>
          <path d="M3 9.5 12 5l9 4.5-9 4.5-9-4.5Z" />
          <path d="M7 11.5V16c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-4.5M21 9.5V14" />
        </svg>
      );
    case "involved":
      return (
        <svg {...common}>
          <path d="M12 21c-1-3-3-4.5-5.5-5.5C4 14.5 3 12.7 3 10.8A3.3 3.3 0 0 1 9 9a3.3 3.3 0 0 1 6 0 3.3 3.3 0 0 1 6 1.8c0 1.9-1 3.7-3.5 4.7C15 16.5 13 18 12 21Z" />
        </svg>
      );
  }
}

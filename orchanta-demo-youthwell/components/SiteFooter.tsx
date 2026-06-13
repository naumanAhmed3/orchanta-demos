import BrandMark from "./BrandMark";

const COLUMNS: { heading: string; links: string[] }[] = [
  {
    heading: "Get support",
    links: ["Resource Directory", "Support groups", "Wellness Navigator", "Crisis help lines"],
  },
  {
    heading: "Learn & train",
    links: ["Wellness Workshops", "Mental Health First Aid", "QPR training", "Youth Advocacy Board"],
  },
  {
    heading: "Get involved",
    links: ["Donate", "Volunteer", "Community partners", "Subscribe to newsletter"],
  },
];

export default function SiteFooter() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto w-full max-w-[1180px] px-5 py-16 sm:px-7">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <BrandMark className="h-10 w-10" />
              <span className="font-display text-[1.5rem] font-semibold text-cream">
                Youth<span className="text-mint-deep">Well</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-pretty text-[1rem] leading-relaxed text-cream/75">
              Empowering youth &amp; families with tools to manage their mental
              wellness — and support to navigate their journey.
            </p>
            <p className="mt-5 text-[0.95rem] font-semibold text-mint-deep">
              Santa Barbara County, California
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <h3 className="text-[0.82rem] font-extrabold uppercase tracking-[0.14em] text-mint-deep">
                  {col.heading}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#top"
                        className="text-[0.97rem] text-cream/80 transition-colors duration-200 hover:text-cream"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-cream/15 pt-7 text-[0.9rem] text-cream/65 sm:flex-row sm:items-center sm:justify-between">
          <p>our mental health matters — no one should suffer in silence.</p>
          <p className="font-semibold text-cream/80">
            A working concept built by Orchanta for YouthWell — demo mode.
          </p>
        </div>
      </div>
    </footer>
  );
}

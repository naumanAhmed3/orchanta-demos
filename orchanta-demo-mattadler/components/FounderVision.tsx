import Reveal from "./Reveal";

export default function FounderVision() {
  return (
    <section className="section vision" id="vision">
      <div className="wrap">
        <Reveal className="vision__inner">
          <div className="vision__seal" aria-hidden="true">
            <VisionSeal />
          </div>
          <blockquote>
            <span className="eyebrow">The founding vision</span>
            <p style={{ marginTop: "1.2rem" }}>
              We are building Adler Journeys for travellers who want more than a
              photograph. The Jewish world isn’t a museum — it’s kitchens,
              languages, festivals and neighbours, still very much{" "}
              <span className="serif-italic">alive</span>.
            </p>
            <p>
              Every route is researched, walked and translated by hand. No
              scripts, no crowds — just heritage, food and community, met in the
              languages they’re lived in and with the care they deserve. That is
              the whole idea, and the reason for this concept.
            </p>
            <p className="vision__by">
              Adler Journeys — founding vision · a working concept
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

function VisionSeal() {
  return (
    <svg width="148" height="148" viewBox="0 0 148 148" fill="none">
      <circle cx="74" cy="74" r="71" stroke="var(--gold)" strokeWidth="1" opacity="0.55" />
      <circle cx="74" cy="74" r="60" stroke="var(--gold)" strokeWidth="0.6" opacity="0.35" />
      {/* open book */}
      <path
        d="M74 46c-9-6-20-7-30-5v55c10-2 21-1 30 5 9-6 20-7 30-5V41c-10-2-21-1-30 5Z"
        fill="none"
        stroke="var(--gold-bright)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M74 46v55" stroke="var(--gold-bright)" strokeWidth="1.6" />
      <path
        d="M52 58h14M52 68h14M82 58h14M82 68h14"
        stroke="var(--gold)"
        strokeWidth="1"
        opacity="0.7"
        strokeLinecap="round"
      />
      {/* small star above */}
      <path
        d="M74 18l2 7 7 2-7 2-2 7-2-7-7-2 7-2Z"
        fill="var(--gold-bright)"
      />
    </svg>
  );
}

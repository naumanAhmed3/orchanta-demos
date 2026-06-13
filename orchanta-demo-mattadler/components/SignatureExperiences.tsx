import Reveal from "./Reveal";
import {
  IconHeritage,
  IconCuisine,
  IconFestival,
  IconScholar,
} from "./icons";

const EXPERIENCES = [
  {
    Icon: IconHeritage,
    title: "Heritage journeys",
    body: "Trace family roots through old quarters, archives and synagogues most tours never reach — guided by the historians who know the streets by name.",
    tag: "Roots & memory",
  },
  {
    Icon: IconCuisine,
    title: "Culinary & community",
    body: "Cook in home kitchens, shop the morning markets, and sit at the long table where recipes — and stories — cross every border.",
    tag: "The shared table",
  },
  {
    Icon: IconFestival,
    title: "Festival travel",
    body: "Arrive for the season that matters: candlelight, music and ritual in places that still keep the calendar the old way.",
    tag: "Light & season",
  },
  {
    Icon: IconScholar,
    title: "Scholar-led tours",
    body: "Travel beside writers and teachers who read the place in its own languages, turning a sightseeing day into a living seminar.",
    tag: "Read in the original",
  },
];

export default function SignatureExperiences() {
  return (
    <section className="section experiences" id="experiences">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">What we craft</span>
          <h2 className="display-lg">Signature Experiences</h2>
          <p>
            Four ways into the same idea — that the most meaningful places are
            the ones a guidebook walks straight past. Pick a thread, or weave
            them together below.
          </p>
        </Reveal>

        <div className="cards">
          {EXPERIENCES.map(({ Icon, title, body, tag }, i) => (
            <Reveal key={title} className="xp-card" as="article" delay={i * 110}>
              <span className="xp-card__icon" aria-hidden="true">
                <Icon style={{ color: "var(--gold-bright)" }} />
              </span>
              <h3>{title}</h3>
              <p>{body}</p>
              <span className="xp-card__tag">{tag}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

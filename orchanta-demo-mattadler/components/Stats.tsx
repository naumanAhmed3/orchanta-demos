import CountUp from "./CountUp";
import Reveal from "./Reveal";

const STATS = [
  { to: 12, suffix: "", label: "Countries and coastlines" },
  { to: 40, suffix: "+", label: "Communities we partner with" },
  { to: 7, suffix: "", label: "Languages spoken on the ground" },
  { to: 96, suffix: "", label: "Travellers welcomed each year" },
];

export default function Stats() {
  return (
    <section className="stats" aria-label="By the numbers">
      <div className="wrap">
        <div className="stats__grid">
          {STATS.map((s, i) => (
            <Reveal key={s.label} className="stat" delay={i * 90}>
              <div className="stat__num">
                <CountUp to={s.to} suffix={s.suffix} />
              </div>
              <div className="stat__label">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, type ComponentType, type SVGProps } from "react";
import CountUp from "./CountUp";
import {
  IconHeritage,
  IconCuisine,
  IconFestival,
  IconCommunity,
  IconCheck,
  IconArrow,
  IconCompass,
} from "./icons";

type Interest = {
  key: string;
  name: string;
  desc: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  dayTitle: string;
  dayText: string;
};

const INTERESTS: Interest[] = [
  {
    key: "heritage",
    name: "Heritage",
    desc: "Quarters, archives & roots",
    Icon: IconHeritage,
    dayTitle: "Walk the old Judería",
    dayText:
      "Trace the medieval Jewish quarter with a local historian — the alleys, the mikveh, the names still carved above the doors.",
  },
  {
    key: "cuisine",
    name: "Cuisine",
    desc: "Markets, kitchens & the table",
    Icon: IconCuisine,
    dayTitle: "Cook at a family table",
    dayText:
      "Spend a morning in a home kitchen, then share the meal you made — the recipe handed down, and the story handed with it.",
  },
  {
    key: "festivals",
    name: "Festivals",
    desc: "Seasons, light & ritual",
    Icon: IconFestival,
    dayTitle: "Stay for the season",
    dayText:
      "Time your visit to a festival that still lives here: candlelight, song and ritual inside a centuries-old prayer-house.",
  },
  {
    key: "community",
    name: "Community",
    desc: "People & living traditions",
    Icon: IconCommunity,
    dayTitle: "Sit with the community",
    dayText:
      "Join a Shabbat table or a community evening and meet the people quietly keeping a tradition alive in their own language.",
  },
];

export default function JourneyPicker() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (key: string) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const chosen = INTERESTS.filter((i) => selected.includes(i.key));
  const days = chosen.length;
  const hosts = days === 0 ? 0 : days + 1;

  return (
    <section className="section picker" id="picker">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Build it your way</span>
          <h2 className="display-lg">Shape your journey</h2>
          <p>
            Choose what moves you and a sample itinerary takes shape in real
            time. Add a thread, drop another — there is no wrong combination.
          </p>
        </div>

        <div className="picker__grid">
          {/* interest pickers */}
          <div>
            <div className="interests">
              {INTERESTS.map(({ key, name, desc, Icon }) => {
                const isOn = selected.includes(key);
                return (
                  <button
                    key={key}
                    type="button"
                    className="interest"
                    aria-pressed={isOn}
                    onClick={() => toggle(key)}
                  >
                    <span className="interest__top">
                      <span className="interest__icon" aria-hidden="true">
                        <Icon
                          width={20}
                          height={20}
                          style={{ color: "var(--gold-bright)" }}
                        />
                      </span>
                      <span className="interest__check" aria-hidden="true">
                        <IconCheck style={{ color: "var(--teal-950)" }} />
                      </span>
                    </span>
                    <span className="interest__name">{name}</span>
                    <span className="interest__desc">{desc}</span>
                  </button>
                );
              })}
            </div>
            <p className="picker__hint">
              <IconCompass width={16} height={16} aria-hidden="true" />
              {days === 0
                ? "Tap a thread to begin."
                : `${days} ${days === 1 ? "thread" : "threads"} woven in.`}
            </p>
          </div>

          {/* itinerary panel */}
          {days === 0 ? (
            <div className="itin itin--empty">
              <span className="itin__compass" aria-hidden="true">
                <IconCompass
                  width={42}
                  height={42}
                  style={{ color: "var(--gold)" }}
                />
              </span>
              <p>
                Choose what moves you — your sample itinerary appears here, a
                day at a time.
              </p>
            </div>
          ) : (
            <div className="itin" aria-live="polite">
              <div className="itin__panel" key={selected.join("-")}>
                <span className="itin__eyebrow">Your sample journey</span>
                <h3 className="itin__title">A journey {chosen.map((c) => c.name.toLowerCase()).join(" + ")}</h3>
                <div className="itin__summary">
                  <span className="itin__stat">
                    <b>
                      <CountUp key={`d-${days}`} to={days} duration={900} />
                    </b>
                    <span>{days === 1 ? "day sketched" : "days sketched"}</span>
                  </span>
                  <span className="itin__stat">
                    <b>
                      <CountUp key={`h-${hosts}`} to={hosts} duration={1100} />
                    </b>
                    <span>local hosts</span>
                  </span>
                  <span className="itin__stat">
                    <b>100%</b>
                    <span>privately guided</span>
                  </span>
                </div>

                <ol className="itin__days">
                  {chosen.map((c, i) => (
                    <li
                      key={c.key}
                      className="itin__day"
                      style={{ animationDelay: `${i * 90}ms` }}
                    >
                      <span className="itin__num">{i + 1}</span>
                      <div>
                        <h4>{c.dayTitle}</h4>
                        <p>{c.dayText}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <a href="#enquiry" className="btn btn--gold itin__cta">
                  Plan this journey <IconArrow />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

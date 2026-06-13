import { IconArrow } from "./icons";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__glow" aria-hidden="true" />
      <div className="wrap hero__inner">
        <div className="hero__copy">
          <span className="eyebrow">Travel that goes deeper</span>
          <h1 className="display-xl">
            <span className="hero__word" style={{ animationDelay: "0.15s" }}>
              Journeys
            </span>{" "}
            <span className="hero__word" style={{ animationDelay: "0.24s" }}>
              into
            </span>{" "}
            <span className="hero__word" style={{ animationDelay: "0.33s" }}>
              the
            </span>
            <br />
            <span
              className="hero__word serif-italic"
              style={{ animationDelay: "0.42s" }}
            >
              living
            </span>{" "}
            <span
              className="hero__word serif-italic"
              style={{ animationDelay: "0.51s" }}
            >
              Jewish
            </span>{" "}
            <span
              className="hero__word serif-italic"
              style={{ animationDelay: "0.6s" }}
            >
              world.
            </span>
          </h1>
          <p className="hero__sub lede" style={{ animationDelay: "0.78s" }}>
            Heritage, cuisine, festivals and the people who carry them —
            travelled slowly, in their own languages, with hosts who actually
            live the story.
          </p>

          <div className="hero__actions">
            <a href="#picker" className="btn btn--gold">
              Shape your journey <IconArrow />
            </a>
            <a href="#experiences" className="btn btn--ghost">
              See signature trips
            </a>
          </div>

          <dl className="hero__meta">
            <div>
              <dt>7+</dt>
              <dd>languages spoken on the journey</dd>
            </div>
            <div>
              <dt>1:1</dt>
              <dd>local hosts, never a tour script</dd>
            </div>
            <div>
              <dt>Slow</dt>
              <dd>small groups, never rushed</dd>
            </div>
          </dl>
        </div>

        <div className="hero__art">
          <HeroArt />
        </div>
      </div>
    </section>
  );
}

function HeroArt() {
  return (
    <svg viewBox="0 0 540 540" role="img" aria-label="An illustrated travel route winding across a stylised Mediterranean coastline">
      <defs>
        <linearGradient id="seaG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0f4b45" />
          <stop offset="1" stopColor="#052522" />
        </linearGradient>
        <linearGradient id="goldG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ecc578" />
          <stop offset="1" stopColor="#d8a94a" />
        </linearGradient>
        <radialGradient id="haloG" cx="50%" cy="42%" r="60%">
          <stop offset="0" stopColor="#176a61" stopOpacity="0.55" />
          <stop offset="1" stopColor="#176a61" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* framing disc */}
      <circle cx="270" cy="270" r="250" fill="url(#seaG)" />
      <circle cx="270" cy="270" r="250" fill="url(#haloG)" />
      <circle cx="270" cy="270" r="249" fill="none" stroke="url(#goldG)" strokeWidth="1.4" />
      <circle cx="270" cy="270" r="232" fill="none" stroke="#d8a94a" strokeWidth="0.6" opacity="0.4" />

      {/* faint latitude/topo arcs */}
      <g stroke="#d8a94a" strokeWidth="0.7" opacity="0.16" fill="none">
        <path d="M40 270 Q270 210 500 270" />
        <path d="M52 330 Q270 280 488 330" />
        <path d="M52 210 Q270 150 488 210" />
        <path d="M120 410 Q270 360 420 410" />
      </g>

      {/* stylised coastline */}
      <path
        d="M70 360 C140 330 160 380 220 360 C280 340 300 300 360 305 C410 309 440 280 470 250"
        fill="none"
        stroke="#d8a94a"
        strokeWidth="1.2"
        opacity="0.4"
        strokeDasharray="2 6"
        strokeLinecap="round"
      />

      {/* the route */}
      <path
        className="route-line"
        d="M115 405 C150 330 205 360 235 300 C262 246 210 205 268 170 C320 139 360 200 405 165 C435 142 432 110 452 98"
        fill="none"
        stroke="url(#goldG)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* waypoints */}
      <g>
        <circle className="route-stop" style={{ animationDelay: "1.0s" }} cx="115" cy="405" r="7" fill="#ecc578" />
        <circle className="route-stop" style={{ animationDelay: "1.4s" }} cx="235" cy="300" r="6" fill="#f6efe0" />
        <circle className="route-stop" style={{ animationDelay: "1.8s" }} cx="268" cy="170" r="6" fill="#f6efe0" />
        <circle className="route-stop" style={{ animationDelay: "2.2s" }} cx="405" cy="165" r="6" fill="#f6efe0" />
        <circle className="route-stop" style={{ animationDelay: "2.6s" }} cx="452" cy="98" r="8" fill="#ecc578" />
      </g>

      {/* landmark: domed roof near a waypoint */}
      <g className="float-a" stroke="#ecc578" strokeWidth="1.6" fill="none" strokeLinejoin="round">
        <path d="M150 430 q15 -26 30 0" />
        <path d="M150 430 v18 h30 v-18" />
        <path d="M165 404 v-7" />
      </g>

      {/* landmark: arch */}
      <g className="float-b" stroke="#f6efe0" strokeWidth="1.5" fill="none">
        <path d="M388 138 v-14 a17 17 0 0 1 34 0 v14" />
        <path d="M380 138 h50" />
      </g>

      {/* compass rose */}
      <g className="compass" transform="translate(440 410)">
        <circle r="34" fill="none" stroke="#d8a94a" strokeWidth="1" opacity="0.7" />
        <circle r="26" fill="none" stroke="#d8a94a" strokeWidth="0.5" opacity="0.4" />
        <path d="M0 -30 L6 0 L0 30 L-6 0 Z" fill="url(#goldG)" />
        <path d="M-30 0 L0 -6 L30 0 L0 6 Z" fill="#0a3d39" stroke="#d8a94a" strokeWidth="0.6" />
        <circle r="3" fill="#ecc578" />
      </g>

      {/* drifting stars */}
      <g fill="#ecc578">
        <path className="float-b" d="M120 150 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2Z" opacity="0.85" />
        <path className="float-a" d="M330 430 l1.6 5 5 1.6 -5 1.6 -1.6 5 -1.6 -5 -5 -1.6 5 -1.6Z" opacity="0.7" />
      </g>
    </svg>
  );
}

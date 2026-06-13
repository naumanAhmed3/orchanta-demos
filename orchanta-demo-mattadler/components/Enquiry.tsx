"use client";

import { useState } from "react";
import { IconArrow, IconCheck } from "./icons";

export default function Enquiry() {
  const [sent, setSent] = useState(false);

  return (
    <section className="section enquiry" id="enquiry">
      <div className="wrap">
        <div className="enquiry__card">
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            Start a conversation
          </span>
          <h2 className="display-lg" style={{ marginTop: "1.1rem" }}>
            Tell us where your story begins.
          </h2>
          <p>
            Share a place, a name or a season that matters to you. We’ll come
            back with a hand-built route — slow, private and translated into the
            languages of the people you’ll meet.
          </p>
          <div className="enquiry__actions">
            <button
              type="button"
              className="btn btn--gold"
              onClick={() => setSent(true)}
            >
              Request a private journey <IconArrow />
            </button>
            <a href="#picker" className="btn btn--ghost">
              Back to the planner
            </a>
          </div>
          {sent && (
            <p className="enquiry__note">
              <IconCheck style={{ color: "var(--gold-bright)" }} />
              Thank you — in the live site this opens a private enquiry. This is
              a concept, so nothing was sent.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

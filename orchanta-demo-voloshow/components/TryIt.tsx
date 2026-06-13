"use client";

import { useState } from "react";
import { presets, type PresetId } from "@/lib/data";
import SampleArt from "./SampleArt";

export default function TryIt() {
  const [active, setActive] = useState<PresetId | null>(null);
  const [tried, setTried] = useState<PresetId[]>([]);
  const [ctaNote, setCtaNote] = useState(false);

  const activePreset = presets.find((p) => p.id === active) ?? null;

  function pick(id: PresetId) {
    setActive(id);
    setTried((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }

  return (
    <div className="rounded-2xl border border-line bg-card p-4 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-mute">
          Try it right here — no signup, no upload
        </p>
        <span className="rounded-full border border-line-2 bg-card-2 px-2.5 py-1 text-[11px] font-medium tracking-wide text-dim">
          Demo simulation
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {presets.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => pick(p.id)}
            aria-pressed={active === p.id}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active === p.id
                ? "border-violet bg-violet-glow text-fg"
                : "border-line-2 bg-card-2 text-mute hover:border-violet hover:text-fg"
            }`}
          >
            {p.chip}
          </button>
        ))}
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-line-2">
        {activePreset ? (
          <div key={activePreset.id} className="fade-up">
            <div className="relative aspect-4/3 w-full bg-card-2">
              <SampleArt variant={activePreset.id} />
              <span className="absolute left-3 top-3 rounded-md bg-black/70 px-2 py-1 text-[11px] font-medium tracking-wide text-fg">
                Sample output — demo
              </span>
            </div>
            <div className="border-t border-line-2 bg-card-2 px-4 py-3">
              <p className="text-sm text-fg">“{activePreset.prompt}”</p>
              <p className="mt-1.5 text-xs text-mute">
                Rendered instantly · {activePreset.renderNote} ·{" "}
                <span className="text-teal">
                  {tried.length} of 3 free samples used
                </span>{" "}
                · no signup needed
              </p>
            </div>
          </div>
        ) : (
          <div className="flex aspect-4/3 w-full items-center justify-center bg-card-2 px-6">
            <p className="max-w-xs text-center text-sm text-dim">
              Pick a sample prompt above — a finished result appears here
              instantly.
            </p>
          </div>
        )}
      </div>

      <div className="mt-4">
        <button
          type="button"
          onClick={() => setCtaNote(true)}
          className="w-full rounded-xl bg-violet px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
        >
          Start free — 3 generations, no signup
        </button>
        {ctaNote && (
          <p className="fade-up mt-2 text-xs text-mute">
            Demo mode: in the live product this opens the generator directly —
            account creation is only asked after your third free render.
          </p>
        )}
      </div>
    </div>
  );
}

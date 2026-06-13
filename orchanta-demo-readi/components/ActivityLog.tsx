"use client";

import type { EventEntry } from "./CopilotApp";

const DOTS: Record<string, string> = {
  "tape.import.completed": "bg-ok",
  "tape.import.duplicate_skipped": "bg-warn",
  "case.reply.classified": "bg-pine",
  "case.status.changed": "bg-bad",
};

export default function ActivityLog({
  events,
  lenderId,
}: {
  events: EventEntry[];
  lenderId: string;
}) {
  return (
    <aside className="h-fit rounded-xl border border-line bg-paper lg:sticky lg:top-4">
      <div className="border-b border-line-soft px-4 py-3">
        <h2 className="font-display text-[16px] font-semibold text-pine">Activity log</h2>
        <p className="text-[11.5px] text-mute">
          event-driven · scoped to <span className="font-mono">{lenderId}</span> · simulated
          session clock
        </p>
      </div>
      <div className="px-4 py-3">
        {events.length === 0 ? (
          <p className="py-3 text-[12.5px] text-mute">
            No events yet for this lender — import a tape to start the stream.
          </p>
        ) : (
          <ul className="space-y-2.5">
            {events.map((e) => (
              <li key={e.seq} className="fade-up flex gap-2.5">
                <span
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${DOTS[e.type] ?? "bg-mute"}`}
                />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2 font-mono text-[10.5px]">
                    <span className="text-faint">{e.ts}</span>
                    <span className="font-bold text-pine">{e.type}</span>
                  </div>
                  <p className="text-[12px] leading-snug text-ink">{e.message}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}

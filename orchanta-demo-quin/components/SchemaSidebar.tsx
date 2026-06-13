import { SCHEMA } from "../lib/data";

// The data layer behind the slice: three Postgres tables, every one
// tenant-scoped by user_id. This is the part of Quin that has to be boring
// and right — the agent only ever reads and writes through these.
export function SchemaSidebar() {
  return (
    <aside aria-label="Data layer" className="flex flex-col gap-4">
      <div>
        <h2 className="q-eyebrow text-ink">Data layer</h2>
        <p className="mt-2 text-[13px] leading-relaxed text-ink-2">
          Three tables in Supabase/Postgres carry the whole slice. Row-level
          security on <code className="font-mono text-[12px] text-ink">user_id</code> keeps
          every tenant&apos;s money invisible to every other tenant.
        </p>
      </div>

      {SCHEMA.map((table) => (
        <div key={table.name} className="rounded-[6px] border border-line bg-canvas">
          <div className="border-b border-line px-3 py-2">
            <span className="font-mono text-[12px] font-medium text-ink">{table.name}</span>
            <p className="mt-0.5 text-[11px] leading-snug text-ink-3">{table.note}</p>
          </div>
          <ul className="px-3 py-2">
            {table.columns.map((col) => (
              <li key={col.name} className="flex items-baseline justify-between gap-3 py-[3px]">
                <span className={`font-mono text-[11.5px] ${col.name === "user_id" ? "font-medium text-info" : "text-ink-2"}`}>
                  {col.name}
                </span>
                <span className="text-right font-mono text-[10.5px] text-ink-3">{col.type}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <p className="text-[11.5px] leading-relaxed text-ink-3">
        The step contracts on the left and these tables come from one shared,
        contract-first TypeScript repo — the API can&apos;t drift from the data.
      </p>
    </aside>
  );
}

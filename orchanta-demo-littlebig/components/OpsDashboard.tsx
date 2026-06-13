import { DASHBOARD } from "@/lib/data";

function Tile({
  label,
  value,
  sub,
  accent = "teal",
}: {
  label: string;
  value: string;
  sub: string;
  accent?: "teal" | "gold" | "chilli";
}) {
  const bar =
    accent === "gold"
      ? "bg-gold"
      : accent === "chilli"
        ? "bg-chilli"
        : "bg-teal";
  return (
    <div className="relative overflow-hidden rounded-2xl bg-paper p-4 shadow-sm ring-1 ring-ink/5">
      <span className={`absolute inset-x-0 top-0 h-1 ${bar}`} aria-hidden="true" />
      <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">
        {label}
      </p>
      <p className="mt-1 font-display text-2xl font-bold text-teal-ink sm:text-3xl">
        {value}
      </p>
      <p className="mt-1 text-xs text-ink-soft">{sub}</p>
    </div>
  );
}

export default function OpsDashboard() {
  return (
    <section
      id="systems"
      aria-labelledby="systems-heading"
      className="card p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className="pill bg-teal/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-deep">
          The systems
        </span>
        <span className="pill bg-gold/25 px-3 py-1 text-xs font-bold text-ink">
          Sample data — demo
        </span>
      </div>

      <h3
        id="systems-heading"
        className="mt-4 font-display text-2xl font-bold text-teal-ink sm:text-3xl"
      >
        Ops systems dashboard
      </h3>
      <p className="mt-2 max-w-prose text-sm text-ink-soft sm:text-base">
        One calm view of the things that matter — orders, the kits flying off
        the shelf, what is running low, and your subscriber base. Numbers below
        are illustrative sample data.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Tile
          label="Orders today"
          value={String(DASHBOARD.ordersToday)}
          sub="Across shop & subscriptions"
        />
        <Tile
          label="Best-selling kit"
          value={DASHBOARD.bestKit}
          sub={`${DASHBOARD.bestKitShare} of today's orders`}
          accent="gold"
        />
        <Tile
          label="Low-stock spice alert"
          value={`${DASHBOARD.lowStock.left} ${DASHBOARD.lowStock.unit}`}
          sub={`${DASHBOARD.lowStock.spice} — time to reblend`}
          accent="chilli"
        />
        <Tile
          label="Active subscribers"
          value={String(DASHBOARD.subscribers)}
          sub={DASHBOARD.subscribersTrend}
        />
      </div>
    </section>
  );
}

"use client";

import {
  InViewCard,
  StatGrid,
  BarList,
  LineArea,
  Donut,
  ChannelChart,
  CohortGrid,
} from "./Charts";
import {
  type RangeKey,
  type TabKey,
  CLUB_STATS,
  CLUB_TIERS,
  CLUB_MEMBERS,
  CLUB_RETENTION,
  ALLOC_STATS,
  ALLOC_RELEASES,
  ALLOC_CURVE,
  CHANNEL_STATS,
  CHANNELS,
} from "@/lib/data";

function PanelHead({
  eyebrow,
  title,
  blurb,
}: {
  eyebrow: string;
  title: string;
  blurb: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="kicker text-[var(--gold-600)]">{eyebrow}</p>
      <h2 className="serif mt-2 text-2xl sm:text-3xl text-[var(--wine-900)]">{title}</h2>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-[var(--ink-700)]">{blurb}</p>
    </div>
  );
}

function ClubPanel({ range }: { range: RangeKey }) {
  return (
    <div className="flex flex-col gap-6">
      <PanelHead
        eyebrow="Report · Wine Club"
        title="Member lifetime value & churn"
        blurb="The membership economics off-the-shelf apps flatten into a single number — broken out by tier, with churn and retention you can actually act on."
      />
      <StatGrid stats={CLUB_STATS[range]} />
      <div className="grid gap-5 lg:grid-cols-3">
        <InViewCard className="lg:col-span-2" title="Lifetime value by membership tier" note>
          {(active) => <BarList items={CLUB_TIERS[range]} active={active} mode="currency" />}
        </InViewCard>
        <InViewCard title="12-month retention" note>
          {(active) => (
            <Donut value={CLUB_RETENTION[range]} active={active} caption="Members retained" />
          )}
        </InViewCard>
      </div>
      <InViewCard title="Net active members" note>
        {(active) => (
          <LineArea id="club-members" series={CLUB_MEMBERS[range]} active={active} variant="area" />
        )}
      </InViewCard>
    </div>
  );
}

function AllocationsPanel({ range }: { range: RangeKey }) {
  return (
    <div className="flex flex-col gap-6">
      <PanelHead
        eyebrow="Report · Allocations"
        title="Release Sell-Through"
        blurb="Track every allocated vintage from the release email to sold-out — sell-through, claim rate and days-to-sell-out that no generic report app surfaces."
      />
      <StatGrid stats={ALLOC_STATS[range]} />
      <div className="grid gap-5 lg:grid-cols-2">
        <InViewCard title="Release Sell-Through by wine" note>
          {(active) => <BarList items={ALLOC_RELEASES[range]} active={active} mode="percent" />}
        </InViewCard>
        <InViewCard title="Cumulative units sold after release" note>
          {(active) => (
            <LineArea id="alloc-curve" series={ALLOC_CURVE[range]} active={active} variant="area" gold />
          )}
        </InViewCard>
      </div>
    </div>
  );
}

function ChannelsPanel({ range }: { range: RangeKey }) {
  return (
    <div className="flex flex-col gap-6">
      <PanelHead
        eyebrow="Report · Channels"
        title="Margin by channel"
        blurb="DTC, the tasting salon and wholesale don't earn the same dollar. See true gross margin and revenue mix side by side, not buried in Shopify's blended totals."
      />
      <StatGrid stats={CHANNEL_STATS[range]} />
      <InViewCard title="Gross margin & revenue by channel" note>
        {(active) => <ChannelChart channels={CHANNELS[range]} active={active} />}
      </InViewCard>
    </div>
  );
}

function CohortsPanel() {
  return (
    <div className="flex flex-col gap-6">
      <PanelHead
        eyebrow="Report · Cohorts"
        title="Retention by join quarter"
        blurb="Each row follows a class of members from the month they joined. Anchored to join date, so it stays steady regardless of the date range above."
      />
      <InViewCard title="Member retention curve" note>
        {(active) => <CohortGrid active={active} />}
      </InViewCard>
    </div>
  );
}

export function ReportPanel({ tab, range }: { tab: TabKey; range: RangeKey }) {
  switch (tab) {
    case "club":
      return <ClubPanel range={range} />;
    case "allocations":
      return <AllocationsPanel range={range} />;
    case "channels":
      return <ChannelsPanel range={range} />;
    case "cohorts":
      return <CohortsPanel />;
  }
}

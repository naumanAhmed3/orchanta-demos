/* ---------------------------------------------------------------------------
   Sample data for the Sojourn Cellars custom-analytics concept.
   All figures are illustrative ("sample data, demo mode") and are wired so the
   date-range toggle reshapes every report. Nothing here is real client data.
--------------------------------------------------------------------------- */

export type RangeKey = "90D" | "12M" | "ALL";

export const RANGES: { key: RangeKey; label: string; caption: string }[] = [
  { key: "90D", label: "90 Days", caption: "Mar – Jun 2026" },
  { key: "12M", label: "12 Months", caption: "Jul 2025 – Jun 2026" },
  { key: "ALL", label: "All Time", caption: "Since 2021" },
];

export type TabKey = "club" | "allocations" | "channels" | "cohorts";

export const TABS: { key: TabKey; label: string; sub: string }[] = [
  { key: "club", label: "Wine Club", sub: "Member LTV & churn" },
  { key: "allocations", label: "Allocations", sub: "Vintage release tracking" },
  { key: "channels", label: "Channels", sub: "Margin by channel" },
  { key: "cohorts", label: "Cohorts", sub: "Retention by join quarter" },
];

export type Stat = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  delta?: number;
  hint: string;
};

export type Bar = { label: string; value: number; sub: string; gold?: boolean };
export type Series = { labels: string[]; values: number[] };
export type Channel = { name: string; revenue: number; margin: number };

/* ---- hero overview KPIs ---- */
export const HERO: Record<RangeKey, Stat[]> = {
  "90D": [
    { label: "Net Revenue", value: 612400, prefix: "$", delta: 8.2, hint: "DTC + tasting room + wholesale" },
    { label: "Wine Club LTV", value: 4180, prefix: "$", delta: 5.4, hint: "Avg. lifetime value per member" },
    { label: "Allocation Sell-Through", value: 86, suffix: "%", delta: 3.1, hint: "Across allocated vintages" },
    { label: "DTC Gross Margin", value: 67, suffix: "%", delta: 1.2, hint: "Direct-to-consumer orders" },
  ],
  "12M": [
    { label: "Net Revenue", value: 2941800, prefix: "$", delta: 12.6, hint: "DTC + tasting room + wholesale" },
    { label: "Wine Club LTV", value: 4820, prefix: "$", delta: 9.1, hint: "Avg. lifetime value per member" },
    { label: "Allocation Sell-Through", value: 91, suffix: "%", delta: 4.5, hint: "Across allocated vintages" },
    { label: "DTC Gross Margin", value: 68, suffix: "%", delta: 2.0, hint: "Direct-to-consumer orders" },
  ],
  ALL: [
    { label: "Net Revenue", value: 11840000, prefix: "$", delta: 0, hint: "Lifetime, all channels" },
    { label: "Wine Club LTV", value: 5360, prefix: "$", delta: 0, hint: "Avg. lifetime value per member" },
    { label: "Allocation Sell-Through", value: 88, suffix: "%", delta: 0, hint: "Across allocated vintages" },
    { label: "DTC Gross Margin", value: 69, suffix: "%", delta: 0, hint: "Direct-to-consumer orders" },
  ],
};

/* ---- Wine Club ---- */
export const CLUB_STATS: Record<RangeKey, Stat[]> = {
  "90D": [
    { label: "Avg Member LTV", value: 4180, prefix: "$", delta: 5.4, hint: "Blended across all tiers" },
    { label: "12-mo Churn", value: 9.4, suffix: "%", decimals: 1, delta: -1.1, hint: "Members lapsed in trailing year" },
    { label: "New Members", value: 184, delta: 6.0, hint: "Joined this period" },
    { label: "Net Rev. Retention", value: 104, suffix: "%", delta: 2.3, hint: "Expansion net of churn" },
  ],
  "12M": [
    { label: "Avg Member LTV", value: 4820, prefix: "$", delta: 9.1, hint: "Blended across all tiers" },
    { label: "12-mo Churn", value: 8.1, suffix: "%", decimals: 1, delta: -2.4, hint: "Members lapsed in trailing year" },
    { label: "New Members", value: 612, delta: 14.0, hint: "Joined this period" },
    { label: "Net Rev. Retention", value: 112, suffix: "%", delta: 5.0, hint: "Expansion net of churn" },
  ],
  ALL: [
    { label: "Avg Member LTV", value: 5360, prefix: "$", delta: 0, hint: "Blended across all tiers" },
    { label: "12-mo Churn", value: 11.2, suffix: "%", decimals: 1, delta: 0, hint: "Members lapsed in trailing year" },
    { label: "New Members", value: 3120, delta: 0, hint: "Joined lifetime" },
    { label: "Net Rev. Retention", value: 108, suffix: "%", delta: 0, hint: "Expansion net of churn" },
  ],
};

export const CLUB_TIERS: Record<RangeKey, Bar[]> = {
  "90D": [
    { label: "Quarterly Trio", value: 2620, sub: "3 bottles / release" },
    { label: "Half-Case Club", value: 3840, sub: "6 bottles / release" },
    { label: "Full-Case Club", value: 5390, sub: "12 bottles / release" },
    { label: "Collector Reserve", value: 8660, sub: "Library + allocations", gold: true },
  ],
  "12M": [
    { label: "Quarterly Trio", value: 2980, sub: "3 bottles / release" },
    { label: "Half-Case Club", value: 4360, sub: "6 bottles / release" },
    { label: "Full-Case Club", value: 6120, sub: "12 bottles / release" },
    { label: "Collector Reserve", value: 9840, sub: "Library + allocations", gold: true },
  ],
  ALL: [
    { label: "Quarterly Trio", value: 3340, sub: "3 bottles / release" },
    { label: "Half-Case Club", value: 4880, sub: "6 bottles / release" },
    { label: "Full-Case Club", value: 6860, sub: "12 bottles / release" },
    { label: "Collector Reserve", value: 11020, sub: "Library + allocations", gold: true },
  ],
};

export const CLUB_MEMBERS: Record<RangeKey, Series> = {
  "90D": { labels: ["Wk 1", "Wk 4", "Wk 8", "Wk 12"], values: [2180, 2235, 2284, 2310] },
  "12M": {
    labels: ["Jul", "Sep", "Nov", "Jan", "Mar", "May"],
    values: [1980, 2040, 2120, 2190, 2262, 2310],
  },
  ALL: {
    labels: ["’21", "’22", "’23", "’24", "’25", "’26"],
    values: [820, 1180, 1620, 1980, 2240, 2310],
  },
};

export const CLUB_RETENTION: Record<RangeKey, number> = { "90D": 90.6, "12M": 91.9, ALL: 88.8 };

/* ---- Allocations ---- */
export const ALLOC_STATS: Record<RangeKey, Stat[]> = {
  "90D": [
    { label: "Avg Sell-Through", value: 86, suffix: "%", delta: 3.1, hint: "Units sold ÷ units allocated" },
    { label: "Median Days to Sell-Out", value: 21, suffix: " d", delta: -2.0, hint: "From release email" },
    { label: "Allocation Claim Rate", value: 72, suffix: "%", delta: 1.5, hint: "Offers accepted by list" },
    { label: "Waitlist Conversion", value: 38, suffix: "%", delta: 4.0, hint: "Waitlist → buyer" },
  ],
  "12M": [
    { label: "Avg Sell-Through", value: 91, suffix: "%", delta: 4.5, hint: "Units sold ÷ units allocated" },
    { label: "Median Days to Sell-Out", value: 17, suffix: " d", delta: -3.5, hint: "From release email" },
    { label: "Allocation Claim Rate", value: 76, suffix: "%", delta: 2.8, hint: "Offers accepted by list" },
    { label: "Waitlist Conversion", value: 41, suffix: "%", delta: 5.2, hint: "Waitlist → buyer" },
  ],
  ALL: [
    { label: "Avg Sell-Through", value: 88, suffix: "%", delta: 0, hint: "Units sold ÷ units allocated" },
    { label: "Median Days to Sell-Out", value: 24, suffix: " d", delta: 0, hint: "From release email" },
    { label: "Allocation Claim Rate", value: 70, suffix: "%", delta: 0, hint: "Offers accepted by list" },
    { label: "Waitlist Conversion", value: 36, suffix: "%", delta: 0, hint: "Waitlist → buyer" },
  ],
};

export const ALLOC_RELEASES: Record<RangeKey, Bar[]> = {
  "90D": [
    { label: "2023 Rodgers Creek Pinot", value: 92, sub: "412 of 448 cs" },
    { label: "2022 Sangiacomo Chardonnay", value: 84, sub: "268 of 320 cs" },
    { label: "2023 Gap’s Crown Pinot", value: 97, sub: "388 of 400 cs", gold: true },
    { label: "2021 Georges III Cabernet", value: 68, sub: "204 of 300 cs" },
    { label: "2023 Rosé of Pinot Noir", value: 95, sub: "475 of 500 cs" },
  ],
  "12M": [
    { label: "2023 Rodgers Creek Pinot", value: 96, sub: "430 of 448 cs" },
    { label: "2022 Sangiacomo Chardonnay", value: 88, sub: "282 of 320 cs" },
    { label: "2023 Gap’s Crown Pinot", value: 99, sub: "396 of 400 cs", gold: true },
    { label: "2021 Georges III Cabernet", value: 74, sub: "222 of 300 cs" },
    { label: "2023 Rosé of Pinot Noir", value: 92, sub: "460 of 500 cs" },
  ],
  ALL: [
    { label: "2023 Rodgers Creek Pinot", value: 95, sub: "1.2k of 1.3k cs" },
    { label: "2022 Sangiacomo Chardonnay", value: 86, sub: "910 of 1.1k cs" },
    { label: "2023 Gap’s Crown Pinot", value: 98, sub: "1.1k of 1.1k cs", gold: true },
    { label: "2021 Georges III Cabernet", value: 79, sub: "640 of 810 cs" },
    { label: "2023 Rosé of Pinot Noir", value: 90, sub: "1.4k of 1.6k cs" },
  ],
};

export const ALLOC_CURVE: Record<RangeKey, Series> = {
  "90D": {
    labels: ["D0", "D3", "D7", "D14", "D21", "D30", "D45", "D60"],
    values: [0, 90, 210, 330, 430, 500, 540, 560],
  },
  "12M": {
    labels: ["D0", "D3", "D7", "D14", "D21", "D30", "D45", "D60"],
    values: [0, 120, 280, 410, 520, 590, 620, 640],
  },
  ALL: {
    labels: ["D0", "D3", "D7", "D14", "D21", "D30", "D45", "D60"],
    values: [0, 140, 320, 470, 600, 690, 740, 770],
  },
};

/* ---- Channels ---- */
export const CHANNEL_STATS: Record<RangeKey, Stat[]> = {
  "90D": [
    { label: "DTC Margin", value: 67, suffix: "%", delta: 1.2, hint: "Web + club shipments" },
    { label: "Tasting Room Margin", value: 71, suffix: "%", delta: 0.8, hint: "Salon, Sonoma Square" },
    { label: "Wholesale Margin", value: 41, suffix: "%", delta: -0.6, hint: "Distributor & on-premise" },
    { label: "Blended Margin", value: 62, suffix: "%", delta: 0.9, hint: "All channels weighted" },
  ],
  "12M": [
    { label: "DTC Margin", value: 68, suffix: "%", delta: 2.0, hint: "Web + club shipments" },
    { label: "Tasting Room Margin", value: 72, suffix: "%", delta: 1.4, hint: "Salon, Sonoma Square" },
    { label: "Wholesale Margin", value: 43, suffix: "%", delta: 0.5, hint: "Distributor & on-premise" },
    { label: "Blended Margin", value: 63, suffix: "%", delta: 1.6, hint: "All channels weighted" },
  ],
  ALL: [
    { label: "DTC Margin", value: 69, suffix: "%", delta: 0, hint: "Web + club shipments" },
    { label: "Tasting Room Margin", value: 70, suffix: "%", delta: 0, hint: "Salon, Sonoma Square" },
    { label: "Wholesale Margin", value: 42, suffix: "%", delta: 0, hint: "Distributor & on-premise" },
    { label: "Blended Margin", value: 62, suffix: "%", delta: 0, hint: "All channels weighted" },
  ],
};

export const CHANNELS: Record<RangeKey, Channel[]> = {
  "90D": [
    { name: "Direct-to-Consumer", revenue: 348000, margin: 67 },
    { name: "Tasting Room", revenue: 152000, margin: 71 },
    { name: "Wholesale", revenue: 112400, margin: 41 },
  ],
  "12M": [
    { name: "Direct-to-Consumer", revenue: 1640000, margin: 68 },
    { name: "Tasting Room", revenue: 720000, margin: 72 },
    { name: "Wholesale", revenue: 581800, margin: 43 },
  ],
  ALL: [
    { name: "Direct-to-Consumer", revenue: 6520000, margin: 69 },
    { name: "Tasting Room", revenue: 2980000, margin: 70 },
    { name: "Wholesale", revenue: 2340000, margin: 42 },
  ],
};

/* ---- Cohorts (anchored to join date — constant across ranges) ---- */
export const COHORT_MONTHS = ["M0", "M3", "M6", "M9", "M12"];
export const COHORTS: { cohort: string; size: number; values: (number | null)[] }[] = [
  { cohort: "Q3 ’24", size: 142, values: [100, 93, 88, 84, 80] },
  { cohort: "Q4 ’24", size: 168, values: [100, 91, 86, 82, 78] },
  { cohort: "Q1 ’25", size: 196, values: [100, 94, 90, 86, 83] },
  { cohort: "Q2 ’25", size: 184, values: [100, 92, 87, 83, 79] },
  { cohort: "Q3 ’25", size: 211, values: [100, 95, 91, 87, null] },
  { cohort: "Q4 ’25", size: 233, values: [100, 93, 89, null, null] },
];

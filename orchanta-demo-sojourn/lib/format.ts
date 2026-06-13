export function formatNumber(value: number, decimals = 0): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatStat(
  value: number,
  opts: { prefix?: string; suffix?: string; decimals?: number } = {},
): string {
  return `${opts.prefix ?? ""}${formatNumber(value, opts.decimals ?? 0)}${opts.suffix ?? ""}`;
}

/** Compact currency, e.g. $1.64M / $348K. */
export function compactCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `$${Math.round(value / 1_000)}K`;
  return `$${value}`;
}

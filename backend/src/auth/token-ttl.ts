/** Parse JWT/cookie TTL strings like `15m`, `7d`, `90d` into milliseconds. */
export function ttlToMs(ttl: string, fallbackMs: number): number {
  const match = ttl.trim().match(/^(\d+)(s|m|h|d)$/i);
  if (!match) return fallbackMs;

  const value = Number(match[1]);
  const unit = match[2].toLowerCase();
  const multipliers: Record<string, number> = {
    s: 1000,
    m: 60_000,
    h: 3_600_000,
    d: 86_400_000,
  };

  return value * (multipliers[unit] ?? 0) || fallbackMs;
}

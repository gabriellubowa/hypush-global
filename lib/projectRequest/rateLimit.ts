// Sliding-window rate limiter kept in memory. Fine for a single local server;
// a multi-instance deployment would need a shared store instead.
export interface IRateLimiter {
  isAllowed: (key: string, now?: number) => boolean;
}

export function createRateLimiter(options: { limit: number; windowMs: number }): IRateLimiter {
  const attempts = new Map<string, ReadonlyArray<number>>();

  return {
    isAllowed(key: string, now: number = Date.now()): boolean {
      const recent = (attempts.get(key) ?? []).filter((time) => now - time < options.windowMs);
      if (recent.length >= options.limit) {
        attempts.set(key, recent);
        return false;
      }
      attempts.set(key, [...recent, now]);
      return true;
    },
  };
}

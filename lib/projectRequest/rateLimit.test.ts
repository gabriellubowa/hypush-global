import { test } from "node:test";
import assert from "node:assert/strict";
import { createRateLimiter } from "./rateLimit";

test("allows up to the limit within the window, then blocks", () => {
  const limiter = createRateLimiter({ limit: 2, windowMs: 1000 });
  assert.equal(limiter.isAllowed("ip-a", 0), true);
  assert.equal(limiter.isAllowed("ip-a", 10), true);
  assert.equal(limiter.isAllowed("ip-a", 20), false);
});

test("tracks each key separately", () => {
  const limiter = createRateLimiter({ limit: 1, windowMs: 1000 });
  assert.equal(limiter.isAllowed("ip-a", 0), true);
  assert.equal(limiter.isAllowed("ip-b", 0), true);
  assert.equal(limiter.isAllowed("ip-a", 1), false);
});

test("allows again once old attempts leave the window", () => {
  const limiter = createRateLimiter({ limit: 1, windowMs: 1000 });
  assert.equal(limiter.isAllowed("ip-a", 0), true);
  assert.equal(limiter.isAllowed("ip-a", 999), false);
  assert.equal(limiter.isAllowed("ip-a", 1001), true);
});

// ADR 0023 — pure helpers for the click route and partner login. Uses node:crypto, so middleware
// must never import this file.

import { createHash, createHmac, timingSafeEqual } from "node:crypto";

const LANDING_PATH_MAX_LENGTH = 512;

const BOT_USER_AGENT = /bot|crawler|spider|preview|facebookexternalhit|whatsapp/i;

// visitor_hash = HMAC(HMAC(secret, UTC date), IP + user agent). The daily salt makes the
// (affiliate_id, visitor_hash) unique index the per-UTC-day dedupe, and means a hash cannot be
// linked to the same visitor on another day. The raw IP goes no further than this call.
export function computeVisitorHash(input: {
  secret: string;
  ip: string;
  userAgent: string;
  now?: Date;
}): string {
  const utcDate = (input.now ?? new Date()).toISOString().slice(0, 10);
  const dailySalt = createHmac("sha256", input.secret).update(utcDate).digest();
  return createHmac("sha256", dailySalt).update(`${input.ip}\n${input.userAgent}`).digest("hex");
}

export function isBotUserAgent(userAgent: string): boolean {
  return BOT_USER_AGENT.test(userAgent);
}

// The path alone: the query string is dropped because it can carry anything.
export function sanitizeLandingPath(path: string): string | null {
  const bare = path.split(/[?#]/, 1)[0].slice(0, LANDING_PATH_MAX_LENGTH);
  return bare.length > 0 ? bare : null;
}

// Constant-time, and comparing digests keeps both sides the same length. An unset secret never
// matches.
export function secretsMatch(provided: string | null, expected: string): boolean {
  if (provided === null || expected.length === 0) return false;
  const digest = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(digest(provided), digest(expected));
}

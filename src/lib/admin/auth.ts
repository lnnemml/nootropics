// Admin auth (ADR 0024, ported from isrib-next ADR 0011): one password, a signed jose cookie.
// server-only: verifyPassword uses node:crypto. src/proxy.ts re-inlines its own jose verify.
import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { createHash, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "nora_admin_session";
export const ADMIN_SESSION_SECONDS = 60 * 60 * 12;

// Trimmed on every read: a trailing newline in an env value silently broke NORA's old login.
function secretKey(): Uint8Array | null {
  const value = (process.env.ADMIN_AUTH_SECRET ?? "").trim();
  return value ? new TextEncoder().encode(value) : null;
}

export async function createSessionToken(): Promise<string> {
  const key = secretKey();
  if (!key) throw new Error("ADMIN_AUTH_SECRET is not set");
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${ADMIN_SESSION_SECONDS}s`)
    .sign(key);
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  const key = secretKey();
  if (!token || !key) return false;
  try {
    const { payload } = await jwtVerify(token, key);
    return payload.role === "admin";
  } catch {
    return false;
  }
}

// Server Actions are reachable by POST without their page rendering, so every admin action and
// page re-checks this; the proxy is only the first gate.
export async function isAdminAuthed(): Promise<boolean> {
  return verifySessionToken((await cookies()).get(ADMIN_COOKIE)?.value);
}

// Constant-time compare. Digests keep both sides the same length, so a length mismatch neither
// throws nor leaks the password length.
export function verifyPassword(input: string): boolean {
  const expected = (process.env.ADMIN_PASSWORD ?? "").trim();
  if (!expected || !input) return false;
  const digest = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(digest(input), digest(expected));
}

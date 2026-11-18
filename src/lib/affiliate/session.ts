import "server-only";

// ADR 0023 — partner auth. Tokens and sessions are opaque random values and only their SHA-256
// hashes reach the database. Sessions live in the DB, so deactivating an affiliate cuts access at
// once.

import { createHash, randomBytes } from "node:crypto";
import { and, count, eq, gt, isNull, lt, sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import {
  affiliateLoginAttempts,
  affiliateLoginTokens,
  affiliateSessions,
  affiliates,
} from "@/lib/db/schema";
import { affiliatesEnabled } from "./flag";

export const PARTNER_COOKIE = "nora_partner_session";

export const EMAILED_LINK_TTL_MINUTES = 30;
export const ADMIN_LINK_TTL_MINUTES = 1440;

const TOKEN_BYTES = 32;
const MS_PER_MINUTE = 60_000;
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

const LOGIN_ATTEMPT_LIMIT = 5;
const LOGIN_ATTEMPT_WINDOW_MINUTES = 15;
const LOGIN_ATTEMPT_RETENTION_MINUTES = 60 * 24;
const LINK_LIMIT_PER_AFFILIATE = 3;
const LINK_LIMIT_WINDOW_MINUTES = 60;

function minutesFromNow(minutes: number): Date {
  return new Date(Date.now() + minutes * MS_PER_MINUTE);
}

export interface CurrentAffiliate {
  id: string;
  name: string;
  handle: string | null;
  code: string;
  commissionRateBps: number;
  customerDiscountBps: number;
}

// ── Tokens ──────────────────────────────────────────────────────────────────

export function hashToken(rawToken: string): string {
  return createHash("sha256").update(rawToken).digest("hex");
}

function generateToken(): string {
  return randomBytes(TOKEN_BYTES).toString("base64url");
}

export async function createLoginToken(affiliateId: string, ttlMinutes: number): Promise<string> {
  const rawToken = generateToken();
  await db.insert(affiliateLoginTokens).values({
    id: nanoid(),
    affiliateId,
    tokenHash: hashToken(rawToken),
    expiresAt: minutesFromNow(ttlMinutes),
  });
  return rawToken;
}

export function buildPartnerLoginUrl(rawToken: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  return `${base}/partner/auth/${rawToken}`;
}

// One conditional UPDATE is the whole single-use guarantee: of any number of concurrent POSTs,
// exactly one gets a row back.
export async function consumeLoginToken(rawToken: string): Promise<string | null> {
  const now = new Date();
  const [consumed] = await db
    .update(affiliateLoginTokens)
    .set({ usedAt: now })
    .where(
      and(
        eq(affiliateLoginTokens.tokenHash, hashToken(rawToken)),
        isNull(affiliateLoginTokens.usedAt),
        gt(affiliateLoginTokens.expiresAt, now),
      ),
    )
    .returning({ affiliateId: affiliateLoginTokens.affiliateId });
  if (!consumed) return null;

  const [affiliate] = await db
    .select({ id: affiliates.id })
    .from(affiliates)
    .where(and(eq(affiliates.id, consumed.affiliateId), eq(affiliates.isActive, true)))
    .limit(1);
  return affiliate?.id ?? null;
}

// Unused tokens only: a used one can sign nobody in, and it still counts toward the hourly limit.
export function deleteAffiliateLoginTokensQuery(affiliateId: string) {
  return db
    .delete(affiliateLoginTokens)
    .where(
      and(eq(affiliateLoginTokens.affiliateId, affiliateId), isNull(affiliateLoginTokens.usedAt)),
    );
}

// ── Sessions ────────────────────────────────────────────────────────────────

export async function createPartnerSession(affiliateId: string): Promise<string> {
  const rawToken = generateToken();
  await db.insert(affiliateSessions).values({
    id: nanoid(),
    affiliateId,
    tokenHash: hashToken(rawToken),
    expiresAt: new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000),
  });
  return rawToken;
}

export function partnerCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  } as const;
}

// Null with no cookie, an unknown or expired session, an inactive affiliate, or the flag off.
export async function getCurrentAffiliate(): Promise<CurrentAffiliate | null> {
  if (!affiliatesEnabled()) return null;

  const rawToken = (await cookies()).get(PARTNER_COOKIE)?.value;
  if (!rawToken) return null;

  const [affiliate] = await db
    .select({
      id: affiliates.id,
      name: affiliates.name,
      handle: affiliates.handle,
      code: affiliates.code,
      commissionRateBps: affiliates.commissionRateBps,
      customerDiscountBps: affiliates.customerDiscountBps,
    })
    .from(affiliateSessions)
    .innerJoin(affiliates, eq(affiliateSessions.affiliateId, affiliates.id))
    .where(
      and(
        eq(affiliateSessions.tokenHash, hashToken(rawToken)),
        gt(affiliateSessions.expiresAt, new Date()),
        eq(affiliates.isActive, true),
      ),
    )
    .limit(1);
  return affiliate ?? null;
}

export async function requireAffiliate(): Promise<CurrentAffiliate> {
  const affiliate = await getCurrentAffiliate();
  if (!affiliate) redirect("/partner/login");
  return affiliate;
}

// For a Server Action or Route Handler: cookies can only be deleted there.
export async function destroyPartnerSession(): Promise<void> {
  const cookieStore = await cookies();
  const rawToken = cookieStore.get(PARTNER_COOKIE)?.value;
  if (rawToken) {
    await db.delete(affiliateSessions).where(eq(affiliateSessions.tokenHash, hashToken(rawToken)));
  }
  cookieStore.delete(PARTNER_COOKIE);
}

export function deleteAffiliateSessionsQuery(affiliateId: string) {
  return db.delete(affiliateSessions).where(eq(affiliateSessions.affiliateId, affiliateId));
}

// ── Login requests ──────────────────────────────────────────────────────────

// Records the attempt first and counts after, so concurrent requests cannot all read a count
// under the limit. False once this visitor hash is over it.
export async function recordLoginAttempt(visitorHash: string): Promise<boolean> {
  await db.insert(affiliateLoginAttempts).values({ id: nanoid(), visitorHash });

  const [attempts] = await db
    .select({ total: count() })
    .from(affiliateLoginAttempts)
    .where(
      and(
        eq(affiliateLoginAttempts.visitorHash, visitorHash),
        gt(affiliateLoginAttempts.createdAt, minutesFromNow(-LOGIN_ATTEMPT_WINDOW_MINUTES)),
      ),
    );
  return attempts.total <= LOGIN_ATTEMPT_LIMIT;
}

export async function deleteOldLoginAttempts(): Promise<void> {
  await db
    .delete(affiliateLoginAttempts)
    .where(lt(affiliateLoginAttempts.createdAt, minutesFromNow(-LOGIN_ATTEMPT_RETENTION_MINUTES)));
}

// A fresh 30 minute token for the active affiliate on this (normalised) email, or null if there is
// none or it already has its links for the hour. Admin-generated links count toward the same limit.
export async function issueEmailedLoginToken(
  email: string,
): Promise<{ rawToken: string; notifyEmail: string } | null> {
  const [affiliate] = await db
    .select({ id: affiliates.id, notifyEmail: affiliates.notifyEmail })
    .from(affiliates)
    .where(and(eq(sql`lower(${affiliates.notifyEmail})`, email), eq(affiliates.isActive, true)))
    .limit(1);
  if (!affiliate?.notifyEmail) return null;

  const [links] = await db
    .select({ total: count() })
    .from(affiliateLoginTokens)
    .where(
      and(
        eq(affiliateLoginTokens.affiliateId, affiliate.id),
        gt(affiliateLoginTokens.createdAt, minutesFromNow(-LINK_LIMIT_WINDOW_MINUTES)),
      ),
    );
  if (links.total >= LINK_LIMIT_PER_AFFILIATE) return null;

  return {
    rawToken: await createLoginToken(affiliate.id, EMAILED_LINK_TTL_MINUTES),
    notifyEmail: affiliate.notifyEmail,
  };
}

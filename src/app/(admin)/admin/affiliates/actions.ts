"use server";

// Affiliate admin Server Actions (ADR 0023). Every action re-verifies the admin session as its
// first line and answers with { ok } | { error }; nothing throws to the user. Errors are logged by
// tag only, because a driver error quotes query parameters.
//
// Affiliates are never deleted, only deactivated, and payouts are immutable: there is deliberately
// no action for either.
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { isAdminAuthed } from "@/lib/auth";
import {
  findAffiliateConflict,
  getAffiliateChannels,
  getAffiliateIsActive,
  payoutTxHashExists,
  type AffiliateConflict,
} from "@/lib/affiliate/admin-queries";
import {
  buildAffiliateTestNotification,
  parseAffiliateInput,
  parsePayoutInput,
  safeErrorTag,
  type AffiliateInput,
  type PayoutInput,
} from "@/lib/affiliate/core";
import {
  ADMIN_LINK_TTL_MINUTES,
  buildPartnerLoginUrl,
  createLoginToken,
  deleteAffiliateLoginTokensQuery,
  deleteAffiliateSessionsQuery,
} from "@/lib/affiliate/session";
import { db } from "@/lib/db";
import { affiliatePayouts, affiliates } from "@/lib/db/schema";
import { sendPartnerEmail } from "@/lib/email/send";
import { sendTelegramMessage } from "@/lib/telegram";

export type ActionResult = { ok: true } | { error: string };

export type LoginLinkResult = { ok: true; url: string } | { error: string };

// telegramError is set when Telegram was tried and the message went out by email instead.
export type TestNotificationResult =
  | { ok: true; channel: "telegram" | "email"; telegramError: string | null }
  | { error: string };

const LIST_PATH = "/admin/affiliates";

const UNAUTHORIZED = { error: "Unauthorized" };
const NOT_FOUND = { error: "Affiliate not found." };
const NOT_SAVED = { error: "That failed and nothing was saved. Try again." };
const DUPLICATE_TX_HASH = { error: "That tx hash is already recorded." };

const CONFLICT_MESSAGE: Record<AffiliateConflict, string> = {
  affiliate_code: "That code belongs to another affiliate.",
  notify_email: "That notify email belongs to another affiliate.",
};

const PG_UNIQUE_VIOLATION = "23505";

// Drizzle wraps the driver error, so the Postgres code sits on its cause.
function isUniqueViolation(err: unknown): boolean {
  if (typeof err !== "object" || err === null) return false;
  const { code, cause } = err as { code?: unknown; cause?: unknown };
  return code === PG_UNIQUE_VIOLATION || (cause !== err && isUniqueViolation(cause));
}

// Case does not count: sign-in matches the address case-insensitively.
function notifyEmailChanged(before: string | null, after: string | null): boolean {
  return before?.toLowerCase() !== after?.toLowerCase();
}

function refreshAffiliate(affiliateId: string): void {
  revalidatePath(LIST_PATH);
  revalidatePath(`${LIST_PATH}/${affiliateId}`);
}

export async function createAffiliate(input: AffiliateInput): Promise<ActionResult> {
  if (!(await isAdminAuthed())) return UNAUTHORIZED;

  const parsed = parseAffiliateInput(input);
  if ("error" in parsed) return parsed;

  try {
    const conflict = await findAffiliateConflict(parsed.values);
    if (conflict) return { error: CONFLICT_MESSAGE[conflict] };

    // The check above reads first, so two saves at once can both pass it. The unique index decides.
    const [created] = await db
      .insert(affiliates)
      .values({ id: nanoid(), ...parsed.values })
      .onConflictDoNothing({ target: affiliates.code })
      .returning({ id: affiliates.id });
    if (!created) return { error: CONFLICT_MESSAGE.affiliate_code };
  } catch (err) {
    console.error("createAffiliate failed:", safeErrorTag(err));
    return NOT_SAVED;
  }

  revalidatePath(LIST_PATH);
  return { ok: true };
}

export async function updateAffiliate(
  affiliateId: string,
  input: AffiliateInput,
): Promise<ActionResult> {
  if (!(await isAdminAuthed())) return UNAUTHORIZED;

  const parsed = parseAffiliateInput(input);
  if ("error" in parsed) return parsed;

  try {
    const conflict = await findAffiliateConflict(parsed.values, affiliateId);
    if (conflict) return { error: CONFLICT_MESSAGE[conflict] };

    const [current] = await db
      .select({ notifyEmail: affiliates.notifyEmail })
      .from(affiliates)
      .where(eq(affiliates.id, affiliateId))
      .limit(1);
    if (!current) return NOT_FOUND;

    const update = db.update(affiliates).set(parsed.values).where(eq(affiliates.id, affiliateId));
    // neon-http has no interactive transactions; a batch still applies all three or none, so a
    // changed inbox can't keep the old one's sessions and links alive.
    if (notifyEmailChanged(current.notifyEmail, parsed.values.notifyEmail)) {
      await db.batch([
        update,
        deleteAffiliateSessionsQuery(affiliateId),
        deleteAffiliateLoginTokensQuery(affiliateId),
      ]);
    } else {
      await update;
    }
  } catch (err) {
    if (isUniqueViolation(err)) return { error: CONFLICT_MESSAGE.affiliate_code };
    console.error("updateAffiliate failed:", safeErrorTag(err));
    return NOT_SAVED;
  }

  refreshAffiliate(affiliateId);
  return { ok: true };
}

export async function setAffiliateActive(
  affiliateId: string,
  active: boolean,
): Promise<ActionResult> {
  if (!(await isAdminAuthed())) return UNAUTHORIZED;
  if (typeof active !== "boolean") return { error: "Invalid status." };

  try {
    const [updated] = await db
      .update(affiliates)
      .set({ isActive: active })
      .where(eq(affiliates.id, affiliateId))
      .returning({ id: affiliates.id });
    if (!updated) return NOT_FOUND;

    if (!active) {
      await db.batch([
        deleteAffiliateSessionsQuery(affiliateId),
        deleteAffiliateLoginTokensQuery(affiliateId),
      ]);
    }
  } catch (err) {
    console.error("setAffiliateActive failed:", safeErrorTag(err));
    return NOT_SAVED;
  }

  refreshAffiliate(affiliateId);
  return { ok: true };
}

// The raw token exists only in the returned URL; only its hash is stored.
export async function generateLoginLink(affiliateId: string): Promise<LoginLinkResult> {
  if (!(await isAdminAuthed())) return UNAUTHORIZED;

  try {
    const isActive = await getAffiliateIsActive(affiliateId);
    if (isActive === null) return NOT_FOUND;
    if (!isActive) return { error: "This affiliate is inactive, so a link would not sign in." };

    const rawToken = await createLoginToken(affiliateId, ADMIN_LINK_TTL_MINUTES);
    return { ok: true, url: buildPartnerLoginUrl(rawToken) };
  } catch (err) {
    console.error("generateLoginLink failed:", safeErrorTag(err));
    return { error: "Could not generate a link. Try again." };
  }
}

// Same channel order as a real commission (earn.ts), but reports what happened.
export async function sendTestNotification(affiliateId: string): Promise<TestNotificationResult> {
  if (!(await isAdminAuthed())) return UNAUTHORIZED;

  try {
    const channels = await getAffiliateChannels(affiliateId);
    if (!channels) return NOT_FOUND;
    if (!channels.notifyTelegramChatId && !channels.notifyEmail) {
      return { error: "Set a Telegram chat id or a notify email first." };
    }

    const message = buildAffiliateTestNotification(new Date());

    let telegramError: string | null = null;
    if (channels.notifyTelegramChatId) {
      try {
        await sendTelegramMessage(channels.notifyTelegramChatId, message.text);
        return { ok: true, channel: "telegram", telegramError };
      } catch (err) {
        telegramError = safeErrorTag(err);
      }
    }

    if (!channels.notifyEmail) return { error: `Telegram failed: ${telegramError}` };

    try {
      await sendPartnerEmail(channels.notifyEmail, message.subject, message.html);
      return { ok: true, channel: "email", telegramError };
    } catch (err) {
      const prefix = telegramError ? `Telegram failed: ${telegramError}. ` : "";
      return { error: `${prefix}Email failed: ${safeErrorTag(err)}` };
    }
  } catch (err) {
    console.error("sendTestNotification failed:", safeErrorTag(err));
    return { error: `Could not send the test: ${safeErrorTag(err)}` };
  }
}

export async function recordPayout(
  affiliateId: string,
  input: PayoutInput,
): Promise<ActionResult> {
  if (!(await isAdminAuthed())) return UNAUTHORIZED;

  const parsed = parsePayoutInput(input, new Date());
  if ("error" in parsed) return parsed;

  try {
    if ((await getAffiliateIsActive(affiliateId)) === null) return NOT_FOUND;
    if (await payoutTxHashExists(parsed.values.txHash)) return DUPLICATE_TX_HASH;

    const [recorded] = await db
      .insert(affiliatePayouts)
      .values({ id: nanoid(), affiliateId, ...parsed.values })
      .onConflictDoNothing({ target: affiliatePayouts.txHash })
      .returning({ id: affiliatePayouts.id });
    if (!recorded) return DUPLICATE_TX_HASH;
  } catch (err) {
    console.error("recordPayout failed:", safeErrorTag(err));
    return NOT_SAVED;
  }

  refreshAffiliate(affiliateId);
  return { ok: true };
}

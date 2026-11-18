"use server";

// Campaign actions (ADR 0024, ported from isrib-next). Each re-verifies the admin session first.
// Before testing or sending, the broadcast is re-fetched and must be bound to NORA's segment: the
// Resend account is shared with isrib.shop, and the listing filter alone is only a UI guard.
// Content is authored in Resend, never here.
import { revalidatePath } from "next/cache";
import { isAdminAuthed } from "@/lib/admin/auth";
import { getResend } from "@/lib/admin/marketing";
import { safeErrorTag } from "@/lib/affiliate/core";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import {
  addMarketingContact,
  firstNameFromOrderName,
  noraSegmentId,
} from "@/lib/marketing/contacts";

export type CampaignResult = { ok: true; message: string } | { error: string };

const UNAUTHORIZED = { error: "Unauthorized" };
const FROM = "NORA Alliance <orders@noraalliance.com>";

// A one-off test has no per-contact merge context, so placeholders get neutral values.
function neutralizeMergeTags(html: string): string {
  return html
    .replace(/\{\{\{?\s*FIRST_NAME\s*(\|\s*[^}]*)?\}\}\}?/g, "there")
    .replace(/\{\{\{?\s*RESEND_UNSUBSCRIBE_URL\s*\}\}\}?/g, "#");
}

async function loadNoraBroadcast(rawId: string) {
  const id = rawId.trim();
  if (!id) return { error: "Select a broadcast first." } as const;

  const segmentId = noraSegmentId();
  if (!segmentId) return { error: "RESEND_SEGMENT_ID is not set." } as const;

  const got = await getResend().broadcasts.get(id);
  if (got.error) return { error: got.error.message } as const;
  if (!got.data) return { error: "Broadcast not found." } as const;
  if ((got.data.segment_id ?? got.data.audience_id) !== segmentId) {
    return { error: "That broadcast is not on NORA's segment, so it can't be sent from here." } as const;
  }
  return { broadcast: got.data } as const;
}

export async function sendTestToAdmin(broadcastId: string): Promise<CampaignResult> {
  if (!(await isAdminAuthed())) return UNAUTHORIZED;

  const to = (process.env.ADMIN_EMAIL ?? "").split(",").map((e) => e.trim()).find(Boolean);
  if (!to) return { error: "ADMIN_EMAIL is not configured." };

  try {
    const loaded = await loadNoraBroadcast(broadcastId);
    if ("error" in loaded) return { error: loaded.error ?? "Could not load the broadcast." };
    const b = loaded.broadcast;
    if (!b.html) return { error: "This broadcast has no HTML content yet." };

    const sent = await getResend().emails.send({
      from: FROM,
      to,
      subject: `[TEST] ${b.subject ?? b.name ?? "Broadcast preview"}`,
      html: neutralizeMergeTags(b.html),
    });
    if (sent.error) return { error: sent.error.message };
    return { ok: true, message: `Test sent to ${to}.` };
  } catch (err) {
    return { error: `Test failed: ${safeErrorTag(err)}` };
  }
}

export async function sendBroadcast(broadcastId: string): Promise<CampaignResult> {
  if (!(await isAdminAuthed())) return UNAUTHORIZED;

  try {
    const loaded = await loadNoraBroadcast(broadcastId);
    if ("error" in loaded) return { error: loaded.error ?? "Could not load the broadcast." };

    const res = await getResend().broadcasts.send(loaded.broadcast.id);
    if (res.error) return { error: res.error.message };
    revalidatePath("/admin/campaigns");
    return { ok: true, message: "Broadcast queued to NORA's segment." };
  } catch (err) {
    return { error: `Send failed: ${safeErrorTag(err)}` };
  }
}

// Backfills the list from every order so far. Idempotent: existing contacts are left alone.
export async function syncContactsFromOrders(): Promise<CampaignResult> {
  if (!(await isAdminAuthed())) return UNAUTHORIZED;
  if (!noraSegmentId()) return { error: "Set RESEND_SEGMENT_ID first, so contacts land in NORA's segment." };

  try {
    const rows = await db.select({ email: orders.email, name: orders.name }).from(orders);
    const counts = { added: 0, exists: 0, skipped: 0 };
    const seen = new Set<string>();
    for (const row of rows) {
      const email = row.email.trim().toLowerCase();
      if (seen.has(email)) continue;
      seen.add(email);
      counts[await addMarketingContact(email, firstNameFromOrderName(row.name), "order-backfill")]++;
    }
    revalidatePath("/admin/campaigns");
    return {
      ok: true,
      message: `${counts.added} added, ${counts.exists} already on the list, ${counts.skipped} skipped (test addresses).`,
    };
  } catch (err) {
    return { error: `Sync failed: ${safeErrorTag(err)}` };
  }
}

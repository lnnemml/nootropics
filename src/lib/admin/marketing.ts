import "server-only";

// Campaigns data layer (ADR 0024, ported from isrib-next). Reads the marketing list (PII) and the
// live Resend state; nothing here sends or mutates.
//
// The Resend account is shared with isrib.shop, so every broadcast read here is filtered to NORA's
// own segment. A broadcast on any other segment is never listed, tested or sent from NORA's admin.

import { count, isNotNull, isNull } from "drizzle-orm";
import { Resend } from "resend";
import { db } from "@/lib/db";
import { marketingContacts } from "@/lib/db/schema";
import { noraSegmentId } from "@/lib/marketing/contacts";

let resend: Resend | undefined;

export function getResend(): Resend {
  if (!resend) resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
}

export interface ListHealth {
  total: number;
  active: number;
  optedOut: number;
}

export async function marketingListHealth(): Promise<ListHealth> {
  const [[total], [active], [optedOut]] = await Promise.all([
    db.select({ n: count() }).from(marketingContacts),
    db.select({ n: count() }).from(marketingContacts).where(isNull(marketingContacts.unsubscribedAt)),
    db.select({ n: count() }).from(marketingContacts).where(isNotNull(marketingContacts.unsubscribedAt)),
  ]);
  return { total: total?.n ?? 0, active: active?.n ?? 0, optedOut: optedOut?.n ?? 0 };
}

export interface SegmentInfo {
  count: number;
  approximate: boolean; // more pages exist beyond the cap, so count is a floor
  error: string | null;
}

const PAGE_SIZE = 100;
const MAX_PAGES = 20;

export async function resendSegmentInfo(): Promise<SegmentInfo> {
  const segmentId = noraSegmentId();
  if (!segmentId) return { count: 0, approximate: false, error: "RESEND_SEGMENT_ID is not set." };

  try {
    let total = 0;
    let after: string | undefined;
    for (let page = 0; page < MAX_PAGES; page++) {
      const res = await getResend().contacts.list({
        segmentId,
        limit: PAGE_SIZE,
        ...(after ? { after } : {}),
      });
      if (res.error) return { count: total, approximate: false, error: res.error.message };
      const data = res.data?.data ?? [];
      total += data.length;
      after = data[data.length - 1]?.id;
      if (!res.data?.has_more || !after) return { count: total, approximate: false, error: null };
    }
    return { count: total, approximate: true, error: null };
  } catch (e) {
    return { count: 0, approximate: false, error: e instanceof Error ? e.message : "Unknown error" };
  }
}

export interface BroadcastRow {
  id: string;
  name: string;
  status: string;
  createdAt: string | null;
  scheduledAt: string | null;
  sentAt: string | null;
}

export interface BroadcastsResult {
  broadcasts: BroadcastRow[];
  hiddenOtherSegments: number;
  error: string | null;
}

export async function listNoraBroadcasts(): Promise<BroadcastsResult> {
  const segmentId = noraSegmentId();
  if (!segmentId) {
    return { broadcasts: [], hiddenOtherSegments: 0, error: "RESEND_SEGMENT_ID is not set." };
  }

  try {
    const res = await getResend().broadcasts.list();
    if (res.error) return { broadcasts: [], hiddenOtherSegments: 0, error: res.error.message };
    const all = res.data?.data ?? [];
    const ours = all.filter((b) => (b.segment_id ?? b.audience_id) === segmentId);
    return {
      broadcasts: ours.map((b) => ({
        id: b.id,
        name: b.name || "(untitled)",
        status: b.status,
        createdAt: b.created_at ?? null,
        scheduledAt: b.scheduled_at ?? null,
        sentAt: b.sent_at ?? null,
      })),
      hiddenOtherSegments: all.length - ours.length,
      error: null,
    };
  } catch (e) {
    return {
      broadcasts: [],
      hiddenOtherSegments: 0,
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
}

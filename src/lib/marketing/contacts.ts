import "server-only";

// ADR 0024 — every order joins NORA's marketing list (ported from isrib-next ADR 0023).
//
// Rules:
//  - Insert-only: an existing row is never touched, so an opt-out is never reset.
//  - Resend only on a new row, into NORA's own segment (RESEND_SEGMENT_ID). There is no default
//    segment: the Resend account is shared with isrib.shop, and a fallback could put NORA
//    customers on isrib's list.
//  - QA addresses (*.test) are skipped, because local runs write to production.

import { nanoid } from "nanoid";
import { Resend } from "resend";
import { safeErrorTag } from "@/lib/affiliate/core";
import { db } from "@/lib/db";
import { marketingContacts } from "@/lib/db/schema";

export type AddContactResult = "added" | "exists" | "skipped";

export function noraSegmentId(): string | null {
  return process.env.RESEND_SEGMENT_ID?.trim() || null;
}

export function firstNameFromOrderName(name: string | null | undefined): string | null {
  return (name ?? "").trim().split(/\s+/)[0] || null;
}

function isSkippable(email: string): boolean {
  if (!email.includes("@")) return true;
  return email.slice(email.lastIndexOf("@") + 1).endsWith(".test");
}

// DB errors propagate; a Resend failure only logs.
export async function addMarketingContact(
  rawEmail: string,
  firstName: string | null,
  source: string,
): Promise<AddContactResult> {
  const email = rawEmail.trim().toLowerCase();
  if (isSkippable(email)) return "skipped";

  const inserted = await db
    .insert(marketingContacts)
    .values({ id: nanoid(), email, firstName: firstName?.trim() || null, source })
    .onConflictDoNothing({ target: marketingContacts.email })
    .returning({ id: marketingContacts.id });
  if (inserted.length === 0) return "exists";

  const apiKey = process.env.RESEND_API_KEY;
  const segmentId = noraSegmentId();
  if (apiKey && segmentId) {
    try {
      const { error } = await new Resend(apiKey).contacts.create({
        email,
        unsubscribed: false,
        ...(firstName?.trim() ? { firstName: firstName.trim() } : {}),
        segments: [{ id: segmentId }],
      });
      // Name and status only: Resend messages can echo the email.
      if (error) console.error("Resend contact create failed (non-fatal):", error.name);
    } catch (err) {
      console.error("Resend contact create threw (non-fatal):", safeErrorTag(err));
    }
  }

  return "added";
}

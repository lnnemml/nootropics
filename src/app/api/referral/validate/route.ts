import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { referralCodes, users } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";

// GET /api/referral/validate?code=NORA-XXXXXX&email=user@example.com
// No auth required — supports guest checkout.
export async function GET(request: NextRequest) {
  const code  = request.nextUrl.searchParams.get("code")?.trim().toUpperCase();
  const email = request.nextUrl.searchParams.get("email")?.trim().toLowerCase();

  if (!code) {
    return NextResponse.json({ valid: false });
  }

  const codeRecord = await db.query.referralCodes.findFirst({
    where: and(eq(referralCodes.code, code), eq(referralCodes.active, true)),
  });

  if (!codeRecord) {
    return NextResponse.json({ valid: false });
  }

  // Self-referral check via email
  if (email) {
    const owner = await db.query.users.findFirst({
      where: eq(users.id, codeRecord.userId),
      columns: { email: true },
    });
    if (owner?.email === email) {
      return NextResponse.json({ valid: false, reason: "self" });
    }
  }

  return NextResponse.json({ valid: true });
}

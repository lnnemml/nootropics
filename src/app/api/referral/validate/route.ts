import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { referralCodes, users } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { CUSTOMER_REFERRAL_PREFIX, resolveAttribution, safeErrorTag } from "@/lib/affiliate/core";
import { getAffiliatesByCodes } from "@/lib/affiliate/lookup";

// GET /api/referral/validate?code=CODE&email=user@example.com
// No auth required — supports guest checkout. Customer NORA- codes and affiliate codes (ADR 0023)
// share this route; the checkout preview only. submitOrder re-checks everything.
export async function GET(request: NextRequest) {
  const code  = request.nextUrl.searchParams.get("code")?.trim().toUpperCase();
  const email = request.nextUrl.searchParams.get("email")?.trim().toLowerCase() ?? "";

  if (!code) {
    return NextResponse.json({ valid: false });
  }

  if (!code.startsWith(CUSTOMER_REFERRAL_PREFIX)) {
    try {
      const attribution = resolveAttribution({
        typedCode: code,
        cookieCode: null,
        buyerEmail: email,
        affiliates: await getAffiliatesByCodes([code]),
      });
      if (attribution) {
        return NextResponse.json({
          valid: true,
          kind: "affiliate",
          discountPct: attribution.affiliate.customerDiscountBps / 100,
        });
      }
    } catch (err) {
      console.error("Affiliate preview lookup failed (non-fatal):", safeErrorTag(err));
    }
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

  return NextResponse.json({ valid: true, kind: "referral", discountPct: 10 });
}

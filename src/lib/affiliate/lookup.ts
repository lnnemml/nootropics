import "server-only";

// ADR 0023 — affiliate reads for attribution and the checkout preview. Named columns only.

import { inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import { affiliates } from "@/lib/db/schema";
import {
  isValidAffiliateCode,
  normalizeAffiliateCode,
  resolveAttribution,
  safeErrorTag,
  type Attribution,
  type AttributionAffiliate,
} from "./core";
import { affiliatesEnabled } from "./flag";

// Inactive rows come back too: resolveAttribution is what ignores them. Empty when the flag is off
// or there is nothing to look up, and neither case touches the database.
export async function getAffiliatesByCodes(
  codes: readonly (string | null | undefined)[],
): Promise<AttributionAffiliate[]> {
  if (!affiliatesEnabled()) return [];

  const normalized = codes
    .map(normalizeAffiliateCode)
    .filter((code): code is string => code !== null && isValidAffiliateCode(code));
  if (normalized.length === 0) return [];

  return db
    .select({
      id: affiliates.id,
      code: affiliates.code,
      isActive: affiliates.isActive,
      notifyEmail: affiliates.notifyEmail,
      customerDiscountBps: affiliates.customerDiscountBps,
      commissionRateBps: affiliates.commissionRateBps,
    })
    .from(affiliates)
    .where(inArray(affiliates.code, [...new Set(normalized)]));
}

// A failed lookup costs the attribution, never the sale.
export async function lookupAttribution(input: {
  typedCode: string | null | undefined;
  cookieCode: string | null | undefined;
  buyerEmail: string;
}): Promise<Attribution | null> {
  if (!affiliatesEnabled()) return null;
  try {
    const rows = await getAffiliatesByCodes([input.typedCode, input.cookieCode]);
    return resolveAttribution({ ...input, affiliates: rows });
  } catch (err) {
    console.error("Affiliate attribution failed (non-fatal):", safeErrorTag(err));
    return null;
  }
}

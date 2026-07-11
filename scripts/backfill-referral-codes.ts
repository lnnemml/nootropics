// Usage: npx tsx --env-file=.env.local scripts/backfill-referral-codes.ts
// Generates referral codes for all existing users who don't have one yet.
// Run once after deploying Phase 5.2.

import { db } from "../src/lib/db";
import { users, referralCodes } from "../src/lib/db/schema";
import { generateReferralCode } from "../src/lib/referral";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";

async function backfill() {
  const allUsers = await db.select({ id: users.id }).from(users);
  const existingCodes = await db.select({ userId: referralCodes.userId }).from(referralCodes);
  const hasCode = new Set(existingCodes.map((r) => r.userId));

  const missing = allUsers.filter((u) => !hasCode.has(u.id));
  console.log(`Found ${missing.length} users without referral codes`);

  for (const user of missing) {
    let code = generateReferralCode();
    for (let attempt = 0; attempt < 5; attempt++) {
      const exists = await db.query.referralCodes.findFirst({
        where: eq(referralCodes.code, code),
      });
      if (!exists) break;
      code = generateReferralCode();
    }
    await db.insert(referralCodes).values({ id: nanoid(), userId: user.id, code });
    console.log(`  ${user.id} → ${code}`);
  }

  console.log("Done");
  process.exit(0);
}

backfill().catch(console.error);

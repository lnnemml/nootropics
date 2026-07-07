import type { Adapter } from "next-auth/adapters";
import { db } from "@/lib/db";
import { users, verificationTokens } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";

export function createCustomerAdapter(): Adapter {
  return {
    async createUser(data) {
      const id = nanoid();
      await db.insert(users).values({
        id,
        email: data.email,
        name: data.name ?? null,
        image: data.image ?? null,
        emailVerified: data.emailVerified ?? null,
      });
      const row = await db.query.users.findFirst({ where: eq(users.id, id) });
      if (!row) throw new Error("createUser: insert failed");
      return { ...row, emailVerified: row.emailVerified ?? null };
    },

    async getUser(id) {
      const row = await db.query.users.findFirst({ where: eq(users.id, id) });
      if (!row) return null;
      return { ...row, emailVerified: row.emailVerified ?? null };
    },

    async getUserByEmail(email) {
      const row = await db.query.users.findFirst({ where: eq(users.email, email) });
      if (!row) return null;
      return { ...row, emailVerified: row.emailVerified ?? null };
    },

    async updateUser(data) {
      await db.update(users)
        .set({
          ...(data.name !== undefined && { name: data.name }),
          ...(data.image !== undefined && { image: data.image }),
          ...(data.emailVerified !== undefined && { emailVerified: data.emailVerified }),
        })
        .where(eq(users.id, data.id));
      const row = await db.query.users.findFirst({ where: eq(users.id, data.id) });
      if (!row) throw new Error("updateUser: row not found");
      return { ...row, emailVerified: row.emailVerified ?? null };
    },

    async createVerificationToken(data) {
      await db.insert(verificationTokens).values({
        identifier: data.identifier,
        token: data.token,
        expires: data.expires,
      });
      return data;
    },

    async useVerificationToken({ identifier, token }) {
      const row = await db.query.verificationTokens.findFirst({
        where: and(
          eq(verificationTokens.identifier, identifier),
          eq(verificationTokens.token, token),
        ),
      });
      if (!row) return null;
      await db.delete(verificationTokens).where(
        and(
          eq(verificationTokens.identifier, identifier),
          eq(verificationTokens.token, token),
        ),
      );
      return row;
    },

    // OAuth not used — required stubs
    async getUserByAccount() { return null; },
    async linkAccount()      { return undefined; },
    async unlinkAccount()    { return undefined; },
  };
}

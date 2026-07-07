import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email:    { label: "Email",    type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          typeof credentials?.email    !== "string" ||
          typeof credentials?.password !== "string"
        ) return null;

        // Email match is case-insensitive — emails are case-insensitive in
        // practice, and a casing mismatch between ADMIN_EMAIL and the typed
        // value is an easy, silent login failure otherwise.
        const email = credentials.email.trim().toLowerCase();
        const adminEmails = (process.env.ADMIN_EMAIL ?? "")
          .split(",")
          .map(e => e.trim().toLowerCase())
          .filter(Boolean);

        if (!adminEmails.includes(email)) return null;

        // Trim the hash — a bcrypt hash never contains whitespace, but a
        // trailing newline/space pasted into the env var makes compare()
        // silently return false (verified: hash + "\n" → false).
        const hash = (process.env.ADMIN_PASSWORD_HASH ?? "").trim();
        const valid = await bcrypt.compare(credentials.password, hash);
        if (!valid) return null;

        return { id: "admin", email };
      },
    }),
  ],
});

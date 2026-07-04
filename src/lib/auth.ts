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

        const adminEmails = (process.env.ADMIN_EMAIL ?? "")
          .split(",")
          .map(e => e.trim());

        if (!adminEmails.includes(credentials.email)) return null;

        const valid = await bcrypt.compare(
          credentials.password,
          process.env.ADMIN_PASSWORD_HASH ?? ""
        );
        if (!valid) return null;

        return { id: "admin", email: credentials.email };
      },
    }),
  ],
});

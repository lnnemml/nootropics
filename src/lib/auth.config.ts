import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages:    { signIn: "/admin/login" },
  session:  { strategy: "jwt" },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // Admin routes only — redirect to /admin/login if no admin session.
      // Non-admin routes (including /account/*) return true so the custom
      // middleware handler can inspect them independently.
      if (nextUrl.pathname.startsWith("/admin")) {
        return !!auth?.user;
      }
      return true;
    },
  },
};

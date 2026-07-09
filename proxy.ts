import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/account")) {
    // Verify the customer session JWT from the custom cookie.
    const token = await getToken({
      req,
      secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? "",
      cookieName: "nora-customer-session",
    });

    if (!token) {
      const url = new URL("/auth/signin", req.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }

  // Admin routes: handled entirely by the authorized callback in authConfig.
});

export const config = {
  matcher: [
    // Admin routes — /admin/login excluded to prevent redirect loop
    "/admin",
    "/admin/((?!login$).*)",
    // Customer account routes — all sub-paths
    "/account",
    "/account/:path*",
  ],
};

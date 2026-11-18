import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { getToken } from "next-auth/jwt";
import { NextResponse, after, type NextRequest } from "next/server";
import { CUSTOMER_REFERRAL_PREFIX, normalizeAffiliateCode } from "@/lib/affiliate/core";
import { affiliatesEnabled } from "@/lib/affiliate/flag";

const { auth } = NextAuth(authConfig);

// ADR 0023 — ?ref capture and the /partner gate. Edge-safe: no db and no node:crypto here; clicks
// are handed to /api/affiliate/click, which owns that work.
const PARTNER_COOKIE = "nora_partner_session";
const REF_COOKIE = "nora_ref";
const REF_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;
// Affiliate codes and customer NORA- codes share the cookie, so last touch wins across both. This
// only keeps junk out of a Set-Cookie; checkout does the real checks.
const REF_CODE = /^[A-Z0-9_-]{2,32}$/;
const CLICK_TIMEOUT_MS = 3000;

function isPublicPartnerPath(pathname: string): boolean {
  return pathname === "/partner/login" || pathname.startsWith("/partner/auth/");
}

function isPrefetch(req: NextRequest): boolean {
  return (
    req.headers.get("purpose") === "prefetch" ||
    (req.headers.get("sec-purpose") ?? "").includes("prefetch")
  );
}

// Fire-and-forget: a lost click is cheaper than a slower page.
async function recordClick(req: NextRequest, code: string, secret: string): Promise<void> {
  try {
    await fetch(`${req.nextUrl.origin}/api/affiliate/click`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-affiliate-secret": secret },
      body: JSON.stringify({
        code,
        path: req.nextUrl.pathname,
        ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "",
        userAgent: req.headers.get("user-agent") ?? "",
      }),
      signal: AbortSignal.timeout(CLICK_TIMEOUT_MS),
    });
  } catch {}
}

// Every response passes through here, so the cookie lands on gate redirects too. Only top-level
// GETs count: a Server Function on a ?ref page POSTs to that same URL.
function withRefCapture(req: NextRequest, response: NextResponse): NextResponse {
  if (!affiliatesEnabled() || req.method !== "GET" || isPrefetch(req)) return response;

  try {
    const code = normalizeAffiliateCode(req.nextUrl.searchParams.get("ref"));
    if (code === null || !REF_CODE.test(code)) return response;

    response.cookies.set(REF_COOKIE, code, {
      maxAge: REF_COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      httpOnly: false, // checkout reads it
    });

    const secret = (process.env.AFFILIATE_HASH_SECRET ?? "").trim();
    if (secret && !code.startsWith(CUSTOMER_REFERRAL_PREFIX)) {
      after(() => recordClick(req, code, secret));
    }
  } catch (err) {
    console.error("Ref capture failed (non-fatal):", err instanceof Error ? err.name : typeof err);
  }
  return response;
}

export default auth(async (req) => {
  const { pathname } = req.nextUrl;
  const respond = (response: NextResponse) => withRefCapture(req, response);

  // ── Admin routes: check admin session via req.auth ──────────────────────
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!req.auth?.user) {
      return respond(NextResponse.redirect(new URL("/admin/login", req.url)));
    }
  }

  // ── Customer routes: check customer JWT from custom cookie ──────────────
  if (pathname.startsWith("/account")) {
    const token = await getToken({
      req,
      secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? "",
      cookieName: "nora-customer-session",
    });

    if (!token) {
      const url = new URL("/auth/signin", req.url);
      url.searchParams.set("callbackUrl", pathname);
      return respond(NextResponse.redirect(url));
    }
  }

  // ── Partner routes: cookie presence only; the server checks the DB session ──
  if (affiliatesEnabled() && (pathname === "/partner" || pathname.startsWith("/partner/"))) {
    if (!isPublicPartnerPath(pathname) && !req.cookies.get(PARTNER_COOKIE)?.value) {
      return respond(NextResponse.redirect(new URL("/partner/login", req.url)));
    }
  }

  return respond(NextResponse.next());
});

export const config = {
  matcher: [
    // Admin routes — /admin/login excluded to prevent redirect loop
    "/admin",
    "/admin/((?!login$).*)",
    // Customer account routes — all sub-paths
    "/account",
    "/account/:path*",
    "/partner",
    "/partner/:path*",
    // Page requests carrying ?ref. Not /api, not _next assets, not files, not prefetches.
    {
      source: "/((?!api(?:/|$)|_next/|.*\\.[^/]+$).*)",
      has: [{ type: "query", key: "ref" }],
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};

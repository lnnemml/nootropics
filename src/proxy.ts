// Request gate (ADR 0024). Next 16 renamed Middleware to Proxy, and the file must sit beside
// `app/` — here under src/. The old root middleware.ts compiled but never ran under `next dev`.
//
// Rules carried over from isrib-next's proxy:
//  1. Every check lives in the handler body, not in a framework callback.
//  2. No db and no node:crypto here: the admin JWT is verified with jose, re-inlined rather than
//     imported from src/lib/admin/auth.ts. Affiliate clicks go to /api/affiliate/click.
//  3. Every secret read from env is trimmed.
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { getToken } from "next-auth/jwt";
import { CUSTOMER_REFERRAL_PREFIX, normalizeAffiliateCode } from "@/lib/affiliate/core";
import { affiliatesEnabled } from "@/lib/affiliate/flag";

const ADMIN_COOKIE = "nora_admin_session";
const CUSTOMER_COOKIE = "nora-customer-session";
const PARTNER_COOKIE = "nora_partner_session";
const REF_COOKIE = "nora_ref";
const REF_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;
// Affiliate codes and customer NORA- codes share the cookie, so last touch wins across both. This
// only keeps junk out of a Set-Cookie; checkout does the real checks.
const REF_CODE = /^[A-Z0-9_-]{2,32}$/;
const CLICK_TIMEOUT_MS = 3000;

async function adminValid(token: string | undefined): Promise<boolean> {
  const secret = (process.env.ADMIN_AUTH_SECRET ?? "").trim();
  if (!token || !secret) return false;
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return payload.role === "admin";
  } catch {
    return false;
  }
}

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
function withRefCapture(
  req: NextRequest,
  event: NextFetchEvent,
  response: NextResponse,
): NextResponse {
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
      event.waitUntil(recordClick(req, code, secret));
    }
  } catch (err) {
    console.error("Ref capture failed (non-fatal):", err instanceof Error ? err.name : typeof err);
  }
  return response;
}

export async function proxy(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;
  const respond = (response: NextResponse) => withRefCapture(req, event, response);

  if (
    (pathname === "/admin" || pathname.startsWith("/admin/")) &&
    pathname !== "/admin/login" &&
    !(await adminValid(req.cookies.get(ADMIN_COOKIE)?.value))
  ) {
    return respond(NextResponse.redirect(new URL("/admin/login", req.url)));
  }

  if (pathname === "/account" || pathname.startsWith("/account/")) {
    const token = await getToken({
      req,
      secret: (process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? "").trim(),
      cookieName: CUSTOMER_COOKIE,
    });
    if (!token) {
      const url = new URL("/auth/signin", req.url);
      url.searchParams.set("callbackUrl", pathname);
      return respond(NextResponse.redirect(url));
    }
  }

  // Presence only; the server checks the DB session. With the flag off the pages 404 themselves.
  if (affiliatesEnabled() && (pathname === "/partner" || pathname.startsWith("/partner/"))) {
    if (!isPublicPartnerPath(pathname) && !req.cookies.get(PARTNER_COOKIE)?.value) {
      return respond(NextResponse.redirect(new URL("/partner/login", req.url)));
    }
  }

  return respond(NextResponse.next());
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
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

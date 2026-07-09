"use server";

import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { Resend } from "resend";
import { db } from "@/lib/db";
import { users, verificationTokens, orders } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { customerSignIn } from "@/lib/customer-auth";

const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Internal helpers ─────────────────────────────────────────────────────────

async function sendVerificationEmail(email: string): Promise<void> {
  await db.delete(verificationTokens)
    .where(eq(verificationTokens.identifier, `verify:${email}`));

  const token   = nanoid(48);
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours

  await db.insert(verificationTokens).values({
    identifier: `verify:${email}`,
    token,
    expires,
  });

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`;

  await resend.emails.send({
    from:    "NORA <auth@noraalliance.com>",
    to:      email,
    subject: "Verify your NORA account",
    html:    verificationEmailHtml(url),
  });
}

function verificationEmailHtml(url: string): string {
  return `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#FAFAF7;font-family:'Space Grotesk',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:48px 24px;">
      <table width="100%" style="max-width:480px;background:#FFFFFF;border:1px solid rgba(46,58,60,0.12);border-radius:2px;">
        <tr><td style="padding:40px 40px 32px;">
          <p style="margin:0 0 4px;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#1E9C78;">NORA ALLIANCE</p>
          <h1 style="margin:0 0 20px;font-size:22px;font-weight:600;color:#2E3A3C;letter-spacing:-0.02em;">Verify your email</h1>
          <p style="margin:0 0 28px;font-size:15px;color:#696C6D;line-height:1.5;">
            Click the button below to verify your email address and activate your account.
            This link expires in 24 hours.
          </p>
          <a href="${url}" style="display:inline-block;background:#2E3A3C;color:#FAFAF7;font-family:'Courier New',monospace;font-size:13px;text-decoration:none;padding:14px 28px;border-radius:2px;">
            Verify email &#8594;
          </a>
          <p style="margin:28px 0 0;font-size:13px;color:#696C6D;">
            If you didn&apos;t create a NORA account, you can safely ignore this email.
          </p>
        </td></tr>
        <tr><td style="padding:20px 40px;border-top:1px solid rgba(46,58,60,0.09);">
          <p style="margin:0;font-family:'Courier New',monospace;font-size:11px;color:#696C6D;">NORA Alliance &middot; noraalliance.com</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`.trim();
}

function passwordResetEmailHtml(url: string): string {
  return `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#FAFAF7;font-family:'Space Grotesk',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:48px 24px;">
      <table width="100%" style="max-width:480px;background:#FFFFFF;border:1px solid rgba(46,58,60,0.12);border-radius:2px;">
        <tr><td style="padding:40px 40px 32px;">
          <p style="margin:0 0 4px;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#1E9C78;">NORA ALLIANCE</p>
          <h1 style="margin:0 0 20px;font-size:22px;font-weight:600;color:#2E3A3C;letter-spacing:-0.02em;">Reset your password</h1>
          <p style="margin:0 0 28px;font-size:15px;color:#696C6D;line-height:1.5;">
            Click the button below to set a new password. This link expires in 1 hour
            and can only be used once.
          </p>
          <a href="${url}" style="display:inline-block;background:#2E3A3C;color:#FAFAF7;font-family:'Courier New',monospace;font-size:13px;text-decoration:none;padding:14px 28px;border-radius:2px;">
            Reset password &#8594;
          </a>
          <p style="margin:28px 0 0;font-size:13px;color:#696C6D;">
            If you didn&apos;t request this, you can safely ignore this email.
          </p>
        </td></tr>
        <tr><td style="padding:20px 40px;border-top:1px solid rgba(46,58,60,0.09);">
          <p style="margin:0;font-family:'Courier New',monospace;font-size:11px;color:#696C6D;">NORA Alliance &middot; noraalliance.com</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`.trim();
}

// ─── registerCustomer ──────────────────────────────────────────────────────────

export async function registerCustomer(formData: FormData) {
  const email    = (formData.get("email")    as string | null)?.trim().toLowerCase();
  const password = formData.get("password")  as string | null;
  const confirm  = formData.get("confirm")   as string | null;
  const name     = (formData.get("name")     as string | null)?.trim() || null;

  if (!email || !password || !confirm) {
    redirect("/auth/register?error=" + encodeURIComponent("All fields are required."));
  }
  if (password !== confirm) {
    redirect("/auth/register?error=" + encodeURIComponent("Passwords do not match."));
  }
  if (password.length < 8) {
    redirect("/auth/register?error=" + encodeURIComponent("Password must be at least 8 characters."));
  }

  const existing = await db.query.users.findFirst({ where: eq(users.email, email) });
  if (existing) {
    redirect("/auth/signin?error=exists&email=" + encodeURIComponent(email));
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const newUserId = nanoid();
  await db.insert(users).values({ id: newUserId, email, name, passwordHash });

  // Retroactively link guest orders placed with this email
  await db.update(orders)
    .set({ userId: newUserId })
    .where(and(eq(orders.email, email), isNull(orders.userId)));

  await sendVerificationEmail(email);

  // No auto sign-in — user must verify email first
  redirect("/auth/signin?registered=1");
}

// ─── verifyEmail ───────────────────────────────────────────────────────────────

export async function verifyEmail(token: string) {
  const record = await db.query.verificationTokens.findFirst({
    where: eq(verificationTokens.token, token),
  });

  if (!record || !record.identifier.startsWith("verify:")) {
    redirect("/auth/signin?error=invalid_token");
  }

  if (record.expires < new Date()) {
    await db.delete(verificationTokens).where(eq(verificationTokens.token, token));
    redirect("/auth/signin?error=expired_token");
  }

  const email = record.identifier.replace("verify:", "");

  await db.update(users)
    .set({ emailVerified: new Date() })
    .where(eq(users.email, email));

  await db.delete(verificationTokens).where(eq(verificationTokens.token, token));

  redirect("/auth/signin?verified=1");
}

// ─── resendVerificationEmail ───────────────────────────────────────────────────

export async function resendVerificationEmail(formData: FormData) {
  const email = (formData.get("email") as string | null)?.trim().toLowerCase();
  if (!email) return;

  const user = await db.query.users.findFirst({ where: eq(users.email, email) });

  // Always redirect to the same state — don't reveal whether account exists
  if (user && !user.emailVerified) {
    await sendVerificationEmail(email);
  }

  redirect("/auth/signin?registered=1");
}

// ─── requestPasswordReset ─────────────────────────────────────────────────────

export async function requestPasswordReset(formData: FormData) {
  const email = (formData.get("email") as string | null)?.trim().toLowerCase();
  if (!email) redirect("/auth/reset-password?error=1");

  const user = await db.query.users.findFirst({ where: eq(users.email, email) });

  // Always redirect to sent — don't reveal whether account exists
  if (user?.passwordHash) {
    await db.delete(verificationTokens)
      .where(eq(verificationTokens.identifier, email));

    const token   = nanoid(48);
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await db.insert(verificationTokens).values({ identifier: email, token, expires });

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password/${token}`;

    await resend.emails.send({
      from:    "NORA <auth@noraalliance.com>",
      to:      email,
      subject: "Reset your NORA password",
      html:    passwordResetEmailHtml(resetUrl),
    });
  }

  redirect("/auth/reset-password?sent=1");
}

// ─── resetPassword ─────────────────────────────────────────────────────────────

export async function resetPassword(token: string, formData: FormData) {
  const password = formData.get("password") as string | null;
  const confirm  = formData.get("confirm")  as string | null;

  if (!password || !confirm) {
    redirect(`/auth/reset-password/${token}?error=` + encodeURIComponent("All fields are required."));
  }
  if (password !== confirm) {
    redirect(`/auth/reset-password/${token}?error=` + encodeURIComponent("Passwords do not match."));
  }
  if (password.length < 8) {
    redirect(`/auth/reset-password/${token}?error=` + encodeURIComponent("Password must be at least 8 characters."));
  }

  const record = await db.query.verificationTokens.findFirst({
    where: eq(verificationTokens.token, token),
  });

  if (!record || record.identifier.startsWith("verify:")) {
    redirect(`/auth/reset-password/${token}?error=` + encodeURIComponent("Invalid or expired link."));
  }
  if (record.expires < new Date()) {
    await db.delete(verificationTokens).where(eq(verificationTokens.token, token));
    redirect("/auth/reset-password?error=expired");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await db.update(users)
    .set({ passwordHash })
    .where(eq(users.email, record.identifier));

  await db.delete(verificationTokens).where(eq(verificationTokens.token, token));

  // No auto sign-in — redirect to sign-in with success message
  redirect("/auth/signin?reset=1");
}

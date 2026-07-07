"use server";

import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { db } from "@/lib/db";
import { users, verificationTokens } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { customerSignIn } from "@/lib/customer-auth";
import { AuthError } from "next-auth";
import { Resend } from "resend";
import { redirect } from "next/navigation";

// ---------------------------------------------------------------------------
// Register
// ---------------------------------------------------------------------------

export async function registerCustomer(formData: FormData) {
  const email    = (formData.get("email")    as string | null)?.trim().toLowerCase();
  const password = formData.get("password")  as string | null;
  const confirm  = formData.get("confirm")   as string | null;
  const name     = (formData.get("name")     as string | null)?.trim() || null;

  if (!email || !password || !confirm) {
    redirect(`/auth/register?error=${encodeURIComponent("All fields are required.")}`);
  }
  if (password !== confirm) {
    redirect(`/auth/register?error=${encodeURIComponent("Passwords do not match.")}`);
  }
  if (password.length < 8) {
    redirect(`/auth/register?error=${encodeURIComponent("Password must be at least 8 characters.")}`);
  }

  const existing = await db.query.users.findFirst({ where: eq(users.email, email) });
  if (existing) {
    redirect("/auth/signin?error=exists");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await db.insert(users).values({ id: nanoid(), email, name, passwordHash });

  try {
    await customerSignIn("credentials", { email, password, redirectTo: "/account" });
  } catch (err) {
    if (err instanceof AuthError) {
      redirect("/auth/signin?error=invalid");
    }
    throw err; // NEXT_REDIRECT must be re-thrown
  }
}

// ---------------------------------------------------------------------------
// Password reset — request
// ---------------------------------------------------------------------------

const resend = new Resend(process.env.RESEND_API_KEY);

export async function requestPasswordReset(formData: FormData) {
  const email = (formData.get("email") as string | null)?.trim().toLowerCase();
  if (!email) return { error: "Email is required." };

  // Always return success — don't reveal whether an account exists
  const user = await db.query.users.findFirst({ where: eq(users.email, email) });
  if (!user) return { success: true };

  await db.delete(verificationTokens).where(eq(verificationTokens.identifier, email));

  const token   = nanoid(48);
  const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

  await db.insert(verificationTokens).values({ identifier: email, token, expires });

  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password/${token}`;

  await resend.emails.send({
    from:    "NORA <auth@noraalliance.com>",
    to:      email,
    subject: "Reset your NORA password",
    html:    passwordResetEmail(resetUrl),
  });

  return { success: true };
}

// ---------------------------------------------------------------------------
// Password reset — set new password
// ---------------------------------------------------------------------------

export async function resetPassword(token: string, formData: FormData) {
  const password = formData.get("password") as string | null;
  const confirm  = formData.get("confirm")  as string | null;

  if (!password || !confirm) return { error: "All fields are required." };
  if (password !== confirm)  return { error: "Passwords do not match." };
  if (password.length < 8)   return { error: "Password must be at least 8 characters." };

  const record = await db.query.verificationTokens.findFirst({
    where: eq(verificationTokens.token, token),
  });

  if (!record)                     return { error: "Invalid or expired link." };
  if (record.expires < new Date()) return { error: "This link has expired. Request a new one." };

  const passwordHash = await bcrypt.hash(password, 12);

  await db.update(users)
    .set({ passwordHash })
    .where(eq(users.email, record.identifier));

  await db.delete(verificationTokens).where(eq(verificationTokens.token, token));

  try {
    await customerSignIn("credentials", {
      email:      record.identifier,
      password,
      redirectTo: "/account",
    });
  } catch (err) {
    if (err instanceof AuthError) {
      // Password was saved — just couldn't auto-sign-in (rare)
      return { error: "Password updated. Please sign in." };
    }
    throw err; // NEXT_REDIRECT must be re-thrown
  }
}

// ---------------------------------------------------------------------------
// Email template
// ---------------------------------------------------------------------------

function passwordResetEmail(url: string): string {
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
            Click the button below to set a new password. This link expires in 1 hour and can only be used once.
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

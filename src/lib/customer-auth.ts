import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import { createCustomerAdapter } from "./customer-auth-adapter";

export const {
  handlers: customerHandlers,
  auth: customerAuth,
  signIn: customerSignIn,
  signOut: customerSignOut,
} = NextAuth({
  basePath: "/api/auth/customer",

  adapter: createCustomerAdapter(),

  session: { strategy: "jwt" },

  pages: {
    signIn:        "/auth/signin",
    verifyRequest: "/auth/verify-request",
    error:         "/auth/signin",
  },

  // Prevents overwriting admin's next-auth.session-token cookie
  cookies: {
    sessionToken: {
      name: "nora-customer-session",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },

  providers: [
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: "NORA <orders@noraalliance.com>",
      async sendVerificationRequest({ identifier: email, url }) {
        const { Resend: ResendClient } = await import("resend");
        const resend = new ResendClient(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "NORA <orders@noraalliance.com>",
          to: email,
          subject: "Sign in to NORA",
          html: magicLinkEmail(url),
        });
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});

function magicLinkEmail(url: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#FAFAF7;font-family:'Space Grotesk',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:48px 24px;">
        <table width="100%" style="max-width:480px;background:#FFFFFF;border:1px solid rgba(46,58,60,0.12);border-radius:2px;">
          <tr>
            <td style="padding:40px 40px 32px;">
              <p style="margin:0 0 4px;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#1E9C78;">
                NORA ALLIANCE
              </p>
              <h1 style="margin:0 0 24px;font-size:22px;font-weight:600;color:#2E3A3C;letter-spacing:-0.02em;">
                Sign in to your account
              </h1>
              <p style="margin:0 0 28px;font-size:15px;color:#696C6D;line-height:1.5;">
                Click the button below to sign in. This link expires in 24 hours
                and can only be used once.
              </p>
              <a href="${url}"
                 style="display:inline-block;background:#2E3A3C;color:#FAFAF7;font-family:'Courier New',monospace;font-size:13px;font-weight:500;letter-spacing:0.04em;text-decoration:none;padding:14px 28px;border-radius:2px;">
                Sign in &#8594;
              </a>
              <p style="margin:28px 0 0;font-size:13px;color:#696C6D;">
                If you didn&apos;t request this, you can safely ignore this email.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px;border-top:1px solid rgba(46,58,60,0.09);">
              <p style="margin:0;font-family:'Courier New',monospace;font-size:11px;color:#696C6D;">
                NORA Alliance &middot; noraalliance.com
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

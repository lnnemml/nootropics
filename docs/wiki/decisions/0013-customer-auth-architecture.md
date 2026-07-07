# ADR 0013 — Customer Auth Architecture

**Decision:** Separate NextAuth instance for customers (Credentials + bcrypt),
distinct from admin auth.

**Context:** Admin and customer sessions cannot share the same NextAuth instance
on the same domain without cookie collision. Cookie name isolation is the solution.

Magic-link via Resend Email provider was trialled in Task 3.2 and removed in 3.2b
in favour of standard email + password — simpler UX, no inbox dependency to sign in.

**Consequences:**
- Admin: NextAuth at `/api/auth`, cookie `next-auth.session-token`, Credentials provider
- Customer: NextAuth at `/api/auth/customer`, cookie `nora-customer-session`, Credentials provider
- No Auth.js adapter needed — Credentials provider handles auth entirely; all DB
  writes go through Server Actions (`src/app/actions/customerAuth.ts`).
- Session strategy is JWT — no `sessions` table needed.
- `verificationTokens` table repurposed for password reset tokens (one-time, 1-hour
  expiry). Delete-on-use enforced in `resetPassword` action.
- Password reset emails sent from `auth@noraalliance.com` via Resend.
- `users.passwordHash` is nullable — guest checkout users and any future social-login
  users won't have one.

**Auth pages:**
- `/auth/signin` — email + password, link to register + forgot password
- `/auth/register` — name (optional) + email + password + confirm
- `/auth/reset-password` — email form → "check your email" confirmation
- `/auth/reset-password/[token]` — new password form, auto-signs-in on success

**Revisit if:** we migrate to a unified auth system (e.g. Clerk, WorkOS) — at that
point, consolidate both auth paths.

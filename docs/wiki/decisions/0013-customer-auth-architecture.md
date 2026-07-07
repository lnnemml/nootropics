# ADR 0013 — Customer Auth Architecture

**Decision:** Separate NextAuth instance for customers, distinct from admin auth.

**Context:** Admin and customer sessions cannot share the same NextAuth instance
because admin uses Credentials + bcrypt (Node.js runtime, no DB adapter) while
customer uses Email/magic link (requires DB adapter for verification tokens).
Running two NextAuth instances on the same domain risks cookie collision without
explicit isolation.

**Consequences:**
- Admin: NextAuth at `/api/auth`, cookie `next-auth.session-token`
- Customer: NextAuth at `/api/auth/customer`, cookie `nora-customer-session`
- Custom Drizzle adapter written inline (`src/lib/customer-auth-adapter.ts`) rather
  than using `@auth/drizzle-adapter` — our schema's property names (`emailVerified`,
  `image`) are shaped to match the adapter interface directly, avoiding a library
  dependency that would require schema changes or monkey-patching.
- Session strategy is JWT (not database sessions) — no `sessions` table needed.
- Magic link emails sent via Resend directly in `sendVerificationRequest` — same
  API key already in use for order confirmation emails.

**Revisit if:** we migrate to a unified auth system (e.g. Clerk, WorkOS) — at that
point, consolidate both auth paths and drop the custom adapter.

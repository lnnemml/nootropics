// ADR 0023 — the AFFILIATES_ENABLED switch. No "server-only" and no db, because middleware reads
// it too. Off means no buyer-facing change.
export function affiliatesEnabled(): boolean {
  return process.env.AFFILIATES_ENABLED?.trim() === "true";
}

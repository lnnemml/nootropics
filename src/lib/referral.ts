// Omits I, O, 0, 1 to avoid visual ambiguity in printed/shared codes
const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateReferralCode(): string {
  let result = "NORA-";
  for (let i = 0; i < 6; i++) {
    result += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return result;
}

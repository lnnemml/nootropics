import { verifyEmail } from "@/app/actions/customerAuth";

export default async function VerifyEmailPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  await verifyEmail(token);
  // Unreachable — verifyEmail always redirects
  return null;
}

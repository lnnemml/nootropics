import { customerAuth } from "@/lib/customer-auth";
import { redirect } from "next/navigation";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await customerAuth();
  if (!session) {
    redirect("/auth/signin?callbackUrl=/account");
  }
  return <>{children}</>;
}

import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);
export default auth;

export const config = {
  // Protect /admin and all sub-routes.
  // /admin/login is excluded to prevent infinite redirect loops.
  matcher: ["/admin", "/admin/((?!login$).*)"],
};

"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE,
  ADMIN_SESSION_SECONDS,
  createSessionToken,
  verifyPassword,
} from "@/lib/admin/auth";
import { safeErrorTag } from "@/lib/affiliate/core";

export type LoginState = { error: string } | null;

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const password = formData.get("password");
  if (typeof password !== "string" || !verifyPassword(password)) {
    return { error: "Incorrect password." };
  }

  try {
    (await cookies()).set(ADMIN_COOKIE, await createSessionToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ADMIN_SESSION_SECONDS,
    });
  } catch (err) {
    console.error("Admin login failed:", safeErrorTag(err));
    return { error: "Sign-in is not configured. Check ADMIN_AUTH_SECRET." };
  }

  redirect("/admin");
}

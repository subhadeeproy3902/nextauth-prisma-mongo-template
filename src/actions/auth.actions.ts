"use server";

import { signIn, signOut } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: "/dashboard" });
  revalidatePath("/");
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
};

export const resendLogin = async (email: string) => {
  if (!email) {
    throw new Error("Email is required");
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    throw new Error("Invalid email format");
  }
  await signIn("resend", {
    email,
    redirectTo: "/dashboard",
  });
  revalidatePath("/dashboard");
};
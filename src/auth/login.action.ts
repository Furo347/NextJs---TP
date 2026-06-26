"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signIn } from "@/auth";

type LoginState = {
  error?: string;
};

export async function loginAction(
  _previousState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return {
      error: "Email et mot de passe obligatoires.",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/account",
    });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      error: "Identifiants invalides.",
    };
  }

  return {};
}
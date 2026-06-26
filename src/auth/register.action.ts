"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/src/lib/prisma";

type RegisterState = {
  error?: string;
};

export async function registerAction(
  _previousState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return {
      error: "Email et mot de passe obligatoires.",
    };
  }

  if (password.length < 6) {
    return {
      error: "Le mot de passe doit contenir au moins 6 caractères.",
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return {
      error: "Un compte existe déjà avec cet email.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name: name || null,
      email,
      password: hashedPassword,
    },
  });

  redirect("/login");
}
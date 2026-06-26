import { cookies } from "next/headers";

export async function getAbVariant() {
  const cookieStore = await cookies();
  const variant = cookieStore.get("ab_variant")?.value;

  return variant === "B" ? "B" : "A";
}
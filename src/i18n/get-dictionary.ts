import { cookies } from "next/headers";
import fr from "@/src/i18n/dictionaries/fr.json";
import en from "@/src/i18n/dictionaries/en.json";

export type Locale = "fr" | "en";

const dictionaries = {
  fr,
  en,
};

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value;

  return locale === "en" ? "en" : "fr";
}

export async function getDictionary() {
  const locale = await getLocale();

  return dictionaries[locale];
}
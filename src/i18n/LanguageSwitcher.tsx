"use client";

import { useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const router = useRouter();

  function changeLocale(locale: "fr" | "en") {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    router.refresh();
  }

  return (
    <div className="flex gap-2 text-sm">
      <button onClick={() => changeLocale("fr")} className="underline">
        FR
      </button>
      <button onClick={() => changeLocale("en")} className="underline">
        EN
      </button>
    </div>
  );
}
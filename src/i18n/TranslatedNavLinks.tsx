import Link from "next/link";
import { Suspense } from "react";
import { getDictionary } from "@/src/i18n/get-dictionary";
import AdminNavLink from "@/src/auth/AdminNavLink";

export default async function TranslatedNavLinks() {
  const dict = await getDictionary();

  return (
    <>
      <Link href="/">{dict.nav.home}</Link>
      <Link href="/products">{dict.nav.products}</Link>

      <Suspense fallback={null}>
        <AdminNavLink />
      </Suspense>
    </>
  );
}
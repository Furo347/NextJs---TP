import Link from "next/link";
import { auth } from "@/auth";
import { getDictionary } from "@/src/i18n/get-dictionary";

export default async function AdminNavLink() {
  const session = await auth();
  const dict = await getDictionary();

  if (session?.user?.role !== "ADMIN") {
    return null;
  }

  return <Link href="/admin">{dict.nav.admin}</Link>;
}
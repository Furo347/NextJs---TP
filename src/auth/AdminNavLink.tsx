import Link from "next/link";
import { auth } from "@/auth";

export default async function AdminNavLink() {
  const session = await auth();
  const isAdmin = session?.user?.role === "ADMIN";

  if (!isAdmin) {
    return null;
  }

  return <Link href="/admin">Admin</Link>;
}
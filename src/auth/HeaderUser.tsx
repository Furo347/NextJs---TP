import Link from "next/link";
import { auth } from "@/auth";
import { logoutAction } from "@/src/auth/logout.action";

function getTrigram(nameOrEmail?: string | null) {
  if (!nameOrEmail) {
    return "?";
  }

  const cleanValue = nameOrEmail.trim();

  if (cleanValue.includes("@")) {
    return cleanValue.slice(0, 3).toUpperCase();
  }

  const parts = cleanValue.split(" ").filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  return cleanValue.slice(0, 3).toUpperCase();
}

export default async function HeaderUser() {
  const session = await auth();

  if (!session?.user) {
    return (
      <Link href="/login" className="text-sm underline">
        Connexion
      </Link>
    );
  }

  const trigram = getTrigram(session.user.name ?? session.user.email);

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-900">
        {trigram}
      </div>

      <form action={logoutAction}>
        <button type="submit" className="text-sm underline">
          Déconnexion
        </button>
      </form>
    </div>
  );
}
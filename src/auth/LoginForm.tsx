"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction } from "@/src/auth/login.action";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, {});

  return (
    <section className="max-w-md mx-auto bg-white text-slate-900 rounded-xl p-6">
      <h1 className="text-3xl font-bold mb-6">Connexion</h1>

      <form action={formAction} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            name="email"
            type="email"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1">Mot de passe</label>
          <input
            name="password"
            type="password"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {state.error && <p className="text-red-600 text-sm">{state.error}</p>}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-slate-900 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isPending ? "Connexion..." : "Se connecter"}
        </button>
      </form>

      <p className="text-sm text-slate-600 mt-4">
        Pas encore de compte ?{" "}
        <Link href="/register" className="underline">
          Créer un compte
        </Link>
      </p>
    </section>
  );
}
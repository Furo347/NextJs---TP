"use client";

import { useActionState } from "react";
import { registerAction } from "@/src/auth/register.action";

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, {});

  return (
    <section className="max-w-md mx-auto bg-white text-slate-900 rounded-xl p-6">
      <h1 className="text-3xl font-bold mb-6">Créer un compte</h1>

      <form action={formAction} className="space-y-4">
        <div>
          <label className="block mb-1">Nom</label>
          <input
            name="name"
            type="text"
            className="w-full border rounded px-3 py-2"
          />
        </div>

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

        {state.error && (
          <p className="text-red-600 text-sm">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-slate-900 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isPending ? "Création..." : "Créer mon compte"}
        </button>
      </form>
    </section>
  );
}
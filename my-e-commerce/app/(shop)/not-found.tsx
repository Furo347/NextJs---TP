import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center">
      <div className="bg-white text-slate-900 rounded-xl p-8 shadow text-center max-w-md">
        <h1 className="text-5xl font-bold mb-4">404</h1>

        <h2 className="text-2xl font-semibold mb-3">
          Page introuvable
        </h2>

        <p className="text-slate-600 mb-6">
          La page ou le produit demandé n’existe pas.
        </p>

        <Link
          href="/"
          className="inline-block bg-slate-900 text-white px-4 py-2 rounded"
        >
          Retour à l’accueil
        </Link>
      </div>
    </section>
  );
}
import Link from "next/link";

export default function AdminPage() {
  return (
    <section className="bg-white text-slate-900 rounded-xl p-6">
      <h1 className="text-3xl font-bold mb-4">Administration</h1>

      <p className="text-slate-600 mb-6">
        Bienvenue dans l’espace admin de My Supa Store.
      </p>

      <Link
        href="/admin/products"
        className="inline-block bg-slate-900 text-white px-4 py-2 rounded"
      >
        Gérer les produits
      </Link>
    </section>
  );
}
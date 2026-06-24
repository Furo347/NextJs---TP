import Link from "next/link";
import { getProducts } from "@/src/catalog/product.repository";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Gestion des produits</h1>
          <p className="text-slate-600">
            Liste des produits enregistrés en base SQLite.
          </p>
        </div>

        <Link
          href="/admin"
          className="bg-slate-900 text-white px-4 py-2 rounded"
        >
          Retour admin
        </Link>
      </div>

      <div className="bg-white text-slate-900 rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-200">
            <tr>
              <th className="text-left p-3">Nom</th>
              <th className="text-left p-3">Slug</th>
              <th className="text-left p-3">Prix</th>
              <th className="text-left p-3">Image</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.slug}</td>
                <td className="p-3">{product.price} €</td>
                <td className="p-3">{product.image}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
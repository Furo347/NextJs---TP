import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/src/catalog/product.repository";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Tous les produits</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <article key={product.id} className="border rounded-xl p-4 bg-white text-slate-900">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={300}
              className="rounded-lg object-cover"
            />

            <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
            <p className="text-slate-600">{product.description}</p>
            <p className="font-bold mt-2">{product.price} €</p>

            <Link
              href={`/products/${product.slug}`}
              className="inline-block mt-4 bg-slate-900 text-white px-4 py-2 rounded"
            >
              Voir le produit
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
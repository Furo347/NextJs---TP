import Image from "next/image";
import Link from "next/link";
import { getSimilarProducts } from "@/src/catalog/product.repository";

type SimilarProductsProps = {
  currentProductId: number;
};

export default async function SimilarProducts({
  currentProductId,
}: SimilarProductsProps) {
  const products = await getSimilarProducts(currentProductId);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 bg-white text-slate-900 rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6">Produits similaires</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="border rounded-xl p-4 hover:shadow"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={200}
              className="rounded-lg object-cover"
            />

            <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
            <p className="font-bold mt-2">{product.price} €</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
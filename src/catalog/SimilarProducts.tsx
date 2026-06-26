import { connection } from "next/server";
import {
  getProductBySlug,
  getSimilarProducts,
} from "@/src/catalog/product.repository";
import { wait } from "@/src/lib/wait";
import ProductCard from "./ProductCard";

type SimilarProductsProps = {
  currentProductSlug: string;
};

export default async function SimilarProducts({
  currentProductSlug,
}: SimilarProductsProps) {
  await connection();

  await wait(2500);

  const currentProduct = await getProductBySlug(currentProductSlug);

  if (!currentProduct) {
    return null;
  }

  const products = await getSimilarProducts(currentProduct.id);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 bg-white text-slate-900 rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6">Produits similaires</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
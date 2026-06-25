import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/src/catalog/product.repository";
import AddToCartButton from "@/src/cart/AddToCartButton";
import ProductTabs from "@/src/catalog/ProductTabs";
import { Suspense } from "react";
import SimilarProducts from "@/src/catalog/SimilarProducts";
import SimilarProductsSkeleton from "@/src/catalog/SimilarProductsSkeleton";
import SponsoredProducts from "@/src/sponsored/SponsoredProducts";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/* export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product) => ({
    slug: product.slug,
  }));
} */

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={500}
          className="rounded-xl object-cover"
        />

        <div className="bg-white text-slate-900 rounded-xl p-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-2xl font-bold mt-6">{product.price} €</p>

          <AddToCartButton product={{ id: product.id }} />

          <Suspense fallback={<p className="mt-8 text-slate-500">Chargement des onglets...</p>}>
            <ProductTabs product={product} />
          </Suspense>
        </div>
      </section>

      <Suspense fallback={<SimilarProductsSkeleton />}>
        <SimilarProducts currentProductId={product.id} />
      </Suspense>

      <Suspense fallback={<p className="mt-8">Chargement des produits sponsorisés...</p>}>
        <SponsoredProducts />
      </Suspense>
    </>
  );
}
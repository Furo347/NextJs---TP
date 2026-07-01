import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/src/catalog/product.repository";
import AddToCartButton from "@/src/cart/AddToCartButton";
import ProductTabs from "@/src/catalog/ProductTabs";
import { Suspense } from "react";
import SimilarProducts from "@/src/catalog/SimilarProducts";
import SimilarProductsSkeleton from "@/src/catalog/SimilarProductsSkeleton";
import SponsoredProducts from "@/src/sponsored/SponsoredProducts";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type MetadataProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product) => ({
    slug: product.slug,
  }));
}

//export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Produit introuvable",
      description: "Ce produit n'existe pas.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: product.name,
    description: product.description,
    keywords: [
      product.name,
      product.slug,
      "e-commerce",
      "produit",
      "boutique",
    ],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: product.name,
      description: product.description,
      type: "website",
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
  };
}

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
          priority
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
        <SimilarProducts currentProductSlug={product.slug} />
      </Suspense>

      <Suspense
        fallback={
          <section className="mt-10 bg-white text-slate-900 rounded-xl p-6">
            Chargement des produits sponsorisés...
          </section>
        }
      >
        <SponsoredProducts />
      </Suspense>
    </>
  );
}
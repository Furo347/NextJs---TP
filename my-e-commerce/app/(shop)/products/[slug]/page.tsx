import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/src/catalog/product.repository";
import AddToCartButton from "@/src/cart/AddToCartButton";
import Link from "next/link";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    tab?: string;
  }>;
};

export default async function ProductPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const { tab } = await searchParams;

  const activeTab = tab === "specifications" ? "specifications" : "description";

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
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
        <p className="text-slate-600 mt-4">{product.description}</p>
        <p className="text-2xl font-bold mt-6">{product.price} €</p>

        <div className="mt-8">
          <div className="flex gap-3 border-b border-slate-200">
            <Link
              href={`/products/${product.slug}?tab=description`}
              className={`px-4 py-2 ${
                activeTab === "description"
                  ? "border-b-2 border-slate-900 font-bold"
                  : "text-slate-500"
              }`}
            >
              Description
            </Link>

            <Link
              href={`/products/${product.slug}?tab=specifications`}
              className={`px-4 py-2 ${
                activeTab === "specifications"
                  ? "border-b-2 border-slate-900 font-bold"
                  : "text-slate-500"
              }`}
            >
              Spécifications
            </Link>
          </div>

          <div className="mt-4">
            {activeTab === "description" ? (
              <p className="text-slate-600">{product.description}</p>
            ) : (
              <ul className="list-disc pl-5 text-slate-600">
                <li>Référence : #{product.id}</li>
                <li>Slug : {product.slug}</li>
                <li>Prix : {product.price} €</li>
                <li>Image : {product.image}</li>
              </ul>
            )}
          </div>
        </div>

        <AddToCartButton
          product={{
            id: product.id,
            name: product.name,
            price: product.price,
            slug: product.slug,
          }}
        />
      </div>
    </section>
  );
}
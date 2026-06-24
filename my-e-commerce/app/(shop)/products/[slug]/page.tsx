import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/src/catalog/product.repository";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
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

        <button className="mt-6 bg-slate-900 text-white px-6 py-3 rounded">
          Ajouter au panier
        </button>
      </div>
    </section>
  );
}
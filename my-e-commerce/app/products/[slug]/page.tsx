import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/src/lib/products";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  const product = getProductBySlug(slug);

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

      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>

        <p className="text-gray-600 mt-4">{product.description}</p>

        <p className="text-2xl font-bold mt-6">{product.price} €</p>

        <button className="mt-6 bg-black text-white px-6 py-3 rounded">
          Ajouter au panier
        </button>
      </div>
    </section>
  );
}
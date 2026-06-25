import Image from "next/image";
import { notFound } from "next/navigation";
import { getSponsoredProductByHandle } from "@/src/sponsored/sponsored-products.repository";

type PageProps = {
  params: Promise<{
    handle: string;
  }>;
};

export default async function SponsoredProductPage({ params }: PageProps) {
  const { handle } = await params;

  const product = await getSponsoredProductByHandle(handle);

  if (!product) {
    notFound();
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Image
        src={product.image}
        alt={product.title}
        width={600}
        height={500}
        className="rounded-xl object-cover"
      />

      <div className="bg-white text-slate-900 rounded-xl p-6">
        <p className="text-sm uppercase tracking-wide text-slate-500">
          Produit sponsorisé
        </p>

        <h1 className="text-3xl font-bold mt-2">{product.title}</h1>

        <p className="text-slate-600 mt-4">{product.description}</p>

        <p className="text-2xl font-bold mt-6">
          {product.price} {product.currencyCode}
        </p>

        <p className="mt-6 text-sm text-slate-500">
          Ce produit vient d’une source GraphQL externe et n’est pas ajoutable au panier.
        </p>
      </div>
    </section>
  );
}
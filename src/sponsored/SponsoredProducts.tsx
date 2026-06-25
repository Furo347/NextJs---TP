import Image from "next/image";
import Link from "next/link";
import { getSponsoredProducts } from "@/src/sponsored/sponsored-products.repository";
import RefreshSponsoredProductsButton from "@/src/sponsored/RefreshSponsoredProductsButton";
import { wait } from "@/src/lib/wait";

export default async function SponsoredProducts() {
  const products = await getSponsoredProducts();

  await wait(1500);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 bg-white text-slate-900 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-500">
            Sponsorisés
          </p>

          <h2 className="text-2xl font-bold">
            Produits sponsorisés
          </h2>
        </div>

        <RefreshSponsoredProductsButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/sponsored-products/${product.id}`}
            className="border rounded-xl p-4 hover:shadow"
          >
            <Image
              src={product.image}
              alt={product.title}
              width={300}
              height={200}
              className="rounded-lg object-cover"
            />

            <h3 className="text-lg font-semibold mt-3">{product.title}</h3>
            <p className="text-slate-600 line-clamp-2">
              {product.description}
            </p>
            <p className="font-bold mt-2">{product.price} {product.currencyCode}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
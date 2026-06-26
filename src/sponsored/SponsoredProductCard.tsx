import Image from "next/image";
import Link from "next/link";
import { SponsoredProduct } from "@/src/sponsored/sponsored-products.repository";
import { getAbVariant } from "@/src/ab/ab-cookie";

type Props = {
  product: SponsoredProduct;
};

export default async function SponsoredProductCard({ product }: Props) {
  const variant = await getAbVariant();
  const shouldDisablePrefetch = variant === "B";

  return (
    <Link
      href={`/sponsored-products/${product.handle}`}
      prefetch={shouldDisablePrefetch ? false : undefined}
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

      <p className="font-bold mt-2">
        {product.price} {product.currencyCode}
      </p>
    </Link>
  );
}
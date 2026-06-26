import Image from "next/image";
import Link from "next/link";
import { Product } from "@prisma/client";
import { getAbVariant } from "@/src/ab/ab-cookie";

type ProductCardProps = {
  product: Product;
};

export default async function ProductCard({ product }: ProductCardProps) {
  const variant = await getAbVariant();
  const shouldDisablePrefetch = variant === "B";

  return (
    <Link
      href={`/products/${product.slug}`}
      prefetch={shouldDisablePrefetch ? false : undefined}
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
  );
}
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/src/lib/prisma";
import ProductEditForm from "@/src/admin/products/ProductEditForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductContent({ params }: Props) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <section>
      <div className="mb-6">
        <Link href="/admin/products" className="underline">
          ← Retour aux produits
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">
        Modifier le produit
      </h1>

      <ProductEditForm product={product} />
    </section>
  );
}
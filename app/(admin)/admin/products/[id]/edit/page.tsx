import { Suspense } from "react";
import EditProductContent from "@/app/(admin)/admin/products/EditProductContent";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function EditProductPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <section className="bg-white text-slate-900 rounded-xl p-6">
          Chargement du produit...
        </section>
      }
    >
      <EditProductContent params={params} />
    </Suspense>
  );
}
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

type ProductTabsProps = {
  product: {
    id: number;
    slug: string;
    description: string;
    price: number;
    image: string;
  };
};

export default function ProductTabs({ product }: ProductTabsProps) {
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab");

  const activeTab =
    tab === "specifications" ? "specifications" : "description";

  return (
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
  );
}
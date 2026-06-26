"use client";

import { useActionState } from "react";
import { Product } from "@prisma/client";
import { updateProductAction } from "@/src/admin/products/update-product.action";

type Props = {
  product: Product;
};

export default function ProductEditForm({ product }: Props) {
  const [state, formAction, isPending] = useActionState(updateProductAction, {});

  return (
    <form action={formAction} className="space-y-4 bg-white text-slate-900 rounded-xl p-6">
      <input type="hidden" name="id" value={product.id} />

      <div>
        <label className="block mb-1 font-medium">Nom</label>
        <input
          name="name"
          defaultValue={product.name}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Slug</label>
        <input
          name="slug"
          defaultValue={product.slug}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          name="description"
          defaultValue={product.description}
          className="w-full border rounded px-3 py-2 min-h-32"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Prix</label>
        <input
          name="price"
          type="number"
          step="0.01"
          defaultValue={product.price}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Image</label>
        <input
          name="image"
          defaultValue={product.image}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {state.error && <p className="text-red-600 text-sm">{state.error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="bg-slate-900 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isPending ? "Enregistrement..." : "Enregistrer"}
      </button>
    </form>
  );
}
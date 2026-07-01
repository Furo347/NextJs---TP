"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  product: {
    id: number;
  };
};

export default function AddToCartButton({ product }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleAddToCart() {
    debugger;
    setIsLoading(true);

    try {
      await fetch("/api/cart/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
        }),
      });

      router.refresh();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      className="mt-6 bg-slate-900 text-white px-6 py-3 rounded hover:bg-slate-700 disabled:opacity-50"
    >
      {isLoading ? "Ajout..." : "Ajouter au panier"}
    </button>
  );
}
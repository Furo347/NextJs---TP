"use client";

import { useCart } from "./cart.context";

type Props = {
  product: {
    id: number;
    name: string;
    price: number;
    slug: string;
  };
};

export default function AddToCartButton({ product }: Props) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="mt-6 bg-slate-900 text-white px-6 py-3 rounded hover:bg-slate-700"
    >
      Ajouter au panier
    </button>
  );
}
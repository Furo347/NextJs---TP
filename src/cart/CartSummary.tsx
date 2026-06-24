"use client";

import { useCart } from "./cart.context";

export default function CartSummary() {
  const { totalItems, totalPrice } = useCart();

  return (
    <div className="text-sm">
      Panier : {totalItems} article{totalItems > 1 ? "s" : ""} —{" "}
      {totalPrice.toFixed(2)} €
    </div>
  );
}
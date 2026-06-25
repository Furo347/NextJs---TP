import { connection } from "next/server";
import { getCartSummary } from "@/src/cart/cart.repository";

export default async function CartSummary() {
  await connection();

  const { totalItems, totalPrice } = await getCartSummary();

  return (
    <div className="text-sm">
      Panier : {totalItems} article{totalItems > 1 ? "s" : ""} —{" "}
      {totalPrice.toFixed(2)} €
    </div>
  );
}
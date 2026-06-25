import { getCartSummary } from "@/src/cart/cart.repository";

export default async function CartSummary() {
  const { totalItems, totalPrice } = await getCartSummary();

  return (
    <div className="text-sm">
      Panier : {totalItems} article{totalItems > 1 ? "s" : ""} —{" "}
      {totalPrice.toFixed(2)} €
    </div>
  );
}
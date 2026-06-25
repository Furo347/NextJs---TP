import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { addProductToCart } from "@/src/cart/cart.repository";

export async function POST(request: Request) {
  const body = await request.json();

  const productId = Number(body.productId);

  if (!productId || Number.isNaN(productId)) {
    return NextResponse.json(
      { message: "productId invalide" },
      { status: 400 }
    );
  }

  await addProductToCart(productId);

  revalidatePath("/");

  return NextResponse.json(
    { message: "Produit ajouté au panier" },
    { status: 201 }
  );
}
import { NextResponse } from "next/server";
import { getProducts } from "@/src/catalog/product.repository";

export async function GET() {
  const products = await getProducts();

  return NextResponse.json(products, {
    status: 200,
  });
}
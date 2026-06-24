import products from "@/src/data/products.json";
import { Product } from "@/src/types/Product";

export function getProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
export type ProductLike = {
  price: number;
  stock?: number;
};

export function isInStock(product: ProductLike) {
  return (product.stock ?? 1) > 0;
}

export function formatPrice(price: number, currency = "EUR") {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
  }).format(price);
}
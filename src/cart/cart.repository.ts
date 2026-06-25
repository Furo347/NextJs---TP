import { prisma } from "@/src/lib/prisma";

export const DEFAULT_CART_ID = 1;

export async function getOrCreateDefaultCart() {
  return prisma.cart.upsert({
    where: {
      id: DEFAULT_CART_ID,
    },
    update: {},
    create: {
      id: DEFAULT_CART_ID,
    },
  });
}

export async function addProductToCart(productId: number) {
  const cart = await getOrCreateDefaultCart();

  return prisma.cartItem.upsert({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
    update: {
      quantity: {
        increment: 1,
      },
    },
    create: {
      cartId: cart.id,
      productId,
      quantity: 1,
    },
  });
}

export async function getCartSummary() {
  const cart = await getOrCreateDefaultCart();

  const items = await prisma.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    include: {
      product: true,
    },
  });

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return {
    items,
    totalItems,
    totalPrice,
  };
}
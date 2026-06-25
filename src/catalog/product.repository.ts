import { prisma } from "@/src/lib/prisma";

export async function getProducts() {
  return prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: {
      slug,
    },
  });
}

export async function getSimilarProducts(currentProductId: number) {
  return prisma.product.findMany({
    where: {
      id: {
        not: currentProductId,
      },
    },
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
  });
}
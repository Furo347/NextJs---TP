import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: "file:./prisma/dev.db",
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      {
        slug: "casque-audio",
        name: "Casque Audio",
        description: "Un casque confortable avec un son immersif.",
        price: 79.99,
        image: "/products/casque.jpg",
      },
      {
        slug: "clavier-mecanique",
        name: "Clavier mécanique",
        description: "Un clavier robuste pour travailler et jouer.",
        price: 119.99,
        image: "/products/clavier.jpg",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
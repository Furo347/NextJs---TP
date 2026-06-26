"use server";

import { z } from "zod";
import { revalidatePath, revalidateTag } from "next/cache";
import { prisma } from "@/src/lib/prisma";

const updateProductSchema = z.object({
  id: z.coerce.number().int().positive(),
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  slug: z.string().min(2, "Le slug est obligatoire."),
  description: z.string().min(5, "La description est trop courte."),
  price: z.coerce.number().positive("Le prix doit être supérieur à 0."),
  image: z.string().min(1, "L'image est obligatoire."),
  intent: z.string().optional(),
});

type UpdateProductState = {
  error?: string;
  success?: string;
};

export async function updateProductAction(
  _previousState: UpdateProductState,
  formData: FormData
): Promise<UpdateProductState> {
  const rawData = {
    id: formData.get("id"),
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    price: formData.get("price"),
    image: formData.get("image"),
    intent: formData.get("intent"),
  };

  if (rawData.intent === "test-error") {
    return {
      error: "Erreur volontaire : test de gestion UX des erreurs.",
    };
  }

  const result = updateProductSchema.safeParse(rawData);

  if (!result.success) {
    return {
      error: result.error.issues[0]?.message ?? "Données invalides.",
    };
  }

  try {
    await prisma.product.update({
      where: {
        id: result.data.id,
      },
      data: {
        name: result.data.name,
        slug: result.data.slug,
        description: result.data.description,
        price: result.data.price,
        image: result.data.image,
      },
    });

    revalidateTag("products", "max");
    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath(`/products/${result.data.slug}`);

    return {
      success: "Produit mis à jour avec succès.",
    };
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR", error);

    return {
      error: "Impossible de mettre à jour le produit.",
    };
  }
}
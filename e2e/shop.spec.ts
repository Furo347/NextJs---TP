import { expect, test } from "@playwright/test";

test("affiche les produits", async ({ page }) => {
  await page.goto("/products");

  await expect(
    page.getByRole("heading", { name: /Casque Audio Premium/i })
  ).toBeVisible();
});

test("navigue vers une fiche produit", async ({ page }) => {
  await page.goto("/products");

  await page
    .getByRole("link", { name: /Voir le produit/i })
    .first()
    .click();

  await expect(page).toHaveURL(/\/products\//);
  await expect(
    page.getByRole("button", { name: /Ajouter au panier/i })
  ).toBeVisible();
});

test("switch de langue", async ({ page }) => {
  await page.goto("/products");

  await page.getByRole("button", { name: "EN", exact: true }).click();
  await expect(page.getByRole("link", { name: "Home" })).toBeVisible();

  await page.getByRole("button", { name: "FR", exact: true }).click();
  await expect(page.getByRole("link", { name: "Accueil" })).toBeVisible();
});
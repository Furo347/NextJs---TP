import { describe, expect, it } from "vitest";
import { formatPrice, isInStock } from "./product.rules";

describe("product rules", () => {
  it("returns true when product is in stock", () => {
    expect(isInStock({ price: 10, stock: 3 })).toBe(true);
  });

  it("returns false when product is out of stock", () => {
    expect(isInStock({ price: 10, stock: 0 })).toBe(false);
  });

  it("formats price in EUR", () => {
    expect(formatPrice(549.99)).toContain("549,99");
    expect(formatPrice(549.99)).toContain("€");
  });
});
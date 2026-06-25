"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RefreshSponsoredProductsButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleRefresh() {
    setIsLoading(true);

    try {
      await fetch("/api/revalidate-sponsored-products", {
        method: "POST",
      });

      router.refresh();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleRefresh}
      disabled={isLoading}
      className="bg-slate-900 text-white px-3 py-2 rounded text-sm disabled:opacity-50"
    >
      {isLoading ? "Actualisation..." : "Actualiser"}
    </button>
  );
}
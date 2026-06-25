import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";
import CartSummary from "@/src/cart/CartSummary";
import Footer from "@/src/components/Footer";
import { Suspense } from "react";

const dancingScript = localFont({
  src: "./fonts/DancingScript-VariableFont_wght.ttf",
  variable: "--font-dancing-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "My Supa Store",
  description: "Site e-commerce Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={dancingScript.variable}>
<body>
    <header className="bg-slate-900 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center gap-6">
        <div className="flex gap-6">
          <Link href="/">Accueil</Link>
          <Link href="/products">Produits</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/test-loading">Test loading</Link>
          <Link href="/test-error">Test error</Link>
          <Link href="/products/casque-audio2">Not found</Link>
        </div>

        <Suspense fallback={<div className="text-sm">Panier : ...</div>}>
          <CartSummary />
        </Suspense>
      </nav>
    </header>

    <main className="container mx-auto p-6 min-h-screen">
      {children}
    </main>

    <Footer />
</body>
    </html>
  );
}
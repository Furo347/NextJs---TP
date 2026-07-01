import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";
import CartSummary from "@/src/cart/CartSummary";
import Footer from "@/src/components/Footer";
import { Suspense } from "react";
import HeaderUser from "@/src/auth/HeaderUser";
import AdminNavLink from "@/src/auth/AdminNavLink";
import WebVitalsReporter from "@/src/observability/WebVitalsReporter";
import ServiceWorkerRegister from "@/src/pwa/ServiceWorkerRegister";
import LanguageSwitcher from "@/src/i18n/LanguageSwitcher";
import TranslatedNavLinks from "@/src/i18n/TranslatedNavLinks";

const dancingScript = localFont({
  src: "./fonts/DancingScript-VariableFont_wght.ttf",
  variable: "--font-dancing-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "My Supa Store",
    template: "%s | My Supa Store",
  },
  description: "Une boutique e-commerce construite avec Next.js.",
  keywords: ["e-commerce", "Next.js", "produits", "boutique"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "My Supa Store",
    description: "Une boutique e-commerce construite avec Next.js.",
    type: "website",
    locale: "fr_FR",
    siteName: "My Supa Store",
  },
  manifest: "/manifest.json",
  themeColor: "#0f172a",
  appleWebApp: {
    capable: true,
    title: "My Supa Store",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="fr" className={dancingScript.variable}>
      <body>
        <WebVitalsReporter />
        <ServiceWorkerRegister />
          <header className="bg-slate-900 text-white p-4">
            <nav className="container mx-auto flex justify-between items-center gap-6">
              <div className="flex gap-6">
                <Suspense fallback={<span>...</span>}>
                  <TranslatedNavLinks />
                </Suspense>

                <Suspense fallback={null}>
                  <AdminNavLink />
                </Suspense>
                <Link href="/test-loading">Test loading</Link>
                <Link href="/test-error">Test error</Link>
                <Link href="/products/casque-audio2">Not found</Link>
              </div>

              <Suspense fallback={<div className="text-sm">Panier : ...</div>}>
                <CartSummary />
              </Suspense>
              
              <Suspense fallback={<Link href="/login" className="text-sm underline">Connexion</Link>}>
                <HeaderUser />
              </Suspense>

              <LanguageSwitcher />

            </nav>
          </header>

          <main className="container mx-auto p-6 min-h-screen">
            {children}
          </main>

          <Suspense fallback={<footer className="bg-slate-900 text-white p-4 text-center">© 2026</footer>}>
            <Footer />
          </Suspense>
      </body>
    </html>
  );
}
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen bg-slate-100 text-slate-900">
      <header className="bg-slate-950 text-white p-4">
        <nav className="container mx-auto flex gap-6">
          <Link href="/">Boutique</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/admin/products">Produits</Link>
        </nav>
      </header>

      <main className="container mx-auto p-6">{children}</main>
    </section>
  );
}
export default async function Footer() {
  "use cache";

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white p-4 text-center">
      © {currentYear} My Supa Store
    </footer>
  );
}
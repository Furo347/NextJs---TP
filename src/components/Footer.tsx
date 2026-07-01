import { getDictionary } from "@/src/i18n/get-dictionary";

export default async function Footer() {
  const dict = await getDictionary();

  return (
    <footer className="bg-slate-900 text-white p-4 text-center">
      © 2026 {dict.footer.copyright}
    </footer>
  );
}
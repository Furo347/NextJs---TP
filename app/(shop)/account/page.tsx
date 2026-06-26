import { auth } from "@/auth";

export default async function AccountPage() {
  const session = await auth();

  return (
    <section className="max-w-md mx-auto bg-white text-slate-900 rounded-xl p-6">
      <h1 className="text-3xl font-bold mb-4">Mon compte</h1>

      <p>Email : {session?.user?.email ?? "Non connecté"}</p>
    </section>
  );
}
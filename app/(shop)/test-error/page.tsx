export default function TestErrorPage() {
  if (process.env.NODE_ENV === "development") {
    throw new Error("Erreur volontaire pour tester error.tsx");
  }

  return (
    <section className="flex min-h-[60vh] items-center justify-center">
      <div className="bg-white text-slate-900 rounded-xl p-8 shadow">
        <h1 className="text-2xl font-bold mb-4">
          Test Error
        </h1>

        <p>
          Cette page ne déclenche l&apos;erreur qu&apos;en mode développement.
        </p>
      </div>
    </section>
  );
}
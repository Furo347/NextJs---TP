async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function TestLoadingPage() {
  await wait(3000);

  return (
    <section className="bg-white text-slate-900 rounded-xl p-6">
      <h1 className="text-3xl font-bold">Page test loading</h1>
      <p className="mt-4">
        Si tu vois ce message, le chargement est terminé.
      </p>
    </section>
  );
}
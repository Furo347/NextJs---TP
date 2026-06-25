export default function SponsoredLoading() {
  return (
    <section className="mt-10 bg-white text-slate-900 rounded-xl p-6 animate-pulse">
      <div className="h-4 bg-slate-200 rounded w-32 mb-3" />
      <div className="h-7 bg-slate-200 rounded w-64 mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="border rounded-xl p-4">
            <div className="h-40 bg-slate-200 rounded-lg" />
            <div className="h-5 bg-slate-200 rounded mt-4 w-2/3" />
            <div className="h-5 bg-slate-200 rounded mt-3 w-1/3" />
          </div>
        ))}
      </div>
    </section>
  );
}
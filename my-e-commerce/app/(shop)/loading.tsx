export default function ShopLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-slate-900" />

        <p className="text-slate-700">Chargement de la boutique...</p>
      </div>
    </div>
  );
}
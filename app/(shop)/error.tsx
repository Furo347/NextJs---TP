"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="bg-white text-slate-900 rounded-xl p-8 shadow">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Oups, une erreur est survenue !
        </h2>

        <p className="mb-4">{error.message}</p>

        <button
          onClick={() => reset()}
          className="bg-slate-900 text-white px-4 py-2 rounded"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}
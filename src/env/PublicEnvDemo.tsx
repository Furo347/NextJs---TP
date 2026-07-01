"use client";

export default function PublicEnvDemo() {
  return (
    <div className="bg-white text-slate-900 rounded-xl p-4 mt-6">
      <h2 className="font-bold">Variable publique</h2>
      <p>{process.env.NEXT_PUBLIC_SITE_NAME}</p>
    </div>
  );
}
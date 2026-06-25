export default function ProductLayout({
  children,
  similar,
  sponsored,
}: {
  children: React.ReactNode;
  similar: React.ReactNode;
  sponsored: React.ReactNode;
}) {
  return (
    <>
      {children}

      <div className="mt-10 space-y-10">
        {similar}
        {sponsored}
      </div>
    </>
  );
}
export default function Privacy() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">Privacy Policy</h1>
      <p className="mt-3 opacity-80">
        RentBack Technologies (Pvt) Ltd respects your privacy. This demo does not collect
        personal data beyond basic, local-only demo cookies. For inquiries, email
        <a className="underline ml-1" href="mailto:help@rentback.app">help@rentback.app</a>.
      </p>
      <h2 className="mt-8 font-semibold">Data in this demo</h2>
      <ul className="list-disc pl-6 mt-2 opacity-80">
        <li>Local demo cookie for role-based navigation (tenant/landlord/admin).</li>
        <li>No payments are processed; all data shown is mock.</li>
      </ul>
    </main>
  );
}

export default function Terms() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">Terms of Use</h1>
      <p className="mt-3 opacity-80">
        This is a non-production demo by RentBack Technologies (Pvt) Ltd. All screens and
        flows are illustrative only and may change. No real financial services are being
        provided on this site.
      </p>
      <h2 className="mt-8 font-semibold">Acceptable Use</h2>
      <ul className="list-disc pl-6 mt-2 opacity-80">
        <li>Do not upload sensitive or real personal data.</li>
        <li>Do not rely on this demo for actual payments or receipts.</li>
      </ul>
      <p className="mt-6 opacity-80">
        Questions? <a className="underline" href="mailto:help@rentback.app">help@rentback.app</a>
      </p>
    </main>
  );
}

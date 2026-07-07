export default function VerifyRequestPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-page">
      <div className="w-full max-w-[360px] px-6 text-center">
        <p className="font-mono text-xs text-accent uppercase tracking-widest mb-2">
          NORA
        </p>
        <h1 className="text-2xl font-semibold text-ink mb-3 tracking-tight">
          Check your email
        </h1>
        <p className="text-sm text-secondary leading-relaxed">
          A sign-in link was sent to your address. Click the link in the email
          to continue — it expires in 24 hours.
        </p>
        <p className="font-mono text-xs text-secondary mt-6">
          You can close this tab.
        </p>
      </div>
    </main>
  );
}

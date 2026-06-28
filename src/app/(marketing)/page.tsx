export default function HomePage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">
        Phase 0 scaffold
      </p>
      <h1 className="font-sans text-3xl font-semibold tracking-tight text-ink">
        {"Marketing home page — Task 4"}
      </h1>
      <p className="max-w-md font-sans text-sm text-secondary">
        {"Built in Task 4. See "}
        <code className="rounded bg-raised px-1.5 py-0.5 font-mono text-[11px]">
          docs/wiki/phase-1-implementation-plan.md
        </code>
        {" for the plan."}
      </p>
    </div>
  );
}

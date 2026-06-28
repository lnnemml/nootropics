export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">
        NeuroDrive Platform
      </h1>
      <p className="max-w-md text-zinc-600 dark:text-zinc-400">
        Phase 0 scaffold. Marketing home page — built in Phase 1. See{" "}
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800">
          docs/wiki/roadmap.md
        </code>{" "}
        for the plan.
      </p>
    </main>
  );
}

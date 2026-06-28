function Swatch({
  bg,
  label,
  textClass = "text-secondary",
}: {
  bg: string;
  label: string;
  textClass?: string;
}) {
  return (
    <div className={`${bg} border border-border rounded p-3`}>
      <p className={`${textClass} font-mono text-[11px] uppercase tracking-widest`}>
        {label}
      </p>
    </div>
  );
}

function Panel({ dark }: { dark?: boolean }) {
  return (
    <div className={`${dark ? "dark" : ""} bg-page p-10 flex flex-col gap-8`}>
      <p className="font-mono text-[11px] uppercase tracking-widest text-secondary">
        {dark ? "Dark mode" : "Light mode"}
      </p>

      {/* Surfaces */}
      <section className="flex flex-col gap-2">
        <p className="font-mono text-[10px] uppercase tracking-wider text-secondary mb-1">Surfaces</p>
        <Swatch bg="bg-page"   label="bg-page   #FAFAF7 / #0A0A0A" />
        <Swatch bg="bg-raised" label="bg-raised  #F3F3EE / #2E3A3C" />
        <Swatch bg="bg-card"   label="bg-card    #FFFFFF / #0A0A0A" />
      </section>

      {/* Text */}
      <section className="flex flex-col gap-2">
        <p className="font-mono text-[10px] uppercase tracking-wider text-secondary mb-1">Text</p>
        <p className="text-primary text-lg font-sans">text-primary — Space Grotesk 400</p>
        <p className="text-ink font-semibold text-lg font-sans">text-ink — Space Grotesk 600 (brand graphic)</p>
        <p className="text-secondary text-sm font-sans">text-secondary — muted / eyebrow</p>
        <p className="text-accent font-sans">text-accent #1E9C78</p>
        <p className="text-accent-bright font-sans">text-accent-bright #14B089</p>
      </section>

      {/* Mono type */}
      <section className="flex flex-col gap-2">
        <p className="font-mono text-[10px] uppercase tracking-wider text-secondary mb-1">Mono (JetBrains)</p>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">
          EYEBROW LABEL — MONO 400
        </p>
        <p className="font-mono text-[11px] font-medium tracking-[0.14em] text-secondary">
          CTA PILL TEXT — MONO 500
        </p>
      </section>

      {/* Border */}
      <section>
        <p className="font-mono text-[10px] uppercase tracking-wider text-secondary mb-2">Border (1px border-border)</p>
        <div className="border border-border rounded p-4">
          <p className="text-primary text-sm">Card with hairline border</p>
        </div>
      </section>

      {/* Radius */}
      <section>
        <p className="font-mono text-[10px] uppercase tracking-wider text-secondary mb-2">Radius (all ≤ 3px)</p>
        <div className="flex gap-3">
          {(["rounded-sm", "rounded", "rounded-md", "rounded-lg", "rounded-xl"] as const).map((r) => (
            <div key={r} className={`${r} bg-accent w-10 h-10`} title={r} />
          ))}
        </div>
        <p className="font-mono text-[10px] text-secondary mt-2">
          sm=1px · default=2px · md=2px · lg=3px · xl=3px
        </p>
      </section>

      {/* Accent swatches */}
      <section>
        <p className="font-mono text-[10px] uppercase tracking-wider text-secondary mb-2">Accent</p>
        <div className="flex gap-3">
          <div className="bg-accent rounded w-10 h-10" title="accent #1E9C78" />
          <div className="bg-accent-bright rounded w-10 h-10" title="accent-bright #14B089" />
          <div className="bg-ink rounded w-10 h-10" title="ink #2E3A3C" />
        </div>
      </section>

      {/* H1 sample */}
      <section>
        <p className="font-mono text-[10px] uppercase tracking-wider text-secondary mb-2">H1 sample</p>
        <h1
          className="text-ink font-semibold leading-none tracking-tight"
          style={{ fontSize: "clamp(40px, 6vw, 74px)", letterSpacing: "-0.027em" }}
        >
          NORA
        </h1>
      </section>
    </div>
  );
}

export default function TestTokensPage() {
  return (
    <div className="grid grid-cols-2 min-h-screen">
      <Panel />
      <Panel dark />
    </div>
  );
}

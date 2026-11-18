// Class strings for the client forms, kept apart from ui.tsx so they add nothing server-only to a
// client bundle.

export const FIELD_CLASS =
  "w-full border border-border rounded-[2px] bg-page px-3 py-2 font-sans text-[13px] text-ink focus:outline-none focus:border-accent transition-colors disabled:opacity-50";

export const FIELD_LABEL_CLASS = "font-mono text-[10px] uppercase tracking-[0.12em] text-ink/50";

export const PRIMARY_BUTTON =
  "rounded-[2px] border border-accent px-3 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-accent transition-colors hover:bg-accent hover:text-white disabled:opacity-50";

export const SECONDARY_BUTTON =
  "rounded-[2px] border border-border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-secondary transition-colors hover:border-accent/50 disabled:opacity-50";

export const DANGER_BUTTON =
  "rounded-[2px] border border-red-500/60 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-red-500 transition-colors hover:bg-red-500/10 disabled:opacity-50";

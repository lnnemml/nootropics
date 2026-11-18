"use client";

// Pick a NORA broadcast, then test it to the admin inbox or send it to the whole segment.
import { useState, useTransition } from "react";
import { PRIMARY_BUTTON, SECONDARY_BUTTON, DANGER_BUTTON, FIELD_CLASS, FIELD_LABEL_CLASS } from "../form-styles";
import { sendBroadcast, sendTestToAdmin, syncContactsFromOrders, type CampaignResult } from "./actions";

export interface BroadcastOption {
  id: string;
  label: string;
}

function ResultLine({ result }: { result: CampaignResult | null }) {
  if (!result) return null;
  return "error" in result ? (
    <span className="font-mono text-xs text-red-500">{result.error}</span>
  ) : (
    <span className="font-mono text-xs text-accent">{result.message}</span>
  );
}

export function BroadcastControls({ options }: { options: BroadcastOption[] }) {
  const [selected, setSelected] = useState(options[0]?.id ?? "");
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<CampaignResult | null>(null);

  function run(action: () => Promise<CampaignResult>) {
    setResult(null);
    startTransition(async () => setResult(await action()));
  }

  function onSend() {
    const label = options.find((o) => o.id === selected)?.label ?? selected;
    if (!window.confirm(`Send this broadcast to EVERY contact in NORA's segment?\n\n${label}\n\nThis cannot be undone.`)) {
      return;
    }
    run(() => sendBroadcast(selected));
  }

  if (options.length === 0) {
    return (
      <p className="font-mono text-xs text-ink/50">
        {"No broadcasts on NORA's segment yet. Create one in Resend with this segment as its audience, then it appears here."}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label htmlFor="broadcast-select" className={FIELD_LABEL_CLASS}>
          {"Broadcast"}
        </label>
        <select
          id="broadcast-select"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          disabled={pending}
          className={FIELD_CLASS}
        >
          {options.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => run(() => sendTestToAdmin(selected))} disabled={pending || !selected} className={SECONDARY_BUTTON}>
          {pending ? "Working…" : "Send test to admin"}
        </button>
        <button type="button" onClick={onSend} disabled={pending || !selected} className={DANGER_BUTTON}>
          {pending ? "Working…" : "Send to segment"}
        </button>
      </div>
      <ResultLine result={result} />
    </div>
  );
}

export function SyncContactsButton() {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<CampaignResult | null>(null);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        disabled={pending}
        className={PRIMARY_BUTTON}
        onClick={() => {
          setResult(null);
          startTransition(async () => setResult(await syncContactsFromOrders()));
        }}
      >
        {pending ? "Syncing…" : "Sync contacts from orders"}
      </button>
      <ResultLine result={result} />
    </div>
  );
}

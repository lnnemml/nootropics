"use client";

// Records a payout already sent. A payout cannot be edited or deleted afterwards, so going over
// the balance warns but stays allowed: the amount is what really left the wallet.
import { useState, useTransition } from "react";
import { PAYOUT_CURRENCIES, parseUsdToCents, type PayoutInput } from "@/lib/affiliate/core";
import { recordPayout } from "../actions";
import { FIELD_CLASS, FIELD_LABEL_CLASS, PRIMARY_BUTTON } from "../../form-styles";

const TEXT_FIELDS: readonly {
  key: keyof PayoutInput;
  label: string;
  type?: "date";
  inputMode?: "decimal";
  mono?: boolean;
  wide?: boolean;
}[] = [
  { key: "amountUsd", label: "Amount (USD)", inputMode: "decimal" },
  { key: "cryptoAmount", label: "Crypto amount", inputMode: "decimal", mono: true },
  { key: "paidAt", label: "Paid on (UTC)", type: "date" },
  { key: "txHash", label: "Tx hash", mono: true, wide: true },
  { key: "periodStart", label: "Period start", type: "date" },
  { key: "periodEnd", label: "Period end", type: "date" },
];

export function PayoutForm({
  affiliateId,
  balanceCents,
  balanceLabel,
  today,
}: {
  affiliateId: string;
  balanceCents: number;
  balanceLabel: string;
  today: string;
}) {
  const blank: PayoutInput = {
    amountUsd: "",
    currency: PAYOUT_CURRENCIES[0],
    cryptoAmount: "",
    txHash: "",
    periodStart: "",
    periodEnd: "",
    paidAt: today,
  };

  const [pending, startTransition] = useTransition();
  const [values, setValues] = useState<PayoutInput>(blank);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const amountCents = parseUsdToCents(values.amountUsd);
  const overBalance = amountCents !== null && amountCents > balanceCents;

  function update(key: keyof PayoutInput, value: string) {
    setValues({ ...values, [key]: value });
    setSaved(false);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    startTransition(async () => {
      const res = await recordPayout(affiliateId, values);
      if ("error" in res) {
        setError(res.error);
        return;
      }
      setValues(blank);
      setSaved(true);
    });
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="payout-currency" className={FIELD_LABEL_CLASS}>
            {"Currency"}
          </label>
          <select
            id="payout-currency"
            value={values.currency}
            onChange={(e) => update("currency", e.target.value)}
            disabled={pending}
            className={FIELD_CLASS}
          >
            {PAYOUT_CURRENCIES.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        {TEXT_FIELDS.map((field) => {
          const id = `payout-${field.key}`;
          return (
            <div key={field.key} className={`flex flex-col gap-1 ${field.wide ? "sm:col-span-2" : ""}`}>
              <label htmlFor={id} className={FIELD_LABEL_CLASS}>
                {field.label}
              </label>
              <input
                id={id}
                type={field.type}
                value={values[field.key]}
                onChange={(e) => update(field.key, e.target.value)}
                inputMode={field.inputMode}
                disabled={pending}
                className={`${FIELD_CLASS} ${field.mono ? "font-mono" : ""}`}
              />
            </div>
          );
        })}
      </div>

      {overBalance && (
        <span className="font-mono text-xs text-amber-500">
          {`This is more than the current balance of ${balanceLabel}. You can still record it, and the balance will go negative.`}
        </span>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={pending} className={PRIMARY_BUTTON}>
          {pending ? "Recording…" : "Record payout"}
        </button>
        {error && <span className="font-mono text-xs text-red-500">{error}</span>}
        {saved && <span className="font-mono text-xs text-accent">{"Payout recorded."}</span>}
      </div>
    </form>
  );
}

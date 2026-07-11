"use client";

import { useState } from "react";

interface CopyButtonProps {
  text: string;
  label?: string;
}

export default function CopyButton({ text, label = "Copy" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="font-mono text-[10px] uppercase tracking-[0.1em] px-2.5 py-1.5 border border-border rounded-[2px] text-secondary hover:border-accent/50 hover:text-accent transition-colors whitespace-nowrap"
    >
      {copied ? "Copied!" : label}
    </button>
  );
}

import type { ReactNode } from "react";

interface StudyCiteProps {
  children: ReactNode;
  pmid?: string;
  source: string;
}

export function StudyCite({ children, pmid, source }: StudyCiteProps) {
  const sourceNode = pmid ? (
    <a
      href={`https://pubmed.ncbi.nlm.nih.gov/${pmid}/`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent hover:underline underline-offset-2"
    >
      {source}
    </a>
  ) : (
    <span>{source}</span>
  );

  return (
    <div className="my-6 border-l-2 border-accent bg-raised px-5 py-4 rounded-[2px]">
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-secondary">
        {sourceNode}
      </p>
      <div className="font-sans text-[14px] leading-relaxed text-secondary">
        {children}
      </div>
    </div>
  );
}

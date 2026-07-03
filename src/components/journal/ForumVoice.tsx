import type { ReactNode } from "react";

interface ForumVoiceProps {
  children: ReactNode;
  source?: string;
}

export function ForumVoice({ children, source }: ForumVoiceProps) {
  return (
    <blockquote className="my-6 border-l border-border pl-5">
      <div className="font-sans text-[15px] italic leading-relaxed text-secondary">
        {children}
      </div>
      {source && (
        <p className="mt-2 font-mono text-[10px] text-secondary opacity-70">
          {source}
        </p>
      )}
    </blockquote>
  );
}

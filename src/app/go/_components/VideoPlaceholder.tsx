interface VideoPlaceholderProps {
  aspectRatio?: "16:9" | "9:16" | "1:1";
  label: string;
}

const ASPECT_MAP: Record<string, string> = {
  "16:9": "aspect-video",
  "9:16": "aspect-[9/16]",
  "1:1": "aspect-square",
};

export function VideoPlaceholder({ aspectRatio = "16:9", label }: VideoPlaceholderProps) {
  return (
    <div
      className={`relative w-full ${ASPECT_MAP[aspectRatio]} bg-[#374151] rounded-[2px] flex flex-col items-center justify-center gap-3`}
    >
      <div className="w-14 h-14 border-2 border-white/30 rounded-[2px] flex items-center justify-center">
        <div className="w-0 h-0 border-t-[9px] border-t-transparent border-b-[9px] border-b-transparent border-l-[16px] border-l-white/50 ml-1" />
      </div>
      <p className="font-mono text-xs text-white/40 uppercase tracking-wider text-center px-4">
        {label}
      </p>
    </div>
  );
}

interface VideoPlaceholderProps {
  aspectRatio?: "16:9" | "9:16" | "1:1";
  label: string;
  duration?: string;
}

const ASPECT_MAP: Record<string, string> = {
  "16:9": "aspect-video",
  "9:16": "aspect-[9/16]",
  "1:1": "aspect-square",
};

export function VideoPlaceholder({
  aspectRatio = "16:9",
  label,
  duration = "1:30",
}: VideoPlaceholderProps) {
  return (
    <div
      className={`group relative w-full ${ASPECT_MAP[aspectRatio]} rounded-[2px] border border-white/[0.1] overflow-hidden transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_24px_48px_-16px_rgba(0,0,0,0.7)]`}
      style={{ background: "linear-gradient(180deg, #374151 0%, #2b3235 100%)" }}
    >
      {/* Glass play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-white/[0.12] border border-white/40 backdrop-blur-lg flex items-center justify-center">
          <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] border-l-white ml-1" />
        </div>
      </div>
      {/* Duration chip */}
      <div className="absolute bottom-3 right-3 bg-black/50 px-2 py-0.5 rounded-[2px]">
        <span className="font-mono text-[10px] text-white/80">{duration}</span>
      </div>
      {/* Label */}
      <div className="absolute bottom-3 left-3">
        <span className="font-mono text-[10px] uppercase tracking-wider text-white/50">
          {label}
        </span>
      </div>
    </div>
  );
}

import Image from "next/image";

interface VideoPlaceholderProps {
  aspectRatio?: "16:9" | "9:16" | "1:1";
  label: string;
  duration?: string;
  posterSrc?: string;
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
  posterSrc,
}: VideoPlaceholderProps) {
  return (
    <div
      className={`group relative w-full ${ASPECT_MAP[aspectRatio]} rounded-[2px] border border-white/[0.1] overflow-hidden cursor-pointer transition-all duration-[250ms] hover:-translate-y-[3px] hover:shadow-[0_24px_48px_-20px_rgba(0,0,0,0.6)]`}
      style={!posterSrc ? { background: "linear-gradient(180deg, #374151 0%, #2b3235 100%)" } : undefined}
    >
      {posterSrc && (
        <Image
          src={posterSrc}
          alt={label}
          fill
          className="object-cover opacity-85"
        />
      )}
      {posterSrc && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-black/10" />
      )}
      {/* Glass play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-white/[0.12] border border-white/40 backdrop-blur-[8px] flex items-center justify-center">
          <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] border-l-white ml-1" />
        </div>
      </div>
      {/* Bottom row: label + duration chip */}
      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/85">
          {label}
        </span>
        <span className="font-mono text-[10px] text-white/70 bg-black/50 px-[7px] py-[3px] rounded-[2px]">
          {duration}
        </span>
      </div>
    </div>
  );
}

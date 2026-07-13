interface ImagePlaceholderProps {
  aspectRatio?: string;
  label: string;
}

export function ImagePlaceholder({ aspectRatio = "16/9", label }: ImagePlaceholderProps) {
  return (
    <div
      className="relative w-full bg-[#4b5563] rounded-[2px] flex items-center justify-center"
      style={{ aspectRatio }}
    >
      <p className="font-mono text-xs text-white/40 uppercase tracking-wider text-center px-4">
        {label}
      </p>
    </div>
  );
}

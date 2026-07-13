interface BenefitIconProps {
  icon: string;
  label: string;
}

export function BenefitIcon({ icon, label }: BenefitIconProps) {
  return (
    <div className="flex flex-col items-center gap-2 min-w-[80px]">
      <span className="text-2xl" aria-hidden="true">
        {icon}
      </span>
      <span className="font-mono text-xs font-medium text-center leading-tight">{label}</span>
    </div>
  );
}

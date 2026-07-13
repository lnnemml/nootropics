import { LpSection } from "../_components/LpSection";
import { BenefitIcon } from "../_components/BenefitIcon";

const BENEFITS = [
  { icon: "🧬", label: "Non-Stimulant" },
  { icon: "⚡", label: "No Crash" },
  { icon: "📈", label: "No Tolerance" },
  { icon: "💧", label: "Sublingual Drops" },
  { icon: "🧪", label: "NMR-Verified" },
  { icon: "⚖️", label: "Legal Worldwide" },
  { icon: "🎯", label: "One Ingredient" },
];

export function S05BenefitIcons() {
  return (
    <LpSection variant="light" padding="py-10 md:py-12">
      <div className="flex flex-wrap md:flex-nowrap justify-center gap-6 md:gap-8">
        {BENEFITS.map((b) => (
          <BenefitIcon key={b.label} icon={b.icon} label={b.label} />
        ))}
      </div>
    </LpSection>
  );
}

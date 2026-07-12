import { LpSection } from "../_components/LpSection";

export function S02Problem() {
  return (
    <LpSection id="problem" variant="light">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-sans text-3xl md:text-4xl font-bold text-[#2b3235] mb-8">
          Your Brain Is Running on Empty
        </h2>

        <div className="flex flex-col gap-5 font-sans text-[16px] text-[#334d48] leading-relaxed">
          <p>
            {"You sit down to work and your mind just... stalls. The tab is open. The task is clear. But you can't get started — and you don't know why."}
          </p>
          <p>
            {"You reach for more coffee. Maybe a pre-workout. You push through. For a while it works — then it stops working, and you need even more just to feel normal."}
          </p>
          <p>
            {"You're not lazy. You're not burned out. Your dopamine system is depleted — and everything you're doing to fix it is making it worse."}
          </p>
          <p className="font-medium text-[#2b3235]">
            {"Motivation isn't a mindset problem. It's a neurochemistry problem."}
          </p>
        </div>
      </div>
    </LpSection>
  );
}

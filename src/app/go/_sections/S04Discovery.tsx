import { LpSection } from "../_components/LpSection";

export function S04Discovery() {
  return (
    <LpSection id="discovery" variant="light">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#1e9c78] mb-4">
            The Science
          </p>
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-[#2b3235] mb-6">
            {"The Compound Western Pharma Never Commercialized"}
          </h2>

          <div className="flex flex-col gap-4 font-sans text-[15px] text-[#334d48] leading-relaxed">
            <p>
              {"Actoprotectors are a class of compounds designed to increase physical and cognitive performance without the cost of depletion. They don't borrow — they build."}
            </p>
            <p>
              {"Bromantane is an actoprotector developed for extreme-performance research. Unlike stimulants that flood your synapses with stored dopamine, it works upstream — upregulating tyrosine hydroxylase, the rate-limiting enzyme that controls how much dopamine your brain can actually synthesize."}
            </p>
            <p>
              {"The result: your dopamine system doesn't get hijacked. It gets trained."}
            </p>
          </div>

          <div className="mt-8 border border-[#1e9c78]/20 rounded-[2px] p-5 bg-[#1e9c78]/5">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#1e9c78] mb-2">
              NeuroDrive
            </p>
            <p className="font-sans text-[14px] text-[#2b3235]">
              {"30ml sublingual drops · 80mg/ml · Pharmaceutical-grade MCT oil · NMR-verified ≥98% purity"}
            </p>
          </div>
        </div>

        <div className="aspect-[3/4] w-full max-w-xs mx-auto md:mx-0 md:max-w-none bg-gray-100 rounded-[2px] border border-gray-200 flex items-center justify-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-gray-400">
            Product Image
          </p>
        </div>
      </div>
    </LpSection>
  );
}

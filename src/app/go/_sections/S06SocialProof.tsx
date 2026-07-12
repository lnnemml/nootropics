import { LpSection } from "../_components/LpSection";

const QUOTES = [
  {
    text: '"Two weeks in and I noticed I could sit down and actually start. No procrastination spiral, no music to drown out the anxiety. Just... working."',
    attr: "Developer, r/nootropics",
  },
  {
    text: '"I was skeptical — tried everything. This is the first thing that felt like it was restoring something rather than just masking the problem."',
    attr: "Community member",
  },
  {
    text: '"The calm focus is the part nobody talks about. I expected more stimulation. It\'s almost the opposite — quieter, but sharper."',
    attr: "Writer, bromantane forum",
  },
];

function PlayIcon() {
  return (
    <div className="w-14 h-14 rounded-full border-2 border-gray-300 flex items-center justify-center bg-white/80">
      <div
        className="w-0 h-0 ml-1"
        style={{
          borderTop: "10px solid transparent",
          borderBottom: "10px solid transparent",
          borderLeft: "16px solid #9ca3af",
        }}
      />
    </div>
  );
}

export function S06SocialProof() {
  return (
    <LpSection id="social-proof" variant="light">
      <div className="text-center mb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#1e9c78] mb-3">
          From the Community
        </p>
        <h2 className="font-sans text-3xl md:text-4xl font-bold text-[#2b3235]">
          {"What the Community Is Saying"}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="aspect-video bg-gray-100 rounded-[2px] border border-gray-200 flex items-center justify-center"
          >
            <PlayIcon />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {QUOTES.map((q) => (
          <div
            key={q.attr}
            className="border border-gray-200 rounded-[2px] p-6 bg-white"
          >
            <p className="font-sans text-[15px] text-[#334d48] leading-relaxed mb-4 italic">
              {q.text}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-gray-400">
              {q.attr}
            </p>
          </div>
        ))}
      </div>
    </LpSection>
  );
}

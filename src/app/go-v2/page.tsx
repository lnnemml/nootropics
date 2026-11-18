import { S00TopBar } from "./_sections/S00TopBar";
import { S01Hero } from "./_sections/S01Hero";
import { S02SocialProofBar } from "./_sections/S02SocialProofBar";
import { S03PainSection } from "./_sections/S03PainSection";
import { S04UgcProof } from "./_sections/S04UgcProof";
import { S05BenefitIcons } from "./_sections/S05BenefitIcons";
import { S06ValueProp1 } from "./_sections/S06ValueProp1";
import { S07ValueProp2 } from "./_sections/S07ValueProp2";
import { S08Mechanism } from "./_sections/S08Mechanism";
import { S10Differentiators } from "./_sections/S10Differentiators";
import { S11TrustBar } from "./_sections/S11TrustBar";
import { S12ValueProp3 } from "./_sections/S12ValueProp3";
import { S14Faq } from "./_sections/S14Faq";
import { S15FinalCta } from "./_sections/S15FinalCta";
import { S16Footer } from "./_sections/S16Footer";
import { StickyMobileCta } from "./_components/StickyMobileCta";

export default function GoPage() {
  return (
    <>
      {/* go-v2 REORDER (Stage 4→5): hero states the reframe, so proof-of-reframe
          (S08 Mechanism) and us-vs-them (S10) are pulled ahead of the value-prop
          deep-dives. S09 and S13 (fabricated-testimonial sections) are CUT —
          pre-revenue, no real customer proof exists; trust is carried by S02
          (lab/research badges) and S04 (NMR + research + transparency) instead. */}
      <S00TopBar />
      <S01Hero />
      <S02SocialProofBar />
      <S03PainSection />
      <S08Mechanism />
      <S04UgcProof />
      <S05BenefitIcons />
      <S10Differentiators />
      <S06ValueProp1 />
      <S07ValueProp2 />
      <S12ValueProp3 />
      <S11TrustBar />
      <S14Faq />
      <S15FinalCta />
      <S16Footer />
      <StickyMobileCta />
    </>
  );
}

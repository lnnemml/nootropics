import { Container } from "@/components/layout/Container";

const ITEMS = [
  "728-Patient Clinical Trial",
  "Published Peer-Reviewed Research",
  "Unscheduled Compound",
  "Not a Controlled Substance",
];

export function S02SocialProofBar() {
  return (
    <div className="bg-[#f0f1f0] py-4 md:py-5">
      <Container>
        <p className="font-mono text-sm text-[#2b3235]/60 text-center">
          {ITEMS.join(" · ")}
        </p>
      </Container>
    </div>
  );
}

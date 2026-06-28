export interface ProductData {
  slug: string;
  name: string;
  hero: {
    eyebrow: string;
    h1: string;
    subhead: string;
    ctaLabel: string;
    chart: {
      caption: string;
      solidLabel: string;
      dashedPeakLabel: string;
      dashedEndLabel: string;
      legendSolid: string;
      legendDashed: string;
    };
  };
  contrast: {
    eyebrow: string;
    heading: string;
    cards: [
      { eyebrow: string; body: string },
      { eyebrow: string; body: string },
    ];
  };
  mechanism: {
    eyebrow: string;
    body: string;
  };
  principles: [
    { heading: string; body: string },
    { heading: string; body: string },
    { heading: string; body: string },
  ];
}

const PRODUCTS: ProductData[] = [
  {
    slug: "neurodrive",
    name: "NeuroDrive",
    hero: {
      eyebrow: "Sublingual bromantane · actoprotector class",
      h1: "Steady output. Not a stimulant spike.",
      subhead: "NeuroDrive is a sublingual bromantane formula. It works by increasing the rate at which your brain synthesizes dopamine — not by flooding the synapse with what's already there. No spike. No crash. No tolerance buildup.",
      ctaLabel: "Read the mechanism",
      chart: {
        caption: "FIG.01 — SUSTAINED vs. SPIKED",
        solidLabel: "SUSTAINED",
        dashedPeakLabel: "SPIKE",
        dashedEndLabel: "CRASH",
        legendSolid: "NeuroDrive",
        legendDashed: "Stimulants",
      },
    },
    contrast: {
      eyebrow: "The difference",
      heading: "One restores your baseline. The other borrows from it.",
      cards: [
        {
          eyebrow: "NEURODRIVE — SYNTHESIS-LED",
          body: "Bromantane upregulates tyrosine hydroxylase — the rate-limiting enzyme in dopamine synthesis. More of your own dopamine, built on your own rhythm. The effect doesn't peak and drop.",
        },
        {
          eyebrow: "STIMULANTS — RELEASE-LED",
          body: "Forces existing dopamine reserves into the synapse faster. Feels strong. Ends in a crash — and the next dose has less to work with than the last.",
        },
      ],
    },
    mechanism: {
      eyebrow: "Mechanism",
      body: "Bromantane increases production of tyrosine hydroxylase, the enzyme that governs how fast your brain makes dopamine. The result is a higher synthesis rate — not a spike borrowed from tomorrow's reserves.",
    },
    principles: [
      {
        heading: "No spike, no crash",
        body: "Synthesis-based upregulation builds toward a stable ceiling. Your output at hour six looks like your output at hour one.",
      },
      {
        heading: "No tolerance buildup",
        body: "Bromantane does not downregulate its own pathway. The effect doesn't require escalating doses to maintain.",
      },
      {
        heading: "Sublingual delivery",
        body: "Under-tongue absorption bypasses first-pass liver metabolism. Faster onset, less compound lost in transit.",
      },
    ],
  },
];

export function getProduct(slug: string): ProductData | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return PRODUCTS.map((p) => p.slug);
}

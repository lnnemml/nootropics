interface FormulaRow {
  name: string;
  value: string;
}

interface ProtocolStep {
  text: string;
}

export interface FAQItem {
  q: string;
  a: string;
  journalLink?: boolean;
}

export interface ProductData {
  slug: string;
  name: string;
  hero: {
    eyebrow: string;
    h1: string;
    subhead: string;
    ctaLabel: string;
    imageSrc: string;
    imageAlt: string;
    attributes: string;
    price: string;
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
  formula: {
    composition: FormulaRow[];
    protocol: ProtocolStep[];
    journalHref: string;
  };
  faq: FAQItem[];
}

const PRODUCTS: ProductData[] = [
  {
    slug: "neurodrive",
    name: "NeuroDrive",
    hero: {
      eyebrow: "RELEASE 01 · SUBLINGUAL BROMANTANE DROPS",
      h1: "NeuroDrive",
      subhead:
        "Dopamine synthesis support. Without the stimulant architecture.",
      ctaLabel: "Place an order",
      imageSrc: "/neurodrive-bottle.jpg",
      imageAlt: "NeuroDrive — 30ml amber sublingual dropper bottle",
      attributes: "30 ml · 80 mg/ml · ~30 day supply",
      price: "$120",
    },
    contrast: {
      eyebrow: "The mechanism",
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
    formula: {
      composition: [
        { name: "Bromantane", value: "80 mg/ml" },
        { name: "MCT oil (pharmaceutical grade)", value: "carrier" },
        { name: "Peppermint oil", value: "0.1%" },
      ],
      protocol: [
        {
          text: "Measure 0.5–1 ml with the calibrated dropper (40–80 mg bromantane)",
        },
        { text: "Hold under tongue for 60 seconds" },
        { text: "Swallow — onset typically within 20–30 min" },
      ],
      journalHref: "/blog",
    },
    faq: [
      {
        q: "Is bromantane safe for daily use?",
        a: "Bromantane has a well-documented safety profile from decades of clinical use as a treatment for asthenia and chronic fatigue, with no serious adverse events at therapeutic doses. It is non-addictive and shows no abuse potential in the research literature — the mechanism (gradual upregulation of dopamine synthesis) does not produce the reinforcing dopamine surge associated with dependency. Start at 40 mg (0.5 ml) to assess individual response before increasing.",
        journalLink: true,
      },
      {
        q: "Is this legal in the US, Canada, and Europe?",
        a: "Bromantane is not a scheduled or controlled substance in the US, Canada, the UK, or the EU — it is legal to purchase and use for personal use in these jurisdictions. It has not gone through FDA or EMA drug approval, primarily because no large pharmaceutical company has sponsored that process. It is prohibited in competitive athletics under the WADA prohibited list, but that restriction applies to sanctioned sport competition only, not to personal use.",
        journalLink: false,
      },
      {
        q: "How is this different from Adderall or modafinil?",
        a: "Adderall and modafinil work by forcing dopamine and norepinephrine out of existing reserves into the synapse — fast and strong, but the reserves are depleted, which is why the crash and tolerance follow. Bromantane works upstream: it upregulates tyrosine hydroxylase, the enzyme that governs dopamine synthesis rate. The result is more dopamine produced over time, not borrowed from tomorrow. There is no spike to crash from and no reservoir being drawn down.",
        journalLink: true,
      },
      {
        q: "Will I build a tolerance?",
        a: "Bromantane has an adaptogenic profile — it modifies a synthesis pathway rather than depleting a reservoir. The research literature and consistent anecdotal reports both indicate it does not produce tolerance the way stimulants do. Many users report stable or improving effect with continued use. This distinguishes it structurally from compounds like caffeine or phenylpiracetam, where efficacy declines with regular use precisely because their mechanism is depletion-based.",
        journalLink: false,
      },
      {
        q: "Will it affect my sleep?",
        a: "Bromantane is not a stimulant in the pharmacological sense — it does not raise cortisol or block adenosine. At recommended doses (40–80 mg), there are no documented sleep-disrupting effects in the literature. Most users dose in the morning. Until you know your individual response, avoid dosing after midday.",
        journalLink: false,
      },
      {
        q: "Why haven't I heard of this before?",
        a: "Bromantane is an actoprotector — a class of compounds developed to increase physical and mental performance under stress without the side effects of classical stimulants. It has been available and used clinically for decades, but no large Western pharmaceutical company ever sponsored it through the FDA or EMA approval process, so it remained outside mainstream awareness. Biohacker and nootropics communities have been documenting it for years. NORA makes it accessible in a formulated, batch-verified form.",
        journalLink: true,
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

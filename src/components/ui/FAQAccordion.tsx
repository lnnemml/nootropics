"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

interface FAQItem {
  q: string;
  a: string;
  journalLink?: boolean;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-12 md:py-[72px] bg-page">
      <Container>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-secondary mb-3">
          Common questions
        </p>
        <h2 className="font-sans font-semibold tracking-[-0.02em] text-ink text-[28px] md:text-[clamp(28px,2.5vw,34px)]">
          {"Before you order."}
        </h2>

        <div className="mt-8 md:mt-10 border-t border-border">
          {items.map((item, i) => (
            <div key={i} className="border-b border-border">
              <button
                className="w-full flex justify-between items-center py-5 cursor-pointer text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="font-sans text-[16px] font-medium text-ink pr-4">
                  {item.q}
                </span>
                <span
                  className={`text-secondary text-[14px] shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                >
                  &#8964;
                </span>
              </button>
              {openIndex === i && (
                <div className="pb-5">
                  <p className="font-sans text-[15px] text-secondary leading-relaxed">
                    {item.a}
                  </p>
                  {item.journalLink && (
                    <Link
                      href="/blog"
                      className="inline-block mt-3 font-sans text-[14px] text-ink underline-offset-2 hover:underline"
                    >
                      {"Read more in the Journal →"}
                    </Link>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

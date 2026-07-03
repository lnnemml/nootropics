import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import {
  getAllArticles,
  formatDate,
  CATEGORY_LABELS,
  type ArticleCategory,
} from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal | NORA",
  description:
    "Mechanism notes, research breakdowns, and evidence reviews from the NORA team.",
};

const CATEGORY_COLORS: Record<ArticleCategory, string> = {
  mechanism: "text-accent",
  research: "text-accent",
  perspective: "text-secondary",
  guide: "text-secondary",
};

export default function BlogIndexPage() {
  const articles = getAllArticles();

  return (
    <section className="py-[80px] md:py-[104px]">
      <Container>
        <div className="mx-auto max-w-[720px]">

          {/* Header */}
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">
            NORA Journal
          </p>
          <h1
            className="font-sans font-semibold tracking-[-0.025em] text-ink"
            style={{ fontSize: "clamp(28px, 3vw, 40px)", lineHeight: 1.1 }}
          >
            Mechanism notes,{" "}
            <span className="text-secondary font-normal">published in the open.</span>
          </h1>
          <p className="mt-4 font-sans text-[15px] leading-relaxed text-secondary max-w-[520px]">
            Research-driven articles on nootropics, cognitive performance, and
            biohacking — written for people who check primary sources.
          </p>

          <div className="mt-10 border-t border-border" />

          {/* Article list */}
          {articles.length === 0 ? (
            <p className="mt-10 font-sans text-[15px] text-secondary">
              First articles in progress — we&apos;re not going to publish
              something half-sourced to fill a content calendar.
            </p>
          ) : (
            <ul className="mt-0">
              {articles.map((article) => (
                <li key={article.slug} className="border-b border-border">
                  <Link
                    href={`/blog/${article.slug}`}
                    className="group block py-8 transition-opacity hover:opacity-80"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`font-mono text-[10px] uppercase tracking-[0.12em] ${CATEGORY_COLORS[article.category]}`}
                      >
                        {CATEGORY_LABELS[article.category]}
                      </span>
                      <span className="font-mono text-[10px] text-secondary opacity-50">
                        —
                      </span>
                      <span className="font-mono text-[10px] text-secondary">
                        {formatDate(article.publishedAt)}
                      </span>
                    </div>

                    <h2 className="font-sans text-[18px] font-semibold leading-snug tracking-[-0.015em] text-ink group-hover:text-accent transition-colors mb-2">
                      {article.title}
                    </h2>

                    <p className="font-sans text-[14px] leading-relaxed text-secondary line-clamp-2 max-w-[560px]">
                      {article.description}
                    </p>

                    <p className="mt-3 font-mono text-[10px] text-secondary">
                      {article.readTime} &middot; Read →
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}

        </div>
      </Container>
    </section>
  );
}

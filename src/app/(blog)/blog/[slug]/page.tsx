import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import { Container } from "@/components/layout/Container";
import { getMdxComponents } from "@/components/journal/mdx-components";
import {
  getArticleBySlug,
  getAllSlugs,
  formatDate,
  CATEGORY_LABELS,
} from "@/lib/journal";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title} | NORA Journal`,
    description: article.description,
    keywords: article.keywords,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const { content } = await compileMDX({
    source: article.content,
    components: getMdxComponents(),
    options: {
      mdxOptions: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rehypePlugins: [rehypeSlug as any],
      },
    },
  });

  return (
    <article className="py-[80px] md:py-[104px]">
      <Container>
        <div className="mx-auto max-w-[720px]">

          {/* Header */}
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
            {CATEGORY_LABELS[article.category]}
          </p>

          <h1
            className="font-sans font-semibold tracking-[-0.025em] text-ink"
            style={{ fontSize: "clamp(26px, 3vw, 38px)", lineHeight: 1.15 }}
          >
            {article.title}
          </h1>

          <div className="mt-4 flex items-center gap-4">
            <span className="font-mono text-[11px] text-secondary">
              {formatDate(article.publishedAt)}
            </span>
            <span className="font-mono text-[11px] text-secondary opacity-40">·</span>
            <span className="font-mono text-[11px] text-secondary">
              {article.readTime}
            </span>
          </div>

          <div className="mt-8 border-t border-border" />

          {/* Prose */}
          <div className="
            mt-8
            [&_h2]:font-sans [&_h2]:text-[18px] [&_h2]:font-semibold
            [&_h2]:tracking-[-0.015em] [&_h2]:text-ink
            [&_h2]:mt-12 [&_h2]:mb-4
            [&_h3]:font-sans [&_h3]:text-[15px] [&_h3]:font-semibold
            [&_h3]:text-ink [&_h3]:mt-8 [&_h3]:mb-3
            [&_p]:font-sans [&_p]:text-[16px] [&_p]:leading-[1.75]
            [&_p]:text-primary [&_p]:mb-5
            [&_strong]:font-medium [&_strong]:text-ink
            [&_em]:italic
            [&_a]:text-accent [&_a]:underline-offset-2 [&_a]:hover:underline
            [&_ul]:mb-5 [&_ul]:pl-5 [&_ul]:list-disc
            [&_ol]:mb-5 [&_ol]:pl-5 [&_ol]:list-decimal
            [&_li]:font-sans [&_li]:text-[16px] [&_li]:leading-[1.75]
            [&_li]:text-primary [&_li]:mb-1
            [&_code]:font-mono [&_code]:text-[13px] [&_code]:bg-raised
            [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-[2px]
            [&_code]:text-ink
            [&_pre]:bg-raised [&_pre]:rounded-[2px] [&_pre]:p-4
            [&_pre]:mb-5 [&_pre]:overflow-x-auto
            [&_pre_code]:bg-transparent [&_pre_code]:px-0 [&_pre_code]:py-0
            [&_hr]:border-border [&_hr]:my-10
          ">
            {content}
          </div>

          {/* Back link */}
          <div className="mt-16 border-t border-border pt-8">
            <a
              href="/blog"
              className="font-mono text-[11px] uppercase tracking-[0.12em] text-secondary hover:text-accent transition-colors"
            >
              ← All articles
            </a>
          </div>

        </div>
      </Container>
    </article>
  );
}

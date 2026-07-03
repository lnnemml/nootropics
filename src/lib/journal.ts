import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const JOURNAL_DIR = path.join(process.cwd(), "content", "journal");

export type ArticleCategory = "mechanism" | "research" | "perspective" | "guide";

export interface ArticleMeta {
  title: string;
  description: string;
  slug: string;
  category: ArticleCategory;
  publishedAt: string;
  updatedAt: string;
  keywords: string[];
  relatedSlugs: string[];
  readTime: string;
  /** relative path from content/journal/, e.g. "mechanism/what-is-an-actoprotector" */
  filePath: string;
}

export interface Article extends ArticleMeta {
  content: string;
}

/** Walk the journal directory and return all .mdx files recursively */
function getMdxFilePaths(): string[] {
  const results: string[] = [];

  function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.name.endsWith(".mdx")) {
        results.push(full);
      }
    }
  }

  if (fs.existsSync(JOURNAL_DIR)) {
    walk(JOURNAL_DIR);
  }

  return results;
}

/** Parse frontmatter + compute readTime for a single file */
function parseFile(filePath: string): Article {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const relativePath = path
    .relative(JOURNAL_DIR, filePath)
    .replace(/\.mdx$/, "");

  const stats = readingTime(content);

  return {
    title: data.title ?? "",
    description: data.description ?? "",
    slug: data.slug ?? path.basename(filePath, ".mdx"),
    category: (data.category as ArticleCategory) ?? "mechanism",
    publishedAt: data.publishedAt ?? "",
    updatedAt: data.updatedAt ?? data.publishedAt ?? "",
    keywords: data.keywords ?? [],
    relatedSlugs: data.relatedSlugs ?? [],
    readTime: stats.text,
    filePath: relativePath,
    content,
  };
}

/** Return all articles sorted newest-first */
export function getAllArticles(): ArticleMeta[] {
  return getMdxFilePaths()
    .map(parseFile)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .map(({ content: _content, ...meta }) => meta);
}

/** Return a single article by slug, or null if not found */
export function getArticleBySlug(slug: string): Article | null {
  const files = getMdxFilePaths();
  for (const filePath of files) {
    const article = parseFile(filePath);
    if (article.slug === slug) {
      return article;
    }
  }
  return null;
}

/** Return all slugs (for generateStaticParams) */
export function getAllSlugs(): string[] {
  return getMdxFilePaths().map((filePath) => {
    const article = parseFile(filePath);
    return article.slug;
  });
}

/** Format a publishedAt date string for display: "July 10, 2026" */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00Z");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Category display labels */
export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  mechanism: "Mechanism",
  research: "Research",
  perspective: "Perspective",
  guide: "Guide",
};

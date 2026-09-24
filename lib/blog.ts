import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export interface PostFrontmatter {
  title: string;
  date: string;
  description: string;
  slug: string;
}

export interface PostMeta extends PostFrontmatter {}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}

/**
 * Read all MDX files from content/posts/, parse frontmatter, return sorted by date (newest first).
 */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const fileNames = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  const posts: PostMeta[] = [];

  for (const fileName of fileNames) {
    const fullPath = path.join(POSTS_DIR, fileName);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data } = matter(raw);
    const meta = data as PostFrontmatter;
    if (meta.title && meta.date && meta.slug) {
      posts.push(meta);
    }
  }

  return posts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

/**
 * Fetch a single post by slug. Returns null if not found.
 */
export function getPostBySlug(slug: string): Post | null {
  if (!fs.existsSync(POSTS_DIR)) return null;

  const fileNames = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));

  for (const fileName of fileNames) {
    const fullPath = path.join(POSTS_DIR, fileName);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(raw);
    const meta = data as PostFrontmatter;
    if (meta.slug === slug) {
      return { slug: meta.slug, frontmatter: meta, content };
    }
  }

  return null;
}

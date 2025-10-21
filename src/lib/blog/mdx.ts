import { compile } from "@mdx-js/mdx";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost, BlogFrontmatter } from "./types";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export async function getBlogPost(slug: string): Promise<BlogPost> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Blog post not found: ${slug}`);
  }

  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);

  const compiled = await compile(content, { jsx: true });

  return {
    ...(data as BlogFrontmatter),
    content: compiled.value,
    filePath,
  };
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"));

  const posts = await Promise.all(
    files.map((f) => getBlogPost(f.replace(".mdx", "")))
  );

  // Sort by date, newest first
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter((p) => p.tags.includes(tag));
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllBlogPosts();
  const tags = new Set(posts.flatMap((p) => p.tags));
  return Array.from(tags).sort();
}

export async function getBlogPostsByAuthor(author: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter((p) => p.author === author);
}

export async function getAllAuthors(): Promise<string[]> {
  const posts = await getAllBlogPosts();
  const authors = new Set(posts.map((p) => p.author));
  return Array.from(authors).sort();
}

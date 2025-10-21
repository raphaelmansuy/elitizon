# Blog Implementation Guide

**Quick Reference for Adding Blog to ELITIZON**

**Status:** Implementation Ready  
**Estimated Duration:** 3-4 weeks  
**Difficulty:** Medium (if unfamiliar with MDX, Low if familiar)

---

## Why Native Next.js Over Docusaurus?

| Factor | Impact |
|--------|--------|
| **Build System** | Single vs. two pipelines |
| **SEO** | Unified domain authority vs. fragmented subdomains |
| **Design System** | Shared Tailwind + components vs. separate theming |
| **Deployment** | One vs. two deployments |
| **Team Fit** | Familiar framework vs. new framework learning curve |
| **Maintenance** | One codebase vs. two codebases |

**Bottom Line:** Native Next.js avoids infrastructure duplication, maintains SEO advantage of single domain, and leverages existing ELITIZON architecture patterns. Team already knows Next.js 15 App Router.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│         Single Next.js 15 Application               │
├─────────────────────────────────────────────────────┤
│                                                     │
│  src/app/blog/page.tsx (index)                      │
│  src/app/blog/[slug]/page.tsx (post detail)         │
│  src/app/blog/tag/[tag]/page.tsx (filtering)        │
│  src/app/blog/api/search/route.ts (search)          │
│                                                     │
│  ↓ Uses MDX Content ↓                               │
│                                                     │
│  content/blog/*.mdx (markdown + React components)   │
│                                                     │
│  ↓ Compiled by ↓                                    │
│                                                     │
│  lib/blog/mdx.ts (MDX loader + compiler)            │
│  lib/blog/types.ts (TypeScript types)               │
│  lib/blog/queries.ts (fetch functions)              │
│                                                     │
│  ↓ Styled with ↓                                    │
│                                                     │
│  Shared Tailwind config + component library         │
│  (no new CSS, uses existing design system)          │
│                                                     │
└─────────────────────────────────────────────────────┘

Single Deploy → Netlify → elitizon.com/blog
```

---

## Step-by-Step Implementation

### Step 1: Install Dependencies

```bash
npm install @mdx-js/mdx @mdx-js/react gray-matter
npm install --save-dev @types/gray-matter
```

### Step 2: Create Directory Structure

```bash
mkdir -p src/app/blog/api
mkdir -p src/app/blog/tag
mkdir -p src/app/blog/author
mkdir -p content/blog
mkdir -p src/lib/blog
```

### Step 3: Create Blog Types

**File:** `src/lib/blog/types.ts`

```typescript
export interface BlogFrontmatter {
  title: string;
  slug: string;
  date: string;
  updated?: string;
  author: string;
  authorBio?: string;
  tags: string[];
  description: string;
  image?: string;
  readingTime?: string;
  featured?: boolean;
}

export interface BlogPost extends BlogFrontmatter {
  content: React.ReactNode;
}
```

### Step 4: Create MDX Loader

**File:** `src/lib/blog/mdx.ts`

```typescript
import { compile } from '@mdx-js/mdx';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { BlogPost, BlogFrontmatter } from './types';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export async function getBlogPost(slug: string): Promise<BlogPost> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`Blog post not found: ${slug}`);
  }

  const source = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(source);

  const compiled = await compile(content, { jsx: true });

  return {
    ...(data as BlogFrontmatter),
    content: compiled.value,
  };
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx'));

  const posts = await Promise.all(
    files.map(f => getBlogPost(f.replace('.mdx', '')))
  );

  // Sort by date, newest first
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter(p => p.tags.includes(tag));
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllBlogPosts();
  const tags = new Set(posts.flatMap(p => p.tags));
  return Array.from(tags).sort();
}
```

### Step 5: Create Blog Index Page

**File:** `src/app/blog/page.tsx`

```typescript
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/blog/mdx';

export const metadata: Metadata = {
  title: 'Blog | ELITIZON - AI Consulting Insights',
  description: 'Expert insights on AI, data engineering, and remote-first scaling from the ELITIZON team.',
};

export default async function BlogIndex() {
  const posts = await getAllBlogPosts();
  const featured = posts.filter(p => p.featured).slice(0, 3);
  const recent = posts.slice(0, 12);

  return (
    <main className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary-800 mb-4">
          Blog
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Insights on AI, data engineering, and remote-first scaling from ELITIZON experts.
        </p>

        {featured.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Featured</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {featured.map(post => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-bold mb-8">Latest Posts</h2>
          <div className="space-y-6">
            {recent.map(post => (
              <BlogPostPreview key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function BlogCard({ post }: { post: any }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="border rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer">
        <div className="p-6">
          <div className="flex gap-2 mb-3">
            {post.tags.slice(0, 2).map((tag: string) => (
              <span
                key={tag}
                className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-lg font-bold text-primary-800 mb-2">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4">{post.description}</p>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{post.author}</span>
            <time>{new Date(post.date).toLocaleDateString()}</time>
          </div>
        </div>
      </article>
    </Link>
  );
}

function BlogPostPreview({ post }: { post: any }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="border-b pb-6 cursor-pointer hover:bg-gray-50 p-4 -mx-4">
        <h3 className="text-xl font-bold text-primary-800 hover:text-secondary-600">
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm mt-2 mb-4">{post.description}</p>
        <div className="flex gap-4 items-center text-xs text-gray-500">
          <span>{post.author}</span>
          <time>{new Date(post.date).toLocaleDateString()}</time>
          {post.readingTime && <span>{post.readingTime}</span>}
        </div>
      </article>
    </Link>
  );
}
```

### Step 6: Create Individual Post Page

**File:** `src/app/blog/[slug]/page.tsx`

```typescript
import type { Metadata } from 'next';
import Link from 'next/link';
import { getBlogPost, getAllBlogPosts } from '@/lib/blog/mdx';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const post = await getBlogPost(params.slug);
    return {
      title: `${post.title} | ELITIZON Blog`,
      description: post.description,
      keywords: post.tags.join(', '),
      openGraph: {
        title: post.title,
        description: post.description,
        type: 'article',
        publishedTime: post.date,
        authors: [post.author],
      },
    };
  } catch {
    return { title: 'Post Not Found' };
  }
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  let post;
  try {
    post = await getBlogPost(params.slug);
  } catch {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 pb-8 border-b">
          <div className="flex gap-2 mb-4">
            {post.tags.map(tag => (
              <Link
                key={tag}
                href={`/blog/tag/${tag}`}
                className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded hover:bg-secondary-200"
              >
                {tag}
              </Link>
            ))}
          </div>
          <h1 className="text-4xl font-bold text-primary-800 mb-4">
            {post.title}
          </h1>
          <div className="flex gap-4 text-sm text-gray-600">
            <span>{post.author}</span>
            <time>{new Date(post.date).toLocaleDateString()}</time>
            {post.readingTime && <span>{post.readingTime}</span>}
          </div>
        </header>

        <div className="prose prose-lg max-w-none text-gray-700">
          {post.content}
        </div>

        {post.authorBio && (
          <div className="mt-12 pt-8 border-t">
            <p className="text-sm text-gray-600">
              <strong>{post.author}</strong> — {post.authorBio}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
```

### Step 7: Create Tag Page

**File:** `src/app/blog/tag/[tag]/page.tsx`

```typescript
import type { Metadata } from 'next';
import Link from 'next/link';
import { getBlogPostsByTag, getAllTags } from '@/lib/blog/mdx';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: { tag: string };
}): Promise<Metadata> {
  return {
    title: `${params.tag} | ELITIZON Blog`,
    description: `Blog posts tagged with ${params.tag}`,
  };
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map(tag => ({ tag }));
}

export default async function TagPage({
  params,
}: {
  params: { tag: string };
}) {
  const posts = await getBlogPostsByTag(params.tag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/blog" className="text-secondary-600 hover:text-secondary-700 mb-8 inline-block">
          ← Back to Blog
        </Link>

        <h1 className="text-4xl font-bold text-primary-800 mb-4">
          Posts tagged "{params.tag}"
        </h1>

        <div className="space-y-6 mt-12">
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="border-b pb-6 cursor-pointer hover:bg-gray-50 p-4 -mx-4">
                <h3 className="text-xl font-bold text-primary-800">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2">{post.description}</p>
                <div className="flex gap-4 mt-4 text-xs text-gray-500">
                  <span>{post.author}</span>
                  <time>{new Date(post.date).toLocaleDateString()}</time>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
```

### Step 8: Create Blog Post Template

Create your first blog post in **`content/blog/2025-10-21-first-post.mdx`**:

```mdx
---
title: "From Data Lakes to Data Mesh: Enterprise Architecture Patterns"
slug: "data-mesh-architecture"
date: "2025-10-21"
author: "John Smith"
authorBio: "Senior Data Architect at ELITIZON with 15+ years building enterprise data systems"
tags: ["data-engineering", "architecture"]
description: "How enterprises are transitioning from centralized data lakes to federated data mesh architectures for improved scalability and data ownership."
featured: true
readingTime: "8 min"
---

# From Data Lakes to Data Mesh

The centralized data lake model has dominated enterprise data architecture for over a decade, but organizations are increasingly recognizing its limitations.

## The Evolution

- **2010s:** Data warehouses → Data lakes
- **2020s:** Data lakes → Data mesh
- **2024+:** Composable data platforms

## Key Principles

Data Mesh is built on four core principles:

1. **Domain Ownership** — Teams own their data
2. **Data as a Product** — Treat data outputs as products
3. **Self-Service Infrastructure** — Enable teams to provision independently
4. **Federated Governance** — Global standards, local execution

## Case Study: Finance Services Client

*[Anonymized case study showing measurable ROI and implementation timeline]*

## Next Steps

Start with domain identification, then implement your first data product.
```

### Step 9: Update Navigation

Add link to blog in **`src/components/Navigation.tsx`**:

```typescript
// In your navigation links
<Link href="/blog" className="...">
  Blog
</Link>
```

### Step 10: Update Sitemap

Modify **`src/app/sitemap.ts`** to include blog posts:

```typescript
import { getAllBlogPosts } from '@/lib/blog/mdx';

export default async function sitemap() {
  const baseUrl = 'https://elitizon.com';
  
  // Existing pages...
  const pages = [
    /* ... existing pages ... */
  ];

  // Add blog posts
  const posts = await getAllBlogPosts();
  const blogPosts = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated || post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...pages, ...blogPosts];
}
```

### Step 11: Test & Deploy

```bash
# Test locally
npm run dev
# Visit http://localhost:3000/blog

# Build and check for errors
npm run build

# Deploy to Netlify (automatic on push to main)
git add .
git commit -m "feat: add blog infrastructure"
git push origin main
```

---

## Content Format Template

Every blog post should follow this structure:

```mdx
---
title: "Clear, keyword-rich title"
slug: "url-friendly-slug"
date: "YYYY-MM-DD"
author: "Author Name"
authorBio: "Short bio for author byline"
tags: ["tag1", "tag2", "tag3"]
description: "Meta description (150-160 chars, summary for listings)"
featured: true  # For homepage carousel (optional)
readingTime: "X min"  # Optional, compute automatically if omitted
---

# Main Heading (matches title)

Opening paragraph with context and key takeaway.

## Section 1

Content...

## Section 2

More content...

---
```

---

## Posting Workflow

1. **Create branch:** `git checkout -b blog/post-title`
2. **Write post:** Create `.mdx` file in `content/blog/`
3. **Test locally:** `npm run dev`, visit `/blog/[slug]`
4. **Submit PR:** Open PR with post content
5. **Review:** Team reviews for accuracy, SEO, brand voice
6. **Merge:** PR approval merges to main
7. **Auto-deploy:** Netlify rebuilds and deploys
8. **Promote:** Share on social, newsletter, etc.

---

## Performance Considerations

- **ISR (Incremental Static Regeneration):** Blog posts are statically generated; new posts trigger rebuild
- **Bundle Size:** MDX adds ~50KB (gzipped). Acceptable for content-heavy site
- **Build Time:** Expect +10-15 seconds per post during build
- **Caching:** Netlify CDN caches blog posts at edge; set revalidation to 24 hours

---

## Success Checklist

- [ ] Dependencies installed (`@mdx-js/mdx`, `gray-matter`)
- [ ] Directory structure created
- [ ] Blog types defined (`lib/blog/types.ts`)
- [ ] MDX loader implemented (`lib/blog/mdx.ts`)
- [ ] Blog pages created (index, [slug], tag/[tag])
- [ ] Sample post created in `content/blog/`
- [ ] Navigation updated
- [ ] Sitemap updated
- [ ] Local development tested
- [ ] Build successful
- [ ] Deployed to production
- [ ] Search engines notified (Google Search Console)

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `Cannot find module '@mdx-js/mdx'` | Run `npm install @mdx-js/mdx @mdx-js/react gray-matter` |
| Blog page returns 404 | Ensure `.mdx` files exist in `content/blog/` with correct slug |
| Styles not applied | Check that Tailwind `content:` includes `content/blog/**` |
| Build takes too long | Posts are ISR; revalidate only when content changes |
| TypeScript errors | Ensure `@types/gray-matter` is installed as devDependency |

---

**Ready to get started? Begin with Step 1 above!**

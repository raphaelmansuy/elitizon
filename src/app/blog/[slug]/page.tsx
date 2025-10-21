import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPost, getAllBlogPosts } from "@/lib/blog/mdx";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getBlogPost(slug);
    return {
      title: `${post.title} | ELITIZON Blog`,
      description: post.description,
      keywords: post.seo?.keywords || post.tags.join(", "),
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
        publishedTime: post.date,
        authors: [post.author],
        images: post.image ? [{ url: post.image }] : undefined,
      },
      authors: [{ name: post.author }],
    };
  } catch {
    return { title: "Post Not Found" };
  }
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post;
  try {
    post = await getBlogPost(slug);
  } catch {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="text-secondary-600 hover:text-secondary-700 mb-8 inline-block"
        >
          ← Back to Blog
        </Link>

        <header className="mb-8 pb-8 border-b">
          <div className="flex gap-2 mb-4">
            {post.tags.map((tag) => (
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

        <div className="prose prose-lg max-w-none text-gray-700 prose-headings:text-primary-800 prose-a:text-secondary-600 hover:prose-a:text-secondary-700">
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

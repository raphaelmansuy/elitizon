import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPostsByTag, getAllTags } from "@/lib/blog/mdx";
import { notFound } from "next/navigation";
import type { BlogPost } from "@/lib/blog/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `${tag} | ELITIZON Blog`,
    description: `Blog posts tagged with ${tag}`,
  };
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag }));
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const posts = await getBlogPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/blog"
          className="text-secondary-600 hover:text-secondary-700 mb-8 inline-block"
        >
          ← Back to Blog
        </Link>

        <h1 className="text-4xl font-bold text-primary-800 mb-2">
          Posts tagged &quot;{tag}&quot;
        </h1>
        <p className="text-gray-600 mb-12">
          {posts.length} {posts.length === 1 ? "post" : "posts"} found
        </p>

        <div className="space-y-6">
          {posts.map((post) => (
            <BlogPostPreview key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}

function BlogPostPreview({ post }: { post: BlogPost }) {
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

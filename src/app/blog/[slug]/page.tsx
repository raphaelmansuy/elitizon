import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
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
    <article className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Article Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Navigation */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-secondary-600 hover:text-secondary-700 mb-8 font-medium transition-colors"
          >
            ← Back to Articles
          </Link>

          {/* Header */}
          <header className="mb-12">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag}`}
                  className="text-sm font-medium bg-secondary-50 text-secondary-700 px-3 py-1.5 rounded-full hover:bg-secondary-100 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-bold text-primary-800 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 border-b border-gray-200 pb-6">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-primary-800">{post.author}</span>
              </div>
              <time className="text-sm">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              {post.readingTime && (
                <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-lg">
                  📖 {post.readingTime}
                </span>
              )}
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none 
            prose-headings:text-primary-800 prose-headings:font-bold
            prose-h1:text-4xl prose-h1:mt-8 prose-h1:mb-4
            prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
            prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-secondary-600 prose-a:font-medium hover:prose-a:text-secondary-700
            prose-strong:text-primary-800 prose-strong:font-semibold
            prose-em:text-gray-700
            prose-code:text-secondary-700 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:overflow-x-auto
            prose-blockquote:border-l-4 prose-blockquote:border-secondary-600 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-700
            prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
            prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2
            prose-li:text-gray-700
            prose-img:rounded-lg prose-img:shadow-md prose-img:my-8
          ">
            <MDXRemote source={post.content as string} />
          </div>

          {/* Author Bio */}
          {post.authorBio && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600 leading-relaxed">
                <strong className="text-primary-800">{post.author}</strong> — {post.authorBio}
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

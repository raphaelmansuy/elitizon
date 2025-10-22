import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllBlogPosts } from "@/lib/blog/mdx";
import type { BlogPost } from "@/lib/blog/types";

export const metadata: Metadata = {
  title: "Blog | ELITIZON - AI Consulting Insights",
  description:
    "Explore expert insights on AI, data engineering, machine learning, and remote-first scaling.",
  keywords: "AI consulting blog, data engineering, machine learning insights",
  openGraph: {
    title: "Blog | ELITIZON",
    description: "Expert insights on AI consulting and data engineering.",
    type: "website",
  },
};

export default async function BlogIndex() {
  const posts = await getAllBlogPosts();
  const featured = posts.filter((p) => p.featured).slice(0, 3);
  const recent = posts.slice(0, 12);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-accent-emerald-50 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-accent-emerald-50 border-b border-gray-100 py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-950 leading-tight mb-3">
              Blog & Insights
            </h1>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Deep dives into AI consulting, data engineering, and remote-first
              scaling. Insights from the ELITIZON team.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Featured Posts */}
        {featured.length > 0 && (
          <section className="mb-10">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-primary-950 mb-3">
                Featured Articles
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-secondary-600 to-secondary-400 rounded-sm"></div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Recent Posts */}
        {recent.length > 0 ? (
          <section>
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-primary-950 mb-3">
                Latest Articles
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-secondary-600 to-secondary-400 rounded-sm"></div>
            </div>
            <div className="space-y-3">
              {recent.map((post) => (
                <BlogPostPreview key={post.slug} post={post} />
              ))}
            </div>
          </section>
        ) : (
          <section>
            <p className="text-gray-500 text-center py-16 text-lg font-medium">
              No blog posts yet. Check back soon!
            </p>
          </section>
        )}
      </div>
    </main>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group h-full rounded-lg overflow-hidden bg-white border border-gray-200 shadow-md hover:shadow-xl hover:border-secondary-300 transition-all duration-300 cursor-pointer flex flex-col">
        {post.image && (
          <div className="h-40 bg-gradient-to-br from-primary-100 to-secondary-100 overflow-hidden relative flex-shrink-0">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-5 flex flex-col flex-grow">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium bg-secondary-50 text-secondary-700 px-2 py-0.5 rounded uppercase tracking-wide"
              >
                {tag}
              </span>
            ))}
            {post.featured && (
              <span className="text-xs font-semibold bg-amber-50 text-amber-700 px-2 py-0.5 rounded uppercase">
                ⭐ Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-primary-950 mb-2 group-hover:text-secondary-600 transition-colors line-clamp-2 leading-tight">
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow leading-relaxed">
            {post.description}
          </p>

          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-gray-600 border-t border-gray-100 pt-2.5">
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-gray-800">{post.author}</span>
              <span className="text-gray-300">•</span>
              <time className="text-gray-600">
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
            {post.readingTime && (
              <span className="text-gray-600 text-xs">
                📖 {post.readingTime}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

function BlogPostPreview({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group bg-white rounded-lg border border-gray-200 hover:border-secondary-300 hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer">
        <div className="flex gap-4 p-5">
          {post.image && (
            <div className="hidden sm:block h-24 w-24 flex-shrink-0 bg-gradient-to-br from-primary-100 to-secondary-100 rounded overflow-hidden relative">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
          <div className="flex-1 min-w-0 flex flex-col">
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-secondary-700 bg-secondary-50 px-2 py-0.5 rounded uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-base font-semibold text-primary-950 mb-1.5 group-hover:text-secondary-600 transition-colors line-clamp-2 leading-tight">
              {post.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 mb-2.5 line-clamp-2 text-sm leading-relaxed">
              {post.description}
            </p>

            {/* Metadata */}
            <div className="flex flex-wrap gap-2.5 text-xs text-gray-600 mt-auto">
              <span className="font-medium text-gray-800">{post.author}</span>
              <span className="text-gray-300">•</span>
              <time>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              {post.readingTime && (
                <>
                  <span className="text-gray-300">•</span>
                  <span>📖 {post.readingTime}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

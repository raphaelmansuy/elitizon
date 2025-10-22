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
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-accent-emerald-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-accent-emerald-50 border-b border-gray-100 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-primary-950 leading-tight tracking-tight mb-2">
              Blog & Insights
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl leading-relaxed font-medium">
              Deep dives into AI consulting, data engineering, and remote-first
              scaling. Insights from the ELITIZON team.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Featured Posts */}
        {featured.length > 0 && (
          <section className="mb-6 lg:mb-8">
            <div className="mb-4">
              <h2 className="text-3xl sm:text-4xl font-black text-primary-950 mb-3">
                Featured Articles
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-secondary-600 to-secondary-300 rounded-full"></div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Recent Posts */}
        {recent.length > 0 ? (
          <section>
            <div className="mb-4">
              <h2 className="text-3xl sm:text-4xl font-black text-primary-950 mb-3">
                Latest Articles
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-secondary-600 to-secondary-300 rounded-full"></div>
            </div>
            <div className="space-y-6">
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
      <article className="group h-full rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-lg hover:shadow-2xl hover:border-secondary-400 transition-all duration-300 cursor-pointer flex flex-col">
        {post.image && (
          <div className="h-56 bg-gradient-to-br from-primary-100 to-secondary-100 overflow-hidden relative flex-shrink-0">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        )}
        <div className="p-6 flex flex-col flex-grow">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs font-bold bg-secondary-50 text-secondary-700 px-3 py-1 rounded-full uppercase tracking-wide"
              >
                {tag}
              </span>
            ))}
            {post.featured && (
              <span className="text-xs font-black bg-amber-50 text-amber-700 px-3 py-1 rounded-full uppercase tracking-widest">
                ⭐ Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-black text-primary-950 mb-2 group-hover:text-secondary-600 transition-colors line-clamp-3 leading-tight">
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-gray-700 text-sm mb-4 line-clamp-2 flex-grow leading-relaxed font-medium">
            {post.description}
          </p>

          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-gray-600 border-t border-gray-100 pt-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-800">{post.author}</span>
              <span className="text-gray-400">•</span>
              <time className="text-gray-600">
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
            {post.readingTime && (
              <span className="bg-primary-50 text-primary-700 px-2.5 py-1 rounded-full text-xs font-bold">
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
      <article className="group bg-white rounded-xl border border-gray-200 hover:border-secondary-300 hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer">
        <div className="flex gap-6 p-6">
          {post.image && (
            <div className="hidden sm:block h-32 w-32 flex-shrink-0 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg overflow-hidden relative">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          )}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-2">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-bold text-secondary-700 bg-secondary-50 px-2.5 py-1 rounded-full uppercase tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-black text-primary-950 mb-2 group-hover:text-secondary-600 transition-colors leading-tight line-clamp-2">
              {post.title}
            </h3>

            {/* Description */}
            <p className="text-gray-700 mb-3 line-clamp-2 text-sm leading-relaxed font-medium">
              {post.description}
            </p>

            {/* Metadata */}
            <div className="flex flex-wrap gap-4 text-xs text-gray-600 border-t border-gray-100 pt-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-800">{post.author}</span>
              </div>
              <time className="text-gray-600">
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              {post.readingTime && (
                <span className="text-gray-600 font-medium">
                  📖 {post.readingTime}
                </span>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

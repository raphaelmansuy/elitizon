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
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <section className="mb-16">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-primary-800 mb-4">
              Blog & Insights
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
              Deep dives into AI consulting, data engineering, and remote-first scaling. 
              Insights from the ELITIZON team.
            </p>
          </div>
        </section>

        {/* Featured Posts */}
        {featured.length > 0 && (
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-primary-800 mb-10">Featured Articles</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Recent Posts */}
        {recent.length > 0 ? (
          <section>
            <h2 className="text-3xl font-bold text-primary-800 mb-10">Latest Articles</h2>
            <div className="space-y-6">
              {recent.map((post) => (
                <BlogPostPreview key={post.slug} post={post} />
              ))}
            </div>
          </section>
        ) : (
          <section>
            <p className="text-gray-500 text-center py-12 text-lg">
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
      <article className="group h-full rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:border-secondary-300 transition-all duration-300">
        {post.image && (
          <div className="h-48 bg-gradient-to-br from-primary-100 to-secondary-100 overflow-hidden relative">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium bg-secondary-50 text-secondary-700 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            {post.featured && (
              <span className="text-xs font-bold bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full">
                ⭐ Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-primary-800 mb-2 group-hover:text-secondary-600 transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
            {post.description}
          </p>

          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-4">
            <div className="flex items-center gap-2">
              <span className="font-medium">{post.author}</span>
              <span>•</span>
              <time>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
            </div>
            {post.readingTime && (
              <span className="bg-gray-50 px-2 py-1 rounded text-gray-600">
                {post.readingTime}
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
      <article className="group border-b border-gray-200 pb-8 px-4 -mx-4 hover:bg-gray-50 transition-colors duration-200 rounded-lg cursor-pointer">
        <div className="flex gap-6">
          {post.image && (
            <div className="hidden sm:block h-32 w-32 flex-shrink-0 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg overflow-hidden relative">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-secondary-700 bg-secondary-50 px-2.5 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-primary-800 mb-2 group-hover:text-secondary-600 transition-colors">
              {post.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 mb-4 line-clamp-2">
              {post.description}
            </p>

            {/* Metadata */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span>{post.author}</span>
              <time>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
              {post.readingTime && <span>{post.readingTime} read</span>}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

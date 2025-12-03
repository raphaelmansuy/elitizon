import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts, getAllTags } from "@/lib/blog/mdx";
import { BlogCard, BlogSearch } from "@/components/blog";

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
  const allTags = await getAllTags();
  const featured = posts.filter((p) => p.featured).slice(0, 3);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-white pt-20">
      {/* Hero Section - Refined with better visual hierarchy */}
      <section className="relative overflow-hidden border-b border-gray-100">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/80 via-white to-accent-emerald-50/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary-100/20 via-transparent to-transparent" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav
              className="flex items-center gap-2 text-sm text-gray-500 mb-6"
              aria-label="Breadcrumb"
            >
              <Link
                href="/"
                className="hover:text-secondary-600 transition-colors"
              >
                Home
              </Link>
              <span aria-hidden="true">→</span>
              <span className="text-primary-900 font-medium">Blog</span>
            </nav>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-secondary-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-5 shadow-sm border border-secondary-100/50">
              <span className="w-2 h-2 rounded-full bg-secondary-500 animate-pulse" />
              <span>Insights & Expertise</span>
            </div>

            {/* Title with refined typography */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-950 leading-[1.1] tracking-tight mb-5">
              ELITIZON <span className="text-secondary-600">Blog</span>
            </h1>

            {/* Subtitle with better readability */}
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl font-normal">
              Deep dives into AI consulting, data engineering, and remote-first
              scaling. Expert insights from the ELITIZON team to help you stay
              ahead in the rapidly evolving tech landscape.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-6 mt-8 pt-6 border-t border-gray-200/60">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-secondary-100 flex items-center justify-center">
                  <span className="text-lg">📚</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary-950">
                    {posts.length}
                  </p>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Articles
                  </p>
                </div>
              </div>
              <div className="hidden sm:block w-px h-10 bg-gray-200" />
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-accent-emerald-100 flex items-center justify-center">
                  <span className="text-lg">🏷️</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary-950">
                    {allTags.length}
                  </p>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Topics
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Featured Posts - Enhanced section */}
        {featured.length > 0 && (
          <section className="mb-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-amber-500 text-lg">⭐</span>
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
                    Editor&apos;s Picks
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary-950 tracking-tight">
                  Featured Articles
                </h2>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                <span className="w-2 h-2 rounded-full bg-secondary-400" />
                <span>{featured.length} featured</span>
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {featured.map((post, index) => (
                <BlogCard
                  key={post.slug}
                  post={post}
                  variant={
                    index === 0 && featured.length >= 3 ? "featured" : "default"
                  }
                />
              ))}
            </div>
          </section>
        )}

        {/* All Posts with Search and Filter - Enhanced */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">📖</span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Browse All
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary-950 tracking-tight">
                All Articles
              </h2>
            </div>
            <p className="hidden sm:block text-sm text-gray-500">
              {posts.length} {posts.length === 1 ? "article" : "articles"}{" "}
              available
            </p>
          </div>

          {posts.length > 0 ? (
            <BlogSearch posts={posts} allTags={allTags} />
          ) : (
            <div className="text-center py-20 px-6 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-secondary-100 to-secondary-200 flex items-center justify-center">
                <span className="text-4xl">✍️</span>
              </div>
              <h3 className="text-xl font-bold text-primary-950 mb-3">
                Coming Soon
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                We&apos;re working on exciting content about AI, data
                engineering, and technology insights. Check back soon!
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary-600 hover:bg-secondary-700 text-white font-semibold rounded-lg transition-colors"
              >
                <span>Get Notified</span>
                <span>→</span>
              </Link>
            </div>
          )}
        </section>

        {/* Newsletter CTA Section */}
        <section className="mt-20 relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 p-8 sm:p-12">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-emerald-500/10 rounded-full blur-3xl" />

          <div className="relative max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <span>📬</span>
              <span>Stay Updated</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
              Never miss an insight
            </h3>
            <p className="text-gray-300 mb-6 text-base leading-relaxed">
              Subscribe to receive the latest articles on AI, data architecture,
              and technology trends directly in your inbox.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 text-primary-900 font-semibold rounded-lg transition-all hover:scale-105 shadow-lg"
            >
              <span>Subscribe Now</span>
              <span>→</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

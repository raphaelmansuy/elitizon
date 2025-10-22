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
  const allPosts = await getAllBlogPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const previousPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  try {
    post = await getBlogPost(slug);
  } catch {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section with Gradient Background */}
      <div className="bg-gradient-to-br from-primary-50 via-white to-accent-emerald-50 py-12 sm:py-16 lg:py-20 border-b border-gray-100">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8">
          <div className="lg:col-span-3">
            {/* Breadcrumb Navigation */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-secondary-600 hover:text-secondary-700 mb-6 font-semibold text-sm transition-all duration-200 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">
                ←
              </span>
              <span>Back to Articles</span>
            </Link>

            {/* Category Tags - Enhanced */}
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.map((tag, idx) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag}`}
                  className={`text-xs font-black uppercase tracking-widest px-3 py-2 rounded-full transition-all duration-200 ${
                    idx === 0
                      ? "bg-secondary-600 text-white hover:bg-secondary-700 shadow-sm"
                      : "bg-gray-100 text-primary-700 hover:bg-gray-200"
                  }`}
                >
                  {tag}
                </Link>
              ))}
            </div>

            {/* Article Title - Professional Typography */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-primary-950 leading-tight tracking-tight mb-6 max-w-3xl">
              {post.title}
            </h1>

            {/* Enhanced Metadata Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-0">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm font-black text-primary-800 uppercase tracking-wide">
                    {post.author}
                  </p>
                  <time className="text-sm text-gray-600 font-medium">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </div>

              {post.readingTime && (
                <div className="flex items-center gap-2 bg-accent-amber-100 text-accent-amber-900 px-4 py-2 rounded-lg font-semibold text-sm shadow-sm">
                  <span>📖</span>
                  <span>{post.readingTime} read</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content - Sidebar on desktop */}
          <div className="lg:col-span-3">
            {/* Article Content - Professional Typography */}
            <div
              className="prose max-w-none
              prose-headings:font-black prose-headings:text-primary-950 prose-headings:tracking-tight prose-headings:leading-snug
              prose-h1:text-5xl sm:prose-h1:text-6xl prose-h1:mt-16 prose-h1:mb-8 prose-h1:leading-tight prose-h1:-tracking-tight
              prose-h2:text-3xl sm:prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:leading-snug prose-h2:border-l-4 prose-h2:border-secondary-600 prose-h2:pl-6 prose-h2:pr-0 prose-h2:font-black prose-h2:-tracking-tight
              prose-h3:text-2xl sm:prose-h3:text-3xl prose-h3:mt-12 prose-h3:mb-6 prose-h3:font-black prose-h3:leading-snug prose-h3:-tracking-tight
              prose-h4:text-xl prose-h4:mt-10 prose-h4:mb-5 prose-h4:font-black prose-h4:leading-snug prose-h4:-tracking-tight
              prose-h5:text-lg prose-h5:mt-8 prose-h5:mb-4 prose-h5:font-bold prose-h5:leading-snug
              prose-p:text-gray-900 prose-p:leading-9 prose-p:mb-8 prose-p:text-lg prose-p:font-normal prose-p:tracking-normal
              prose-a:text-secondary-600 prose-a:font-bold hover:prose-a:text-secondary-700 hover:prose-a:underline prose-a:underline prose-a:underline-offset-4 prose-a:transition-colors prose-a:duration-200
              prose-strong:text-primary-950 prose-strong:font-black prose-strong:tracking-tight
              prose-em:text-gray-800 prose-em:font-semibold prose-em:italic prose-em:not-italic:hover
              prose-code:text-sm prose-code:font-mono prose-code:text-secondary-700 prose-code:bg-gray-100 prose-code:px-3 prose-code:py-1.5 prose-code:rounded-md prose-code:font-semibold prose-code:border prose-code:border-gray-200
              prose-pre:bg-gray-950 prose-pre:text-gray-50 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:py-6 prose-pre:px-6 prose-pre:shadow-xl prose-pre:border prose-pre:border-gray-800 prose-pre:text-sm prose-pre:font-mono prose-pre:leading-relaxed
              prose-blockquote:border-l-4 prose-blockquote:border-secondary-600 prose-blockquote:pl-6 prose-blockquote:text-gray-800 prose-blockquote:italic prose-blockquote:font-medium prose-blockquote:bg-gradient-to-br prose-blockquote:from-gray-50 prose-blockquote:to-gray-100 prose-blockquote:py-6 prose-blockquote:pr-6 prose-blockquote:rounded-r-lg prose-blockquote:my-10 prose-blockquote:leading-8
              prose-ul:space-y-4 prose-ul:my-8 prose-ul:pl-8
              prose-ol:space-y-4 prose-ol:my-8 prose-ol:pl-8
              prose-li:text-gray-900 prose-li:leading-8 prose-li:font-normal prose-li:text-lg
              prose-hr:my-12 prose-hr:border-gray-200 prose-hr:border-t-2
              prose-img:rounded-xl prose-img:shadow-xl prose-img:my-12 prose-img:border-2 prose-img:border-gray-200 prose-img:w-full prose-img:h-auto
              prose-table:my-10 prose-table:border-collapse prose-table:w-full prose-table:rounded-lg prose-table:overflow-hidden prose-table:shadow-sm
              prose-thead:bg-primary-50
              prose-th:bg-primary-100 prose-th:border prose-th:border-gray-300 prose-th:px-6 prose-th:py-4 prose-th:text-left prose-th:font-black prose-th:text-primary-950 prose-th:text-sm prose-th:uppercase prose-th:tracking-wide
              prose-tbody:divide-y prose-tbody:divide-gray-200
              prose-td:border prose-td:border-gray-300 prose-td:px-6 prose-td:py-4 prose-td:text-gray-800 prose-td:font-normal
              prose-tr:hover:bg-gray-50 prose-tr:transition-colors
            "
            >
              <MDXRemote source={post.content as string} />
            </div>

            {/* CTA Section */}
            <div className="mt-16 pt-12 bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 rounded-2xl p-8 sm:p-12 text-white shadow-lg">
              <h3 className="text-2xl sm:text-3xl font-black mb-4 leading-tight">
                Ready to Transform Your Data?
              </h3>
              <p className="text-lg text-primary-100 mb-8 leading-relaxed font-medium">
                Let ELITIZON help you implement cutting-edge data architecture
                solutions tailored to your organization&apos;s needs.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-secondary-600 hover:bg-secondary-700 text-white font-black py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md"
              >
                Get Started →
              </Link>
            </div>

            {/* Author Bio */}
            {post.authorBio && (
              <div className="mt-16 pt-12 border-t-2 border-gray-200">
                <div className="bg-gradient-to-br from-secondary-50 via-white to-accent-emerald-50 rounded-xl p-8 border border-secondary-100 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-black text-secondary-600 uppercase tracking-wider mb-2">
                        Author
                      </p>
                      <p className="text-lg font-black text-primary-900 mb-3">
                        {post.author}
                      </p>
                      <p className="text-gray-700 leading-relaxed text-base">
                        {post.authorBio}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Post Navigation */}
            <div className="mt-16 pt-12 border-t-2 border-gray-200">
              <p className="text-sm font-black text-gray-600 uppercase tracking-widest mb-6">
                Continue Reading
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {previousPost ? (
                  <Link href={`/blog/${previousPost.slug}`}>
                    <div className="p-6 border-2 border-gray-200 rounded-xl hover:border-secondary-600 hover:shadow-lg hover:bg-secondary-50 transition-all cursor-pointer group">
                      <p className="text-sm font-bold text-gray-600 mb-3 group-hover:text-secondary-600 transition-colors">
                        ← Previous Article
                      </p>
                      <p className="font-black text-primary-900 line-clamp-2 text-lg group-hover:text-secondary-600 transition-colors">
                        {previousPost.title}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
                {nextPost ? (
                  <Link href={`/blog/${nextPost.slug}`}>
                    <div className="p-6 border-2 border-gray-200 rounded-xl hover:border-secondary-600 hover:shadow-lg hover:bg-secondary-50 transition-all cursor-pointer group text-right">
                      <p className="text-sm font-bold text-gray-600 mb-3 group-hover:text-secondary-600 transition-colors">
                        Next Article →
                      </p>
                      <p className="font-black text-primary-900 line-clamp-2 text-lg group-hover:text-secondary-600 transition-colors">
                        {nextPost.title}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Only on Desktop */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {/* Quick Info Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <h3 className="text-xs font-black text-secondary-600 mb-6 uppercase tracking-widest">
                  Article Info
                </h3>
                <div className="space-y-5 text-sm">
                  <div>
                    <p className="font-black text-primary-900 text-xs uppercase tracking-wide mb-2">
                      Published
                    </p>
                    <p className="text-gray-700 font-semibold">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  {post.readingTime && (
                    <div>
                      <p className="font-black text-primary-900 text-xs uppercase tracking-wide mb-2">
                        Reading Time
                      </p>
                      <p className="text-gray-700 font-semibold">
                        {post.readingTime}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="font-black text-primary-900 text-xs uppercase tracking-wide mb-3">
                      Topics
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-bold bg-secondary-100 text-secondary-700 px-3 py-1.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Share Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <h3 className="text-xs font-black text-secondary-600 mb-4 uppercase tracking-widest">
                  Share Article
                </h3>
                <div className="space-y-3">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      post.title
                    )}&url=${encodeURIComponent(
                      `${
                        process.env.NEXT_PUBLIC_SITE_URL ||
                        "https://elitizon.com"
                      }/blog/${post.slug}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-secondary-600 hover:text-secondary-700 font-bold transition-colors py-2 px-3 hover:bg-secondary-50 rounded-lg"
                  >
                    → Share on Twitter
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      `${
                        process.env.NEXT_PUBLIC_SITE_URL ||
                        "https://elitizon.com"
                      }/blog/${post.slug}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-secondary-600 hover:text-secondary-700 font-bold transition-colors py-2 px-3 hover:bg-secondary-50 rounded-lg"
                  >
                    → Share on LinkedIn
                  </a>
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-gradient-to-br from-secondary-600 to-secondary-700 rounded-xl p-6 border border-secondary-500 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="font-black text-white mb-3 text-lg">
                  Questions?
                </h3>
                <p className="text-secondary-50 mb-5 leading-relaxed text-sm font-medium">
                  Our team is ready to discuss your specific data architecture
                  needs.
                </p>
                <Link
                  href="/contact"
                  className="block text-center bg-white hover:bg-gray-100 text-secondary-700 font-black py-3 px-4 rounded-lg transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}

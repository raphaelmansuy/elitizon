import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getBlogPost, getAllBlogPosts } from "@/lib/blog/mdx";
import { mdxComponents } from "@/lib/mdx-components";
import { notFound } from "next/navigation";
import {
  ReadingProgressBar,
  TableOfContents,
  SocialShare,
  BackToTop,
  RelatedPosts,
} from "@/components/blog";

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

  // Get related posts based on shared tags
  const relatedPosts = allPosts
    .filter(
      (p) => p.slug !== slug && p.tags.some((tag) => post.tags.includes(tag))
    )
    .slice(0, 3);

  // Generate the URL for social sharing
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://elitizon.com";
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  return (
    <>
      {/* Reading Progress Bar */}
      <ReadingProgressBar />

      <article className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white pt-20">
        {/* Hero Section with refined gradient */}
        <header className="relative overflow-hidden border-b border-gray-100">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50/80 via-white to-accent-emerald-50/50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary-100/20 via-transparent to-transparent" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
            {/* Breadcrumb Navigation - Enhanced */}
            <nav
              className="flex items-center gap-2 text-sm text-gray-500 mb-8"
              aria-label="Breadcrumb"
            >
              <Link
                href="/"
                className="hover:text-secondary-600 transition-colors"
              >
                Home
              </Link>
              <span aria-hidden="true">→</span>
              <Link
                href="/blog"
                className="hover:text-secondary-600 transition-colors"
              >
                Blog
              </Link>
              <span aria-hidden="true">→</span>
              <span
                className="text-primary-900 font-medium line-clamp-1 max-w-md"
                title={post.title}
              >
                {post.title}
              </span>
            </nav>

            {/* Category Tags - Enhanced */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag, idx) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag}`}
                  className={`text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full transition-all duration-200 ${
                    idx === 0
                      ? "bg-secondary-100 text-secondary-700 hover:bg-secondary-200 border border-secondary-200/50"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200/50"
                  }`}
                >
                  {tag}
                </Link>
              ))}
            </div>

            {/* Article Title - Professional Typography with better line height */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-primary-950 leading-[1.15] tracking-tight mb-6 max-w-3xl">
              {post.title}
            </h1>

            {/* Article description/excerpt */}
            {post.description && (
              <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-2xl font-normal">
                {post.description}
              </p>
            )}

            {/* Enhanced Metadata Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 pt-6 border-t border-gray-200/60">
              <div className="flex items-center gap-4">
                {/* Author Avatar - enhanced */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-600 flex items-center justify-center text-white text-lg font-bold shadow-md ring-4 ring-white">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-primary-900 tracking-wide">
                    {post.author}
                  </p>
                  <time
                    className="text-sm text-gray-500 font-medium"
                    dateTime={post.date}
                  >
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {post.readingTime && (
                  <div className="flex items-center gap-2 bg-gray-100/80 text-gray-700 px-4 py-2 rounded-full font-medium text-sm">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{post.readingTime} read</span>
                  </div>
                )}
                {/* Social Share */}
                <div className="hidden sm:block">
                  <SocialShare url={postUrl} title={post.title} />
                </div>
              </div>
            </div>

            {/* Mobile Social Share */}
            <div className="sm:hidden mt-5">
              <SocialShare url={postUrl} title={post.title} />
            </div>
          </div>
        </header>

        {/* Article Content - Better spacing and layout */}
        <div className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Main Content - Sidebar on desktop */}
            <div className="lg:col-span-3">
              {/* Article Content - Professional Typography with improved readability */}
              <div
                className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-primary-950 prose-headings:tracking-tight
              prose-h1:text-3xl sm:prose-h1:text-4xl prose-h1:mt-14 prose-h1:mb-6 prose-h1:leading-tight
              prose-h2:text-2xl sm:prose-h2:text-[1.75rem] prose-h2:mt-14 prose-h2:mb-6 prose-h2:leading-snug prose-h2:border-l-4 prose-h2:border-secondary-400 prose-h2:pl-5 prose-h2:ml-0 prose-h2:-ml-5 prose-h2:font-bold
              prose-h3:text-xl sm:prose-h3:text-[1.375rem] prose-h3:mt-10 prose-h3:mb-5 prose-h3:font-bold prose-h3:leading-snug
              prose-h4:text-lg prose-h4:mt-8 prose-h4:mb-4 prose-h4:font-semibold
              prose-h5:text-base prose-h5:mt-6 prose-h5:mb-3 prose-h5:font-semibold
              prose-p:text-gray-700 prose-p:leading-[1.85] prose-p:mb-6 prose-p:text-[1.0625rem]
              prose-a:text-secondary-600 prose-a:font-semibold hover:prose-a:text-secondary-700 prose-a:underline prose-a:underline-offset-4 prose-a:decoration-secondary-300 hover:prose-a:decoration-secondary-500 prose-a:transition-colors
              prose-strong:text-primary-950 prose-strong:font-bold
              prose-em:text-gray-800 prose-em:font-medium
              prose-code:text-sm prose-code:font-mono prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:bg-gray-100 prose-code:text-secondary-700 prose-code:font-medium prose-code:border prose-code:border-gray-200
              prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:py-5 prose-pre:px-5 prose-pre:shadow-lg prose-pre:text-sm prose-pre:font-mono prose-pre:leading-relaxed prose-pre:bg-gray-900
              prose-blockquote:border-l-4 prose-blockquote:border-secondary-400 prose-blockquote:pl-6 prose-blockquote:text-gray-700 prose-blockquote:italic prose-blockquote:font-medium prose-blockquote:bg-gradient-to-r prose-blockquote:from-secondary-50/50 prose-blockquote:to-transparent prose-blockquote:py-5 prose-blockquote:pr-4 prose-blockquote:rounded-r-lg prose-blockquote:my-8 prose-blockquote:leading-relaxed
              prose-ul:space-y-2.5 prose-ul:my-6 prose-ul:pl-6
              prose-ol:space-y-2.5 prose-ol:my-6 prose-ol:pl-6
              prose-li:text-gray-700 prose-li:leading-relaxed prose-li:text-[1.0625rem] prose-li:marker:text-secondary-500
              prose-hr:my-12 prose-hr:border-gray-200
              prose-img:rounded-xl prose-img:shadow-lg prose-img:my-10 prose-img:border prose-img:border-gray-200 prose-img:w-full prose-img:h-auto
              prose-table:my-8 prose-table:border-collapse prose-table:w-full prose-table:rounded-lg prose-table:overflow-hidden prose-table:shadow-sm
              prose-thead:bg-primary-50
              prose-th:bg-primary-100 prose-th:border prose-th:border-gray-300 prose-th:px-6 prose-th:py-4 prose-th:text-left prose-th:font-semibold prose-th:text-primary-950 prose-th:text-sm prose-th:uppercase prose-th:tracking-wide
              prose-tbody:divide-y prose-tbody:divide-gray-200
              prose-td:border prose-td:border-gray-300 prose-td:px-6 prose-td:py-4 prose-td:text-gray-800 prose-td:font-normal
              prose-tr:hover:bg-gray-50 prose-tr:transition-colors
            "
              >
                <MDXRemote
                  source={post.content as string}
                  components={mdxComponents}
                />
              </div>
              <Script
                src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"
                strategy="lazyOnload"
              />
              <Script
                id="mermaid-initialize"
                strategy="lazyOnload"
                dangerouslySetInnerHTML={{
                  __html: `
                  if (typeof mermaid !== 'undefined') {
                    mermaid.initialize({ 
                      startOnLoad: true, 
                      theme: 'light',
                      themeVariables: {
                        primaryColor: '#ffffff',
                        primaryBorderColor: '#cccccc',
                        background: '#ffffff',
                        mainBkg: '#ffffff',
                        clusterBkg: '#ffffff',
                        clusterBorder: '#cccccc'
                      }
                    });
                    mermaid.contentLoaded();
                  }
                `,
                }}
              />

              {/* CTA Section - Enhanced with better visual design */}
              <div
                className="mt-16 relative overflow-hidden rounded-2xl p-8 sm:p-10 shadow-xl"
                style={{
                  background:
                    "linear-gradient(135deg, #1e2329 0%, #2A3045 50%, #1e2329 100%)",
                }}
              >
                {/* Decorative elements */}
                <div
                  className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl"
                  style={{ backgroundColor: "rgba(250, 51, 102, 0.15)" }}
                />
                <div
                  className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl"
                  style={{ backgroundColor: "rgba(16, 185, 129, 0.15)" }}
                />

                <div className="relative">
                  <div
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      color: "rgba(255, 255, 255, 0.9)",
                    }}
                  >
                    <span>💡</span>
                    <span>Let&apos;s Connect</span>
                  </div>
                  <h3
                    className="text-2xl sm:text-3xl font-bold mb-4 leading-tight tracking-tight"
                    style={{ color: "#ffffff" }}
                  >
                    Ready to Transform Your Data?
                  </h3>
                  <p
                    className="mb-6 leading-relaxed text-base max-w-lg"
                    style={{ color: "#d1d5db" }}
                  >
                    Let ELITIZON help you implement cutting-edge data
                    architecture solutions tailored to your organization&apos;s
                    needs.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                    style={{
                      backgroundColor: "#fa3366",
                      color: "#ffffff",
                    }}
                  >
                    <span>Get Started</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Author Bio - Enhanced */}
              {post.authorBio && (
                <div className="mt-14 pt-10 border-t border-gray-200">
                  <div className="bg-gradient-to-br from-gray-50 via-white to-secondary-50/30 rounded-2xl p-6 sm:p-8 border border-gray-200/60 shadow-sm">
                    <div className="flex flex-col sm:flex-row items-start gap-5">
                      {/* Author Avatar */}
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg ring-4 ring-white flex-shrink-0">
                        {post.author.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-secondary-600 uppercase tracking-widest mb-2">
                          Written by
                        </p>
                        <p className="text-xl font-bold text-primary-950 mb-3 tracking-tight">
                          {post.author}
                        </p>
                        <p className="text-gray-600 leading-relaxed text-[0.9375rem]">
                          {post.authorBio}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Post Navigation - Enhanced with better visual treatment */}
              <div className="mt-14 pt-10 border-t border-gray-200">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  Continue Reading
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {previousPost ? (
                    <Link href={`/blog/${previousPost.slug}`} className="group">
                      <div className="h-full p-5 bg-white border border-gray-200 rounded-xl hover:border-secondary-300 hover:shadow-md transition-all">
                        <p className="text-xs font-semibold text-gray-500 mb-2.5 flex items-center gap-1.5 group-hover:text-secondary-600 transition-colors">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                          Previous Article
                        </p>
                        <p className="font-bold text-primary-950 line-clamp-2 text-[0.9375rem] leading-snug group-hover:text-secondary-600 transition-colors">
                          {previousPost.title}
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {nextPost ? (
                    <Link href={`/blog/${nextPost.slug}`} className="group">
                      <div className="h-full p-5 bg-white border border-gray-200 rounded-xl hover:border-secondary-300 hover:shadow-md transition-all text-right">
                        <p className="text-xs font-semibold text-gray-500 mb-2.5 flex items-center justify-end gap-1.5 group-hover:text-secondary-600 transition-colors">
                          Next Article
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </p>
                        <p className="font-bold text-primary-950 line-clamp-2 text-[0.9375rem] leading-snug group-hover:text-secondary-600 transition-colors">
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

            {/* Sidebar - Only on Desktop - Enhanced */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-5">
                {/* Quick Info Card - Refined */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <h3 className="text-xs font-bold text-gray-500 mb-5 uppercase tracking-widest flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Article Info
                  </h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-4 h-4 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-0.5">
                          Published
                        </p>
                        <p className="text-gray-800 font-medium">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    {post.readingTime && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-4 h-4 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-0.5">
                            Reading Time
                          </p>
                          <p className="text-gray-800 font-medium">
                            {post.readingTime}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2.5">
                        Topics
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.map((tag) => (
                          <Link
                            key={tag}
                            href={`/blog/tag/${tag}`}
                            className="text-xs font-medium bg-secondary-50 text-secondary-700 px-2.5 py-1 rounded-full hover:bg-secondary-100 transition-colors"
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Table of Contents - Enhanced */}
                <TableOfContents className="bg-white rounded-xl p-5 shadow-sm border border-gray-200" />

                {/* CTA Card - Enhanced */}
                <div
                  className="relative overflow-hidden rounded-xl p-5 shadow-lg"
                  style={{
                    background:
                      "linear-gradient(to bottom right, var(--secondary-600), var(--secondary-700))",
                  }}
                >
                  {/* Decorative element */}
                  <div
                    className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl"
                    style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                  />

                  <div className="relative">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-3">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-bold text-white mb-2 text-[0.9375rem]">
                      Have Questions?
                    </h3>
                    <p className="text-white/80 mb-4 leading-relaxed text-sm">
                      Our team is ready to discuss your data architecture needs.
                    </p>
                    <Link
                      href="/contact"
                      className="block text-center bg-white hover:bg-gray-100 text-secondary-700 font-semibold py-2.5 px-4 rounded-lg transition-colors text-sm"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Related Posts Section */}
          {relatedPosts.length > 0 && (
            <div className="max-w-4xl mx-auto mt-8">
              <RelatedPosts posts={relatedPosts} currentSlug={slug} />
            </div>
          )}
        </div>

        {/* Back to Top Button */}
        <BackToTop />
      </article>
    </>
  );
}

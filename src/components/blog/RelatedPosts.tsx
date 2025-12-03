import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/blog/types";

interface RelatedPostsProps {
  posts: BlogPost[];
  currentSlug: string;
  maxPosts?: number;
}

export default function RelatedPosts({
  posts,
  currentSlug,
  maxPosts = 3,
}: RelatedPostsProps) {
  // Filter out current post and limit
  const relatedPosts = posts
    .filter((post) => post.slug !== currentSlug)
    .slice(0, maxPosts);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-12 border-t border-gray-200">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-secondary-100 flex items-center justify-center">
          <svg className="w-5 h-5 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-primary-950 tracking-tight">
            Related Articles
          </h2>
          <p className="text-sm text-gray-500">Continue exploring related topics</p>
        </div>
      </div>
      
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <article className="h-full rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:border-secondary-200 transition-all duration-300 flex flex-col hover:-translate-y-0.5">
              {post.image ? (
                <div className="h-36 bg-gradient-to-br from-primary-100 to-secondary-100 overflow-hidden relative flex-shrink-0">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ) : (
                <div className="h-36 bg-gradient-to-br from-primary-100 via-secondary-50 to-accent-emerald-100 overflow-hidden relative flex-shrink-0">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <span className="text-2xl">📝</span>
                    </div>
                  </div>
                </div>
              )}
              <div className="p-5 flex flex-col flex-grow">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {post.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={tag}
                      className={`text-xs font-medium px-2 py-0.5 rounded-full uppercase tracking-wide ${
                        index === 0 
                          ? "bg-secondary-50 text-secondary-700" 
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-[0.9375rem] font-bold text-primary-950 mb-2 group-hover:text-secondary-600 transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow leading-relaxed">
                  {post.description}
                </p>

                {/* Metadata */}
                <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3 mt-auto">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                  {post.readingTime && (
                    <span className="flex items-center gap-1 text-gray-500">
                      <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {post.readingTime}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Bottom accent on hover */}
              <div className="h-0.5 bg-gradient-to-r from-secondary-500 to-accent-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

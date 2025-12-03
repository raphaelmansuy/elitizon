import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/blog/types";

interface BlogCardProps {
  post: BlogPost;
  variant?: "featured" | "default" | "horizontal";
}

export default function BlogCard({ post, variant = "default" }: BlogCardProps) {
  // Format date consistently
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const shortDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  if (variant === "horizontal") {
    return (
      <Link href={`/blog/${post.slug}`} className="group block">
        <article className="relative bg-white rounded-xl border border-gray-200 hover:border-secondary-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
          <div className="flex gap-4 p-5">
            {post.image && (
              <div className="hidden sm:block h-28 w-28 flex-shrink-0 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg overflow-hidden relative">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
            <div className="flex-1 min-w-0 flex flex-col">
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {post.tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={tag}
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full uppercase tracking-wide ${
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
              <h3 className="text-lg font-bold text-primary-950 mb-2.5 group-hover:text-secondary-600 transition-colors line-clamp-2 leading-snug">
                {post.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-3.5 line-clamp-2 text-sm leading-relaxed">
                {post.description}
              </p>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-auto pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-600 flex items-center justify-center text-white text-[10px] font-bold ring-2 ring-white shadow-sm">
                    {post.author.charAt(0)}
                  </div>
                  <span className="font-medium text-gray-700">
                    {post.author}
                  </span>
                </div>
                <span className="text-gray-300">•</span>
                <time dateTime={post.date}>{formattedDate}</time>
                {post.readingTime && (
                  <>
                    <span className="text-gray-300">•</span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {post.readingTime}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Hover indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-secondary-500 to-secondary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </article>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <article className="relative h-full rounded-2xl overflow-hidden bg-primary-950 min-h-[360px] sm:min-h-[400px]">
          {/* Background Image with gradient overlay */}
          {post.image && (
            <div className="absolute inset-0">
              <Image
                src={post.image}
                alt=""
                fill
                className="object-cover opacity-50 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
              />
            </div>
          )}

          {/* Multi-layer gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/85 to-primary-950/40" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-secondary-900/20" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-semibold bg-white/15 backdrop-blur-sm text-white px-3 py-1.5 rounded-full uppercase tracking-wide border border-white/10"
                >
                  {tag}
                </span>
              ))}
              {post.featured && (
                <span className="text-xs font-semibold bg-amber-500/90 text-white px-3 py-1.5 rounded-full uppercase tracking-wide flex items-center gap-1.5">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>Featured</span>
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-secondary-300 transition-colors line-clamp-2 leading-tight tracking-tight">
              {post.title}
            </h3>

            {/* Description */}
            <p className="text-gray-300 text-sm sm:text-base mb-5 line-clamp-2 leading-relaxed">
              {post.description}
            </p>

            {/* Metadata */}
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-600 flex items-center justify-center text-white text-sm font-bold ring-2 ring-white/20 shadow-lg">
                  {post.author.charAt(0)}
                </div>
                <span className="font-medium text-gray-200">{post.author}</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-gray-500" />
              <time dateTime={post.date} className="text-gray-300">{formattedDate}</time>
              {post.readingTime && (
                <>
                  <span className="w-1 h-1 rounded-full bg-gray-500" />
                  <span className="flex items-center gap-1.5 text-gray-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {post.readingTime}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Arrow indicator - top right */}
          <div className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <svg
              className="w-5 h-5"
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
          </div>
        </article>
      </Link>
    );
  }

  // Default card variant - refined design
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="h-full rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:border-secondary-200 transition-all duration-300 flex flex-col hover:-translate-y-1">
        {/* Image container with overlay effects */}
        {post.image ? (
          <div className="relative h-48 bg-gradient-to-br from-primary-100 to-secondary-100 overflow-hidden flex-shrink-0">
            <Image
              src={post.image}
              alt=""
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Hover overlay with read more indicator */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-primary-900 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5 shadow-lg">
              <span>Read article</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        ) : (
          <div className="relative h-48 bg-gradient-to-br from-primary-100 via-secondary-50 to-accent-emerald-100 overflow-hidden flex-shrink-0">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <span className="text-3xl">📝</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="p-5 sm:p-6 flex flex-col flex-grow">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.slice(0, 2).map((tag, index) => (
              <span
                key={tag}
                className={`text-xs font-medium px-2.5 py-1 rounded-full uppercase tracking-wide transition-colors ${
                  index === 0
                    ? "bg-secondary-50 text-secondary-700 group-hover:bg-secondary-100"
                    : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                }`}
              >
                {tag}
              </span>
            ))}
            {post.featured && (
              <span className="text-xs font-semibold bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full uppercase flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-primary-950 mb-2.5 group-hover:text-secondary-600 transition-colors line-clamp-2 leading-snug tracking-tight">
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-5 line-clamp-3 flex-grow leading-relaxed">
            {post.description}
          </p>

          {/* Metadata - refined footer */}
          <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-600 flex items-center justify-center text-white text-[11px] font-bold ring-2 ring-white shadow-sm">
                {post.author.charAt(0)}
              </div>
              <span className="font-medium text-gray-700">{post.author}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <time dateTime={post.date}>{shortDate}</time>
              {post.readingTime && (
                <>
                  <span className="text-gray-300">•</span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {post.readingTime}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Bottom accent line on hover */}
        <div className="h-0.5 bg-gradient-to-r from-secondary-500 via-secondary-600 to-accent-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </article>
    </Link>
  );
}

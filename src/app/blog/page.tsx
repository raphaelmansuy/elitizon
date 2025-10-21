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
    <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary-800 mb-4">Blog</h1>
        <p className="text-lg text-gray-600 mb-12">
          Insights on AI, data engineering, and remote-first scaling from the
          ELITIZON team.
        </p>

        {/* Featured Posts */}
        {featured.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Featured</h2>
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
            <h2 className="text-2xl font-bold mb-8">Latest Posts</h2>
            <div className="space-y-8">
              {recent.map((post) => (
                <BlogPostPreview key={post.slug} post={post} />
              ))}
            </div>
          </section>
        ) : (
          <section>
            <p className="text-gray-500 text-center py-12">
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
      <article className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        {post.image && (
          <div className="h-48 bg-gray-200 overflow-hidden relative">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex gap-2 mb-2">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-lg font-bold text-primary-800 mb-2">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4">{post.description}</p>
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>{post.author}</span>
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function BlogPostPreview({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="border-b pb-8 cursor-pointer hover:bg-gray-50 p-4 -mx-4 px-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold text-primary-800 hover:text-secondary-600">
              {post.title}
            </h3>
            <p className="text-gray-600 text-sm mt-2">{post.description}</p>
          </div>
        </div>
        <div className="flex gap-4 items-center text-xs text-gray-500 mt-4">
          <span>{post.author}</span>
          <span>{new Date(post.date).toLocaleDateString()}</span>
          {post.readingTime && <span>{post.readingTime}</span>}
        </div>
      </article>
    </Link>
  );
}

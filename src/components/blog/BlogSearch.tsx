"use client";

import { useState, useMemo, useCallback } from "react";
import type { BlogPost } from "@/lib/blog/types";
import BlogCard from "./BlogCard";

interface BlogSearchProps {
  posts: BlogPost[];
  allTags: string[];
}

export default function BlogSearch({ posts, allTags }: BlogSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesTag =
        selectedTag === null || post.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  const handleTagClick = useCallback((tag: string) => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedTag(null);
  }, []);

  const hasFilters = searchQuery !== "" || selectedTag !== null;

  return (
    <div className="space-y-8">
      {/* Search and Filter Section - Enhanced */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm">
        {/* Search Input - Refined */}
        <div className="relative mb-5">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search articles by title, topic, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-secondary-500 focus:ring-2 focus:ring-secondary-500/20 transition-all duration-200 text-gray-800 placeholder-gray-400 text-[0.9375rem]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Tags - Enhanced with label */}
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
            Filter by topic
          </p>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter articles by topic"
          >
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                aria-pressed={selectedTag === tag}
                className={`
                  px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500/50 focus-visible:ring-offset-1
                  ${
                    selectedTag === tag
                      ? "bg-secondary-600 text-white shadow-md shadow-secondary-600/25"
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                {tag}
              </button>
            ))}
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="px-3.5 py-2 rounded-lg text-sm font-medium text-secondary-600 hover:bg-secondary-50 transition-colors flex items-center gap-1.5 border border-secondary-200"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Count - Enhanced */}
      {hasFilters && (
        <div className="flex items-center justify-between px-1">
          <p className="text-gray-600 text-sm">
            Found{" "}
            <span className="font-bold text-primary-950">
              {filteredPosts.length}
            </span>{" "}
            {filteredPosts.length === 1 ? "article" : "articles"}
            {selectedTag && (
              <span>
                {" "}
                in{" "}
                <span className="inline-flex items-center gap-1 text-secondary-600 font-semibold bg-secondary-50 px-2 py-0.5 rounded">
                  {selectedTag}
                </span>
              </span>
            )}
          </p>

          {filteredPosts.length > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-secondary-600 transition-colors"
            >
              Show all articles
            </button>
          )}
        </div>
      )}

      {/* Posts Grid - Enhanced empty state */}
      {filteredPosts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-primary-950 mb-2">
            No articles found
          </h3>
          <p className="text-gray-600 mb-5 max-w-sm mx-auto">
            We couldn&apos;t find any articles matching your search. Try
            different keywords or browse all articles.
          </p>
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary-600 hover:bg-secondary-700 text-white font-semibold rounded-lg transition-colors"
          >
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

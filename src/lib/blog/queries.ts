/**
 * Blog query utilities - Re-export main functions from mdx.ts
 * This file provides a cleaner API for importing blog query functions
 */

export {
  getBlogPost,
  getAllBlogPosts,
  getBlogPostsByTag,
  getAllTags,
  getBlogPostsByAuthor,
  getAllAuthors,
} from "./mdx";

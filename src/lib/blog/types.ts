export interface BlogFrontmatter {
  title: string;
  slug: string;
  date: string;
  updated?: string;
  author: string;
  authorBio?: string;
  tags: string[];
  description: string;
  image?: string;
  readingTime?: string;
  featured?: boolean;
  seo?: {
    keywords?: string;
    ogImage?: string;
  };
}

export interface BlogPost extends BlogFrontmatter {
  content: React.ReactNode;
  filePath?: string;
}

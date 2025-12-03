/* eslint-disable @next/next/no-img-element */
import MermaidDiagram from "@/components/MermaidDiagram";
import CodeBlockWrapper from "@/components/blog/CodeBlockWrapper";

interface CodeProps {
  children?: string;
  className?: string;
}

interface PreProps {
  children: React.ReactNode;
}

// Dracula Theme Color Palette
const draculaTheme = {
  background: "#282a36",
  foreground: "#f8f8f2",
  comment: "#6272a4",
  red: "#ff5555",
  orange: "#ffb86c",
  yellow: "#f1fa8c",
  green: "#50fa7b",
  cyan: "#8be9fd",
  purple: "#bd93f9",
  pink: "#ff79c6",
};

export const mdxComponents = {
  // Custom code component with syntax highlighting classes
  code: ({ children, className }: CodeProps) => {
    const language = className?.replace("language-", "") || "text";

    // If it's a Mermaid diagram
    if (language === "mermaid") {
      // Wrap mermaid in a div with prose-none to exclude it from prose styling
      return (
        <div className="not-prose">
          <MermaidDiagram>{String(children || "").trim()}</MermaidDiagram>
        </div>
      );
    }

    // Regular code block with Dracula theme
    return (
      <code
        className={`
          text-sm font-mono rounded-md px-3 py-1.5 border
          bg-[${draculaTheme.background}]
          text-[${draculaTheme.foreground}]
          border-[#44475a]
          ${className || ""}
        `}
        style={{
          backgroundColor: draculaTheme.background,
          color: draculaTheme.foreground,
          borderColor: "#44475a",
        }}
      >
        {children}
      </code>
    );
  },

  // Custom pre component for code blocks with copy button
  pre: ({ children }: PreProps) => {
    return <CodeBlockWrapper>{children}</CodeBlockWrapper>;
  },

  // Headings
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-950 leading-snug tracking-normal mb-6 mt-12">
      {children}
    </h1>
  ),

  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl sm:text-3xl font-bold text-primary-950 leading-snug tracking-tight border-l-4 border-secondary-400 pl-6 my-8">
      {children}
    </h2>
  ),

  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl sm:text-2xl font-bold text-primary-950 leading-snug tracking-tight my-6">
      {children}
    </h3>
  ),

  // Paragraphs
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-gray-950 leading-8 mb-6 text-base font-normal tracking-normal">
      {children}
    </p>
  ),

  // Links
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a
      href={href}
      className="text-secondary-600 font-bold hover:text-secondary-700 underline underline-offset-4 transition-colors duration-200"
    >
      {children}
    </a>
  ),

  // Lists
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="space-y-3 my-6 pl-8 list-disc">{children}</ul>
  ),

  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="space-y-3 my-6 pl-8 list-decimal">{children}</ol>
  ),

  li: ({ children }: { children: React.ReactNode }) => (
    <li className="text-gray-950 leading-7 font-normal text-base">
      {children}
    </li>
  ),

  // Blockquotes
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote
      className="border-l-4 border-secondary-400 pl-6 text-gray-800 italic font-medium bg-gradient-to-br from-gray-50 to-gray-100 py-6 pr-6 rounded-r-lg my-10 leading-8"
      style={{
        borderLeftColor: draculaTheme.pink,
      }}
    >
      {children}
    </blockquote>
  ),

  // Horizontal rule
  hr: () => <hr className="my-10 border-t-2 border-gray-200" />,

  // Images
  img: ({
    src,
    alt,
    ...props
  }: {
    src?: string;
    alt?: string;
    [key: string]: unknown;
  }) => {
    // For MDX, we'll use a regular img tag with fallback since Next.js Image
    // requires width/height props which MDX doesn't provide
    return (
      <img
        src={src}
        alt={alt}
        className="rounded-xl shadow-xl my-10 border-2 border-gray-200 w-full h-auto"
        style={{ width: "100%", height: "auto" }}
        {...props}
      />
    );
  },

  // Tables
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="overflow-x-auto my-8 rounded-lg shadow-sm">
      <table className="w-full border-collapse">{children}</table>
    </div>
  ),

  thead: ({ children }: { children: React.ReactNode }) => (
    <thead className="bg-primary-50">{children}</thead>
  ),

  tbody: ({ children }: { children: React.ReactNode }) => (
    <tbody className="divide-y divide-gray-200">{children}</tbody>
  ),

  tr: ({ children }: { children: React.ReactNode }) => (
    <tr className="hover:bg-gray-50 transition-colors">{children}</tr>
  ),

  th: ({ children }: { children: React.ReactNode }) => (
    <th className="bg-primary-100 border border-gray-300 px-6 py-4 text-left font-semibold text-primary-950 text-sm uppercase tracking-wide">
      {children}
    </th>
  ),

  td: ({ children }: { children: React.ReactNode }) => (
    <td className="border border-gray-300 px-6 py-4 text-gray-800 font-normal">
      {children}
    </td>
  ),

  // Strong and emphasis
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="text-primary-950 font-bold tracking-normal">
      {children}
    </strong>
  ),

  em: ({ children }: { children: React.ReactNode }) => (
    <em className="text-gray-800 font-semibold italic">{children}</em>
  ),
};

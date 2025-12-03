"use client";

import {
  useState,
  useCallback,
  ReactNode,
  isValidElement,
  Children,
} from "react";

interface CodeBlockWrapperProps {
  children: ReactNode;
}

// Dracula theme colors
const draculaTheme = {
  background: "#282a36",
  foreground: "#f8f8f2",
  selection: "#44475a",
  comment: "#6272a4",
  green: "#50fa7b",
  pink: "#ff79c6",
};

// Language display names
const languageNames: Record<
  string,
  { name: string; icon: string; color: string }
> = {
  javascript: { name: "JavaScript", icon: "JS", color: "bg-yellow-500" },
  typescript: { name: "TypeScript", icon: "TS", color: "bg-blue-500" },
  python: { name: "Python", icon: "PY", color: "bg-green-500" },
  jsx: { name: "JSX", icon: "JSX", color: "bg-cyan-500" },
  tsx: { name: "TSX", icon: "TSX", color: "bg-blue-600" },
  html: { name: "HTML", icon: "HTML", color: "bg-orange-500" },
  css: { name: "CSS", icon: "CSS", color: "bg-purple-500" },
  json: { name: "JSON", icon: "{ }", color: "bg-gray-500" },
  bash: { name: "Bash", icon: "$", color: "bg-gray-700" },
  shell: { name: "Shell", icon: "$", color: "bg-gray-700" },
  sql: { name: "SQL", icon: "SQL", color: "bg-blue-400" },
  yaml: { name: "YAML", icon: "YML", color: "bg-red-400" },
  markdown: { name: "Markdown", icon: "MD", color: "bg-gray-600" },
  text: { name: "Text", icon: "TXT", color: "bg-gray-400" },
};

interface ElementWithProps {
  props?: {
    children?: ReactNode;
    className?: string;
  };
}

// Helper to extract text content from React children
function extractTextContent(node: ReactNode): string {
  if (typeof node === "string") {
    return node;
  }
  if (typeof node === "number") {
    return String(node);
  }
  if (isValidElement(node)) {
    const element = node as unknown as ElementWithProps;
    return extractTextContent(element.props?.children);
  }
  if (Array.isArray(node)) {
    return node.map(extractTextContent).join("");
  }
  return "";
}

// Helper to extract language from code element className
function extractLanguage(children: ReactNode): string {
  if (isValidElement(children)) {
    const element = children as unknown as ElementWithProps;
    const className = element.props?.className || "";
    const match = className.match(/language-(\w+)/);
    return match ? match[1] : "text";
  }
  return "text";
}

export default function CodeBlockWrapper({ children }: CodeBlockWrapperProps) {
  const [copied, setCopied] = useState(false);

  // Extract text content for copying
  const textContent = extractTextContent(children);
  const language = extractLanguage(Children.only(children));
  const langConfig =
    languageNames[language.toLowerCase()] || languageNames.text;

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(textContent.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [textContent]);

  return (
    <div
      className="my-8 rounded-xl overflow-hidden shadow-lg group"
      style={{ backgroundColor: draculaTheme.background }}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-4 py-2 border-b"
        style={{
          backgroundColor: draculaTheme.selection,
          borderColor: "#44475a",
        }}
      >
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>

          {/* Language label */}
          <div className="flex items-center gap-2">
            <span
              className={`${langConfig.color} text-white text-xs font-bold px-1.5 py-0.5 rounded`}
            >
              {langConfig.icon}
            </span>
            <span className="text-xs" style={{ color: draculaTheme.comment }}>
              {langConfig.name}
            </span>
          </div>
        </div>

        {/* Copy button */}
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md transition-all duration-200 hover:bg-[#44475a] focus:outline-none focus:ring-2 focus:ring-[#ff79c6] focus:ring-opacity-50 opacity-0 group-hover:opacity-100 focus:opacity-100"
          style={{
            color: copied ? draculaTheme.green : draculaTheme.foreground,
            backgroundColor: copied ? "rgba(80, 250, 123, 0.1)" : "transparent",
          }}
          aria-label={copied ? "Copied!" : "Copy code"}
        >
          {copied ? (
            <>
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
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
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <pre
        className="overflow-x-auto py-6 px-6 m-0"
        style={{
          backgroundColor: draculaTheme.background,
          color: draculaTheme.foreground,
        }}
      >
        {children}
      </pre>
    </div>
  );
}

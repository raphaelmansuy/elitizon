"use client";

import { useState, useCallback } from "react";

interface CodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

// Language display names and icons
const languageConfig: Record<
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
  go: { name: "Go", icon: "GO", color: "bg-cyan-600" },
  rust: { name: "Rust", icon: "RS", color: "bg-orange-600" },
  java: { name: "Java", icon: "☕", color: "bg-red-600" },
  cpp: { name: "C++", icon: "++", color: "bg-blue-700" },
  c: { name: "C", icon: "C", color: "bg-gray-500" },
  text: { name: "Text", icon: "TXT", color: "bg-gray-400" },
};

// Dracula theme colors
const draculaTheme = {
  background: "#282a36",
  foreground: "#f8f8f2",
  selection: "#44475a",
  comment: "#6272a4",
  red: "#ff5555",
  orange: "#ffb86c",
  yellow: "#f1fa8c",
  green: "#50fa7b",
  purple: "#bd93f9",
  cyan: "#8be9fd",
  pink: "#ff79c6",
};

export default function CodeBlock({
  children,
  language = "text",
  filename,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(children.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [children]);

  const config = languageConfig[language.toLowerCase()] || languageConfig.text;
  const lines = children.trim().split("\n");

  return (
    <div
      className="my-6 rounded-xl overflow-hidden shadow-lg group"
      style={{ backgroundColor: draculaTheme.background }}
    >
      {/* Header */}
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

          {/* Filename or language label */}
          {filename ? (
            <span
              className="text-sm font-mono"
              style={{ color: draculaTheme.foreground }}
            >
              {filename}
            </span>
          ) : (
            <div className="flex items-center gap-2">
              <span
                className={`${config.color} text-white text-xs font-bold px-1.5 py-0.5 rounded`}
              >
                {config.icon}
              </span>
              <span className="text-xs" style={{ color: draculaTheme.comment }}>
                {config.name}
              </span>
            </div>
          )}
        </div>

        {/* Copy button */}
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 text-xs px-2 py-1 rounded transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
          style={{
            color: copied ? draculaTheme.green : draculaTheme.comment,
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
      <div className="overflow-x-auto">
        <pre
          className="py-4 px-0 text-sm font-mono leading-relaxed"
          style={{ color: draculaTheme.foreground }}
        >
          <code>
            {lines.map((line, index) => (
              <div
                key={index}
                className="flex hover:bg-white/5 transition-colors"
              >
                {showLineNumbers && (
                  <span
                    className="select-none px-4 text-right min-w-[3rem]"
                    style={{ color: draculaTheme.comment }}
                  >
                    {index + 1}
                  </span>
                )}
                <span className="flex-1 px-4 whitespace-pre">
                  {line || " "}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState, useCallback } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
}

export default function TableOfContents({
  className = "",
}: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // Extract headings from the content
  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) return;

    const elements = article.querySelectorAll("h2, h3, h4");
    const items: TocItem[] = Array.from(elements).map((element, index) => {
      // Ensure element has an ID
      if (!element.id) {
        const id = `heading-${index}-${
          element.textContent
            ?.toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "") || index
        }`;
        element.id = id;
      }
      return {
        id: element.id,
        text: element.textContent || "",
        level: parseInt(element.tagName.charAt(1)),
      };
    });
    setHeadings(items);
  }, []);

  // Track active heading
  const handleScroll = useCallback(() => {
    const headingElements = headings.map(({ id }) =>
      document.getElementById(id)
    );
    const validElements = headingElements.filter(Boolean) as HTMLElement[];

    if (validElements.length === 0) return;

    // Find the first heading that is below the top of the viewport
    const scrollPosition = window.scrollY + 100; // Offset for header

    for (let i = validElements.length - 1; i >= 0; i--) {
      const element = validElements[i];
      if (element.offsetTop <= scrollPosition) {
        setActiveId(headings[i].id);
        return;
      }
    }

    // If no heading is above the scroll position, set the first one
    if (headings.length > 0) {
      setActiveId(headings[0].id);
    }
  }, [headings]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className={`${className}`} aria-label="Table of contents">
      <div className="sticky top-24">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          On This Page
        </h3>
        <ul className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-2 scrollbar-thin">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            const indent = (heading.level - 2) * 12;
            
            return (
              <li
                key={heading.id}
                style={{ paddingLeft: `${indent}px` }}
              >
                <button
                  onClick={() => scrollToHeading(heading.id)}
                  className={`
                    text-left text-[13px] leading-relaxed transition-all duration-200 w-full py-1.5 px-2.5 rounded-lg
                    hover:bg-secondary-50 hover:text-secondary-600
                    ${isActive
                      ? "bg-secondary-50 text-secondary-600 font-semibold border-l-2 border-secondary-500 -ml-0.5"
                      : "text-gray-600 hover:text-gray-800"
                    }
                  `}
                >
                  <span className="line-clamp-2">{heading.text}</span>
                </button>
              </li>
            );
          })}
        </ul>
        
        {/* Progress indicator */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            {headings.findIndex(h => h.id === activeId) + 1} of {headings.length} sections
          </p>
        </div>
      </div>
    </nav>
  );
}

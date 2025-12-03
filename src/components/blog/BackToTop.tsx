"use client";

import { useEffect, useState } from "react";

interface BackToTopProps {
  threshold?: number;
  className?: string;
}

export default function BackToTop({
  threshold = 400,
  className = "",
}: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setIsVisible(scrollTop > threshold);
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility(); // Initial check

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 z-40
        w-12 h-12 rounded-full
        bg-white text-primary-900
        shadow-lg shadow-gray-900/10
        border border-gray-200
        transition-all duration-300 ease-out
        hover:bg-secondary-600 hover:text-white hover:border-secondary-600 hover:scale-110 hover:shadow-xl
        focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2
        active:scale-95
        ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-16 pointer-events-none"
        }
        ${className}
      `}
      aria-label="Back to top"
    >
      {/* Circular progress indicator */}
      <svg
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox="0 0 48 48"
      >
        <circle
          cx="24"
          cy="24"
          r="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray={`${scrollProgress * 1.38} 138`}
          className="opacity-30"
        />
      </svg>

      {/* Arrow icon */}
      <svg
        className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
}

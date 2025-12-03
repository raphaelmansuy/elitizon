"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

interface ImageZoomProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function ImageZoom({
  src,
  alt,
  width = 800,
  height = 600,
  className = "",
}: ImageZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsZoomed(false);
    }
  }, []);

  useEffect(() => {
    if (isZoomed) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isZoomed, handleKeyDown]);

  return (
    <>
      {/* Thumbnail */}
      <div
        className={`relative cursor-zoom-in group ${className}`}
        onClick={() => setIsZoomed(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setIsZoomed(true)}
        aria-label={`Zoom image: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="rounded-xl shadow-xl border-2 border-gray-200 w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
        />
        {/* Zoom hint overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-xl flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
            <div className="flex items-center gap-2 text-gray-700 text-sm font-medium">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
              Click to zoom
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isZoomed && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md cursor-zoom-out p-4"
          onClick={() => setIsZoomed(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`Zoomed image: ${alt}`}
        >
          {/* Close button */}
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close zoom"
          >
            <svg
              className="w-6 h-6"
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

          {/* Zoomed image */}
          <div className="max-w-[90vw] max-h-[90vh] overflow-auto">
            <Image
              src={src}
              alt={alt}
              width={width * 2}
              height={height * 2}
              className="max-w-full h-auto rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Caption */}
          {alt && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-sm max-w-lg text-center">
              {alt}
            </div>
          )}

          {/* Keyboard hint */}
          <div className="absolute bottom-4 right-4 text-white/50 text-xs">
            Press ESC to close
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useEffect, useState } from "react";

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, scrollProgress)));
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress(); // Initial call

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-secondary-500 via-secondary-600 to-accent-emerald-500 transition-all duration-100 ease-out shadow-sm shadow-secondary-500/20"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      />
      {/* Glow effect at the end of the progress bar */}
      {progress > 0 && progress < 100 && (
        <div 
          className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent to-white/40 blur-sm"
          style={{ left: `calc(${progress}% - 2rem)` }}
        />
      )}
    </div>
  );
}

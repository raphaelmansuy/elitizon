"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";

interface MermaidDiagramProps {
  children: string;
}

export default function MermaidDiagram({ children }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isClientSide = typeof window !== "undefined";

  useEffect(() => {
    if (ref.current && isClientSide) {
      mermaid.contentLoaded();

      // Adjust SVG viewBox to remove padding and set white background
      const fixSVG = setInterval(() => {
        const svg = ref.current?.querySelector("svg");
        if (svg) {
          clearInterval(fixSVG);

          // Get current viewBox
          const viewBox = svg.getAttribute("viewBox");
          if (viewBox) {
            const [x, y, width, height] = viewBox.split(" ").map(Number);
            // Reduce padding by adjusting viewBox coordinates - remove ~2% from edges
            const padding = Math.min(width, height) * 0.02;
            svg.setAttribute(
              "viewBox",
              `${x + padding} ${y + padding} ${width - padding * 2} ${
                height - padding * 2
              }`
            );
          }

          // Set white background
          svg.style.backgroundColor = "white";
        }
      }, 5);

      setTimeout(() => clearInterval(fixSVG), 1000);
    }
  }, [isClientSide]);

  return (
    <div
      ref={ref}
      className="mermaid my-6"
      style={{
        background: "white",
        width: "100%",
        overflow: "auto",
      }}
      suppressHydrationWarning
    >
      {children}
    </div>
  );
}

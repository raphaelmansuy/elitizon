"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

interface MermaidDiagramProps {
  children: string;
}

// Initialize mermaid once
let initialized = false;
function initMermaid() {
  if (initialized) return;
  mermaid.initialize({
    startOnLoad: false,
    theme: "base",
    securityLevel: "loose",
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true,
      curve: "basis",
      padding: 15,
      nodeSpacing: 50,
      rankSpacing: 50,
    },
    themeVariables: {
      // Node styling - clean white with dark borders
      primaryColor: "#ffffff",
      primaryBorderColor: "#1e293b",
      primaryTextColor: "#1e293b",

      // Secondary nodes
      secondaryColor: "#f8fafc",
      secondaryBorderColor: "#475569",
      secondaryTextColor: "#1e293b",

      // Tertiary nodes
      tertiaryColor: "#f1f5f9",
      tertiaryBorderColor: "#64748b",
      tertiaryTextColor: "#1e293b",

      // Background and general
      background: "#ffffff",
      mainBkg: "#ffffff",

      // Lines and arrows - dark and visible
      lineColor: "#334155",
      arrowheadColor: "#334155",

      // Cluster/subgraph styling
      clusterBkg: "#f8fafc",
      clusterBorder: "#94a3b8",

      // Text and labels
      textColor: "#1e293b",
      edgeLabelBackground: "#ffffff",

      // Node border width
      nodeBorder: "#1e293b",

      // Typography
      fontSize: "14px",
      fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif",
    },
  });
  initialized = true;
}

export default function MermaidDiagram({ children }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    initMermaid();

    const renderDiagram = async () => {
      try {
        const diagramCode = String(children).trim();
        const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;

        // mermaid.render historically returned a string (the SVG) and in
        // some versions returns an object like { svg, bindFunctions }. Be
        // defensive and handle both shapes so rendering works across
        // mermaid releases and bundlers.
        const rendered = await mermaid.render(id, diagramCode as string);

        let renderedSvg: string | undefined;
        if (typeof rendered === "string") {
          renderedSvg = rendered;
        } else if (rendered && typeof rendered === "object") {
          // Some builds return { svg: '...'} or have an outerHTML-like
          // property. Cast to a typed shape via `unknown` to avoid `any`.
          const asObj = rendered as unknown as {
            svg?: string;
            outerHTML?: string;
          };
          renderedSvg = asObj.svg ?? asObj.outerHTML ?? undefined;
        }

        if (!renderedSvg) {
          throw new Error("Mermaid returned no SVG (render result unexpected)");
        }

        setSvg(renderedSvg);
        setError("");
      } catch (err) {
        // Provide better error feedback for debugging in the browser
        console.error("Mermaid render error:", err);
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
      }
    };

    renderDiagram();
  }, [children]);

  // Post-process SVG for better styling
  useEffect(() => {
    if (!svg || !containerRef.current) return;

    const svgElement = containerRef.current.querySelector("svg");
    if (!svgElement) return;

    // Set proper dimensions
    svgElement.style.maxWidth = "100%";
    svgElement.style.height = "auto";
    svgElement.style.display = "block";
    svgElement.style.margin = "0 auto";

    // Enhance node borders for better visibility
    const nodes = svgElement.querySelectorAll(
      ".node rect, .node circle, .node ellipse, .node polygon, .node path"
    );
    nodes.forEach((node) => {
      const element = node as SVGElement;
      if (!element.style.stroke || element.style.stroke === "none") {
        element.style.stroke = "#1e293b";
      }
      element.style.strokeWidth = "2px";
    });

    // Enhance edge/arrow visibility
    const edges = svgElement.querySelectorAll(".edgePath path");
    edges.forEach((edge) => {
      const element = edge as SVGElement;
      element.style.stroke = "#334155";
      element.style.strokeWidth = "2px";
    });

    // Enhance arrowheads
    const markers = svgElement.querySelectorAll("marker path");
    markers.forEach((marker) => {
      const element = marker as SVGElement;
      element.style.fill = "#334155";
    });

    // Enhance cluster/subgraph borders
    const clusters = svgElement.querySelectorAll(".cluster rect");
    clusters.forEach((cluster) => {
      const element = cluster as SVGElement;
      element.style.stroke = "#64748b";
      element.style.strokeWidth = "2px";
      element.style.fill = "#f8fafc";
    });
  }, [svg]);

  if (error) {
    return (
      <div
        className="my-8 not-prose"
        style={{
          background: "#fef2f2",
          padding: "16px",
          borderRadius: "8px",
          border: "1px solid #fecaca",
          color: "#dc2626",
          fontFamily: "monospace",
          fontSize: "12px",
          whiteSpace: "pre-wrap",
        }}
      >
        <strong>Mermaid Error:</strong>
        <br />
        {error}
      </div>
    );
  }

  const containerStyle = {
    background: "#ffffff",
    width: "100%",
    overflow: "auto" as const,
    padding: "24px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    boxShadow:
      "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
  };

  // When SVG is rendered, use dangerouslySetInnerHTML
  if (svg) {
    return (
      <div
        ref={containerRef}
        className="my-8 not-prose"
        style={containerStyle}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  }

  // Loading state - no SVG yet
  return (
    <div ref={containerRef} className="my-8 not-prose" style={containerStyle}>
      <div style={{ textAlign: "center", color: "#6b7280" }}>
        Loading diagram...
      </div>
    </div>
  );
}

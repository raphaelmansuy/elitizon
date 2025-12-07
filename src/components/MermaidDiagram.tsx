"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

interface MermaidDiagramProps {
  children: string;
}

// Initialize mermaid once. Accept optional overrides for font family
// and font size so we can reconfigure mermaid at render time after
// waiting for the page webfont to load. This allows mermaid to compute
// layout using the same font metrics as the page and prevents clipping.
let initialized = false;
function initMermaid(overrides?: { fontFamily?: string; fontSize?: string }) {
  if (!initialized) {
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

        // Typography defaults; may be overridden at render time
        fontSize: overrides?.fontSize ?? "14px",
        fontFamily:
          overrides?.fontFamily ??
          "var(--font-inter), Inter, ui-sans-serif, system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif",
      },
    });

    initialized = true;
    return;
  }

  // If mermaid is already initialized but we have font overrides, update
  // the theme variables so subsequent renders use the correct metrics.
  if (overrides) {
    try {
      mermaid.initialize({
        themeVariables: {
          fontSize: overrides.fontSize,
          fontFamily: overrides.fontFamily,
        },
      });
    } catch (e) {
      // Non-fatal: some mermaid builds may not accept repeated initialize
      // calls in exactly the same way — this is a best-effort attempt.
      // eslint-disable-next-line no-console
      console.warn("Mermaid: failed to reinitialize theme variables", e);
    }
  }
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
        // Wait for document fonts to be ready so text measurement uses the
        // intended webfont (Inter) instead of a fallback. This prevents
        // text clipping or layout changes caused by FOIT/FOUT when the
        // SVG is rendered before the font is available. Use a short
        // timeout to avoid long waits in the rare case `document.fonts`
        // is unavailable or takes too long.
        if (typeof document !== "undefined") {
          const fonts = (
            document as unknown as {
              fonts?: { ready: Promise<void> };
            }
          ).fonts;
          if (fonts) {
            try {
              await Promise.race([
                fonts.ready,
                new Promise((res) => setTimeout(res, 1500)),
              ]);
            } catch {
              // Ignore font waiting errors — we still attempt render.
            }
          }
        }

        // After waiting for webfonts, compute the page font family and size
        // and reinitialize mermaid theme variables so layout math (text
        // measurement) matches the page. This is necessary because mermaid
        // computes bounding boxes based on the configured `fontSize`.
        try {
          const computed = window.getComputedStyle(document.body);
          const pageFontFamily = computed?.fontFamily || undefined;
          const pageFontSize = computed?.fontSize || undefined;
          if (pageFontFamily || pageFontSize) {
            initMermaid({ fontFamily: pageFontFamily, fontSize: pageFontSize });
          }
        } catch {
          // non-fatal
        }

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

    // Enforce the page's computed font on all SVG text elements so the
    // exact Inter metrics are used. This avoids cases where CSS variables
    // or external stylesheet rules aren't applied to the inline SVG text
    // nodes, which can produce clipping or mismatched glyph metrics.
    try {
      const computedFont = window.getComputedStyle(document.body).fontFamily;
      const computedFontSize = window.getComputedStyle(document.body).fontSize;

      if (computedFont) {
        // Apply to the root <svg> as a style and to all text/tspan elements
        svgElement.style.fontFamily = computedFont;
        svgElement.style.fontSize = computedFontSize;

        const textNodes = svgElement.querySelectorAll("text, tspan");
        textNodes.forEach((n) => {
          const el = n as SVGElement & { style: CSSStyleDeclaration };
          el.style.fontFamily = computedFont;
          el.style.fontSize = computedFontSize;
        });
      }
    } catch (e) {
      // non-fatal — if this fails, rendering still falls back to mermaid's defaults
      // eslint-disable-next-line no-console
      console.warn("Mermaid: could not inline computed font into SVG", e);
    }
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

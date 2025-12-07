"use client";
import { useEffect, useState } from "react";
import MermaidDiagram from "@/components/MermaidDiagram";

interface MermaidRendererProps {
  code: string;
}

/**
 * Client component that renders mermaid diagrams.
 * Checks for pre-rendered static diagrams first, then falls back to
 * interactive client-side rendering via MermaidDiagram component.
 */
export default function MermaidRenderer({ code }: MermaidRendererProps) {
  const [staticSrc, setStaticSrc] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function checkManifest() {
      try {
        const res = await fetch("/diagrams/manifest.json");
        if (!res.ok) return;
        const manifest = await res.json();
        // simple djb2 hash to match generator
        function djb2(str: string) {
          let h = 5381;
          for (let i = 0; i < str.length; i++) h = (h * 33) ^ str.charCodeAt(i);
          return (h >>> 0).toString(16);
        }
        const hash = djb2(code.trim());
        const filename = manifest[hash];
        if (filename && !cancelled) {
          setStaticSrc("/diagrams/" + filename);
        }
      } catch {
        // ignore; fallback will render interactive mermaid
      }
    }

    checkManifest();
    return () => {
      cancelled = true;
    };
  }, [code]);

  if (staticSrc) {
    return (
      <div className="not-prose">
        <img
          src={staticSrc}
          alt="Mermaid diagram"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            margin: "0 auto",
          }}
        />
      </div>
    );
  }

  return (
    <div className="not-prose">
      <MermaidDiagram>{code}</MermaidDiagram>
    </div>
  );
}

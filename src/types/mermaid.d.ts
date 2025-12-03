import type { MermaidConfig } from "mermaid";

declare global {
  interface Window {
    mermaid: {
      contentLoaded: () => void;
      initialize: (config: MermaidConfig) => void;
      render: (
        id: string,
        definition: string
      ) => Promise<{
        svg: string;
        bindFunctions?: (svg: SVGSVGElement) => void;
      }>;
    };
  }
}

export {};

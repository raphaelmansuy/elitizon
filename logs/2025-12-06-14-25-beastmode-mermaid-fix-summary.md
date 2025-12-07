# 2025-12-06-14:25 - Mermaid font-size & layout fixes

## Summary

- Implemented font-size synchronization for client-side Mermaid rendering.
- Ensured mermaid receives the page computed `font-family` and `font-size` before rendering by:
  - Adding `initMermaid(overrides?)` to accept `fontFamily` and `fontSize` and reinitialize themeVariables.
  - Waiting for `document.fonts.ready` before computing page styles.
  - Reinitializing mermaid with the computed page font family/size prior to calling `mermaid.render()`.
- Post-processing: inlined computed font onto the generated SVG root and `text`/`tspan` nodes to ensure consistent metrics.
- Tweaked node/edge styles in the post-process hook for better visibility.

## Files changed

- `src/components/MermaidDiagram.tsx`
  - Allow reinitializing mermaid theme variables at render time.
  - Wait for `document.fonts.ready` and pass `fontSize`/`fontFamily` to `initMermaid`.
  - Inline computed font onto SVG text nodes after render.

## Visual verification

- Captured screenshots (Playwright) before/after:
  - `.playwright-mcp/mermaid-debug.png` (earlier)
  - `.playwright-mcp/homepage-debug.png`
  - `.playwright-mcp/mermaid-test-debug.png`
  - `.playwright-mcp/services-debug.png`
  - `.playwright-mcp/contact-debug.png`
  - `.playwright-mcp/mermaid-test-after.png` (after changes)
- Inspected large SVGs' `<style>` blocks — they now include `font-size:16px` and the font-family matching the page.
- Verified `<foreignObject>` inner HTML computed styles use the Inter font at `16px`.

## Remaining work / recommendations

- Rare edge cases may persist across browsers: consider one of these (ordered):
  1. Embed the Inter font into the generated SVGs (`@font-face` + base64) for pixel-identical rendering across clients. Pros: deterministic; Cons: large SVG size, licensing/perf concerns.
  2. Server-side pre-render SVGs at build time in a headless environment with Inter installed and use them as static assets (deterministic, but increases build complexity).
  3. Render mermaid diagrams in a sandboxed iframe with explicit CSS loading so the font and CSS are guaranteed to be present when mermaid computes layout.

## Next steps

- If you want me to proceed, I can implement option 1 (embed font in SVG) as a quick test, or option 2 (build-time pre-render) for production-grade reliability. Both have tradeoffs; tell me which to implement and I'll proceed.

---

Saved by the agent.

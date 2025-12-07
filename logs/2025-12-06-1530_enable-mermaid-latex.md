# 2025-12-06-1530_enable-mermaid-latex

## What was done

- Added KaTeX dependency to project (package.json) to enable Mermaid to render LaTeX when using legacy mode.
- Updated `src/app/blog/[slug]/page.tsx` to include the KaTeX stylesheet and enable `forceLegacyMathML` in the mermaid initialization so diagrams using $$...$$ render correctly.

## Files changed

- package.json (added katex@^0.16.25)
- src/app/blog/[slug]/page.tsx (included KaTeX stylesheet link and mermaid initialize flag)

## Validation

- Ran `npm install` to add KaTeX (verified package installed).
- Ran `npm run type-check`, `npm run lint`, and `npm run build` — all passed and static blog pages were generated successfully.

## Next steps

- Optionally add KaTeX stylesheet integrity attributes for strict CSP.
- Validate rendering in the browser (dev server) and adjust mermaid options for different devices if necessary.
- Decide whether to also add KaTeX CDN link to page-level metadata (for SSR/SEO head) rather than inserting as a link element inside the page.

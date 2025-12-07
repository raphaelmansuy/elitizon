## Task logs - generate mermaid SVGs

- Actions: Added `scripts/generate-mermaid.js`, updated `package.json` scripts, patched `src/lib/mdx-components.tsx` to prefer pre-rendered SVGs, ran production build and generator to produce `public/diagrams/*.svg` and `public/diagrams/manifest.json`, added `scripts/README.md`.
- Decisions: Use Playwright + Chromium to render mermaid diagrams headlessly so SVGs can embed the site's Inter font (pulled from `.next/static/media/*.woff2`). Use a simple djb2 hash to map diagram content -> filename and a manifest for lookup from the client.
- Next steps: (1) Optionally run Playwright visual checks to verify appearance across pages, (2) add `npm run generate:mermaid` into CI pipeline (see notes), (3) update docs or add a small CLI wrapper if desired.
- Lessons/insights: Embedding font from `.next` requires a build step first; generator will still work without the font but SVGs will use fallback fonts. Using a manifest makes client-side lookup simple and avoids exposing file system specifics.

# Mermaid generator

This script scans `content/**/*.mdx` for `mermaid` code blocks, renders them headlessly using Playwright + Chromium, and writes static SVG files to `public/diagrams/`.

## Usage

- Build the site so Next.js downloads the Inter font and places it in `.next/static/media`:

```bash
npm run build
```

- Run the generator:

```bash
npm run generate:mermaid
```

## Output

- `public/diagrams/*.svg` — generated SVG files
- `public/diagrams/manifest.json` — mapping of diagram content hash -> filename, used by the MDX renderer to prefer static SVGs

## Notes

- If you don't run `npm run build` first, generator will still produce SVGs but will not embed the Inter woff2 font (SVGs will be rendered with system fallback fonts).
- The generator requires `playwright` to be installed (present in devDependencies).

# 2025-12-06-15-54_beastmode_fix-mermaid-not-prose

## What I changed

- Fixed MDX pre/code rendering so Mermaid diagrams render as diagrams (no codebox chrome) while keeping the codebox UI for real code blocks.
- Updated detection logic in `src/lib/mdx-components.tsx` to recognize mermaid blocks reliably when MDX passes either element nodes or raw strings.

Files edited:

- src/lib/mdx-components.tsx — improved containsNotProse() to detect language-mermaid classes and common mermaid keywords inside raw strings.

## Why

- Mermaid diagrams should appear as rendered diagrams in blog posts (not as code blocks with a copy header) per the user request.

## Validation done

- Rebuilt the app and started the production server locally.
- Confirmed on `/blog/autonomy-heartbeat` and `/blog/mermaid-test` that mermaid blocks are now rendered directly (no codebox chrome). Regular code blocks continue to show the copy header and UI.

## Next steps (optional)

- Visual cross-browser QA to confirm KaTeX math inside Mermaid renders correctly (desktop + mobile).
- Consider host KaTeX assets locally or add SRI/integrity attributes for stricter CSP.

---

Task logs:

- Actions: updated mdx detection logic, rebuilt site, verified rendering.
- Decisions: use a robust detection heuristic for mermaid (class / keywords) instead of relying on exact DOM shape.
- Next: optionally harden KaTeX asset loading.
- Lessons: MDX children shapes vary (elements vs strings) — robust detection is necessary.

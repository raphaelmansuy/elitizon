# 2025-12-04 11:23 — Move viewport metadata to viewport export

## What I did

- Next.js warned: "Unsupported metadata viewport is configured in metadata export ... Please move it to viewport export instead" for several routes.
- Moved `viewport`, `colorScheme`, and `themeColor` from the `metadata` export into a top-level `export const viewport: Viewport` in `src/app/layout.tsx`.
- Added `Viewport` type import from `next` and typed the export.

## Why

- Next.js App Router (v14+) expects viewport fields in the `viewport` export or via `generateViewport` instead of inside `metadata`.
- Moving them removes build time warnings and adheres to the official API.

## Verification

- Ran `npx tsc --noEmit` and `npm run build` — build succeeded and previous viewport warnings no longer appeared.

## Next steps

- Keep an eye on CI; Next.js may auto-suggest edits to `tsconfig` or similar files during builds.
- Consider adding a code comment or small test to make it clear which metadata fields should live where.

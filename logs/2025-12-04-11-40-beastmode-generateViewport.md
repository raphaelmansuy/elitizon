# 2025-12-04 11:40 — Per-route generateViewport additions

## What I did

- Added runtime `generateViewport()` exports to two places to enable route-specific viewport configuration:
  - `src/app/contact/layout.tsx` — returns a Viewport object with a contact-specific themeColor and colorScheme
  - `src/app/careers/page.tsx` — returns a Viewport object tuned for the careers route

## Why

- `generateViewport()` allows dynamic per-route viewport metadata when runtime values or search params determine viewport behavior. This adheres to the Next.js App Router API.

## Verification

- Ran `npx tsc --noEmit` — passed.
- Ran `npm run build` — build completed with no viewport warnings.

## Next steps

- Optionally convert additional routes to `generateViewport` if their viewport should vary per-route.
- Add tests that verify `viewport`/`generateViewport` usage or lint rules that catch misplaced viewport properties inside `metadata` to prevent regressions.

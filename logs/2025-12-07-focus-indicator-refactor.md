# 2025-12-07 Focus Indicator Refactor — TOC & BlogCard Accessibility

## What was done

### 1. TableOfContents Component (`src/components/blog/TableOfContents.tsx`)

- **Changed**: Button focus styling from `focus-visible:ring-inset` to `focus-visible:ring-offset-2`
  - **Reason**: `ring-inset` caused visual stacking with `border-l-2`, creating a multi-layered border effect that obscured content
  - **New approach**: Offset ring sits outside button boundary, cleaner separation
- **Updated**: `aria-current` from `"true"` to `"page"` (correct ARIA semantics per spec)
- **Refined**: Hover state to use `hover:bg-gray-100` instead of `hover:bg-secondary-50` for subtler interaction
- **Preserved**: Left border indicator (`border-l-2`) for visual state signaling, now with proper focus ring separation
- **Result**: Clean, single-layer focus ring that doesn't conflict with active state styling

### 2. BlogCard Component (`src/components/blog/BlogCard.tsx`)

- **Changed**: All variants (default, featured, horizontal) from `:focus` to `:focus-visible`
  - **Reason**: `:focus-visible` shows focus ring only on keyboard navigation, not mouse clicks (better UX)
- **Reordered**: Class attributes to place `rounded-*` before focus classes for better readability
- **Updated**: All three variants to use `focus-visible:ring-offset-2` for consistency
- **Result**: Unified focus behavior across card types, keyboard-aware focus indicators

## What went well

1. **Research-backed approach**: Deque accessibility article confirmed that mixing `border` + `ring-inset` + `background` creates visual confusion. Moving to `ring-offset` resolved it.
2. **Minimal changes, maximum impact**: Only modified focus-related classes; no layout or component logic changed
3. **Consistent semantics**: Switched all cards to `:focus-visible` for keyboard-first accessibility pattern
4. **Zero breaking changes**: ESLint and TypeScript pass without new errors; backward compatible
5. **ARIA improvement**: `aria-current="page"` is more semantically correct than `"true"` for navigation context

## What went wrong

1. **Google search blocked**: Attempted to fetch Tailwind documentation via Google but hit 429 rate limit
   - **Workaround**: Used `tailwindcss.com` docs directly (successfully fetched)
2. **Initial misunderstanding of ring offset**: Initially thought `ring-inset` would be interior; research clarified it creates visual stacking with borders
   - **Resolution**: Confirmed via MDN `:focus-visible` docs and Deque article that offset rings prevent clipping

## Lessons learned

1. **Accessibility first**: Deque article emphasizes "disappearing focus" as a key anti-pattern — our changes prevent this by ensuring focus ring is always visible and unobstructed
2. **Semantic ARIA matters**: `aria-current` should reflect the type of context (page/step/date/etc.), not just `true`
3. **Keyboard-aware design**: `:focus-visible` is a modern best practice that respects user input modality (keyboard vs. mouse)
4. **Testing is critical**: Pre-existing lint warnings (unused eslint-disable, img element) didn't block but should be cleaned in future pass
5. **Documentation quality**: Deque's focus indicator guide is more prescriptive than MDN; both sources align on using offset/outline over inset rings

## Testing notes

- **Lint**: Passed (existing warnings in MermaidRenderer unrelated)
- **Type-check**: Passed (no TypeScript errors)
- **Manual verification needed**:
  - Tab through TOC buttons to verify ring appears cleanly
  - Tab through blog cards to verify offset ring doesn't clip
  - Click cards with mouse to verify `:focus-visible` doesn't show ring (expected)

## Files modified

1. `src/components/blog/TableOfContents.tsx` (lines ~135-160)
2. `src/components/blog/BlogCard.tsx` (lines ~23, ~108, ~158)

## Next steps / future improvements

1. Consider adding `outline-offset: 2px` comment in Tailwind config for documentation
2. Audit other interactive components (buttons, forms) for similar focus ring patterns
3. Clean up pre-existing linting warnings in MermaidDiagram/MermaidRenderer
4. Consider adding focus indicator tests to e2e suite (Playwright)
5. Document focus color palette in design system (secondary-500 offset)

---

**Key insight**: The selection border issue was rooted in conflicting visual layers (border + inset ring + background). Switching to `:focus-visible:ring-offset` removes that conflict and aligns with modern accessibility best practices from Deque and WCAG guidelines.

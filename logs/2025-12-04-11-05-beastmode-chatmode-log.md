# 2025-12-04-11-05 Beastmode Fix — Next.js build worker exit

## Actions
- Located the Next.js build worker exit root cause (TypeScript/undefined symbol in botProtection.ts).
- Added missing SPAM_KEYWORD_PATTERNS to `src/lib/botProtection.ts`.
- Removed `.next/types` from `tsconfig.json` include to avoid stale generated types interfering with type checks.
- Re-ran `npx tsc --noEmit` and `npm run build` — both succeed now.

## Decisions
- Keep SPAM_KEYWORD_PATTERNS inline within `botProtection.ts` for now (conservative regex list). We can centralize later if needed.
- Reverting `.next/types` removal is not necessary — Next.js may add it back; it's safe for the build, but excluding it improves local tsc reliability.

## Next steps
- Consider adding unit tests for `analyzeContentForSpam` to lock in behavior.
- Optionally move spam keyword patterns to a shared config file so they can be tuned without code changes.

## Lessons / Insights
- Missing constants will cause build worker failure; verifying TypeScript errors and `.next` generated types is important when diagnosing Next.js build problems.

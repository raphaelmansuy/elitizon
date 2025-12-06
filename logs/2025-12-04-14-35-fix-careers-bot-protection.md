# 2025-12-04-fix-careers-bot-protection

## What was done

- Audited forms and API routes for bot protection (contact and careers). Found careers apply flow lacked the client-side honeypot and timing fields and the server-side bot-check.
- Implemented honeypot + formStartTime on the frontend careers apply form at `src/app/careers/apply/page.tsx`.
- Extended `careerSchema` in `src/lib/validation.ts` to accept `honeypot` and `formStartTime`.
- Added server-side bot detection to `src/app/api/careers/apply/route.ts` using existing `checkForBot` in `src/lib/botProtection.ts`.
- Ensured the endpoint returns a generic success message for blocked bot submissions (to avoid leaking detection logic).
- Created branch `fix/careers-bot-protection` and opened PR #14.

## Tests / Validation

- TypeScript type-check: `npm run type-check` (passed)
- ESLint: `npm run lint` (passed)
- PR created on GitHub: https://github.com/raphaelmansuy/elitizon/pull/14

## Next steps

- Review PR and merge to `main` if approved.
- Consider adding similar bot checks to any other publicly-exposed APIs (e.g., future newsletter signup endpoints).

## Notes

- Contact forms were already protected and left unchanged.

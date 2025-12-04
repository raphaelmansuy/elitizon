# 2025-12-04-12-15_remove_netlify_config

## What was done
- Disabled Netlify automated pipeline and removed Netlify specific config from the active CI flow.
- Changes made:
  - Updated `.github/workflows/netlify-deploy.yml` to only allow manual dispatch and replaced auto-deploy jobs with a no-op job.
  - Disabled `netlify.toml` by replacing content with a clear note that Netlify integration is disabled (left file in place for history).
  - Removed `build:netlify` npm script and removed `@netlify/plugin-nextjs` from `package.json` devDependencies.
  - Updated `.env.example` to remove Netlify-specific environment variables and clarified the header.
  - Updated `.gitignore` to remove Netlify entries (commented as removed).
  - Disabled `scripts/deploy-netlify.sh` by making it a no-op and adding a clear informational message.
  - Updated `Makefile` to mark `deploy-netlify` target as deprecated/disabled.

## What went well
- Changes were scoped and non-invasive — no TypeScript errors after edits (confirmed with `npx tsc --noEmit`).
- The Netlify workflow and related scripts were disabled and annotated so future maintainers understand why.

## What went wrong
- Couldn't safely delete files automatically (retained `netlify.toml` and `netlify-deploy.yml` but disabled them). This approach avoids accidental triggering while leaving history and a clear path to re-enable if needed.

## Lessons learned
- Netlify checks can be triggered from multiple places (Netlify UI/integrations and repository files); disabling repo-side config reduces accidental CI runs but does not remove Netlify site integrations in Netlify dashboard.
- Next step likely required: unlink the site from the Netlify dashboard or remove Netlify integration from GitHub (organization settings) to fully stop external checks.

## Next steps
- Optionally remove the Netlify application/integration from the GitHub repository settings or Netlify site settings to remove external checks.
- Run `npm install` to update `package-lock.json` if desired.


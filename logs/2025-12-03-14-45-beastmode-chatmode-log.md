# 2025-12-03-14-45 Commit & Push Log

## Actions

- Reviewed working tree and diffs for blog UX changes.
- Staged specific files (avoided adding large/unwanted untracked files).
- Committed staged files with message: "feat(blog): polish blog UX — improved index, post layout, styles; add dev log".
- Pushed the commit to remote branch `feature/blog-integration` and set upstream.

## Decisions

- Staged only targeted files to avoid accidentally committing Playwright screenshots or unrelated untracked files.
- Kept the commit message concise but descriptive following conventional commit style.

## Next steps

- Open a PR for `feature/blog-integration` if you'd like a review pipeline (GitHub suggested it after push).
- Manual visual QA in browser and device testing for the updated blog components.

## Lessons / Insights

- Quoting paths is necessary when using zsh and filenames with brackets (e.g., `[slug]`).
- Keeping untracked binary files out of commits reduces risk of large unintended pushes.

# AI Coding Agent Instructions - ELITIZON

This document guides AI coding agents in effectively maintaining and extending the ELITIZON Next.js 15 web application. Focus on understanding the architectural decisions, development patterns, and domain-specific conventions.

## Project Overview

ELITIZON is a modern Next.js 15 SaaS website for a global AI consulting company. The tech stack is **Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4** with AWS SES for email delivery. It emphasizes **SEO optimization, accessibility compliance (WCAG 2.1), and enterprise-grade security**.

**Key URLs & Entry Points:**

- Homepage: `src/app/page.tsx` (orchestrates Hero, Services, About, Contact sections)
- Layout/Navigation: `src/app/layout.tsx` (global metadata, SEO, structure)
- Contact API: `src/app/api/contact/route.ts` (AWS SES integration, form validation)
- Styling config: `tailwind.config.ts` (brand navy, pink, accent colors)

## Architecture Essentials

### Component Hierarchy

- **Pages**: Each route is a `page.tsx` exporting `metadata` (SEO) + default component
- **Reusable Components**: `src/components/*` follow atomic design; composed into pages
- **API Routes**: Named exports (`POST`, `GET`) in `src/app/api/**route.ts`; use `NextRequest`/`NextResponse`
- **Shared Logic**: `src/lib/` contains utilities (schema, validation, AWS SES, rate limiting)

### Data Flow Patterns

1. **Contact Form** → `ContactEnhanced.tsx` → POST `/api/contact` → AWS SES → email sent + confirmation
2. **Metadata/SEO** → Page exports `metadata` + injects structured data from `src/lib/schema.ts`
3. **Styling** → Tailwind utilities only; no CSS files except `globals.css` base

### Critical Integration: AWS SES

Located in `src/app/api/contact/route.ts` and `src/lib/aws-ses.ts`:

- **Setup Required**: `.env.local` must have `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`
- **Client Code**: Uses `@aws-sdk/client-ses` v3; `SESClient` configured once per module
- **Email Template**: Generated as HTML+text; prioritizes high-budget leads
- **Rate Limiting**: Enforced at API level (5 requests per 15 minutes per IP)
- **Sandbox Mode**: Confirmation emails may fail if recipient email not verified—expected behavior logged as warning

## Development Patterns & Conventions

### TypeScript Guidelines

```typescript
// ✅ Always use type imports for types
import type { Metadata } from "next";
import type { ContactFormData } from "@/lib/validation";

// ✅ Interface for all component props
interface Props {
  title: string;
  onSubmit: (data: FormData) => void;
}

// ✅ Validation via Joi schema
const contactSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(2).max(100).required(),
  message: Joi.string().min(10).max(5000).required(),
});
```

### Component Pattern

- Default export only; functional components with hooks
- Props always defined as interface
- Tailwind classes only for styling (no inline styles)
- Accessibility: Use ARIA, semantic HTML, skip navigation links

### API Route Pattern

```typescript
export async function POST(request: NextRequest) {
  const data = await request.json();
  const { error, value } = validateInput(contactSchema, data);
  if (error) return NextResponse.json({ message: error }, { status: 400 });
  // Process, handle errors with handleSESError()
  return NextResponse.json({ message: "Success" }, { status: 200 });
}
```

### Metadata (SEO)

Every page must export `metadata`:

```typescript
export const metadata: Metadata = {
  title: "Page Title | ELITIZON",
  description: "Under 160 chars",
  keywords: "comma,separated,keywords",
  openGraph: {
    /* ... */
  },
};
```

## Build & Development Commands

**Key NPM Scripts** (defined in `package.json`):

- `npm run dev` → Turbopack dev server (http://localhost:3000)
- `npm run build` → Production build → `.next/` directory
- `npm start` → Serve `.next/` (requires build first)
- `npm run lint` → ESLint checks (runs automatically on CI)
- `npm run type-check` → TypeScript type validation
- `npm run validate:all` → SEO + accessibility tests

**Makefile Shortcuts** (in repo root):

- `make dev` → Development server
- `make build` → Production build
- `make lint-fix` → Auto-fix linting issues
- `make validate` → Run all validations

## Common Workflows

### Adding a New Page

1. Create `src/app/[route]/page.tsx`
2. Export `metadata` object with title/description/keywords
3. Import/compose UI components
4. Add navigation link in `src/components/Navigation.tsx`
5. Test metadata: check `<head>` in DevTools

### Adding an API Endpoint

1. Create `src/app/api/[route]/route.ts`
2. Define data interface, validation schema (use Joi)
3. Export `POST`, `GET`, etc. handlers
4. Validate input, handle errors with consistent JSON response
5. Test with: `curl -X POST http://localhost:3000/api/[route] -d '...'`

### Modifying Contact Form

- Form UI: `src/components/ContactEnhanced.tsx` (state management, client logic)
- API endpoint: `src/app/api/contact/route.ts` (validation, SES dispatch)
- Email template: Inside `generateEmailContent()` in route.ts (HTML + text versions)
- Validation: `src/lib/validation.ts` (Joi schema for name/email/message/etc.)
- Rate limiting: `src/lib/rateLimit.ts` (5 req per 15 min per IP)

## Development Process

All coding tasks follow a structured 4-phase process to ensure clarity, traceability, and continuous improvement:

### Phase 1: Task Understanding

- **Read the request** carefully and identify key requirements
- **Ask clarifying questions** if the task is ambiguous (scope, constraints, success criteria)
- **Identify dependencies** (files to read, related components, external systems)
- **Break down complexity** into smaller, actionable sub-tasks
- **Document assumptions** about the task intent

### Phase 2: Plan

- **Map affected files** (which components, pages, APIs, utilities need changes)
- **Identify data flows** (how changes propagate through the system)
- **List test cases** (what should be verified after implementation)
- **Check for side effects** (will this change break existing functionality?)
- **Sequence steps** logically (dependencies between changes)

### Phase 3: Execute

- **Implement changes** step-by-step following project conventions
- **Validate each step** (run type checks, lints, quick tests)
- **Iterate if needed** (adjust plan based on actual implementation)
- **Continue until task is complete** or declare unfeasible with clear reasoning
- **Avoid scope creep** (stick to the original task unless new issues are critical)

### Phase 4: Reflect & Document

After task completion (or stopping point), create a concise reflection document at:

```
./logs/YYYY-MM-DD-HHMM_task_name.md
```

**Document structure:**

- **What was done**: Brief summary of changes made and files affected
- **What went well**: Patterns that worked, smooth implementations, helpful conventions
- **What went wrong**: Blockers, unexpected issues, assumptions that failed
- **Lessons learned**: Improvements to process/documentation, patterns to reinforce/change

**Example reflection entry:**

```markdown
# 2025-10-21-1430_add_newsletter_signup

## What was done

- Added NewsletterSignup.tsx component with form validation
- Extended contact schema with newsletter field
- Updated homepage to include signup section
- Files: src/components/NewsletterSignup.tsx, src/lib/validation.ts, src/app/page.tsx

## What went well

- Reusing existing Joi validation patterns made schema updates seamless
- Tailwind design system had all needed colors; no custom styling required
- Navigation update was straightforward; component composition is well-organized

## What went wrong

- Initial misunderstanding of email confirmation flow delayed implementation by 15 minutes
- Had to trace through aws-ses.ts to confirm sandbox mode limitations on confirmation emails

## Lessons learned

- AWS SES sandbox mode documentation should be in onboarding guide (not just codebase)
- Consider adding email flow diagram to architecture docs
- Future forms should default to reusing ContactEnhanced.tsx base rather than creating variants
```

**Why this matters:**

- Maintains institutional knowledge across the team
- Identifies systemic improvements to processes/documentation
- Helps future developers understand "why" behind architectural decisions
- Creates accountability and continuous refinement of development practices

## Project-Specific Patterns

### Tailwind Design System

- **Primary Navy**: `bg-primary-800` (darkest navy, main brand color)
- **Brand Pink**: `bg-secondary-600` (main secondary accent)
- **Accent Emerald**: `bg-accent-emerald-600`; Amber: `bg-accent-amber-500`
- **Responsive**: Use `sm:`, `md:`, `lg:` prefixes; mobile-first approach
- **Never hardcode colors**; always use config palette

### Schema.org Structured Data

In `src/lib/schema.ts`:

- `organizationSchema` → Company info (HQ in Hong Kong, services, contact)
- `websiteSchema` → Site structure, search action
- `faqSchema` → FAQ content
- Inject into pages via `<script type="application/ld+json">{JSON.stringify(...)}</script>`

### Validation & Sanitization

- **Input Validation**: Use Joi schemas in `src/lib/validation.ts`
- **Sanitization**: `sanitizeText()` from `src/lib/sanitize.ts` (removes unsafe characters, XSS prevention)
- **Email sanitization** in API routes before database/email dispatch

### Security Headers

Configured in `next.config.ts` → custom headers:

- CSP (Content Security Policy) — restricts script sources
- X-Frame-Options: DENY
- HSTS for HTTPS enforcement
- No X-Powered-By header

## Testing & Validation

**Accessibility (WCAG 2.1):**

```bash
npm run test:contrast      # Color contrast validation
npm run validate:a11y      # Full A11y suite
npm run validate:accessibility
```

**SEO:**

```bash
npm run test:rich-snippets # JSON-LD validation
npm run sitemap            # Generate sitemap.xml
```

**Code Quality:**

```bash
npm run lint               # ESLint
npm run type-check         # TypeScript
npm run build              # Full build check
```

## Troubleshooting

| Issue                          | Solution                                                                              |
| ------------------------------ | ------------------------------------------------------------------------------------- |
| AWS SES emails not sending     | Verify `.env.local` has valid AWS credentials; check SES sandbox mode limits          |
| Tailwind classes not applying  | Ensure class names are in `content:` paths in `tailwind.config.ts`; rebuild           |
| Type errors in components      | Check `tsconfig.json` strict mode enabled; use `import type {}` for type-only imports |
| Build fails with ESLint errors | Run `npm run lint:fix` to auto-fix; see `eslint.config.mjs` for rules                 |
| Form validation fails silently | Check browser Network tab for API response; verify Joi schema in `validation.ts`      |

## Key Files Reference

- **`src/app/layout.tsx`**: Root layout, global metadata, nav/footer wrapper
- **`src/components/Navigation.tsx`**: Header navigation, mobile menu, accessibility features
- **`src/lib/schema.ts`**: All Schema.org structured data definitions
- **`src/lib/validation.ts`**: Joi schemas for contact/career forms
- **`src/app/api/contact/route.ts`**: Contact form handler (AWS SES, email generation)
- **`tailwind.config.ts`**: Design system, color palette, component utilities
- **`next.config.ts`**: Image optimization, security headers, redirects
- **`package.json`**: Dependencies, npm scripts, project metadata
- **`Makefile`**: Development shortcuts and colored output helpers

---

**Last Updated:** October 2025  
**Maintained by**: ELITIZON Development Team  
For questions, consult `docs/architecture.md`, `docs/development.md`, and `docs/AWS_SES_SETUP.md`.

<!-- Generated: 2025-06-15 00:00:00 UTC -->

# Files Catalog

This catalog provides a comprehensive overview of the ELITIZON codebase organization, helping developers and LLMs quickly locate specific functionality. The project follows Next.js 15 App Router conventions with clear separation between pages, components, API routes, and configuration files. All source files use TypeScript for type safety, and the structure supports both development and production deployment scenarios.

The codebase is organized into logical groups: core application files in `src/app/`, reusable UI components in `src/components/`, utility functions in `src/lib/`, configuration files at the root level, and documentation in the `docs/` directory.

## Core Source Files

### Application Pages (App Router)
- `src/app/layout.tsx` - Root layout with navigation, footer, SEO metadata, and Google Analytics
- `src/app/page.tsx` - Homepage with Hero, Services, About, Contact sections and comprehensive SEO
- `src/app/globals.css` - Global styles, Tailwind CSS base, and custom component styles
- `src/app/favicon.ico` - Website favicon for browser tabs and bookmarks
- `src/app/sitemap.ts` - Dynamic sitemap generation for SEO and search engine indexing

### Feature Pages
- `src/app/about/page.tsx` - Company information, mission, and value proposition
- `src/app/services/page.tsx` - Service offerings, expertise areas, and detailed capabilities
- `src/app/contact/page.tsx` - Enhanced contact form with comprehensive field validation
- `src/app/contact/layout.tsx` - Contact section specific layout and metadata
- `src/app/careers/page.tsx` - Career opportunities, job listings, and company culture
- `src/app/careers/apply/page.tsx` - Job application form with file upload capabilities
- `src/app/team/page.tsx` - Team member profiles, expertise, and leadership information
- `src/app/privacy/page.tsx` - Privacy policy content and data handling practices
- `src/app/terms/page.tsx` - Terms of service and legal agreements
- `src/app/test/page.tsx` - Development testing page for component verification

### API Routes (Backend Logic)
- `src/app/api/contact/route.ts` - Contact form submission handler with AWS SES email integration
- `src/app/api/careers/apply/route.ts` - Career application processing with file upload support

## Platform Implementation

### UI Components (React/TypeScript)
- `src/components/Navigation.tsx` - Responsive navigation with mobile menu and accessibility features
- `src/components/Footer.tsx` - Site footer with links, contact information, and social media
- `src/components/Hero.tsx` - Main homepage hero section with call-to-action and value proposition
- `src/components/HeroSimple.tsx` - Simplified hero component for internal pages
- `src/components/Services.tsx` - Services showcase with feature highlights and capabilities
- `src/components/About.tsx` - Company overview component with mission and expertise
- `src/components/Contact.tsx` - Basic contact form with essential fields
- `src/components/ContactEnhanced.tsx` - Advanced contact form with validation and service selection
- `src/components/Loading.tsx` - Loading states, spinners, and skeleton components
- `src/components/Debug.tsx` - Development debugging utilities and component testing

### Business Logic Components
- `src/components/GoogleAnalytics.tsx` - Google Analytics 4 integration and event tracking
- `src/components/PrivacyPolicy.tsx` - Privacy policy content component with legal text
- `src/components/TermsOfService.tsx` - Terms of service content with usage agreements

### Utility Libraries
- `src/lib/schema.ts` - Schema.org structured data definitions for SEO optimization
  - Organization schema with company information and contact details
  - Website schema with navigation structure and metadata
  - FAQ schema for frequently asked questions

## Build System

### Core Configuration
- `package.json` - Project dependencies, scripts, and metadata with Next.js 15 and React 19
- `next.config.ts` - Next.js configuration with image optimization and security headers
- `tsconfig.json` - TypeScript compiler configuration with strict type checking
- `tailwind.config.ts` - Tailwind CSS v4 configuration with custom brand colors and design system
- `postcss.config.mjs` - PostCSS configuration for Tailwind CSS processing
- `eslint.config.mjs` - ESLint configuration for code quality and formatting standards

### Environment and Development
- `next-env.d.ts` - Next.js TypeScript declarations and global type definitions
- `.env.example` - Environment variable template with AWS SES configuration examples

## Configuration

### Static Assets
- `public/robots.txt` - Search engine crawling instructions and sitemap references
- `public/next.svg` - Next.js logo for development and branding
- `public/vercel.svg` - Vercel deployment platform logo
- `public/file.svg` - File icon for document representations
- `public/globe.svg` - Globe icon for international/global context
- `public/window.svg` - Window icon for UI and interface representations

### Documentation Files
- `docs/AWS_SES_SETUP.md` - AWS Simple Email Service configuration guide
- `docs/project-overview.md` - Project description, technology stack, and platform requirements
- `docs/architecture.md` - System architecture, component organization, and data flow
- `docs/build-system.md` - Build configuration, development workflow, and deployment preparation
- `docs/testing.md` - Testing strategy, quality assurance, and validation approaches
- `docs/development.md` - Development patterns, code style, and workflow guidelines
- `docs/deployment.md` - Deployment options, platform configuration, and production setup

### Project Documentation
- `README.md` - Project overview, quick start guide, and essential information
- `COMPREHENSIVE_UX_AUDIT_2025.md` - UX audit findings and improvement recommendations
- `CONTACT_FORM_IMPLEMENTATION.md` - Contact form development specifications
- `DESIGN_IMPROVEMENTS.md` - Design enhancement proposals and implementation notes
- `HOME_PAGE_CONTACT_IMPLEMENTATION.md` - Homepage contact integration guidelines
- `IMAGE_TO_CREATE.md` - Image asset requirements and creation specifications
- `SEO_ACTION_PLAN.md` - SEO optimization strategy and implementation roadmap
- `UX_AUDIT_REPORT.md` - User experience audit results and analysis
- `UX_IMPLEMENTATION_PLAN_2025.md` - UX improvement implementation timeline
- `UX_IMPLEMENTATION_PLAN.md` - User experience enhancement strategy

## Reference

### File Organization Patterns
- **Pages**: Follow App Router structure in `src/app/` with `page.tsx` files
- **Components**: Reusable UI elements in `src/components/` with TypeScript interfaces
- **API Routes**: Backend logic in `src/app/api/` with `route.ts` files for HTTP methods
- **Utilities**: Shared logic and schemas in `src/lib/` directory
- **Static Assets**: Public files in `public/` directory for direct access
- **Configuration**: Root-level config files for build tools and development environment

### Naming Conventions
- **Components**: PascalCase for React components (`Navigation.tsx`, `ContactEnhanced.tsx`)
- **Pages**: Lowercase for route segments following App Router conventions
- **API Routes**: Descriptive names with HTTP method exports (`contact/route.ts`)
- **Utilities**: CamelCase for utility functions and schema definitions
- **Documentation**: UPPERCASE with underscores for major documentation files

### Dependency Relationships
- **Pages depend on Components**: Page files import and compose UI components
- **Components use Utilities**: UI components import schemas and utility functions
- **API Routes use External Services**: Backend routes integrate with AWS SES for email
- **Configuration affects Build**: Config files control TypeScript, Tailwind, and Next.js behavior
- **Documentation supports Development**: Guides provide context for code organization and patterns

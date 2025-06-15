<!-- Generated: 2025-06-15 00:00:00 UTC -->

# Architecture

ELITIZON follows a modern Next.js 15 App Router architecture with server-side rendering, API routes, and component-based UI design. The application uses a layered approach with clear separation between presentation components, business logic in API routes, and data schemas. The architecture supports both static generation and server-side rendering for optimal performance and SEO.

The system implements a typical JAMstack pattern with React components for the frontend, Next.js API routes for backend functionality, and external services (AWS SES) for email handling. The component architecture follows atomic design principles with reusable UI components and clear data flow patterns.

## Component Map

### Core Application Structure

- `src/app/layout.tsx` - Root layout component with global navigation, footer, and metadata
- `src/app/page.tsx` - Main homepage component orchestrating Hero, Services, About, and Contact sections
- `src/app/globals.css` - Global styles and Tailwind CSS base configuration

### Page Components

- `src/app/about/page.tsx` - About page with company information
- `src/app/services/page.tsx` - Services overview and detailed offerings
- `src/app/contact/page.tsx` - Dedicated contact page with enhanced form
- `src/app/careers/page.tsx` - Career opportunities listing
- `src/app/careers/apply/page.tsx` - Job application form
- `src/app/team/page.tsx` - Team member profiles and information
- `src/app/privacy/page.tsx` - Privacy policy content
- `src/app/terms/page.tsx` - Terms of service content

### Reusable UI Components

- `src/components/Navigation.tsx` - Main navigation with responsive menu and accessibility features
- `src/components/Footer.tsx` - Site footer with links and company information
- `src/components/Hero.tsx` - Homepage hero section with call-to-action
- `src/components/HeroSimple.tsx` - Simplified hero for internal pages
- `src/components/Services.tsx` - Services showcase with feature highlights
- `src/components/About.tsx` - Company overview and value proposition
- `src/components/Contact.tsx` - Basic contact form component
- `src/components/ContactEnhanced.tsx` - Advanced contact form with validation
- `src/components/Loading.tsx` - Loading states and skeleton components
- `src/components/Debug.tsx` - Development debugging utilities

### Business Logic Components

- `src/components/GoogleAnalytics.tsx` - Analytics tracking integration
- `src/components/PrivacyPolicy.tsx` - Privacy policy content component
- `src/components/TermsOfService.tsx` - Terms of service content component

## Key Files

### API Layer

- `src/app/api/contact/route.ts` - Contact form submission handler with AWS SES integration (lines 1-316)
- `src/app/api/careers/apply/route.ts` - Career application submission handler

### Schema and Validation

- `src/lib/schema.ts` - Comprehensive Schema.org structured data definitions (lines 1-281)
  - `organizationSchema` - Company information and contact details
  - `websiteSchema` - Website metadata and navigation structure
  - `faqSchema` - Frequently asked questions structured data

### Configuration Files

- `next.config.ts` - Next.js configuration with image optimization and security headers (lines 1-63)
- `tailwind.config.ts` - Design system with custom colors and component styles (lines 1-234)
- `tsconfig.json` - TypeScript configuration with strict type checking
- `eslint.config.mjs` - Code quality and formatting rules

## Data Flow

### Contact Form Flow

1. User interaction in `src/components/ContactEnhanced.tsx` or `src/components/Contact.tsx`
2. Form submission to `src/app/api/contact/route.ts` (POST handler at line 22)
3. Validation using email regex (line 37-41)
4. AWS SES email generation via `generateEmailContent()` function (line 46)
5. Email dispatch through `SESClient.send()` (lines 5-12 for client configuration)

### Career Application Flow

1. Application form in `src/app/careers/apply/page.tsx`
2. Submission to `src/app/api/careers/apply/route.ts`
3. File upload handling and validation
4. Email notification through AWS SES integration

### SEO and Metadata Flow

1. Page-level metadata definitions in each `page.tsx` file
2. Structured data injection via `src/lib/schema.ts` schemas
3. Sitemap generation through `src/app/sitemap.ts`
4. Global metadata and Open Graph configuration in `src/app/layout.tsx` (lines 13-20)

### Navigation and Routing

1. App Router handles route resolution automatically
2. Navigation component (`src/components/Navigation.tsx`) provides client-side navigation
3. Dynamic imports and code splitting through Next.js automatic optimization
4. Server-side rendering for initial page loads with hydration on client

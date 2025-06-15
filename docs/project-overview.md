<!-- Generated: 2025-06-15 00:00:00 UTC -->

# Project Overview

ELITIZON is a modern Next.js 15 web application for a global AI consulting company specializing in Data Engineering, Machine Learning, and Generative AI solutions. The application serves as a corporate website with advanced contact forms, career applications, and comprehensive SEO optimization. Built with TypeScript, React 19, and Tailwind CSS v4, it implements server-side rendering, API routes for form handling with AWS SES integration, and advanced accessibility features.

The project follows a remote-first consulting business model with a focus on delivering measurable ROI through expert AI and data engineering services. The website showcases services, team information, and provides streamlined contact and career application workflows with robust email handling capabilities.

## Key Files

**Main Entry Points**
- `src/app/layout.tsx` - Root layout with navigation, footer, and SEO metadata
- `src/app/page.tsx` - Homepage with Hero, Services, About, and Contact sections
- `package.json` - Project configuration and dependencies

**Core Configuration**
- `next.config.ts` - Next.js configuration with SEO optimizations and security headers
- `tailwind.config.ts` - Tailwind CSS v4 configuration with custom brand colors and design system
- `tsconfig.json` - TypeScript configuration for strict type checking
- `eslint.config.mjs` - ESLint configuration for code quality

## Technology Stack

**Frontend Framework**
- `next`: 15.3.3 - React framework with server-side rendering and App Router
- `react`: ^19.0.0 - UI library with latest features
- `typescript`: ^5 - Type safety and developer experience

**Styling & UI**
- `tailwindcss`: ^4 - Utility-first CSS framework with custom design system
- `@font-inter` - Google Fonts integration in `src/app/layout.tsx` (line 8)

**Backend Integration**
- `@aws-sdk/client-ses`: ^3.828.0 - AWS Simple Email Service for form submissions
- API routes in `src/app/api/` - Contact and career application endpoints

**SEO & Analytics**
- Schema.org structured data in `src/lib/schema.ts`
- Google Analytics integration via `src/components/GoogleAnalytics.tsx`
- Comprehensive meta tags and Open Graph configuration

## Platform Support

**Development Requirements**
- Node.js 18+ (specified in `package.json` engines if present)
- npm or yarn package manager
- TypeScript 5+ for type checking

**Runtime Environment**
- Next.js 15 with App Router architecture
- Server-side rendering capabilities
- Static generation for optimal performance
- AWS SES integration for email functionality (see `docs/AWS_SES_SETUP.md`)

**Browser Support**
- Modern browsers supporting ES2022+ features
- Responsive design supporting mobile, tablet, and desktop viewports
- Accessibility compliance with WCAG 2.1 standards

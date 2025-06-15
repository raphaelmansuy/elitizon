<!-- Generated: 2025-06-15 00:00:00 UTC -->

# Build System

ELITIZON uses Next.js 15 as the primary build system with npm for package management, TypeScript for type checking, and Tailwind CSS v4 for styling. The build system supports development with Turbopack for fast hot reloading, production builds with optimization, and static generation capabilities. Configuration is managed through `package.json`, `next.config.ts`, and various config files for tools like ESLint and Tailwind.

## Build Workflows

### Development Server
- **Command**: `npm run dev` (uses `next dev --turbopack`)
- **Configuration**: `package.json` scripts section (line 5)
- **Features**: Hot module replacement, TypeScript compilation, Tailwind CSS processing
- **Port**: Default 3000 (configurable in `next.config.ts`)

### Production Build
- **Command**: `npm run build` (uses `next build`)
- **Configuration**: `package.json` scripts section (line 6)
- **Output**: `.next/` directory with optimized assets
- **Features**: Static generation, image optimization, code splitting

### Production Server
- **Command**: `npm start` (uses `next start`)
- **Configuration**: `package.json` scripts section (line 7)
- **Requirements**: Must run `npm run build` first
- **Features**: Server-side rendering, API routes, static file serving

### Code Quality
- **Command**: `npm run lint` (uses `next lint`)
- **Configuration**: `eslint.config.mjs` - ESLint rules and settings
- **Scope**: TypeScript and TSX files in `src/` directory
- **Integration**: Runs automatically during build process

## Platform Setup

### Node.js Requirements
- **Version**: Node.js 18+ (LTS recommended)
- **Package Manager**: npm (included with Node.js)
- **TypeScript**: v5+ for type checking (`typescript` in devDependencies)

### Environment Configuration
- **Development**: Create `.env.local` for local environment variables
- **AWS Integration**: Configure AWS SES credentials (see `docs/AWS_SES_SETUP.md`)
- **Required Variables**:
  - `AWS_REGION` - AWS region for SES (default: us-east-1)
  - `AWS_ACCESS_KEY_ID` - AWS access key
  - `AWS_SECRET_ACCESS_KEY` - AWS secret key

### Development Dependencies
- **TypeScript Types**: `@types/node`, `@types/react`, `@types/react-dom`
- **Tailwind CSS**: `tailwindcss` v4 with PostCSS integration
- **ESLint**: `eslint` with Next.js configuration

## Reference

### Build Targets
- `npm run dev` - Development server with Turbopack (fast refresh)
- `npm run build` - Production build with optimizations
- `npm start` - Production server (requires build first)
- `npm run lint` - Code quality checks and formatting

### Configuration Files
- `package.json` - Dependencies, scripts, and project metadata
- `next.config.ts` - Next.js build configuration with image optimization (lines 9-13)
- `tailwind.config.ts` - Tailwind CSS configuration with custom theme (lines 1-234)
- `tsconfig.json` - TypeScript compiler options and path mapping
- `eslint.config.mjs` - Linting rules and code style enforcement
- `postcss.config.mjs` - PostCSS configuration for Tailwind CSS processing

### Build Outputs
- `.next/` - Next.js build output directory
- `.next/static/` - Static assets (CSS, JS, images)
- `.next/server/` - Server-side code and API routes
- `out/` - Static export output (if using `next export`)

### Troubleshooting
- **Build Failures**: Check TypeScript errors in terminal output
- **Styling Issues**: Verify Tailwind configuration in `tailwind.config.ts`
- **API Route Problems**: Check AWS SES configuration and environment variables
- **Image Optimization**: Ensure proper configuration in `next.config.ts` (lines 9-13)
- **Performance Issues**: Review bundle analysis with `npm run build` output

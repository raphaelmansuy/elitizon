<!-- Generated: 2025-06-15 00:00:00 UTC -->

# Testing

ELITIZON currently uses Next.js built-in development tools and ESLint for code quality assurance. The project structure supports testing implementation with dedicated test directories and follows Next.js testing conventions. While comprehensive test suites are not yet implemented, the architecture supports Jest, React Testing Library, and end-to-end testing frameworks.

## Test Types

### Code Quality Testing
- **ESLint Configuration**: `eslint.config.mjs` - Automated code quality checks
- **TypeScript Checking**: Compile-time type safety validation
- **Command**: `npm run lint` - Runs ESLint on TypeScript and TSX files
- **Scope**: All files in `src/` directory including components and API routes

### Manual Testing Areas
- **Contact Form**: `src/app/api/contact/route.ts` - Form submission and AWS SES integration
- **Career Applications**: `src/app/api/careers/apply/route.ts` - Job application processing
- **Navigation**: `src/components/Navigation.tsx` - Responsive menu and accessibility
- **SEO Components**: `src/lib/schema.ts` - Schema.org structured data validation

## Running Tests

### Current Testing Commands
```bash
# Code quality and linting
npm run lint

# TypeScript type checking
npx tsc --noEmit

# Development server for manual testing
npm run dev
```

### Development Testing Workflow
1. **Local Development**: `npm run dev` starts development server on localhost:3000
2. **Form Testing**: Use browser dev tools to test contact and career forms
3. **API Testing**: Monitor Network tab for API route responses
4. **SEO Testing**: Use browser extensions or online tools to validate structured data

## Reference

### Test File Organization (Recommended Structure)
- `__tests__/` - Unit tests for components and utilities
- `__tests__/components/` - Component-specific test files
- `__tests__/api/` - API route testing
- `__tests__/pages/` - Page component integration tests
- `e2e/` - End-to-end test scenarios

### Testing Dependencies (To Be Added)
```json
{
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "jest": "^29.0.0",
    "jest-environment-jsdom": "^29.0.0"
  }
}
```

### Key Testing Targets
- **API Routes**: `src/app/api/contact/route.ts` (lines 22-50 for validation logic)
- **Components**: All files in `src/components/` directory
- **Schema Validation**: `src/lib/schema.ts` structured data correctness
- **Navigation**: `src/components/Navigation.tsx` accessibility and responsive behavior
- **Form Validation**: Contact and career form error handling and submission

### Build System Integration
- **Pre-commit Hooks**: ESLint runs automatically during development
- **CI/CD Integration**: Tests can be integrated with build process
- **Type Safety**: TypeScript provides compile-time error detection
- **Production Validation**: Next.js build process includes optimization checks

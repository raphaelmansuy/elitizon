<!-- Generated: 2025-06-15 00:00:00 UTC -->

# Development

ELITIZON follows modern React and Next.js development patterns with TypeScript for type safety, Tailwind CSS v4 for styling, and ESLint for code quality. The development environment emphasizes component reusability, accessibility compliance, and maintainable code structure. Development patterns include server-side rendering, API routes for backend functionality, and responsive design with mobile-first approach.

## Code Style

### TypeScript Conventions
- **Strict Type Checking**: Enabled in `tsconfig.json` for compile-time safety
- **Interface Definitions**: Used for component props and API data structures
- **Type Imports**: Import types separately using `import type` syntax

```typescript
// From src/app/layout.tsx:1-2
import type { Metadata } from "next";
import type { Readonly } from "react";

// From src/app/api/contact/route.ts:14-21
interface ContactFormData {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
}
```

### Component Patterns
- **Functional Components**: All components use React function syntax
- **Default Exports**: Each component file exports one default component
- **Props Interface**: Define props interface above component definition

```tsx
// From src/components/Navigation.tsx:6-11
export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  // Component implementation
}
```

### CSS and Styling Conventions
- **Tailwind CSS v4**: Utility-first approach with custom design system
- **Custom Colors**: Brand colors defined in `tailwind.config.ts` (lines 12-32)
- **Responsive Design**: Mobile-first with responsive utility classes
- **Accessibility**: WCAG 2.1 compliance with focus states and ARIA attributes

```css
/* From tailwind.config.ts color definitions */
primary: {
  700: '#2A3045', // Main brand navy
  800: '#1e2329',
}
secondary: {
  200: '#fbd5d5', // Brand pink/red
}
```

## Common Patterns

### Page Component Structure
- **Metadata Export**: Each page exports SEO metadata configuration
- **Default Function Export**: Main page component as default export
- **Component Composition**: Pages composed of reusable UI components

```tsx
// From src/app/page.tsx:7-15
export const metadata: Metadata = {
  title: "Global AI Consulting Services | ELITIZON",
  description: "Transform your business with world-class AI experts",
  // Additional metadata...
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Contact />
    </>
  );
}
```

### API Route Pattern
- **Named HTTP Method Exports**: Export GET, POST, etc. as named functions
- **Request/Response Handling**: Use NextRequest and NextResponse types
- **Error Handling**: Consistent error response format with status codes

```typescript
// From src/app/api/contact/route.ts:22-35
export async function POST(request: NextRequest) {
  try {
    const formData: ContactFormData = await request.json();
    
    // Validation logic
    const requiredFields = ["name", "email", "message"];
    for (const field of requiredFields) {
      if (!formData[field as keyof ContactFormData]) {
        return NextResponse.json(
          { message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    // Processing logic...
  } catch (error) {
    // Error handling...
  }
}
```

### State Management Pattern
- **Local State**: useState hook for component-level state
- **Refs for DOM Access**: useRef for direct DOM manipulation
- **Effect Hooks**: useEffect for side effects and cleanup

```tsx
// From src/components/Navigation.tsx:7-23
const [isOpen, setIsOpen] = useState(false);
const mobileMenuRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && isOpen) {
      setIsOpen(false);
      mobileMenuButtonRef.current?.focus();
    }
  };
  
  document.addEventListener("keydown", handleKeyDown);
  return () => document.removeEventListener("keydown", handleKeyDown);
}, [isOpen]);
```

## Workflows

### Component Development Workflow
1. **Create Component File**: Add new component in `src/components/`
2. **Define Props Interface**: TypeScript interface for component props
3. **Implement Component**: Functional component with hooks if needed
4. **Add Styling**: Tailwind CSS classes for responsive design
5. **Test in Browser**: Use development server for immediate feedback

### API Route Development
1. **Create Route File**: Add `route.ts` in appropriate `src/app/api/` directory
2. **Define Data Interfaces**: TypeScript interfaces for request/response data
3. **Implement HTTP Methods**: Export named functions for GET, POST, etc.
4. **Add Validation**: Validate incoming data and return appropriate errors
5. **Test with Browser**: Use browser DevTools Network tab for API testing

### Page Development Process
1. **Create Page File**: Add `page.tsx` in appropriate `src/app/` directory
2. **Export Metadata**: Define SEO metadata for the page
3. **Compose Components**: Use existing components or create new ones
4. **Add Routing**: Next.js App Router handles routing automatically
5. **Test Navigation**: Verify page loads and navigation works correctly

## Reference

### File Organization
- `src/app/` - Pages and API routes using App Router structure
- `src/components/` - Reusable UI components
- `src/lib/` - Utility functions and shared logic (schema definitions)
- `public/` - Static assets (images, icons, robots.txt)

### Naming Conventions
- **Components**: PascalCase for component files (`Navigation.tsx`)
- **Pages**: lowercase for route segments (`about/page.tsx`)
- **API Routes**: lowercase with descriptive names (`contact/route.ts`)
- **Utilities**: camelCase for utility functions and hooks

### Common Development Issues
- **TypeScript Errors**: Check `tsconfig.json` configuration and type imports
- **Tailwind Styles**: Verify classes are defined in `tailwind.config.ts`
- **API Route Issues**: Check AWS SES configuration in environment variables
- **Build Errors**: Run `npm run lint` to catch code quality issues
- **Performance**: Use Next.js Image component for optimized image loading

### Development Tools Integration
- **VS Code Extensions**: TypeScript, Tailwind CSS IntelliSense, ESLint
- **Browser DevTools**: Network tab for API testing, Elements for styling
- **Next.js DevTools**: Built-in development overlay for debugging
- **Hot Reloading**: Turbopack for fast development server refresh

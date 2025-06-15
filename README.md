<!-- Generated: 2025-06-15 00:00:00 UTC -->

# ELITIZON - AI Consulting Website

Modern Next.js 15 web application for a global AI consulting company specializing in Data Engineering, Machine Learning, and Generative AI solutions. Built with TypeScript, React 19, Tailwind CSS v4, and AWS SES integration for enterprise-grade contact and career management.

## Key Entry Points

- `src/app/layout.tsx` - Root application layout with navigation and SEO
- `src/app/page.tsx` - Homepage with integrated contact functionality  
- `src/app/api/contact/route.ts` - Contact form processing with AWS SES
- `package.json` - Project configuration and dependencies
- `next.config.ts` - Next.js configuration with optimizations

## Quick Build Commands

```bash
npm install          # Install dependencies
npm run dev         # Development server with Turbopack
npm run build       # Production build
npm start           # Production server
npm run lint        # Code quality checks
```

## Documentation

- **[Project Overview](docs/project-overview.md)** - Technology stack, platform requirements, and core features for understanding the application scope
- **[Architecture](docs/architecture.md)** - Component organization, data flow, and system design for extending functionality  
- **[Build System](docs/build-system.md)** - Development workflow, configuration files, and deployment preparation
- **[Development](docs/development.md)** - Code patterns, TypeScript conventions, and component development workflow
- **[Testing](docs/testing.md)** - Quality assurance approach and validation strategies
- **[Deployment](docs/deployment.md)** - Platform deployment options, environment configuration, and production setup
- **[Files Catalog](docs/files.md)** - Comprehensive file organization and dependency mapping for quick navigation
- **[AWS SES Setup](docs/AWS_SES_SETUP.md)** - Email service configuration for contact and career forms

## Environment Setup

Create `.env.local` with AWS SES credentials:
```bash
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
```

Built with Next.js 15 App Router, React 19, TypeScript, and Tailwind CSS v4.
5. **Contact** (`/contact`) - Contact form and office information

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Inter (Google Fonts)
- **Deployment**: Vercel-ready
- **Development**: Hot reload with Turbopack

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd elitizonweb_new
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with navigation and footer
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles
│   ├── about/
│   │   └── page.tsx        # About page
│   ├── contact/
│   │   └── page.tsx        # Contact page
│   ├── services/
│   │   └── page.tsx        # Services page
│   └── team/
│       └── page.tsx        # Team page
└── components/
    ├── Navigation.tsx      # Site navigation
    ├── Footer.tsx          # Site footer
    ├── Hero.tsx            # Homepage hero section
    ├── Services.tsx        # Services overview
    ├── About.tsx           # About section
    └── Contact.tsx         # Contact section
```

## Design System

### Colors

- **Primary**: Blue (600-900)
- **Secondary**: Cyan/Indigo gradients
- **Accent**: Green, Purple, Pink
- **Neutral**: Gray scales

### Typography

- **Font**: Inter (Google Fonts)
- **Headings**: Bold weights with proper hierarchy
- **Body**: Regular weight for readability

### Components

- **Cards**: Rounded corners with shadow effects
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Clean inputs with focus states
- **Navigation**: Fixed header with mobile menu

## SEO & Performance

- **Meta Tags**: Comprehensive meta descriptions and keywords
- **Structured Data**: Ready for schema markup
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic with Next.js App Router
- **Static Generation**: Pre-rendered pages for better performance

## SEO Implementation

This website implements comprehensive SEO optimizations following the SEO Action Plan:

### ✅ Implemented SEO Features

1. **Page-specific metadata** for all pages with optimized titles, descriptions, and keywords
2. **Open Graph and Twitter Card** meta tags for social media sharing
3. **Structured data (JSON-LD)** including:
   - Organization schema
   - Website schema
   - Service schema
   - Person schema for team members
   - FAQ schema
4. **Dynamic sitemap.xml** generation
5. **Robots.txt** with proper crawling instructions
6. **Google Analytics 4** integration (requires configuration)
7. **Canonical URLs** for all pages
8. **Optimized Next.js configuration** for SEO and performance

### 🔧 Configuration Required

1. **Google Analytics Setup:**

   ```bash
   # Copy the example environment file
   cp .env.local.example .env.local

   # Add your Google Analytics 4 Measurement ID
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

2. **Google Search Console:**

   - Add and verify your domain
   - Submit the sitemap: `https://yourdomain.com/sitemap.xml`

3. **Update Domain References:**
   - Replace `https://elitizon.com` with your actual domain in:
     - `/src/lib/schema.ts`
     - All metadata files
     - `/public/robots.txt`

### 📊 SEO Performance Metrics

Target improvements within 6-12 months:

- 300-500% increase in organic traffic
- Top 10 rankings for primary keywords
- Enhanced global visibility
- Improved lead generation

### 🌐 Global SEO Strategy

The website is optimized for global reach with:

- Multi-regional keyword targeting
- International structured data
- Global service positioning
- Remote-first consulting emphasis

### 📈 Next Steps

1. Set up Google Analytics 4 and Search Console
2. Configure domain-specific settings
3. Monitor SEO performance metrics
4. Implement content marketing strategy
5. Begin international link building

For detailed SEO strategy, see `SEO_ACTION_PLAN.md`.

## Deployment

The website is ready for deployment on Vercel:

1. Push to GitHub repository
2. Connect to Vercel
3. Deploy automatically

For other platforms:

```bash
npm run build
npm start
```

## Customization

### Adding New Pages

1. Create new folder in `src/app/`
2. Add `page.tsx` file
3. Update navigation in `Navigation.tsx`

### Modifying Styles

- Edit `globals.css` for global styles
- Use Tailwind classes for component styling
- Customize colors in `tailwind.config.js`

### Content Updates

- Update company information in components
- Modify service descriptions in `/services/page.tsx`
- Edit team information in `/team/page.tsx`

## Contact

For questions about this website or ELITIZON services:

- **Email**: hello@elitizon.com
- **Location**: Hong Kong SAR
- **Network**: European Expert Partners

---

Built with ❤️ using Next.js and Tailwind CSS

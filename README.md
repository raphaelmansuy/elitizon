# ELITIZON - Expert Consulting Website

A professional Next.js website for ELITIZON, a consulting company specializing in Data Engineering, Machine Learning, and Generative AI solutions.

## Company Overview

ELITIZON Ltd, established in Hong Kong in 2020, is strategically positioned with a curated network of top-tier worldwide experts. We provide world-class consulting services that bridge Eastern business acumen with Western technical innovation.

Since our inception, we've evolved from a venture studio offering (2021) to securing major data strategy and AI consulting contracts with European companies (2022), expanding into Generative AI consulting (2023), and developing our international network of top worldwide experts in Data, ML and AI (2025).

## Services

### 🏗️ Data Engineering

- Data Pipeline Architecture
- Real-time Data Processing
- Cloud Data Platforms (AWS, Azure, GCP)
- Data Quality & Governance
- ETL/ELT Solutions

### 🤖 Machine Learning

- Predictive Analytics
- Computer Vision
- Natural Language Processing
- Recommendation Systems
- MLOps & Model Deployment

### ✨ Generative AI & AI Agents

- Custom AI Agents
- LLM Integration
- Conversational AI
- Content Generation
- Process Automation

## Website Features

- **Modern Design**: Built with Next.js 15 and Tailwind CSS
- **Responsive**: Fully responsive design that works on all devices
- **Performance**: Optimized for speed and SEO
- **Accessibility**: WCAG compliant with proper semantic markup
- **Type Safety**: Built with TypeScript for robust development

## Pages

1. **Homepage** (`/`) - Hero section, services overview, about, and contact
2. **Services** (`/services`) - Detailed service descriptions and capabilities
3. **About** (`/about`) - Company mission, values, and journey
4. **Team** (`/team`) - Leadership team and expert network
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

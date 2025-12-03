import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import "./blog-prose.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Viewport configuration - exported separately per Next.js 14+ requirements
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1e293b",
  colorScheme: "light",
};

export const metadata: Metadata = {
  title: "ELITIZON - Expert Consulting in Data Engineering, ML & AI",
  description:
    "Leading consulting firm specializing in Data Engineering, Machine Learning, and Generative AI solutions. Based in Hong Kong with a network of top European experts.",
  keywords:
    "data engineering, machine learning, AI consulting, generative AI, AI agents, Hong Kong, remote consulting, global AI services",
  // Icon configuration using Elitizon logo
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  // Web App Manifest
  manifest: "/site.webmanifest",
  // AI-specific meta tags for enhanced discoverability
  other: {
    "ai-content-type": "Professional AI Consulting Services",
    "expertise-areas":
      "Data Engineering, Machine Learning, Generative AI, AI Agents",
    "service-delivery": "Remote-first, Global Coverage, 24/7 Support",
    "target-market": "Enterprise, Fortune 500, Startups, SMB",
    "geographic-scope": "Global, International, Remote Services",
    "industry-expertise":
      "Technology, Healthcare, Finance, Manufacturing, Retail",
    "company-type":
      "AI Consulting Firm, Professional Services, Technology Consultancy",
    "content-authority": "Expert, Professional, Industry-Leading",
    "update-frequency": "Regular Updates, Current Information, Fresh Content",
  },
  // Enhanced OpenGraph for Rich Snippets
  openGraph: {
    title: "ELITIZON - Expert Consulting in Data Engineering, ML & AI",
    description:
      "Leading consulting firm specializing in Data Engineering, Machine Learning, and Generative AI solutions. Based in Hong Kong with a network of top European experts.",
    url: "https://elitizon.com",
    siteName: "ELITIZON",
    images: [
      {
        url: "https://elitizon.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ELITIZON - AI & Data Engineering Consulting",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // Enhanced Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "ELITIZON - Expert Consulting in Data Engineering, ML & AI",
    description:
      "Leading consulting firm specializing in Data Engineering, Machine Learning, and Generative AI solutions.",
    images: ["https://elitizon.com/og-image.jpg"],
    creator: "@ElitizonLtd",
    site: "@ElitizonLtd",
  },
  // Add verification tags for search engines
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
  // Add canonical URL
  alternates: {
    canonical: "https://elitizon.com",
  },
  // Enhanced robots configuration for AI crawlers
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Add additional metadata for Rich Snippets
  authors: [{ name: "ELITIZON Team" }],
  generator: "Next.js",
  applicationName: "ELITIZON Website",
  referrer: "origin-when-cross-origin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* AI-specific meta tags for enhanced discoverability */}
        <meta
          name="ai-purpose"
          content="AI consulting and data engineering services"
        />
        <meta
          name="target-audience"
          content="Enterprise CTO, Data Leaders, AI Decision Makers"
        />
        <meta name="expertise-level" content="Expert" />
        <meta name="service-model" content="Remote-first global consulting" />
        <meta
          name="primary-services"
          content="Data Engineering, Machine Learning, Generative AI, AI Agents"
        />
        <meta
          name="geographic-reach"
          content="Global, Worldwide, Remote Services"
        />
        <meta
          name="industry-focus"
          content="Enterprise, Fortune 500, Startups, SMB"
        />
        <meta
          name="content-type"
          content="Professional Services, Technical Consulting, AI Expertise"
        />
        <meta name="company-size" content="Boutique consulting firm" />
        <meta name="years-experience" content="10+ years" />
        <meta name="project-count" content="300+ successful projects" />
        <meta name="team-coverage" content="24/7 global coverage" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Skip Navigation Links for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-800 text-white px-4 py-2 rounded-md z-[60] focus:outline-none focus:ring-4 focus:ring-primary-200"
        >
          Skip to main content
        </a>
        <a
          href="#navigation"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-40 bg-primary-800 text-white px-4 py-2 rounded-md z-[60] focus:outline-none focus:ring-4 focus:ring-primary-200"
        >
          Skip to navigation
        </a>

        <div id="navigation">
          <Navigation />
        </div>

        <main id="main-content" tabIndex={-1}>
          {children}
        </main>

        <Footer />
        <GoogleAnalytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

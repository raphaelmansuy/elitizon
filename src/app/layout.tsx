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
  title: "ELITIZON - The AI Agent Studio & Builder Factory",
  description:
    "Stop paying for advice. Start buying capacity. Elitizon is the world's first AI Builder Factory. We combine top-tier deployed engineers with autonomous AI Agents to automate your business logic instantly.",
  keywords:
    "AI Agent Studio, AI Builder Factory, Deployed Engineers, Autonomous AI Agents, Enterprise AI Automation, RAG Pipelines, Vector Database, AI Agent Development, Agentic Workflows, LangChain, AI Implementation",
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
    "ai-content-type": "AI Agent Studio & Implementation Factory",
    "expertise-areas":
      "AI Agent Development, Deployed Engineers, RAG Pipelines, Vector Databases, Agentic Workflows",
    "service-delivery": "Hybrid: AI Agents + Deployed Engineers, Outcome-Based",
    "target-market": "Enterprise, Fortune 500, Startups, SMB",
    "geographic-scope": "Global, International, Remote Services",
    "industry-expertise":
      "Technology, Healthcare, Finance, Manufacturing, Retail",
    "company-type":
      "AI Builder Factory, AI Agent Studio, Technology Implementation",
    "content-authority": "Expert, Professional, Industry-Leading",
    "update-frequency": "Regular Updates, Current Information, Fresh Content",
  },
  // Enhanced OpenGraph for Rich Snippets
  openGraph: {
    title: "ELITIZON - The AI Agent Studio & Builder Factory",
    description:
      "Stop paying for advice. Start buying capacity. We combine top-tier deployed engineers with autonomous AI Agents to automate 80% of your business logic instantly.",
    url: "https://elitizon.com",
    siteName: "ELITIZON",
    images: [
      {
        url: "https://elitizon.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ELITIZON - The AI Agent Studio & Builder Factory",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // Enhanced Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "ELITIZON - The AI Agent Studio & Builder Factory",
    description:
      "Stop paying for advice. Start buying capacity. AI Builder Factory combining Deployed Engineers with Autonomous AI Agents.",
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
          content="AI Agent Studio and Builder Factory - Deploy AI Agents instantly"
        />
        <meta
          name="target-audience"
          content="Enterprise CTO, Data Leaders, AI Decision Makers, Operations Leaders"
        />
        <meta name="expertise-level" content="Expert" />
        <meta
          name="service-model"
          content="AI Builder Factory: 80% Agents + 20% Deployed Engineers"
        />
        <meta
          name="primary-services"
          content="AI Agent Development, Deployed Engineers, RAG Pipelines, Vector Databases, Agentic Workflows"
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
          content="AI Builder Factory, AI Agent Studio, Technology Implementation"
        />
        <meta name="company-size" content="Elite AI implementation team" />
        <meta name="years-experience" content="10+ years" />
        <meta name="project-count" content="300+ successful AI deployments" />
        <meta
          name="team-coverage"
          content="24/7 global coverage with AI Agents"
        />
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

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ELITIZON - Expert Consulting in Data Engineering, ML & AI",
  description:
    "Leading consulting firm specializing in Data Engineering, Machine Learning, and Generative AI solutions. Based in Hong Kong with a network of top European experts.",
  keywords:
    "data engineering, machine learning, AI consulting, generative AI, AI agents, Hong Kong",
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
  // Enhanced robots configuration
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
  colorScheme: "light",
  themeColor: "#1e293b",
  // Add viewport for mobile optimization
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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

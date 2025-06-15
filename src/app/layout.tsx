import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

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
      </body>
    </html>
  );
}

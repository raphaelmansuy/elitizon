import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import AIOptimizedFAQ from "@/components/AIOptimizedFAQ";
import {
  organizationSchema,
  websiteSchema,
  aiOptimizedFaqSchema,
  knowledgeBaseSchema,
  expertiseSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title:
    "Global AI Consulting Services | ELITIZON - Expert Data Engineering & Machine Learning",
  description:
    "Transform your business with world-class AI & data engineering experts. Remote-first consulting in Machine Learning, Generative AI, and Data Architecture. 300+ successful projects worldwide.",
  keywords:
    "AI consulting services global, remote data engineering consultants, machine learning consulting worldwide, generative AI experts, enterprise AI transformation consulting, remote-first AI consulting, global data strategy consulting, AI agents development, MLOps consulting, data pipeline architecture",
  // AI-specific meta tags for enhanced discoverability
  other: {
    "ai-purpose": "AI consulting and data engineering services",
    "target-audience": "Enterprise CTO, Data Leaders, AI Decision Makers",
    "expertise-level": "Expert",
    "service-model": "Remote-first global consulting",
    "primary-services":
      "Data Engineering, Machine Learning, Generative AI, AI Agents",
    "geographic-reach": "Global, Worldwide, Remote Services",
    "industry-focus": "Enterprise, Fortune 500, Startups, SMB",
    "content-type": "Professional Services, Technical Consulting, AI Expertise",
  },
  openGraph: {
    title: "Global AI Consulting Services | ELITIZON",
    description:
      "Transform your business with world-class AI & data engineering experts. Remote-first consulting delivering measurable ROI worldwide.",
    url: "https://elitizon.com",
    siteName: "ELITIZON",
    images: [
      {
        url: "https://elitizon.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ELITIZON - Global AI Consulting Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Global AI Consulting Services | ELITIZON",
    description:
      "Transform your business with world-class AI & data engineering experts. Remote-first consulting delivering measurable ROI worldwide.",
    images: ["https://elitizon.com/og-image.jpg"],
    creator: "@elitizon",
  },
  alternates: {
    canonical: "https://elitizon.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Home() {
  return (
    <>
      {/* Enhanced Structured Data for AI Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aiOptimizedFaqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(knowledgeBaseSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(expertiseSchema),
        }}
      />

      <main className="min-h-screen">
        <Hero />
        <Services />
        <About />
        <AIOptimizedFAQ />
        <Contact />
      </main>
    </>
  );
}

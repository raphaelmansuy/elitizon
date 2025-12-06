import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import FactoryProcess from "@/components/FactoryProcess";
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
    "AI Agent Studio & Builder Factory | ELITIZON - Deploy AI Agents in Days",
  description:
    "Stop paying for advice. Start buying capacity. Elitizon is the world's first AI Builder Factory. We combine top-tier deployed engineers with autonomous AI Agents to automate 80% of your business logic instantly.",
  keywords:
    "AI Agent Studio, AI Builder Factory, Deployed Engineers, Autonomous AI Agents, AI Agent Development, RAG Pipelines, Vector Database, Agentic Workflows, LangChain, Enterprise AI Automation, AI Implementation",
  // AI-specific meta tags for enhanced discoverability
  other: {
    "ai-purpose":
      "AI Agent Studio and Builder Factory - Deploy AI Agents instantly",
    "target-audience":
      "Enterprise CTO, Data Leaders, AI Decision Makers, Operations Leaders",
    "expertise-level": "Expert",
    "service-model": "AI Builder Factory: 80% Agents + 20% Deployed Engineers",
    "primary-services":
      "AI Agent Development, Deployed Engineers, RAG Pipelines, Vector Databases, Agentic Workflows",
    "geographic-reach": "Global, Worldwide, Remote Services",
    "industry-focus": "Enterprise, Fortune 500, Startups, SMB",
    "content-type":
      "AI Builder Factory, AI Agent Studio, Technology Implementation",
  },
  openGraph: {
    title: "AI Agent Studio & Builder Factory | ELITIZON",
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
  twitter: {
    card: "summary_large_image",
    title: "AI Agent Studio & Builder Factory | ELITIZON",
    description:
      "Stop paying for advice. Start buying capacity. AI Builder Factory combining Deployed Engineers with Autonomous AI Agents.",
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
        <FactoryProcess />
        <About />
        <AIOptimizedFAQ />
        <Contact />
      </main>
    </>
  );
}

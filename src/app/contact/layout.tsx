import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Build Your AI Agent | AI Builder Factory - ELITIZON",
  description:
    "Stop paying for advice. Start buying capacity. Tell us what you want to automate and we'll deploy working AI Agents in days. 80% AI automation + 20% Deployed Engineers.",
  keywords:
    "build AI agent, AI automation factory, deploy AI agents, hire AI engineers, AI implementation, Deployed Engineers, outcome-based AI, custom AI solutions",
  openGraph: {
    title: "Build Your AI Agent | AI Builder Factory - ELITIZON",
    description:
      "Stop paying for advice. Start buying capacity. Tell us what you want to automate—we'll deploy working AI Agents in days.",
    url: "https://elitizon.com/contact",
    siteName: "ELITIZON",
    images: [
      {
        url: "https://elitizon.com/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Build Your AI Agent with ELITIZON",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Build Your AI Agent | AI Builder Factory - ELITIZON",
    description:
      "Stop paying for advice. Start buying capacity. Tell us what you want to automate—we'll deploy working AI Agents in days.",
    images: ["https://elitizon.com/og-contact.jpg"],
  },
  alternates: {
    canonical: "https://elitizon.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

// generateViewport can be used for dynamic viewport properties per-route.
// Use this when viewport must be computed at runtime (e.g. theming based on
// route params or searchParams). For the contact route we export a static
// function to demonstrate per-route runtime support.
export function generateViewport(): Viewport {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    themeColor: "#0b1220", // contact route has a slightly different theme color
    colorScheme: "light",
  };
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Global AI Consultants | Get AI Consulting Quote - ELITIZON",
  description:
    "Contact ELITIZON's AI experts for your next project. Get personalized AI consulting quotes, schedule consultations, and connect with our global team of data engineering specialists.",
  keywords:
    "global AI consulting services, contact remote AI experts, hire international data consultants, get AI consulting quote, AI consulting contact form, hire remote AI consultants",
  openGraph: {
    title: "Contact Global AI Consultants | ELITIZON",
    description:
      "Contact ELITIZON's AI experts for your next project. Get personalized AI consulting quotes and connect with our global team.",
    url: "https://elitizon.com/contact",
    siteName: "ELITIZON",
    images: [
      {
        url: "https://elitizon.com/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact ELITIZON AI Consultants",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Global AI Consultants | ELITIZON",
    description:
      "Contact ELITIZON's AI experts for your next project. Get personalized AI consulting quotes and connect with our global team.",
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

import type { Metadata } from "next";
import PrivacyPolicy from "@/components/PrivacyPolicy";

export const metadata: Metadata = {
  title: "Privacy Policy - ELITIZON",
  description:
    "Privacy Policy for ELITIZON Ltd. Learn how we collect, use, and protect your personal information in compliance with GDPR and data protection laws.",
  keywords:
    "privacy policy, data protection, GDPR, personal information, ELITIZON",
};

export default function PrivacyPage() {
  return <PrivacyPolicy />;
}

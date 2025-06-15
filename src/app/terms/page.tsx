import type { Metadata } from "next";
import TermsOfService from "@/components/TermsOfService";

export const metadata: Metadata = {
  title: "Terms of Service - ELITIZON",
  description:
    "Terms of Service for ELITIZON Ltd. Comprehensive terms and conditions governing our consulting services in data engineering, machine learning, and AI.",
  keywords:
    "terms of service, terms and conditions, legal terms, consulting services, ELITIZON",
};

export default function TermsPage() {
  return <TermsOfService />;
}

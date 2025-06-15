"use client";

import { useState } from "react";

interface Section {
  title: string;
  content: React.ReactNode;
}

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setActiveSection(activeSection === index ? null : index);
  };

  const sections: Section[] = [
    {
      title: "1. Company Information and Agreement",
      content: (
        <div className="space-y-4">
          <p>
            <strong>Legal Company Name:</strong> Elitizon Ltd
          </p>
          <p>
            <strong>Company Type:</strong> Private Company Limited By Shares
          </p>
          <p>
            <strong>Company Registration Number:</strong> 2348219
          </p>
          <p>
            <strong>Registered Address:</strong> 28 Mody Road, Room 2203, 22/F.,
            CFC Tower, Tsim Sha Tsui, Hong Kong SAR
          </p>
          <p>
            <strong>Contact Email:</strong> legal@elitizon.com
          </p>
          <p>
            <strong>Website:</strong> www.elitizon.com
          </p>
          <p>
            These Terms of Service (&quot;Terms&quot;) govern your use of our
            website and services. By accessing or using our services, you agree
            to be bound by these Terms.
          </p>
        </div>
      ),
    },
    {
      title: "2. Services and Scope",
      content: (
        <div className="space-y-4">
          <p>Elitizon Ltd provides the following professional services:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Data Engineering:</strong> Data architecture, pipeline
              development, and infrastructure optimization
            </li>
            <li>
              <strong>Machine Learning Consulting:</strong> ML model
              development, deployment, and optimization
            </li>
            <li>
              <strong>Generative AI Solutions:</strong> AI agent development,
              LLM integration, and custom AI applications
            </li>
            <li>
              <strong>Technical Consulting:</strong> Strategy, implementation,
              and best practices guidance
            </li>
            <li>
              <strong>Training and Education:</strong> Technical workshops,
              knowledge transfer, and team upskilling
            </li>
            <li>
              <strong>Project Management:</strong> End-to-end project delivery
              and coordination
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "3. Client Obligations and Responsibilities",
      content: (
        <div className="space-y-4">
          <p>As our client, you agree to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Provide accurate and complete information required for service
              delivery
            </li>
            <li>
              Grant necessary access to systems, data, and personnel as required
            </li>
            <li>Comply with all applicable laws and regulations</li>
            <li>
              Respect intellectual property rights of Elitizon and third parties
            </li>
            <li>
              Maintain confidentiality of proprietary information shared by
              Elitizon
            </li>
            <li>Use our services only for lawful business purposes</li>
            <li>
              Provide timely feedback and approvals as required for project
              progression
            </li>
            <li>
              Ensure proper backup and security of your own data and systems
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "4. Payment Terms and Conditions",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-primary-800 mb-2">
              Payment Schedule
            </h4>
            <p>
              Payment terms are specified in individual service agreements.
              Standard terms include:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Invoices are payable within 30 days of receipt</li>
              <li>Project-based work may require milestone payments</li>
              <li>Retainer agreements may require advance payment</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-primary-800 mb-2">
              Late Payment
            </h4>
            <p>
              Late payments may incur interest charges of 1.5% per month or the
              maximum rate permitted by law, whichever is lower.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-primary-800 mb-2">
              Currency and Methods
            </h4>
            <p>
              All fees are quoted in USD unless otherwise specified. We accept
              bank transfers, major credit cards, and other methods as agreed.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "5. Intellectual Property Rights",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-primary-800 mb-2">
              Client-Owned IP
            </h4>
            <p>
              You retain ownership of your pre-existing intellectual property,
              data, and proprietary information.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-primary-800 mb-2">
              Work Product
            </h4>
            <p>
              Ownership of deliverables and work product is specified in
              individual service agreements. Generally:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                Custom solutions developed specifically for you become your
                property upon full payment
              </li>
              <li>
                Elitizon retains rights to general methodologies, tools, and
                know-how
              </li>
              <li>
                Third-party software and tools remain the property of their
                respective owners
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-primary-800 mb-2">Elitizon IP</h4>
            <p>
              Our proprietary methodologies, tools, templates, and general
              know-how remain our intellectual property.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "6. Confidentiality and Data Protection",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-primary-800 mb-2">
              Mutual Confidentiality
            </h4>
            <p>
              Both parties agree to maintain strict confidentiality of each
              other&apos;s proprietary information.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-primary-800 mb-2">
              Data Security
            </h4>
            <p>
              We implement industry-standard security measures to protect your
              data and maintain compliance with applicable data protection
              regulations.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-primary-800 mb-2">
              GDPR Compliance
            </h4>
            <p>
              Our data processing practices comply with GDPR and other
              applicable privacy regulations. See our Privacy Policy for
              detailed information.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "7. Service Level Agreements and Performance",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-primary-800 mb-2">
              Service Standards
            </h4>
            <p>
              We strive to deliver high-quality services that meet or exceed
              industry standards and your expectations.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-primary-800 mb-2">
              Response Times
            </h4>
            <p>Standard response times for different service levels:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Critical issues: Within 4 business hours</li>
              <li>General inquiries: Within 1 business day</li>
              <li>Project updates: As specified in project agreements</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-primary-800 mb-2">
              Quality Assurance
            </h4>
            <p>
              All deliverables undergo our internal quality assurance process
              before delivery to ensure they meet our professional standards.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "8. Limitation of Liability",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-primary-800 mb-2">
              Liability Cap
            </h4>
            <p>
              Our total liability for any claims arising from our services shall
              not exceed the total fees paid by you for the specific services
              giving rise to the claim.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-primary-800 mb-2">
              Excluded Damages
            </h4>
            <p>We shall not be liable for:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Indirect, consequential, or incidental damages</li>
              <li>Loss of profits, revenue, or business opportunities</li>
              <li>
                Data loss or corruption not directly caused by our negligence
              </li>
              <li>Third-party claims or damages</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-primary-800 mb-2">
              Force Majeure
            </h4>
            <p>
              Neither party shall be liable for delays or failures in
              performance due to circumstances beyond their reasonable control.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "9. Termination and Cancellation",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-primary-800 mb-2">
              Termination Rights
            </h4>
            <p>
              Either party may terminate services with appropriate notice as
              specified in individual service agreements.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-primary-800 mb-2">
              Immediate Termination
            </h4>
            <p>We may terminate services immediately if:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>You breach these Terms or any service agreement</li>
              <li>Your account becomes overdue beyond agreed terms</li>
              <li>You engage in unlawful or harmful activities</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-primary-800 mb-2">
              Post-Termination
            </h4>
            <p>
              Upon termination, you remain liable for all fees incurred, and
              confidentiality obligations continue to apply.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "10. Governing Law and Dispute Resolution",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-primary-800 mb-2">
              Governing Law
            </h4>
            <p>
              These Terms are governed by the laws of Hong Kong SAR, without
              regard to conflict of law principles.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-primary-800 mb-2">
              Dispute Resolution
            </h4>
            <p>
              We prefer to resolve disputes through good faith negotiation. If
              unsuccessful, disputes shall be resolved through binding
              arbitration in Hong Kong under the HKIAC Arbitration Rules.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-primary-800 mb-2">
              Jurisdiction
            </h4>
            <p>
              For any matters not subject to arbitration, the courts of Hong
              Kong SAR shall have exclusive jurisdiction.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "11. Updates and Modifications",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-primary-800 mb-2">
              Terms Updates
            </h4>
            <p>
              We may update these Terms from time to time. Material changes will
              be communicated to active clients with reasonable notice.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-primary-800 mb-2">
              Continued Use
            </h4>
            <p>
              Your continued use of our services after Terms updates constitutes
              acceptance of the new Terms.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-primary-800 mb-2">
              Version Control
            </h4>
            <p>
              Previous versions of these Terms are available upon request for
              reference purposes.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-primary-600 max-w-4xl mx-auto leading-relaxed">
            These Terms of Service govern your use of Elitizon Ltd&apos;s
            consulting services. By engaging our services, you agree to comply
            with these terms and conditions.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: June 2025 | Effective Date: June 15, 2025
          </p>
        </div>

        {/* Sections */}
        <div className="max-w-4xl mx-auto space-y-4">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full px-8 py-6 text-left bg-white hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-primary-900">
                    {section.title}
                  </h3>
                  <svg
                    className={`w-5 h-5 text-primary-600 transform transition-transform duration-200 ${
                      activeSection === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {activeSection === index && (
                <div className="px-8 pb-6 border-t border-gray-100">
                  <div className="pt-6 text-gray-700 leading-relaxed">
                    {section.content}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Questions About These Terms?
            </h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Our legal team is here to help clarify any questions you may have
              about our Terms of Service and how they apply to your specific
              situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:legal@elitizon.com"
                className="bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-primary-50 transition-colors duration-300 flex items-center space-x-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>Contact Legal Team</span>
              </a>
              <a
                href="/contact"
                className="bg-secondary-600 text-white px-4 py-2 rounded-lg hover:bg-secondary-700 transition-colors text-sm font-medium"
              >
                General Inquiries
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

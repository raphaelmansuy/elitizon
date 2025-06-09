"use client";

import { useState } from "react";

interface Section {
  title: string;
  content: React.ReactNode;
}

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setActiveSection(activeSection === index ? null : index);
  };

  const sections: Section[] = [
    {
      title: "1. Company Information and Data Controller",
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
            <strong>Contact Email:</strong> privacy@elitizon.com
          </p>
          <p>
            <strong>Website:</strong> www.elitizon.com
          </p>
          <p>
            This Privacy Policy explains how Elitizon Ltd collects, uses,
            processes, and protects your personal information when you use our
            website and services.
          </p>
        </div>
      ),
    },
    {
      title: "2. Information We Collect",
      content: (
        <div className="space-y-4">
          <p>We collect information to provide better services to our users:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Contact Information:</strong> Name, email address, phone
              number, company name, job title
            </li>
            <li>
              <strong>Communication Data:</strong> Messages you send us, inquiry
              details, service preferences
            </li>
            <li>
              <strong>Technical Information:</strong> IP address, browser type,
              device information, operating system
            </li>
            <li>
              <strong>Usage Data:</strong> Pages visited, time spent,
              interaction patterns
            </li>
            <li>
              <strong>Cookies and Tracking:</strong> See our Cookie Policy
              section below
            </li>
            <li>
              <strong>Professional Information:</strong> Business requirements,
              project details, technical specifications
            </li>
            <li>
              <strong>Marketing Preferences:</strong> Communication preferences,
              subscription choices
            </li>
            <li>
              Training data provided by clients (subject to separate data
              processing agreements)
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "3. Legal Basis for Processing",
      content: (
        <div className="space-y-4">
          <p>
            We process your personal data based on the following legal grounds:
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-primary-800">
                Consent (Article 6(1)(a))
              </h4>
              <p>
                Marketing communications, cookies, and newsletter subscriptions
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-primary-800">
                Contract Performance (Article 6(1)(b))
              </h4>
              <p>
                Service delivery, project management, and client communications
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-primary-800">
                Legal Obligation (Article 6(1)(c))
              </h4>
              <p>
                Compliance with accounting, tax, and regulatory requirements
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-primary-800">
                Legitimate Interest (Article 6(1)(f))
              </h4>
              <p>
                Business operations, security, fraud prevention, and service
                improvement
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "4. How We Use Your Information",
      content: (
        <div className="space-y-4">
          <p>We use the collected information for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Responding to inquiries and providing requested information</li>
            <li>Delivering our consulting and technical services</li>
            <li>Managing client projects and relationships</li>
            <li>Improving our website and services</li>
            <li>Ensuring security and preventing fraud</li>
            <li>Complying with legal obligations</li>
            <li>Marketing communications (with your consent)</li>
            <li>Business development and partnership opportunities</li>
            <li>
              Data preprocessing and model training (with explicit consent)
            </li>
            <li>Quality assurance and service optimization</li>
          </ul>
        </div>
      ),
    },
    {
      title: "5. Information Sharing and Disclosure",
      content: (
        <div className="space-y-4">
          <p>We may share your information with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Service Providers:</strong> Trusted partners who assist in
              service delivery
            </li>
            <li>
              <strong>European Expert Network:</strong> Specialists involved in
              your projects (with appropriate agreements)
            </li>
            <li>
              <strong>Business Transfers:</strong> In case of merger,
              acquisition, or sale
            </li>
            <li>
              <strong>Legal Requirements:</strong> When required by law or
              regulation
            </li>
            <li>
              <strong>With Consent:</strong> When you explicitly authorize
              sharing
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "6. International Data Transfers",
      content: (
        <div className="space-y-4">
          <p>
            As we operate between Hong Kong and Europe, your data may be
            transferred internationally. We ensure adequate protection through:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Standard Contractual Clauses (SCCs)</li>
            <li>Adequacy decisions</li>
            <li>Binding Corporate Rules (where applicable)</li>
          </ul>
        </div>
      ),
    },
    {
      title: "7. Your Rights Under GDPR",
      content: (
        <div className="space-y-4">
          <p>You have the following rights regarding your personal data:</p>

          <div className="space-y-3">
            <div>
              <strong>Right of Access (Article 15):</strong>
              <p>Request a copy of your personal data we hold</p>
            </div>

            <div>
              <strong>Right to Rectification (Article 16):</strong>
              <p>Correct inaccurate or incomplete data</p>
            </div>

            <div>
              <strong>Right to Erasure (Article 17):</strong>
              <p>Request deletion of your personal data</p>
            </div>

            <div>
              <strong>Right to Restrict Processing (Article 18):</strong>
              <p>Limit how we use your data</p>
            </div>

            <div>
              <strong>Right to Data Portability (Article 20):</strong>
              <p>Receive your data in a portable format</p>
            </div>

            <div>
              <strong>Right to Object (Article 21):</strong>
              <p>Object to processing based on legitimate interests</p>
            </div>
          </div>

          <p className="mb-3">
            Email us at <strong>privacy@elitizon.com</strong> with your request.
            We will respond within 30 days and may require identity
            verification.
          </p>
        </div>
      ),
    },
    {
      title: "8. Data Security",
      content: (
        <div className="space-y-4">
          <p>We implement comprehensive security measures:</p>
          <ul className="list-disc pl-4 space-y-1 text-sm">
            <li>Encryption in transit and at rest</li>
            <li>Access controls and authentication</li>
            <li>Regular security assessments</li>
            <li>Staff training on data protection</li>
            <li>Regular policy updates</li>
          </ul>
        </div>
      ),
    },
    {
      title: "9. Data Retention",
      content: (
        <div className="space-y-4">
          <p>We retain personal data only for as long as necessary:</p>
          <ul className="list-disc pl-4 space-y-1 text-sm">
            <li>
              <span>
                <strong>Contact inquiries:</strong>
              </span>
              <span>2 years after last contact</span>
            </li>
            <li>
              <span>
                <strong>Client projects:</strong>
              </span>
              <span>7 years for business records</span>
            </li>
            <li>
              <span>
                <strong>Marketing consent:</strong>
              </span>
              <span>Until consent is withdrawn</span>
            </li>
            <li>
              <span>
                <strong>Website analytics:</strong>
              </span>
              <span>26 months maximum</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "10. Cookies and Tracking",
      content: (
        <div className="space-y-4">
          <p>We use cookies and similar technologies to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Essential site functionality</li>
            <li>Performance analytics</li>
            <li>Marketing and personalization (with consent)</li>
          </ul>

          <p>You can manage cookie preferences through:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Our cookie consent banner (when you first visit)</li>
            <li>Browser settings</li>
            <li>
              Opt-out links in marketing emails{" "}
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                Consent Required
              </span>
            </li>
          </ul>

          <p>
            Marketing cookies and third-party analytics require your explicit
            consent.
          </p>
          <p>
            Performance tracking{" "}
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
              Consent Required
            </span>
          </p>
        </div>
      ),
    },
    {
      title: "11. Contact Information and Data Protection Officer",
      content: (
        <div className="space-y-4">
          <p className="mb-3">
            While not legally required for our organization size, we are
            committed to appointing a DPO to ensure compliance with data
            protection regulations.
          </p>

          <p className="mb-3">
            For any privacy-related questions or to exercise your rights,
            contact us:
          </p>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p>
              <strong>Email:</strong> privacy@elitizon.com
            </p>
            <p>
              <strong>Address:</strong> Elitizon Ltd, 28 Mody Road, Room 2203,
              22/F., CFC Tower, Tsim Sha Tsui, Hong Kong SAR
            </p>
            <p>
              <strong>DPO Contact:</strong> dpo@elitizon.com
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "12. Policy Updates",
      content: (
        <div className="space-y-4">
          <p>
            We may update this Privacy Policy to reflect changes in our
            practices, technology, legal requirements, or other factors. We will
            notify you of material changes through:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Email notification to registered users</li>
            <li>Prominent notice on our website</li>
            <li>Updated timestamp on this policy</li>
          </ul>

          <h5 className="font-semibold">12.1 Notification Timeline</h5>
          <p>
            We will provide at least 30 days notice for material changes
            affecting your rights.
          </p>

          <h5 className="font-semibold">12.2 Review Responsibility</h5>
          <p>
            We encourage you to review this policy periodically for updates.
          </p>

          <h5 className="font-semibold">12.3 Continued Use</h5>
          <p>
            Your continued use of our services after policy updates constitutes
            acceptance of the revised terms, unless the changes require explicit
            consent.
          </p>

          <h5 className="font-semibold">12.4 Archive Access</h5>
          <p>Previous versions of this policy are available upon request.</p>

          <h5 className="font-semibold">12.5 Transparency Commitment</h5>
          <p>
            We are committed to maintaining transparency in our data practices
            and will always provide clear, accessible information about how we
            handle your data.
          </p>
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
            Privacy Policy
          </h1>
          <p className="text-xl text-primary-600 max-w-4xl mx-auto leading-relaxed">
            At Elitizon Ltd, we are committed to protecting your privacy and
            personal data. This policy explains how we collect, use, and
            safeguard your information in compliance with GDPR and other
            applicable data protection laws.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: December 2024
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
              Questions About This Policy?
            </h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              We're here to help. Our privacy team is committed to addressing
              your concerns and ensuring your data rights are respected.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:privacy@elitizon.com"
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
                <span>Contact Privacy Team</span>
              </a>
              <a
                href="mailto:dpo@elitizon.com"
                className="bg-secondary-600 text-white px-4 py-2 rounded-lg hover:bg-secondary-700 transition-colors text-sm font-medium"
              >
                Contact Privacy Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

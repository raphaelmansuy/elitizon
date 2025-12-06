"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          company: "",
          service: "",
          budget: "",
          timeline: "",
          message: "",
        });
      } else {
        setSubmitError(
          result.message || "Failed to send message. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const offices = [
    {
      title: "Hong Kong Headquarters",
      address:
        "28 Mody Road, Room 2203, 22/F., CFC Tower, Tsim Sha Tsui, Hong Kong SAR",
      description:
        "Elitizon Ltd - Private Company Limited By Shares (Registration: 2348219). Our main office where strategy and client relationships are managed",
      contact: {
        email: "contact@elitizon.com",
        phone: "Available via Google Meet or Zoom",
      },
    },
    {
      title: "European Operations",
      address: "Distributed across 15+ countries",
      description: "Our expert network spans major European tech hubs",
      contact: {
        email: "europe@elitizon.com",
        phone: "Available via Google Meet or Zoom",
      },
    },
  ];

  const faqs = [
    {
      question: "How fast can you deploy an AI Agent?",
      answer:
        "We deploy working AI Agents in days, not months. Our AI Builder Factory treats implementation like a manufacturing line—standardized, scalable, and robust.",
    },
    {
      question: "What's the Dual Engine Model?",
      answer:
        "80% of work is done by our AI Agents (automation). 20% is handled by Deployed Engineers (integration, governance, edge cases). You get results faster at lower cost.",
    },
    {
      question: "How is this different from traditional consulting?",
      answer:
        "We don't sell advice—we sell capacity. You pay for working AI solutions, not PowerPoint decks. Outcome-based pricing means we're aligned with your success.",
    },
    {
      question: "Can you integrate with our existing systems?",
      answer:
        "Yes. Our Deployed Engineers specialize in wiring AI Agents into legacy systems—CRM, ERP, databases, APIs. That's the 20% that makes everything work.",
    },
  ];

  if (submitted) {
    return (
      <div className="pt-16 min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-pink-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Thank You!
            </h2>
            <p className="text-slate-600 mb-6">
              Your message has been sent successfully. We&apos;ll get back to
              you within 24 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Build Your AI Agent Today
            </h1>
            <p className="text-xl md:text-2xl text-slate-100 max-w-4xl mx-auto">
              Stop paying for advice. <strong>Start buying capacity.</strong> Tell us what you want to automate—we&apos;ll deploy{" "}
              <span className="bg-gradient-to-r from-pink-400 to-pink-300 bg-clip-text text-transparent">
                working AI Agents in days.
              </span>
            </p>

            {/* Trust indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-8 text-slate-300">
              <div className="flex items-center">
                <span className="text-pink-400 mr-2 text-xl">🏭</span>
                <span>80% Done by AI Agents</span>
              </div>
              <div className="flex items-center">
                <span className="text-pink-400 mr-2 text-xl">⚡</span>
                <span>Results in Days</span>
              </div>
              <div className="flex items-center">
                <span className="text-pink-400 mr-2 text-xl">💰</span>
                <span>Outcome-Based Pricing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  Tell Us What You Want to Automate
                </h2>
                <p className="text-slate-600 mb-8">
                  Describe your workflow challenge. We&apos;ll design a custom AI Agent
                  and show you how our Deployed Engineers will wire it into your systems.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
                        placeholder="your.email@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
                      placeholder="Your company name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="service"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        What Do You Want to Build?
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
                      >
                        <option value="">Select a goal</option>
                        <option value="build-agent">
                          Build an AI Agent (Automation)
                        </option>
                        <option value="deploy-engineers">
                          Hire Deployed Engineers (Implementation)
                        </option>
                        <option value="data-foundation">
                          Build Data Infrastructure (RAG/Vector DB)
                        </option>
                        <option value="strategy">AI Strategy & Audit</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="budget"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Project Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
                      >
                        <option value="">Select budget range</option>
                        <option value="under-50k">Under $50,000</option>
                        <option value="50k-100k">$50,000 - $100,000</option>
                        <option value="100k-250k">$100,000 - $250,000</option>
                        <option value="250k-500k">$250,000 - $500,000</option>
                        <option value="over-500k">Over $500,000</option>
                        <option value="discuss">Prefer to discuss</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="timeline"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Preferred Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">ASAP</option>
                      <option value="1-month">Within 1 month</option>
                      <option value="3-months">Within 3 months</option>
                      <option value="6-months">Within 6 months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Project Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
                      placeholder="Tell us about your project requirements, challenges, and goals..."
                    />
                  </div>

                  {submitError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-red-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-red-700">{submitError}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-pink-600 to-pink-700 text-white px-6 py-4 rounded-lg font-semibold hover:from-pink-700 hover:to-pink-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Office Locations */}
              {offices.map((office, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {office.title}
                  </h3>
                  <p className="text-slate-600 mb-3">{office.address}</p>
                  <p className="text-sm text-slate-500 mb-4">
                    {office.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <span className="text-slate-500 mr-2">📧</span>
                      <a
                        href={`mailto:${office.contact.email}`}
                        className="text-pink-600 hover:underline"
                      >
                        {office.contact.email}
                      </a>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-slate-500 mr-2">📞</span>
                      <span className="text-slate-600">
                        {office.contact.phone}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Quick Info */}
              <div className="bg-gradient-to-r from-slate-600 to-slate-800 rounded-2xl shadow-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Quick Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="mr-3">⏰</span>
                    <div>
                      <div className="font-semibold">Response Time</div>
                      <div className="text-slate-100 text-sm">Within 24hr</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-3">💼</span>
                    <div>
                      <div className="font-semibold">Free Consultation</div>
                      <div className="text-slate-100 text-sm">
                        30-minute strategy call
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-3">🌏</span>
                    <div>
                      <div className="font-semibold">Global Reach</div>
                      <div className="text-slate-100 text-sm">
                        Hong Kong + Europe
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600">
              Common questions about our services and approach
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-slate-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

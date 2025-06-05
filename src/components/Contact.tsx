"use client";

import { useState } from "react";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form submitted:", formData);

    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      service: "",
      message: "",
    });

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Hide success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <section
      className="py-24 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden"
      aria-labelledby="contact-heading"
      role="region"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 -right-40 w-80 h-80 bg-secondary-100 rounded-full opacity-20 animate-float"></div>
        <div
          className="absolute bottom-1/4 -left-40 w-80 h-80 bg-primary-100 rounded-full opacity-20 animate-float"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="text-center mb-20">
          <h2
            id="contact-heading"
            className="text-4xl md:text-6xl font-bold text-primary-900 mb-8 leading-tight"
          >
            Ready to Transform
            <span className="block bg-gradient-to-r from-secondary-600 to-secondary-500 bg-clip-text text-transparent mt-2">
              Your Business?
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-primary-700 max-w-4xl mx-auto leading-relaxed font-medium">
            Get in touch with our experts to discuss your data engineering, ML,
            or AI project requirements. Let&apos;s build something extraordinary
            together.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-3xl font-bold text-primary-900 mb-8">
              Send us a message
            </h3>

            {isSubmitted && (
              <div
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl"
                role="alert"
                aria-live="polite"
              >
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-green-700 font-medium">
                    Thank you! We&apos;ll get back to you soon.
                  </p>
                </div>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              noValidate
              aria-label="Contact form"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-primary-900 mb-2"
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
                  className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 hover:shadow-md ${
                    errors.name
                      ? "border-red-300 focus:ring-red-200 bg-red-50 aria-invalid"
                      : "border-primary-300 focus:ring-primary-200 focus:border-secondary-500"
                  }`}
                  placeholder="Your full name"
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p
                    id="name-error"
                    className="mt-2 text-sm text-red-600 animate-fade-in-up font-medium"
                    role="alert"
                    aria-live="polite"
                  >
                    <svg
                      className="w-4 h-4 inline mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-primary-900 mb-2"
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
                  className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 hover:shadow-md ${
                    errors.email
                      ? "border-red-300 focus:ring-red-200 bg-red-50"
                      : "border-primary-300 focus:ring-primary-200 focus:border-secondary-500"
                  }`}
                  placeholder="your.email@company.com"
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="mt-2 text-sm text-red-600 animate-fade-in-up font-medium"
                    role="alert"
                    aria-live="polite"
                  >
                    <svg
                      className="w-4 h-4 inline mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-semibold text-primary-900 mb-2"
                >
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-primary-300 rounded-xl focus:ring-4 focus:ring-primary-200 focus:border-secondary-500 transition-all duration-200 focus:outline-none hover:shadow-md"
                  placeholder="Your company name"
                />
              </div>

              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-semibold text-primary-900 mb-2"
                >
                  Service of Interest
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-primary-300 rounded-xl focus:ring-4 focus:ring-primary-200 focus:border-secondary-500 transition-all duration-200 focus:outline-none hover:shadow-md"
                  aria-label="Select a service you're interested in"
                >
                  <option value="">Select a service</option>
                  <option value="data-engineering">Data Engineering</option>
                  <option value="machine-learning">Machine Learning</option>
                  <option value="ai-agents">Generative AI & AI Agents</option>
                  <option value="consulting">General Consulting</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-primary-900 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 hover:shadow-md resize-none ${
                    errors.message
                      ? "border-red-300 focus:ring-red-200 bg-red-50"
                      : "border-primary-300 focus:ring-primary-200 focus:border-secondary-500"
                  }`}
                  placeholder="Tell us about your project requirements..."
                  aria-invalid={errors.message ? "true" : "false"}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />
                {errors.message && (
                  <p
                    id="message-error"
                    className="mt-2 text-sm text-red-600 animate-fade-in-up font-medium"
                    role="alert"
                    aria-live="polite"
                  >
                    <svg
                      className="w-4 h-4 inline mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-secondary-600 to-secondary-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-secondary-700 hover:to-secondary-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2 focus:outline-none focus:ring-4 focus:ring-secondary-200"
                aria-label={
                  isSubmitting
                    ? "Sending message..."
                    : "Send message to Elitizon"
                }
              >
                {isSubmitting ? (
                  <>
                    <div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                      aria-hidden="true"
                    ></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div
            className="space-y-8 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            {/* Office Location */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-secondary-600 to-secondary-500 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-primary-900 mb-3">
                    Hong Kong Office
                  </h4>
                  <p className="text-primary-700 leading-relaxed">
                    Central Business District
                    <br />
                    Hong Kong SAR
                    <br />
                    Available for meetings by appointment
                  </p>
                </div>
              </div>
            </div>

            {/* European Network */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-700 to-primary-600 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-primary-900 mb-3">
                    European Expert Network
                  </h4>
                  <p className="text-primary-700 leading-relaxed">
                    50+ specialists across
                    <br />
                    France, Germany, UK, Netherlands
                    <br />
                    Remote collaboration worldwide
                  </p>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-500 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-primary-900 mb-3">
                    Quick Response
                  </h4>
                  <p className="text-primary-700 leading-relaxed">
                    We respond within 24 hours
                    <br />
                    Initial consultation available
                    <br />
                    Flexible meeting scheduling
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl shadow-xl p-8 text-white">
              <h4 className="text-2xl font-bold mb-4">Ready to Start?</h4>
              <p className="text-white mb-6 leading-relaxed">
                Schedule a free consultation to discuss your project needs and
                explore how we can help transform your business.
              </p>
              <a
                href="mailto:contact@elitizon.com"
                className="inline-flex items-center space-x-2 bg-white text-slate-800 px-6 py-3 rounded-xl font-semibold hover:bg-slate-50 hover:text-slate-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
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
                <span>Direct Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

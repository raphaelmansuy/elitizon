"use client";

import { useState } from "react";
import Link from "next/link";

interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  linkedinUrl: string;

  // Professional Information
  currentTitle: string;
  yearsExperience: string;
  expertiseArea: string;
  primarySkills: string[];
  secondarySkills: string[];

  // Availability & Preferences
  availabilityType: string;
  preferredRate: string;
  timeZone: string;
  preferredProjectTypes: string[];

  // Experience & Portfolio
  previousExperience: string;
  portfolioUrl: string;
  githubUrl: string;
  notableProjects: string;

  // Additional Information
  remoteExperience: string;
  clientFacingExperience: string;
  additionalInfo: string;

  // Agreements
  privacyConsent: boolean;
  termsAgreement: boolean;
}

export default function ApplyPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    linkedinUrl: "",
    currentTitle: "",
    yearsExperience: "",
    expertiseArea: "",
    primarySkills: [],
    secondarySkills: [],
    availabilityType: "",
    preferredRate: "",
    timeZone: "",
    preferredProjectTypes: [],
    previousExperience: "",
    portfolioUrl: "",
    githubUrl: "",
    notableProjects: "",
    remoteExperience: "",
    clientFacingExperience: "",
    additionalInfo: "",
    privacyConsent: false,
    termsAgreement: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const expertiseOptions = [
    "Data Engineering",
    "Machine Learning Engineering",
    "Generative AI & LLMs",
    "Data Science & Analytics",
    "Cloud Architecture",
    "DevOps & MLOps",
  ];

  const skillsOptions = {
    dataEngineering: [
      "Apache Spark",
      "Kafka",
      "Airflow",
      "dbt",
      "Databricks",
      "Snowflake",
      "AWS",
      "Azure",
      "GCP",
    ],
    mlEngineering: [
      "MLOps",
      "Model Deployment",
      "Kubernetes",
      "Docker",
      "CI/CD",
      "Monitoring",
      "TensorFlow",
      "PyTorch",
    ],
    genAI: [
      "OpenAI APIs",
      "RAG Systems",
      "Fine-tuning",
      "Prompt Engineering",
      "AI Agents",
      "LangChain",
      "Vector DBs",
    ],
    dataScience: [
      "Python",
      "R",
      "Statistics",
      "Deep Learning",
      "Computer Vision",
      "NLP",
      "Jupyter",
      "Pandas",
    ],
    cloudArchitecture: [
      "AWS",
      "Azure",
      "GCP",
      "Terraform",
      "CloudFormation",
      "Serverless",
      "Microservices",
    ],
    devOps: [
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Monitoring",
      "Infrastructure as Code",
      "GitOps",
      "Prometheus",
    ],
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string | string[] | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSkillToggle = (skill: string, type: "primary" | "secondary") => {
    const field = type === "primary" ? "primarySkills" : "secondarySkills";
    const current = formData[field];
    const updated = current.includes(skill)
      ? current.filter((s) => s !== skill)
      : [...current, skill];
    handleInputChange(field, updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/careers/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage(
          "Application submitted successfully! We'll review your application and get back to you within 2-3 business days."
        );
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          location: "",
          linkedinUrl: "",
          currentTitle: "",
          yearsExperience: "",
          expertiseArea: "",
          primarySkills: [],
          secondarySkills: [],
          availabilityType: "",
          preferredRate: "",
          timeZone: "",
          preferredProjectTypes: [],
          previousExperience: "",
          portfolioUrl: "",
          githubUrl: "",
          notableProjects: "",
          remoteExperience: "",
          clientFacingExperience: "",
          additionalInfo: "",
          privacyConsent: false,
          termsAgreement: false,
        });
        setCurrentStep(1);
      } else {
        const error = await response.json();
        setSubmitMessage(
          `Error: ${error.message || "Failed to submit application"}`
        );
      }
    } catch (error) {
      console.error("Application submission error:", error);
      setSubmitMessage(
        "Error: Failed to submit application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAvailableSkills = () => {
    switch (formData.expertiseArea) {
      case "Data Engineering":
        return skillsOptions.dataEngineering;
      case "Machine Learning Engineering":
        return skillsOptions.mlEngineering;
      case "Generative AI & LLMs":
        return skillsOptions.genAI;
      case "Data Science & Analytics":
        return skillsOptions.dataScience;
      case "Cloud Architecture":
        return skillsOptions.cloudArchitecture;
      case "DevOps & MLOps":
        return skillsOptions.devOps;
      default:
        return [];
    }
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="pt-16 min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Join Our Professional Network
          </h1>
          <p className="text-xl text-slate-100 mb-8">
            Take the first step towards joining our curated
            freelance consulting network
          </p>
          <div className="flex justify-center">
            <div className="flex space-x-4">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step
                      ? "bg-pink-500 text-white"
                      : "bg-slate-600 text-slate-300"
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Personal Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Location (City, Country) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    LinkedIn Profile URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.linkedinUrl}
                    onChange={(e) =>
                      handleInputChange("linkedinUrl", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Professional Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Professional Information
                </h2>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Current Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.currentTitle}
                    onChange={(e) =>
                      handleInputChange("currentTitle", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="e.g., Senior Data Engineer"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Years of Experience *
                    </label>
                    <select
                      required
                      value={formData.yearsExperience}
                      onChange={(e) =>
                        handleInputChange("yearsExperience", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="">Select...</option>
                      <option value="5-7">5-7 years</option>
                      <option value="8-10">8-10 years</option>
                      <option value="11-15">11-15 years</option>
                      <option value="15+">15+ years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Primary Expertise Area *
                    </label>
                    <select
                      required
                      value={formData.expertiseArea}
                      onChange={(e) =>
                        handleInputChange("expertiseArea", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="">Select...</option>
                      {expertiseOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {formData.expertiseArea && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Primary Skills (Select 3-5) *
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {getAvailableSkills().map((skill) => (
                          <label
                            key={skill}
                            className="flex items-center space-x-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={formData.primarySkills.includes(skill)}
                              onChange={() =>
                                handleSkillToggle(skill, "primary")
                              }
                              className="w-4 h-4 text-pink-600 border-slate-300 rounded focus:ring-pink-500"
                            />
                            <span className="text-sm text-slate-700">
                              {skill}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Secondary Skills (Optional)
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {getAvailableSkills().map((skill) => (
                          <label
                            key={skill}
                            className="flex items-center space-x-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={formData.secondarySkills.includes(skill)}
                              onChange={() =>
                                handleSkillToggle(skill, "secondary")
                              }
                              className="w-4 h-4 text-pink-600 border-slate-300 rounded focus:ring-pink-500"
                            />
                            <span className="text-sm text-slate-700">
                              {skill}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Step 3: Availability & Experience */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Availability & Experience
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Availability Type *
                    </label>
                    <select
                      required
                      value={formData.availabilityType}
                      onChange={(e) =>
                        handleInputChange("availabilityType", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="">Select...</option>
                      <option value="full-time">
                        Full-time (40+ hours/week)
                      </option>
                      <option value="part-time">
                        Part-time (20-39 hours/week)
                      </option>
                      <option value="project-based">Project-based</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Preferred Rate (EUR/hour) *
                    </label>
                    <select
                      required
                      value={formData.preferredRate}
                      onChange={(e) =>
                        handleInputChange("preferredRate", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="">Select...</option>
                      <option value="100-150">€100-150</option>
                      <option value="150-200">€150-200</option>
                      <option value="200-250">€200-250</option>
                      <option value="250-300">€250-300</option>
                      <option value="300+">€300+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Time Zone *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.timeZone}
                    onChange={(e) =>
                      handleInputChange("timeZone", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="e.g., CET, GMT+8, PST"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Previous Experience Summary *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.previousExperience}
                    onChange={(e) =>
                      handleInputChange("previousExperience", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Briefly describe your relevant experience, key achievements, and types of projects you've worked on..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Portfolio URL
                    </label>
                    <input
                      type="url"
                      value={formData.portfolioUrl}
                      onChange={(e) =>
                        handleInputChange("portfolioUrl", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      GitHub Profile
                    </label>
                    <input
                      type="url"
                      value={formData.githubUrl}
                      onChange={(e) =>
                        handleInputChange("githubUrl", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Final Details */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Final Details
                </h2>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Notable Projects or Achievements
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notableProjects}
                    onChange={(e) =>
                      handleInputChange("notableProjects", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Describe 1-2 notable projects that showcase your expertise..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Remote Work Experience *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.remoteExperience}
                    onChange={(e) =>
                      handleInputChange("remoteExperience", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Describe your experience working remotely and managing remote client relationships..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Client-Facing Experience *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.clientFacingExperience}
                    onChange={(e) =>
                      handleInputChange(
                        "clientFacingExperience",
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Describe your experience working directly with clients, presenting technical solutions, etc..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    rows={3}
                    value={formData.additionalInfo}
                    onChange={(e) =>
                      handleInputChange("additionalInfo", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Any additional information you'd like to share..."
                  />
                </div>

                <div className="space-y-4">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.privacyConsent}
                      onChange={(e) =>
                        handleInputChange("privacyConsent", e.target.checked)
                      }
                      className="w-5 h-5 text-pink-600 border-slate-300 rounded focus:ring-pink-500 mt-1"
                    />
                    <span className="text-sm text-slate-700">
                      I consent to the processing of my personal data for the
                      purpose of this application and future communications
                      regarding opportunities. *
                    </span>
                  </label>

                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.termsAgreement}
                      onChange={(e) =>
                        handleInputChange("termsAgreement", e.target.checked)
                      }
                      className="w-5 h-5 text-pink-600 border-slate-300 rounded focus:ring-pink-500 mt-1"
                    />
                    <span className="text-sm text-slate-700">
                      I agree to the terms and conditions of the application
                      process and understand that this is an application to join
                      a freelance network. *
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200">
              <div>
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Previous
                  </button>
                )}
              </div>

              <div>
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-gradient-to-r from-pink-600 to-pink-500 text-white rounded-lg hover:from-pink-500 hover:to-pink-400 disabled:opacity-50 transition-colors"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                )}
              </div>
            </div>

            {/* Submit Message */}
            {submitMessage && (
              <div
                className={`mt-6 p-4 rounded-lg ${
                  submitMessage.includes("Error")
                    ? "bg-red-50 text-red-700"
                    : "bg-green-50 text-green-700"
                }`}
              >
                {submitMessage}
              </div>
            )}
          </form>

          {/* Back to Careers */}
          <div className="text-center mt-8">
            <Link
              href="/careers"
              className="text-pink-600 hover:text-pink-700 font-medium"
            >
              ← Back to Careers Page
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

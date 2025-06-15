import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Remote AI Jobs & Data Engineering Careers | Join ELITIZON Global Team",
  description:
    "Join ELITIZON's global network of AI & data experts. 100% remote-first careers in Machine Learning, Data Engineering, and AI consulting. Premium compensation, flexible engagement worldwide.",
  keywords:
    "remote AI jobs, data engineering careers, AI consultant jobs, machine learning remote work, remote data science jobs, global AI careers, remote-first AI consulting jobs",
  openGraph: {
    title: "Remote AI Jobs & Data Engineering Careers | ELITIZON",
    description:
      "Join ELITIZON's global network of AI & data experts. 100% remote-first careers with premium compensation and flexible engagement worldwide.",
    url: "https://elitizon.com/careers",
    siteName: "ELITIZON",
    images: [
      {
        url: "https://elitizon.com/og-careers.jpg",
        width: 1200,
        height: 630,
        alt: "Remote AI Jobs at ELITIZON",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Remote AI Jobs & Data Engineering Careers | ELITIZON",
    description:
      "Join ELITIZON's global network of AI & data experts. 100% remote-first careers with premium compensation and flexible engagement worldwide.",
    images: ["https://elitizon.com/og-careers.jpg"],
  },
  alternates: {
    canonical: "https://elitizon.com/careers",
  },
};

export default function CareersPage() {
  const benefits = [
    {
      title: "100% Remote First",
      description:
        "Work from anywhere in the world. No office politics, no commuting, just pure focus on what you do best.",
      icon: "🌍",
    },
    {
      title: "Elite Projects Only",
      description:
        "Join exclusive projects with Fortune 500 companies and cutting-edge startups. Work on problems that matter.",
      icon: "🚀",
    },
    {
      title: "Premium Compensation",
      description:
        "Top-tier rates that reflect your expertise. We believe exceptional talent deserves exceptional compensation.",
      icon: "💎",
    },
    {
      title: "Flexible Engagement",
      description:
        "Choose your projects, set your schedule. Work when you're most productive, not when you're told to.",
      icon: "⚡",
    },
    {
      title: "Continuous Learning",
      description:
        "Stay ahead with access to the latest tools, technologies, and training. We invest in your growth.",
      icon: "📚",
    },
    {
      title: "Global Network",
      description:
        "Connect with other world-class experts across Europe, Asia, and beyond. Build your professional network.",
      icon: "🤝",
    },
  ];

  const expertiseAreas = [
    {
      title: "Data Engineering",
      description: "Build the backbone of modern data infrastructure",
      skills: [
        "Apache Spark",
        "Kafka",
        "Airflow",
        "dbt",
        "Databricks",
        "Snowflake",
        "Cloud Platforms",
      ],
      demand: "High",
      projects: "15+ active projects",
    },
    {
      title: "Machine Learning Engineering",
      description: "Transform models into production-ready systems",
      skills: [
        "MLOps",
        "Model Deployment",
        "Kubernetes",
        "Docker",
        "CI/CD",
        "Monitoring",
      ],
      demand: "Very High",
      projects: "12+ active projects",
    },
    {
      title: "Generative AI & LLMs",
      description: "Shape the future of AI-powered applications",
      skills: [
        "OpenAI APIs",
        "RAG Systems",
        "Fine-tuning",
        "Prompt Engineering",
        "AI Agents",
      ],
      demand: "Extreme",
      projects: "20+ active projects",
    },
    {
      title: "Data Science & Analytics",
      description: "Extract insights that drive business decisions",
      skills: [
        "Python/R",
        "Statistics",
        "Deep Learning",
        "Computer Vision",
        "NLP",
      ],
      demand: "High",
      projects: "10+ active projects",
    },
  ];

  const testimonials = [
    {
      name: "Sarah C.",
      role: "Senior ML Engineer",
      location: "Singapore",
      quote:
        "Elitizon has transformed my freelance career. I work on cutting-edge AI projects with global clients while maintaining complete flexibility. The quality of projects and clients is unmatched.",
      rating: 5,
    },
    {
      name: "Marcus W.",
      role: "Data Engineering Lead",
      location: "Zurich",
      quote:
        "After 10 years in corporate, joining Elitizon's network was the best decision I made. Premium rates, fascinating projects, and the freedom to work on my terms.",
      rating: 5,
    },
    {
      name: "Priya P.",
      role: "AI Solutions Architect",
      location: "London",
      quote:
        "The caliber of clients and projects at Elitizon is exceptional. I'm building AI systems that are actually changing industries, not just internal corporate tools.",
      rating: 5,
    },
  ];

  const requirements = [
    "5+ years of hands-on experience in your domain",
    "Proven track record of delivering complex technical projects",
    "Strong communication skills and client-facing experience",
    "Self-motivated with excellent time management",
    "Portfolio of work that demonstrates deep expertise",
    "Ability to work across different time zones when needed",
  ];

  const applicationProcess = [
    {
      step: 1,
      title: "Initial Application",
      description:
        "Submit your application with portfolio and expertise details",
      duration: "5 minutes",
    },
    {
      step: 2,
      title: "Technical Review",
      description:
        "Our technical team reviews your background and previous work",
      duration: "2-3 days",
    },
    {
      step: 3,
      title: "Expert Interview",
      description: "Deep-dive technical discussion with our senior experts",
      duration: "45 minutes",
    },
    {
      step: 4,
      title: "Client Simulation",
      description: "Mock client presentation to assess communication skills",
      duration: "30 minutes",
    },
    {
      step: 5,
      title: "Welcome to the Network",
      description: "Onboarding and first project matching",
      duration: "1 week",
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Join the Elite Network of
              <span className="bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent block">
                Remote-First Experts
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-100 mb-12 leading-relaxed">
              Are you a world-class data engineer, ML engineer, or AI
              specialist? Join an exclusive network of top-tier freelancers
              working on the most challenging and rewarding projects in the
              industry.
            </p>{" "}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/careers/apply"
                className="bg-gradient-to-r from-pink-600 to-pink-500 text-white px-10 py-5 rounded-xl text-lg font-semibold hover:from-pink-500 hover:to-pink-400 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                Apply Now
              </Link>
              <Link
                href="#learn-more"
                className="border-2 border-white text-white px-10 py-5 rounded-xl text-lg font-semibold hover:bg-white hover:text-slate-900 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Elitizon */}
      <section id="learn-more" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Why Top Experts Choose Elitizon
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We&apos;re not just another consulting firm. We&apos;re a curated
              network that puts your expertise, freedom, and growth first.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border border-slate-100"
              >
                <div className="text-5xl mb-6">{benefit.icon}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Where Your Expertise Matters Most
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Join projects at the forefront of technology. Work with companies
              that are defining the future of their industries.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {expertiseAreas.map((area, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8"
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-slate-900">
                    {area.title}
                  </h3>
                  <div className="text-right">
                    <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-semibold block mb-2">
                      Demand: {area.demand}
                    </span>
                    <span className="text-slate-500 text-sm">
                      {area.projects}
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 mb-6 text-lg">
                  {area.description}
                </p>

                <div>
                  <h4 className="font-semibold text-slate-700 mb-3">
                    In-Demand Skills:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {area.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              What Our Experts Say
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Hear from world-class professionals who&apos;ve transformed their
              careers with Elitizon&apos;s exclusive network.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl p-8 relative">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-pink-500 text-xl">
                      ★
                    </span>
                  ))}
                </div>

                <blockquote className="text-slate-700 text-lg mb-6 italic leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">
                      {testimonial.name}
                    </div>
                    <div className="text-slate-600 text-sm">
                      {testimonial.role}
                    </div>
                    <div className="text-slate-500 text-sm">
                      📍 {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Do You Have What It Takes?
            </h2>
            <p className="text-xl text-slate-100">
              We&apos;re selective because our clients demand excellence.
              Here&apos;s what we look for:
            </p>
          </div>

          <div className="space-y-4">
            {requirements.map((requirement, index) => (
              <div
                key={index}
                className="flex items-start bg-white/10 backdrop-blur-sm rounded-xl p-6"
              >
                <span className="bg-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                  {index + 1}
                </span>
                <p className="text-lg text-slate-100">{requirement}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Your Path to Elite Status
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our streamlined process ensures we find the perfect match between
              your expertise and our most exciting projects.
            </p>
          </div>

          <div className="relative">
            {/* Process Steps */}
            <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-5 md:gap-8">
              {applicationProcess.map((step, index) => (
                <div key={index} className="relative">
                  {/* Connector Line */}
                  {index < applicationProcess.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-pink-300 to-pink-500 transform -translate-y-1/2"></div>
                  )}

                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
                      {step.step}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {step.title}
                    </h3>

                    <p className="text-slate-600 text-sm mb-2">
                      {step.description}
                    </p>

                    <span className="text-pink-600 text-sm font-semibold">
                      {step.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="apply"
        className="py-24 bg-gradient-to-r from-pink-600 to-pink-500"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Elevate Your Career?
          </h2>
          <p className="text-xl text-pink-100 mb-12 leading-relaxed">
            Join an exclusive network of experts who&apos;ve chosen freedom,
            premium compensation, and world-class projects. Your expertise
            deserves the best platform.
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-white mb-2">
                  €100-300
                </div>
                <div className="text-pink-100">Per hour range</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">100%</div>
                <div className="text-pink-100">Remote work</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">20+</div>
                <div className="text-pink-100">Active projects</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/careers/apply"
              className="bg-white text-pink-600 px-12 py-5 rounded-xl text-lg font-bold hover:bg-pink-50 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Start Your Application
            </Link>
            <Link
              href="/services"
              className="border-2 border-white text-white px-12 py-5 rounded-xl text-lg font-semibold hover:bg-white hover:text-pink-600 transition-all duration-300"
            >
              View Our Projects
            </Link>
          </div>

          <p className="text-pink-100 mt-8 text-sm">
            Questions? Email us at{" "}
            <a
              href="mailto:careers@elitizon.com"
              className="underline font-semibold"
            >
              careers@elitizon.com
            </a>
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                How selective is the application process?
              </h3>
              <p className="text-slate-600">
                We accept approximately 5-10% of applicants. We&apos;re looking
                for true experts who can work independently and deliver
                exceptional results for our premium clients.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                What&apos;s the minimum time commitment?
              </h3>
              <p className="text-slate-600">
                There&apos;s no minimum commitment. Some experts work part-time
                on single projects, while others are fully booked months in
                advance. It&apos;s entirely up to you.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Do you provide benefits?
              </h3>
              <p className="text-slate-600">
                As independent contractors, you&apos;re responsible for your own
                benefits. However, our premium rates are structured to account
                for this, often resulting in higher total compensation than
                traditional employment.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                What time zones do you work across?
              </h3>
              <p className="text-slate-600">
                Our network spans Europe and Asia-Pacific, covering all major
                business hours. Most projects are asynchronous, but some may
                require specific timezone overlap.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

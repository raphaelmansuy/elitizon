import Link from "next/link";

export default function Services() {
  const services = [
    {
      title: "Data Engineering",
      description:
        "Transform chaotic data into your competitive advantage. Our experts build enterprise-grade data infrastructure that scales with your business and delivers insights in real-time.",
      features: [
        "Data Pipeline Architecture",
        "Real-time Data Processing",
        "Cloud Data Platforms",
        "Data Quality & Governance",
        "ETL/ELT Solutions",
      ],
      icon: "🏗️",
      color: "from-secondary-600 to-secondary-500",
      bgColor: "from-secondary-50 to-secondary-100",
      iconBg: "from-secondary-600 to-secondary-500",
    },
    {
      title: "Machine Learning",
      description:
        "Turn data into profit with AI that actually works. Our ML solutions automate complex decisions, predict customer behavior, and optimize operations to drive measurable business growth.",
      features: [
        "Predictive Analytics",
        "Computer Vision",
        "Natural Language Processing",
        "Recommendation Systems",
        "MLOps & Model Deployment",
      ],
      icon: "🤖",
      color: "from-primary-700 to-primary-600",
      bgColor: "from-primary-50 to-primary-100",
      iconBg: "from-primary-700 to-primary-600",
    },
    {
      title: "Generative AI & AI Agents",
      description:
        "Deploy intelligent AI agents that work 24/7 for your business. From customer service to content creation, our GenAI solutions reduce costs while improving quality and speed.",
      features: [
        "Custom AI Agents",
        "LLM Integration",
        "Conversational AI",
        "Content Generation",
        "Process Automation",
      ],
      icon: "✨",
      color: "from-secondary-600 to-secondary-500",
      bgColor: "from-secondary-50 to-white",
      iconBg: "from-secondary-600 to-secondary-500",
    },
  ];

  return (
    <section
      className="py-24 bg-gradient-to-b from-neutral-100 to-white relative overflow-hidden"
      aria-labelledby="services-heading"
      role="region"
    >
      {/* Enhanced Background decoration */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 -right-32 w-64 h-64 bg-secondary-200 rounded-full opacity-25 animate-float"></div>
        <div
          className="absolute bottom-1/3 -left-32 w-64 h-64 bg-primary-200 rounded-full opacity-25 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-2/3 right-1/4 w-32 h-32 bg-secondary-300 rounded-full opacity-20 animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <header className="text-center mb-20">
          <h2
            id="services-heading"
            className="text-4xl md:text-5xl font-bold text-primary-900 mb-6"
          >
            Transform Your Business. Drive Real Results.
          </h2>
          <p className="text-xl text-primary-800 max-w-4xl mx-auto leading-relaxed font-medium">
            Our world-class experts deliver <strong>measurable ROI</strong>{" "}
            through cutting-edge AI & Data solutions.
            <span className="block mt-2 text-lg">
              Join industry leaders and Fortune 500 companies who trust Elitizon
              to transform their business with proven AI expertise.
            </span>
          </p>
        </header>

        {/* Enhanced Services Grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20"
          role="list"
        >
          {services.map((service, index) => (
            <article
              key={index}
              className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden hover:-translate-y-2 focus-within:ring-4 focus-within:ring-primary-200"
              role="listitem"
              aria-labelledby={`service-${index}-title`}
            >
              {/* Enhanced Top Border */}
              <div
                className={`h-1 bg-gradient-to-r ${service.color}`}
                aria-hidden="true"
              ></div>

              {/* Card Content */}
              <div className="p-8">
                {/* Enhanced Icon Section */}
                <div className="flex items-center mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${service.iconBg} rounded-2xl flex items-center justify-center text-2xl shadow-lg mr-4 group-hover:scale-110 transition-transform duration-300`}
                    aria-hidden="true"
                  >
                    {service.icon}
                  </div>
                  <div>
                    <h3
                      id={`service-${index}-title`}
                      className="text-2xl font-bold text-primary-900 group-hover:text-primary-800 transition-colors duration-300"
                    >
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-primary-800 mb-8 leading-relaxed text-lg font-medium">
                  {service.description}
                </p>

                {/* Enhanced Features List */}
                <div
                  className={`bg-gradient-to-br ${service.bgColor} rounded-xl p-6 mb-8 border border-gray-200`}
                >
                  <h4 className="text-sm font-bold text-primary-900 mb-4 uppercase tracking-wide">
                    Key Capabilities
                  </h4>
                  <ul className="space-y-3" role="list">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-primary-900 hover:text-primary-800 transition-colors duration-200"
                        role="listitem"
                      >
                        <div
                          className={`w-2 h-2 bg-gradient-to-r ${service.iconBg} rounded-full mr-3 flex-shrink-0`}
                          aria-hidden="true"
                        ></div>
                        <span className="font-semibold text-primary-900">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Enhanced CTA Button */}
                <Link
                  href="/contact"
                  className={`inline-flex items-center justify-center w-full bg-gradient-to-r ${service.color} text-white px-6 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] group-hover:from-primary-700 group-hover:to-secondary-600 focus:outline-none focus:ring-4 focus:ring-primary-200`}
                  aria-label={`Get started with ${service.title} services`}
                >
                  <span>Get Started</span>
                  <svg
                    className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Enhanced Call to Action Section */}
        <section aria-labelledby="cta-heading" className="mt-16">
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-3xl p-12 text-white relative overflow-hidden shadow-2xl">
            {/* Background Pattern */}
            <div
              className="absolute inset-0 overflow-hidden"
              aria-hidden="true"
            >
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
              <div className="absolute top-1/2 -left-8 w-32 h-32 bg-white/5 rounded-full"></div>
              <div className="absolute bottom-4 right-1/3 w-16 h-16 bg-pink-400/20 rounded-full"></div>
            </div>

            <div className="relative z-20 text-center">
              <h3
                id="cta-heading"
                className="text-3xl md:text-4xl font-bold mb-6 text-white"
              >
                Ready to 10X Your Business Growth?
              </h3>
              <p className="text-white mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
                Join the ranks of Fortune 500 companies and innovative startups
                who trust Elitizon to deliver{" "}
                <strong>measurable results</strong> through world-class AI &
                Data expertise.
                <span className="block mt-2">
                  Your competition is already using AI. Don&apos;t get left
                  behind.
                </span>
              </p>
              <div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                role="group"
                aria-label="Contact options"
              >
                <Link
                  href="/contact"
                  className="bg-white text-slate-800 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 hover:text-slate-700 transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-white/30"
                  aria-label="Start a conversation with our team"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  Start a Conversation
                </Link>
                <Link
                  href="/services"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-slate-800 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-white/30"
                  aria-label="View detailed information about all our services"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  View All Services
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

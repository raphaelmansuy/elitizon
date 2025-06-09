import Link from "next/link";

export default function AboutPage() {
  const values = [
    {
      title: "Excellence",
      description:
        "We maintain the highest standards in every project, ensuring top-quality deliverables that exceed expectations.",
      icon: "⭐",
    },
    {
      title: "Innovation",
      description:
        "We stay at the forefront of technology, constantly exploring new solutions and methodologies.",
      icon: "💡",
    },
    {
      title: "Collaboration",
      description:
        "We work as partners with our clients, fostering open communication and shared success.",
      icon: "🤝",
    },
    {
      title: "Integrity",
      description:
        "We conduct business with honesty, transparency, and ethical practices in all our interactions.",
      icon: "🛡️",
    },
  ];

  const timeline = [
    {
      year: "2023",
      title: "Company Founded",
      description:
        "Elitizon Ltd was established in Hong Kong with a vision to bridge Asian innovation with European expertise.",
    },
    {
      year: "2023",
      title: "European Network",
      description:
        "Built strategic partnerships with top-tier freelance experts across Europe, expanding our technical capabilities.",
    },
    {
      year: "2024",
      title: "First Major Projects",
      description:
        "Successfully delivered data engineering and ML solutions for leading fintech and e-commerce companies.",
    },
    {
      year: "2024",
      title: "AI Specialization",
      description:
        "Expanded into Generative AI and AI Agents, becoming early adopters of cutting-edge AI technologies.",
    },
    {
      year: "2025",
      title: "Scale & Growth",
      description:
        "Growing our team and client base while maintaining our commitment to excellence and innovation.",
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-700 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Elitizon Ltd
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto">
              Bridging Hong Kong Innovation with European Excellence in Data,
              AI, and Technology Consulting
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                To empower businesses across Asia-Pacific with world-class data
                engineering, machine learning, and AI solutions by combining the
                strategic advantages of Hong Kong&apos;s business hub with the
                technical excellence of Europe&apos;s finest consultants.
              </p>
              <p className="text-lg text-slate-600">
                We believe that the fusion of Eastern business acumen and
                Western technical innovation creates unparalleled value for our
                clients, enabling them to achieve digital transformation and
                competitive advantage in the global marketplace.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Our Vision
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                To become the leading cross-continental consulting firm that
                sets the standard for excellence in data and AI solutions, known
                for our innovative approach, exceptional talent network, and
                transformative business impact.
              </p>
              <p className="text-lg text-slate-600">
                We envision a future where businesses seamlessly leverage
                advanced analytics, machine learning, and AI to drive growth,
                efficiency, and innovation, with Elitizon Ltd as their trusted
                partner in this journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From startup to leading consulting firm
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-pink-200"></div>
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="relative flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="ml-8">
                    <div className="flex items-center mb-2">
                      <span className="text-pink-600 font-bold text-lg mr-4">
                        {item.year}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-slate-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Why Choose Elitizon Ltd?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-pink-100 p-2 rounded-lg mr-4 mt-1">
                    <svg
                      className="w-5 h-5 text-pink-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">
                      Global Perspective, Local Expertise
                    </h3>
                    <p className="text-slate-600">
                      Unique blend of Asian business understanding and European
                      technical excellence
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-pink-100 p-2 rounded-lg mr-4 mt-1">
                    <svg
                      className="w-5 h-5 text-pink-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">
                      Curated Expert Network
                    </h3>
                    <p className="text-slate-600">
                      Access to Europe&apos;s finest freelance specialists,
                      carefully vetted for excellence
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-pink-100 p-2 rounded-lg mr-4 mt-1">
                    <svg
                      className="w-5 h-5 text-pink-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">
                      Cutting-Edge Technology
                    </h3>
                    <p className="text-slate-600">
                      Always at the forefront of AI, ML, and data engineering
                      innovations
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-pink-100 p-2 rounded-lg mr-4 mt-1">
                    <svg
                      className="w-5 h-5 text-pink-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">
                      Proven Track Record
                    </h3>
                    <p className="text-slate-600">
                      Successful delivery of complex projects across multiple
                      industries
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-600 to-slate-800 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">
                Ready to Work Together?
              </h3>
              <p className="mb-6">
                Let&apos;s discuss how we can help transform your business with
                our expertise in data engineering, machine learning, and AI.
              </p>
              <div className="space-y-4">
                <Link
                  href="/contact"
                  className="block w-full bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-pink-700 transition-colors"
                >
                  Get in Touch
                </Link>
                <Link
                  href="/services"
                  className="block w-full border-2 border-white text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-white hover:text-slate-600 transition-colors"
                >
                  View Our Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

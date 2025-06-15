import Link from "next/link";

export default function TeamPage() {
  const leadership = [
    {
      name: "Raphaël MANSUY",
      role: "Chief Technology Officer",
      location: "Hong Kong",
      expertise: [
        "Technical Leadership",
        "AI & Data Engineering",
        "Technical Architecture",
        "System Design",
      ],
      bio: "Experienced technology leader with expertise in AI, data engineering, and digital transformation. Passionate about building innovative solutions and leading high-performing teams.",
      image: "/team/raphael-mansuy.jpg",
      linkedin: "https://www.linkedin.com/in/raphaelmansuy/",
    },
    {
      name: "Jane LEUNG",
      role: "Chief Executive Officer",
      location: "Hong Kong",
      expertise: [
        "Strategic Leadership",
        "Business Development",
        "AI Strategy",
        "Digital Transformation",
      ],
      bio: "Visionary leader with extensive experience in scaling technology companies and driving digital transformation across Asia-Pacific markets.",
      image: "/team/jane-leung.jpg",
      linkedin: "https://www.linkedin.com/in/jane-leung-264087b7/",
    },
  ];

  const expertiseAreas = [
    {
      area: "Data Engineering",
      experts: 5,
      locations: ["France", "Luxembourg", "Switzerland", "UK", "Hong Kong"],
      skills: ["Apache Spark", "Kafka", "Airflow", "dbt", "Cloud Platforms"],
    },
    {
      area: "Machine Learning",
      experts: 7,
      locations: ["France", "Luxembourg", "Switzerland", "UK", "Hong Kong"],
      skills: ["Deep Learning", "Computer Vision", "NLP", "MLOps", "AutoML"],
    },
    {
      area: "AI & Generative AI",
      experts: 4,
      locations: ["France", "Luxembourg", "Switzerland", "UK", "Hong Kong"],
      skills: [
        "LLMs",
        "RAG Systems",
        "AI Agents",
        "Prompt Engineering",
        "Fine-tuning",
      ],
    },
    {
      area: "Cloud & DevOps",
      experts: 4,
      locations: ["France", "Luxembourg", "Switzerland", "UK", "Hong Kong"],
      skills: ["AWS", "Azure", "GCP", "Kubernetes", "Terraform", "CI/CD"],
    },
  ];

  const benefits = [
    {
      title: "Flexible Engagement",
      description:
        "Work with our experts on project basis or long-term partnerships",
      icon: "🔄",
    },
    {
      title: "Time Zone Coverage",
      description:
        "Our talent pool spans Europe and Asia, enabling a follow-the-sun approach for continuous project delivery",
      icon: "🌍",
    },
    {
      title: "Quality Assurance",
      description: "All experts are pre-vetted and have proven track records",
      icon: "✅",
    },
    {
      title: "Continuous Support",
      description:
        "Ongoing mentorship and knowledge transfer throughout projects",
      icon: "🤝",
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              The World&apos;s Top 1% AI & Data Experts
            </h1>
            <p className="text-xl md:text-2xl text-slate-100 max-w-4xl mx-auto">
              Elite professionals who deliver{" "}
              <strong>measurable results</strong> for Fortune 500 companies and
              innovative startups.
              <span className="block mt-3 text-lg">
                Led by proven executives who&apos;ve scaled AI solutions
                globally.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Leadership Team
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our leadership combines deep technical expertise with strategic
              business acumen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {leadership.map((leader, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow p-8 text-center"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold">
                  {leader.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {leader.name}
                </h3>
                <p className="text-pink-600 font-semibold mb-2">
                  {leader.role}
                </p>
                <p className="text-slate-500 text-sm mb-4">
                  📍 {leader.location}
                </p>

                <div className="mb-4">
                  <div className="flex flex-wrap justify-center gap-2">
                    {leader.expertise.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-pink-100 text-pink-800 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-slate-600 text-sm mb-4">{leader.bio}</p>

                {leader.linkedin && (
                  <Link
                    href={leader.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-pink-600 hover:text-pink-700 font-semibold text-sm transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn Profile
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Network */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Expert Network
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              20 carefully selected specialists across key locations, ready to
              tackle your most challenging projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {expertiseAreas.map((area, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-slate-900">
                    {area.area}
                  </h3>
                  <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {area.experts} experts
                  </span>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-slate-700 mb-2">
                    Locations:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {area.locations.map((location, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-sm"
                      >
                        {location}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-700 mb-2">
                    Key Skills:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {area.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-pink-100 text-pink-800 rounded text-sm"
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

      {/* How We Work */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How We Work
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our distributed team model ensures you get the right expertise at
              the right time
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-slate-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-20 bg-gradient-to-r from-slate-600 to-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Our Expert Network
          </h2>
          <p className="text-xl text-slate-100 mb-8">
            Are you a top-tier data engineer, ML engineer, or AI specialist
            based in Europe or Asia? We&apos;re always looking for exceptional
            talent to join our curated network.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
            >
              Apply to Join
            </Link>
            <Link
              href="/services"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-slate-600 transition-colors"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">20+</div>
              <div className="text-slate-600">Expert Consultants</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">5</div>
              <div className="text-slate-600">Key Locations</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">100+</div>
              <div className="text-slate-600">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">98%</div>
              <div className="text-slate-600">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

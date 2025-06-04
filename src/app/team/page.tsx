import Link from "next/link";

export default function TeamPage() {
  const leadership = [
    {
      name: "Alex Chen",
      role: "Founder & CEO",
      location: "Hong Kong",
      expertise: [
        "Strategic Leadership",
        "Business Development",
        "AI Strategy",
      ],
      bio: "Former VP of Data at leading fintech company. 15+ years experience in data strategy and business transformation.",
      image: "/team/placeholder-1.jpg",
    },
    {
      name: "Dr. Sarah Mitchell",
      role: "Head of AI Research",
      location: "London, UK",
      expertise: ["Machine Learning", "NLP", "Research"],
      bio: "PhD in Computer Science from Oxford. Published researcher with 50+ papers in top-tier AI conferences.",
      image: "/team/placeholder-2.jpg",
    },
    {
      name: "Marcus Weber",
      role: "Lead Data Engineer",
      location: "Berlin, Germany",
      expertise: ["Data Architecture", "Cloud Platforms", "DevOps"],
      bio: "Former Principal Engineer at major cloud provider. Expert in large-scale data infrastructure.",
      image: "/team/placeholder-3.jpg",
    },
  ];

  const expertiseAreas = [
    {
      area: "Data Engineering",
      experts: 12,
      locations: ["Germany", "Netherlands", "France", "UK"],
      skills: ["Apache Spark", "Kafka", "Airflow", "dbt", "Cloud Platforms"],
    },
    {
      area: "Machine Learning",
      experts: 15,
      locations: ["UK", "Switzerland", "Sweden", "Spain"],
      skills: ["Deep Learning", "Computer Vision", "NLP", "MLOps", "AutoML"],
    },
    {
      area: "AI & Generative AI",
      experts: 8,
      locations: ["UK", "Germany", "France", "Denmark"],
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
      experts: 10,
      locations: ["Ireland", "Netherlands", "Germany", "UK"],
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
        "European experts aligned with Asian business hours when needed",
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
              Meet Our Expert Team
            </h1>
            <p className="text-xl md:text-2xl text-slate-100 max-w-4xl mx-auto">
              A curated network of the finest data, AI, and technology experts
              across Europe, led by experienced professionals in Hong Kong
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

                <p className="text-slate-600 text-sm">{leader.bio}</p>
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
              Our European Expert Network
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              45+ carefully selected specialists across Europe, ready to tackle
              your most challenging projects
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
            based in Europe? We&apos;re always looking for exceptional talent to
            join our curated network.
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
              <div className="text-4xl font-bold text-pink-600 mb-2">45+</div>
              <div className="text-slate-600">Expert Consultants</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">12</div>
              <div className="text-slate-600">European Countries</div>
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

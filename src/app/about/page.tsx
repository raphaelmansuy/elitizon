import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title:
    "About ELITIZON | The AI Agent Studio & Builder Factory",
  description:
    "Learn how ELITIZON evolved from AI consulting to the world's first AI Builder Factory. We combine AI Agents with Deployed Engineers to automate 80% of business logic instantly.",
  keywords:
    "AI Agent Studio, AI Builder Factory, Deployed Engineers, Autonomous AI Agents, Dual Engine Model, AI Implementation, AI Automation, Enterprise AI",
  openGraph: {
    title: "About ELITIZON | The AI Agent Studio & Builder Factory",
    description:
      "From AI consulting to AI Builder Factory. We deploy working AI Agents in days, not months. 80% automation + 20% expert implementation.",
    url: "https://elitizon.com/about",
    siteName: "ELITIZON",
    images: [
      {
        url: "https://elitizon.com/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "About ELITIZON - Global AI Consulting Company",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About ELITIZON | Global AI Consulting Company",
    description:
      "Learn about ELITIZON's journey from Hong Kong startup to global AI consulting leader. Remote-first excellence connecting top talent worldwide.",
    images: ["https://elitizon.com/og-about.jpg"],
  },
  alternates: {
    canonical: "https://elitizon.com/about",
  },
};

export default function AboutPage() {
  // Create breadcrumb items
  const breadcrumbItems = [
    { name: "Home", url: "https://elitizon.com" },
    { name: "About", url: "https://elitizon.com/about" },
  ];

  const values = [
    {
      title: "AI-First Execution",
      description:
        "We deploy working AI Agents, not strategy decks. Our AI Builder Factory treats implementation like a manufacturing line—standardized, scalable, and robust.",
      icon: "🏭",
    },
    {
      title: "Deployed Expert Grid",
      description:
        "Our top 1% vetted engineers don't just consult—they embed into your team to wire AI agents into your systems and handle complex edge cases.",
      icon: "⚡",
    },
    {
      title: "Day 1 ROI",
      description:
        "Stop paying for advice. Start buying capacity. We deliver measurable value from Day 1 with outcome-based models tied to actual business results.",
      icon: "🚀",
    },
    {
      title: "Counter-Consulting",
      description:
        "30-50% lower cost, 50% faster delivery than Big Consulting. We're the agile disruptor that delivers hybrid value—AI automation + expert implementation.",
      icon: "💰",
    },
  ];

  const timeline = [
    {
      year: "2020",
      title: "Creation of ELITIZON Ltd",
      description:
        "ELITIZON Ltd was established in Hong Kong with a vision to bridge Asian innovation with European expertise.",
    },
    {
      year: "2021",
      title: "Venture Studio & Data Foundations",
      description:
        "Launched venture studio services, helping startups build data and AI foundations from the ground up.",
    },
    {
      year: "2022",
      title: "Enterprise AI Consulting Expansion",
      description:
        "Secured major contracts for Data Strategy and AI consulting with European enterprises and global retail companies.",
    },
    {
      year: "2023",
      title: "Generative AI & LLM Pioneers",
      description:
        "Early adopters of cutting-edge AI technologies—LLMs, AI Agents, and RAG pipelines. Built first autonomous agents.",
    },
    {
      year: "2025",
      title: "AI Builder Factory Launch",
      description:
        "Transformed into the world's first AI Builder Factory. Dual Engine Model: AI Agents handle 80% of work, Deployed Engineers handle 20%. Results in days, not months.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema(breadcrumbItems)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      {/* Breadcrumb Navigation for UX and SEO */}
      <nav
        className="bg-white border-b border-slate-200"
        aria-label="Breadcrumb"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-4 py-4 text-sm">
            <li>
              <Link
                href="/"
                className="text-slate-500 hover:text-slate-700 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <span className="text-slate-400">/</span>
            </li>
            <li>
              <span className="text-slate-900 font-medium" aria-current="page">
                About
              </span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-700 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              The AI Agent Studio & Builder Factory
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto">
              We don&apos;t sell advice—we build and deploy AI solutions that work from Day 1.
              <span className="block mt-2 text-pink-300 font-semibold">80% AI Agents + 20% Deployed Experts = 100% Results</span>
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
                <strong>Stop Paying for Advice. Start Buying Capacity.</strong> We operate
                the world&apos;s first AI Builder Factory—a hybrid model that combines
                autonomous AI Agents with top-tier Deployed Engineers to deliver
                working solutions in days, not months.
              </p>
              <p className="text-lg text-slate-600">
                While traditional consultants deliver PowerPoint decks, we deploy
                AI agents that automate 80% of your business logic instantly. Our
                vetted experts handle the remaining 20%—integration, governance,
                and edge cases—ensuring you get results from Day 1.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Our Vision
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                To become the independent hybrid alternative to Big Consulting—
                combining AI-first automation with elite human expertise. We
                envision a future where clients don&apos;t pay for advice; they
                invest in deployed capacity that delivers immediate ROI.
              </p>
              <p className="text-lg text-slate-600">
                In an era where AI handles 80% of consulting tasks, we lead the
                shift from recommendations to execution. Our Dual Engine Model
                transformative solutions while maintaining the perfect balance
                between professional excellence and personal freedom.
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
              From startup to global consulting firm - 5 years of growth and
              innovation
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

      {/* Benefits for Consultants and Customers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              The Dual Engine Model Advantage
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              AI Agents + Deployed Engineers = Results in days, not months.
              Here&apos;s how everyone wins.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* For Consultants */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  For Deployed Engineers
                </h3>
                <p className="text-slate-600">
                  Join the world&apos;s top 1% AI implementation specialists
                </p>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <span className="text-slate-700">
                    Work alongside AI Agents on cutting-edge implementations
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <span className="text-slate-700">
                    Access to premium global projects and Fortune 500 clients
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <span className="text-slate-700">
                    Competitive compensation and transparent project matching
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <span className="text-slate-700">
                    Collaborate with world-class peers and expand your network
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <span className="text-slate-700">
                    Perfect work-life balance with project autonomy
                  </span>
                </li>
              </ul>
            </div>

            {/* For Customers */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 border border-pink-100">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  For Customers
                </h3>
                <p className="text-slate-600">
                  Access the world&apos;s finest AI & Data expertise
                </p>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-pink-600 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <span className="text-slate-700">
                    Unmatched access to world-class AI & Data specialists
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-pink-600 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <span className="text-slate-700">
                    Faster project delivery with motivated, flexible experts
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-pink-600 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <span className="text-slate-700">
                    Cost-effective solutions without compromising on quality
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-pink-600 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <span className="text-slate-700">
                    24/7 global coverage with timezone-optimized teams
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-pink-600 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <span className="text-slate-700">
                    Scalable expertise that grows with your business needs
                  </span>
                </li>
              </ul>
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
                      World-Class Expert Network
                    </h3>
                    <p className="text-slate-600">
                      Access to the finest AI & Data specialists globally,
                      carefully vetted for exceptional expertise and proven
                      track records
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
                      Remote-First Excellence
                    </h3>
                    <p className="text-slate-600">
                      Our experts work from where they thrive, delivering
                      exceptional results with the flexibility and freedom that
                      drives innovation
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
                      Unmatched Market Access
                    </h3>
                    <p className="text-slate-600">
                      Clients gain access to expertise typically unavailable in
                      traditional consulting, while experts reach global
                      opportunities
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
                      Win-Win Partnership Model
                    </h3>
                    <p className="text-slate-600">
                      Our model benefits everyone: consultants enjoy freedom and
                      flexibility, clients access world-class expertise, and
                      projects deliver exceptional results
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-600 to-slate-800 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">
                Ready to Join Our Global Network?
              </h3>
              <p className="mb-6">
                Whether you&apos;re a world-class expert looking for freedom and
                flexibility, or a business seeking unmatched AI & Data
                expertise, we&apos;d love to connect with you.
              </p>
              <div className="space-y-4">
                <Link
                  href="/contact"
                  className="block w-full bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-pink-700 transition-colors"
                >
                  Get in Touch
                </Link>
                <Link
                  href="/careers"
                  className="block w-full border-2 border-white text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-white hover:text-slate-600 transition-colors"
                >
                  Join Our Expert Network
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

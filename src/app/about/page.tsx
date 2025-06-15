import Link from "next/link";

export default function AboutPage() {
  const values = [
    {
      title: "Remote-First Excellence",
      description:
        "We embrace the future of work, enabling our experts to deliver world-class solutions from anywhere while maintaining the highest standards of collaboration and quality.",
      icon: "🌐",
    },
    {
      title: "Unmatched Expertise",
      description:
        "Our network consists of carefully curated world-class specialists in AI & Data, ensuring clients access to the finest talent available globally.",
      icon: "🎯",
    },
    {
      title: "Freedom & Flexibility",
      description:
        "We believe great work happens when people have the freedom to work where they thrive, fostering innovation and work-life balance for our consultants.",
      icon: "🕊️",
    },
    {
      title: "Global Impact",
      description:
        "By connecting the world's best AI & Data talent with businesses everywhere, we create transformative solutions that know no geographical boundaries.",
      icon: "🌍",
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
      title: "Venture Studio Creation Offer",
      description:
        "Launched our venture studio services, helping startups build their data and AI foundations from the ground up.",
    },
    {
      year: "2022",
      title: "Major Data Strategy & AI Consulting Contracts",
      description:
        "Secured major contracts for Data Strategy and AI consulting with European startups and retail companies with worldwide reach.",
    },
    {
      year: "2023",
      title: "Generative AI Consulting Offer",
      description:
        "Expanded into Generative AI consulting, becoming early adopters of cutting-edge AI technologies and LLM solutions.",
    },
    {
      year: "2025",
      title: "Remote-First Global Network of AI & Data Experts",
      description:
        "Transformed into a remote-first organization, creating an unmatched network of world-class AI & Data experts working from across the globe, delivering exceptional value to clients worldwide.",
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
              Creating the Unmatched Network of World-Class AI & Data Experts
              with Remote-First Excellence
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
                To create the unmatched network of world-class experts in AI &
                Data, with a remote work first culture that empowers our
                consultants to deliver exceptional value from anywhere in the
                world.
              </p>
              <p className="text-lg text-slate-600">
                We connect businesses with the finest AI and Data specialists
                globally, while giving our experts the freedom to work from
                where they thrive. This unique approach ensures our clients
                receive unmatched expertise while our consultants enjoy ultimate
                flexibility and work-life balance.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Our Vision
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                To become the world&apos;s premier network of AI & Data experts,
                setting the gold standard for remote-first consulting
                excellence. We envision a future where talent knows no
                boundaries and expertise flows freely across continents.
              </p>
              <p className="text-lg text-slate-600">
                Our vision is a world where the best minds in AI and Data
                collaborate seamlessly across time zones, delivering
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
              Why Everyone Wins With Elitizon
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our remote-first approach creates exceptional value for both our
              expert consultants and our clients
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* For Consultants */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
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
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  For Expert Consultants
                </h3>
                <p className="text-slate-600">
                  Join the world&apos;s premier network of AI & Data specialists
                </p>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <span className="text-slate-700">
                    Work from anywhere in the world with complete flexibility
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

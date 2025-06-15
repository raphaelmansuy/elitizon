export default function About() {
  return (
    <section className="py-24 bg-gradient-to-b from-neutral-100 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-32 w-64 h-64 bg-secondary-200 rounded-full opacity-25 animate-float"></div>
        <div
          className="absolute bottom-1/4 -left-32 w-64 h-64 bg-primary-200 rounded-full opacity-25 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-primary-900 mb-8 leading-tight">
            World-Class AI & Data Experts
            <span className="block bg-gradient-to-r from-secondary-600 to-secondary-500 bg-clip-text text-transparent mt-2">
              Remote-First Excellence
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-primary-800 max-w-5xl mx-auto leading-relaxed font-medium">
            Elitizon Ltd connects businesses with the world&apos;s finest AI & Data specialists 
            through our unmatched network of remote-first experts, delivering exceptional results 
            with complete flexibility and freedom.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Main Content */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-primary-900 mb-6">
                Our Remote-First Approach
              </h3>
              <p className="text-lg text-primary-700 mb-6 leading-relaxed">
                Our network of world-class AI & Data experts operates with complete flexibility, 
                working from anywhere in the world to deliver exceptional results. This remote-first 
                culture enables us to access the finest talent globally while providing our clients 
                with unmatched expertise and innovative solutions.
              </p>

              {/* Location Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="text-center p-6 bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl border border-secondary-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="text-4xl mb-4">🌍</div>
                  <div className="text-lg font-bold text-primary-900 mb-2">
                    Remote-First Network
                  </div>
                  <div className="text-sm text-primary-600">
                    World-class experts working globally
                  </div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl border border-primary-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="text-4xl mb-4">🎯</div>
                  <div className="text-lg font-bold text-primary-900 mb-2">
                    AI & Data Specialists
                  </div>
                  <div className="text-sm text-primary-600">
                    50+ World-class Experts Globally
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="space-y-8">
            {/* Our Approach */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-secondary-600 to-secondary-500 rounded-lg flex items-center justify-center mr-4">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-primary-900">
                  Our Approach
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-secondary-600 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <span className="text-primary-700 text-lg leading-relaxed">
                    Remote-first collaboration with global talent and local insights
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-secondary-600 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <span className="text-primary-700 text-lg leading-relaxed">
                    Flexible engagement models with autonomous expert teams
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-secondary-600 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <span className="text-primary-700 text-lg leading-relaxed">
                    Knowledge transfer and capability building
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-secondary-600 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <span className="text-primary-700 text-lg leading-relaxed">
                    Long-term partnerships beyond project delivery
                  </span>
                </li>
              </ul>
            </div>

            {/* Why Choose Elitizon Ltd */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-700 to-primary-600 rounded-lg flex items-center justify-center mr-4">
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-primary-900">
                  Why Choose Elitizon Ltd
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary-700 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <span className="text-primary-700 text-lg leading-relaxed">
                    Access to unmatched AI & Data expertise worldwide
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary-700 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <span className="text-primary-700 text-lg leading-relaxed">
                    Remote-first culture delivering faster, more innovative results
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary-700 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <span className="text-primary-700 text-lg leading-relaxed">
                    Proven track record across multiple industries and regions
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary-700 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <span className="text-primary-700 text-lg leading-relaxed">
                    Flexible, scalable solutions that adapt to your business needs
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

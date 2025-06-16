import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-700 to-slate-800 text-white pt-20 relative overflow-hidden">
      {/* Background particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-15">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="text-center">
          {/* Brand Logo/Name */}
    
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Transform Your Business with
            <span className="block bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent mt-2">
              Expert Data & AI Solutions
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-4xl mx-auto font-light leading-relaxed">
            Access world-class AI & Data experts who deliver{" "}
            <strong className="text-white">measurable ROI</strong> while working
            seamlessly with your team. Our remote-first consultants combine
            cutting-edge technology with proven business impact—
            <span className="bg-gradient-to-r from-pink-400 to-pink-300 bg-clip-text text-transparent font-semibold">
              {" "}
              no overhead, just results.
            </span>
          </p>

          {/* Enhanced Value Propositions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-5xl mx-auto">
            <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-pink-400 mb-1">50%</div>
              <div className="text-sm text-white/90">Faster Deployment</div>
            </div>
            <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-pink-400 mb-1">0</div>
              <div className="text-sm text-white/90">Setup Overhead</div>
            </div>
            <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-pink-400 mb-1">24/7</div>
              <div className="text-sm text-white/90">Global Coverage</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/contact"
              className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-pink-500/20 hover:shadow-pink-500/25"
            >
              Get Free Strategy Session
            </Link>
            <Link
              href="/careers"
              className="border-2 border-white/30 backdrop-blur-sm bg-white/10 hover:bg-white hover:text-slate-700 text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Join Our Network
            </Link>
          </div>

          {/* Quick link for services */}
          <div className="mt-8">
            <Link
              href="/services"
              className="inline-flex items-center text-white/80 hover:text-white transition-colors duration-300 text-sm font-medium"
            >
              <span>View all services</span>
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced Statistics cards with better value props */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl p-8 text-center transition-all duration-300 hover:bg-white/15 hover:scale-105 hover:shadow-xl group">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
              50+
            </div>
            <div className="text-white/90 font-medium text-lg">
              AI & Data Professionals
            </div>
            <div className="text-white/70 text-sm mt-2">
              Experienced consultants from top tech companies
            </div>
          </div>
          <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl p-8 text-center transition-all duration-300 hover:bg-white/15 hover:scale-105 hover:shadow-xl group">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
              200+
            </div>
            <div className="text-white/90 font-medium text-lg">
              Successful Transformations
            </div>
            <div className="text-white/70 text-sm mt-2">
              Across Fortune 500 & startups
            </div>
          </div>
          <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl p-8 text-center transition-all duration-300 hover:bg-white/15 hover:scale-105 hover:shadow-xl group">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
              15+
            </div>
            <div className="text-white/90 font-medium text-lg">
              Countries & Time Zones
            </div>
            <div className="text-white/70 text-sm mt-2">
              True global coverage
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

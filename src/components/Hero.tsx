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
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-light tracking-wider text-white/90 mb-2">
              Elitizon Ltd
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-pink-600 to-pink-400 mx-auto"></div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Transform Your Business with
            <span className="block bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent mt-2">
              Expert AI Solutions
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-4xl mx-auto font-light leading-relaxed">
            Elitizon Ltd delivers cutting-edge consulting in Data Engineering,
            Machine Learning, and Generative AI. Connecting world-class
            expertise with businesses globally through our international network
            of specialists.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/contact"
              className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-pink-500/20 hover:shadow-pink-500/25"
            >
              Start Your Project
            </Link>
            <Link
              href="/services"
              className="border-2 border-white/30 backdrop-blur-sm bg-white/10 hover:bg-white hover:text-slate-700 text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>

      {/* Statistics cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl p-8 text-center transition-all duration-300 hover:bg-white/15 hover:scale-105 hover:shadow-xl group">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
              50+
            </div>
            <div className="text-white/90 font-medium text-lg">
              Expert Consultants
            </div>
          </div>
          <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl p-8 text-center transition-all duration-300 hover:bg-white/15 hover:scale-105 hover:shadow-xl group">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
              100+
            </div>
            <div className="text-white/90 font-medium text-lg">
              Projects Delivered
            </div>
          </div>
          <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl p-8 text-center transition-all duration-300 hover:bg-white/15 hover:scale-105 hover:shadow-xl group">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
              25+
            </div>
            <div className="text-white/90 font-medium text-lg">
              Countries Served
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

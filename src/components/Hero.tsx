import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white pt-20 relative overflow-hidden">
      {/* Background particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow animation-delay-4000"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            Transform Your Business with
            <span className="block text-gradient-blue mt-2">
              Expert AI Solutions
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            ELITIZON delivers cutting-edge consulting in Data Engineering, Machine Learning, 
            and Generative AI. Based in Hong Kong with Europe&apos;s finest experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <Link 
              href="/contact" 
              className="bg-cyan-500 hover:bg-cyan-400 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 btn-hover-effect shadow-lg hover:shadow-2xl"
            >
              Start Your Project
            </Link>
            <Link 
              href="/services" 
              className="border-2 border-white hover:bg-white hover:text-blue-900 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 glass-effect hover:glass-effect-hover shadow-lg"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>
      
      {/* Floating cards showing key metrics */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-effect rounded-xl p-6 text-center card-hover animate-slide-in-right" style={{animationDelay: '0.6s'}}>
            <div className="text-3xl font-bold text-gradient-blue mb-2">50+</div>
            <div className="text-blue-100 font-medium">Expert Consultants</div>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center card-hover animate-slide-in-right" style={{animationDelay: '0.8s'}}>
            <div className="text-3xl font-bold text-gradient-blue mb-2">100+</div>
            <div className="text-blue-100 font-medium">Projects Delivered</div>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center card-hover animate-slide-in-right" style={{animationDelay: '1.0s'}}>
            <div className="text-3xl font-bold text-gradient-blue mb-2">15+</div>
            <div className="text-blue-100 font-medium">Countries Served</div>
          </div>
        </div>
      </div>
    </section>
  )
}

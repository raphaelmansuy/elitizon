import Link from "next/link";

export default function HeroSimple() {
  return (
    <section className="min-h-screen bg-primary-900 text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-light tracking-wider text-white/90 mb-2">
            Elitizon Ltd
          </h2>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Transform Your Business with
            <span className="block text-secondary-600 mt-2">
              Expert AI Solutions
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/80 max-w-4xl mx-auto font-light leading-relaxed">
            Elitizon Ltd delivers cutting-edge consulting in Data Engineering,
            Machine Learning, and Generative AI. Based in Hong Kong with
            Europe&apos;s finest experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="bg-secondary-600 hover:bg-secondary-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300"
            >
              Start Your Project
            </Link>
            <Link
              href="/services"
              className="border-2 border-white/20 bg-white/10 hover:bg-white hover:text-primary-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6 bg-gradient-to-r from-primary-700 to-secondary-600 bg-clip-text text-transparent">
              Bridging Hong Kong Innovation with European Excellence
            </h2>
            <p className="text-lg text-primary-600 mb-6 leading-relaxed">
              ELITIZON is strategically positioned in Hong Kong, one of Asia&apos;s leading financial and technology hubs, 
              while maintaining strong partnerships with Europe&apos;s most talented freelance experts.
            </p>
            <p className="text-lg text-primary-600 mb-8 leading-relaxed">
              This unique combination allows us to deliver world-class consulting services that blend Eastern business 
              acumen with Western technical innovation, providing our clients with unparalleled expertise in data 
              engineering, machine learning, and AI solutions.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-secondary-50 rounded-xl border border-secondary-100 hover:shadow-lg transition-all duration-300">
                <div className="text-3xl mb-3">🏙️</div>
                <div className="text-sm font-semibold text-primary-900 mb-1">Hong Kong Base</div>
                <div className="text-xs text-primary-600">Strategic Asian Hub</div>
              </div>
              <div className="text-center p-6 bg-primary-50 rounded-xl border border-primary-100 hover:shadow-lg transition-all duration-300">
                <div className="text-3xl mb-3">🌍</div>
                <div className="text-sm font-semibold text-primary-900 mb-1">European Network</div>
                <div className="text-xs text-primary-600">Top-tier Experts</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-secondary-50 to-secondary-100 p-6 rounded-xl border border-secondary-200">
              <h3 className="text-xl font-semibold text-primary-900 mb-3">Our Approach</h3>
              <ul className="space-y-2 text-primary-700">
                <li className="flex items-start">
                  <span className="text-secondary-600 mr-2">▶</span>
                  Client-centric solutions tailored to specific business needs
                </li>
                <li className="flex items-start">
                  <span className="text-secondary-600 mr-2">▶</span>
                  Agile methodology with rapid prototyping and iteration
                </li>
                <li className="flex items-start">
                  <span className="text-secondary-600 mr-2">▶</span>
                  Knowledge transfer and capability building
                </li>
                <li className="flex items-start">
                  <span className="text-secondary-600 mr-2">▶</span>
                  Long-term partnerships beyond project delivery
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-6 rounded-xl border border-primary-200">
              <h3 className="text-xl font-semibold text-primary-900 mb-3">Why Choose ELITIZON</h3>
              <ul className="space-y-2 text-primary-700">
                <li className="flex items-start">
                  <span className="text-secondary-600 mr-2">✓</span>
                  Access to Europe&apos;s finest technical talent
                </li>
                <li className="flex items-start">
                  <span className="text-secondary-600 mr-2">✓</span>
                  Deep understanding of Asian business culture
                </li>
                <li className="flex items-start">
                  <span className="text-secondary-600 mr-2">✓</span>
                  Proven track record across multiple industries
                </li>
                <li className="flex items-start">
                  <span className="text-secondary-600 mr-2">✓</span>
                  Cost-effective solutions without compromising quality
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

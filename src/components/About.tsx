export default function About() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Bridging Hong Kong Innovation with European Excellence
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              ELITIZON is strategically positioned in Hong Kong, one of Asia's leading financial and technology hubs, 
              while maintaining strong partnerships with Europe's most talented freelance experts.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              This unique combination allows us to deliver world-class consulting services that blend Eastern business 
              acumen with Western technical innovation, providing our clients with unparalleled expertise in data 
              engineering, machine learning, and AI solutions.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-900 mb-2">🏙️</div>
                <div className="text-sm font-semibold text-gray-900">Hong Kong Base</div>
                <div className="text-xs text-gray-600">Strategic Asian Hub</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-900 mb-2">🌍</div>
                <div className="text-sm font-semibold text-gray-900">European Network</div>
                <div className="text-xs text-gray-600">Top-tier Experts</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Approach</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">▶</span>
                  Client-centric solutions tailored to specific business needs
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">▶</span>
                  Agile methodology with rapid prototyping and iteration
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">▶</span>
                  Knowledge transfer and capability building
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">▶</span>
                  Long-term partnerships beyond project delivery
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Why Choose ELITIZON</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Access to Europe's finest technical talent
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Deep understanding of Asian business culture
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Proven track record across multiple industries
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
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

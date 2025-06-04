import Link from 'next/link'

export default function Services() {
  const services = [
    {
      title: "Data Engineering",
      description: "Build robust, scalable data pipelines and architectures that power your business intelligence and analytics.",
      features: [
        "Data Pipeline Architecture",
        "Real-time Data Processing",
        "Cloud Data Platforms",
        "Data Quality & Governance",
        "ETL/ELT Solutions"
      ],
      icon: "🏗️",
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "Machine Learning",
      description: "Deploy intelligent ML solutions that drive actionable insights and automate complex business processes.",
      features: [
        "Predictive Analytics",
        "Computer Vision",
        "Natural Language Processing",
        "Recommendation Systems",
        "MLOps & Model Deployment"
      ],
      icon: "🤖",
      color: "from-blue-500 to-cyan-600"
    },
    {
      title: "Generative AI & AI Agents",
      description: "Leverage cutting-edge AI agents and generative models to revolutionize your customer experience and operations.",
      features: [
        "Custom AI Agents",
        "LLM Integration",
        "Conversational AI",
        "Content Generation",
        "Process Automation"
      ],
      icon: "✨",
      color: "from-purple-500 to-pink-600"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 -left-40 w-80 h-80 bg-green-100 rounded-full opacity-20 animate-pulse-slow animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Consulting Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We specialize in three key areas that drive digital transformation and business growth
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-xl card-hover animate-fade-in-up border border-gray-100"
              style={{animationDelay: `${0.3 + index * 0.2}s`}}
            >
              <div className={`h-2 bg-gradient-to-r ${service.color} rounded-t-2xl`}></div>
              <div className="p-8">
                <div className="text-4xl mb-4 animate-pulse-slow">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-gradient">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200">
                      <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href="/contact" 
                  className={`inline-block bg-gradient-to-r ${service.color} text-white px-6 py-3 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 btn-hover-effect focus-outline`}
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16 animate-fade-in-up" style={{animationDelay: '1.2s'}}>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white glass-effect">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Our experts are ready to help you leverage the power of AI and data to drive growth and innovation.
            </p>
            <Link 
              href="/services" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 btn-hover-effect focus-outline"
            >
              View All Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

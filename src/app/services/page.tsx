import Link from 'next/link'

export default function ServicesPage() {
  const services = [
    {
      title: "Data Engineering",
      hero: "Build Robust Data Infrastructure",
      description: "Transform your raw data into actionable insights with our comprehensive data engineering solutions. We design and implement scalable data pipelines, modern data architectures, and robust data governance frameworks.",
      detailedFeatures: [
        {
          name: "Data Pipeline Architecture",
          description: "Design and build scalable ETL/ELT pipelines using modern tools like Apache Airflow, dbt, and cloud-native services."
        },
        {
          name: "Real-time Data Processing",
          description: "Implement streaming data solutions using Apache Kafka, Apache Spark, and cloud streaming services."
        },
        {
          name: "Cloud Data Platforms",
          description: "Migrate and optimize your data infrastructure on AWS, Azure, or Google Cloud Platform."
        },
        {
          name: "Data Quality & Governance",
          description: "Establish data quality monitoring, lineage tracking, and governance frameworks for reliable data."
        },
        {
          name: "Data Warehouse & Lake Design",
          description: "Build modern data warehouses and data lakes optimized for analytics and machine learning."
        }
      ],
      technologies: ["Apache Airflow", "dbt", "Apache Spark", "Kafka", "Snowflake", "BigQuery", "Redshift", "Python", "SQL"],
      icon: "🏗️",
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "Machine Learning",
      hero: "Unlock the Power of Intelligent Automation",
      description: "Deploy cutting-edge machine learning solutions that drive business value. From predictive analytics to computer vision, we help you harness the power of AI to automate processes and gain competitive advantages.",
      detailedFeatures: [
        {
          name: "Predictive Analytics",
          description: "Build models to forecast trends, predict customer behavior, and optimize business operations."
        },
        {
          name: "Computer Vision",
          description: "Develop image and video analysis solutions for quality control, security, and automation."
        },
        {
          name: "Natural Language Processing",
          description: "Create intelligent text analysis, sentiment analysis, and document processing systems."
        },
        {
          name: "Recommendation Systems",
          description: "Build personalized recommendation engines to improve customer experience and increase sales."
        },
        {
          name: "MLOps & Model Deployment",
          description: "Implement robust ML pipelines with automated training, testing, and deployment processes."
        }
      ],
      technologies: ["TensorFlow", "PyTorch", "Scikit-learn", "MLflow", "Kubeflow", "Docker", "Kubernetes", "Python", "R"],
      icon: "🤖",
      color: "from-blue-500 to-cyan-600"
    },
    {
      title: "Generative AI & AI Agents",
      hero: "Shape the Future with Intelligent Agents",
      description: "Leverage the latest advancements in generative AI and autonomous agents to revolutionize your business processes. From custom chatbots to intelligent automation, we help you implement cutting-edge AI solutions.",
      detailedFeatures: [
        {
          name: "Custom AI Agents",
          description: "Develop intelligent agents that can autonomously perform complex tasks and decision-making."
        },
        {
          name: "LLM Integration",
          description: "Integrate and fine-tune large language models for your specific business use cases."
        },
        {
          name: "Conversational AI",
          description: "Build sophisticated chatbots and virtual assistants for customer service and internal operations."
        },
        {
          name: "Content Generation",
          description: "Automate content creation for marketing, documentation, and creative applications."
        },
        {
          name: "Process Automation",
          description: "Implement AI-driven automation for complex business workflows and decision processes."
        }
      ],
      technologies: ["OpenAI GPT", "Anthropic Claude", "LangChain", "Hugging Face", "Pinecone", "Chroma", "FastAPI", "Streamlit"],
      icon: "✨",
      color: "from-purple-500 to-pink-600"
    }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Consulting Services
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto">
              Expert solutions in Data Engineering, Machine Learning, and Generative AI 
              that drive innovation and business growth
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div key={index} className={`${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} lg:flex lg:items-center lg:gap-16`}>
                <div className="lg:w-1/2 mb-12 lg:mb-0">
                  <div className="text-6xl mb-6">{service.icon}</div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h2>
                  <h3 className="text-xl text-blue-600 mb-6">{service.hero}</h3>
                  <p className="text-lg text-gray-600 mb-8">{service.description}</p>
                  
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Technologies We Use:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link 
                    href="/contact" 
                    className={`inline-block bg-gradient-to-r ${service.color} text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                  >
                    Get Started
                  </Link>
                </div>
                
                <div className="lg:w-1/2">
                  <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h4 className="text-2xl font-bold text-gray-900 mb-6">What We Deliver</h4>
                    <div className="space-y-6">
                      {service.detailedFeatures.map((feature, idx) => (
                        <div key={idx} className="border-l-4 border-blue-500 pl-6">
                          <h5 className="font-semibold text-gray-900 mb-2">{feature.name}</h5>
                          <p className="text-gray-600">{feature.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's discuss how our expertise can help you achieve your goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Your Project
            </Link>
            <Link 
              href="/about" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

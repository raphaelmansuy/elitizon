import type { Metadata } from "next";
import Link from "next/link";
import { serviceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title:
    "AI Agent Factory & Deployed Engineers | The Dual Engine Model - ELITIZON",
  description:
    "Stop paying for advice. Start buying capacity. Our Dual Engine Model: AI Agent Factory delivers 80% automation, Deployed Engineers handle 20% implementation. Results in days.",
  keywords:
    "AI Agent Factory, Deployed Engineers, Dual Engine Model, AI Agent Development, RAG Pipelines, Vector Databases, LangChain, AI Implementation, AI Automation, Enterprise AI Agents",
  openGraph: {
    title: "AI Agent Factory & Deployed Engineers | ELITIZON",
    description:
      "The Dual Engine Model: AI Agents + Deployed Engineers. 80% automation, 20% expert implementation. Deploy working AI solutions in days, not months.",
    url: "https://elitizon.com/services",
    siteName: "ELITIZON",
    images: [
      {
        url: "https://elitizon.com/og-services.jpg",
        width: 1200,
        height: 630,
        alt: "ELITIZON AI & Data Engineering Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI & Data Engineering Services | ELITIZON",
    description:
      "Expert AI consulting services: Data Engineering, Machine Learning, and Generative AI solutions. Transform your business with our remote-first global team.",
    images: ["https://elitizon.com/og-services.jpg"],
  },
  alternates: {
    canonical: "https://elitizon.com/services",
  },
};

export default function ServicesPage() {
  const services = [
    {
      title: "Data Engineering",
      hero: "Build Robust Data Infrastructure",
      description:
        "Transform your raw data into actionable insights with our comprehensive data engineering solutions. We design and implement scalable data pipelines, modern data architectures, and robust data governance frameworks.",
      detailedFeatures: [
        {
          name: "Data Pipeline Architecture",
          description:
            "Design and build scalable ETL/ELT pipelines using modern tools like Apache Airflow, dbt, and cloud-native services.",
        },
        {
          name: "Real-time Data Processing",
          description:
            "Implement streaming data solutions using Apache Kafka, Apache Spark, and cloud streaming services.",
        },
        {
          name: "Cloud Data Platforms",
          description:
            "Migrate and optimize your data infrastructure on AWS, Azure, or Google Cloud Platform.",
        },
        {
          name: "Data Quality & Governance",
          description:
            "Establish data quality monitoring, lineage tracking, and governance frameworks for reliable data.",
        },
        {
          name: "Data Warehouse & Lake Design",
          description:
            "Build modern data warehouses and data lakes optimized for analytics and machine learning.",
        },
      ],
      technologies: [
        "Apache Airflow",
        "dbt",
        "Apache Spark",
        "Kafka",
        "Snowflake",
        "BigQuery",
        "Redshift",
        "Python",
        "SQL",
      ],
      icon: "🏗️",
      color: "from-pink-500 to-pink-600",
      borderColor: "border-pink-500",
      heroColor: "text-pink-600",
    },
    {
      title: "Machine Learning",
      hero: "Unlock the Power of Intelligent Automation",
      description:
        "Deploy cutting-edge machine learning solutions that drive business value. From predictive analytics to computer vision, we help you harness the power of AI to automate processes and gain competitive advantages.",
      detailedFeatures: [
        {
          name: "Predictive Analytics",
          description:
            "Build models to forecast trends, predict customer behavior, and optimize business operations.",
        },
        {
          name: "Computer Vision",
          description:
            "Develop image and video analysis solutions for quality control, security, and automation.",
        },
        {
          name: "Natural Language Processing",
          description:
            "Create intelligent text analysis, sentiment analysis, and document processing systems.",
        },
        {
          name: "Recommendation Systems",
          description:
            "Build personalized recommendation engines to improve customer experience and increase sales.",
        },
        {
          name: "MLOps & Model Deployment",
          description:
            "Implement robust ML pipelines with automated training, testing, and deployment processes.",
        },
      ],
      technologies: [
        "TensorFlow",
        "PyTorch",
        "Scikit-learn",
        "MLflow",
        "Kubeflow",
        "Docker",
        "Kubernetes",
        "Python",
        "R",
      ],
      icon: "🤖",
      color: "from-purple-500 to-purple-600",
      borderColor: "border-purple-500",
      heroColor: "text-purple-600",
    },
    {
      title: "Generative AI & AI Agents",
      hero: "Shape the Future with Intelligent Agents",
      description:
        "Leverage the latest advancements in generative AI and autonomous agents to revolutionize your business processes. From custom chatbots to intelligent automation, we help you implement cutting-edge AI solutions.",
      detailedFeatures: [
        {
          name: "Custom AI Agents",
          description:
            "Develop intelligent agents that can autonomously perform complex tasks and decision-making.",
        },
        {
          name: "LLM Integration",
          description:
            "Integrate and fine-tune large language models for your specific business use cases.",
        },
        {
          name: "Conversational AI",
          description:
            "Build sophisticated chatbots and virtual assistants for customer service and internal operations.",
        },
        {
          name: "Content Generation",
          description:
            "Automate content creation for marketing, documentation, and creative applications.",
        },
        {
          name: "Process Automation",
          description:
            "Implement AI-driven automation for complex business workflows and decision processes.",
        },
      ],
      technologies: [
        "OpenAI GPT",
        "Anthropic Claude",
        "LangChain",
        "Hugging Face",
        "Pinecone",
        "Chroma",
        "FastAPI",
        "Streamlit",
      ],
      icon: "✨",
      color: "from-emerald-500 to-emerald-600",
      borderColor: "border-emerald-500",
      heroColor: "text-emerald-600",
    },
    {
      title: "AI-Powered Startup Studio",
      hero: "Build the Next Generation of AI-First Products",
      description:
        "Launch AI-native startups that leverage generative AI and intelligent automation from day one. We help you build market-disrupting products powered by cutting-edge AI technology, combining deep technical expertise with proven startup methodologies.",
      detailedFeatures: [
        {
          name: "AI Product Ideation & Validation",
          description:
            "Discover AI-driven business opportunities using generative AI for market research, competitor analysis, and customer insight generation. Validate concepts with AI-powered prototypes and data-driven market testing.",
        },
        {
          name: "AI-Native MVP Development",
          description:
            "Build intelligent MVPs that integrate LLMs, AI agents, and automation from the ground up. Create products that learn, adapt, and improve user experience through AI capabilities.",
        },
        {
          name: "Generative AI Integration Strategy",
          description:
            "Develop comprehensive AI integration strategies including custom LLM fine-tuning, AI agent architectures, and intelligent automation workflows tailored to your business model.",
        },
        {
          name: "Scalable AI Infrastructure",
          description:
            "Design cloud-native AI architectures that can handle growing AI workloads, implement vector databases, and optimize for AI model performance and cost efficiency.",
        },
        {
          name: "AI-Driven Go-to-Market",
          description:
            "Launch with AI-powered marketing automation, intelligent customer acquisition, personalized user experiences, and data-driven growth strategies.",
        },
      ],
      technologies: [
        "OpenAI GPT",
        "Anthropic Claude",
        "LangChain",
        "Pinecone",
        "Chroma",
        "FastAPI",
        "React",
        "Next.js",
        "Python",
        "AWS",
        "Docker",
        "TypeScript",
      ],
      icon: "🚀",
      color: "from-blue-500 to-blue-600",
      borderColor: "border-blue-500",
      heroColor: "text-blue-600",
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-700 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              The Dual Engine Model
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto">
              <strong>Engine A:</strong> AI Agent Factory delivers 80% of the
              work. <strong>Engine B:</strong> Deployed Engineers handle the
              20%.
              <span className="block mt-2 text-pink-300">
                Working AI Agents in days—not strategy decks in months.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div
                key={index}
                className={`${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                } lg:flex lg:items-center lg:gap-16`}
              >
                <div className="lg:w-1/2 mb-12 lg:mb-0">
                  <div className="text-6xl mb-6">{service.icon}</div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    {service.title}
                  </h2>
                  <h3 className={`text-xl ${service.heroColor} mb-6`}>
                    {service.hero}
                  </h3>
                  <p className="text-lg text-slate-600 mb-8">
                    {service.description}
                  </p>

                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-slate-900 mb-4">
                      Technologies We Use:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                        >
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
                    <h4 className="text-2xl font-bold text-slate-900 mb-6">
                      What We Deliver
                    </h4>
                    <div className="space-y-6">
                      {service.detailedFeatures.map((feature, idx) => (
                        <div
                          key={idx}
                          className={`border-l-4 ${service.borderColor} pl-6`}
                        >
                          <h5 className="font-semibold text-slate-900 mb-2">
                            {feature.name}
                          </h5>
                          <p className="text-slate-600">
                            {feature.description}
                          </p>
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
      <section className="bg-gradient-to-r from-slate-600 to-slate-700 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Stop Paying for Advice. Start Buying Capacity.
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Deploy working AI Agents in days. Our Deployed Engineers wire them
            into your systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
            >
              Build Your AI Agent
            </Link>
            <Link
              href="/careers"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-slate-700 transition-colors"
            >
              Join Our Expert Grid
            </Link>
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
    </div>
  );
}

import React from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is AI consulting and how does it work?",
    answer:
      "AI consulting is a professional service that helps organizations implement artificial intelligence solutions to improve business operations, increase efficiency, and drive innovation. It includes AI strategy development, technology selection, solution architecture, implementation planning, and ongoing support. ELITIZON provides end-to-end AI consulting with a focus on Data Engineering, Machine Learning, and Generative AI technologies delivered through a remote-first model.",
  },
  {
    question: "How does remote AI consulting work and what are the benefits?",
    answer:
      "Remote AI consulting leverages digital collaboration tools, cloud-based platforms, and virtual project management to deliver expert AI services without geographical limitations. Benefits include access to global talent, reduced costs (typically 30-50% less than traditional consulting), faster project delivery, and 24/7 coverage across time zones. ELITIZON's remote-first approach has successfully delivered 300+ projects worldwide with measurable ROI for clients.",
  },
  {
    question: "What ROI can I expect from AI consulting services?",
    answer:
      "Organizations typically see 15-30% efficiency improvements within 6-12 months of AI implementation, with potential cost savings of $100K-$1M+ annually depending on project scope and industry. Specific ROI varies based on use case, implementation quality, and organizational readiness. ELITIZON clients have reported average ROI of 300-500% within the first year through improved operational efficiency, automated processes, and data-driven decision making.",
  },
  {
    question: "What industries and company sizes does ELITIZON serve?",
    answer:
      "ELITIZON serves companies ranging from startups to Fortune 500 enterprises across multiple industries including financial services, healthcare, retail, manufacturing, technology, and telecommunications. Our remote-first model allows us to work with clients globally, providing specialized AI consulting regardless of geographic location. We have experience with companies from 50 employees to 50,000+ employees.",
  },
  {
    question: "What specific AI services does ELITIZON provide?",
    answer:
      "ELITIZON provides comprehensive AI services including: (1) Data Engineering - building scalable data pipelines, real-time processing, and cloud data architecture; (2) Machine Learning Consulting - predictive analytics, computer vision, NLP, and MLOps implementation; (3) Generative AI Development - custom AI agents, LLM integration, conversational AI, and intelligent automation; (4) AI Strategy Consulting - digital transformation planning, technology roadmaps, and implementation guidance.",
  },
  {
    question:
      "How much does AI consulting cost and what factors affect pricing?",
    answer:
      "AI consulting costs vary based on project complexity, duration, and scope. Typical ranges are: Strategic consulting ($5K-$25K for 4-8 week engagements), Implementation projects ($25K-$250K for 3-12 month projects), and Ongoing support ($5K-$15K monthly). Factors affecting pricing include technology complexity, data volume, integration requirements, team size, and timeline. ELITIZON offers competitive pricing with transparent cost structures and flexible engagement models.",
  },
];

const AIOptimizedFAQ: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50" id="faq">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions About AI Consulting
            </h2>
            <p className="text-lg text-gray-600">
              Get answers to common questions about our AI consulting services,
              pricing, and approach to digital transformation.
            </p>
          </div>

          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-primary-600 text-white rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">
                Have More Questions?
              </h3>
              <p className="mb-4">
                Get personalized answers from our AI consulting experts
              </p>
              <a
                href="/contact"
                className="inline-block bg-white text-primary-600 px-6 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                Contact Our Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIOptimizedFAQ;

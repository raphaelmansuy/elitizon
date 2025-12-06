"use client";

import MermaidDiagram from "@/components/MermaidDiagram";

export default function FactoryProcess() {
  const chart = `
    graph LR
      A[📥 Raw Data] -->|Ingest| B[(🗄️ Vector DB)]
      B -->|RAG| C{🤖 AI Agent Core}
      C -->|Tool Use| D[🔗 API Integrations]
      D -->|Action| E[✅ Automated Outcome]
      F[👨‍💻 Deployed Engineer] -->|Oversight| C
      F -->|Architecture| B
      style C fill:#f472b6,stroke:#be185d,stroke-width:4px,color:#fff
      style F fill:#1e293b,stroke:#475569,color:#fff
      style E fill:#22c55e,stroke:#15803d,color:#fff
      style A fill:#3b82f6,stroke:#1d4ed8,color:#fff
      style B fill:#8b5cf6,stroke:#6d28d9,color:#fff
      style D fill:#f59e0b,stroke:#d97706,color:#fff
  `;

  return (
    <section
      className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
      aria-labelledby="factory-process-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 -right-32 w-64 h-64 bg-pink-100 rounded-full opacity-30"></div>
        <div className="absolute bottom-1/3 -left-32 w-64 h-64 bg-blue-100 rounded-full opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <header className="text-center mb-16">
          <h2
            id="factory-process-heading"
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            Inside the AI Factory
          </h2>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
            We treat AI deployment like a{" "}
            <strong className="text-slate-900">manufacturing line</strong>—not a
            research project. Standardized. Scalable. Robust.
          </p>
        </header>

        {/* Mermaid Diagram */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-xl bg-white mb-16">
          <div className="p-8">
            <MermaidDiagram>{chart}</MermaidDiagram>
          </div>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📥</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              1. Data Ingestion
            </h3>
            <p className="text-slate-700">
              We connect to your data sources, APIs, and knowledge bases. Your
              proprietary data becomes the fuel for intelligent agents.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🗄️</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              2. Vector Database
            </h3>
            <p className="text-slate-700">
              Enterprise-grade vector storage with semantic search. RAG
              pipelines ensure accurate, hallucination-free responses.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              3. AI Agent Core
            </h3>
            <p className="text-slate-700">
              Custom agents with tool use capabilities. LangChain, OpenAI
              Assistants, or custom agentic workflows—whatever fits your needs.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🔗</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              4. API Integration
            </h3>
            <p className="text-slate-700">
              Agents connect to your existing systems—CRM, ERP, databases,
              third-party APIs. Seamless integration, zero disruption.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">✅</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              5. Automated Outcome
            </h3>
            <p className="text-slate-700">
              Working AI that delivers results. Not PowerPoint slides—actual
              automation that saves time and money from Day 1.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">👨‍💻</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              6. Human Oversight
            </h3>
            <p className="text-slate-700">
              Deployed Engineers provide strategic governance, handle edge
              cases, and ensure your AI agents stay aligned with business goals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

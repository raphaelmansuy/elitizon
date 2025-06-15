export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ELITIZON Ltd",
  alternateName: "ELITIZON",
  description:
    "Global AI consulting company specializing in Data Engineering, Machine Learning, and Generative AI solutions. Remote-first consulting with world-class experts delivering measurable ROI worldwide.",
  url: "https://elitizon.com",
  logo: "https://elitizon.com/logo.png",
  image: "https://elitizon.com/og-image.jpg",
  foundingDate: "2020",
  founders: [
    {
      "@type": "Person",
      name: "Raphaël MANSUY",
      jobTitle: "Chief Technology Officer",
      url: "https://www.linkedin.com/in/raphaelmansuy/",
    },
    {
      "@type": "Person",
      name: "Jane LEUNG",
      jobTitle: "Chief Executive Officer",
      url: "https://www.linkedin.com/in/jane-leung-264087b7/",
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "HK",
    addressRegion: "Hong Kong",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+852-XXXX-XXXX",
    contactType: "customer service",
    availableLanguage: ["English", "French", "Chinese"],
  },
  sameAs: [
    "https://x.com/ElitizonLtd",
    "https://linkedin.com/company/elitizon",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Data Engineering",
    "Generative AI",
    "AI Agents",
    "Data Architecture",
    "MLOps",
    "Business Intelligence",
  ],
  serviceType: [
    "AI Consulting",
    "Data Engineering",
    "Machine Learning Consulting",
    "Generative AI Development",
    "AI Agent Development",
    "Data Strategy Consulting",
  ],
  areaServed: "Worldwide",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI & Data Consulting Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Data Engineering",
          description:
            "Comprehensive data engineering solutions including pipeline architecture, real-time processing, and cloud platforms",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Machine Learning Consulting",
          description:
            "End-to-end ML solutions including predictive analytics, computer vision, NLP, and MLOps",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Generative AI & AI Agents",
          description:
            "Custom AI agents, LLM integration, conversational AI, and process automation solutions",
        },
      },
    ],
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ELITIZON",
  url: "https://elitizon.com",
  description:
    "Global AI consulting company specializing in Data Engineering, Machine Learning, and Generative AI solutions.",
  inLanguage: "en-US",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://elitizon.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
  publisher: {
    "@id": "https://elitizon.com#organization",
  },
};

export const breadcrumbSchema = (
  items: Array<{ name: string; url: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "ELITIZON AI & Data Engineering Services",
  description:
    "Expert AI consulting services including Data Engineering, Machine Learning, and Generative AI solutions for global enterprises.",
  provider: {
    "@type": "Organization",
    name: "ELITIZON Ltd",
    url: "https://elitizon.com",
  },
  areaServed: "Worldwide",
  serviceType: [
    "AI Consulting",
    "Data Engineering",
    "Machine Learning Consulting",
    "Generative AI Development",
    "AI Agent Development",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI & Data Services Catalog",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Data Engineering",
          description:
            "Build robust data infrastructure with scalable pipelines, real-time processing, and cloud platforms",
          serviceType: "Data Engineering",
        },
        areaServed: "Worldwide",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Machine Learning Consulting",
          description:
            "End-to-end ML solutions including predictive analytics, computer vision, NLP, and MLOps",
          serviceType: "Machine Learning",
        },
        areaServed: "Worldwide",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Generative AI & AI Agents",
          description:
            "Custom AI agents, LLM integration, conversational AI, and intelligent automation",
          serviceType: "Generative AI",
        },
        areaServed: "Worldwide",
      },
    ],
  },
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What AI consulting services does ELITIZON provide?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ELITIZON provides comprehensive AI consulting services including Data Engineering, Machine Learning, Generative AI development, AI agent creation, MLOps, and data strategy consulting for global enterprises.",
      },
    },
    {
      "@type": "Question",
      name: "Does ELITIZON work with remote teams globally?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, ELITIZON operates on a remote-first model with expert consultants across Europe, Asia, North America and other regions. We provide 24/7 coverage and seamless collaboration regardless of location.",
      },
    },
    {
      "@type": "Question",
      name: "What industries does ELITIZON serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ELITIZON serves enterprises across all industries including financial services, healthcare, retail, manufacturing, technology, and startups. Our AI solutions are customized for each sector's specific needs.",
      },
    },
    {
      "@type": "Question",
      name: "How quickly can ELITIZON start an AI project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ELITIZON can typically start AI consulting projects within 1-2 weeks due to our remote-first model and global network of immediately available experts, ensuring 50% faster deployment than traditional consulting firms.",
      },
    },
  ],
};

export const teamSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Raphaël MANSUY",
    jobTitle: "Chief Technology Officer",
    worksFor: {
      "@type": "Organization",
      name: "ELITIZON Ltd",
      url: "https://elitizon.com",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hong Kong",
      addressCountry: "HK",
    },
    url: "https://elitizon.com/team",
    sameAs: ["https://www.linkedin.com/in/raphaelmansuy/"],
    knowsAbout: [
      "Technical Leadership",
      "AI & Data Engineering",
      "Technical Architecture",
      "System Design",
      "Artificial Intelligence",
      "Machine Learning",
    ],
    description:
      "Experienced technology leader with expertise in AI, data engineering, and digital transformation. Passionate about building innovative solutions and leading high-performing teams.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jane LEUNG",
    jobTitle: "Chief Executive Officer",
    worksFor: {
      "@type": "Organization",
      name: "ELITIZON Ltd",
      url: "https://elitizon.com",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hong Kong",
      addressCountry: "HK",
    },
    url: "https://elitizon.com/team",
    sameAs: ["https://www.linkedin.com/in/jane-leung-264087b7/"],
    knowsAbout: [
      "Strategic Leadership",
      "Business Development",
      "AI Strategy",
      "Digital Transformation",
    ],
    description:
      "Visionary leader with extensive experience in scaling technology companies and driving digital transformation across Asia-Pacific markets.",
  },
];

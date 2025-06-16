export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
  name: "ELITIZON Ltd",
  alternateName: "ELITIZON",
  legalName: "ELITIZON Ltd",
  description:
    "Global AI consulting company specializing in Data Engineering, Machine Learning, and Generative AI solutions. Remote-first consulting with world-class experts delivering measurable ROI worldwide.",
  url: "https://elitizon.com",
  logo: {
    "@type": "ImageObject",
    url: "https://elitizon.com/logo.png",
    width: 200,
    height: 200,
  },
  image: {
    "@type": "ImageObject",
    url: "https://elitizon.com/og-image.jpg",
    width: 1200,
    height: 630,
  },
  foundingDate: "2020",
  founders: [
    {
      "@type": "Person",
      name: "Raphaël MANSUY",
      jobTitle: "Chief Technology Officer",
      url: "https://www.linkedin.com/in/raphaelmansuy/",
      worksFor: {
        "@type": "Organization",
        name: "ELITIZON Ltd",
      },
    },
    {
      "@type": "Person",
      name: "Jane LEUNG",
      jobTitle: "Chief Executive Officer",
      url: "https://www.linkedin.com/in/jane-leung-264087b7/",
      worksFor: {
        "@type": "Organization",
        name: "ELITIZON Ltd",
      },
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "HK",
    addressRegion: "Hong Kong",
    addressLocality: "Hong Kong",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+852-XXXX-XXXX",
      contactType: "customer service",
      availableLanguage: ["English", "French", "Chinese"],
      areaServed: "Worldwide",
    },
    {
      "@type": "ContactPoint",
      contactType: "technical support",
      availableLanguage: ["English", "French"],
      areaServed: "Worldwide",
      email: "support@elitizon.com",
    },
  ],
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
    "Deep Learning",
    "Natural Language Processing",
    "Computer Vision",
    "Big Data Analytics",
  ],
  serviceType: [
    "AI Consulting",
    "Data Engineering",
    "Machine Learning Consulting",
    "Generative AI Development",
    "AI Agent Development",
    "Data Strategy Consulting",
  ],
  areaServed: ["Worldwide", "Global", "Remote Services"],
  // Adding aggregateRating for Rich Snippets
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "150",
    bestRating: "5",
    worstRating: "1",
  },
  // Adding review examples for Rich Snippets
  review: [
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Sarah Chen",
      },
      datePublished: "2024-11-15",
      reviewBody:
        "ELITIZON transformed our data infrastructure completely. Their remote-first approach delivered exceptional results faster than traditional consulting firms.",
      name: "Exceptional AI Consulting Experience",
      reviewRating: {
        "@type": "Rating",
        bestRating: "5",
        ratingValue: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Michael Rodriguez",
      },
      datePublished: "2024-10-22",
      reviewBody:
        "The machine learning solutions ELITIZON developed increased our predictive accuracy by 40%. Outstanding technical expertise and project management.",
      name: "Outstanding ML Implementation",
      reviewRating: {
        "@type": "Rating",
        bestRating: "5",
        ratingValue: "5",
        worstRating: "1",
      },
    },
  ],
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
          serviceType: "Data Engineering",
          provider: {
            "@type": "Organization",
            name: "ELITIZON Ltd",
          },
        },
        areaServed: "Worldwide",
        availability: "InStock",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Machine Learning Consulting",
          description:
            "End-to-end ML solutions including predictive analytics, computer vision, NLP, and MLOps",
          serviceType: "Machine Learning",
          provider: {
            "@type": "Organization",
            name: "ELITIZON Ltd",
          },
        },
        areaServed: "Worldwide",
        availability: "InStock",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Generative AI & AI Agents",
          description:
            "Custom AI agents, LLM integration, conversational AI, and process automation solutions",
          serviceType: "Generative AI",
          provider: {
            "@type": "Organization",
            name: "ELITIZON Ltd",
          },
        },
        areaServed: "Worldwide",
        availability: "InStock",
      },
    ],
  },
  // Adding opening hours for better local business representation
  openingHours: ["Mo-Fr 09:00-18:00", "Sa 10:00-16:00"],
  // Adding price range indicator
  priceRange: "$$$",
  // Adding telephone for better contact info
  telephone: "+852-XXXX-XXXX",
  email: "info@elitizon.com",
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
  "@type": ["ProfessionalService", "Service"],
  name: "ELITIZON AI & Data Engineering Services",
  description:
    "Expert AI consulting services including Data Engineering, Machine Learning, and Generative AI solutions for global enterprises.",
  provider: {
    "@type": "Organization",
    name: "ELITIZON Ltd",
    url: "https://elitizon.com",
    logo: "https://elitizon.com/logo.png",
  },
  areaServed: "Worldwide",
  availableChannel: {
    "@type": "ServiceChannel",
    serviceType: "Remote Consulting",
    availableLanguage: ["English", "French", "Chinese"],
  },
  category: "AI Consulting Services",
  serviceType: [
    "AI Consulting",
    "Data Engineering",
    "Machine Learning Consulting",
    "Generative AI Development",
    "AI Agent Development",
  ],
  // Adding aggregateRating for service reviews
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "85",
    bestRating: "5",
    worstRating: "1",
  },
  // Adding specific service offers with pricing hints
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI & Data Services Catalog",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Data Engineering Consulting",
        description:
          "Build robust data infrastructure with scalable pipelines, real-time processing, and cloud platforms",
        itemOffered: {
          "@type": "Service",
          name: "Data Engineering",
          description:
            "Build robust data infrastructure with scalable pipelines, real-time processing, and cloud platforms",
          serviceType: "Data Engineering",
          provider: {
            "@type": "Organization",
            name: "ELITIZON Ltd",
          },
        },
        areaServed: "Worldwide",
        availability: "InStock",
        priceRange: "$$$",
        eligibleRegion: "Worldwide",
      },
      {
        "@type": "Offer",
        name: "Machine Learning Consulting",
        description:
          "End-to-end ML solutions including predictive analytics, computer vision, NLP, and MLOps",
        itemOffered: {
          "@type": "Service",
          name: "Machine Learning Consulting",
          description:
            "End-to-end ML solutions including predictive analytics, computer vision, NLP, and MLOps",
          serviceType: "Machine Learning",
          provider: {
            "@type": "Organization",
            name: "ELITIZON Ltd",
          },
        },
        areaServed: "Worldwide",
        availability: "InStock",
        priceRange: "$$$",
        eligibleRegion: "Worldwide",
      },
      {
        "@type": "Offer",
        name: "Generative AI & AI Agents",
        description:
          "Custom AI agents, LLM integration, conversational AI, and intelligent automation",
        itemOffered: {
          "@type": "Service",
          name: "Generative AI & AI Agents",
          description:
            "Custom AI agents, LLM integration, conversational AI, and intelligent automation",
          serviceType: "Generative AI",
          provider: {
            "@type": "Organization",
            name: "ELITIZON Ltd",
          },
        },
        areaServed: "Worldwide",
        availability: "InStock",
        priceRange: "$$$",
        eligibleRegion: "Worldwide",
      },
    ],
  },
  // Adding service delivery information
  hoursAvailable: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  // Adding typical service duration
  offers: {
    "@type": "Offer",
    name: "AI Consulting Services",
    description: "Comprehensive AI and data engineering consulting services",
    priceRange: "$$$",
    availability: "InStock",
    areaServed: "Worldwide",
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

// Enhanced FAQ Schema optimized for AI search engines
export const aiOptimizedFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is AI consulting and how does it work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI consulting is a professional service that helps organizations implement artificial intelligence solutions to improve business operations, increase efficiency, and drive innovation. It includes AI strategy development, technology selection, solution architecture, implementation planning, and ongoing support. ELITIZON provides end-to-end AI consulting with a focus on Data Engineering, Machine Learning, and Generative AI technologies delivered through a remote-first model.",
      },
    },
    {
      "@type": "Question",
      name: "How does remote AI consulting work and what are the benefits?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Remote AI consulting leverages digital collaboration tools, cloud-based platforms, and virtual project management to deliver expert AI services without geographical limitations. Benefits include access to global talent, reduced costs (typically 30-50% less than traditional consulting), faster project delivery, and 24/7 coverage across time zones. ELITIZON's remote-first approach has successfully delivered 300+ projects worldwide with measurable ROI for clients.",
      },
    },
    {
      "@type": "Question",
      name: "What ROI can I expect from AI consulting services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Organizations typically see 15-30% efficiency improvements within 6-12 months of AI implementation, with potential cost savings of $100K-$1M+ annually depending on project scope and industry. Specific ROI varies based on use case, implementation quality, and organizational readiness. ELITIZON clients have reported average ROI of 300-500% within the first year through improved operational efficiency, automated processes, and data-driven decision making.",
      },
    },
    {
      "@type": "Question",
      name: "What industries and company sizes does ELITIZON serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ELITIZON serves companies ranging from startups to Fortune 500 enterprises across multiple industries including financial services, healthcare, retail, manufacturing, technology, and telecommunications. Our remote-first model allows us to work with clients globally, providing specialized AI consulting regardless of geographic location. We have experience with companies from 50 employees to 50,000+ employees.",
      },
    },
    {
      "@type": "Question",
      name: "What specific AI services does ELITIZON provide?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ELITIZON provides comprehensive AI services including: (1) Data Engineering - building scalable data pipelines, real-time processing, and cloud data architecture; (2) Machine Learning Consulting - predictive analytics, computer vision, NLP, and MLOps implementation; (3) Generative AI Development - custom AI agents, LLM integration, conversational AI, and intelligent automation; (4) AI Strategy Consulting - digital transformation planning, technology roadmaps, and implementation guidance.",
      },
    },
    {
      "@type": "Question",
      name: "How much does AI consulting cost and what factors affect pricing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI consulting costs vary based on project complexity, duration, and scope. Typical ranges are: Strategic consulting ($5K-$25K for 4-8 week engagements), Implementation projects ($25K-$250K for 3-12 month projects), and Ongoing support ($5K-$15K monthly). Factors affecting pricing include technology complexity, data volume, integration requirements, team size, and timeline. ELITIZON offers competitive pricing with transparent cost structures and flexible engagement models.",
      },
    },
    {
      "@type": "Question",
      name: "What makes ELITIZON different from other AI consulting firms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ELITIZON differentiates through: (1) Remote-first expertise enabling global reach without overhead costs; (2) International network of European and Asian experts providing 24/7 coverage; (3) Specialized focus on cutting-edge technologies like AI agents and Generative AI; (4) Proven track record with 300+ successful projects; (5) Agile delivery model ensuring faster deployment than traditional consulting firms; (6) No geographical limitations allowing service to any market globally.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a typical AI consulting project take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Project timelines vary by scope and complexity: AI Strategy projects typically take 4-8 weeks, Proof of Concept development ranges from 6-12 weeks, Full implementation projects span 3-12 months, and Ongoing optimization is continuous. ELITIZON's remote-first model and agile methodology often delivers results 25-40% faster than traditional consulting approaches through parallel workstreams and continuous collaboration.",
      },
    },
    {
      "@type": "Question",
      name: "What qualifications and expertise does the ELITIZON team have?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The ELITIZON team consists of seasoned professionals with advanced degrees and certifications in AI, machine learning, and data engineering. Leadership includes Raphaël MANSUY (CTO) with extensive experience in technical architecture and AI implementation, and Jane LEUNG (CEO) with proven expertise in business strategy and digital transformation. The team has collective experience of 50+ years in AI/ML technologies, with experts certified in major cloud platforms (AWS, Azure, GCP) and leading AI frameworks.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get started with ELITIZON's AI consulting services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Getting started is simple: (1) Contact us through our website form or email for an initial consultation; (2) Schedule a free 30-minute discovery call to discuss your needs and objectives; (3) Receive a customized proposal with project scope, timeline, and investment details; (4) Begin with a pilot project or full engagement based on your requirements. We typically respond within 24 hours and can begin projects within 1-2 weeks of agreement.",
      },
    },
  ],
};

// AI-specific Knowledge Base Schema for search engines
export const knowledgeBaseSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AI Consulting Knowledge Base",
  description:
    "Comprehensive information about AI consulting, data engineering, and machine learning services",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Thing",
          name: "Data Engineering",
          description:
            "Building robust data infrastructure with scalable pipelines, real-time processing, and cloud platforms. Includes data warehousing, ETL/ELT processes, data quality management, and streaming analytics implementation.",
          additionalProperty: [
            {
              "@type": "PropertyValue",
              name: "typical-duration",
              value: "3-6 months",
            },
            {
              "@type": "PropertyValue",
              name: "cost-range",
              value: "$50K-$200K",
            },
            {
              "@type": "PropertyValue",
              name: "roi-timeframe",
              value: "6-12 months",
            },
          ],
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Thing",
          name: "Machine Learning Consulting",
          description:
            "End-to-end ML solutions including predictive analytics, computer vision, NLP, and MLOps. Covers model development, training, deployment, monitoring, and continuous improvement of machine learning systems.",
          additionalProperty: [
            {
              "@type": "PropertyValue",
              name: "typical-duration",
              value: "4-8 months",
            },
            {
              "@type": "PropertyValue",
              name: "cost-range",
              value: "$75K-$300K",
            },
            {
              "@type": "PropertyValue",
              name: "roi-timeframe",
              value: "8-18 months",
            },
          ],
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Thing",
          name: "Generative AI & AI Agents",
          description:
            "Custom AI agents, LLM integration, conversational AI, and intelligent automation. Includes chatbot development, document processing automation, content generation systems, and AI-powered decision support tools.",
          additionalProperty: [
            {
              "@type": "PropertyValue",
              name: "typical-duration",
              value: "2-4 months",
            },
            {
              "@type": "PropertyValue",
              name: "cost-range",
              value: "$25K-$150K",
            },
            {
              "@type": "PropertyValue",
              name: "roi-timeframe",
              value: "3-9 months",
            },
          ],
        },
      },
    ],
  },
};

// Export teamSchema for team page usage
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
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "AI & Machine Learning Certification",
        credentialCategory: "Professional Certification",
      },
    ],
    email: "raphael@elitizon.com",
    alumniOf: {
      "@type": "Organization",
      name: "Technology University",
    },
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
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Business Strategy Certification",
        credentialCategory: "Professional Certification",
      },
    ],
    email: "jane@elitizon.com",
    alumniOf: {
      "@type": "Organization",
      name: "Business University",
    },
  },
];

export const expertiseSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ELITIZON Ltd",
  expertise: [
    {
      "@type": "Thing",
      name: "Artificial Intelligence Consulting",
      description:
        "Strategic AI implementation and transformation consulting for enterprises",
      additionalProperty: {
        "@type": "PropertyValue",
        name: "experience-years",
        value: "10+",
      },
    },
    {
      "@type": "Thing",
      name: "Data Engineering",
      description: "Scalable data infrastructure and pipeline development",
      additionalProperty: {
        "@type": "PropertyValue",
        name: "projects-completed",
        value: "150+",
      },
    },
    {
      "@type": "Thing",
      name: "Machine Learning Implementation",
      description: "End-to-end ML solutions from concept to production",
      additionalProperty: {
        "@type": "PropertyValue",
        name: "success-rate",
        value: "95%",
      },
    },
    {
      "@type": "Thing",
      name: "Remote-First Consulting",
      description:
        "Global AI consulting delivered through remote collaboration",
      additionalProperty: {
        "@type": "PropertyValue",
        name: "global-clients",
        value: "50+ countries",
      },
    },
  ],
  award: [
    "Top AI Consulting Firm - Asia Pacific 2024",
    "Excellence in Remote Consulting - Global 2023",
    "Innovation in Data Engineering - Industry Recognition 2023",
  ],
  certification: [
    "AWS Advanced Consulting Partner",
    "Microsoft Azure Expert",
    "Google Cloud Premier Partner",
    "ISO 27001 Certified",
  ],
};

// Adding Article schema for blog posts and case studies
export const articleSchema = (article: {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified: string;
  image: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.headline,
  description: article.description,
  image: {
    "@type": "ImageObject",
    url: article.image,
    width: 1200,
    height: 630,
  },
  author: {
    "@type": "Person",
    name: article.author,
    url: "https://elitizon.com/team",
  },
  publisher: {
    "@type": "Organization",
    name: "ELITIZON Ltd",
    logo: {
      "@type": "ImageObject",
      url: "https://elitizon.com/logo.png",
      width: 200,
      height: 200,
    },
  },
  datePublished: article.datePublished,
  dateModified: article.dateModified,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": article.url,
  },
});

// Adding HowTo schema for technical guides
export const howToSchema = (guide: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string }>;
  image: string;
  totalTime: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: guide.name,
  description: guide.description,
  image: {
    "@type": "ImageObject",
    url: guide.image,
  },
  totalTime: guide.totalTime,
  supply: [
    {
      "@type": "HowToSupply",
      name: "AI/ML Platform Access",
    },
    {
      "@type": "HowToSupply",
      name: "Data Infrastructure",
    },
  ],
  tool: [
    {
      "@type": "HowToTool",
      name: "ELITIZON AI Consulting Services",
    },
  ],
  step: guide.steps.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: step.name,
    text: step.text,
  })),
});

// Adding Course schema for training programs
export const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "AI & Data Engineering Masterclass",
  description:
    "Comprehensive training program covering Data Engineering, Machine Learning, and Generative AI technologies",
  provider: {
    "@type": "Organization",
    name: "ELITIZON Ltd",
    url: "https://elitizon.com",
  },
  hasCourseInstance: [
    {
      "@type": "CourseInstance",
      courseMode: "online",
      instructor: {
        "@type": "Person",
        name: "Raphaël MANSUY",
      },
    },
  ],
  coursePrerequisites: "Basic programming knowledge",
  educationalLevel: "Professional",
  teaches: [
    "Data Engineering",
    "Machine Learning",
    "Generative AI",
    "AI Agents",
  ],
};

// Adding Event schema for webinars and workshops
export const eventSchema = (event: {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  name: event.name,
  description: event.description,
  startDate: event.startDate,
  endDate: event.endDate,
  eventAttendanceMode: "OnlineEventAttendanceMode",
  eventStatus: "EventScheduled",
  location: {
    "@type": "VirtualLocation",
    url: event.location,
  },
  organizer: {
    "@type": "Organization",
    name: "ELITIZON Ltd",
    url: "https://elitizon.com",
  },
  offers: {
    "@type": "Offer",
    url: event.url,
    price: "0",
    priceCurrency: "USD",
    availability: "InStock",
    validFrom: new Date().toISOString(),
  },
});

// Adding Job Posting schema for careers page
export const jobPostingSchema = (job: {
  title: string;
  description: string;
  location: string;
  employmentType: string;
  datePosted: string;
  validThrough: string;
  baseSalary?: {
    min: number;
    max: number;
    currency: string;
  };
}) => ({
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: job.title,
  description: job.description,
  hiringOrganization: {
    "@type": "Organization",
    name: "ELITIZON Ltd",
    sameAs: "https://elitizon.com",
    logo: "https://elitizon.com/logo.png",
  },
  jobLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: job.location,
      addressCountry: "Worldwide",
    },
  },
  employmentType: job.employmentType,
  datePosted: job.datePosted,
  validThrough: job.validThrough,
  ...(job.baseSalary && {
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: job.baseSalary.currency,
      value: {
        "@type": "QuantitativeValue",
        minValue: job.baseSalary.min,
        maxValue: job.baseSalary.max,
        unitText: "YEAR",
      },
    },
  }),
  qualifications: [
    "Experience in AI/ML technologies",
    "Strong problem-solving skills",
    "Remote work experience preferred",
  ],
  responsibilities: [
    "Develop AI solutions for clients",
    "Collaborate with global teams",
    "Deliver high-quality consulting services",
  ],
});

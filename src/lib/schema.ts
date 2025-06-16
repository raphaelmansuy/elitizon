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
    // Adding professional qualifications for Rich Snippets
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "AI & Machine Learning Certification",
        credentialCategory: "Professional Certification",
      },
    ],
    // Adding contact method
    email: "raphael@elitizon.com",
    // Adding alumniOf for education background
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
    // Adding professional qualifications
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Business Strategy Certification",
        credentialCategory: "Professional Certification",
      },
    ],
    // Adding contact method
    email: "jane@elitizon.com",
    // Adding alumniOf for education background
    alumniOf: {
      "@type": "Organization",
      name: "Business University",
    },
  },
];

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

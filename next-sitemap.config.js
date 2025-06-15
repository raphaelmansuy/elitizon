/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://elitizon.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/api/*", "/test/*", "/admin/*", "/404", "/500"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/test/", "/admin/", "/_next/", "/static/"],
      },
    ],
    additionalSitemaps: [
      `${
        process.env.NEXT_PUBLIC_SITE_URL || "https://elitizon.com"
      }/sitemap.xml`,
    ],
  },
  transform: async (config, path) => {
    // Custom priority and changefreq for different pages
    const customPriorities = {
      "/": 1.0,
      "/services": 0.9,
      "/about": 0.8,
      "/contact": 0.8,
      "/careers": 0.7,
      "/team": 0.6,
      "/privacy": 0.3,
      "/terms": 0.3,
    };

    const customChangeFreq = {
      "/": "weekly",
      "/services": "monthly",
      "/about": "monthly",
      "/contact": "monthly",
      "/careers": "weekly",
      "/team": "monthly",
      "/privacy": "yearly",
      "/terms": "yearly",
    };

    return {
      loc: path,
      changefreq: customChangeFreq[path] || "monthly",
      priority: customPriorities[path] || 0.5,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};

#!/usr/bin/env node

/**
 * Rich Snippets Testing Script
 * This script helps validate and test the structured data implementation
 */

const fs = require("fs");
const path = require("path");

// Configuration
const WEBSITE_URL = "https://elitizon.com";
const PAGES_TO_TEST = [
  "",
  "/about",
  "/services",
  "/team",
  "/careers",
  "/contact",
];

// Testing URLs
const VALIDATORS = {
  google: "https://search.google.com/test/rich-results",
  schema: "https://validator.schema.org/",
  facebook: "https://developers.facebook.com/tools/debug/",
  twitter: "https://cards-dev.twitter.com/validator",
  linkedin: "https://www.linkedin.com/post-inspector/",
};

function generateTestUrls() {
  console.log("🔍 Rich Snippets Testing URLs\n");
  console.log("═".repeat(60));

  PAGES_TO_TEST.forEach((page) => {
    const fullUrl = `${WEBSITE_URL}${page}`;
    const pageName = page || "Home";

    console.log(`\n📄 ${pageName.toUpperCase()} PAGE: ${fullUrl}`);
    console.log("─".repeat(40));

    Object.entries(VALIDATORS).forEach(([name, validatorUrl]) => {
      const testUrl =
        name === "google"
          ? `${validatorUrl}?url=${encodeURIComponent(fullUrl)}`
          : name === "schema"
          ? `${validatorUrl}#url=${encodeURIComponent(fullUrl)}`
          : `${validatorUrl}?url=${encodeURIComponent(fullUrl)}`;

      console.log(
        `${name.charAt(0).toUpperCase() + name.slice(1)}: ${testUrl}`
      );
    });
  });

  console.log("\n" + "═".repeat(60));
  console.log("📋 TESTING CHECKLIST");
  console.log("═".repeat(60));

  const checklist = [
    "Organization schema shows company info",
    "Service schemas display service details",
    "FAQ schema shows expandable Q&A",
    "Job postings appear in job search",
    "Breadcrumbs show navigation",
    "Social media cards display properly",
    "Contact information is visible",
    "Reviews and ratings appear",
    "Images load correctly",
    "All URLs are accessible",
  ];

  checklist.forEach((item, index) => {
    console.log(`${index + 1}. [ ] ${item}`);
  });

  console.log("\n" + "═".repeat(60));
  console.log("🚀 RECOMMENDED TESTING WORKFLOW");
  console.log("═".repeat(60));

  const workflow = [
    "Test each page with Google Rich Results Test",
    "Validate structured data with Schema.org validator",
    "Check social media preview with Facebook debugger",
    "Verify Twitter cards with Twitter validator",
    "Monitor Search Console for rich results",
    "Check mobile experience with mobile-friendly test",
    "Test page loading speed with PageSpeed Insights",
    "Verify all images and links work correctly",
  ];

  workflow.forEach((step, index) => {
    console.log(`${index + 1}. ${step}`);
  });
}

function checkStructuredDataFiles() {
  console.log("\n" + "═".repeat(60));
  console.log("📁 STRUCTURED DATA FILES CHECK");
  console.log("═".repeat(60));

  const schemaFile = path.join(__dirname, "../src/lib/schema.ts");

  if (fs.existsSync(schemaFile)) {
    console.log("✅ Schema file exists: src/lib/schema.ts");

    const content = fs.readFileSync(schemaFile, "utf8");
    const schemas = [
      "organizationSchema",
      "websiteSchema",
      "serviceSchema",
      "faqSchema",
      "teamSchema",
      "breadcrumbSchema",
      "jobPostingSchema",
      "articleSchema",
      "howToSchema",
      "courseSchema",
      "eventSchema",
    ];

    schemas.forEach((schema) => {
      if (content.includes(schema)) {
        console.log(`✅ ${schema} found`);
      } else {
        console.log(`❌ ${schema} missing`);
      }
    });
  } else {
    console.log("❌ Schema file not found: src/lib/schema.ts");
  }

  // Check page implementations
  const pages = [
    "src/app/page.tsx",
    "src/app/about/page.tsx",
    "src/app/services/page.tsx",
    "src/app/team/page.tsx",
    "src/app/careers/page.tsx",
  ];

  console.log("\n📄 PAGE IMPLEMENTATIONS:");
  pages.forEach((page) => {
    const filePath = path.join(__dirname, "../", page);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf8");
      const hasStructuredData = content.includes("application/ld+json");
      console.log(
        `${hasStructuredData ? "✅" : "❌"} ${page} ${
          hasStructuredData ? "has" : "missing"
        } structured data`
      );
    } else {
      console.log(`❌ ${page} not found`);
    }
  });
}

function generateSitemapCheck() {
  console.log("\n" + "═".repeat(60));
  console.log("🗺️  SITEMAP & ROBOTS.TXT CHECK");
  console.log("═".repeat(60));

  console.log(`Sitemap URL: ${WEBSITE_URL}/sitemap.xml`);
  console.log(`Robots.txt URL: ${WEBSITE_URL}/robots.txt`);
  console.log(`RSS Feed URL: ${WEBSITE_URL}/rss.xml (if implemented)`);

  console.log("\nSitemap should include:");
  PAGES_TO_TEST.forEach((page) => {
    console.log(`- ${WEBSITE_URL}${page}`);
  });
}

// Main execution
if (require.main === module) {
  console.log(`
██████╗ ██╗ ██████╗██╗  ██╗    ███████╗███╗   ██╗██╗██████╗ ██████╗ ███████╗████████╗███████╗
██╔══██╗██║██╔════╝██║  ██║    ██╔════╝████╗  ██║██║██╔══██╗██╔══██╗██╔════╝╚══██╔══╝██╔════╝
██████╔╝██║██║     ███████║    ███████╗██╔██╗ ██║██║██████╔╝██████╔╝█████╗     ██║   ███████╗
██╔══██╗██║██║     ██╔══██║    ╚════██║██║╚██╗██║██║██╔═══╝ ██╔═══╝ ██╔══╝     ██║   ╚════██║
██║  ██║██║╚██████╗██║  ██║    ███████║██║ ╚████║██║██║     ██║     ███████╗   ██║   ███████║
╚═╝  ╚═╝╚═╝ ╚═════╝╚═╝  ╚═╝    ╚══════╝╚═╝  ╚═══╝╚═╝╚═╝     ╚═╝     ╚══════╝   ╚═╝   ╚══════╝
                                                                                                  
ELITIZON Rich Snippets Testing Tool
`);

  generateTestUrls();
  checkStructuredDataFiles();
  generateSitemapCheck();

  console.log("\n" + "═".repeat(60));
  console.log(
    "✨ Testing complete! Use the URLs above to validate your Rich Snippets implementation."
  );
  console.log("═".repeat(60));
}

module.exports = {
  generateTestUrls,
  checkStructuredDataFiles,
  generateSitemapCheck,
  WEBSITE_URL,
  PAGES_TO_TEST,
  VALIDATORS,
};

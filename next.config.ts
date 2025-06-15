import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features for better SEO
  experimental: {
    optimizeCss: true,
  },

  // Optimize for Netlify deployment
  output: process.env.NODE_ENV === "production" ? "standalone" : undefined,

  // Disable telemetry for better build performance
  telemetry: false,

  // Optimize images for better performance
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // For Netlify, we can use their image optimization service
    unoptimized: process.env.NODE_ENV === "production",
  },

  // Enable compression
  compress: true,

  // Optimize for static generation where possible
  generateEtags: true,
  poweredByHeader: false,

  // Environment variables
  env: {
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL || "https://elitizon.com",
  },

  // Custom headers for better SEO and security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // Redirect old URLs to new ones (add as needed)
  async redirects() {
    return [
      // Example redirects for SEO
      // {
      //   source: '/old-page',
      //   destination: '/new-page',
      //   permanent: true,
      // },
    ];
  },

  // Generate static pages for better SEO
  trailingSlash: false,
};

export default nextConfig;

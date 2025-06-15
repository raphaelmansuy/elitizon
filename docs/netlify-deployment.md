# Netlify Deployment Guide for ELITIZON

This guide covers the optimized deployment configuration for the ELITIZON website on Netlify.

## 🚀 Quick Deployment

### 1. Connect Repository

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Select the `elitizonweb_new` repository

### 2. Build Settings

The build settings are automatically configured via `netlify.toml`:

- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node.js version**: 18.x

### 3. Environment Variables

Set the following environment variables in Netlify Dashboard:

#### Required Variables

```
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
SES_FROM_EMAIL=noreply@elitizon.com
SES_TO_EMAIL=contact@elitizon.com
SES_CAREERS_EMAIL=careers@elitizon.com
NEXT_PUBLIC_BASE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_TELEMETRY_DISABLED=1
NODE_ENV=production
```

#### Optional Variables

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5
```

## 🔧 Configuration Files

### netlify.toml

- Build configuration and optimization settings
- Headers for security and performance
- Redirects for SPA routing
- Plugin configuration for Next.js support

### \_redirects

- Client-side routing support
- SEO-friendly URL redirects
- API route handling

### next-sitemap.config.js

- Automatic sitemap generation
- robots.txt configuration
- Custom priorities for different pages

## 📈 Performance Optimizations

### Image Optimization

- WebP and AVIF format support
- Responsive image sizes
- Netlify's image optimization service integration

### Caching Strategy

- Static assets: 1 year cache
- API routes: No cache
- HTML pages: Smart caching

### Security Headers

- XSS Protection
- Content Security Policy
- Frame Options
- HTTPS enforcement

## 🛠 Build Optimizations

### Next.js Configuration

- Standalone output for serverless functions
- Optimized CSS bundling
- Telemetry disabled for faster builds

### Dependencies

- `@netlify/plugin-nextjs`: Enhanced Next.js support
- `next-sitemap`: Automatic sitemap generation
- `netlify-plugin-lighthouse`: Performance monitoring

## 🔍 Monitoring & Analytics

### Build Performance

- Lighthouse reports generated automatically
- Bundle analysis available via `npm run analyze`
- Build time optimization via Turbopack in development

### Runtime Monitoring

- Google Analytics 4 integration
- Error tracking via Next.js built-in error handling
- Contact form submission tracking

## 🚨 Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**

   - Ensure variables are set in Netlify Dashboard
   - Check variable names match exactly
   - Restart deployment after adding variables

2. **API Routes Not Working**

   - Verify AWS SES credentials
   - Check function timeout settings (max 10s on hobby plan)
   - Review function logs in Netlify Dashboard

3. **Build Failures**

   - Check Node.js version (should be 18.x)
   - Verify all dependencies are installed
   - Review build logs for specific errors

4. **Routing Issues**
   - Ensure `_redirects` file is in `public/` directory
   - Check redirect rules in `netlify.toml`
   - Test client-side navigation

### Performance Issues

1. **Slow Loading**

   - Check image optimization settings
   - Review bundle size with `npm run analyze`
   - Optimize CSS and JavaScript

2. **High Memory Usage**
   - Review function memory allocation in `netlify.toml`
   - Consider upgrading Netlify plan for more resources

## 📚 Additional Resources

- [Netlify Next.js Documentation](https://docs.netlify.com/integrations/frameworks/next-js/)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)

## 🔄 Deployment Workflow

### Automatic Deployments

- Main branch → Production deployment
- Feature branches → Deploy previews
- Pull requests → Deploy previews with comments

### Manual Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy to production
netlify deploy --prod --dir=.next

# Deploy preview
netlify deploy --dir=.next
```

## 📊 Performance Targets

- **Lighthouse Score**: 90+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.0s
- **Cumulative Layout Shift**: < 0.1

With these optimizations, your ELITIZON website should achieve excellent performance scores and provide a smooth user experience on Netlify.

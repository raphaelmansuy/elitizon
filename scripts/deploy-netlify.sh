#!/bin/bash

# Netlify Deployment Script for ELITIZON
# This script helps with local deployment testing and CI/CD setup

set -e

echo "🚀 Starting Netlify deployment process..."

# Check if required environment variables are set
check_env_vars() {
    echo "📋 Checking environment variables..."
    
    # Note: Use scripts/aws/setup-ses-iam.sh to generate secure credentials
    echo "💡 If you haven't set up AWS SES IAM yet, run: ./scripts/aws/setup-ses-iam.sh"
    
    required_vars=(
        "AWS_REGION"
        "AWS_ACCESS_KEY_ID" 
        "AWS_SECRET_ACCESS_KEY"
        "SES_FROM_EMAIL"
        "SES_TO_EMAIL"
        "NEXT_PUBLIC_BASE_URL"
    )
    
    missing_vars=()
    
    for var in "${required_vars[@]}"; do
        if [ -z "${!var}" ]; then
            missing_vars+=("$var")
        fi
    done
    
    if [ ${#missing_vars[@]} -ne 0 ]; then
        echo "❌ Missing required environment variables:"
        printf '%s\n' "${missing_vars[@]}"
        echo ""
        echo "Please set these variables in your .env.local file or Netlify dashboard."
        echo "💡 To generate secure credentials, run: ./scripts/aws/setup-ses-iam.sh"
        echo "📖 For more information, see: docs/SES_IAM_SECURITY.md"
        exit 1
    fi
    
    echo "✅ All required environment variables are set"
}

# Clean previous build
clean_build() {
    echo "🧹 Cleaning previous build..."
    rm -rf .next
    rm -rf out
    rm -rf .netlify
}

# Install dependencies
install_deps() {
    echo "📦 Installing dependencies..."
    npm ci --prefer-offline --no-audit
}

# Run linting and type checking
run_checks() {
    echo "🔍 Running code quality checks..."
    npm run lint
    npm run type-check
}

# Build the application
build_app() {
    echo "🏗️ Building the application..."
    npm run build
}

# Generate sitemap
generate_sitemap() {
    echo "🗺️ Generating sitemap..."
    npm run sitemap || echo "⚠️ Sitemap generation failed (optional)"
}

# Deploy to Netlify
deploy_netlify() {
    echo "🌐 Deploying to Netlify..."
    
    if command -v netlify &> /dev/null; then
        if [ "$1" = "production" ]; then
            netlify deploy --prod --dir=.next
            echo "✅ Production deployment completed!"
        else
            netlify deploy --dir=.next
            echo "✅ Preview deployment completed!"
        fi
    else
        echo "⚠️ Netlify CLI not installed. Please install it with:"
        echo "npm install -g netlify-cli"
        echo ""
        echo "Or deploy through the Netlify Dashboard."
    fi
}

# Main deployment function
main() {
    echo "ELITIZON Netlify Deployment Script"
    echo "==================================="
    echo ""
    
    # Parse command line arguments
    DEPLOY_TYPE=${1:-preview}
    
    if [ "$DEPLOY_TYPE" != "production" ] && [ "$DEPLOY_TYPE" != "preview" ]; then
        echo "Usage: $0 [production|preview]"
        echo "  production: Deploy to production site"
        echo "  preview: Deploy as preview (default)"
        exit 1
    fi
    
    echo "Deployment type: $DEPLOY_TYPE"
    echo ""
    
    # Run deployment steps
    check_env_vars
    clean_build
    install_deps
    run_checks
    build_app
    generate_sitemap
    deploy_netlify "$DEPLOY_TYPE"
    
    echo ""
    echo "🎉 Deployment process completed successfully!"
    
    if [ "$DEPLOY_TYPE" = "production" ]; then
        echo "Your site should be live at: $NEXT_PUBLIC_BASE_URL"
    fi
}

# Run main function with all arguments
main "$@"

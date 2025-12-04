.PHONY: help install dev build start lint clean test analyze deploy validate

# Color output for better UX
BLUE=\033[0;34m
GREEN=\033[0;32m
YELLOW=\033[0;33m
RED=\033[0;31m
NC=\033[0m # No Color

# Default target - show help
help:
	@echo "$(BLUE)╔════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(BLUE)║        ELITIZON Web - Development Command Center       ║$(NC)"
	@echo "$(BLUE)╚════════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(GREEN)📦 Setup & Installation$(NC)"
	@echo "  $(YELLOW)make install$(NC)          Install dependencies (npm install)"
	@echo "  $(YELLOW)make clean$(NC)            Clean build artifacts and cache"
	@echo ""
	@echo "$(GREEN)🚀 Development$(NC)"
	@echo "  $(YELLOW)make dev$(NC)              Start development server (Turbopack)"
	@echo "  $(YELLOW)make dev-debug$(NC)        Start dev server with detailed logs"
	@echo ""
	@echo "$(GREEN)🔨 Build & Production$(NC)"
	@echo "  $(YELLOW)make build$(NC)            Build for production"
	@echo "  $(YELLOW)make start$(NC)            Start production server"
	@echo "  $(YELLOW)make test-build$(NC)       Test production build locally"
	@echo ""
	@echo "$(GREEN)🔍 Code Quality$(NC)"
	@echo "  $(YELLOW)make lint$(NC)             Run ESLint checks"
	@echo "  $(YELLOW)make lint-fix$(NC)         Fix linting issues automatically"
	@echo "  $(YELLOW)make type-check$(NC)       Run TypeScript type checking"
	@echo ""
	@echo "$(GREEN)✅ Testing & Validation$(NC)"
	@echo "  $(YELLOW)make test-seo$(NC)         Validate SEO (rich snippets)"
	@echo "  $(YELLOW)make test-a11y$(NC)        Validate accessibility (contrast)"
	@echo "  $(YELLOW)make test-a11y-full$(NC)   Run full accessibility suite"
	@echo "  $(YELLOW)make validate$(NC)         Run all validations (SEO + A11y)"
	@echo ""
	@echo "$(GREEN)🌍 SEO & Analytics$(NC)"
	@echo "  $(YELLOW)make sitemap$(NC)          Generate sitemap.xml"
	@echo "  $(YELLOW)make analyze$(NC)          Analyze bundle size"
	@echo ""
	@echo "$(GREEN)🚢 Deployment$(NC)"
	@echo "  $(YELLOW)make deploy-netlify$(NC)   Build and export for Netlify"
	@echo "  $(YELLOW)make deploy-vercel$(NC)    Prepare for Vercel deployment"
	@echo ""
	@echo "$(GREEN)🛠️  Utilities$(NC)"
	@echo "  $(YELLOW)make env-check$(NC)        Check environment variables"
	@echo "  $(YELLOW)make status$(NC)           Show project status"
	@echo ""

# Setup targets
install:
	@echo "$(GREEN)📦 Installing dependencies...$(NC)"
	npm install
	@echo "$(GREEN)✓ Installation complete$(NC)"

clean:
	@echo "$(GREEN)🧹 Cleaning build artifacts...$(NC)"
	npm run clean
	@rm -rf node_modules/.cache
	@echo "$(GREEN)✓ Clean complete$(NC)"

# Development targets
dev:
	@echo "$(GREEN)🚀 Starting development server...$(NC)"
	@echo "$(BLUE)→ Open http://localhost:3000$(NC)"
	npm run dev

dev-debug:
	@echo "$(GREEN)🚀 Starting development server (debug mode)...$(NC)"
	@echo "$(BLUE)→ Open http://localhost:3000$(NC)"
	npm run dev -- --debug

# Build & Production targets
build:
	@echo "$(GREEN)🔨 Building for production...$(NC)"
	npm run build
	@echo "$(GREEN)✓ Build complete$(NC)"

start: build
	@echo "$(GREEN)🚀 Starting production server...$(NC)"
	@echo "$(BLUE)→ Open http://localhost:3000$(NC)"
	npm start

test-build:
	@echo "$(GREEN)🧪 Testing production build locally...$(NC)"
	npm run test:build

# Code quality targets
lint:
	@echo "$(GREEN)🔍 Running ESLint...$(NC)"
	npm run lint
	@echo "$(GREEN)✓ Linting complete$(NC)"

lint-fix:
	@echo "$(GREEN)🔧 Fixing linting issues...$(NC)"
	npm run lint:fix
	@echo "$(GREEN)✓ Linting fixes applied$(NC)"

type-check:
	@echo "$(GREEN)🔍 Type checking...$(NC)"
	npm run type-check
	@echo "$(GREEN)✓ Type check complete$(NC)"

# Testing & Validation targets
test-seo:
	@echo "$(GREEN)🌐 Validating SEO (rich snippets)...$(NC)"
	npm run test:rich-snippets

test-a11y:
	@echo "$(GREEN)♿ Validating accessibility (contrast)...$(NC)"
	npm run test:contrast

test-a11y-full:
	@echo "$(GREEN)♿ Running full accessibility suite...$(NC)"
	npm run validate:accessibility

validate: lint type-check test-seo test-a11y-full
	@echo "$(GREEN)✓ All validations passed!$(NC)"

# SEO & Analytics targets
sitemap:
	@echo "$(GREEN)🗺️  Generating sitemap...$(NC)"
	npm run sitemap
	@echo "$(GREEN)✓ Sitemap generated$(NC)"

analyze:
	@echo "$(GREEN)📊 Analyzing bundle size...$(NC)"
	npm run analyze

# Deployment targets
deploy-netlify:
	@echo "$(GREEN)🚀 Preparing for Netlify deployment...$(NC)"
	npm run build:netlify
	@echo "$(GREEN)✓ Ready for Netlify deployment$(NC)"
	@echo "$(BLUE)→ Push to main branch to deploy$(NC)"

deploy-vercel:
	@echo "$(GREEN)🚀 Preparing for Vercel deployment...$(NC)"
	npm run build
	@echo "$(GREEN)✓ Ready for Vercel deployment$(NC)"
	@echo "$(BLUE)→ Push to main branch to deploy$(NC)"

# Utility targets
env-check:
	@echo "$(GREEN)🔍 Checking environment setup...$(NC)"
	@if [ -f .env.local ]; then \
		echo "$(GREEN)✓ .env.local exists$(NC)"; \
		echo "$(YELLOW)Environment variables:$(NC)"; \
		grep -E "AWS_|NEXT_PUBLIC_" .env.local | sed 's/=.*/=***/' || echo "No AWS/NEXT_PUBLIC vars found"; \
	else \
		echo "$(RED)✗ .env.local not found$(NC)"; \
		echo "$(YELLOW)Please create .env.local with AWS credentials$(NC)"; \
	fi

status:
	@echo "$(BLUE)Project Status$(NC)"
	@echo "Node version: $$(node --version)"
	@echo "npm version: $$(npm --version)"
	@echo ""
	@echo "$(YELLOW)Installed packages:$(NC)"
	@npm list --depth=0 2>/dev/null | head -20
	@echo ""
	@echo "$(YELLOW)Git status:$(NC)"
	@git status --short 2>/dev/null || echo "Not a git repository"

# Quick command aliases
.PHONY: d b l lf
d: dev
b: build
l: lint
lf: lint-fix
s: start

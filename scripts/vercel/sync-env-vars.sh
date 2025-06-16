#!/bin/bash

# Vercel Environment Variables Sync Script
# This script provides additional utilities for managing environment variables

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Project configuration
PROJECT_ID="prj_9n5L2nq9fuBEzwhsb5ihQXa85wDf"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to backup current environment variables
backup_env_vars() {
    local backup_file="$PROJECT_ROOT/env-backup-$(date +%Y%m%d-%H%M%S).json"
    
    print_status "Creating backup of current environment variables..."
    
    if vercel env ls --project="$PROJECT_ID" --output json > "$backup_file"; then
        print_success "Backup created: $backup_file"
    else
        print_error "Failed to create backup"
        exit 1
    fi
}

# Function to validate environment variables
validate_env_vars() {
    local env_file="$PROJECT_ROOT/.env.local"
    
    if [[ ! -f "$env_file" ]]; then
        print_error "No .env.local file found"
        return 1
    fi
    
    print_status "Validating environment variables..."
    
    local errors=0
    
    # Required variables for this project
    local required_vars=(
        "AWS_REGION"
        "AWS_ACCESS_KEY_ID" 
        "AWS_SECRET_ACCESS_KEY"
        "SES_FROM_EMAIL"
        "SES_TO_EMAIL"
        "NEXT_PUBLIC_BASE_URL"
    )
    
    for var in "${required_vars[@]}"; do
        if ! grep -q "^${var}=" "$env_file"; then
            print_error "Missing required variable: $var"
            ((errors++))
        elif grep -q "^${var}=$" "$env_file" || grep -q "^${var}=your_" "$env_file"; then
            print_warning "Variable $var appears to have placeholder value"
            ((errors++))
        fi
    done
    
    # Check email format
    while IFS= read -r line; do
        if [[ "$line" =~ ^[A-Z_]*EMAIL=(.+)$ ]]; then
            local email="${BASH_REMATCH[1]}"
            if [[ ! "$email" =~ ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$ ]]; then
                print_warning "Invalid email format: $email"
            fi
        fi
    done < "$env_file"
    
    if [[ $errors -eq 0 ]]; then
        print_success "Environment variables validation passed"
        return 0
    else
        print_error "Environment variables validation failed with $errors issues"
        return 1
    fi
}

# Function to compare local and remote environment variables
compare_env_vars() {
    local env_file="$PROJECT_ROOT/.env.local"
    local temp_remote="/tmp/vercel-env-remote.txt"
    local temp_local="/tmp/vercel-env-local.txt"
    
    print_status "Comparing local and remote environment variables..."
    
    # Get remote variables
    vercel env ls --project="$PROJECT_ID" | grep -E "^\s*[A-Z_]+" | awk '{print $1}' | sort > "$temp_remote"
    
    # Get local variables
    if [[ -f "$env_file" ]]; then
        grep -E "^[A-Z_]+=" "$env_file" | cut -d'=' -f1 | sort > "$temp_local"
    else
        touch "$temp_local"
    fi
    
    echo ""
    echo "Environment Variables Comparison:"
    echo "================================="
    
    # Variables only in remote
    local remote_only=$(comm -23 "$temp_remote" "$temp_local")
    if [[ -n "$remote_only" ]]; then
        print_warning "Variables only on Vercel (not in local .env.local):"
        echo "$remote_only" | sed 's/^/  - /'
        echo ""
    fi
    
    # Variables only in local
    local local_only=$(comm -13 "$temp_remote" "$temp_local")
    if [[ -n "$local_only" ]]; then
        print_warning "Variables only in local .env.local (not on Vercel):"
        echo "$local_only" | sed 's/^/  - /'
        echo ""
    fi
    
    # Variables in both
    local in_both=$(comm -12 "$temp_remote" "$temp_local")
    if [[ -n "$in_both" ]]; then
        print_success "Variables present in both local and Vercel:"
        echo "$in_both" | sed 's/^/  - /'
        echo ""
    fi
    
    # Cleanup
    rm -f "$temp_remote" "$temp_local"
}

# Function to generate .env.local template
generate_env_template() {
    local template_file="$PROJECT_ROOT/.env.local.template"
    
    print_status "Generating .env.local template from .env.example..."
    
    if [[ -f "$PROJECT_ROOT/.env.example" ]]; then
        cp "$PROJECT_ROOT/.env.example" "$template_file"
        print_success "Template created: $template_file"
        print_status "Please copy this to .env.local and update with your actual values"
    else
        print_error "No .env.example file found"
        exit 1
    fi
}

# Function to show project info
show_project_info() {
    echo ""
    echo "Project Information:"
    echo "==================="
    echo "Project ID: $PROJECT_ID"
    echo "Project Root: $PROJECT_ROOT"
    echo ""
    
    # Show Vercel project info
    if command -v vercel &> /dev/null && vercel whoami &> /dev/null; then
        print_status "Fetching Vercel project information..."
        vercel project ls | grep -E "(NAME|$PROJECT_ID)" || true
        echo ""
        
        print_status "Current deployments:"
        vercel list --project="$PROJECT_ID" 2>/dev/null | head -10 || print_warning "Could not fetch deployments"
    fi
}

# Function to show help
show_help() {
    echo "Vercel Environment Variables Sync Utilities"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  backup          Create backup of current Vercel environment variables"
    echo "  validate        Validate local .env.local file"
    echo "  compare         Compare local vs remote environment variables"
    echo "  template        Generate .env.local template from .env.example"
    echo "  info            Show project information"
    echo "  help            Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 backup          # Backup current env vars"
    echo "  $0 validate        # Check .env.local for issues"
    echo "  $0 compare         # Compare local vs remote vars"
    echo ""
}

# Main function
main() {
    echo "========================================"
    echo "Vercel Environment Variables Sync Utils"
    echo "Project ID: $PROJECT_ID"
    echo "========================================"
    
    case "${1:-help}" in
        "backup")
            backup_env_vars
            ;;
            
        "validate")
            validate_env_vars
            ;;
            
        "compare")
            compare_env_vars
            ;;
            
        "template")
            generate_env_template
            ;;
            
        "info")
            show_project_info
            ;;
            
        "help"|"-h"|"--help"|"")
            show_help
            ;;
            
        *)
            print_error "Unknown command: $1"
            show_help
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"

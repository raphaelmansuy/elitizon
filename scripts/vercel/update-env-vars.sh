#!/bin/bash

# Vercel Environment Variables Update Script
# Project: elitizonweb_new
# Project ID: prj_9n5L2nq9fuBEzwhsb5ihQXa85wDf

# Project configuration
PROJECT_ID="prj_9n5L2nq9fuBEzwhsb5ihQXa85wDf"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
ENV_FILE="$PROJECT_ROOT/.env.local"
ENV_TEMP_FILE="/tmp/vercel_env_vars_$$"

set -e

# Cleanup function
cleanup() {
    [[ -f "$ENV_TEMP_FILE" ]] && rm -f "$ENV_TEMP_FILE"
}

# Set trap to cleanup on exit
trap cleanup EXIT INT TERM

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
ENV_FILE="$PROJECT_ROOT/.env.local"

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

# Function to check if Vercel CLI is installed
check_vercel_cli() {
    if ! command -v vercel &>/dev/null; then
        print_error "Vercel CLI is not installed. Please install it first:"
        echo "npm i -g vercel"
        exit 1
    fi
    print_success "Vercel CLI is available"
}

# Function to check if user is logged in to Vercel
check_vercel_auth() {
    if ! vercel whoami &>/dev/null; then
        print_error "You are not logged in to Vercel. Please login first:"
        echo "vercel login"
        exit 1
    fi
    print_success "Authenticated with Vercel"
}

# Function to load environment variables from .env.local
load_env_vars() {
    if [[ ! -f "$ENV_FILE" ]]; then
        print_warning "No .env.local file found at $ENV_FILE"
        print_warning "Please create .env.local file based on .env.example"
        return 1
    fi

    print_status "Loading environment variables from .env.local"

    # Create temporary file to store processed env vars
    ENV_TEMP_FILE="/tmp/vercel_env_vars_$$"

    # Read environment variables from file and process them
    local var_count=0
    while IFS= read -r line || [[ -n "$line" ]]; do
        # Skip empty lines and comments
        if [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]]; then
            continue
        fi

        # Extract key-value pairs
        if [[ "$line" =~ ^[[:space:]]*([A-Za-z_][A-Za-z0-9_]*)=(.*)$ ]]; then
            key="${BASH_REMATCH[1]}"
            value="${BASH_REMATCH[2]}"

            # Remove quotes from value if present
            value="${value%\"}"
            value="${value#\"}"
            value="${value%\'}"
            value="${value#\'}"

            # Store in temp file
            echo "$key=$value" >>"$ENV_TEMP_FILE"
            ((var_count++))
        fi
    done <"$ENV_FILE"

    print_success "Loaded $var_count environment variables"
}

# Function to update environment variables on Vercel
update_vercel_env_vars() {
    local environment="$1"

    print_status "Updating environment variables for environment: $environment"

    if [[ ! -f "$ENV_TEMP_FILE" ]]; then
        print_error "No environment variables loaded. Run load_env_vars first."
        return 1
    fi

    local var_count=0
    while IFS='=' read -r key value || [[ -n "$key" ]]; do
        # Skip empty lines
        if [[ -z "$key" ]]; then
            continue
        fi

        # Skip empty values
        if [[ -z "$value" ]]; then
            print_warning "Skipping empty variable: $key"
            continue
        fi

        print_status "Setting $key"

        # Set environment variable using Vercel CLI
        if echo "$value" | vercel env add "$key" "$environment" --force &>/dev/null; then
            print_success "✓ Set $key for $environment"
            ((var_count++))
        else
            print_error "✗ Failed to set $key for $environment"
        fi
    done <"$ENV_TEMP_FILE"

    print_success "Updated $var_count variables for $environment environment"
}

# Function to list current environment variables
list_env_vars() {
    print_status "Current environment variables on Vercel:"
    vercel env ls
}

# Function to remove an environment variable
remove_env_var() {
    local key="$1"
    local environment="$2"

    print_status "Removing environment variable: $key from $environment"

    if vercel env rm "$key" "$environment" --yes; then
        print_success "✓ Removed $key from $environment"
    else
        print_error "✗ Failed to remove $key from $environment"
    fi
}

# Function to show help
show_help() {
    echo "Vercel Environment Variables Update Script"
    echo ""
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo ""
    echo "Commands:"
    echo "  update [ENV]     Update environment variables for specified environment"
    echo "                   ENV can be: production, preview, development (default: all)"
    echo "  list             List current environment variables"
    echo "  remove KEY ENV   Remove specific environment variable from environment"
    echo "  help             Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 update production    # Update production environment only"
    echo "  $0 update preview       # Update preview environment only"
    echo "  $0 update              # Update all environments"
    echo "  $0 list                # List all environment variables"
    echo "  $0 remove AWS_REGION production  # Remove AWS_REGION from production"
    echo ""
    echo "Note: This script reads environment variables from .env.local file"
    echo "Make sure to create .env.local based on .env.example template"
}

# Main function
main() {
    echo "========================================"
    echo "Vercel Environment Variables Manager"
    echo "Project ID: $PROJECT_ID"
    echo "========================================"

    # Parse command line arguments first to handle help without prerequisites
    case "${1:-update}" in
    "help" | "-h" | "--help")
        show_help
        return 0
        ;;
    esac

    # Check prerequisites for other commands
    check_vercel_cli
    check_vercel_auth

    # Handle other commands
    case "${1:-update}" in
    "update")
        load_env_vars || exit 1

        case "${2:-all}" in
        "production")
            update_vercel_env_vars "production"
            ;;
        "preview")
            update_vercel_env_vars "preview"
            ;;
        "development")
            update_vercel_env_vars "development"
            ;;
        "all" | "")
            print_status "Updating all environments..."
            update_vercel_env_vars "production"
            update_vercel_env_vars "preview"
            update_vercel_env_vars "development"
            ;;
        *)
            print_error "Invalid environment: $2"
            print_error "Valid environments: production, preview, development, all"
            exit 1
            ;;
        esac

        # Cleanup temp file
        [[ -f "$ENV_TEMP_FILE" ]] && rm -f "$ENV_TEMP_FILE"

        print_success "Environment variables update completed!"
        ;;

    "list")
        list_env_vars
        ;;

    "remove")
        if [[ -z "$2" || -z "$3" ]]; then
            print_error "Usage: $0 remove KEY ENVIRONMENT"
            exit 1
        fi
        remove_env_var "$2" "$3"
        ;;

    *)
        print_error "Unknown command: $1"
        show_help
        exit 1
        ;;
    esac

    # Cleanup temp file on exit
    [[ -f "$ENV_TEMP_FILE" ]] && rm -f "$ENV_TEMP_FILE"
}

# Run main function with all arguments
main "$@"

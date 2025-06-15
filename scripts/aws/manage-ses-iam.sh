#!/bin/bash

# AWS SES IAM Management Script for Elitizon Website
# This script helps manage, rotate, and monitor the SES IAM user

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
IAM_USER_NAME="elitizon-ses-user"
IAM_POLICY_NAME="ElitizonSESPolicy"
SES_REGION="us-east-1"

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

# Function to show usage
show_usage() {
    echo "Usage: $0 [COMMAND]"
    echo
    echo "Commands:"
    echo "  status      - Show current IAM user and SES status"
    echo "  rotate      - Rotate access keys"
    echo "  monitor     - Show SES usage statistics"
    echo "  verify      - Check SES identity verification status"
    echo "  cleanup     - Remove IAM user and policy"
    echo "  test        - Test SES configuration"
    echo "  help        - Show this help message"
    echo
}

# Function to check AWS CLI
check_aws_cli() {
    if ! command -v aws &> /dev/null; then
        print_error "AWS CLI is not installed."
        exit 1
    fi
    
    if ! aws sts get-caller-identity &> /dev/null; then
        print_error "AWS CLI is not configured."
        exit 1
    fi
}

# Function to show current status
show_status() {
    print_status "Checking IAM user and SES status..."
    echo
    
    # Check IAM user
    if aws iam get-user --user-name "$IAM_USER_NAME" &> /dev/null; then
        print_success "IAM user '$IAM_USER_NAME' exists"
        
        # Show access keys
        echo "Access Keys:"
        aws iam list-access-keys --user-name "$IAM_USER_NAME" --output table
        
        # Show attached policies
        echo
        echo "Attached Policies:"
        aws iam list-attached-user-policies --user-name "$IAM_USER_NAME" --output table
        
    else
        print_error "IAM user '$IAM_USER_NAME' does not exist"
    fi
    
    echo
    
    # Check SES verification status
    print_status "SES Identity Verification Status:"
    aws ses get-identity-verification-attributes \
        --identities elitizon.com contact@elitizon.com careers@elitizon.com \
        --region "$SES_REGION" \
        --output table 2>/dev/null || print_warning "Could not retrieve SES verification status"
    
    echo
    
    # Show SES sending quota
    print_status "SES Sending Quota:"
    aws ses get-send-quota --region "$SES_REGION" --output table 2>/dev/null || print_warning "Could not retrieve sending quota"
}

# Function to rotate access keys
rotate_keys() {
    print_status "Starting access key rotation..."
    
    # Get current access keys
    CURRENT_KEYS=$(aws iam list-access-keys --user-name "$IAM_USER_NAME" --query 'AccessKeyMetadata[].AccessKeyId' --output text)
    
    if [ -z "$CURRENT_KEYS" ]; then
        print_error "No access keys found for user"
        exit 1
    fi
    
    # Create new access key
    print_status "Creating new access key..."
    NEW_KEY_OUTPUT=$(aws iam create-access-key --user-name "$IAM_USER_NAME" --output json)
    NEW_ACCESS_KEY_ID=$(echo "$NEW_KEY_OUTPUT" | jq -r '.AccessKey.AccessKeyId')
    NEW_SECRET_ACCESS_KEY=$(echo "$NEW_KEY_OUTPUT" | jq -r '.AccessKey.SecretAccessKey')
    
    print_success "New access key created: $NEW_ACCESS_KEY_ID"
    
    # Create new environment template
    cat > .env.rotated.template << EOF
# Rotated AWS SES Configuration for Elitizon Website
# Generated on $(date)

# NEW AWS Credentials (Update these in your production environment)
AWS_REGION=${SES_REGION}
AWS_ACCESS_KEY_ID=${NEW_ACCESS_KEY_ID}
AWS_SECRET_ACCESS_KEY=${NEW_SECRET_ACCESS_KEY}

# Email Configuration
SES_FROM_EMAIL=contact@elitizon.com
SES_TO_EMAIL=contact@elitizon.com

# Application Configuration
NEXT_PUBLIC_BASE_URL=https://elitizon.com

# IMPORTANT: 
# 1. Update your deployment environment with these new credentials
# 2. Test your application thoroughly
# 3. Run '$0 cleanup-old-keys' after confirming everything works
EOF

    print_success "New credentials saved to .env.rotated.template"
    print_warning "Update your deployment environment and test before deleting old keys"
    print_status "Run '$0 cleanup-old-keys' after testing to remove old access keys"
}

# Function to cleanup old keys after rotation
cleanup_old_keys() {
    print_status "Cleaning up old access keys (keeping only the most recent)..."
    
    # Get all access keys sorted by creation date
    KEYS=$(aws iam list-access-keys --user-name "$IAM_USER_NAME" --query 'AccessKeyMetadata | sort_by(@, &CreateDate) | [:-1].AccessKeyId' --output text)
    
    if [ -z "$KEYS" ]; then
        print_status "No old keys to clean up"
        return
    fi
    
    for key_id in $KEYS; do
        print_status "Deleting old access key: $key_id"
        aws iam delete-access-key --user-name "$IAM_USER_NAME" --access-key-id "$key_id"
        print_success "Deleted access key: $key_id"
    done
}

# Function to show monitoring information
show_monitoring() {
    print_status "SES Usage Statistics (Last 24 hours):"
    echo
    
    # Get send statistics
    aws ses get-send-statistics --region "$SES_REGION" --output table 2>/dev/null || print_warning "Could not retrieve send statistics"
    
    echo
    print_status "Current Sending Quota:"
    aws ses get-send-quota --region "$SES_REGION" --output table 2>/dev/null || print_warning "Could not retrieve sending quota"
    
    echo
    print_status "CloudWatch Metrics (if available):"
    aws cloudwatch get-metric-statistics \
        --namespace AWS/SES \
        --metric-name Send \
        --dimensions Name=MessageTag,Value=elitizon \
        --statistics Sum \
        --start-time $(date -u -d '24 hours ago' +%Y-%m-%dT%H:%M:%S) \
        --end-time $(date -u +%Y-%m-%dT%H:%M:%S) \
        --period 3600 \
        --region "$SES_REGION" \
        --output table 2>/dev/null || print_warning "Could not retrieve CloudWatch metrics"
}

# Function to verify SES identities
verify_identities() {
    print_status "Checking SES identity verification status..."
    echo
    
    IDENTITIES=("elitizon.com" "contact@elitizon.com" "careers@elitizon.com")
    
    for identity in "${IDENTITIES[@]}"; do
        STATUS=$(aws ses get-identity-verification-attributes \
            --identities "$identity" \
            --region "$SES_REGION" \
            --query "VerificationAttributes.\"$identity\".VerificationStatus" \
            --output text 2>/dev/null)
        
        if [ "$STATUS" = "Success" ]; then
            print_success "$identity - Verified"
        elif [ "$STATUS" = "Pending" ]; then
            print_warning "$identity - Pending verification"
        else
            print_error "$identity - Not verified or failed"
        fi
    done
    
    echo
    print_status "SES Account Status:"
    aws ses get-account-sending-enabled --region "$SES_REGION" --output text 2>/dev/null || print_warning "Could not check account status"
}

# Function to cleanup IAM resources
cleanup_iam() {
    print_warning "This will delete the IAM user and policy. Are you sure?"
    read -p "Type 'DELETE' to confirm: " -r
    
    if [ "$REPLY" != "DELETE" ]; then
        print_status "Cleanup cancelled"
        exit 0
    fi
    
    print_status "Cleaning up IAM resources..."
    
    # Delete access keys
    aws iam list-access-keys --user-name "$IAM_USER_NAME" --query 'AccessKeyMetadata[].AccessKeyId' --output text | while read -r key_id; do
        if [ -n "$key_id" ]; then
            aws iam delete-access-key --user-name "$IAM_USER_NAME" --access-key-id "$key_id"
            print_status "Deleted access key: $key_id"
        fi
    done
    
    # Detach policies
    ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
    aws iam detach-user-policy \
        --user-name "$IAM_USER_NAME" \
        --policy-arn "arn:aws:iam::${ACCOUNT_ID}:policy/${IAM_POLICY_NAME}" 2>/dev/null || true
    
    # Delete user
    aws iam delete-user --user-name "$IAM_USER_NAME" 2>/dev/null || true
    
    # Delete policy (be careful - this might be used elsewhere)
    print_warning "Policy '$IAM_POLICY_NAME' not deleted (might be used elsewhere)"
    
    print_success "IAM user cleanup complete"
}

# Function to test SES configuration
test_ses() {
    print_status "Testing SES configuration..."
    
    # Check if we can access SES
    if ! aws ses get-send-quota --region "$SES_REGION" &> /dev/null; then
        print_error "Cannot access SES. Check credentials and permissions."
        exit 1
    fi
    
    print_success "SES access confirmed"
    
    # Validate identities
    verify_identities
    
    # Check rate limits
    print_status "Current rate limits:"
    aws ses get-send-quota --region "$SES_REGION" --output table
    
    print_status "Test complete - SES is accessible and configured"
}

# Main function
main() {
    case "${1:-help}" in
        "status")
            check_aws_cli
            show_status
            ;;
        "rotate")
            check_aws_cli
            rotate_keys
            ;;
        "cleanup-old-keys")
            check_aws_cli
            cleanup_old_keys
            ;;
        "monitor")
            check_aws_cli
            show_monitoring
            ;;
        "verify")
            check_aws_cli
            verify_identities
            ;;
        "cleanup")
            check_aws_cli
            cleanup_iam
            ;;
        "test")
            check_aws_cli
            test_ses
            ;;
        "help"|*)
            show_usage
            ;;
    esac
}

# Run main function
main "$@"

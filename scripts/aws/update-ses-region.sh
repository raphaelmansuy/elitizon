#!/bin/bash

# Update AWS SES IAM Policy for EU West 1 Region
# This script updates the existing IAM policy to allow SES operations in eu-west-1

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
OLD_REGION="us-east-1"
NEW_REGION="eu-west-1"
VERIFIED_EMAILS=("contact@elitizon.com" "careers@elitizon.com")

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

# Function to check if AWS CLI is installed and configured
check_aws_cli() {
    print_status "Checking AWS CLI installation and configuration..."

    if ! command -v aws &>/dev/null; then
        print_error "AWS CLI is not installed. Please install it first:"
        echo "https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
        exit 1
    fi

    if ! aws sts get-caller-identity &>/dev/null; then
        print_error "AWS CLI is not configured. Please run 'aws configure' first."
        exit 1
    fi

    print_success "AWS CLI is properly configured"
}

# Function to get AWS account ID
get_account_id() {
    ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
    print_status "Using AWS Account ID: $ACCOUNT_ID"
}

# Function to verify current IAM setup
verify_current_setup() {
    print_status "Verifying current IAM setup..."

    # Check if IAM user exists
    if ! aws iam get-user --user-name "$IAM_USER_NAME" &>/dev/null; then
        print_error "IAM user '$IAM_USER_NAME' does not exist!"
        print_status "Please run setup-ses-iam.sh first to create the initial setup"
        exit 1
    fi

    # Check if policy exists
    if ! aws iam get-policy --policy-arn "arn:aws:iam::${ACCOUNT_ID}:policy/${IAM_POLICY_NAME}" &>/dev/null; then
        print_error "IAM policy '$IAM_POLICY_NAME' does not exist!"
        print_status "Please run setup-ses-iam.sh first to create the initial setup"
        exit 1
    fi

    print_success "Current IAM setup verified"
}

# Function to verify SES identities in the new region
verify_ses_identities() {
    print_status "Checking SES identity verification status in $NEW_REGION..."

    local all_verified=true
    
    for email in "${VERIFIED_EMAILS[@]}"; do
        local status=$(aws ses get-identity-verification-attributes \
            --identities "$email" \
            --region "$NEW_REGION" \
            --query "VerificationAttributes.\"$email\".VerificationStatus" \
            --output text 2>/dev/null || echo "NotFound")
        
        if [ "$status" = "Success" ]; then
            print_success "✓ $email is verified in $NEW_REGION"
        else
            print_warning "✗ $email is NOT verified in $NEW_REGION (Status: $status)"
            all_verified=false
        fi
    done

    # Check domain verification
    local domain_status=$(aws ses get-identity-verification-attributes \
        --identities "elitizon.com" \
        --region "$NEW_REGION" \
        --query "VerificationAttributes.\"elitizon.com\".VerificationStatus" \
        --output text 2>/dev/null || echo "NotFound")
    
    if [ "$domain_status" = "Success" ]; then
        print_success "✓ elitizon.com domain is verified in $NEW_REGION"
    else
        print_warning "✗ elitizon.com domain is NOT verified in $NEW_REGION (Status: $domain_status)"
        all_verified=false
    fi

    if [ "$all_verified" = false ]; then
        print_error "Some email identities are not verified in $NEW_REGION!"
        print_status "You need to verify these identities in the AWS SES Console for $NEW_REGION:"
        print_status "1. Go to https://console.aws.amazon.com/ses/home?region=$NEW_REGION"
        print_status "2. Click 'Verified identities'"
        print_status "3. Add and verify each email address and domain"
        echo
        read -p "Do you want to continue anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_status "Exiting. Please verify your identities first."
            exit 1
        fi
    fi
}

# Function to create updated IAM policy for both regions
create_updated_policy() {
    print_status "Creating updated IAM policy for both regions..."

    # Create policy document with permissions for both regions
    cat >/tmp/ses-policy-updated.json <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "SendEmailFromVerifiedAddressesUSEast1",
            "Effect": "Allow",
            "Action": [
                "ses:SendEmail",
                "ses:SendRawEmail"
            ],
            "Resource": [
                "arn:aws:ses:${OLD_REGION}:${ACCOUNT_ID}:identity/contact@elitizon.com",
                "arn:aws:ses:${OLD_REGION}:${ACCOUNT_ID}:identity/careers@elitizon.com",
                "arn:aws:ses:${OLD_REGION}:${ACCOUNT_ID}:identity/elitizon.com"
            ],
            "Condition": {
                "StringEquals": {
                    "ses:FromAddress": [
                        "contact@elitizon.com",
                        "careers@elitizon.com"
                    ]
                }
            }
        },
        {
            "Sid": "SendEmailFromVerifiedAddressesEUWest1",
            "Effect": "Allow",
            "Action": [
                "ses:SendEmail",
                "ses:SendRawEmail"
            ],
            "Resource": [
                "arn:aws:ses:${NEW_REGION}:${ACCOUNT_ID}:identity/contact@elitizon.com",
                "arn:aws:ses:${NEW_REGION}:${ACCOUNT_ID}:identity/careers@elitizon.com",
                "arn:aws:ses:${NEW_REGION}:${ACCOUNT_ID}:identity/elitizon.com"
            ],
            "Condition": {
                "StringEquals": {
                    "ses:FromAddress": [
                        "contact@elitizon.com",
                        "careers@elitizon.com"
                    ]
                }
            }
        },
        {
            "Sid": "GetSendingQuotaBothRegions",
            "Effect": "Allow",
            "Action": [
                "ses:GetSendQuota",
                "ses:GetSendStatistics"
            ],
            "Resource": "*"
        }
    ]
}
EOF

    # Update the policy
    print_status "Updating IAM policy with new version..."
    aws iam create-policy-version \
        --policy-arn "arn:aws:iam::${ACCOUNT_ID}:policy/${IAM_POLICY_NAME}" \
        --policy-document file:///tmp/ses-policy-updated.json \
        --set-as-default

    rm /tmp/ses-policy-updated.json
    print_success "Updated IAM policy to support both $OLD_REGION and $NEW_REGION"
}

# Function to test the updated configuration
test_configuration() {
    print_status "Testing SES configuration in $NEW_REGION..."

    # Test sending quota
    print_status "Checking SES sending quota in $NEW_REGION..."
    if aws ses get-send-quota --region "$NEW_REGION" &>/dev/null; then
        aws ses get-send-quota --region "$NEW_REGION" --output table
        print_success "✓ SES quota check successful in $NEW_REGION"
    else
        print_error "✗ Cannot access SES in $NEW_REGION"
        return 1
    fi

    print_status "Testing email sending capability..."
    
    # Create a test email using proper AWS CLI syntax
    local test_result
    if test_result=$(aws ses send-email \
        --source "contact@elitizon.com" \
        --destination "ToAddresses=contact@elitizon.com" \
        --message "Subject={Data='SES Region Update Test',Charset=utf-8},Body={Text={Data='This is a test email to verify the updated IAM policy works in $NEW_REGION.',Charset=utf-8}}" \
        --region "$NEW_REGION" 2>&1); then
        print_success "✓ Email sending test successful in $NEW_REGION"
        local message_id=$(echo "$test_result" | grep -o '"MessageId": "[^"]*"' | cut -d'"' -f4)
        echo "Message ID: $message_id"
    else
        print_error "✗ Email sending test failed in $NEW_REGION"
        echo "Error: $test_result"
        return 1
    fi
}

# Function to show next steps
show_next_steps() {
    echo
    print_success "IAM Policy Update Complete!"
    echo
    print_status "Next Steps:"
    echo "1. Your application is now configured to use $NEW_REGION"
    echo "2. Restart your application to pick up the region change"
    echo "3. Test your contact form to ensure it works"
    echo
    print_status "Important Notes:"
    echo "• Your IAM policy now supports both $OLD_REGION and $NEW_REGION"
    echo "• Make sure all email identities are verified in $NEW_REGION"
    echo "• Monitor your SES usage in the new region"
    echo
    print_status "Monitoring Commands:"
    echo "aws ses get-send-quota --region $NEW_REGION"
    echo "aws ses get-send-statistics --region $NEW_REGION"
}

# Main execution
main() {
    echo "======================================"
    echo "AWS SES Region Update Script"
    echo "======================================"
    echo "Updating from: $OLD_REGION"
    echo "Updating to:   $NEW_REGION"
    echo "======================================"
    echo

    check_aws_cli
    get_account_id
    verify_current_setup
    verify_ses_identities
    create_updated_policy
    
    if test_configuration; then
        show_next_steps
    else
        print_error "Configuration test failed. Please check the errors above."
        exit 1
    fi
}

# Check if script is being run directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi

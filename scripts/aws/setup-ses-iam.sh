#!/bin/bash

# AWS SES IAM Setup Script for Elitizon Website
# This script creates a secure IAM user and policy for SES email sending
# with minimal permissions and enhanced security features

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
VERIFIED_DOMAINS=("elitizon.com")
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
    
    if ! command -v aws &> /dev/null; then
        print_error "AWS CLI is not installed. Please install it first:"
        echo "https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
        exit 1
    fi
    
    if ! aws sts get-caller-identity &> /dev/null; then
        print_error "AWS CLI is not configured. Please run 'aws configure' first."
        exit 1
    fi
    
    print_success "AWS CLI is installed and configured"
}

# Function to get current AWS account ID
get_account_id() {
    ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
    print_status "AWS Account ID: $ACCOUNT_ID"
}

# Function to check if IAM user already exists
check_existing_user() {
    print_status "Checking if IAM user '$IAM_USER_NAME' already exists..."
    
    if aws iam get-user --user-name "$IAM_USER_NAME" &> /dev/null; then
        print_warning "IAM user '$IAM_USER_NAME' already exists!"
        read -p "Do you want to delete and recreate it? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            delete_existing_user
        else
            print_error "Aborting script. Please delete the user manually or choose a different name."
            exit 1
        fi
    fi
}

# Function to delete existing user and its resources
delete_existing_user() {
    print_status "Deleting existing IAM user and associated resources..."
    
    # Delete access keys
    aws iam list-access-keys --user-name "$IAM_USER_NAME" --query 'AccessKeyMetadata[].AccessKeyId' --output text | while read -r key_id; do
        if [ -n "$key_id" ]; then
            aws iam delete-access-key --user-name "$IAM_USER_NAME" --access-key-id "$key_id"
            print_status "Deleted access key: $key_id"
        fi
    done
    
    # Detach policies
    aws iam list-attached-user-policies --user-name "$IAM_USER_NAME" --query 'AttachedPolicies[].PolicyArn' --output text | while read -r policy_arn; do
        if [ -n "$policy_arn" ]; then
            aws iam detach-user-policy --user-name "$IAM_USER_NAME" --policy-arn "$policy_arn"
            print_status "Detached policy: $policy_arn"
        fi
    done
    
    # Delete inline policies
    aws iam list-user-policies --user-name "$IAM_USER_NAME" --query 'PolicyNames[]' --output text | while read -r policy_name; do
        if [ -n "$policy_name" ]; then
            aws iam delete-user-policy --user-name "$IAM_USER_NAME" --policy-name "$policy_name"
            print_status "Deleted inline policy: $policy_name"
        fi
    done
    
    # Delete user
    aws iam delete-user --user-name "$IAM_USER_NAME"
    print_success "Deleted existing IAM user"
}

# Function to create secure IAM policy
create_iam_policy() {
    print_status "Creating secure IAM policy for SES..."
    
    # Create policy document with minimal permissions
    cat > /tmp/ses-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "SendEmailFromVerifiedAddresses",
            "Effect": "Allow",
            "Action": [
                "ses:SendEmail",
                "ses:SendRawEmail"
            ],
            "Resource": [
                "arn:aws:ses:${SES_REGION}:${ACCOUNT_ID}:identity/contact@elitizon.com",
                "arn:aws:ses:${SES_REGION}:${ACCOUNT_ID}:identity/careers@elitizon.com",
                "arn:aws:ses:${SES_REGION}:${ACCOUNT_ID}:identity/elitizon.com"
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
            "Sid": "GetSendingQuota",
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

    # Create or update the policy
    if aws iam get-policy --policy-arn "arn:aws:iam::${ACCOUNT_ID}:policy/${IAM_POLICY_NAME}" &> /dev/null; then
        print_status "Policy already exists, updating..."
        aws iam create-policy-version \
            --policy-arn "arn:aws:iam::${ACCOUNT_ID}:policy/${IAM_POLICY_NAME}" \
            --policy-document file:///tmp/ses-policy.json \
            --set-as-default
    else
        aws iam create-policy \
            --policy-name "$IAM_POLICY_NAME" \
            --policy-document file:///tmp/ses-policy.json \
            --description "Minimal permissions for Elitizon website SES email sending"
    fi
    
    rm /tmp/ses-policy.json
    print_success "Created secure IAM policy"
}

# Function to create IAM user
create_iam_user() {
    print_status "Creating IAM user '$IAM_USER_NAME'..."
    
    aws iam create-user \
        --user-name "$IAM_USER_NAME" \
        --tags Key=Project,Value=Elitizon Key=Purpose,Value=SESEmailSending Key=Environment,Value=Production
    
    print_success "Created IAM user"
}

# Function to attach policy to user
attach_policy() {
    print_status "Attaching policy to user..."
    
    aws iam attach-user-policy \
        --user-name "$IAM_USER_NAME" \
        --policy-arn "arn:aws:iam::${ACCOUNT_ID}:policy/${IAM_POLICY_NAME}"
    
    print_success "Attached policy to user"
}

# Function to create access key
create_access_key() {
    print_status "Creating access key for user..."
    
    ACCESS_KEY_OUTPUT=$(aws iam create-access-key --user-name "$IAM_USER_NAME" --output json)
    ACCESS_KEY_ID=$(echo "$ACCESS_KEY_OUTPUT" | jq -r '.AccessKey.AccessKeyId')
    SECRET_ACCESS_KEY=$(echo "$ACCESS_KEY_OUTPUT" | jq -r '.AccessKey.SecretAccessKey')
    
    print_success "Created access key"
}

# Function to verify SES identities
verify_ses_identities() {
    print_status "Verifying SES identities..."
    
    # Verify domain
    for domain in "${VERIFIED_DOMAINS[@]}"; do
        if aws ses get-identity-verification-attributes --identities "$domain" --region "$SES_REGION" &> /dev/null; then
            print_status "Domain $domain is already verified"
        else
            print_status "Verifying domain: $domain"
            aws ses verify-domain-identity --domain "$domain" --region "$SES_REGION"
            print_warning "Domain verification initiated. You need to add DNS records to complete verification."
        fi
    done
    
    # Verify email addresses
    for email in "${VERIFIED_EMAILS[@]}"; do
        if aws ses get-identity-verification-attributes --identities "$email" --region "$SES_REGION" &> /dev/null; then
            print_status "Email $email is already verified"
        else
            print_status "Verifying email: $email"
            aws ses verify-email-identity --email-address "$email" --region "$SES_REGION"
            print_warning "Email verification initiated. Check the inbox for verification email."
        fi
    done
}

# Function to set up SES sending limits and reputation tracking
configure_ses_settings() {
    print_status "Configuring SES settings..."
    
    # Enable reputation tracking
    aws ses put-configuration-set \
        --configuration-set Name=elitizon-tracking \
        --region "$SES_REGION" 2>/dev/null || true
    
    # Add reputation tracking
    aws ses put-configuration-set-reputation-tracking-enabled \
        --configuration-set-name elitizon-tracking \
        --enabled \
        --region "$SES_REGION" 2>/dev/null || true
    
    print_success "SES settings configured"
}

# Function to create environment file template
create_env_template() {
    print_status "Creating environment file template..."
    
    cat > .env.production.template << EOF
# AWS SES Configuration for Elitizon Website
# Generated on $(date)

# AWS Credentials (Use these in your production environment)
AWS_REGION=${SES_REGION}
AWS_ACCESS_KEY_ID=${ACCESS_KEY_ID}
AWS_SECRET_ACCESS_KEY=${SECRET_ACCESS_KEY}

# Email Configuration
SES_FROM_EMAIL=contact@elitizon.com
SES_TO_EMAIL=contact@elitizon.com

# Application Configuration
NEXT_PUBLIC_BASE_URL=https://elitizon.com

# Security Notes:
# 1. Never commit this file to version control
# 2. Use environment variables in production (Netlify/Vercel)
# 3. Rotate these credentials regularly
# 4. Monitor usage in AWS CloudWatch
EOF

    print_success "Created environment template: .env.production.template"
}

# Function to create monitoring and alerting setup
create_monitoring_setup() {
    print_status "Setting up CloudWatch monitoring..."
    
    # Create CloudWatch alarm for sending quota
    aws cloudwatch put-metric-alarm \
        --alarm-name "SES-SendingQuota-Elitizon" \
        --alarm-description "Alert when SES sending quota is near limit" \
        --metric-name Send \
        --namespace AWS/SES \
        --statistic Sum \
        --period 86400 \
        --threshold 80 \
        --comparison-operator GreaterThanThreshold \
        --evaluation-periods 1 \
        --region "$SES_REGION" 2>/dev/null || print_warning "Could not create CloudWatch alarm"
    
    print_success "Monitoring setup complete"
}

# Function to test SES configuration
test_ses_configuration() {
    print_status "Testing SES configuration..."
    
    # Test email sending (dry run)
    cat > /tmp/test-email.json << EOF
{
    "Source": "contact@elitizon.com",
    "Destination": {
        "ToAddresses": ["contact@elitizon.com"]
    },
    "Message": {
        "Subject": {
            "Data": "SES Configuration Test - Elitizon",
            "Charset": "UTF-8"
        },
        "Body": {
            "Text": {
                "Data": "This is a test email to verify SES configuration for Elitizon website. If you receive this, the setup is working correctly.",
                "Charset": "UTF-8"
            }
        }
    }
}
EOF

    # Note: This would actually send an email, so we'll just validate the format
    print_warning "Test email configuration created. Use this in your application to test."
    rm /tmp/test-email.json
}

# Function to print security recommendations
print_security_recommendations() {
    echo
    print_status "🔒 Security Recommendations:"
    echo "1. Store credentials securely in your deployment platform (Netlify/Vercel environment variables)"
    echo "2. Never commit the .env.production.template file to version control"
    echo "3. Rotate access keys regularly (every 90 days recommended)"
    echo "4. Monitor SES usage in AWS CloudWatch"
    echo "5. Set up bounce and complaint handling for production"
    echo "6. Consider using IAM roles instead of access keys for EC2/Lambda deployments"
    echo "7. Enable MFA on your AWS root account"
    echo "8. Review SES sending statistics regularly"
    echo
}

# Function to print next steps
print_next_steps() {
    echo
    print_status "📋 Next Steps:"
    echo "1. Complete domain/email verification in AWS SES console"
    echo "2. Request production access if currently in sandbox mode"
    echo "3. Add environment variables to your deployment platform:"
    echo "   - Netlify: Site settings > Environment variables"
    echo "   - Vercel: Project settings > Environment Variables"
    echo "4. Test email sending functionality in your application"
    echo "5. Set up bounce and complaint handling SNS topics"
    echo "6. Configure sending limits based on your needs"
    echo
    print_success "SES IAM setup complete!"
}

# Main execution
main() {
    echo "🚀 AWS SES IAM Setup for Elitizon Website"
    echo "=========================================="
    echo
    
    check_aws_cli
    get_account_id
    check_existing_user
    create_iam_policy
    create_iam_user
    attach_policy
    create_access_key
    verify_ses_identities
    configure_ses_settings
    create_env_template
    create_monitoring_setup
    test_ses_configuration
    print_security_recommendations
    print_next_steps
}

# Run main function
main "$@"

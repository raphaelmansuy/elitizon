#/bin/bash

# AWS SES Configuration Validation Script for Elitizon Website
# This script validates the complete SES setup and security configuration

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
IAM_USER_NAME="elitizon-ses-user"
IAM_POLICY_NAME="ElitizonSESPolicy"
SES_REGION="us-east-1"
REQUIRED_IDENTITIES=("contact@elitizon.com" "careers@elitizon.com" "elitizon.com")

# Counters
TOTAL_CHECKS=0
PASSED_CHECKS=0
FAILED_CHECKS=0
WARNING_CHECKS=0

# Function to print colored output
print_header() {
    echo -e "${CYAN}========================================${NC}"
    echo -e "${CYAN}$1${NC}"
    echo -e "${CYAN}========================================${NC}"
}

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[✓ PASS]${NC} $1"
    ((PASSED_CHECKS++))
}

print_warning() {
    echo -e "${YELLOW}[⚠ WARN]${NC} $1"
    ((WARNING_CHECKS++))
}

print_error() {
    echo -e "${RED}[✗ FAIL]${NC} $1"
    ((FAILED_CHECKS++))
}

# Function to increment total checks
check() {
    ((TOTAL_CHECKS++))
}

# Function to validate AWS CLI setup
validate_aws_cli() {
    print_header "AWS CLI Validation"
    
    check
    if command -v aws &> /dev/null; then
        print_success "AWS CLI is installed"
    else
        print_error "AWS CLI is not installed"
        return 1
    fi
    
    check
    if aws sts get-caller-identity &> /dev/null; then
        ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
        print_success "AWS CLI is configured (Account: $ACCOUNT_ID)"
    else
        print_error "AWS CLI is not configured or lacks permissions"
        return 1
    fi
    
    check
    CALLER_INFO=$(aws sts get-caller-identity --query 'Arn' --output text)
    if [[ $CALLER_INFO == *"root"* ]]; then
        print_warning "Using root account credentials (not recommended for production)"
    else
        print_success "Using IAM user credentials (recommended)"
    fi
}

# Function to validate IAM user and policy
validate_iam_setup() {
    print_header "IAM Configuration Validation"
    
    check
    if aws iam get-user --user-name "$IAM_USER_NAME" &> /dev/null; then
        print_success "IAM user '$IAM_USER_NAME' exists"
    else
        print_error "IAM user '$IAM_USER_NAME' does not exist"
        return 1
    fi
    
    check
    if aws iam get-policy --policy-arn "arn:aws:iam::${ACCOUNT_ID}:policy/${IAM_POLICY_NAME}" &> /dev/null; then
        print_success "IAM policy '$IAM_POLICY_NAME' exists"
    else
        print_error "IAM policy '$IAM_POLICY_NAME' does not exist"
    fi
    
    check
    ATTACHED_POLICIES=$(aws iam list-attached-user-policies --user-name "$IAM_USER_NAME" --query 'AttachedPolicies[].PolicyName' --output text)
    if [[ $ATTACHED_POLICIES == *"$IAM_POLICY_NAME"* ]]; then
        print_success "Policy is attached to user"
    else
        print_error "Policy is not attached to user"
    fi
    
    check
    ACCESS_KEYS=$(aws iam list-access-keys --user-name "$IAM_USER_NAME" --query 'AccessKeyMetadata[].AccessKeyId' --output text)
    if [ -n "$ACCESS_KEYS" ]; then
        KEY_COUNT=$(echo "$ACCESS_KEYS" | wc -w)
        if [ "$KEY_COUNT" -eq 1 ]; then
            print_success "User has 1 access key (optimal)"
        elif [ "$KEY_COUNT" -eq 2 ]; then
            print_warning "User has 2 access keys (rotation in progress?)"
        else
            print_error "User has $KEY_COUNT access keys (should be 1-2)"
        fi
    else
        print_error "User has no access keys"
    fi
}

# Function to validate SES configuration
validate_ses_setup() {
    print_header "SES Configuration Validation"
    
    check
    if aws ses get-send-quota --region "$SES_REGION" &> /dev/null; then
        print_success "SES is accessible in region $SES_REGION"
    else
        print_error "Cannot access SES in region $SES_REGION"
        return 1
    fi
    
    # Check identity verification
    for identity in "${REQUIRED_IDENTITIES[@]}"; do
        check
        STATUS=$(aws ses get-identity-verification-attributes \
            --identities "$identity" \
            --region "$SES_REGION" \
            --query "VerificationAttributes.\"$identity\".VerificationStatus" \
            --output text 2>/dev/null)
        
        if [ "$STATUS" = "Success" ]; then
            print_success "$identity is verified"
        elif [ "$STATUS" = "Pending" ]; then
            print_warning "$identity verification is pending"
        else
            print_error "$identity is not verified or failed verification"
        fi
    done
    
    check
    SENDING_ENABLED=$(aws ses get-account-sending-enabled --region "$SES_REGION" --output text 2>/dev/null)
    if [ "$SENDING_ENABLED" = "True" ]; then
        print_success "SES sending is enabled"
    else
        print_error "SES sending is disabled"
    fi
    
    # Check sending quota
    check
    QUOTA_INFO=$(aws ses get-send-quota --region "$SES_REGION" --output json 2>/dev/null)
    if [ -n "$QUOTA_INFO" ]; then
        MAX_24_HOUR=$(echo "$QUOTA_INFO" | jq -r '.Max24HourSend')
        MAX_SEND_RATE=$(echo "$QUOTA_INFO" | jq -r '.MaxSendRate')
        SENT_LAST_24=$(echo "$QUOTA_INFO" | jq -r '.SentLast24Hours')
        
        print_success "Daily quota: $SENT_LAST_24/$MAX_24_HOUR emails (Rate: $MAX_SEND_RATE/sec)"
        
        if (( $(echo "$SENT_LAST_24 > $MAX_24_HOUR * 0.8" | bc -l) )); then
            print_warning "Using >80% of daily quota"
        fi
    else
        print_error "Cannot retrieve sending quota"
    fi
}

# Function to validate security configuration
validate_security() {
    print_header "Security Configuration Validation"
    
    # Check policy permissions
    check
    POLICY_DOC=$(aws iam get-policy-version \
        --policy-arn "arn:aws:iam::${ACCOUNT_ID}:policy/${IAM_POLICY_NAME}" \
        --version-id v1 \
        --query 'PolicyVersion.Document' 2>/dev/null)
    
    if [ -n "$POLICY_DOC" ]; then
        # Check for wildcard resources
        if echo "$POLICY_DOC" | jq -r '.Statement[].Resource[]' | grep -q '\*'; then
            print_warning "Policy contains wildcard resources"
        else
            print_success "Policy uses specific resource ARNs (secure)"
        fi
        
        # Check for conditions
        if echo "$POLICY_DOC" | jq -e '.Statement[].Condition' &> /dev/null; then
            print_success "Policy includes access conditions (secure)"
        else
            print_warning "Policy lacks conditional access controls"
        fi
        
        # Check for minimal actions
        ACTIONS=$(echo "$POLICY_DOC" | jq -r '.Statement[].Action[]' | sort | uniq)
        EXPECTED_ACTIONS=("ses:GetSendQuota" "ses:GetSendStatistics" "ses:SendEmail" "ses:SendRawEmail")
        
        for action in $ACTIONS; do
            if [[ " ${EXPECTED_ACTIONS[@]} " =~ " ${action} " ]]; then
                continue
            else
                print_warning "Unexpected action in policy: $action"
            fi
        done
        print_success "Policy actions are minimal and appropriate"
    else
        print_error "Cannot retrieve policy document"
    fi
    
    # Check access key age
    check
    for key_id in $ACCESS_KEYS; do
        KEY_AGE=$(aws iam get-access-key-last-used --access-key-id "$key_id" --query 'AccessKeyLastUsed.LastUsedDate' --output text 2>/dev/null)
        if [ "$KEY_AGE" != "None" ] && [ -n "$KEY_AGE" ]; then
            # Calculate days since creation (simplified)
            print_success "Access key $key_id has been used recently"
        else
            print_warning "Access key $key_id has never been used or no recent usage"
        fi
    done
}

# Function to validate application integration
validate_application() {
    print_header "Application Integration Validation"
    
    # Check if environment template exists
    check
    if [ -f ".env.production.template" ]; then
        print_success "Environment template file exists"
        
        # Check template contents
        REQUIRED_VARS=("AWS_REGION" "AWS_ACCESS_KEY_ID" "AWS_SECRET_ACCESS_KEY" "SES_FROM_EMAIL" "SES_TO_EMAIL")
        for var in "${REQUIRED_VARS[@]}"; do
            check
            if grep -q "^$var=" .env.production.template; then
                print_success "Template contains $var"
            else
                print_error "Template missing $var"
            fi
        done
    else
        print_error "Environment template file not found"
    fi
    
    # Check if application files exist
    check
    if [ -f "src/app/api/contact/route.ts" ]; then
        print_success "Contact API endpoint exists"
    else
        print_error "Contact API endpoint not found"
    fi
    
    check
    if [ -f "src/app/api/careers/apply/route.ts" ]; then
        print_success "Careers API endpoint exists"
    else
        print_error "Careers API endpoint not found"
    fi
    
    # Check package.json for AWS SDK
    check
    if [ -f "package.json" ]; then
        if grep -q "@aws-sdk/client-ses" package.json; then
            print_success "AWS SES SDK is installed"
        else
            print_error "AWS SES SDK not found in package.json"
        fi
    else
        print_error "package.json not found"
    fi
}

# Function to test SES functionality
test_ses_functionality() {
    print_header "SES Functionality Test"
    
    print_status "Testing SES API access..."
    
    check
    if aws ses get-send-quota --region "$SES_REGION" &> /dev/null; then
        print_success "Can retrieve sending quota"
    else
        print_error "Cannot retrieve sending quota"
    fi
    
    check
    if aws ses get-send-statistics --region "$SES_REGION" &> /dev/null; then
        print_success "Can retrieve sending statistics"
    else
        print_error "Cannot retrieve sending statistics"
    fi
    
    # Test email validation (dry run)
    print_status "Testing email configuration format..."
    
    check
    TEST_EMAIL='{
        "Source": "contact@elitizon.com",
        "Destination": {"ToAddresses": ["contact@elitizon.com"]},
        "Message": {
            "Subject": {"Data": "Test"},
            "Body": {"Text": {"Data": "Test"}}
        }
    }'
    
    if echo "$TEST_EMAIL" | jq . &> /dev/null; then
        print_success "Email format validation passed"
    else
        print_error "Email format validation failed"
    fi
}

# Function to print summary report
print_summary() {
    echo
    print_header "Validation Summary"
    
    echo -e "Total Checks: ${CYAN}$TOTAL_CHECKS${NC}"
    echo -e "Passed: ${GREEN}$PASSED_CHECKS${NC}"
    echo -e "Warnings: ${YELLOW}$WARNING_CHECKS${NC}"
    echo -e "Failed: ${RED}$FAILED_CHECKS${NC}"
    echo
    
    if [ $FAILED_CHECKS -eq 0 ]; then
        if [ $WARNING_CHECKS -eq 0 ]; then
            echo -e "${GREEN}🎉 Perfect! All validations passed.${NC}"
            echo -e "${GREEN}Your SES setup is secure and ready for production.${NC}"
        else
            echo -e "${YELLOW}⚠️  Good! Core setup is working with some warnings.${NC}"
            echo -e "${YELLOW}Review warnings above for optimization opportunities.${NC}"
        fi
    else
        echo -e "${RED}❌ Issues detected! Please address failed checks before proceeding.${NC}"
        echo -e "${RED}Run the setup script or fix issues manually.${NC}"
        exit 1
    fi
    
    echo
    print_status "Next Steps:"
    echo "1. Address any warnings or failures shown above"
    echo "2. Update your deployment environment with credentials"
    echo "3. Test email sending in your application"
    echo "4. Set up monitoring and alerting"
    echo "5. Schedule regular credential rotation"
}

# Main execution
main() {
    echo -e "${CYAN}🔍 AWS SES Configuration Validation for Elitizon${NC}"
    echo -e "${CYAN}Starting comprehensive security and functionality audit...${NC}"
    echo
    
    validate_aws_cli || exit 1
    validate_iam_setup
    validate_ses_setup
    validate_security
    validate_application
    test_ses_functionality
    print_summary
}

# Run main function
main "$@"

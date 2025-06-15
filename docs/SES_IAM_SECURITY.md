# AWS SES IAM Security Setup for Elitizon Website

This document describes the secure AWS SES IAM setup for the Elitizon website email functionality.

## Overview

The Elitizon website uses AWS SES for sending emails from two main sources:

- **Contact Form**: Sends emails to `contact@elitizon.com`
- **Career Applications**: Sends emails to `careers@elitizon.com`

## Security Features Implemented

### 1. Principle of Least Privilege

- IAM user has only the minimum permissions required for SES email sending
- Resource-specific permissions limited to verified identities only
- No unnecessary AWS service access

### 2. Resource Restrictions

- Email sending restricted to specific verified addresses
- Sending only allowed from `contact@elitizon.com` and `careers@elitizon.com`
- Regional restrictions (us-east-1)

### 3. Conditional Access

- `ses:FromAddress` condition ensures emails can only be sent from verified addresses
- No wildcard permissions

### 4. Monitoring and Alerting

- CloudWatch alarms for sending quota monitoring
- SES reputation tracking enabled
- Usage statistics and metrics available

## IAM Policy Details

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "SendEmailFromVerifiedAddresses",
      "Effect": "Allow",
      "Action": ["ses:SendEmail", "ses:SendRawEmail"],
      "Resource": [
        "arn:aws:ses:us-east-1:ACCOUNT_ID:identity/contact@elitizon.com",
        "arn:aws:ses:us-east-1:ACCOUNT_ID:identity/careers@elitizon.com",
        "arn:aws:ses:us-east-1:ACCOUNT_ID:identity/elitizon.com"
      ],
      "Condition": {
        "StringEquals": {
          "ses:FromAddress": ["contact@elitizon.com", "careers@elitizon.com"]
        }
      }
    },
    {
      "Sid": "GetSendingQuota",
      "Effect": "Allow",
      "Action": ["ses:GetSendQuota", "ses:GetSendStatistics"],
      "Resource": "*"
    }
  ]
}
```

## Security Recommendations

### 1. Credential Management

- ✅ Use environment variables for credentials
- ✅ Never commit credentials to version control
- ✅ Rotate access keys every 90 days
- ✅ Use different credentials for different environments

### 2. Network Security

- Consider implementing IP restrictions for production
- Use VPC endpoints for SES if running on EC2
- Implement rate limiting in application code

### 3. Monitoring

- ✅ Enable CloudWatch metrics for SES
- ✅ Set up alarms for unusual sending patterns
- ✅ Monitor bounce and complaint rates
- ✅ Review SES usage regularly

### 4. Application Security

- ✅ Input validation on all form fields
- ✅ Email format validation
- ✅ Rate limiting on form submissions
- Consider implementing CAPTCHA for spam protection

### 5. SES Configuration

- ✅ Verify all sending identities
- ✅ Request production access when ready
- ✅ Set up bounce and complaint handling
- ✅ Configure sending limits appropriately

## Scripts Usage

### Setup Script

```bash
# Make the script executable
chmod +x scripts/aws/setup-ses-iam.sh

# Run the setup
./scripts/aws/setup-ses-iam.sh
```

### Management Script

```bash
# Make the script executable
chmod +x scripts/aws/manage-ses-iam.sh

# Check current status
./scripts/aws/manage-ses-iam.sh status

# Rotate access keys
./scripts/aws/manage-ses-iam.sh rotate

# Monitor usage
./scripts/aws/manage-ses-iam.sh monitor

# Test configuration
./scripts/aws/manage-ses-iam.sh test
```

## Environment Variables

### Required Variables

```bash
# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...

# Email Configuration
SES_FROM_EMAIL=contact@elitizon.com
SES_TO_EMAIL=contact@elitizon.com

# Application Configuration
NEXT_PUBLIC_BASE_URL=https://elitizon.com
```

### Deployment Platforms

#### Netlify

1. Go to Site settings > Environment variables
2. Add each variable as Key-Value pairs
3. Redeploy the site

#### Vercel

1. Go to Project settings > Environment Variables
2. Add each variable for Production environment
3. Redeploy the application

## Security Checklist

### Pre-Deployment

- [ ] IAM user created with minimal permissions
- [ ] SES identities verified
- [ ] Environment variables configured
- [ ] Access keys stored securely
- [ ] Monitoring set up

### Post-Deployment

- [ ] Email sending tested
- [ ] Bounce/complaint handling configured
- [ ] Rate limits appropriate
- [ ] Monitoring alerts working
- [ ] Backup access configured

### Regular Maintenance

- [ ] Rotate access keys quarterly
- [ ] Review SES usage monthly
- [ ] Monitor bounce/complaint rates
- [ ] Update permissions as needed
- [ ] Review CloudWatch metrics

## Incident Response

### If Credentials are Compromised

1. Immediately disable the access key in AWS console
2. Generate new credentials using the rotate script
3. Update deployment environment
4. Review access logs for unauthorized usage
5. Consider changing all related passwords

### If Unusual Email Activity

1. Check CloudWatch metrics for anomalies
2. Review application logs
3. Temporarily disable SES sending if necessary
4. Investigate source of unusual activity
5. Update security measures as needed

## Cost Optimization

### SES Pricing (as of 2025)

- First 62,000 emails per month: $0.10 per 1,000 emails
- Data transfer: $0.12 per GB
- Receiving emails: $0.10 per 1,000 emails

### Monitoring Costs

- Set up billing alerts for SES usage
- Monitor sending patterns
- Optimize email content size
- Review usage regularly

## Compliance Considerations

### GDPR/Privacy

- Implement email opt-out mechanisms
- Store minimal personal data
- Have data retention policies
- Handle data subject requests

### CAN-SPAM Compliance

- Include unsubscribe links
- Use accurate sender information
- Avoid misleading subject lines
- Process unsubscribe requests promptly

## Troubleshooting

### Common Issues

#### Email Not Sending

1. Check if sender email is verified
2. Verify AWS credentials are correct
3. Check SES sending limits
4. Review application logs
5. Verify network connectivity

#### Rate Limiting

1. Check current sending quota
2. Request limit increase if needed
3. Implement exponential backoff
4. Monitor sending patterns

#### Bounce/Complaint Issues

1. Review bounce/complaint rates
2. Check email content for spam indicators
3. Verify recipient email addresses
4. Implement proper list hygiene

### Support Resources

- AWS SES Documentation
- AWS Support (if applicable)
- Application logs and monitoring
- CloudWatch metrics and alarms

## Version History

- **v1.0** (2025-01-15): Initial secure IAM setup
- **v1.1** (2025-01-15): Added monitoring and management scripts
- **v1.2** (2025-01-15): Enhanced security documentation

## Contact

For questions about this setup, contact the development team or refer to the AWS SES documentation.

# AWS SES IAM Scripts for Elitizon Website

This directory contains secure AWS SES IAM setup and management scripts for the Elitizon website email functionality.

## Quick Start

1. **Prerequisites**

   ```bash
   # Install AWS CLI
   brew install awscli  # macOS
   # or
   pip install awscli

   # Configure AWS CLI with admin credentials
   aws configure
   ```

2. **Run Initial Setup**

   ```bash
   ./setup-ses-iam.sh
   ```

3. **Manage and Monitor**
   ```bash
   ./manage-ses-iam.sh status
   ```

## Scripts Overview

### setup-ses-iam.sh

**Purpose**: Initial secure IAM user and policy creation for SES

**Features**:

- ✅ Creates IAM user with minimal permissions
- ✅ Applies principle of least privilege
- ✅ Verifies SES identities
- ✅ Sets up monitoring and alerts
- ✅ Generates secure environment template
- ✅ Implements resource-based restrictions

**Usage**:

```bash
./setup-ses-iam.sh
```

### manage-ses-iam.sh

**Purpose**: Ongoing management, monitoring, and maintenance

**Features**:

- ✅ Status checking and monitoring
- ✅ Access key rotation
- ✅ Usage statistics and metrics
- ✅ SES identity verification status
- ✅ Security testing and validation
- ✅ Resource cleanup capabilities

**Usage**:

```bash
./manage-ses-iam.sh [command]

Commands:
  status      - Show current IAM user and SES status
  rotate      - Rotate access keys
  monitor     - Show SES usage statistics
  verify      - Check SES identity verification status
  cleanup     - Remove IAM user and policy
  test        - Test SES configuration
  help        - Show help message
```

## Security Features

### 🔒 Minimal Permissions Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["ses:SendEmail", "ses:SendRawEmail"],
      "Resource": [
        "arn:aws:ses:us-east-1:ACCOUNT:identity/contact@elitizon.com",
        "arn:aws:ses:us-east-1:ACCOUNT:identity/careers@elitizon.com",
        "arn:aws:ses:us-east-1:ACCOUNT:identity/elitizon.com"
      ],
      "Condition": {
        "StringEquals": {
          "ses:FromAddress": ["contact@elitizon.com", "careers@elitizon.com"]
        }
      }
    }
  ]
}
```

### 🛡️ Security Controls

- **Resource Restrictions**: Only specific verified identities
- **Conditional Access**: FromAddress restrictions
- **Regional Limitations**: us-east-1 only
- **No Wildcard Permissions**: Explicit resource ARNs
- **Monitoring**: CloudWatch alarms and metrics

## Environment Setup

After running the setup script, you'll get a `.env.production.template` file:

```bash
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
SES_FROM_EMAIL=contact@elitizon.com
SES_TO_EMAIL=contact@elitizon.com
NEXT_PUBLIC_BASE_URL=https://elitizon.com
```

### Deployment Platform Setup

#### Netlify

1. Site Settings → Environment Variables
2. Add each variable from the template
3. Redeploy the site

#### Vercel

1. Project Settings → Environment Variables
2. Add variables for Production environment
3. Redeploy the application

## Maintenance Schedule

### Weekly

- [ ] Check SES usage statistics
- [ ] Monitor bounce/complaint rates
- [ ] Review CloudWatch metrics

### Monthly

- [ ] Review access logs
- [ ] Check for security updates
- [ ] Validate SES identity status

### Quarterly

- [ ] Rotate access keys
- [ ] Review IAM permissions
- [ ] Update documentation
- [ ] Security audit

## Troubleshooting

### Common Issues

#### "User already exists" error

```bash
# The script will ask if you want to recreate
# Or delete manually:
aws iam delete-user --user-name elitizon-ses-user
```

#### "Insufficient permissions" error

```bash
# Ensure your AWS CLI user has these permissions:
# - iam:CreateUser, iam:CreatePolicy
# - iam:AttachUserPolicy, iam:CreateAccessKey
# - ses:VerifyEmailIdentity, ses:VerifyDomainIdentity
```

#### Email not sending

```bash
# Check status
./manage-ses-iam.sh verify

# Test configuration
./manage-ses-iam.sh test
```

### Getting Help

1. **Check script output**: Both scripts provide detailed colored output
2. **Review logs**: AWS CloudTrail for API calls
3. **SES Console**: AWS SES dashboard for identity status
4. **Test locally**: Use the test command to validate setup

## Security Best Practices

### ✅ Completed by Scripts

- Minimal IAM permissions
- Resource-based restrictions
- Conditional access controls
- Monitoring and alerting
- Secure credential generation

### 📋 Manual Steps Required

- [ ] Set up bounce/complaint handling SNS topics
- [ ] Configure application-level rate limiting
- [ ] Implement CAPTCHA for form protection
- [ ] Set up log aggregation and analysis
- [ ] Create incident response procedures

## Cost Optimization

### SES Pricing (2025)

- **Free Tier**: 62,000 emails/month (first year)
- **After Free Tier**: $0.10 per 1,000 emails
- **Data Transfer**: $0.12 per GB

### Cost Monitoring

```bash
# Check current usage
./manage-ses-iam.sh monitor

# Set up billing alerts in AWS Console
# Monitor: SES → Reputation → Sending Statistics
```

## Files Created

After running the scripts, you'll have:

```
scripts/aws/
├── setup-ses-iam.sh           # Initial setup script
├── manage-ses-iam.sh          # Management script
└── README.md                  # This file

Generated files:
├── .env.production.template   # Environment variables template
└── .env.rotated.template     # Rotated credentials (after rotation)
```

## Support

For issues or questions:

1. **Check this README** for common solutions
2. **Run diagnostic commands**:
   ```bash
   ./manage-ses-iam.sh status
   ./manage-ses-iam.sh test
   ```
3. **Review AWS documentation**: [AWS SES Developer Guide](https://docs.aws.amazon.com/ses/)
4. **Contact development team** for application-specific issues

---

**Created**: January 2025  
**Last Updated**: January 15, 2025  
**Version**: 1.0

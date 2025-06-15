# AWS SES Setup for Contact Forms and Career Applications

This document describes how to set up Amazon Simple Email Service (SES) for handling both contact form submissions and career application emails.

## Prerequisites

1. AWS Account with SES access
2. Verified email addresses in SES
3. AWS credentials with SES permissions

## Setup Steps

### 1. Configure AWS SES

1. Go to Amazon SES console
2. Verify your domain or email addresses:
   - Add `careers@elitizon.com` as a verified sender (for career applications)
   - Add `contact@elitizon.com` as a verified sender (for contact forms)
   - Add your domain if sending from multiple addresses
3. Request production access if needed (initially SES is in sandbox mode)

### 2. Create IAM User for SES

Create an IAM user with the following policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["ses:SendEmail", "ses:SendRawEmail"],
      "Resource": "*"
    }
  ]
}
```

### 3. Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
# AWS SES Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here

# Email Configuration
SES_FROM_EMAIL=careers@elitizon.com
SES_TO_EMAIL=careers@elitizon.com

# Application Base URL
NEXT_PUBLIC_BASE_URL=https://elitizon.com
```

**Note:** The same AWS SES configuration is used for both contact forms (`/api/contact`) and career applications (`/api/careers/apply`). The system will automatically use the appropriate email addresses and templates based on the form type.

### 4. Testing

1. Start the development server: `npm run dev`
2. **Contact Form Testing:**
   - Navigate to `/contact`
   - Fill out and submit the contact form
   - Check your email for both the inquiry notification and confirmation
3. **Career Application Testing:**
   - Navigate to `/careers/apply`
   - Fill out and submit the application form
   - Check your email for both the application notification and confirmation

## Email Templates

The system sends different emails based on the form type:

### Contact Form Emails

1. **Contact Inquiry Notification** (to contact@elitizon.com)

   - Contains all contact form details
   - Includes project requirements and budget
   - Formatted for sales team review

2. **Contact Confirmation Email** (to submitter)
   - Confirms message receipt
   - Explains response timeline
   - Provides next steps information

### Career Application Emails

1. **Application Notification** (to careers@elitizon.com)

   - Contains all application details
   - Formatted for easy review
   - Includes next steps for the hiring team

2. **Confirmation Email** (to applicant)
   - Confirms application receipt
   - Explains the review process
   - Provides contact information

## Production Considerations

1. **Rate Limits**: SES has sending limits that increase over time
2. **Bounce Handling**: Implement bounce and complaint handling
3. **Templates**: Consider using SES templates for better email management
4. **Monitoring**: Set up CloudWatch alarms for email sending metrics
5. **Security**: Use IAM roles instead of access keys in production

## Troubleshooting

### Common Issues

1. **Email not sending**: Check if sender email is verified
2. **Sandbox mode**: Request production access if needed
3. **Credentials**: Ensure AWS credentials have SES permissions
4. **Region**: Make sure you're using the correct AWS region

### Logs

Check the browser console and server logs for detailed error messages.

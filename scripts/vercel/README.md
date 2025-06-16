# Vercel Environment Variables Management

This directory contains scripts to manage environment variables for the Vercel project `prj_9n5L2nq9fuBEzwhsb5ihQXa85wDf`.

## Prerequisites

1. **Vercel CLI**: Install the Vercel CLI globally

   ```bash
   npm install -g vercel
   ```

2. **Authentication**: Login to Vercel

   ```bash
   vercel login
   ```

3. **Environment File**: Create `.env.local` file in the project root based on `.env.example`

## Scripts

### 1. update-env-vars.sh

Main script for updating environment variables on Vercel.

**Usage:**

```bash
# Update all environments (production, preview, development)
./scripts/vercel/update-env-vars.sh update

# Update specific environment
./scripts/vercel/update-env-vars.sh update production
./scripts/vercel/update-env-vars.sh update preview
./scripts/vercel/update-env-vars.sh update development

# List current environment variables
./scripts/vercel/update-env-vars.sh list

# Remove specific environment variable
./scripts/vercel/update-env-vars.sh remove AWS_REGION production

# Show help
./scripts/vercel/update-env-vars.sh help
```

### 2. sync-env-vars.sh

Utility script for environment variable management tasks.

**Usage:**

```bash
# Backup current environment variables
./scripts/vercel/sync-env-vars.sh backup

# Validate local .env.local file
./scripts/vercel/sync-env-vars.sh validate

# Compare local vs remote environment variables
./scripts/vercel/sync-env-vars.sh compare

# Generate .env.local template
./scripts/vercel/sync-env-vars.sh template

# Show project information
./scripts/vercel/sync-env-vars.sh info
```

## Environment Variables

Based on your `.env.example`, the following environment variables are used:

### AWS SES Configuration

- `AWS_REGION` - AWS region (e.g., us-east-1)
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key

### Email Configuration

- `SES_FROM_EMAIL` - Email address for sending emails
- `SES_TO_EMAIL` - Default recipient email
- `SES_CAREERS_EMAIL` - Careers email address

### Application Configuration

- `NEXT_PUBLIC_BASE_URL` - Base URL of the application
- `NEXT_PUBLIC_SITE_URL` - Site URL for SEO
- `NEXT_TELEMETRY_DISABLED` - Disable Next.js telemetry
- `NODE_ENV` - Environment (production/development)

### Optional Configuration

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics ID
- `CONTACT_FORM_TO_EMAIL` - Contact form recipient
- `CONTACT_FORM_FROM_EMAIL` - Contact form sender
- `RATE_LIMIT_WINDOW_MS` - Rate limiting window
- `RATE_LIMIT_MAX_REQUESTS` - Rate limiting max requests

## Quick Start

1. **Setup environment file:**

   ```bash
   # Generate template
   ./scripts/vercel/sync-env-vars.sh template

   # Copy to .env.local and edit with your values
   cp .env.local.template .env.local
   vi .env.local
   ```

2. **Validate your configuration:**

   ```bash
   ./scripts/vercel/sync-env-vars.sh validate
   ```

3. **Update Vercel environment variables:**

   ```bash
   ./scripts/vercel/update-env-vars.sh update
   ```

4. **Verify the update:**
   ```bash
   ./scripts/vercel/update-env-vars.sh list
   ```

## Security Best Practices

1. **Never commit `.env.local`** - This file contains sensitive information
2. **Use IAM roles with minimal permissions** for AWS credentials
3. **Regularly rotate AWS access keys**
4. **Use different AWS credentials for different environments**
5. **Monitor AWS CloudTrail for SES API usage**

## Troubleshooting

### Common Issues

1. **"Vercel CLI not found"**

   ```bash
   npm install -g vercel
   ```

2. **"Not authenticated"**

   ```bash
   vercel login
   ```

3. **"Project not found"**

   - Verify the project ID in the script
   - Check if you have access to the project

4. **"Environment variable not set"**
   - Check if `.env.local` exists and has the correct format
   - Validate the file using `sync-env-vars.sh validate`

### Debugging

Enable debug mode by setting:

```bash
export DEBUG=1
./scripts/vercel/update-env-vars.sh update
```

## Backup and Recovery

Always backup before making changes:

```bash
# Create backup
./scripts/vercel/sync-env-vars.sh backup

# This creates a file like: env-backup-20250615-143022.json
```

To restore from backup, use the Vercel dashboard or manually recreate variables.

## Project Information

- **Project ID**: `prj_9n5L2nq9fuBEzwhsb5ihQXa85wDf`
- **Framework**: Next.js
- **Deployment**: Vercel
- **Repository**: GitHub (elitizonweb_new)

## Support

For issues with these scripts, check:

1. Vercel CLI documentation: https://vercel.com/docs/cli
2. Project deployment logs in Vercel dashboard
3. AWS SES configuration in AWS Console

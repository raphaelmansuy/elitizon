# 🚀 Elitizon AWS SES Setup - Quick Reference

## TL;DR - Getting Started

```bash
# 1. Run the secure setup (one-time)
./scripts/aws/setup-ses-iam.sh

# 2. Check everything is working
./scripts/aws/validate-ses-setup.sh

# 3. Deploy with confidence
./scripts/deploy-netlify.sh
```

## What Was Created

### 🔐 Security-First IAM Setup

- **IAM User**: `elitizon-ses-user` with minimal permissions
- **IAM Policy**: `ElitizonSESPolicy` with resource restrictions
- **Access Keys**: Generated securely with rotation capability
- **Monitoring**: CloudWatch alarms for quota tracking

### 📁 Files Created

```
scripts/aws/
├── setup-ses-iam.sh          # Initial setup (run once)
├── manage-ses-iam.sh          # Ongoing management
├── validate-ses-setup.sh      # Validation and testing
└── README.md                  # Detailed documentation

docs/
└── SES_IAM_SECURITY.md        # Security documentation

Generated:
├── .env.production.template   # Your secure credentials
└── .env.rotated.template     # After key rotation
```

## 🛡️ Security Features

| Feature                   | Status | Description                    |
| ------------------------- | ------ | ------------------------------ |
| **Minimal Permissions**   | ✅     | Only SES send actions allowed  |
| **Resource Restrictions** | ✅     | Limited to verified identities |
| **Conditional Access**    | ✅     | FromAddress restrictions       |
| **No Wildcards**          | ✅     | Explicit resource ARNs         |
| **Monitoring**            | ✅     | CloudWatch metrics enabled     |
| **Key Rotation**          | ✅     | Built-in rotation script       |

## 📋 Daily Operations

### Check Status

```bash
./scripts/aws/manage-ses-iam.sh status
```

### Monitor Usage

```bash
./scripts/aws/manage-ses-iam.sh monitor
```

### Rotate Keys (Quarterly)

```bash
# 1. Generate new keys
./scripts/aws/manage-ses-iam.sh rotate

# 2. Update deployment environment
# 3. Test thoroughly
# 4. Clean up old keys
./scripts/aws/manage-ses-iam.sh cleanup-old-keys
```

## 🔧 Environment Setup

After running setup, add these to your deployment platform:

### Netlify

```
Site Settings → Environment Variables
```

### Vercel

```
Project Settings → Environment Variables
```

### Required Variables

```bash
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIA...           # From setup script
AWS_SECRET_ACCESS_KEY=...           # From setup script
SES_FROM_EMAIL=contact@elitizon.com
SES_TO_EMAIL=contact@elitizon.com
NEXT_PUBLIC_BASE_URL=https://elitizon.com
```

## 🎯 Website Email Flows

### Contact Form (`/contact` + home page)

```
User Form → /api/contact → SES → contact@elitizon.com
                        → SES → User (confirmation)
```

### Career Applications (`/careers/apply`)

```
User Form → /api/careers/apply → SES → careers@elitizon.com
                               → SES → Applicant (confirmation)
```

## ⚠️ Important Notes

### ✅ Do This

- ✅ Run validation script after setup
- ✅ Complete domain/email verification in AWS console
- ✅ Monitor usage regularly
- ✅ Rotate credentials quarterly
- ✅ Set up bounce/complaint handling

### ❌ Don't Do This

- ❌ Commit credentials to version control
- ❌ Use root account credentials
- ❌ Share access keys
- ❌ Skip monitoring setup
- ❌ Ignore bounce rates

## 🆘 Troubleshooting

### Email Not Sending

```bash
# Check verification status
./scripts/aws/manage-ses-iam.sh verify

# Validate complete setup
./scripts/aws/validate-ses-setup.sh
```

### Permission Errors

```bash
# Check IAM configuration
./scripts/aws/manage-ses-iam.sh status

# Common issue: Unverified email addresses
# Fix: Complete verification in AWS SES console
```

### High Bounce Rate

```bash
# Monitor statistics
./scripts/aws/manage-ses-iam.sh monitor

# Fix: Review email content and recipient lists
```

## 📈 Next Steps

1. **Complete Setup** ✅

   - [x] Run setup script
   - [x] Validate configuration
   - [ ] Complete email verification
   - [ ] Deploy to production

2. **Production Ready** 🎯

   - [ ] Request SES production access
   - [ ] Set up bounce/complaint handling
   - [ ] Configure monitoring alerts
   - [ ] Test email delivery

3. **Maintenance** 🔄
   - [ ] Schedule quarterly key rotation
   - [ ] Set up usage monitoring
   - [ ] Create incident response plan
   - [ ] Document procedures

## 📚 Learn More

- **Detailed Docs**: `docs/SES_IAM_SECURITY.md`
- **Script Help**: `./scripts/aws/manage-ses-iam.sh help`
- **AWS SES Guide**: https://docs.aws.amazon.com/ses/
- **Netlify Env Vars**: https://docs.netlify.com/environment-variables/

---

**Need Help?** Check the troubleshooting section or run the validation script!

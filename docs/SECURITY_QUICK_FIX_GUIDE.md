# Security Quick Fix Guide - Critical Issues

**IMMEDIATE ACTION REQUIRED** 🚨

This document provides step-by-step instructions to fix the 4 critical security vulnerabilities identified in the Elitizon web application.

## 🔴 Fix 1: Remove Debug Endpoint (5 minutes)

**Issue:** Debug endpoint exposing sensitive environment variables

### Steps:
1. Delete the debug endpoint file:
```bash
rm src/app/api/debug-email/route.ts
```

2. Commit the change:
```bash
git add -A
git commit -m "SECURITY: Remove debug email endpoint"
git push
```

**Status:** ✅ Complete

---

## 🔴 Fix 2: Environment-Based Logging (30 minutes)

**Issue:** Sensitive data logged to console in production

### Step 1: Create logger utility
Create `src/lib/logger.ts`:
```typescript
const isDevelopment = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

export const logger = {
  debug: (message: string, data?: any) => {
    if (isDevelopment || isTest) {
      console.log(`[DEBUG] ${message}`, data);
    }
  },
  info: (message: string, data?: any) => {
    console.log(`[INFO] ${message}`, isDevelopment ? data : '');
  },
  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${message}`, isDevelopment ? data : '');
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, isDevelopment ? error : 'Error occurred');
  }
};
```

### Step 2: Update contact route
Replace in `src/app/api/contact/route.ts`:
```typescript
// Replace these lines:
console.log("=== EMAIL DEBUG ===");
console.log("Form email (user input):", formData.email);
console.log("emailConfig.fromEmail:", emailConfig.fromEmail);
console.log("emailConfig.toEmail:", emailConfig.toEmail);
console.log("SES_FROM_EMAIL env var:", process.env.SES_FROM_EMAIL);
console.log("===================");

// With:
import { logger } from "@/lib/logger";

logger.debug("Email configuration check", {
  formEmail: formData.email,
  configFromEmail: emailConfig.fromEmail,
  configToEmail: emailConfig.toEmail
});
```

### Step 3: Update AWS SES library
Replace in `src/lib/aws-ses.ts`:
```typescript
// Replace:
console.error("AWS SES configuration error:", error);
console.error("SES Error:", error.message);

// With:
import { logger } from "./logger";

logger.error("AWS SES configuration error", error);
logger.error("SES Error", error);
```

**Status:** ⏳ In Progress

---

## 🔴 Fix 3: HTML Injection in Emails (20 minutes)

**Issue:** User input directly inserted into HTML email templates

### Step 1: Install DOMPurify
```bash
npm install dompurify @types/dompurify
```

### Step 2: Create sanitization utility
Create `src/lib/sanitize.ts`:
```typescript
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

// For server-side rendering
const window = new JSDOM('').window;
const purify = DOMPurify(window as any);

export function sanitizeHtml(html: string): string {
  return purify.sanitize(html, {
    ALLOWED_TAGS: ['br', 'p', 'strong', 'em', 'u'],
    ALLOWED_ATTR: []
  });
}

export function sanitizeText(text: string): string {
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}
```

### Step 3: Update email templates
In `src/app/api/contact/route.ts`, replace:
```typescript
// Replace:
<div class="message-box">
    ${formData.message.replace(/\n/g, "<br>")}
</div>

// With:
import { sanitizeText } from "@/lib/sanitize";

<div class="message-box">
    ${sanitizeText(formData.message).replace(/\n/g, "<br>")}
</div>
```

Apply the same fix to `src/app/api/careers/apply/route.ts`.

**Status:** ⏳ In Progress

---

## 🔴 Fix 4: Remove Dummy AWS Credentials (10 minutes)

**Issue:** Fallback to dummy credentials instead of failing securely

### Update AWS SES client
Replace in `src/lib/aws-ses.ts`:
```typescript
// Replace the entire createSESClient function:
export function createSESClient(): SESClient {
  const credentials = validateAWSCredentials();
  
  return new SESClient({
    region: credentials.region,
    credentials: {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
    },
  });
}
```

Remove this entire block:
```typescript
// DELETE THIS BLOCK:
} catch (error) {
  console.error("AWS SES configuration error:", error);
  // Return a dummy client for development environments
  return new SESClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: "dummy",
      secretAccessKey: "dummy",
    },
  });
}
```

**Status:** ⏳ In Progress

---

## Deployment Checklist

After making all changes:

1. **Test locally:**
```bash
npm run build
npm run start
```

2. **Test contact form:**
   - Fill out contact form
   - Check server logs for no sensitive data exposure
   - Verify email functionality works

3. **Security verification:**
```bash
# Check no debug endpoints exist
find src/app/api -name "*debug*" -type f

# Verify no console.log with sensitive data
grep -r "console.log.*process.env" src/
grep -r "console.log.*SES_" src/
```

4. **Deploy:**
```bash
git add -A
git commit -m "SECURITY: Fix critical vulnerabilities - logging, HTML injection, AWS credentials"
git push
```

5. **Post-deployment verification:**
   - Test contact form on production
   - Check production logs for no sensitive data
   - Verify no debug endpoints are accessible

## Emergency Rollback Plan

If issues occur after deployment:

1. **Immediate rollback:**
```bash
git revert HEAD
git push
```

2. **Check previous deployment:**
   - Verify previous version is working
   - Monitor error logs

3. **Re-apply fixes:**
   - Test more thoroughly in staging
   - Apply fixes incrementally

## Success Criteria

✅ All fixes applied:
- [ ] Debug endpoint removed
- [ ] Environment-based logging implemented  
- [ ] HTML sanitization added to email templates
- [ ] Dummy AWS credentials removed

✅ Testing completed:
- [ ] Local build successful
- [ ] Contact form working
- [ ] No sensitive data in logs
- [ ] Production deployment successful

✅ Security verification:
- [ ] No debug endpoints accessible
- [ ] No console.log with sensitive data
- [ ] HTML injection prevented
- [ ] AWS credentials secure

**Estimated Total Time:** 65 minutes
**Priority:** CRITICAL - Must be completed within 24 hours

---

**Need Help?**
- Review full security audit: `docs/SECURITY_AUDIT_REPORT.md`
- Complete action plan: `docs/SECURITY_ACTION_PLAN.md`
- Contact security team for assistance

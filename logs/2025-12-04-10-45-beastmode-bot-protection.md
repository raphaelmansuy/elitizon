# 2025-12-04-10-45 Bot Protection for Contact Form

## What was done

Implemented multi-layer bot protection for the contact form to prevent spam submissions like the one from "vwItAZeaYxUCUigQFAbhGlu".

### Files Created

- `src/lib/botProtection.ts` - Core bot protection utility with:
  - Honeypot field validation (detects bots that fill hidden fields)
  - Time-based validation (detects bots that submit too quickly < 3s)
  - Content analysis (detects gibberish names, spam patterns, excessive URLs)
  - Spam score calculation combining all checks

### Files Modified

- `src/lib/validation.ts` - Added `honeypot` and `formStartTime` fields to contact schema
- `src/components/Contact.tsx` - Added hidden honeypot field and form start timestamp tracking
- `src/components/ContactEnhanced.tsx` - Same changes as Contact.tsx
- `src/app/api/contact/route.ts` - Integrated bot protection check after validation

### Protection Layers

1. **Honeypot Field**: Hidden input field that legitimate users won't see or fill. Bots that automatically fill all fields will trigger this.

2. **Time-Based Validation**: Forms submitted in less than 3 seconds are flagged as suspicious (bots are fast). Forms older than 1 hour are rejected (prevents replay attacks).

3. **Content Analysis**:
   - Detects unusual character patterns (consecutive consonants like "vwItAZeaYxUCUigQFAbhGlu")
   - Detects suspicious mixed-case patterns
   - Identifies spam keywords (crypto, viagra, casino, etc.)
   - Flags excessive URLs in messages

### Key Design Decisions

- **Silent rejection**: Bot submissions return a fake success message to prevent bots from adapting
- **Logging**: All blocked submissions are logged with reason and spam score for monitoring
- **Scoring system**: Combined score from multiple checks determines if submission is blocked (threshold: 70)
- **Graceful degradation**: If timestamp is missing, only 30 points are added (not definitive)

## What went well

- Existing Joi validation patterns made schema updates seamless
- The project already had a logger utility ready to use
- Clean separation of bot protection logic into its own module

## What went wrong

- Nothing significant - straightforward implementation

## Lessons learned

- The spam submission "vwItAZeaYxUCUigQFAbhGlu" would have been caught by the content analysis (mixed case pattern detection)
- Honeypot fields should use innocuous names like "website_url" to trick bots
- Returning success for blocked bots prevents them from learning the detection patterns

## Test the implementation

The spam email example would be blocked because:

1. Name "vwItAZeaYxUCUigQFAbhGlu" matches mixed-case pattern → +40 points
2. Company "EQCLDLDXurjSqGqa" matches unusual character pattern → +25 points
3. Message "pRrykiUIzqvXCebDhh" is short gibberish → +50 points
4. **Total: 115 points (capped at 100)** → BLOCKED

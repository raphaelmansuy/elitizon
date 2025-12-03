/**
 * Bot Protection Utility
 *
 * Multi-layer protection against spam bots for contact forms:
 * 1. Honeypot field - Hidden field that bots often fill out
 * 2. Time-based validation - Submissions too fast are likely bots
 * 3. Content analysis - Detect spam patterns in submitted content
 */

import { logger } from "./logger";

// Minimum time (in milliseconds) a human would take to fill out the form
// Set to 3 seconds - too fast is suspicious
const MIN_FORM_SUBMISSION_TIME = 3000;

// Maximum time (in milliseconds) allowed for form submission
// Set to 1 hour - prevents replay attacks with stale tokens
const MAX_FORM_SUBMISSION_TIME = 60 * 60 * 1000;

export interface BotProtectionData {
  // Honeypot field - should always be empty for legitimate submissions
  honeypot?: string;
  // Timestamp when the form was rendered (client-side)
  formStartTime?: number;
}

export interface BotProtectionResult {
  isBot: boolean;
  reason?: string;
  score: number; // 0-100, higher = more likely to be a bot
}

/**
 * Check if the honeypot field was filled (indicates a bot)
 */
function checkHoneypot(honeypot?: string): {
  isSuspicious: boolean;
  score: number;
} {
  if (honeypot && honeypot.trim().length > 0) {
    logger.warn("Bot detected: Honeypot field was filled", {
      honeypot: honeypot.substring(0, 50),
    });
    return { isSuspicious: true, score: 100 };
  }
  return { isSuspicious: false, score: 0 };
}

/**
 * Check if the form was submitted too quickly (indicates a bot)
 */
function checkSubmissionTime(formStartTime?: number): {
  isSuspicious: boolean;
  score: number;
  reason?: string;
} {
  if (!formStartTime) {
    // No timestamp provided - suspicious but not definitive
    logger.warn("Bot detection: No form start time provided");
    return {
      isSuspicious: false,
      score: 30,
      reason: "Missing form start time",
    };
  }

  const now = Date.now();
  const elapsedTime = now - formStartTime;

  if (elapsedTime < MIN_FORM_SUBMISSION_TIME) {
    logger.warn("Bot detected: Form submitted too quickly", {
      elapsedTime,
      minRequired: MIN_FORM_SUBMISSION_TIME,
    });
    return {
      isSuspicious: true,
      score: 90,
      reason: `Form submitted in ${elapsedTime}ms (minimum: ${MIN_FORM_SUBMISSION_TIME}ms)`,
    };
  }

  if (elapsedTime > MAX_FORM_SUBMISSION_TIME) {
    logger.warn("Bot detection: Form submission too old", {
      elapsedTime,
      maxAllowed: MAX_FORM_SUBMISSION_TIME,
    });
    return {
      isSuspicious: true,
      score: 70,
      reason: "Form submission token expired",
    };
  }

  return { isSuspicious: false, score: 0 };
}

/**
 * Analyze content for spam patterns
 */
function analyzeContentForSpam(content: {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
}): { isSuspicious: boolean; score: number; reason?: string } {
  let spamScore = 0;
  const reasons: string[] = [];

  // Check for gibberish patterns in name (random characters)
  if (content.name) {
    // Pattern: more than 3 consecutive consonants is unusual for names
    const consonantPattern = /[bcdfghjklmnpqrstvwxz]{4,}/i;
    if (consonantPattern.test(content.name)) {
      spamScore += 30;
      reasons.push("Unusual character patterns in name");
    }

    // Pattern: name has unusual capitalization like "vwItAZeaYxUCUigQFAbhGlu"
    const mixedCasePattern = /[a-z][A-Z]{2,}[a-z]/;
    if (mixedCasePattern.test(content.name)) {
      spamScore += 40;
      reasons.push("Suspicious mixed case pattern in name");
    }

    // Very short or very long unusual names
    if (content.name.length > 50 && !/\s/.test(content.name)) {
      spamScore += 30;
      reasons.push("Unusually long single-word name");
    }
  }

  // Check for gibberish in company name
  if (content.company) {
    const consonantPattern = /[bcdfghjklmnpqrstvwxz]{4,}/i;
    if (consonantPattern.test(content.company)) {
      spamScore += 25;
      reasons.push("Unusual character patterns in company");
    }
  }

  // Check for very short nonsense messages
  if (content.message) {
    // Very short message with random characters
    if (
      content.message.length < 30 &&
      /^[a-zA-Z]{10,}$/.test(content.message.trim())
    ) {
      spamScore += 50;
      reasons.push("Short gibberish message");
    }

    // Check for spam keywords (common in spam submissions)
    const spamKeywords = [
      /\bcrypto\s*currency/i,
      /\bbitcoin\s*investment/i,
      /\bfree\s*money/i,
      /\bclick\s*here\s*now/i,
      /\bviagra/i,
      /\bcialis/i,
      /\bonline\s*casino/i,
      /\bseo\s*services/i,
      /\bbacklinks/i,
      /\bguaranteed\s*results/i,
    ];

    for (const pattern of spamKeywords) {
      if (pattern.test(content.message)) {
        spamScore += 40;
        reasons.push("Spam keywords detected");
        break;
      }
    }

    // Check for excessive URLs
    const urlPattern = /https?:\/\/[^\s]+/gi;
    const urlMatches = content.message.match(urlPattern);
    if (urlMatches && urlMatches.length > 2) {
      spamScore += 30;
      reasons.push("Excessive URLs in message");
    }
  }

  // Cap the score at 100
  spamScore = Math.min(spamScore, 100);

  return {
    isSuspicious: spamScore >= 60,
    score: spamScore,
    reason: reasons.length > 0 ? reasons.join("; ") : undefined,
  };
}

/**
 * Main bot protection check
 * Returns a result indicating whether the submission is likely from a bot
 */
export function checkForBot(
  protectionData: BotProtectionData,
  content: {
    name?: string;
    email?: string;
    company?: string;
    message?: string;
  }
): BotProtectionResult {
  // Check 1: Honeypot
  const honeypotResult = checkHoneypot(protectionData.honeypot);
  if (honeypotResult.isSuspicious) {
    return {
      isBot: true,
      reason: "Honeypot field filled",
      score: honeypotResult.score,
    };
  }

  // Check 2: Submission timing
  const timingResult = checkSubmissionTime(protectionData.formStartTime);
  if (timingResult.isSuspicious && timingResult.score >= 80) {
    return {
      isBot: true,
      reason: timingResult.reason || "Suspicious submission timing",
      score: timingResult.score,
    };
  }

  // Check 3: Content analysis
  const contentResult = analyzeContentForSpam(content);

  // Calculate combined score
  const combinedScore = Math.min(100, timingResult.score + contentResult.score);

  // If combined score is high enough, flag as bot
  if (combinedScore >= 70) {
    const reasons = [timingResult.reason, contentResult.reason]
      .filter(Boolean)
      .join("; ");

    logger.warn("Bot detected: High combined spam score", {
      combinedScore,
      reasons,
      content: {
        name: content.name?.substring(0, 30),
        company: content.company?.substring(0, 30),
        messageLength: content.message?.length,
      },
    });

    return {
      isBot: true,
      reason: reasons || "High spam probability",
      score: combinedScore,
    };
  }

  // Content analysis alone can flag as bot
  if (contentResult.isSuspicious) {
    logger.warn("Bot detected: Suspicious content", {
      score: contentResult.score,
      reason: contentResult.reason,
    });
    return {
      isBot: true,
      reason: contentResult.reason || "Suspicious content detected",
      score: contentResult.score,
    };
  }

  return {
    isBot: false,
    score: combinedScore,
  };
}

/**
 * Generate a form start timestamp token
 * This should be called when the form is rendered
 */
export function generateFormStartTime(): number {
  return Date.now();
}

/**
 * Validate that the form start time is a reasonable timestamp
 */
export function isValidFormStartTime(timestamp: unknown): timestamp is number {
  if (typeof timestamp !== "number") {
    return false;
  }

  const now = Date.now();
  // Must be a timestamp from the past but not too far in the past
  return (
    timestamp > 0 &&
    timestamp < now &&
    now - timestamp < MAX_FORM_SUBMISSION_TIME
  );
}

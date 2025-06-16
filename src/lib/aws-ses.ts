import { SESClient } from "@aws-sdk/client-ses";
import { logger } from "./logger";

// Validate and sanitize AWS credentials
export function validateAWSCredentials() {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID?.trim();
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY?.trim();
  const region = process.env.AWS_REGION?.trim() || "us-east-1";

  if (!accessKeyId || !secretAccessKey) {
    throw new Error("Missing AWS credentials");
  }

  // Validate that credentials don't contain invalid characters
  const validAccessKeyPattern = /^[A-Z0-9]+$/;
  const validSecretKeyPattern = /^[A-Za-z0-9/+=]+$/;

  if (!validAccessKeyPattern.test(accessKeyId)) {
    throw new Error("Invalid AWS Access Key ID format");
  }

  if (!validSecretKeyPattern.test(secretAccessKey)) {
    throw new Error("Invalid AWS Secret Access Key format");
  }

  return { accessKeyId, secretAccessKey, region };
}

// Create and configure AWS SES client
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

// Validate email configuration
export function validateEmailConfig() {
  const fromEmail = process.env.SES_FROM_EMAIL?.trim();
  const toEmail = process.env.SES_TO_EMAIL?.trim();
  const careersEmail = process.env.SES_CAREERS_EMAIL?.trim();

  if (!fromEmail) {
    throw new Error("Missing SES_FROM_EMAIL configuration");
  }

  if (!toEmail) {
    throw new Error("Missing SES_TO_EMAIL configuration");
  }

  return {
    fromEmail,
    toEmail,
    careersEmail: careersEmail || toEmail,
  };
}

// Handle AWS SES errors
export function handleSESError(error: unknown): {
  message: string;
  status: number;
} {
  if (error instanceof Error) {
    logger.error("SES Error", error);

    // Handle AccessDenied errors (often due to sandbox mode)
    if (error.message.includes("AccessDenied") || error.message.includes("not authorized")) {
      return {
        message: "Email service is in sandbox mode. Contact form received but confirmation email not sent.",
        status: 200, // Return 200 to indicate the form was processed successfully
      };
    }

    if (
      error.message.includes("AWS") ||
      error.message.includes("credentials")
    ) {
      return {
        message: "Service configuration error",
        status: 503,
      };
    }

    if (error.message.includes("Invalid character in header")) {
      return {
        message: "Authentication error",
        status: 503,
      };
    }

    if (error.message.includes("rate") || error.message.includes("throttl")) {
      return {
        message: "Service temporarily unavailable",
        status: 429,
      };
    }

    if (
      error.message.includes("verification") ||
      error.message.includes("not verified")
    ) {
      return {
        message: "Email verification required",
        status: 503,
      };
    }
  }

  return {
    message: "Service temporarily unavailable",
    status: 500,
  };
}

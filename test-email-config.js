#!/usr/bin/env node

// Test script to verify email configuration
const { validateEmailConfig } = require("./src/lib/aws-ses.ts");

console.log("=== EMAIL CONFIGURATION TEST ===");
console.log("Environment variables:");
console.log("- SES_FROM_EMAIL:", process.env.SES_FROM_EMAIL);
console.log("- SES_TO_EMAIL:", process.env.SES_TO_EMAIL);
console.log("- SES_CAREERS_EMAIL:", process.env.SES_CAREERS_EMAIL);

try {
  const config = validateEmailConfig();
  console.log("\nValidated configuration:");
  console.log("- fromEmail:", config.fromEmail);
  console.log("- toEmail:", config.toEmail);
  console.log("- careersEmail:", config.careersEmail);
} catch (error) {
  console.error("Configuration error:", error.message);
}

console.log("=================================");

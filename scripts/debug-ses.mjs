#!/usr/bin/env node

/**
 * Debug SES Configuration - Exact App Simulation
 * This script replicates exactly what the app does
 */

import dotenv from 'dotenv';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

// Load environment variables the same way the app does
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

console.log('🔧 Debugging SES Configuration (App Simulation)...\n');

// Replicate the validateAWSCredentials function from aws-ses.ts
function validateAWSCredentials() {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID?.trim();
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY?.trim();
  const region = process.env.AWS_REGION?.trim() || "us-east-1";

  console.log('📋 Environment Variables (from app perspective):');
  console.log('AWS_REGION:', region);
  console.log('AWS_ACCESS_KEY_ID:', accessKeyId ? '✅ Set' : '❌ Not set');
  console.log('AWS_SECRET_ACCESS_KEY:', secretAccessKey ? '✅ Set' : '❌ Not set');
  console.log('');

  if (!accessKeyId || !secretAccessKey) {
    throw new Error("Missing AWS credentials");
  }

  return { accessKeyId, secretAccessKey, region };
}

// Replicate the validateEmailConfig function from aws-ses.ts
function validateEmailConfig() {
  const fromEmail = process.env.SES_FROM_EMAIL?.trim();
  const toEmail = process.env.SES_TO_EMAIL?.trim();

  console.log('📧 Email Configuration:');
  console.log('SES_FROM_EMAIL:', fromEmail || 'Not set');
  console.log('SES_TO_EMAIL:', toEmail || 'Not set');
  console.log('');

  if (!fromEmail) {
    throw new Error("Missing SES_FROM_EMAIL configuration");
  }

  if (!toEmail) {
    throw new Error("Missing SES_TO_EMAIL configuration");
  }

  return { fromEmail, toEmail };
}

async function testExactAppFlow() {
  try {
    // Step 1: Validate credentials (same as app)
    const credentials = validateAWSCredentials();
    
    // Step 2: Create SES client (same as app)
    const sesClient = new SESClient({
      region: credentials.region,
      credentials: {
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
      },
    });

    // Step 3: Validate email config (same as app)
    const emailConfig = validateEmailConfig();

    // Step 4: Create the exact same email command as the app
    console.log('🧪 Testing exact same SendEmailCommand as the app...');
    console.log('Using region:', credentials.region);
    console.log('From:', emailConfig.fromEmail);
    console.log('To:', emailConfig.toEmail);
    console.log('');

    const command = new SendEmailCommand({
      Source: emailConfig.fromEmail,
      Destination: {
        ToAddresses: [emailConfig.toEmail],
      },
      Message: {
        Subject: {
          Data: "Test Contact Form Submission - Debug",
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Data: "<p>This is a test email to debug SES configuration.</p>",
            Charset: "UTF-8",
          },
          Text: {
            Data: "This is a test email to debug SES configuration.",
            Charset: "UTF-8",
          },
        },
      },
    });

    const result = await sesClient.send(command);
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', result.MessageId);

  } catch (error) {
    console.error('❌ Error occurred:', error.message);
    
    if (error.message.includes('AccessDenied')) {
      console.log('');
      console.log('🔍 AccessDenied Error Analysis:');
      console.log('1. This usually means the IAM user lacks proper SES permissions');
      console.log('2. Or the email identity is not verified in this region');
      console.log('3. Or there\'s a resource-level policy blocking the action');
      console.log('');
      console.log('💡 Potential Solutions:');
      console.log('1. Verify the email identity in AWS SES console for region:', process.env.AWS_REGION);
      console.log('2. Check IAM user permissions for SES actions');
      console.log('3. Try switching to us-east-1 region if that\'s where your identities are verified');
    }
  }
}

testExactAppFlow();

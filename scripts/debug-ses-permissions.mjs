#!/usr/bin/env node

/**
 * Debug SES Permissions
 * This script helps debug IAM permissions for SES
 */

import { SESClient, SendEmailCommand, GetSendQuotaCommand, ListIdentitiesCommand } from '@aws-sdk/client-ses';
import { STSClient, GetCallerIdentityCommand } from '@aws-sdk/client-sts';
import { readFileSync } from 'fs';

// Load environment variables from .env.local
function loadEnv() {
  try {
    const envContent = readFileSync('.env.local', 'utf8');
    const env = {};
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        env[key.trim()] = valueParts.join('=').trim();
      }
    });
    return env;
  } catch (error) {
    console.error('Could not load .env.local file:', error.message);
    return {};
  }
}

const env = loadEnv();

async function debugSESPermissions() {
  console.log('🔍 Debugging SES Permissions...\n');

  const regions = ['us-east-1', 'eu-west-1'];
  
  for (const region of regions) {
    console.log(`\n📍 Testing region: ${region}`);
    console.log('='.repeat(50));

    const sesClient = new SESClient({
      region: region,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const stsClient = new STSClient({
      region: region,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    try {
      // Test 1: Get caller identity
      console.log('👤 Checking AWS identity...');
      const identityCommand = new GetCallerIdentityCommand({});
      const identityResponse = await stsClient.send(identityCommand);
      console.log('✅ User ARN:', identityResponse.Arn);
      console.log('✅ Account ID:', identityResponse.Account);

      // Test 2: Check send quota (tests basic SES permissions)
      console.log('\n📊 Checking SES send quota...');
      const quotaCommand = new GetSendQuotaCommand({});
      const quotaResponse = await sesClient.send(quotaCommand);
      console.log('✅ Max 24 Hour Send:', quotaResponse.Max24HourSend);
      console.log('✅ Max Send Rate:', quotaResponse.MaxSendRate);
      console.log('✅ Sent Last 24 Hours:', quotaResponse.SentLast24Hours);

      // Test 3: List verified identities
      console.log('\n📧 Checking verified identities...');
      try {
        const identitiesCommand = new ListIdentitiesCommand({});
        const identitiesResponse = await sesClient.send(identitiesCommand);
        
        if (identitiesResponse.Identities.length === 0) {
          console.log('❌ No verified identities found in this region');
        } else {
          console.log('✅ Verified identities:');
          identitiesResponse.Identities.forEach(identity => {
            console.log(`  - ${identity}`);
          });
        }
      } catch (error) {
        console.log('❌ Cannot list identities:', error.message);
      }

      // Test 4: Try to send email
      console.log('\n📬 Testing email sending...');
      const testCommand = new SendEmailCommand({
        Source: env.SES_FROM_EMAIL || process.env.SES_FROM_EMAIL,
        Destination: {
          ToAddresses: [env.SES_TO_EMAIL || process.env.SES_TO_EMAIL],
        },
        Message: {
          Subject: {
            Data: `SES Permission Test - ${region}`,
            Charset: 'UTF-8',
          },
          Body: {
            Text: {
              Data: `This is a test email from ${region} region to verify SES permissions.`,
              Charset: 'UTF-8',
            },
          },
        },
      });

      await sesClient.send(testCommand);
      console.log('✅ Email sent successfully!');

    } catch (error) {
      console.error('❌ Error in region', region, ':', error.message);
      
      if (error.message.includes('AccessDenied')) {
        console.log('💡 AccessDenied error suggests IAM policy issues');
      }
      if (error.message.includes('not authorized')) {
        console.log('💡 Authorization error - check IAM policies');
      }
    }
  }

  console.log('\n🔧 Recommendations:');
  console.log('1. Check if your IAM policy is region-specific');
  console.log('2. Ensure your policy allows SES actions in the target region');
  console.log('3. Consider using us-east-1 if identities are verified there');
  console.log('4. Verify that contact@elitizon.com is verified in the target region');
}

// Run the debug
debugSESPermissions().catch(console.error);

#!/usr/bin/env node

/**
 * Test AWS SES Configuration
 * This script helps debug AWS SES setup issues
 */

import dotenv from 'dotenv';
import { SESClient, SendEmailCommand, GetSendQuotaCommand, ListIdentitiesCommand } from '@aws-sdk/client-ses';

dotenv.config({ path: '.env.local' });

async function testSESConfiguration() {
  console.log('🔧 Testing AWS SES Configuration...\n');

  // Check environment variables
  console.log('📋 Environment Variables:');
  console.log('AWS_REGION:', process.env.AWS_REGION || 'Not set');
  console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID ? '✅ Set' : '❌ Not set');
  console.log('AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY ? '✅ Set' : '❌ Not set');
  console.log('SES_FROM_EMAIL:', process.env.SES_FROM_EMAIL || 'Not set');
  console.log('SES_TO_EMAIL:', process.env.SES_TO_EMAIL || 'Not set');
  console.log('');

  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    console.log('❌ Missing AWS credentials. Please check your .env.local file.');
    return;
  }

  // Create SES client
  const sesClient = new SESClient({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  try {
    // Test 1: Check send quota
    console.log('📊 Checking SES send quota...');
    const quotaCommand = new GetSendQuotaCommand({});
    const quotaResponse = await sesClient.send(quotaCommand);
    
    console.log('Max 24 Hour Send:', quotaResponse.Max24HourSend);
    console.log('Max Send Rate:', quotaResponse.MaxSendRate);
    console.log('Sent Last 24 Hours:', quotaResponse.SentLast24Hours);
    console.log('');

    // Test 2: List verified identities
    console.log('📧 Checking verified email identities...');
    const identitiesCommand = new ListIdentitiesCommand({});
    const identitiesResponse = await sesClient.send(identitiesCommand);
    
    if (identitiesResponse.Identities.length === 0) {
      console.log('❌ No verified email identities found!');
      console.log('You need to verify email addresses in the AWS SES console first.');
    } else {
      console.log('✅ Verified identities:');
      identitiesResponse.Identities.forEach(identity => {
        console.log(`  - ${identity}`);
      });
    }
    console.log('');

    // Test 3: Check if FROM email is verified
    const fromEmail = process.env.SES_FROM_EMAIL;
    if (fromEmail) {
      if (identitiesResponse.Identities.includes(fromEmail)) {
        console.log(`✅ FROM email (${fromEmail}) is verified`);
      } else {
        console.log(`❌ FROM email (${fromEmail}) is NOT verified`);
        console.log('Please verify this email in the AWS SES console.');
      }
    }

    // Test 4: Send a test email (only to verified addresses)
    if (identitiesResponse.Identities.length > 0 && fromEmail) {
      console.log('');
      console.log('🧪 Testing email sending...');
      
      const testCommand = new SendEmailCommand({
        Source: fromEmail,
        Destination: {
          ToAddresses: [process.env.SES_TO_EMAIL || fromEmail],
        },
        Message: {
          Subject: {
            Data: 'SES Configuration Test',
            Charset: 'UTF-8',
          },
          Body: {
            Text: {
              Data: 'This is a test email to verify SES configuration is working correctly.',
              Charset: 'UTF-8',
            },
          },
        },
      });

      await sesClient.send(testCommand);
      console.log('✅ Test email sent successfully!');
    }

    console.log('');
    console.log('🎉 AWS SES configuration test completed!');

  } catch (error) {
    console.error('❌ Error testing SES configuration:', error.message);
    
    if (error.message.includes('AccessDenied')) {
      console.log('');
      console.log('💡 Tips for AccessDenied errors:');
      console.log('1. Make sure your AWS credentials have SES permissions');
      console.log('2. If SES is in sandbox mode, both sender and recipient must be verified');
      console.log('3. Request production access to send to any email address');
    }
  }
}

// Run the test
testSESConfiguration().catch(console.error);

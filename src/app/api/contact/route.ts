import { NextRequest, NextResponse } from "next/server";
import { SendEmailCommand } from "@aws-sdk/client-ses";
import {
  createSESClient,
  validateEmailConfig,
  handleSESError,
} from "@/lib/aws-ses";

// Configure AWS SES with validation
const sesClient = createSESClient();

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const formData: ContactFormData = await request.json();

    // Validate required fields
    const requiredFields = ["name", "email", "message"];

    for (const field of requiredFields) {
      if (!formData[field as keyof ContactFormData]) {
        return NextResponse.json(
          { message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate email configuration
    const emailConfig = validateEmailConfig();

    // Generate email content
    const emailContent = generateEmailContent(formData);

    // Send email using SES
    const command = new SendEmailCommand({
      Source: emailConfig.fromEmail,
      Destination: {
        ToAddresses: [emailConfig.toEmail],
      },
      Message: {
        Subject: {
          Data: `New Contact Form Submission from ${formData.name} - ${
            formData.company || "Individual"
          }`,
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Data: emailContent.html,
            Charset: "UTF-8",
          },
          Text: {
            Data: emailContent.text,
            Charset: "UTF-8",
          },
        },
      },
    });

    await sesClient.send(command);

    // Send confirmation email to the sender
    const confirmationCommand = new SendEmailCommand({
      Source: emailConfig.fromEmail,
      Destination: {
        ToAddresses: [formData.email],
      },
      Message: {
        Subject: {
          Data: "Thank you for contacting Elitizon - We'll be in touch soon!",
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Data: generateConfirmationEmail(formData),
            Charset: "UTF-8",
          },
        },
      },
    });

    await sesClient.send(confirmationCommand);

    return NextResponse.json(
      { message: "Contact form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);

    const errorResponse = handleSESError(error);
    return NextResponse.json(
      { message: errorResponse.message },
      { status: errorResponse.status }
    );
  }
}

function generateEmailContent(formData: ContactFormData) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>New Contact Form Submission</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #1e293b 0%, #ec4899 100%); color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .section { margin-bottom: 25px; }
            .section h2 { color: #ec4899; border-bottom: 2px solid #ec4899; padding-bottom: 5px; margin-bottom: 15px; }
            .field { margin-bottom: 12px; }
            .field strong { color: #1e293b; }
            .message-box { background: #f8fafc; padding: 15px; border-left: 4px solid #ec4899; border-radius: 0 4px 4px 0; }
            .footer { background: #f8fafc; padding: 20px; text-align: center; color: #64748b; }
            .priority { background: #fef2f2; border: 1px solid #fecaca; padding: 10px; border-radius: 4px; margin: 15px 0; }
            .priority.high { background: #fee2e2; border-color: #fca5a5; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>📧 New Contact Form Submission</h1>
            <p>A potential client has reached out through the website</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h2>👤 Contact Information</h2>
                <div class="field"><strong>Name:</strong> ${formData.name}</div>
                <div class="field"><strong>Email:</strong> <a href="mailto:${
                  formData.email
                }">${formData.email}</a></div>
                <div class="field"><strong>Company:</strong> ${
                  formData.company || "Not specified"
                }</div>
            </div>

            <div class="section">
                <h2>💼 Project Details</h2>
                <div class="field"><strong>Service Interest:</strong> ${
                  formData.service || "Not specified"
                }</div>
                <div class="field"><strong>Budget Range:</strong> ${
                  formData.budget || "Not specified"
                }</div>
                <div class="field"><strong>Timeline:</strong> ${
                  formData.timeline || "Not specified"
                }</div>
            </div>

            <div class="section">
                <h2>💬 Message</h2>
                <div class="message-box">
                    ${formData.message.replace(/\n/g, "<br>")}
                </div>
            </div>

            ${getBudgetPriority(formData.budget)}
        </div>

        <div class="footer">
            <p><strong>Recommended Next Steps:</strong></p>
            <p>1. Respond within 2-4 hours for optimal conversion</p>
            <p>2. Schedule a discovery call to understand their needs</p>
            <p>3. Prepare a customized proposal based on their requirements</p>
            <p>4. Follow up if no response within 24-48 hours</p>
        </div>
    </body>
    </html>
  `;

  const text = `
NEW CONTACT FORM SUBMISSION

CONTACT INFORMATION
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company || "Not specified"}

PROJECT DETAILS
Service Interest: ${formData.service || "Not specified"}
Budget Range: ${formData.budget || "Not specified"}
Timeline: ${formData.timeline || "Not specified"}

MESSAGE
${formData.message}

---
Submitted via Elitizon Contact Form
${new Date().toLocaleString()}
  `;

  return { html, text };
}

function getBudgetPriority(budget: string) {
  const highValueBudgets = ["€100k+", "€50k-100k", "$100k+", "$50k-100k"];
  const mediumValueBudgets = ["€25k-50k", "€10k-25k", "$25k-50k", "$10k-25k"];

  if (highValueBudgets.some((b) => budget?.includes(b.replace(/[€$]/, "")))) {
    return `
      <div class="priority high">
        <strong>🔥 HIGH PRIORITY:</strong> This is a high-value lead with significant budget potential. 
        Recommend immediate response within 1-2 hours.
      </div>
    `;
  } else if (
    mediumValueBudgets.some((b) => budget?.includes(b.replace(/[€$]/, "")))
  ) {
    return `
      <div class="priority">
        <strong>⚡ MEDIUM PRIORITY:</strong> This lead shows good potential. 
        Recommend response within 4-6 hours.
      </div>
    `;
  }
  return "";
}

function generateConfirmationEmail(formData: ContactFormData) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Thank you for contacting Elitizon</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #1e293b 0%, #ec4899 100%); color: white; padding: 30px 20px; text-align: center; }
            .content { padding: 30px 20px; }
            .highlight { background: #fce7f3; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .next-steps { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .footer { background: #1e293b; color: white; padding: 20px; text-align: center; }
            .cta-button { display: inline-block; background: #ec4899; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🎉 Thank You for Reaching Out!</h1>
            <p>We've received your message and will be in touch soon</p>
        </div>
        
        <div class="content">
            <p>Dear ${formData.name},</p>
            
            <p>Thank you for your interest in Elitizon's data engineering and AI consulting services. We have successfully received your message and our team will review your requirements.</p>
            
            <div class="highlight">
                <h3>📋 Your Submission Summary</h3>
                <p><strong>Name:</strong> ${formData.name}</p>
                <p><strong>Company:</strong> ${
                  formData.company || "Individual"
                }</p>
                <p><strong>Service Interest:</strong> ${
                  formData.service || "General Inquiry"
                }</p>
                <p><strong>Timeline:</strong> ${
                  formData.timeline || "Not specified"
                }</p>
            </div>

            <div class="next-steps">
                <h3>🚀 What Happens Next?</h3>
                <ol>
                    <li><strong>Initial Review (2-4 hours):</strong> Our team will review your requirements and project scope</li>
                    <li><strong>Discovery Call (24-48 hours):</strong> We'll reach out to schedule a consultation to better understand your needs</li>
                    <li><strong>Custom Proposal:</strong> Based on our discussion, we'll prepare a tailored solution and timeline</li>
                    <li><strong>Project Kickoff:</strong> Once approved, we'll match you with our best experts and begin your transformation</li>
                </ol>
            </div>

            <p><strong>Response Time:</strong> We typically respond to inquiries within 2-4 hours during business hours (CET/GMT+1). For urgent matters, feel free to reach out directly.</p>

            <p>While you wait, feel free to explore more about our services and recent success stories:</p>
            
            <p style="text-align: center;">
                <a href="${
                  process.env.NEXT_PUBLIC_BASE_URL || "https://elitizon.com"
                }/services" class="cta-button">Explore Our Services</a>
            </p>

            <p>If you have any immediate questions or need to add additional information to your request, please don't hesitate to reply to this email or contact us directly at <a href="mailto:contact@elitizon.com">contact@elitizon.com</a>.</p>

            <p>We're excited about the possibility of working together and helping you achieve your data and AI goals!</p>

            <p>Best regards,<br>
            <strong>The Elitizon Team</strong><br>
            <em>Your trusted partner in data & AI transformation</em></p>
        </div>

        <div class="footer">
            <p><strong>Elitizon Ltd</strong> - Premium Data & AI Consulting</p>
            <p>28 Mody Road, Room 2203, 22/F., CFC Tower<br>
            Tsim Sha Tsui, Hong Kong SAR</p>
            <p><a href="mailto:contact@elitizon.com" style="color: #fce7f3;">contact@elitizon.com</a></p>
        </div>
    </body>
    </html>
  `;
}

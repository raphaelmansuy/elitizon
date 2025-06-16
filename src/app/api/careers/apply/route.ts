import { NextRequest, NextResponse } from "next/server";
import { SendEmailCommand } from "@aws-sdk/client-ses";
import {
  createSESClient,
  validateEmailConfig,
  handleSESError,
} from "@/lib/aws-ses";

// Configure AWS SES with validation
const sesClient = createSESClient();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "location",
      "linkedinUrl",
      "currentTitle",
      "yearsExperience",
      "expertiseArea",
      "primarySkills",
      "availabilityType",
      "preferredRate",
      "timeZone",
      "previousExperience",
      "remoteExperience",
      "clientFacingExperience",
      "privacyConsent",
      "termsAgreement",
    ];

    for (const field of requiredFields) {
      if (
        !formData[field] ||
        (Array.isArray(formData[field]) && formData[field].length === 0)
      ) {
        return NextResponse.json(
          { message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email configuration
    const emailConfig = validateEmailConfig();

    // Generate email content
    const emailContent = generateEmailContent(formData);

    // Send email using SES
    const command = new SendEmailCommand({
      Source: emailConfig.fromEmail,
      Destination: {
        ToAddresses: [emailConfig.careersEmail],
      },
      Message: {
        Subject: {
          Data: `New Expert Application: ${formData.firstName} ${formData.lastName} - ${formData.expertiseArea}`,
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

    // Send confirmation email to applicant
    const confirmationCommand = new SendEmailCommand({
      Source: emailConfig.fromEmail,
      Destination: {
        ToAddresses: [formData.email],
      },
      Message: {
        Subject: {
          Data: "Application Received - Elitizon Expert Network",
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
      { message: "Application submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing application:", error);

    const errorResponse = handleSESError(error);
    return NextResponse.json(
      { message: errorResponse.message },
      { status: errorResponse.status }
    );
  }
}

interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  linkedinUrl: string;
  currentTitle: string;
  yearsExperience: string;
  expertiseArea: string;
  primarySkills: string[];
  secondarySkills: string[];
  availabilityType: string;
  preferredRate: string;
  timeZone: string;
  previousExperience: string;
  portfolioUrl: string;
  githubUrl: string;
  notableProjects: string;
  remoteExperience: string;
  clientFacingExperience: string;
  additionalInfo: string;
  privacyConsent: boolean;
  termsAgreement: boolean;
}

function generateEmailContent(formData: ApplicationData) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>New Expert Application</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: linear-gradient(135deg, #1e293b 0%, #ec4899 100%); color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .section { margin-bottom: 30px; }
            .section h2 { color: #ec4899; border-bottom: 2px solid #ec4899; padding-bottom: 5px; }
            .field { margin-bottom: 10px; }
            .field strong { color: #1e293b; }
            .skills { display: flex; flex-wrap: wrap; gap: 5px; }
            .skill-tag { background: #fce7f3; color: #be185d; padding: 3px 8px; border-radius: 4px; font-size: 12px; }
            .footer { background: #f8fafc; padding: 20px; text-align: center; color: #64748b; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🚀 New Expert Application</h1>
            <p>A new professional has applied to join the Elitizon network</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h2>📋 Personal Information</h2>
                <div class="field"><strong>Name:</strong> ${
                  formData.firstName
                } ${formData.lastName}</div>
                <div class="field"><strong>Email:</strong> ${
                  formData.email
                }</div>
                <div class="field"><strong>Phone:</strong> ${
                  formData.phone || "Not provided"
                }</div>
                <div class="field"><strong>Location:</strong> ${
                  formData.location
                }</div>
                <div class="field"><strong>LinkedIn:</strong> <a href="${
                  formData.linkedinUrl
                }">${formData.linkedinUrl}</a></div>
            </div>

            <div class="section">
                <h2>💼 Professional Information</h2>
                <div class="field"><strong>Current Title:</strong> ${
                  formData.currentTitle
                }</div>
                <div class="field"><strong>Years of Experience:</strong> ${
                  formData.yearsExperience
                }</div>
                <div class="field"><strong>Expertise Area:</strong> ${
                  formData.expertiseArea
                }</div>
                <div class="field">
                    <strong>Primary Skills:</strong><br>
                    <div class="skills">
                        ${formData.primarySkills
                          .map(
                            (skill: string) =>
                              `<span class="skill-tag">${skill}</span>`
                          )
                          .join("")}
                    </div>
                </div>
                ${
                  formData.secondarySkills.length > 0
                    ? `
                <div class="field">
                    <strong>Secondary Skills:</strong><br>
                    <div class="skills">
                        ${formData.secondarySkills
                          .map(
                            (skill: string) =>
                              `<span class="skill-tag">${skill}</span>`
                          )
                          .join("")}
                    </div>
                </div>
                `
                    : ""
                }
            </div>

            <div class="section">
                <h2>⏰ Availability & Preferences</h2>
                <div class="field"><strong>Availability Type:</strong> ${
                  formData.availabilityType
                }</div>
                <div class="field"><strong>Preferred Rate:</strong> ${
                  formData.preferredRate
                } EUR/hour</div>
                <div class="field"><strong>Time Zone:</strong> ${
                  formData.timeZone
                }</div>
            </div>

            <div class="section">
                <h2>🎯 Experience & Portfolio</h2>
                <div class="field">
                    <strong>Previous Experience:</strong><br>
                    ${formData.previousExperience.replace(/\n/g, "<br>")}
                </div>
                ${
                  formData.portfolioUrl
                    ? `<div class="field"><strong>Portfolio:</strong> <a href="${formData.portfolioUrl}">${formData.portfolioUrl}</a></div>`
                    : ""
                }
                ${
                  formData.githubUrl
                    ? `<div class="field"><strong>GitHub:</strong> <a href="${formData.githubUrl}">${formData.githubUrl}</a></div>`
                    : ""
                }
                ${
                  formData.notableProjects
                    ? `
                <div class="field">
                    <strong>Notable Projects:</strong><br>
                    ${formData.notableProjects.replace(/\n/g, "<br>")}
                </div>
                `
                    : ""
                }
            </div>

            <div class="section">
                <h2>🌍 Remote Work Experience</h2>
                <div class="field">
                    <strong>Remote Work Experience:</strong><br>
                    ${formData.remoteExperience.replace(/\n/g, "<br>")}
                </div>
                <div class="field">
                    <strong>Client-Facing Experience:</strong><br>
                    ${formData.clientFacingExperience.replace(/\n/g, "<br>")}
                </div>
            </div>

            ${
              formData.additionalInfo
                ? `
            <div class="section">
                <h2>ℹ️ Additional Information</h2>
                <div class="field">
                    ${formData.additionalInfo.replace(/\n/g, "<br>")}
                </div>
            </div>
            `
                : ""
            }

            <div class="section">
                <h2>✅ Consent & Agreements</h2>
                <div class="field"><strong>Privacy Consent:</strong> ${
                  formData.privacyConsent ? "Yes" : "No"
                }</div>
                <div class="field"><strong>Terms Agreement:</strong> ${
                  formData.termsAgreement ? "Yes" : "No"
                }</div>
            </div>
        </div>

        <div class="footer">
            <p><strong>Next Steps:</strong></p>
            <p>1. Review the application within 2-3 business days</p>
            <p>2. Conduct initial technical review</p>
            <p>3. Schedule expert interview if qualified</p>
            <p>4. Proceed with client simulation</p>
        </div>
    </body>
    </html>
  `;

  const text = `
NEW EXPERT APPLICATION - ${formData.firstName} ${formData.lastName}

PERSONAL INFORMATION
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone || "Not provided"}
Location: ${formData.location}
LinkedIn: ${formData.linkedinUrl}

PROFESSIONAL INFORMATION
Current Title: ${formData.currentTitle}
Years of Experience: ${formData.yearsExperience}
Expertise Area: ${formData.expertiseArea}
Primary Skills: ${formData.primarySkills.join(", ")}
${
  formData.secondarySkills.length > 0
    ? `Secondary Skills: ${formData.secondarySkills.join(", ")}`
    : ""
}

AVAILABILITY & PREFERENCES
Availability Type: ${formData.availabilityType}
Preferred Rate: ${formData.preferredRate} EUR/hour
Time Zone: ${formData.timeZone}

EXPERIENCE & PORTFOLIO
Previous Experience:
${formData.previousExperience}

${formData.portfolioUrl ? `Portfolio: ${formData.portfolioUrl}` : ""}
${formData.githubUrl ? `GitHub: ${formData.githubUrl}` : ""}

${
  formData.notableProjects
    ? `Notable Projects:\n${formData.notableProjects}`
    : ""
}

REMOTE WORK EXPERIENCE
${formData.remoteExperience}

CLIENT-FACING EXPERIENCE
${formData.clientFacingExperience}

${
  formData.additionalInfo
    ? `ADDITIONAL INFORMATION\n${formData.additionalInfo}`
    : ""
}

CONSENT & AGREEMENTS
Privacy Consent: ${formData.privacyConsent ? "Yes" : "No"}
Terms Agreement: ${formData.termsAgreement ? "Yes" : "No"}

---
Application submitted via Elitizon Careers Portal
  `;

  return { html, text };
}

function generateConfirmationEmail(formData: ApplicationData) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Application Received</title>
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
            <h1>🎉 Application Received!</h1>
            <p>Thank you for applying to join the Elitizon Expert Network</p>
        </div>
        
        <div class="content">
            <p>Dear ${formData.firstName},</p>
            
            <p>Thank you for your interest in joining our exclusive network of top-tier freelance experts. We have successfully received your application for the <strong>${
              formData.expertiseArea
            }</strong> position.</p>
            
            <div class="highlight">
                <h3>📋 Application Summary</h3>
                <p><strong>Name:</strong> ${formData.firstName} ${
    formData.lastName
  }</p>
                <p><strong>Expertise:</strong> ${formData.expertiseArea}</p>
                <p><strong>Experience:</strong> ${formData.yearsExperience}</p>
                <p><strong>Preferred Rate:</strong> ${
                  formData.preferredRate
                } EUR/hour</p>
            </div>

            <div class="next-steps">
                <h3>🚀 What Happens Next?</h3>
                <ol>
                    <li><strong>Technical Review (2-3 days):</strong> Our technical team will review your background and portfolio</li>
                    <li><strong>Expert Interview (45 minutes):</strong> If selected, we'll schedule a deep-dive technical discussion</li>
                    <li><strong>Client Simulation (30 minutes):</strong> A mock client presentation to assess communication skills</li>
                    <li><strong>Welcome to the Network:</strong> Onboarding and first project matching</li>
                </ol>
            </div>

            <p>We review applications on a rolling basis and will contact you within <strong>2-3 business days</strong> with an update on your application status.</p>

            <p>In the meantime, feel free to explore our current projects and learn more about our network:</p>
            
            <p style="text-align: center;">
                <a href="${
                  process.env.NEXT_PUBLIC_BASE_URL || "https://elitizon.com"
                }/services" class="cta-button">View Our Projects</a>
            </p>

            <p>If you have any questions about your application or the process, please don't hesitate to reach out to us at <a href="mailto:careers@elitizon.com">careers@elitizon.com</a>.</p>

            <p>Best regards,<br>
            <strong>The Elitizon Team</strong></p>
        </div>

        <div class="footer">
            <p><strong>Elitizon Ltd</strong> - Premium Data & AI Consulting</p>
            <p>Building the future with elite talent</p>
        </div>
    </body>
    </html>
  `;
}

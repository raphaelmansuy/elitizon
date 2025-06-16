import { NextRequest, NextResponse } from "next/server";
import { validateEmailConfig } from "@/lib/aws-ses";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    console.log("=== DEBUG TEST ===");
    console.log("Form data email:", formData.email);
    
    const emailConfig = validateEmailConfig();
    console.log("Email config fromEmail:", emailConfig.fromEmail);
    console.log("Email config toEmail:", emailConfig.toEmail);
    console.log("Process env SES_FROM_EMAIL:", process.env.SES_FROM_EMAIL);
    
    return NextResponse.json({
      message: "Debug info logged",
      formEmail: formData.email,
      configFromEmail: emailConfig.fromEmail,
      envFromEmail: process.env.SES_FROM_EMAIL
    });
    
  } catch (error) {
    console.error("Debug error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

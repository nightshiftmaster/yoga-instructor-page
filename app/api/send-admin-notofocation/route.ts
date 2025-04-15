import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const {
      to,
      subject,
      courseTitle,
      coursePrice,
      customerName,
      customerEmail,
      customerPhone,
    } = await request.json();

    // Check if we have email configuration
    const hasEmailConfig =
      process.env.EMAIL_SERVER_HOST &&
      process.env.EMAIL_SERVER_USER &&
      process.env.EMAIL_SERVER_PASSWORD;

    // If we don't have email config, return a mock success response
    if (!hasEmailConfig) {
      console.log("Email would be sent (development mode):", {
        to,
        subject,
        courseTitle,
        coursePrice,
        customerName,
        customerEmail,
        customerPhone,
      });

      return NextResponse.json({
        success: true,
        message: "Email notification skipped (development mode)",
        developmentMode: true,
      });
    }

    // Real email sending logic
    const nodemailer = require("nodemailer");

    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    // Email content
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <h2 style="color: #0BCEBC; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Course Enrollment</h2>
        
        <div style="margin: 20px 0;">
          <p><strong>Course:</strong> ${courseTitle}</p>
          <p><strong>Price:</strong> ${coursePrice}</p>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Customer Information</h3>
          <p><strong>Name:</strong> ${customerName}</p>
          <p><strong>Email:</strong> ${customerEmail}</p>
          <p><strong>Phone:</strong> ${customerPhone}</p>
        </div>
        
        <p style="color: #666; font-size: 14px; margin-top: 30px;">
          This is an automated notification. Please do not reply to this email.
        </p>
      </div>
    `;

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html: emailContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}

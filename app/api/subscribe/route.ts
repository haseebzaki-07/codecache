import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest, res: NextResponse) {
  const { email } = await req.json();

  // Validate email format
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return NextResponse.json({ message: "Invalid email address" });
  }

  // Configure Nodemailer
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // e.g., smtp.gmail.com
    port: process.env.SMTP_PORT, // e.g., 587
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // your SMTP username
      pass: process.env.SMTP_PASS, // your SMTP password
    },
  });

  // Email content
  const mailOptions = {
    from: "CodeCache", // sender address
    to: email, // list of receivers
    subject: "Subscription Confirmation",
    text: "Thank you for subscribing codecache! ",
    html: "<p>Thank you for subscribing! Stay Updated to our platform.</p>",
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({
      message: "Subscription successful, confirmation email sent!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "Error sending confirmation email" });
  }
}

// scripts/test-email.ts
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

interface SmtpError extends Error {
  response?: string;
  responseCode?: number;
  command?: string;
}

async function testEmail() {
  console.log('Testing email with configuration:');
  console.log(`SMTP User: ${process.env.SMTP_USER}`);
  console.log(`SMTP Host: smtp.gmail.com:587`);
  
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.error('❌ Error: SMTP_USER or SMTP_PASSWORD is not set in .env.local');
    process.exit(1);
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    },
    debug: true,
    logger: true
  });

  try {
    console.log('\nVerifying SMTP connection...');
    await transporter.verify();
    console.log('✅ Server is ready to send emails');

    console.log('\nSending test email...');
    const info = await transporter.sendMail({
      from: `"Test Sender" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: 'Test Email from The Samurai',
      text: 'This is a test email sent using Nodemailer with Gmail App Password.',
      html: `
        <h1>Test Email from The Samurai</h1>
        <p>This is a test email sent using Nodemailer with Gmail App Password.</p>
        <p>If you're seeing this, the email configuration is working correctly!</p>
      `
    });

    console.log('\n✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    
  } catch (error: unknown) {
    console.error('\n❌ Error sending test email:');
    
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      
      const smtpError = error as SmtpError;
      if (smtpError.response) {
        console.error('SMTP Error Response:', smtpError.response);
      }
      if (smtpError.command) {
        console.error('Failed command:', smtpError.command);
      }
    } else {
      console.error('An unknown error occurred:', error);
    }
    
    process.exit(1);
  }
}

testEmail().catch((error) => {
  console.error('Unhandled error in testEmail:', error);
  process.exit(1);
});
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
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
  const smtpPassword = process.env.SMTP_PASSWORD || process.env.SMTP_PASS;
  
  console.log('Testing email with configuration:');
  console.log(`SMTP Host: ${smtpHost}:${smtpPort}`);
  console.log(`SMTP User: ${process.env.SMTP_USER}`);
  
  if (!process.env.SMTP_USER || !smtpPassword) {
    console.error('❌ Error: SMTP_USER or SMTP_PASSWORD is not set in .env.local');
    process.exit(1);
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: smtpPassword,
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
    const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;
    const info = await transporter.sendMail({
      from: `"Test Sender" <${fromEmail}>`,
      to: fromEmail,
      subject: 'Test Email from The Samurai',
      text: 'This is a test email sent using Nodemailer with SendGrid.',
      html: `
        <h1>Test Email from The Samurai</h1>
        <p>This is a test email sent using Nodemailer with SendGrid.</p>
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
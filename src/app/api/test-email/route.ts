import { NextResponse } from 'next/server';
import { sendContactConfirmationEmail } from '@/lib/email';

export async function GET() {
  try {
    const testEmail = 'malokt12e@gmail.com';
    
    const result = await sendContactConfirmationEmail({
      name: 'Test User',
      email: testEmail,
      subject: 'Test Email from The Samurai',
      message: 'This is a test message to verify the email functionality is working correctly.\n\nThank you for using our service!',
      locale: 'en'
    });

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
      result
    });
  } catch (error) {
    console.error('Test email error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send test email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

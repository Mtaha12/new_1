import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';

interface NewsletterRequestBody {
  email?: string;
  locale?: string;
  source?: string;
}

const errorResponse = (message: string, status = 400) =>
  NextResponse.json({ success: false, error: message }, { status });

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Newsletter subscription endpoint is ready. Submit a POST request with an email address to subscribe.'
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as NewsletterRequestBody;

    const rawEmail = body.email?.trim();
    if (!rawEmail) {
      return errorResponse('Email is required', 400);
    }

    const email = rawEmail.toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return errorResponse('Invalid email address', 400);
    }

    const apiKey = process.env.MAILCHIMP_API_KEY;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
    const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX || apiKey?.split('-')[1];

    if (!apiKey || !audienceId || !serverPrefix) {
      console.error('Mailchimp configuration is missing');
      return errorResponse('Subscription service is unavailable. Please try again later.', 503);
    }

    const subscriberHash = createHash('md5').update(email).digest('hex');
    const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash}`;

    const payload = {
      email_address: email,
      status_if_new: 'subscribed',
      status: 'subscribed',
      language: body.locale || 'en',
      merge_fields: {},
    } as Record<string, unknown>;

    if (body.source) {
      payload.tags = [body.source];
    }

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json().catch(() => null);

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: 'You are subscribed to the newsletter.',
        id: responseData?.id,
      });
    }

    const mailchimpErrorTitle = responseData?.title as string | undefined;

    if (response.status === 400 && mailchimpErrorTitle === 'Member Exists') {
      return NextResponse.json(
        {
          success: true,
          message: 'This email is already subscribed.',
        },
        { status: 409 }
      );
    }

    console.error('Mailchimp subscription failed', {
      status: response.status,
      response: responseData,
    });

    return errorResponse(
      responseData?.detail || 'Unable to complete the subscription request.',
      response.status >= 500 ? 502 : response.status
    );
  } catch (error) {
    console.error('Unexpected newsletter subscription error', error);
    return errorResponse('Unable to complete the subscription request.', 500);
  }
}

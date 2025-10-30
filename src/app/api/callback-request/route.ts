import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import CallbackRequest from '@/models/CallbackRequest';

function normalizePhone(input: string) {
  return input.replace(/[\s-]+/g, '');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rawPhone = typeof body?.phone === 'string' ? body.phone.trim() : '';

    if (!rawPhone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    const phone = normalizePhone(rawPhone);
    if (!/^\+?[0-9]{6,18}$/.test(phone)) {
      return NextResponse.json({ error: 'Please provide a valid phone number' }, { status: 422 });
    }

    await connectDB();

    const callbackRequest = await CallbackRequest.create({ phone });

    return NextResponse.json(
      {
        success: true,
        message: 'Callback request recorded',
        data: { id: callbackRequest._id, createdAt: callbackRequest.createdAt }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Callback request error:', error);
    return NextResponse.json({ error: 'Failed to process callback request' }, { status: 500 });
  }
}

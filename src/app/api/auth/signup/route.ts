import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/database';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      password,
      confirmPassword
    }: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = body ?? {};

    const trimmedName = name?.trim() ?? '';
    const trimmedEmail = email?.trim().toLowerCase() ?? '';
    const trimmedPassword = password?.trim() ?? '';
    const trimmedConfirm = confirmPassword?.trim() ?? '';

    if (!trimmedName || !trimmedEmail || !trimmedPassword || !trimmedConfirm) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (trimmedName.length < 2) {
      return NextResponse.json({ error: 'Name must be at least 2 characters long' }, { status: 400 });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    if (trimmedPassword.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters long' }, { status: 400 });
    }

    if (trimmedPassword !== trimmedConfirm) {
      return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 });
    }

    await connectDB();

    const existingUser = await User.findOne({ email: trimmedEmail }).lean();
    if (existingUser) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(trimmedPassword, 12);

    const createdUser = await User.create({
      name: trimmedName,
      email: trimmedEmail,
      password: hashedPassword
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully.',
        user: {
          id: createdUser._id,
          name: createdUser.name,
          email: createdUser.email,
          createdAt: createdUser.createdAt
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      {
        error: 'Failed to create account',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

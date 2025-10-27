import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Content from '@/models/Content';

interface Params {
  params: Promise<{ slug: string }>;
}

export async function GET(_: Request, { params }: Params) {
  try {
    const { slug } = await params;
    await connectDB();
    const item = await Content.findOne({ slug }).lean();
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ item });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { slug } = await params;
    const body = await request.json();
    await connectDB();
    const updated = await Content.findOneAndUpdate({ slug }, body, { new: true, upsert: false }).lean();
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ item: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}



import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Content from '@/models/Content';

// GET - Fetch all content
export async function GET() {
  try {
    await connectDB();
    
    const contents = await Content.find({});
    
    return NextResponse.json({
      status: 'success',
      data: contents,
      count: contents.length
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: 'Failed to fetch content',
      error: error.message
    }, { status: 500 });
  }
}

// POST - Create new multilingual content
export async function POST(request: Request) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    const newContent = new Content({
      slug: body.slug,
      en: {
        title: body.en.title,
        description: body.en.description,
        content: body.en.content
      },
      ar: {
        title: body.ar.title,
        description: body.ar.description,
        content: body.ar.content
      },
      category: body.category
    });
    
    const savedContent = await newContent.save();
    
    return NextResponse.json({
      status: 'success',
      message: 'Content created successfully',
      data: savedContent
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: 'Failed to create content',
      error: error.message
    }, { status: 500 });
  }
}
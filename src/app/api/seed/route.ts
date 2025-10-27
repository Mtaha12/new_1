import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Content from '@/models/Content';

export async function POST() {
  try {
    await connectDB();

    const seedItems = [
      {
        slug: 'homepage',
        category: 'page',
        en: { title: 'Home', description: 'Welcome', content: 'Home page content' },
        ar: { title: 'الرئيسية', description: 'مرحباً', content: 'محتوى الصفحة الرئيسية' }
      },
      {
        slug: 'about',
        category: 'page',
        en: { title: 'About', description: 'About us', content: 'About page content' },
        ar: { title: 'من نحن', description: 'عنّا', content: 'محتوى صفحة من نحن' }
      },
      {
        slug: 'services',
        category: 'page',
        en: { title: 'Services', description: 'Our services', content: 'Services page content' },
        ar: { title: 'خدماتنا', description: 'خدماتنا', content: 'محتوى صفحة الخدمات' }
      }
    ];

    // Upsert each doc by slug
    const results = [] as any[];
    for (const item of seedItems) {
      const updated = await Content.findOneAndUpdate(
        { slug: item.slug },
        item,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      ).lean();
      results.push(updated);
    }

    return NextResponse.json({ seeded: results.length, items: results }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to seed content' }, { status: 500 });
  }
}



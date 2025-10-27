export const dynamic = 'force-dynamic';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { listBlogArticles, getBlogArticle, BlogLocale } from '@/data/blogPosts';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const localeFallback: BlogLocale = 'en';

type ArticlePageProps = {
  params: {
    slug: string;
    locale?: string;
  };
};

export const revalidate = 0; // ensures NO static caching

// Safe metadata generation
export function generateMetadata({ params }: ArticlePageProps): Metadata {
  try {
    const article = getBlogArticle(params.slug);
    if (!article) {
      return {
        title: 'Article not found',
        description: 'The requested article could not be located.'
      };
    }

    const locale = params.locale === 'ar' ? 'ar' : localeFallback;
    const content = article[locale];

    return {
      title: content?.title || 'Article',
      description: content?.description?.slice(0, 155) || 'Blog article'
    };
  } catch {
    return {
      title: 'Article',
      description: 'Blog article'
    };
  }
}

export default async function BlogArticlePage({ params }: ArticlePageProps) {
  let article;
  
  try {
    article = getBlogArticle(params.slug);
    console.log('Fetched article for slug:', params.slug, article ? 'found' : 'not found');
  } catch (error) {
    console.error('Error fetching article for slug:', params.slug, error);
    notFound();
  }

  if (!article) {
    notFound();
  }

  const locale: BlogLocale = params.locale === 'ar' ? 'ar' : localeFallback;
  const content = article[locale];
  
  // Validate content structure before rendering
  if (!content || typeof content !== 'object') {
    console.error('Invalid content structure for article:', params.slug, content);
    notFound();
  }

  const isArabic = locale === 'ar';
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Header />
      <main style={{ flex: 1 }}>
      </main>
      <Footer />
    </div>
  );
}

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BlogLanding, { BlogResource } from '@/components/blog/BlogLanding';
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-static';
export const revalidate = false;

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
};

type BlogPageProps = {
  params: {
    locale: string;
  };
};

export default async function BlogPage({ params }: BlogPageProps) {
  const locale = params.locale ?? 'en';
  const localePrefix = `/${locale}`;

  const [t, common] = await Promise.all([
    getTranslations({ locale, namespace: 'Blog' }),
    getTranslations({ locale, namespace: 'Common' })
  ]);

  const featuredPosts = (t.raw('featuredPosts') as BlogPost[]) ?? [];
  const latestPosts = (t.raw('latestPosts') as BlogPost[]) ?? [];
  const categories = (t.raw('categoriesList') as string[]) ?? [];
  const resources = (t.raw('resourcesCards') as BlogResource[]) ?? [];

  const strings = {
    title: t('title'),
    description: t('description'),
    featuredStories: t('featuredStories'),
    featuredIntro: t('featuredIntro'),
    recentPosts: t('recentPosts'),
    categories: t('categories'),
    tags: t('tags'),
    tagsIntro: t('tagsIntro'),
    readMore: common('readMore'),
    resourcesTitle: t('resourcesTitle'),
    resourcesIntro: t('resourcesIntro'),
    ctaTitle: t('ctaTitle'),
    ctaDescription: t('ctaDescription'),
    ctaButton: t('ctaButton'),
    ctaHref: t('ctaHref')
  };

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
      <BlogLanding
        locale={locale}
        localePrefix={localePrefix}
        strings={strings}
        categories={categories}
        featuredPosts={featuredPosts}
        latestPosts={latestPosts}
        resources={resources}
      />
      <Footer />
    </div>
  );
}

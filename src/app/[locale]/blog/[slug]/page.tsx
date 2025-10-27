import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { listBlogArticles, getBlogArticle, BlogLocale, BlogSection } from '@/data/blogPosts';
import { locales, defaultLocale } from '@/i18n';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-static';
export const revalidate = false;

type ArticlePageParams = {
  locale: string;
  slug: string;
};

type ArticlePageProps = {
  params: ArticlePageParams;
};

function resolveLocale(rawLocale: string | undefined): BlogLocale {
  if (!rawLocale) {
    return defaultLocale as BlogLocale;
  }

  return locales.includes(rawLocale as (typeof locales)[number])
    ? (rawLocale as BlogLocale)
    : (defaultLocale as BlogLocale);
}

export function generateStaticParams() {
  const articles = listBlogArticles();

  return locales.flatMap((locale) =>
    articles.map((article) => ({
      locale,
      slug: article.slug
    }))
  );
}

export function generateMetadata({ params }: ArticlePageProps): Metadata {
  const article = getBlogArticle(params.slug);

  if (!article) {
    return {
      title: 'Article not found',
      description: 'The requested article could not be located.'
    };
  }

  const locale = resolveLocale(params.locale);
  const content = article[locale];

  return {
    title: content.title,
    description: content.description.slice(0, 155)
  };
}

export default function BlogArticlePage({ params }: ArticlePageProps) {
  const article = getBlogArticle(params.slug);

  if (!article) {
    notFound();
  }

  const locale = resolveLocale(params.locale);
  const localePrefix = `/${locale}`;
  const content = article[locale];

  if (!content) {
    notFound();
  }

  const sections = (content.sections ?? []) as BlogSection[];
  const takeaways = content.takeaways ?? [];

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
        <div
          style={{
            background: 'linear-gradient(135deg, #1a1f71 0%, #0a0e3d 55%, #00bcd4 100%)',
            color: '#fff',
            padding: 'clamp(3.5rem, 9vw, 5rem) clamp(1.5rem, 5vw, 3rem)'
          }}
        >
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <nav style={{ marginBottom: '1.5rem', fontSize: '0.95rem', opacity: 0.85 }}>
              <Link
                href={`${localePrefix}/blog`}
                style={{ color: '#69E8E1', textDecoration: 'none', fontWeight: 600 }}
              >
                {locale === 'ar' ? 'المدونة' : 'Blog'}
              </Link>{' '}
              <span aria-hidden>·</span>{' '}
              <span>{article.category}</span>
            </nav>

            <p
              style={{
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                fontSize: '0.85rem',
                opacity: 0.7,
                marginBottom: '1rem'
              }}
            >
              {article.category}
            </p>
            <h1
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 3.6rem)',
                fontWeight: 800,
                lineHeight: 1.2,
                marginBottom: '1rem'
              }}
            >
              {content.title}
            </h1>
            <p
              style={{
                fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
                lineHeight: 1.8,
                opacity: 0.85,
                marginBottom: '2rem'
              }}
            >
              {content.kicker}
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.5rem',
                fontSize: '0.95rem',
                opacity: 0.85
              }}
            >
              <span>{article.date}</span>
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>

        <article
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            padding: 'clamp(2.5rem, 7vw, 4.5rem) clamp(1.5rem, 5vw, 3rem)',
            color: '#1a1f71'
          }}
        >
          <p
            style={{
              fontSize: '1.1rem',
              lineHeight: 1.9,
              color: '#2d3748',
              marginBottom: '2.5rem'
            }}
          >
            {content.description}
          </p>

          {sections.map((section, index) => (
            <section
              key={section.heading ?? index}
              style={{
                marginBottom: '2.75rem',
                borderRadius: '18px',
                background: '#f8fafc',
                padding: 'clamp(1.5rem, 3vw, 2rem)'
              }}
            >
              <h2
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 700,
                  color: '#0a0e3d',
                  marginBottom: '1rem'
                }}
              >
                {section.heading}
              </h2>
              {(section.paragraphs ?? []).map((paragraph, paragraphIndex) => (
                <p
                  key={paragraphIndex}
                  style={{
                    fontSize: '1rem',
                    lineHeight: 1.8,
                    color: '#4a5568',
                    marginTop: paragraphIndex > 0 ? '1.25rem' : 0
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          {takeaways.length > 0 && (
            <section
              style={{
                marginTop: '3rem',
                background: '#0a0e3d',
                color: '#fff',
                borderRadius: '18px',
                padding: 'clamp(1.75rem, 4vw, 2.5rem)'
              }}
            >
              <h3
                style={{
                  fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
                  fontWeight: 700,
                  marginBottom: '1rem'
                }}
              >
                {locale === 'ar' ? 'أبرز النقاط' : 'Key Takeaways'}
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'grid',
                  gap: '0.85rem'
                }}
              >
                {takeaways.map((takeaway, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      gap: '0.75rem',
                      alignItems: 'flex-start',
                      fontSize: '1rem',
                      lineHeight: 1.7
                    }}
                  >
                    <span aria-hidden style={{ color: '#69E8E1', fontWeight: 700 }}>
                      •
                    </span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {content.conclusion && (
            <section
              style={{
                marginTop: '3rem',
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                background: '#f8fafc',
                borderRadius: '18px'
              }}
            >
              <h3
                style={{
                  fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  color: '#0a0e3d'
                }}
              >
                {locale === 'ar' ? 'الخلاصة' : 'Conclusion'}
              </h3>
              <p
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.8,
                  color: '#4a5568'
                }}
              >
                {content.conclusion}
              </p>
            </section>
          )}

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '3.5rem',
              gap: '1rem',
              flexWrap: 'wrap'
            }}
          >
            <Link
              href={`${localePrefix}/blog`}
              style={{
                color: '#0a0e3d',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              ← {locale === 'ar' ? 'العودة إلى المدونة' : 'Back to all articles'}
            </Link>
            <Link
              href={`${localePrefix}/contact`}
              style={{
                background: '#00bcd4',
                color: '#fff',
                borderRadius: '30px',
                padding: '0.9rem 2.2rem',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              {locale === 'ar' ? 'تحدث مع خبير' : 'Talk to an expert'}
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

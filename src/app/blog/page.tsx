export const dynamic = 'force-static';
export const revalidate = false;

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
};

export default async function BlogPage() {
  const t = await getTranslations({ namespace: 'Blog' });
  const common = await getTranslations({ namespace: 'Common' });
  const locale = await getLocale();
  const localePrefix = locale === 'ar' ? '/ar' : '/en';

  const featuredPosts = t.raw('featuredPosts') as BlogPost[];
  const latestPosts = t.raw('latestPosts') as BlogPost[];
  const categories = t.raw('categoriesList') as string[];

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
        <section
        style={{
          background: 'linear-gradient(135deg, #1a1f71 0%, #0a0e3d 50%, #00bcd4 100%)',
          padding: 'clamp(3.5rem, 9vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
          textAlign: 'center',
          color: '#fff'
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              marginBottom: '1.5rem'
            }}
          >
            {t('title')}
          </h1>
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              lineHeight: 1.8,
              opacity: 0.9,
              marginBottom: '2.5rem'
            }}
          >
            {t('description')}
          </p>
          <button
            style={{
              background: '#00bcd4',
              color: '#fff',
              border: 'none',
              padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1.75rem, 4vw, 2.75rem)',
              borderRadius: '30px',
              fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(0, 188, 212, 0.25)'
            }}
          >
            {common('readMore')}
          </button>
        </div>
      </section>

      <section
        style={{
          padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
          maxWidth: '1400px',
          margin: '0 auto'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(2rem, 6vw, 3rem)'
          }}
        >
          <div>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                fontWeight: 800,
                color: '#0a0e3d',
                marginBottom: '1rem'
              }}
            >
              {t('featuredStories')}
            </h2>
            <p
              style={{
                color: '#666',
                lineHeight: 1.7,
                fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
                maxWidth: '720px'
              }}
            >
              {t('featuredIntro')}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: 'clamp(1.5rem, 4vw, 2rem)'
            }}
          >
            {featuredPosts.map((post) => (
              <div
                key={post.id}
                style={{
                  background: '#1a1f71',
                  borderRadius: '18px',
                  padding: '2.25rem',
                  color: '#fff',
                  minHeight: '320px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  border: '1px solid rgba(105, 232, 225, 0.25)'
                }}
              >
                <span
                  style={{
                    alignSelf: 'flex-start',
                    padding: '0.4rem 0.9rem',
                    borderRadius: '999px',
                    background: 'rgba(105, 232, 225, 0.2)',
                    color: '#69E8E1',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em'
                  }}
                >
                  {post.category}
                </span>
                <h3
                  style={{
                    fontSize: 'clamp(1.3rem, 2vw, 1.6rem)',
                    fontWeight: 700,
                    lineHeight: 1.4
                  }}
                >
                  {post.title}
                </h3>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.75)',
                    lineHeight: 1.7,
                    fontSize: '0.95rem',
                    flexGrow: 1
                  }}
                >
                  {post.excerpt}
                </p>
                <Link
                  href={`${localePrefix}/blog/${post.slug}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: '#69E8E1',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  {t('readMore')} →
                </Link>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.85rem',
                    opacity: 0.8
                  }}
                >
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          background: '#f8f9fa',
          padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)'
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(2rem, 5vw, 3rem)'
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '18px',
              padding: '2rem',
              boxShadow: '0 12px 30px rgba(10, 14, 61, 0.08)'
            }}
          >
            <h3
              style={{
                fontSize: '1.15rem',
                fontWeight: 700,
                color: '#0a0e3d',
                marginBottom: '1.25rem'
              }}
            >
              {t('categories')}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
              {categories.map((category) => (
                <span
                  key={category}
                  style={{
                    padding: '0.55rem 1.05rem',
                    borderRadius: '999px',
                    background: 'rgba(10,14,61,0.07)',
                    color: '#0a0e3d',
                    fontSize: '0.9rem',
                    fontWeight: 500
                  }}
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              background: '#fff',
              borderRadius: '18px',
              padding: '2rem',
              boxShadow: '0 12px 30px rgba(10, 14, 61, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            <h3
              style={{
                fontSize: '1.15rem',
                fontWeight: 700,
                color: '#0a0e3d'
              }}
            >
              {t('tags')}
            </h3>
            <p
              style={{
                color: '#666',
                lineHeight: 1.7,
                fontSize: '0.95rem'
              }}
            >
              {t('tagsIntro')}
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          background: '#0a0e3d',
          padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)'
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1.5rem',
              flexWrap: 'wrap',
              marginBottom: 'clamp(2.5rem, 6vw, 3.5rem)'
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
                fontWeight: 800,
                color: '#fff'
              }}
            >
              {t('recentPosts')}
            </h2>
            <a
              href={`${localePrefix}/blog/${latestPosts[0]?.slug ?? ''}`}
              style={{
                color: '#69E8E1',
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: '0.95rem'
              }}
            >
              {common('readMore')} →
            </a>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: 'clamp(1.5rem, 4vw, 2rem)'
            }}
          >
            {latestPosts.map((post, index) => (
              <div
                key={`${post.id}-${index}`}
                style={{
                  background: '#11153d',
                  borderRadius: '16px',
                  padding: '2rem',
                  color: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  border: '1px solid rgba(105, 232, 225, 0.18)'
                }}
              >
                <h3
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    lineHeight: 1.4
                  }}
                >
                  {post.title}
                </h3>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.75)',
                    lineHeight: 1.7,
                    fontSize: '0.95rem',
                    flexGrow: 1
                  }}
                >
                  {post.excerpt}
                </p>
                <Link
                  href={`${localePrefix}/blog/${post.slug}`}
                  style={{
                    color: '#69E8E1',
                    textDecoration: 'none',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  {t('readMore')} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

        <section
          style={{
            background: '#f8f9fa',
            padding: 'clamp(2.5rem, 7vw, 4.5rem) clamp(1.5rem, 5vw, 3rem)',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              maxWidth: '720px',
              margin: '0 auto',
              background: '#fff',
              borderRadius: '24px',
              padding: 'clamp(2rem, 6vw, 3rem)',
              boxShadow: '0 20px 45px rgba(10, 14, 61, 0.1)'
            }}
          >
            <h3
              style={{
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                fontWeight: 800,
                color: '#0a0e3d',
                marginBottom: '1rem'
              }}
            >
              {t('newsletterTitle')}
            </h3>
            <p
              style={{
                color: '#666',
                lineHeight: 1.8,
                fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
                marginBottom: '2rem'
              }}
            >
              {t('newsletterIntro')}
            </p>
            <button
              style={{
                background: '#0a0e3d',
                color: '#fff',
                border: 'none',
                padding: '0.85rem 2.5rem',
                borderRadius: '30px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {common('getStarted')}
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CSSProperties, FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import Footer from '@/components/layout/Footer';
import FloatingCTA from '@/components/ui/FloatingCTA';

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
  image?: string;
};

type BlogLandingProps = {
  locale: string;
  localePrefix: string;
  strings: {
    title: string;
    description: string;
    featuredStories: string;
    featuredIntro: string;
    recentPosts: string;
    categories: string;
    tags: string;
    tagsIntro: string;
    readMore: string;
    resourcesTitle: string;
    resourcesIntro: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButton: string;
    ctaHref: string;
    heroCta?: string;
  };
  categories: string[];
  featuredPosts: BlogPost[];
  latestPosts: BlogPost[];
  resources: BlogResource[];
};

export type BlogResource = {
  title: string;
  tag: string;
  image: string;
  href?: string;
  description?: string;
};

const DEFAULT_RESOURCES: BlogResource[] = [
  {
    title: 'Top 10 Penetration Testing Tools Cybersecurity Experts Are Using Right Now',
    tag: 'Cybersecurity',
    image: '/img/resource1.jpg',
    href: '/resources/top-penetration-testing-tools'
  },
  {
    title: 'Top Cybersecurity Services Businesses Need in 2025',
    tag: 'Strategy',
    image: '/img/resource2.jpg',
    href: '/resources/cybersecurity-services-2025'
  },
  {
    title: 'Black Hat USA 2025 Closes Out on a High Note in Las Vegas',
    tag: 'Threat Intel',
    image: '/img/resource3.jpg',
    href: '/resources/black-hat-usa-2025-recap'
  }
];

type BlogCollections = {
  featuredPosts: BlogPost[];
  latestPosts: BlogPost[];
};

type AdminFormState = {
  list: 'featuredPosts' | 'latestPosts';
  id?: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
};

const ADMIN_EMAIL = 'mtaha2004.22.2@gmail.com';
const NORMALIZED_ADMIN_EMAIL = ADMIN_EMAIL.toLowerCase();

const adminStorageKey = (locale: string) => `samurai-blog-admin-${locale}`;

const clonePosts = (posts: BlogPost[]) => posts.map((post) => ({ ...post }));

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');

const createBlankForm = (): AdminFormState => ({
  list: 'latestPosts',
  title: '',
  excerpt: '',
  category: '',
  date: new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }),
  readTime: '5 min read',
  slug: ''
});

const buttonStyle: CSSProperties = {
  background: 'linear-gradient(135deg, #69E8E1 0%, #38bdf8 100%)',
  color: '#0f172a',
  padding: '0.65rem 1.5rem',
  borderRadius: '999px',
  border: 'none',
  fontWeight: 700,
  fontSize: '0.95rem',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.35rem',
  boxShadow: '0 12px 24px rgba(56, 189, 248, 0.25)'
};

const subduedButtonStyle: CSSProperties = {
  ...buttonStyle,
  background: 'rgba(105, 232, 225, 0.14)',
  color: '#69E8E1',
  boxShadow: 'none',
  border: '1px solid rgba(105, 232, 225, 0.35)'
};

export default function BlogLanding({
  locale,
  localePrefix,
  strings,
  categories,
  featuredPosts,
  latestPosts,
  resources = []
}: BlogLandingProps) {
  const router = useRouter();
  const MAX_CONTAINER_WIDTH = 'min(1140px, 100%)';
  const isArabic = locale === 'ar';

  const baseFeatured = useMemo(() => clonePosts(featuredPosts), [featuredPosts]);
  const baseLatest = useMemo(() => clonePosts(latestPosts), [latestPosts]);

  const [featured, setFeatured] = useState<BlogPost[]>(baseFeatured);
  const [latest, setLatest] = useState<BlogPost[]>(baseLatest);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [formState, setFormState] = useState<AdminFormState>(() => createBlankForm());
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [editingIndex, setEditingIndex] = useState<{ list: 'featuredPosts' | 'latestPosts'; index: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const loadCollectionsFromStorage = useCallback(
    (adminActive: boolean) => {
      if (typeof window === 'undefined') {
        return;
      }

      if (!adminActive) {
        setFeatured(baseFeatured);
        setLatest(baseLatest);
        return;
      }

      const raw = window.localStorage.getItem(adminStorageKey(locale));
      if (!raw) {
        setFeatured(baseFeatured);
        setLatest(baseLatest);
        return;
      }

      try {
        const parsed: Partial<BlogCollections> = JSON.parse(raw);
        setFeatured(parsed.featuredPosts ? clonePosts(parsed.featuredPosts) : baseFeatured);
        setLatest(parsed.latestPosts ? clonePosts(parsed.latestPosts) : baseLatest);
      } catch (error) {
        console.warn('Failed to parse admin blog overrides:', error);
        setFeatured(baseFeatured);
        setLatest(baseLatest);
      }
    },
    [baseFeatured, baseLatest, locale]
  );

  useEffect(() => {
    setFeatured(baseFeatured);
    setLatest(baseLatest);
  }, [baseFeatured, baseLatest]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const evaluateAuthState = () => {
      try {
        const stored = window.localStorage.getItem('samuraiUser');
        if (!stored) {
          setIsAuthenticated(false);
          setIsAdmin(false);
          loadCollectionsFromStorage(false);
          return;
        }

        const parsed = JSON.parse(stored) as { email?: string } | null;
        const email = parsed?.email?.toLowerCase() ?? '';
        const adminMatch = email.length > 0 && email === NORMALIZED_ADMIN_EMAIL;

        setIsAuthenticated(email.length > 0);
        setIsAdmin(adminMatch);
        loadCollectionsFromStorage(adminMatch);
      } catch (error) {
        console.warn('Unable to evaluate auth state:', error);
        setIsAuthenticated(false);
        setIsAdmin(false);
        loadCollectionsFromStorage(false);
      }
    };

    evaluateAuthState();

    const handleAuthEvent = () => evaluateAuthState();
    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'samuraiUser' || event.key === adminStorageKey(locale)) {
        evaluateAuthState();
      }
    };

    window.addEventListener('samurai-auth-changed', handleAuthEvent as EventListener);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('samurai-auth-changed', handleAuthEvent as EventListener);
      window.removeEventListener('storage', handleStorage);
    };
  }, [locale, loadCollectionsFromStorage]);

  useEffect(() => {
    if (typeof window === 'undefined' || !isAdmin) {
      return;
    }

    const payload: BlogCollections = {
      featuredPosts: featured,
      latestPosts: latest
    };

    window.localStorage.setItem(adminStorageKey(locale), JSON.stringify(payload));
  }, [featured, latest, isAdmin, locale]);

  const resetForm = useCallback(() => {
    setFormState(createBlankForm());
    setFormError(null);
    setFormSuccess(null);
    setEditingIndex(null);
  }, []);

  const slugExists = useCallback(
    (candidateSlug: string, exclude?: { list: 'featuredPosts' | 'latestPosts'; index: number }) => {
      const inFeatured = featured.some((post, index) => {
        if (exclude && exclude.list === 'featuredPosts' && exclude.index === index) {
          return false;
        }
        return post.slug.toLowerCase() === candidateSlug;
      });
      if (inFeatured) {
        return true;
      }

      return latest.some((post, index) => {
        if (exclude && exclude.list === 'latestPosts' && exclude.index === index) {
          return false;
        }
        return post.slug.toLowerCase() === candidateSlug;
      });
    },
    [featured, latest]
  );

  const handleManagePost = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (!formState.title.trim() || !formState.excerpt.trim()) {
      setFormError('Title and excerpt are required.');
      return;
    }

    const baseSlug = (formState.slug || slugify(formState.title)).toLowerCase();
    if (!baseSlug) {
      setFormError('Unable to derive a slug from the provided title.');
      return;
    }

    let slugCandidate = baseSlug;
    let attempt = 1;
    while (slugExists(slugCandidate, editingIndex ?? undefined)) {
      slugCandidate = `${baseSlug}-${attempt++}`;
    }

    const nextPost: BlogPost = {
      id: formState.id ?? Date.now(),
      title: formState.title.trim(),
      excerpt: formState.excerpt.trim(),
      category: formState.category.trim() || 'General',
      date: formState.date.trim() || new Date().toLocaleDateString(),
      readTime: formState.readTime.trim() || '5 min read',
      slug: slugCandidate
    };

    const targetList = formState.list;

    if (editingIndex) {
      const wasDifferentList = editingIndex.list !== targetList;

      const updateList = (listName: 'featuredPosts' | 'latestPosts', updater: (posts: BlogPost[]) => BlogPost[]) => {
        if (listName === 'featuredPosts') {
          setFeatured((prev) => updater(prev));
        } else {
          setLatest((prev) => updater(prev));
        }
      };

      updateList(editingIndex.list, (prev) => {
        const clone = clonePosts(prev);
        if (!wasDifferentList) {
          clone[editingIndex.index] = nextPost;
          return clone;
        }
        clone.splice(editingIndex.index, 1);
        return clone;
      });

      if (wasDifferentList) {
        updateList(targetList, (prev) => [...clonePosts(prev), nextPost]);
      }

      setFormSuccess('Post updated successfully.');
    } else {
      const updater = targetList === 'featuredPosts' ? setFeatured : setLatest;
      updater((prev) => [...clonePosts(prev), nextPost]);
      setFormSuccess('Post added successfully.');
    }

    setTimeout(() => setFormSuccess(null), 2800);
    resetForm();
  };

  const handleEdit = (list: 'featuredPosts' | 'latestPosts', index: number) => {
    const source = list === 'featuredPosts' ? featured : latest;
    const post = source[index];
    if (!post) {
      return;
    }

    setPanelOpen(true);
    setEditingIndex({ list, index });
    setFormState({
      list,
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      date: post.date,
      readTime: post.readTime,
      slug: post.slug
    });
    setFormError(null);
    setFormSuccess(null);
  };

  const handleDelete = (list: 'featuredPosts' | 'latestPosts', index: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) {
      return;
    }

    const updater = list === 'featuredPosts' ? setFeatured : setLatest;
    updater((prev) => {
      const clone = clonePosts(prev);
      clone.splice(index, 1);
      return clone;
    });

    setFormSuccess('Post deleted.');
    setTimeout(() => setFormSuccess(null), 2000);

    if (editingIndex && editingIndex.list === list && editingIndex.index === index) {
      resetForm();
    }
  };

  const handleLogout = () => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.removeItem('samuraiUser');
    window.localStorage.removeItem(adminStorageKey(locale));
    const authEvent = new CustomEvent('samurai-auth-changed', { detail: null });
    window.dispatchEvent(authEvent);
    setIsAuthenticated(false);
    setIsAdmin(false);
    resetForm();
    setPanelOpen(false);
    setFeatured(baseFeatured);
    setLatest(baseLatest);
    router.push(`${localePrefix}/auth/login`);
  };

  const renderAdminPanel = () => (
    <section
      dir={isArabic ? 'rtl' : 'ltr'}
      style={{
        background: '#0a0e3d',
        color: '#ffffff',
        padding: '1.75rem clamp(1.25rem, 3vw, 2.5rem)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 20% 20%, rgba(105,232,225,0.18) 0%, transparent 55%)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: MAX_CONTAINER_WIDTH,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}
      >
        {/* Admin controls content remains the same */}
        {/* ... keep the existing admin panel code ... */}
      </div>
    </section>
  );

  const renderAuthToolbar = () => (
    <section
      dir={isArabic ? 'rtl' : 'ltr'}
      style={{
        background: '#0a1125',
        color: '#e2e8f0',
        padding: '0.85rem clamp(1.25rem, 3vw, 2.5rem)'
      }}
    >
      <div
        style={{
          maxWidth: MAX_CONTAINER_WIDTH,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <span style={{ fontSize: '0.95rem', opacity: 0.85 }}>
          You are signed in. {isAdmin ? 'Admin privileges enabled.' : 'Welcome back!'}
        </span>
        {!isAdmin && (
          <button
            type="button"
            onClick={handleLogout}
            style={{
              ...subduedButtonStyle,
              padding: '0.5rem 1.1rem',
              fontSize: '0.85rem'
            }}
          >
            Log out
          </button>
        )}
      </div>
    </section>
  );

  if (!mounted) {
    return (
      <div style={{ minHeight: '100vh', background: '#fff', direction: isArabic ? 'rtl' : 'ltr' }}>
       
        <div style={{ padding: '2rem' }}>
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <h2>Loading...</h2>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', direction: isArabic ? 'rtl' : 'ltr' }}>
     

      {isAuthenticated && renderAuthToolbar()}
      {isAdmin && renderAdminPanel()}

      {/* Hero Section - Matching Homepage */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: 'clamp(5rem, 12vw, 9rem) clamp(1.5rem, 5vw, 3rem)',
          textAlign: 'center',
          color: '#fff',
          background: 'linear-gradient(135deg, #0a0e3d 0%, #1346a3 100%)',
          minHeight: 'min(60vh, 600px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          overflow: 'hidden'
        }}>
          <Image
            src="/img/bg1.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(10, 14, 61, 0.92) 0%, rgba(19, 70, 163, 0.68) 100%)',
              zIndex: 1
            }}
          />
        </div>
        <div style={{ maxWidth: MAX_CONTAINER_WIDTH, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '700',
            margin: '0 auto 1.5rem',
            lineHeight: 1.2,
            maxWidth: '900px',
            minHeight: '1.2em',
            padding: '0 1rem',
            fontFamily: 'var(--font-inter), sans-serif',
          }}>
            {strings.title}
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            maxWidth: '700px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.7,
            opacity: 0.9,
            minHeight: '3.4em',
            padding: '0 1rem',
          }}>
            {strings.description}
          </p>
          <div style={{
            minHeight: '54px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Link
              href={`/${locale}/contact`}
              className="glow-button hero-cta"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#00bcd4',
                color: '#fff',
                padding: '1rem 2.5rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                textDecoration: 'none',
                boxShadow: '0 4px 15px rgba(0, 188, 212, 0.3)',
                whiteSpace: 'nowrap',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                minWidth: '200px',
                height: '54px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 188, 212, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 188, 212, 0.3)';
              }}
            >
              {strings.heroCta || strings.readMore || 'Get Started'}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Stories Section */}
      <section style={{
        padding: 'clamp(3rem, 7vw, 6.5rem) clamp(1.25rem, 5vw, 3.5rem)',
        background: '#fff',
        direction: isArabic ? 'rtl' : 'ltr'
      }}>
        <div style={{
          maxWidth: MAX_CONTAINER_WIDTH,
          margin: '0 auto'
        }}>
          <div style={{ marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '800',
              color: '#0a0e3d',
              lineHeight: '1.2',
              marginBottom: '1rem'
            }}>
              {strings.featuredStories}
            </h2>
            <p style={{
              color: '#666',
              lineHeight: '1.8',
              fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
              maxWidth: '720px'
            }}>
              {strings.featuredIntro}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
            gap: 'clamp(1.5rem, 4vw, 2rem)'
          }}>
            {featured.map((post) => (
              <article
                className="hover-lift tilt-card"
                key={post.id}
                style={{
                  background: '#1a1f71',
                  borderRadius: '18px',
                  padding: '2.25rem',
                  color: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  border: '1px solid rgba(105, 232, 225, 0.25)',
                  boxShadow: '0 25px 40px rgba(10, 14, 61, 0.08)'
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
                  className="hover-underline"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: '#69E8E1',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  {strings.readMore} {isArabic ? '←' : '→'}
                </Link>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.85rem',
                    opacity: 0.8,
                    marginTop: '0.5rem'
                  }}
                >
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Categories & Recent Posts Section */}
      <section style={{
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1.25rem, 5vw, 3.5rem)',
        background: 'linear-gradient(135deg, #0a0e3d 0%, #1a237e 100%)',
        animation: 'fadeIn 1s ease-in'
      }}>
        <div style={{
          maxWidth: MAX_CONTAINER_WIDTH,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
          gap: 'clamp(2rem, 5vw, 4rem)'
        }}>
          {/* Categories Sidebar */}
          <aside
            style={{
              background: '#11153d',
              borderRadius: '22px',
              padding: '2.5rem',
              boxShadow: '0 24px 45px rgba(4, 11, 38, 0.35)',
              border: '1px solid rgba(105, 232, 225, 0.18)'
            }}
          >
            <h3
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '1.5rem'
              }}
            >
              {strings.categories}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`${localePrefix}/blog?category=${encodeURIComponent(category)}`}
                  style={{
                    padding: '0.75rem 1.25rem',
                    borderRadius: '12px',
                    background: 'rgba(105, 232, 225, 0.1)',
                    color: '#69E8E1',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    border: '1px solid rgba(105, 232, 225, 0.25)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(105, 232, 225, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(105, 232, 225, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {category}
                </Link>
              ))}
            </div>
          </aside>

          {/* Recent Posts */}
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1.5rem',
              flexWrap: 'wrap',
              marginBottom: 'clamp(2rem, 5vw, 3rem)'
            }}>
              <h2
                style={{
                  fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
                  fontWeight: 800,
                  color: '#fff'
                }}
              >
                {strings.recentPosts}
              </h2>
              {latest[0] && (
                <Link
                  href={`${localePrefix}/blog/${latest[0].slug}`}
                  style={{
                    color: '#69E8E1',
                    fontWeight: 600,
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    border: '1px solid rgba(105, 232, 225, 0.3)',
                    background: 'rgba(105, 232, 225, 0.1)'
                  }}
                >
                  {strings.readMore} {isArabic ? '←' : '→'}
                </Link>
              )}
            </div>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {latest.map((post, index) => (
                <article
                  className="hover-lift"
                  key={`${post.id}-${index}`}
                  style={{
                    background: '#11153d',
                    borderRadius: '16px',
                    padding: '1.75rem',
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    border: '1px solid rgba(105, 232, 225, 0.18)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                    <h3
                      style={{
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        lineHeight: 1.4,
                        flex: 1
                      }}
                    >
                      {post.title}
                    </h3>
                    <span
                      style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '999px',
                        background: 'rgba(105, 232, 225, 0.15)',
                        color: '#69E8E1',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {post.category}
                    </span>
                  </div>
                  <p
                    style={{
                      color: 'rgba(255,255,255,0.75)',
                      lineHeight: 1.7,
                      fontSize: '0.9rem'
                    }}
                  >
                    {post.excerpt}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
                      {post.date} • {post.readTime}
                    </span>
                    <Link
                      href={`${localePrefix}/blog/${post.slug}`}
                      className="hover-underline"
                      style={{
                        color: '#69E8E1',
                        textDecoration: 'none',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: '0.9rem'
                      }}
                    >
                      Read {isArabic ? '←' : '→'}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section - Matching Homepage Style */}
      <section style={{
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
        background: '#fff',
        direction: isArabic ? 'rtl' : 'ltr'
      }}>
        <div style={{ maxWidth: MAX_CONTAINER_WIDTH, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 6vw, 3.5rem)' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '800',
              color: '#0a0e3d',
              lineHeight: '1.2',
              marginBottom: '1rem'
            }}>
             
            </h2>
            <p style={{
              color: '#666',
              lineHeight: '1.8',
              maxWidth: '800px',
              margin: '0 auto',
              fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)'
            }}>
              
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '2rem'
          }}>
            {(resources.length ? resources : DEFAULT_RESOURCES).map((resource, index) => (
              <Link
                key={`${resource.title}-${index}`}
                href={resource.href || `${localePrefix}/blog?tag=${encodeURIComponent(resource.tag)}`}
                prefetch={false}
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="tilt-card"
                  style={{
                    background: '#0a0e3d',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
                  }}
                >
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16/9',
                    overflow: 'hidden'
                  }}>
                    <Image
                      src={resource.image}
                      alt={resource.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      style={{ 
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Matching Homepage */}
      <section style={{
        position: 'relative',
        padding: '0 clamp(1.5rem, 5vw, 3rem)',
        marginBottom: '-5rem',
        zIndex: 10
      }}>
        <div style={{
          maxWidth: MAX_CONTAINER_WIDTH,
          margin: '0 auto'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '24px',
            padding: 'clamp(3rem, 6vw, 4rem) clamp(2rem, 5vw, 3rem)',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: '800',
              lineHeight: '1.2',
              marginBottom: '1rem',
              color: '#0a0e3d'
            }}>
              {strings.ctaTitle}
            </h2>
            <p style={{
              fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
              lineHeight: '1.6',
              marginBottom: '2rem',
              color: '#666',
              maxWidth: '700px',
              margin: '0 auto 2rem'
            }}>
              {strings.ctaDescription}
            </p>
            <Link
              href={strings.ctaHref || `/${locale}/contact`}
              style={{
                display: 'inline-block',
                background: '#1368ff',
                color: '#fff',
                border: 'none',
                padding: 'clamp(0.8rem, 2vw, 1rem) clamp(2rem, 5vw, 3rem)',
                fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
                fontWeight: '600',
                borderRadius: '999px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 20px rgba(19, 104, 255, 0.3)',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(19, 104, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(19, 104, 255, 0.3)';
              }}
            >
              {strings.ctaButton}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
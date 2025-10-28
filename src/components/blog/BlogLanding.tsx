'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CSSProperties, FormEvent, useCallback, useEffect, useMemo, useState } from 'react';

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
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
    newsletterTitle: string;
    newsletterIntro: string;
    readMore: string;
    getStarted: string;
  };
  categories: string[];
  featuredPosts: BlogPost[];
  latestPosts: BlogPost[];
};

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
  latestPosts
}: BlogLandingProps) {
  const router = useRouter();

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

  const localeIsArabic = locale === 'ar';

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
      dir={localeIsArabic ? 'rtl' : 'ltr'}
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
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            alignItems: 'flex-start'
          }}
        >
          <div style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.04em', textTransform: 'uppercase', opacity: 0.8 }}>
            Admin Controls
          </div>
          <div style={{ color: 'rgba(255,255,255,0.75)' }}>
            Manage your blog posts. Any changes you make here are stored locally so you can iterate without affecting published content.
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={() => {
                setPanelOpen(true);
                resetForm();
              }}
              style={buttonStyle}
            >
              Add new post
            </button>
            <button
              type="button"
              onClick={() => setPanelOpen((prev) => !prev)}
              style={subduedButtonStyle}
            >
              {panelOpen ? 'Hide editor' : 'Show editor'}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              style={{
                ...subduedButtonStyle,
                background: 'rgba(239,68,68,0.15)',
                color: '#f87171',
                border: '1px solid rgba(248,113,113,0.35)'
              }}
            >
              Log out
            </button>
          </div>
        </div>

        {panelOpen && (
          <div
            style={{
              background: '#11153d',
              borderRadius: '18px',
              padding: '1.75rem',
              border: '1px solid rgba(105, 232, 225, 0.18)',
              display: 'grid',
              gap: '1.5rem'
            }}
          >
            <form onSubmit={handleManagePost} style={{ display: 'grid', gap: '1.25rem' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '1.25rem'
                }}
              >
                <label style={{ display: 'grid', gap: '0.5rem', color: '#e2e8f0', fontSize: '0.95rem' }}>
                  Target section
                  <select
                    value={formState.list}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, list: event.target.value as AdminFormState['list'] }))
                    }
                    style={{
                      padding: '0.65rem 0.85rem',
                      borderRadius: '12px',
                      border: '1px solid rgba(148, 163, 184, 0.4)',
                      background: '#0f172a',
                      color: '#e2e8f0'
                    }}
                  >
                    <option value="featuredPosts">Featured posts</option>
                    <option value="latestPosts">Latest posts</option>
                  </select>
                </label>
                <label style={{ display: 'grid', gap: '0.5rem', color: '#e2e8f0', fontSize: '0.95rem' }}>
                  Title
                  <input
                    value={formState.title}
                    onChange={(event) => setFormState((prev) => ({ ...prev, title: event.target.value }))}
                    required
                    placeholder="Enter a compelling headline"
                    style={{
                      padding: '0.75rem 0.85rem',
                      borderRadius: '12px',
                      border: '1px solid rgba(148, 163, 184, 0.4)',
                      background: '#0f172a',
                      color: '#e2e8f0'
                    }}
                  />
                </label>
                <label style={{ display: 'grid', gap: '0.5rem', color: '#e2e8f0', fontSize: '0.95rem' }}>
                  Category
                  <input
                    value={formState.category}
                    onChange={(event) => setFormState((prev) => ({ ...prev, category: event.target.value }))}
                    placeholder="Security, AI, Compliance..."
                    style={{
                      padding: '0.75rem 0.85rem',
                      borderRadius: '12px',
                      border: '1px solid rgba(148, 163, 184, 0.4)',
                      background: '#0f172a',
                      color: '#e2e8f0'
                    }}
                  />
                </label>
              </div>

              <label style={{ display: 'grid', gap: '0.5rem', color: '#e2e8f0', fontSize: '0.95rem' }}>
                Excerpt
                <textarea
                  value={formState.excerpt}
                  onChange={(event) => setFormState((prev) => ({ ...prev, excerpt: event.target.value }))}
                  required
                  rows={3}
                  placeholder="Write a short teaser for the post"
                  style={{
                    padding: '0.85rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(148, 163, 184, 0.4)',
                    background: '#0f172a',
                    color: '#e2e8f0',
                    resize: 'vertical'
                  }}
                />
              </label>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1.25rem'
                }}
              >
                <label style={{ display: 'grid', gap: '0.5rem', color: '#e2e8f0', fontSize: '0.95rem' }}>
                  Publish date
                  <input
                    value={formState.date}
                    onChange={(event) => setFormState((prev) => ({ ...prev, date: event.target.value }))}
                    placeholder="October 10, 2025"
                    style={{
                      padding: '0.75rem 0.85rem',
                      borderRadius: '12px',
                      border: '1px solid rgba(148, 163, 184, 0.4)',
                      background: '#0f172a',
                      color: '#e2e8f0'
                    }}
                  />
                </label>
                <label style={{ display: 'grid', gap: '0.5rem', color: '#e2e8f0', fontSize: '0.95rem' }}>
                  Read time
                  <input
                    value={formState.readTime}
                    onChange={(event) => setFormState((prev) => ({ ...prev, readTime: event.target.value }))}
                    placeholder="5 min read"
                    style={{
                      padding: '0.75rem 0.85rem',
                      borderRadius: '12px',
                      border: '1px solid rgba(148, 163, 184, 0.4)',
                      background: '#0f172a',
                      color: '#e2e8f0'
                    }}
                  />
                </label>
                <label style={{ display: 'grid', gap: '0.5rem', color: '#e2e8f0', fontSize: '0.95rem' }}>
                  Custom slug (optional)
                  <input
                    value={formState.slug}
                    onChange={(event) => setFormState((prev) => ({ ...prev, slug: event.target.value }))}
                    placeholder="custom-post-slug"
                    style={{
                      padding: '0.75rem 0.85rem',
                      borderRadius: '12px',
                      border: '1px solid rgba(148, 163, 184, 0.4)',
                      background: '#0f172a',
                      color: '#e2e8f0'
                    }}
                  />
                </label>
              </div>

              {formError && (
                <div
                  style={{
                    background: 'rgba(248, 113, 113, 0.12)',
                    border: '1px solid rgba(248, 113, 113, 0.35)',
                    color: '#fecaca',
                    padding: '0.85rem 1rem',
                    borderRadius: '12px'
                  }}
                >
                  {formError}
                </div>
              )}

              {formSuccess && (
                <div
                  style={{
                    background: 'rgba(16, 185, 129, 0.12)',
                    border: '1px solid rgba(16, 185, 129, 0.35)',
                    color: '#bbf7d0',
                    padding: '0.85rem 1rem',
                    borderRadius: '12px'
                  }}
                >
                  {formSuccess}
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button type="submit" style={buttonStyle}>
                  {editingIndex ? 'Save changes' : 'Add post'}
                </button>
                {editingIndex && (
                  <button
                    type="button"
                    onClick={resetForm}
                    style={{
                      ...subduedButtonStyle,
                      background: 'rgba(156, 163, 175, 0.12)',
                      color: '#cbd5f5'
                    }}
                  >
                    Cancel edit
                  </button>
                )}
              </div>
            </form>

            <div style={{ display: 'grid', gap: '1.2rem' }}>
              {(['featuredPosts', 'latestPosts'] as const).map((list) => {
                const collection = list === 'featuredPosts' ? featured : latest;
                if (!collection.length) {
                  return null;
                }

                return (
                  <div
                    key={list}
                    style={{
                      background: 'rgba(13, 25, 64, 0.65)',
                      borderRadius: '16px',
                      padding: '1.1rem 1.25rem',
                      border: '1px solid rgba(105, 232, 225, 0.12)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.85rem'
                    }}
                  >
                    <div style={{ fontWeight: 600, color: '#69E8E1', fontSize: '0.95rem' }}>
                      {list === 'featuredPosts' ? 'Featured posts' : 'Latest posts'}
                    </div>
                    <div style={{ display: 'grid', gap: '0.85rem' }}>
                      {collection.map((post, index) => (
                        <div
                          key={`${post.slug}-${index}`}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.45rem',
                            background: 'rgba(15, 23, 42, 0.65)',
                            borderRadius: '14px',
                            padding: '0.9rem 1rem',
                            border: '1px solid rgba(148, 163, 184, 0.18)'
                          }}
                        >
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', justifyContent: 'space-between' }}>
                            <div style={{ fontWeight: 600, color: '#e2e8f0' }}>{post.title}</div>
                            <div style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap' }}>
                              <button
                                type="button"
                                onClick={() => handleEdit(list, index)}
                                style={{
                                  ...subduedButtonStyle,
                                  padding: '0.4rem 0.9rem',
                                  fontSize: '0.85rem'
                                }}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(list, index)}
                                style={{
                                  ...subduedButtonStyle,
                                  padding: '0.4rem 0.9rem',
                                  fontSize: '0.85rem',
                                  background: 'rgba(248, 113, 113, 0.14)',
                                  color: '#fca5a5',
                                  border: '1px solid rgba(248, 113, 113, 0.35)'
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                          <div style={{ color: 'rgba(226, 232, 240, 0.75)', fontSize: '0.9rem' }}>{post.excerpt}</div>
                          <div style={{ color: 'rgba(148, 163, 184, 0.75)', fontSize: '0.8rem', display: 'flex', gap: '1.25rem' }}>
                            <span>{post.category}</span>
                            <span>{post.date}</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );

  const renderAuthToolbar = () => (
    <section
      dir={localeIsArabic ? 'rtl' : 'ltr'}
      style={{
        background: '#0a1125',
        color: '#e2e8f0',
        padding: '0.85rem clamp(1.25rem, 3vw, 2.5rem)'
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
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

  return (
    <>
      {isAuthenticated && renderAuthToolbar()}
      {isAdmin && renderAdminPanel()}

      <main style={{ flex: 1 }} dir={localeIsArabic ? 'rtl' : 'ltr'}>
        <section
          style={{
            background: 'linear-gradient(135deg, #1a1f71 0%, #0a0e3d 50%, #00bcd4 100%)',
            padding: 'clamp(3.5rem, 9vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
            textAlign: 'center',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 30% 50%, rgba(105, 232, 225, 0.2) 0%, transparent 55%)',
              pointerEvents: 'none'
            }}
          />

          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 800,
                marginBottom: '1.5rem'
              }}
            >
              {strings.title}
            </h1>
            <p
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                lineHeight: 1.8,
                opacity: 0.9,
                marginBottom: '2.5rem'
              }}
            >
              {strings.description}
            </p>
            <Link
              href={`${localePrefix}/contact`}
              className="glow-button hover-glow"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                background: '#00bcd4',
                color: '#fff',
                border: 'none',
                padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1.75rem, 4vw, 2.75rem)',
                borderRadius: '30px',
                fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 10px 30px rgba(0, 188, 212, 0.25)'
              }}
            >
              {strings.readMore}
            </Link>
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
                {strings.featuredStories}
              </h2>
              <p
                style={{
                  color: '#666',
                  lineHeight: 1.7,
                  fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
                  maxWidth: '720px'
                }}
              >
                {strings.featuredIntro}
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                gap: 'clamp(1.5rem, 4vw, 2rem)'
              }}
            >
              {featured.map((post) => (
                <article
                  className="hover-lift"
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
                    {strings.readMore} →
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
                </article>
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
            <aside
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
                {strings.categories}
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
            </aside>

            <article
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
                {strings.tags}
              </h3>
              <p
                style={{
                  color: '#666',
                  lineHeight: 1.7,
                  fontSize: '0.95rem'
                }}
              >
                {strings.tagsIntro}
              </p>
            </article>
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
                {strings.recentPosts}
              </h2>
              {latest[0] && (
                <Link
                  href={`${localePrefix}/blog/${latest[0].slug}`}
                  style={{
                    color: '#69E8E1',
                    fontWeight: 600,
                    textDecoration: 'none',
                    fontSize: '0.95rem'
                  }}
                >
                  {strings.readMore} →
                </Link>
              )}
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                gap: 'clamp(1.5rem, 4vw, 2rem)'
              }}
            >
              {latest.map((post, index) => (
                <article
                  className="hover-lift"
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
                    className="hover-underline"
                    style={{
                      color: '#69E8E1',
                      textDecoration: 'none',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    {strings.readMore} →
                  </Link>
                </article>
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
              {strings.newsletterTitle}
            </h3>
            <p
              style={{
                color: '#666',
                lineHeight: 1.8,
                fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
                marginBottom: '2rem'
              }}
            >
              {strings.newsletterIntro}
            </p>
            <Link
              href={`${localePrefix}/contact`}
              className="glow-button hover-glow"
              style={{
                background: '#0a0e3d',
                color: '#fff',
                border: 'none',
                padding: '0.85rem 2.5rem',
                borderRadius: '30px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              {strings.getStarted}
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

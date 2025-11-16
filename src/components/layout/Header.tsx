'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { LoginButton, SignupButton } from '@/components/ui/AuthButtons';
import Image from 'next/image';

// Helper function for responsive values
function getResponsiveSize() {
  if (typeof window === 'undefined') return 24;
  
  const width = window.innerWidth;
  if (width < 480) return 20;
  if (width < 768) return 22;
  return 24;
}

type LinkNavItem = {
  id: string;
  label: string;
  type: 'link';
  href: string;
};

type DropdownNavItem = {
  id: string;
  label: string;
  type: 'dropdown';
  children: Array<{ id: string; label: string; href: string }>;
};

type ScrollNavItem = {
  id: string;
  label: string;
  type: 'scroll';
  scrollTarget: string;
};

type NavItem = LinkNavItem | DropdownNavItem | ScrollNavItem;

const ADMIN_STORAGE_PREFIX = 'samurai-blog-admin-';

type SamuraiAuthDetail = {
  email?: string;
  name?: string;
} | null;

function isSamuraiAuthEvent(event: Event): event is CustomEvent<SamuraiAuthDetail> {
  return 'detail' in event;
}

function findDropdownNavItem(
  items: NavItem[],
  id: 'services' | 'solutions' | 'industries'
): DropdownNavItem | undefined {
  return items.find(
    (item): item is DropdownNavItem => item.type === 'dropdown' && item.id === id
  );
}

export default function Header() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const router = useRouter();
  const resolvedPath = (pathname ?? '/').replace(/\/+$/, '') || '/';
  const currentLocale = resolvedPath.split('/')[1] || 'en';

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [quickNavOpen, setQuickNavOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [iconSize, setIconSize] = useState(20);
  const [userInitial, setUserInitial] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>('user@example.com');
  const [headerHeight, setHeaderHeight] = useState(0);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const servicesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const solutionsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const industriesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasUser = Boolean(userEmail);

  const updateHeaderHeight = useCallback(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  // Navigation items data
  const navItems: NavItem[] = [
    {
      id: 'home',
      label: t('home'),
      href: `/${currentLocale}`,
      type: 'link'
    },
    {
      id: 'solutions',
      label: t('solutions'),
      type: 'dropdown',
      children: [
        { id: 'solutions-overview', label: t('solutionsMenu.overview'), href: `/${currentLocale}/solutions` },
        { id: 'ai-security', label: t('aiSecurity'), href: `/${currentLocale}/solutions/ai-security` },
        { id: 'identity-management', label: t('identityManagement'), href: `/${currentLocale}/solutions/identity-management` },
        { id: 'zero-trust', label: t('zeroTrust'), href: `/${currentLocale}/solutions/zero-trust` },
        { id: 'cloud-security', label: t('cloudSecurity'), href: `/${currentLocale}/solutions/cloud-security` },
        { id: 'network-security', label: t('networkSecurity'), href: `/${currentLocale}/solutions/network-security` },
        { id: 'endpoint-security', label: t('endpointSecurity'), href: `/${currentLocale}/solutions/endpoint-security` }
      ]
    },
    {
      id: 'services',
      label: t('services'),
      type: 'dropdown',
      children: [
        { id: 'services-overview', label: t('servicesMenu.overview'), href: `/${currentLocale}/services` },
        { id: 'consulting', label: t('servicesMenu.consulting'), href: `/${currentLocale}/services/consulting` },
        { id: 'infrastructure', label: t('servicesMenu.infrastructure'), href: `/${currentLocale}/services/infrastructure` },
        { id: 'resourcing', label: t('servicesMenu.resourcing'), href: `/${currentLocale}/services/resourcing` },
        { id: 'training', label: t('servicesMenu.training'), href: `/${currentLocale}/services/training` },
        { id: 'managed-it', label: t('servicesMenu.managed'), href: `/${currentLocale}/services/managed-it` },
        { id: 'devsecops', label: t('servicesMenu.devsecops'), href: `/${currentLocale}/services/devsecops` }
      ]
    },
    {
      id: 'industries',
      label: t('industries'),
      type: 'dropdown',
      children: [
        { id: 'healthcare', label: t('industriesMenu.healthcare'), href: '#' },
        { id: 'finance', label: t('industriesMenu.finance'), href: '#' },
        { id: 'government', label: t('industriesMenu.government'), href: '#' },
        { id: 'technology', label: t('industriesMenu.technology'), href: '#' },
        { id: 'retail', label: t('industriesMenu.retail'), href: '#' }
      ]
    },
    {
      id: 'partners',
      label: t('partners'),
      type: 'scroll',
      scrollTarget: 'partners'
    },
    {
      id: 'blog',
      label: t('blog'),
      href: `/${currentLocale}/blog`,
      type: 'link'
    },
    {
      id: 'about',
      label: t('aboutUs'),
      type: 'scroll',
      scrollTarget: 'who-we-are'
    },
    {
      id: 'connect',
      label: 'Connect',
      type: 'scroll',
      scrollTarget: 'contact'
    },
  ];

  const servicesDropdown = findDropdownNavItem(navItems, 'services');
  const solutionsDropdown = findDropdownNavItem(navItems, 'solutions');
  const industriesDropdown = findDropdownNavItem(navItems, 'industries');

  // Handle responsive icon size
  useEffect(() => {
    const updateIconSize = () => {
      setIconSize(getResponsiveSize());
    };

    updateIconSize();
    window.addEventListener('resize', updateIconSize);

    return () => window.removeEventListener('resize', updateIconSize);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const loadUser = () => {
      try {
        const stored = window.localStorage.getItem('samuraiUser');
        if (!stored) {
          setUserInitial(null);
          setUserEmail(null);
          return;
        }
        const parsed = JSON.parse(stored);
        const emailValue =
          parsed && typeof parsed === 'object' && typeof parsed.email === 'string'
            ? parsed.email.trim()
            : '';

        setUserEmail(emailValue.length ? emailValue : null);

        if (parsed && typeof parsed === 'object' && typeof parsed.name === 'string' && parsed.name.trim().length) {
          setUserInitial(parsed.name.trim().charAt(0).toUpperCase());
        } else if (emailValue.length) {
          setUserInitial(emailValue.charAt(0).toUpperCase());
        } else {
          setUserInitial(null);
        }
      } catch {
        setUserInitial(null);
        setUserEmail(null);
      }
    };

    loadUser();

    const handleAuthChange = (event: Event) => {
      if (!isSamuraiAuthEvent(event)) {
        loadUser();
        return;
      }
      const detail = event.detail;
      const emailValue = detail?.email ? detail.email.trim() : '';
      const nameValue = detail?.name ? detail.name.trim() : '';

      setUserEmail(emailValue.length ? emailValue : null);

      if (nameValue.length) {
        setUserInitial(nameValue.charAt(0).toUpperCase());
      } else if (emailValue.length) {
        setUserInitial(emailValue.charAt(0).toUpperCase());
      } else {
        setUserInitial(null);
      }
    };

    window.addEventListener('samurai-auth-changed', handleAuthChange as EventListener);

    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'samuraiUser') {
        loadUser();
      }
    };

    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('samurai-auth-changed', handleAuthChange as EventListener);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMenuOpen(false);
    setServicesOpen(false);
    setSolutionsOpen(false);
    setIndustriesOpen(false);

    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
      document.body.classList.remove('menu-open');
    }
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMenuOpen((previous) => {
      const nextState = !previous;

      if (typeof document !== 'undefined') {
        if (nextState) {
          document.body.style.overflow = 'hidden';
          document.body.classList.add('menu-open');
        } else {
          document.body.style.overflow = 'auto';
          document.body.classList.remove('menu-open');
        }
      }

      if (!nextState) {
        setServicesOpen(false);
        setSolutionsOpen(false);
        setIndustriesOpen(false);
      }

      return nextState;
    });
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isClickInsideMenu = mobileMenuRef.current?.contains(target);
      const isToggleButton = menuToggleRef.current?.contains(target as Node);

      if (!isClickInsideMenu && !isToggleButton) {
        closeMobileMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeMobileMenu]);

  useEffect(() => {
    closeMobileMenu();
  }, [closeMobileMenu, pathname]);

  useEffect(() => {
    updateHeaderHeight();

    if (typeof window === 'undefined') {
      return;
    }

    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, [updateHeaderHeight]);

  useEffect(() => {
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'auto';
        document.body.classList.remove('menu-open');
      }
    };
  }, []);

  useEffect(() => {
    // Close menu when route changes triggered by browser history
    const handleRouteChange = () => {
      closeMobileMenu();
    };

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'auto';
        document.body.classList.remove('menu-open');
      }
    };
  }, [closeMobileMenu]);

  // Handle dropdown toggle for mobile
  const toggleMobileDropdown = (menu: 'services' | 'solutions' | 'industries') => {
    switch (menu) {
      case 'services':
        setServicesOpen(!servicesOpen);
        setSolutionsOpen(false);
        setIndustriesOpen(false);
        break;
      case 'solutions':
        setSolutionsOpen(!solutionsOpen);
        setServicesOpen(false);
        setIndustriesOpen(false);
        break;
      case 'industries':
        setIndustriesOpen(!industriesOpen);
        setServicesOpen(false);
        setSolutionsOpen(false);
        break;
      default:
        setServicesOpen(false);
        setSolutionsOpen(false);
        setIndustriesOpen(false);
    }
  };

  const handleLogout = () => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.removeItem('samuraiUser');

    const keysToRemove: string[] = [];
    for (let index = 0; index < window.localStorage.length; index += 1) {
      const key = window.localStorage.key(index);
      if (key && key.startsWith(ADMIN_STORAGE_PREFIX)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => window.localStorage.removeItem(key));

    const authEvent = new CustomEvent('samurai-auth-changed', { detail: null });
    window.dispatchEvent(authEvent);
    setUserInitial(null);
    setUserEmail(null);
    closeMobileMenu();
    router.push(`/${currentLocale}/auth/login`);
  };

  const sectionMapping: Record<string, string> = {
    about: 'who-we-are',
    'about-us': 'who-we-are',
    services: 'services',
    partners: 'partners',
    industries: 'industries',
    resources: 'resources',
    careers: 'careers',
    contact: 'contact',
    connect: 'contact'
  };

  const scrollToSection = (rawSection: string) => {
    const normalizedKey = rawSection.toLowerCase();
    const targetSection = sectionMapping[normalizedKey] ?? normalizedKey.replace(/\s+/g, '-');

    if (pathname !== `/${currentLocale}`) {
      window.location.href = `/${currentLocale}#${targetSection}`;
    } else {
      const element = document.getElementById(targetSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = targetSection;
      }
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'auto';
        document.body.classList.remove('menu-open');
      }
    }
  };

  const avatarClassName = [
    'w-10 h-10 rounded-full flex items-center justify-center focus:outline-none transition-colors',
    hasUser
      ? 'bg-gradient-to-r from-[#69E8E1] to-[#38bdf8] text-white shadow-sm hover:shadow-lg'
      : 'bg-white/10 text-white hover:bg-white/20'
  ].join(' ');

  return (
    <header
      ref={headerRef}
      style={{
        background: 'linear-gradient(135deg, #001F3F 0%, #000814 100%)',
        padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 4vw, 3rem)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
      }}
    >
      <div
        style={{
          maxWidth: '1600px',
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(0.75rem, 2.5vw, 1.5rem)'
        }}
      >
        <div className="flex w-full items-center justify-between gap-3 md:gap-4">
          <div className="flex min-w-0 items-center gap-2 md:gap-3">
            <button
              ref={menuToggleRef}
              className="p-2 text-white transition-colors hover:text-slate-200 md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={iconSize} /> : <Menu size={iconSize} />}
            </button>

            <Link
              href={`/${currentLocale}`}
              className="hover-underline"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                textDecoration: 'none'
              }}
              onClick={closeMobileMenu}
            >
              <Image
                src="/logo.png"
                alt="The SamurAI Logo"
                width={60}
                height={60}
                style={{
                  objectFit: 'contain',
                  width: 'clamp(40px, 8vw, 60px)',
                  height: 'clamp(40px, 8vw, 60px)'
                }}
              />
            </Link>
          </div>

          <nav className="desktop-nav hidden flex-1 items-center justify-center gap-6 text-white md:flex">
            {navItems
              .filter((item) => !['login', 'signup'].includes(item.id))
              .map((item) => {
                if (item.type === 'dropdown') {
                  const isServices = item.id === 'services';
                  const isSolutions = item.id === 'solutions';
                  const isIndustries = item.id === 'industries';
                  const isOpen =
                    (isServices && servicesOpen) ||
                    (isSolutions && solutionsOpen) ||
                    (isIndustries && industriesOpen);

                  return (
                    <div
                      key={item.id}
                      className="relative"
                      onMouseEnter={() => {
                        if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
                        if (solutionsTimeoutRef.current) clearTimeout(solutionsTimeoutRef.current);
                        if (industriesTimeoutRef.current) clearTimeout(industriesTimeoutRef.current);

                        setServicesOpen(false);
                        setSolutionsOpen(false);
                        setIndustriesOpen(false);

                        if (isServices) {
                          setServicesOpen(true);
                        } else if (isSolutions) {
                          setSolutionsOpen(true);
                        } else if (isIndustries) {
                          setIndustriesOpen(true);
                        }
                      }}
                      onMouseLeave={() => {
                        if (isServices) {
                          servicesTimeoutRef.current = setTimeout(() => setServicesOpen(false), 200);
                        } else if (isSolutions) {
                          solutionsTimeoutRef.current = setTimeout(() => setSolutionsOpen(false), 200);
                        } else if (isIndustries) {
                          industriesTimeoutRef.current = setTimeout(() => setIndustriesOpen(false), 200);
                        }
                      }}
                    >
                      <button
                        className="hover-underline flex items-center gap-1 whitespace-nowrap px-2 py-3 text-sm font-medium"
                        style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}
                        onClick={() => {
                          if (isServices) {
                            setServicesOpen(!servicesOpen);
                            setSolutionsOpen(false);
                            setIndustriesOpen(false);
                          } else if (isSolutions) {
                            setSolutionsOpen(!solutionsOpen);
                            setServicesOpen(false);
                            setIndustriesOpen(false);
                          } else if (isIndustries) {
                            setIndustriesOpen(!industriesOpen);
                            setServicesOpen(false);
                            setSolutionsOpen(false);
                          }
                        }}
                      >
                        {item.label}
                        {isServices ? (
                          servicesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                        ) : isSolutions ? (
                          solutionsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                        ) : (
                          industriesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                        )}
                      </button>

                      {isOpen && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            background: '#fff',
                            borderRadius: '8px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                            minWidth: '220px',
                            marginTop: '0.5rem',
                            overflow: 'hidden',
                            zIndex: 1002
                          }}
                        >
                          {item.children?.map((child, index) => (
                            <Link
                              key={child.id}
                              href={child.href}
                              className="block px-5 py-3 text-sm text-[#001F3F] hover:bg-[#f0f4f8]"
                              style={{
                                borderBottom:
                                  index < (item.children?.length || 0) - 1 ? '1px solid #f0f0f0' : 'none'
                              }}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                if (item.type === 'link') {
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="hover-underline whitespace-nowrap px-2 py-3 text-sm font-medium text-white"
                      style={{ textDecoration: 'none' }}
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <button
                    key={item.id}
                    className="hover-underline whitespace-nowrap px-2 py-3 text-sm font-medium text-white"
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                    onClick={() => scrollToSection(item.scrollTarget)}
                  >
                    {item.label}
                  </button>
                );
              })}
          </nav>

          <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3 md:gap-4">
            <div className="hidden items-center gap-3 lg:flex">
              {hasUser ? (
                <button
                  className="hover-glow"
                  type="button"
                  onClick={handleLogout}
                  style={{
                    background: 'linear-gradient(135deg, #69E8E1 0%, #38bdf8 100%)',
                    color: '#001F3F',
                    border: 'none',
                    padding: '0.55rem 1.5rem',
                    borderRadius: '25px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 14px rgba(56, 189, 248, 0.3)'
                  }}
                >
                  Logout
                </button>
              ) : (
                <>
                  <LoginButton className="px-4 py-2 text-sm font-medium" />
                  <SignupButton className="px-4 py-2 text-sm font-medium" />
                </>
              )}

              <Link href={`/${currentLocale}/contact`} style={{ textDecoration: 'none' }}>
                <button
                  className="hover-glow"
                  style={{
                    background: 'transparent',
                    color: '#fff',
                    border: '2px solid #fff',
                    padding: '0.55rem 1.6rem',
                    borderRadius: '25px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {t('contact')}
                </button>
              </Link>
            </div>

            <LanguageSwitcher />

            <div className="relative">
              <button
                className={avatarClassName}
                title={hasUser ? userEmail || 'User' : 'Not logged in'}
                onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
                aria-expanded={avatarMenuOpen}
                aria-haspopup="true"
              >
                {hasUser ? (userInitial || 'U') : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                  >
                    <path
                      d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                      fill="currentColor"
                    />
                    <path
                      d="M12 14.5C6.99 14.5 3 18.49 3 23.5C3 23.78 3.22 24 3.5 24H20.5C20.78 24 21 23.78 21 23.5C21 18.49 17.01 14.5 12 14.5Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
              </button>

              {avatarMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1">
                    {hasUser ? (
                      <>
                        <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                          <p className="font-medium truncate">{userEmail || 'User'}</p>
                        </div>
                        <button
                          onClick={() => {
                            handleLogout();
                            setAvatarMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href={`/${currentLocale}/auth/login`}
                          className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                          onClick={() => setAvatarMenuOpen(false)}
                        >
                          Login
                        </Link>
                        <Link
                          href={`/${currentLocale}/auth/signup`}
                          className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                          onClick={() => setAvatarMenuOpen(false)}
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:hidden">
          <button
            type="button"
            onClick={() => {
              setQuickNavOpen((previous) => {
                const next = !previous;
                if (!next) {
                  setServicesOpen(false);
                  setSolutionsOpen(false);
                  setIndustriesOpen(false);
                }
                return next;
              });
            }}
            className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            aria-expanded={quickNavOpen}
            aria-controls="mobile-quick-nav"
          >
            <span>Navigation</span>
            {quickNavOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {quickNavOpen && (
            <div id="mobile-quick-nav" className="space-y-2 rounded-2xl bg-white/5 p-3">
              {navItems
                .filter((item) => !['login', 'signup'].includes(item.id))
                .map((item) => {
                  if (item.type === 'dropdown') {
                    const isServices = item.id === 'services';
                    const isSolutions = item.id === 'solutions';
                    const isIndustries = item.id === 'industries';
                    const isOpen =
                      (isServices && servicesOpen) ||
                      (isSolutions && solutionsOpen) ||
                      (isIndustries && industriesOpen);

                    const children = isServices
                      ? servicesDropdown?.children
                      : isSolutions
                      ? solutionsDropdown?.children
                      : industriesDropdown?.children;

                    return (
                      <div key={item.id} className="space-y-2">
                        <button
                          type="button"
                          onClick={() =>
                            toggleMobileDropdown(item.id as 'services' | 'solutions' | 'industries')
                          }
                          className="flex w-full items-center justify-between rounded-xl bg-white/10 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
                          aria-expanded={isOpen}
                        >
                          {item.label}
                          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>

                        {isOpen && children && (
                          <div className="space-y-2 pl-3">
                            {children.map((child) => (
                              <Link
                                key={child.id}
                                href={child.href}
                                onClick={closeMobileMenu}
                                className="block rounded-lg bg-white/10 px-3 py-2 text-sm text-white transition-colors hover:bg-white/20"
                                style={{ textDecoration: 'none' }}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  if (item.type === 'link') {
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="block rounded-xl bg-white/10 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
                        style={{ textDecoration: 'none' }}
                      >
                        {item.label}
                      </Link>
                    );
                  }

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        scrollToSection(item.scrollTarget);
                        closeMobileMenu();
                      }}
                      className="block w-full rounded-xl bg-white/10 px-3 py-2 text-left text-sm font-medium text-white transition-colors hover:bg-white/20"
                    >
                      {item.label}
                    </button>
                  );
                })}
            </div>
          )}

          {!hasUser && (
            <div className="flex gap-2">
              <LoginButton className="flex-1 justify-center" />
              <SignupButton className="flex-1 justify-center" />
            </div>
          )}

          <Link
            href={`/${currentLocale}/contact`}
            onClick={closeMobileMenu}
            style={{ textDecoration: 'none' }}
          >
            <button
              className="hover-glow w-full"
              style={{
                background: 'linear-gradient(135deg, #69E8E1 0%, #38bdf8 100%)',
                color: '#001F3F',
                border: 'none',
                padding: '0.65rem 1.25rem',
                borderRadius: '25px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '0.95rem',
                transition: 'all 0.3s ease'
              }}
            >
              {t('contact')}
            </button>
          </Link>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 overflow-hidden transition-opacity duration-300"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={closeMobileMenu}
        >
          <div
            ref={mobileMenuRef}
            className="absolute top-0 right-0 h-full w-full max-w-sm bg-[#001F3F] shadow-2xl transition-transform duration-300 translate-x-0"
            style={{ paddingTop: headerHeight }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex h-full flex-col overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#1a3a5a] p-4">
                <Link href={`/${currentLocale}`} onClick={closeMobileMenu}>
                  <div className="flex items-center">
                    <Image
                      src="/logo.svg"
                      alt="Logo"
                      width={120}
                      height={40}
                      className="h-8 w-auto"
                    />
                  </div>
                </Link>
                <button
                  onClick={closeMobileMenu}
                  className="rounded-full p-2 text-white transition-colors hover:bg-[#1a3a5a]"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex-1 space-y-1 p-4">
                {navItems
                  .filter((item) => !['login', 'signup'].includes(item.id))
                  .map((item) => {
                    switch (item.type) {
                      case 'dropdown': {
                        const isServices = item.id === 'services';
                        const isSolutions = item.id === 'solutions';
                        const isIndustries = item.id === 'industries';
                        const isOpen =
                          (isServices && servicesOpen) ||
                          (isSolutions && solutionsOpen) ||
                          (isIndustries && industriesOpen);

                        return (
                          <div key={item.id} className="border-b border-[#1a3a5a] last:border-0">
                            <button
                              onClick={() => toggleMobileDropdown(item.id as 'services' | 'solutions' | 'industries')}
                              className="flex w-full items-center justify-between py-4 px-2 text-left text-white transition-colors hover:text-[#69E8E1]"
                            >
                              <span className="font-medium">{item.label}</span>
                              {isServices ? (
                                servicesOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />
                              ) : isSolutions ? (
                                solutionsOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />
                              ) : (
                                industriesOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />
                              )}
                            </button>

                            {isOpen && (
                              <div className="space-y-2 pb-2 pl-4">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.id}
                                    href={child.href}
                                    onClick={closeMobileMenu}
                                    className="block rounded py-2 px-2 text-sm text-gray-300 transition-colors hover:bg-[#1a3a5a] hover:text-white"
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      }
                      case 'link':
                        return (
                          <div key={item.id} className="border-b border-[#1a3a5a] last:border-0">
                            <Link
                              href={item.href}
                              onClick={closeMobileMenu}
                              className="block py-4 px-2 text-white transition-colors hover:text-[#69E8E1]"
                            >
                              {item.label}
                            </Link>
                          </div>
                        );
                      case 'scroll':
                        return (
                          <div key={item.id} className="border-b border-[#1a3a5a] last:border-0">
                            <button
                              onClick={() => scrollToSection(item.scrollTarget)}
                              className="w-full py-4 px-2 text-left text-white transition-colors hover:text-[#69E8E1]"
                            >
                              {item.label}
                            </button>
                          </div>
                        );
                      default:
                        return null;
                    }
                  })}

                <div className="mt-6 space-y-3">
                  <Link
                    href={`/${currentLocale}/contact`}
                    style={{ textDecoration: 'none' }}
                    onClick={closeMobileMenu}
                  >
                    <button
                      className="hover-glow w-full"
                      style={{
                        background: 'linear-gradient(135deg, #69E8E1 0%, #38bdf8 100%)',
                        color: '#001F3F',
                        border: 'none',
                        padding: '1rem 2rem',
                        borderRadius: '25px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {t('contact')}
                    </button>
                  </Link>

                  {!hasUser && (
                    <div className="flex flex-col gap-3">
                      <LoginButton className="w-full justify-center" />
                      <SignupButton className="w-full justify-center" />
                    </div>
                  )}

                  {hasUser && (
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full rounded-full bg-white/10 px-4 py-2 text-white transition hover:bg-white/20"
                    >
                      Logout
                    </button>
                  )}
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        body.menu-open {
          overflow: hidden;
        }

        .hover-underline {
          position: relative;
        }

        .hover-underline::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 100%;
          height: 2px;
          background: linear-gradient(135deg, #69E8E1 0%, #38bdf8 100%);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.2s ease;
        }

        .hover-underline:hover::after,
        .hover-underline:focus-visible::after,
        .hover-underline.active::after {
          transform: scaleX(1);
        }

        .hover-glow {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .hover-glow:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 25px rgba(105, 232, 225, 0.35);
        }

        @media (max-width: 1024px) {
          .desktop-nav {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
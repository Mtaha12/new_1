'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, ChevronUp, User } from 'lucide-react';
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

interface HeaderProps {
  // Add any props that the Header component accepts here
}

const ADMIN_STORAGE_PREFIX = 'samurai-blog-admin-';

export default function Header(props: HeaderProps) {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const router = useRouter();
  const resolvedPath = (pathname ?? '/').replace(/\/+$/, '') || '/';
  const currentLocale = resolvedPath.split('/')[1] || 'en';

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [iconSize, setIconSize] = useState(20);
  const [userInitial, setUserInitial] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>('user@example.com');
  const [isMounted, setIsMounted] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const solutionsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const industriesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasUser = Boolean(userEmail);

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
  ];

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
    setIsMounted(true);
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
      } catch (error) {
        setUserInitial(null);
        setUserEmail(null);
      }
    };

    loadUser();

    const handleAuthChange = (event: Event) => {
      if (!('detail' in event)) {
        loadUser();
        return;
      }
      const customEvent = event as CustomEvent<any>;
      const detail = customEvent.detail;
      const emailValue =
        detail && typeof detail === 'object' && typeof detail.email === 'string'
          ? detail.email.trim()
          : '';

      setUserEmail(emailValue.length ? emailValue : null);

      if (detail && typeof detail === 'object' && typeof detail.name === 'string' && detail.name.trim().length) {
        setUserInitial(detail.name.trim().charAt(0).toUpperCase());
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

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      
      // Close mobile menu
      if (mobileNavRef.current && !mobileNavRef.current.contains(target)) {
        setIsMenuOpen(false);
      }
      
      // Close user menu
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setUserMenuOpen(false);
      }
      
      // Close all dropdowns when clicking outside
      if (!(target as HTMLElement).closest('.nav-dropdown')) {
        setServicesOpen(false);
        setSolutionsOpen(false);
      }
      if (!(target as HTMLElement).closest('.avatar-menu') && !(target as HTMLElement).closest('.avatar-button')) {
        setAvatarMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setServicesOpen(false);
    setSolutionsOpen(false);
    setIndustriesOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => document.body.classList.remove('no-scroll');
  }, [isMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      setServicesOpen(false);
      setSolutionsOpen(false);
      setIndustriesOpen(false);
    }
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setServicesOpen(false);
    setSolutionsOpen(false);
    setIndustriesOpen(false);
  };

  const handleMobileDropdown = (itemId: string) => {
    switch (itemId) {
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
    contact: 'contact'
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
    }
    closeMobileMenu();
  };

  // Helper function to check if dropdown should be open
  const isDropdownOpen = (itemId: string) => {
    switch (itemId) {
      case 'services':
        return servicesOpen;
      case 'solutions':
        return solutionsOpen;
      case 'industries':
        return industriesOpen;
      default:
        return false;
    }
  };

  return (
    <header 
      ref={mobileNavRef}
      style={{
        background: 'linear-gradient(135deg, #001F3F 0%, #000814 100%)',
        padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 4vw, 3rem)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
      }}
    >
      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <Link 
          href={`/${currentLocale}`} 
          className="hover-underline"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            textDecoration: 'none',
            zIndex: 1001
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

        {/* Desktop Navigation */}
        <nav 
          style={{
            display: 'flex',
            gap: 'clamp(0.5rem, 1.5vw, 2rem)',
            alignItems: 'center',
            color: '#fff'
          }}
          className="desktop-nav"
        >
          {navItems
            .filter((item) => !['login', 'signup'].includes(item.id))
            .map((item) => (
              <div key={item.id} style={{ position: 'relative' }}>
              {item.type === 'dropdown' ? (
                // Dropdown items
                <div 
                  className="nav-dropdown"
                  onMouseEnter={() => {
                    // Clear any pending timeouts
                    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
                    if (solutionsTimeoutRef.current) clearTimeout(solutionsTimeoutRef.current);
                    if (industriesTimeoutRef.current) clearTimeout(industriesTimeoutRef.current);
                    
                    // Close all dropdowns first
                    setServicesOpen(false);
                    setSolutionsOpen(false);
                    setIndustriesOpen(false);
                    
                    // Open the current dropdown
                    if (item.id === 'services') {
                      setServicesOpen(true);
                    } else if (item.id === 'solutions') {
                      setSolutionsOpen(true);
                    } else if (item.id === 'industries') {
                      setIndustriesOpen(true);
                    }
                  }}
                  onMouseLeave={() => {
                    // Set timeout to close the current dropdown
                    if (item.id === 'services') {
                      servicesTimeoutRef.current = setTimeout(() => setServicesOpen(false), 200);
                    } else if (item.id === 'solutions') {
                      solutionsTimeoutRef.current = setTimeout(() => setSolutionsOpen(false), 200);
                    } else if (item.id === 'industries') {
                      industriesTimeoutRef.current = setTimeout(() => setIndustriesOpen(false), 200);
                    }
                  }}
                >
                  <button 
                    className="hover-underline"
                    style={{
                      color: '#fff',
                      fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
                      fontWeight: '500',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      padding: '0.75rem 0.5rem',
                      transition: 'all 0.3s ease',
                      whiteSpace: 'nowrap'
                    }}
                    onClick={() => {
                      if (item.id === 'services') {
                        setServicesOpen(!servicesOpen);
                        setSolutionsOpen(false);
                        setIndustriesOpen(false);
                      } else if (item.id === 'solutions') {
                        setSolutionsOpen(!solutionsOpen);
                        setServicesOpen(false);
                        setIndustriesOpen(false);
                      } else if (item.id === 'industries') {
                        setIndustriesOpen(!industriesOpen);
                        setServicesOpen(false);
                        setSolutionsOpen(false);
                      }
                    }}
                  >
                    {item.label} 
                    {item.id === 'services' ? (
                      servicesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    ) : item.id === 'solutions' ? (
                      solutionsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    ) : (
                      industriesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </button>
                  
                  {/* Dropdown Menu */}
                  {((item.id === 'services' && servicesOpen) || 
                    (item.id === 'solutions' && solutionsOpen) ||
                    (item.id === 'industries' && industriesOpen)) && (
                    <div style={{
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
                    }}>
                      {item.children?.map((child, index) => (
                        <Link
                          className="hover-underline"
                          key={child.id}
                          href={child.href}
                          style={{
                            display: 'block',
                            padding: '0.75rem 1.25rem',
                            color: '#001F3F',
                            textDecoration: 'none',
                            fontSize: '0.9rem',
                            borderBottom: index < (item.children?.length || 0) - 1 ? '1px solid #f0f0f0' : 'none',
                            transition: 'background 0.2s, color 0.2s'
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                item.type === 'link' ? (
                  <Link
                    className="hover-underline"
                    href={item.href ?? '#'}
                    style={{
                      color: '#fff',
                      textDecoration: 'none',
                      fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
                      fontWeight: '500',
                      padding: '0.75rem 0.5rem',
                      transition: 'color 0.3s ease',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    className="hover-underline"
                    onClick={() => scrollToSection(item.scrollTarget ?? item.id)}
                    style={{
                      color: '#fff',
                      background: 'transparent',
                      border: 'none',
                      fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
                      fontWeight: '500',
                      padding: '0.75rem 0.5rem',
                      transition: 'color 0.3s ease',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer'
                    }}
                  >
                    {item.label}
                  </button>
                )
              )}
              </div>
            ))}
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: '1rem' }}>
            <Link href={`/${currentLocale}/contact`} style={{ textDecoration: 'none' }}>
              <button 
                className="hover-glow"
                style={{
                  background: 'transparent',
                  color: '#fff',
                  border: '2px solid #fff',
                  padding: 'clamp(0.5rem, 1.2vw, 0.6rem) clamp(1rem, 1.5vw, 1.5rem)',
                  borderRadius: '25px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                {t('contact')}
              </button>
            </Link>
            <div className="hidden md:flex items-center gap-3">
              {hasUser ? (
                <button
                  className="hover-glow"
                  type="button"
                  onClick={handleLogout}
                  style={{
                    background: 'linear-gradient(135deg, #69E8E1 0%, #38bdf8 100%)',
                    color: '#001F3F',
                    border: 'none',
                    padding: '0.5rem 1.25rem',
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
            </div>
          </div>
        </nav>

        {/* Right Section - Language Switcher and Avatar */}
        <div className="flex items-center z-50" style={{ gap: '3rem' }}>
          <div className="flex-shrink-0">
            <LanguageSwitcher />
          </div>
          
          {/* Avatar with Dropdown Menu */}
          <div className="relative">
            <button 
              className={`w-10 h-10 rounded-full flex items-center justify-center focus:outline-none transition-colors ${
                hasUser 
                  ? 'bg-gradient-to-r from-[#69E8E1] to-[#38bdf8] text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
              }`}
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
                  className="w-5 h-5"
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
            
            {/* Dropdown Menu */}
            {avatarMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
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
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        href={`/${currentLocale}/auth/login`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setAvatarMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link 
                        href={`/${currentLocale}/auth/signup`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
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

          {/* Mobile menu button */}
          <button
            className="p-2 text-white hover:text-gray-300 transition-colors md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X size={iconSize} />
            ) : (
              <Menu size={iconSize} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div 
          className="mobile-nav-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999
          }}
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Navigation Menu */}
      <div 
        className="mobile-nav"
        style={{
          position: 'fixed',
          top: 0,
          right: isMenuOpen ? 0 : '-100%',
          width: 'min(400px, 85vw)',
          height: '100vh',
          background: 'linear-gradient(135deg, #001F3F 0%, #000814 100%)',
          zIndex: 1000,
          transition: 'right 0.3s ease-in-out',
          overflowY: 'auto',
          padding: '2rem 1.5rem',
          boxShadow: '-4px 0 20px rgba(0,0,0,0.3)'
        }}
      >
        {/* Close Button */}
        <button
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'transparent',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            padding: '0.5rem'
          }}
          onClick={closeMobileMenu}
        >
          <X size={24} />
        </button>

        <div
          className="header-avatar-shell"
          style={{
            marginTop: '4.5rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1.25rem 1rem',
            borderRadius: '18px',
            background: 'linear-gradient(135deg, rgba(105, 232, 225, 0.15) 0%, rgba(56, 189, 248, 0.2) 100%)',
            border: '1px solid rgba(105, 232, 225, 0.35)'
          }}
        >
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, rgba(105, 232, 225, 0.45) 0%, rgba(56, 189, 248, 0.7) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '1.1rem',
              color: '#001F3F',
              boxShadow: '0 16px 32px rgba(56, 189, 248, 0.22)'
            }}
          >
            {hasUser ? (
              userInitial
            ) : (
              <User
                size={26}
                strokeWidth={2.1}
                color="#001F3F"
              />
            )}
          </div>
        </div>

        {/* Mobile Navigation Links */}
        <nav style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '0.5rem',
          marginTop: '3rem',
          alignItems: 'stretch'
        }}>
          {navItems
            .filter((item) => !['login', 'signup'].includes(item.id))
            .map((item) => (
            <div key={item.id} style={{ width: '100%' }}>
              {item.type === 'dropdown' ? (
                <div style={{ marginBottom: '1rem', width: '100%' }}>
                  <button
                    onClick={() => handleMobileDropdown(item.id)}
                    style={{
                      color: '#fff',
                      background: 'transparent',
                      border: 'none',
                      fontSize: '1.05rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      width: '100%',
                      textAlign: 'left',
                      padding: '1rem 0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                      gap: '0.75rem'
                    }}
                  >
                    {item.label} 
                    {isDropdownOpen(item.id) ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>
                  
                  {/* Mobile Dropdown Content */}
                  {((item.id === 'services' && servicesOpen) ||
                    (item.id === 'solutions' && solutionsOpen) ||
                    (item.id === 'industries' && industriesOpen)) && (
                    <div style={{ paddingLeft: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                      {item.children.map((child) => (
                        <Link
                          key={child.id}
                          href={child.href}
                          style={{
                            display: 'block',
                            width: '100%',
                            padding: '0.85rem 0',
                            color: '#d1d5db',
                            textDecoration: 'none',
                            fontSize: '0.95rem',
                            borderBottom: '1px solid rgba(255,255,255,0.08)',
                            transition: 'color 0.3s ease'
                          }}
                          onClick={closeMobileMenu}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                // Mobile regular links
                item.type === 'link' ? (
                  <Link
                    href={item.href ?? '#'}
                    style={{
                      color: '#fff',
                      textDecoration: 'none',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      padding: '1rem 0.5rem',
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                      transition: 'color 0.3s ease',
                      display: 'block'
                    }}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    className="hover-underline"
                    onClick={() => scrollToSection(item.scrollTarget ?? item.id)}
                    style={{
                      color: '#fff',
                      background: 'transparent',
                      border: 'none',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      padding: '1rem 0.5rem',
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                      transition: 'color 0.3s ease',
                      width: '100%',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    {item.label}
                  </button>
                )
              )}
            </div>
          ))}
          
          {/* Mobile Contact Button */}
          <Link 
            href={`/${currentLocale}/contact`} 
            style={{ 
              textDecoration: 'none',
              marginTop: '1.5rem'
            }} 
            onClick={closeMobileMenu}
          >
            <button 
              className="hover-glow"
              style={{
                background: 'transparent',
                color: '#fff',
                border: '2px solid #fff',
                padding: '1rem 2rem',
                borderRadius: '25px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '1rem',
                width: '100%',
                transition: 'all 0.3s ease'
              }}
            >
              {t('contact')}
            </button>
          </Link>

          {!hasUser && (
            <div className="w-full px-4 mt-4 space-y-3">
              <div className="flex flex-col gap-3">
                <LoginButton variant="minimal" className="w-full justify-center" />
                <SignupButton className="w-full justify-center" />
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* Responsive Styles */}
      <style jsx global>{`
        /* Desktop styles */
        @media (min-width: 1025px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
          .mobile-nav-overlay {
            display: none !important;
          }
        }
        
        /* Tablet and Mobile styles */
        @media (max-width: 1024px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }

        /* Mobile-specific adjustments */
        @media (max-width: 480px) {
          .mobile-nav {
            width: 100vw !important;
            right: -100vw !important;
          }
          .mobile-nav[style*="right: 0"] {
            right: 0 !important;
          }
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Prevent body scroll when mobile menu is open */
        body.no-scroll {
          overflow: hidden;
        }
      `}</style>
    </header>
  );
}
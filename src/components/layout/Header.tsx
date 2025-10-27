'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, ChevronUp, User } from 'lucide-react';
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

export default function Header(props: HeaderProps) {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [iconSize, setIconSize] = useState(24);
  const [userInitial, setUserInitial] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const hasUser = Boolean(userInitial);

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
        { id: 'healthcare', label: t('industriesMenu.healthcare'), href: `/${currentLocale}/industries/healthcare` },
        { id: 'finance', label: t('industriesMenu.finance'), href: `/${currentLocale}/industries/finance` },
        { id: 'government', label: t('industriesMenu.government'), href: `/${currentLocale}/industries/government` },
        { id: 'technology', label: t('industriesMenu.technology'), href: `/${currentLocale}/industries/technology` },
        { id: 'retail', label: t('industriesMenu.retail'), href: `/${currentLocale}/industries/retail` }
      ]
    },
    {
      id: 'partners',
      label: t('partners'),
      type: 'scroll',
      scrollTarget: 'industries'
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
      scrollTarget: 'about'
    },
    {
      id: 'login',
      label: t('login'),
      href: `/${currentLocale}/auth/login`,
      type: 'link'
    },
    {
      id: 'signup',
      label: t('signup'),
      href: `/${currentLocale}/auth/signup`,
      type: 'link'
    }
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
          return;
        }
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object' && typeof parsed.name === 'string' && parsed.name.trim().length) {
          setUserInitial(parsed.name.trim().charAt(0).toUpperCase());
        } else if (parsed && typeof parsed.email === 'string' && parsed.email.trim().length) {
          setUserInitial(parsed.email.trim().charAt(0).toUpperCase());
        } else {
          setUserInitial(null);
        }
      } catch (error) {
        setUserInitial(null);
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
      if (detail && typeof detail === 'object' && typeof detail.name === 'string' && detail.name.trim().length) {
        setUserInitial(detail.name.trim().charAt(0).toUpperCase());
      } else if (detail && typeof detail.email === 'string' && detail.email.trim().length) {
        setUserInitial(detail.email.trim().charAt(0).toUpperCase());
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
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileNavRef.current && !mobileNavRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setServicesOpen(false);
        setSolutionsOpen(false);
        setIndustriesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  const sectionMapping: Record<string, string> = {
    about: 'about',
    'about-us': 'about',
    services: 'services',
    partners: 'industries',
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
          {navItems.map((item) => (
            <div key={item.id} style={{ position: 'relative' }}>
              {item.type === 'dropdown' ? (
                // Dropdown items
                <div 
                  onMouseEnter={() => {
                    handleMobileDropdown(item.id);
                    setServicesOpen(item.id === 'services' ? true : servicesOpen);
                    setSolutionsOpen(item.id === 'solutions' ? true : solutionsOpen);
                    setIndustriesOpen(item.id === 'industries' ? true : industriesOpen);
                  }}
                  onMouseLeave={() => {
                    if (item.id === 'services') setServicesOpen(false);
                    if (item.id === 'solutions') setSolutionsOpen(false);
                    if (item.id === 'industries') setIndustriesOpen(false);
                  }}
                  style={{ position: 'relative' }}
                >
                  <button 
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
                    onMouseEnter={(e) => e.currentTarget.style.color = '#60a5fa'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
                  >
                    {item.label} <ChevronDown size={16} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {isDropdownOpen(item.id) && (
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
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f8f9fa';
                            e.currentTarget.style.color = '#0066cc';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = '#001F3F';
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
                    onMouseEnter={(e) => e.currentTarget.style.color = '#60a5fa'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
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
                    onMouseEnter={(e) => e.currentTarget.style.color = '#60a5fa'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.color = '#001F3F';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#fff';
                }}
              >
                {t('contact')}
              </button>
            </Link>
            <Link href={`/${currentLocale}/auth/signup`} style={{ textDecoration: 'none' }}>
              <button
                style={{
                  background: 'linear-gradient(135deg, #69E8E1 0%, #38bdf8 100%)',
                  color: '#001F3F',
                  border: 'none',
                  padding: 'clamp(0.5rem, 1.2vw, 0.6rem) clamp(1rem, 1.5vw, 1.5rem)',
                  borderRadius: '25px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 10px 24px rgba(56, 189, 248, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 14px 32px rgba(56, 189, 248, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 24px rgba(56, 189, 248, 0.3)';
                }}
              >
                {t('signup')}
              </button>
            </Link>
          </div>
        </nav>

        {/* Right Section - Language Switcher and Mobile Menu */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 'clamp(0.75rem, 2vw, 1rem)',
          zIndex: 1001
        }}>
          <LanguageSwitcher />

          <div
            className="header-avatar-shell"
            aria-label={isMounted && hasUser ? t('welcomeBack') : t('login')}
            style={{
              width: 'clamp(38px, 4vw, 44px)',
              height: 'clamp(38px, 4vw, 44px)',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, rgba(105, 232, 225, 0.4) 0%, rgba(56, 189, 248, 0.65) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
              color: '#001F3F',
              boxShadow: '0 12px 26px rgba(56, 189, 248, 0.28)'
            }}
          >
            {isMounted && hasUser ? (
              userInitial
            ) : (
              <User
                size={Math.min(Math.max(iconSize - 6, 18), 26)}
                strokeWidth={2.1}
                color="#001F3F"
              />
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="mobile-menu-btn"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.3s ease'
            }}
            onClick={toggleMobileMenu}
            onMouseEnter={(e) => e.currentTarget.style.color = '#60a5fa'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
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
          <span style={{ color: '#e2e8f0', fontSize: '1rem', fontWeight: 600 }}>
            {isMounted && hasUser ? t('welcomeBack') : t('login')}
          </span>
        </div>

        {/* Mobile Navigation Links */}
        <nav style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '0.5rem',
          marginTop: '3rem'
        }}>
          {navItems.map((item) => (
            <div key={item.id}>
              {item.type === 'dropdown' ? (
                <div style={{ marginBottom: '1rem' }}>
                  <button
                    onClick={() => handleMobileDropdown(item.id)}
                    style={{
                      color: '#fff',
                      background: 'transparent',
                      border: 'none',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      width: '100%',
                      textAlign: 'left',
                      padding: '1rem 0.5rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderBottom: '1px solid rgba(255,255,255,0.1)'
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
                    <div style={{ paddingLeft: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                      {item.children.map((child) => (
                        <Link
                          key={child.id}
                          href={child.href}
                          style={{
                            display: 'block',
                            padding: '0.875rem 1rem',
                            color: '#ccc',
                            textDecoration: 'none',
                            fontSize: '1rem',
                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                            transition: 'color 0.3s ease'
                          }}
                          onClick={closeMobileMenu}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#60a5fa'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#ccc'}
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
                    onMouseEnter={(e) => e.currentTarget.style.color = '#60a5fa'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
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
                    onMouseEnter={(e) => e.currentTarget.style.color = '#60a5fa'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
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
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.color = '#001F3F';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#fff';
              }}
            >
              {t('contact')}
            </button>
          </Link>

          <Link
            href={`/${currentLocale}/auth/signup`}
            style={{
              textDecoration: 'none',
              marginTop: '1rem'
            }}
            onClick={closeMobileMenu}
          >
            <button
              style={{
                background: 'linear-gradient(135deg, #69E8E1 0%, #38bdf8 100%)',
                color: '#001F3F',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '25px',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '1rem',
                width: '100%',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                boxShadow: '0 18px 36px rgba(56, 189, 248, 0.35)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 22px 40px rgba(56, 189, 248, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 18px 36px rgba(56, 189, 248, 0.35)';
              }}
            >
              {t('signup')}
            </button>
          </Link>
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

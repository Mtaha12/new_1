'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function InfrastructurePage() {
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';
  const t = useTranslations('ServicesPage.infrastructure');
  const tConsulting = useTranslations('ServicesPage.consulting');
  const common = useTranslations('Common');

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <Header />

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1a1f71 0%, #0a0e3d 50%, #00bcd4 100%)',
        padding: '6rem 3rem',
        textAlign: 'center',
        color: '#fff'
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '800',
          marginBottom: '1.5rem'
        }}>
          {t('hero')}
        </h1>
        <p style={{
          fontSize: '1.2rem',
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.8',
          opacity: 0.9
        }}>
          {t('heroDesc')}
        </p>
        <button style={{
          background: '#00bcd4',
          color: '#fff',
          border: 'none',
          padding: '1rem 2.5rem',
          borderRadius: '30px',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: 'pointer',
          marginTop: '2rem'
        }}>
          {t('getStarted')}
        </button>
      </section>

      {/* Content Section 1 */}
      <section style={{
        padding: '6rem 3rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        maxWidth: '1400px',
        margin: '0 auto',
        alignItems: 'center'
      }}>
        <div>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: '#0a0e3d',
            marginBottom: '1.5rem'
          }}>
            {tConsulting('section1Title')}
          </h2>
          <p style={{
            color: '#666',
            lineHeight: '1.8',
            fontSize: '1.05rem',
            marginBottom: '1.5rem'
          }}>
            {tConsulting('section1Para1')}
          </p>
          <p style={{
            color: '#666',
            lineHeight: '1.8',
            fontSize: '1.05rem'
          }}>
            {tConsulting('section1Para2')}
          </p>
        </div>
        <div style={{
          background: '#f0f0f0',
          borderRadius: '20px',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #4A148C 0%, #1a1f71 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '5rem'
          }}>
            🤖
          </div>
        </div>
      </section>

      {/* Content Section 2 */}
      <section style={{
        padding: '6rem 3rem',
        background: '#f8f9fa',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        maxWidth: '1400px',
        margin: '0 auto',
        alignItems: 'center'
      }}>
        <div style={{
          background: '#fff',
          borderRadius: '20px',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #00bcd4 0%, #1a1f71 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '5rem'
          }}>
            🏗️
          </div>
        </div>
        <div>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: '#0a0e3d',
            marginBottom: '1.5rem'
          }}>
            {tConsulting('section2Title')}
          </h2>
          <p style={{
            color: '#666',
            lineHeight: '1.8',
            fontSize: '1.05rem',
            marginBottom: '1.5rem'
          }}>
            {tConsulting('section2Para1')}
          </p>
          <p style={{
            color: '#666',
            lineHeight: '1.8',
            fontSize: '1.05rem'
          }}>
            {tConsulting('section2Para2')}
          </p>
        </div>
      </section>

      {/* Other Services Section */}
      <section style={{
        background: '#0a0e3d',
        padding: '6rem 3rem'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#fff',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          {tConsulting('otherServices')}
        </h2>
        <div style={{
          display: 'grid',
          gap: '2rem',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {[
            { title: tConsulting('consulting').split(' ')[0] + ' ' + tConsulting('consulting').split(' ').slice(1).join(' '), icon: '📊', href: `/${currentLocale}/services/consulting` },
            { title: tConsulting('managedIT'), icon: '⚙️', href: `/${currentLocale}/services/managed-it` },
            { title: tConsulting('devsecops'), icon: '🔧', href: `/${currentLocale}/services/devsecops` }
          ].map((service, idx) => (
            <Link key={idx} href={service.href} style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#1a1f71',
                borderRadius: '15px',
                border: '1px solid rgba(0,188,212,0.2)',
                transition: 'transform 0.3s',
                cursor: 'pointer',
                height: '100%'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: '#0a0e3d',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  fontSize: '2rem'
                }}>
                  {service.icon}
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: '#fff',
                  marginBottom: '1rem'
                }}>
                  {service.title}
                </h3>
                <p style={{
                  color: '#ccc',
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  {tConsulting('serviceDesc')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Resources Section */}
      <section style={{
        background: '#fff',
        padding: '6rem 3rem'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#0a0e3d',
          textAlign: 'center',
          marginBottom: '1rem'
        }}>
          {tConsulting('resources')}
        </h2>
        <p style={{
          color: '#666',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto 4rem',
          lineHeight: '1.8'
        }}>
          {tConsulting('resourcesIntro')}
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {[
            { title: 'Top ID Penetration Testing Tools Cybersecurity Experts Are Using Right Now', image: '🔐' },
            { title: 'Top CyberSecurity Services Businesses Need In 2025', image: '🛡️' },
            { title: 'Black Hat USA 2025 Closes Out on a High Node In Los Vegas', image: '🎩' }
          ].map((resource, idx) => (
            <div key={idx} style={{
              background: '#0a0e3d',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                height: '200px',
                background: 'linear-gradient(135deg, #1a1f71 0%, #0a0e3d 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4rem'
              }}>
                {resource.image}
              </div>
              <div style={{ padding: '2rem' }}>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: '#fff',
                  marginBottom: '1.5rem',
                  lineHeight: '1.4'
                }}>
                  {resource.title}
                </h3>
                <button style={{
                  background: '#00bcd4',
                  color: '#0a0e3d',
                  border: 'none',
                  padding: '0.7rem 1.5rem',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}>
                  {tConsulting('readMore')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: '#f8f9fa',
        padding: '4rem 3rem',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          background: '#fff',
          borderRadius: '20px',
          padding: '3rem',
          border: '2px solid #e0e0e0'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '800',
            color: '#0a0e3d',
            marginBottom: '1rem'
          }}>
            {tConsulting('ctaTitle')}
          </h2>
          <p style={{
            color: '#666',
            marginBottom: '2rem'
          }}>
            {tConsulting('ctaDesc')}
          </p>
          <button style={{
            background: '#00bcd4',
            color: '#fff',
            border: 'none',
            padding: '1rem 3rem',
            borderRadius: '30px',
            fontSize: '1rem',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,188,212,0.3)'
          }}>
            {tConsulting('learnMore')}
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

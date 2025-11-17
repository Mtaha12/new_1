'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

type HomeResourceCard = {
  title: string;
  description?: string;
  slug?: string;
  tag?: string;
  image?: string;
};

export default function IndustriesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<any>(null);
  const t = useTranslations('Industries');
  const tHome = useTranslations('HomePage');
  const pathname = usePathname();
  const resolvedPath = (pathname ?? '/').replace(/\/+$/, '') || '/';
  const currentLocale = resolvedPath.split('/')[1] || 'en';
  const isArabic = currentLocale === 'ar';

  // Resources data
  const resourcesTitle = tHome('resourcesTitle');
  const resourcesDescription = tHome('resourcesDescription');
  const resourcesRaw = tHome.raw('resourcesCards');
  const resourcesCards: HomeResourceCard[] = Array.isArray(resourcesRaw)
    ? (resourcesRaw as HomeResourceCard[])
    : [];

  const industries = [
    {
      id: 'financial-services',
      image: '/img/p1.png',
      title: t('financialServices.title'),
      description: t('financialServices.description'),
      reasons: [
        t('financialServices.reasons.transactionIntegrity'),
        t('financialServices.reasons.dataSecurity'),
        t('financialServices.reasons.reputationAssurance')
      ]
    },
    {
      id: 'healthcare-life-sciences',
      image: '/img/p2.png',
      title: t('healthcareLifeSciences.title'),
      description: t('healthcareLifeSciences.description'),
      reasons: [
        t('healthcareLifeSciences.reasons.patientDataProtection'),
        t('healthcareLifeSciences.reasons.regulatoryCompliance'),
        t('healthcareLifeSciences.reasons.empowerHealthcareProfessionals')
      ]
    },
    {
      id: 'retail',
      image: '/img/p3.png',
      title: t('retail.title'),
      description: t('retail.description'),
      reasons: [
        t('retail.reasons.iotOtExpertise'),
        t('retail.reasons.uninterruptedOperations'),
        t('retail.reasons.digitalPhysicalSecurityIntegration')
      ]
    },
    {
      id: 'manufacturing-cpg',
      image: '/img/p4.png',
      title: t('manufacturingCpg.title'),
      description: t('manufacturingCpg.description'),
      reasons: [
        t('manufacturingCpg.reasons.threatDetectionPrevention'),
        t('manufacturingCpg.reasons.secureProductDevelopment')
      ]
    },
    {
      id: 'accommodations-food',
      image: '/img/p5.png',
      title: t('accommodationsFood.title'),
      description: t('accommodationsFood.description'),
      reasons: [
        t('accommodationsFood.reasons.networkSecurity'),
        t('accommodationsFood.reasons.dataEncryption'),
        t('accommodationsFood.reasons.mobileDeviceSecurity')
      ]
    },
    {
      id: 'utilities-energy',
      image: '/img/p6.png',
      title: t('utilitiesEnergy.title'),
      description: t('utilitiesEnergy.description'),
      reasons: [
        t('utilitiesEnergy.reasons.infrastructureResilience'),
        t('utilitiesEnergy.reasons.operationalContinuity'),
        t('utilitiesEnergy.reasons.complianceAssurance')
      ]
    },
    {
      id: 'legal-professional',
      image: '/img/p7.png',
      title: t('legalProfessional.title'),
      description: t('legalProfessional.description'),
      reasons: [
        t('legalProfessional.reasons.expertise'),
        t('legalProfessional.reasons.comprehensiveServices')
      ]
    },
    {
      id: 'government-education',
      image: '/img/p8.png',
      title: t('governmentEducation.title'),
      description: t('governmentEducation.description'),
      reasons: [
        t('governmentEducation.reasons.criticalInfrastructureProtection'),
        t('governmentEducation.reasons.secureLearningEnvironment'),
        t('governmentEducation.reasons.continuousServiceAssurance')
      ]
    },
    {
      id: 'supply-chain-logistics',
      image: '/img/p9.png',
      title: t('supplyChainLogistics.title'),
      description: t('supplyChainLogistics.description'),
      reasons: [
        t('supplyChainLogistics.reasons.supplyChainRiskAssessment')
      ]
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#fff', direction: isArabic ? 'rtl' : 'ltr' }}>
      <Header />
      
      {/* Hero Section */}
      <section 
        style={{
          background: 'linear-gradient(rgba(10, 14, 61, 0.85), rgba(19, 70, 163, 0.85)), url("/img/ihero.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: '#fff',
          padding: 'clamp(3rem, 8vw, 6rem) 0',
          textAlign: 'center'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
            fontWeight: '700', 
            marginBottom: '1.5rem',
            lineHeight: '1.2'
          }}>
            {t('title')}
          </h1>
          <p style={{ 
            fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', 
            maxWidth: '800px', 
            margin: '0 auto 2rem',
            lineHeight: '1.6',
            opacity: 0.9
          }}>
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 0', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isArabic ? '1fr 1fr' : '1fr 1fr',
            gap: 'clamp(2rem, 4vw, 3rem)',
            alignItems: 'center'
          }}>
            <div style={{ 
              order: isArabic ? 2 : 1,
              lineHeight: '1.7'
            }}>
              <p style={{ 
                fontSize: 'clamp(1.05rem, 2vw, 1.2rem)', 
                color: '#475569',
                marginBottom: '1.5rem'
              }}>
                {t('intro.paragraph1')}
              </p>
              <p style={{ 
                fontSize: 'clamp(1.05rem, 2vw, 1.2rem)', 
                color: '#475569',
                marginBottom: '1.5rem'
              }}>
                {t('intro.paragraph2')}
              </p>
              <p style={{ 
                fontSize: 'clamp(1.05rem, 2vw, 1.2rem)', 
                color: '#475569'
              }}>
                {t('intro.paragraph3')}
              </p>
            </div>
            <div style={{
              order: isArabic ? 1 : 2,
              position: 'relative',
              height: 'clamp(300px, 40vw, 400px)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
            }}>
              <Image
                src="/img/p10.jpg"
                alt="Industry Solutions"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section style={{ 
        padding: 'clamp(3rem, 8vw, 5rem) 0',
        backgroundColor: '#0a0e3d',
        color: '#fff'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: 'clamp(2rem, 4vw, 3rem)'
          }}>
            {industries.map((industry) => (
              <div
                key={industry.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
                }}
              >
                {/* Image */}
                <div style={{ height: '250px', position: 'relative', overflow: 'hidden' }}>
                  <Image
                    src={industry.image}
                    alt={industry.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                {/* Content */}
                <div style={{ 
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1
                }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      fontSize: 'clamp(1.3rem, 2.5vw, 1.5rem)', 
                      fontWeight: '600', 
                      color: '#fff',
                      marginBottom: '1rem'
                    }}>
                      {industry.title}
                    </h3>
                    
                    <p style={{ 
                      fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)', 
                      color: 'rgba(255, 255, 255, 0.8)',
                      lineHeight: '1.6',
                      marginBottom: '1.5rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {industry.description}
                    </p>
                  </div>

                  {/* Arrow Button */}
                  <button
                    onClick={() => setSelectedIndustry(industry)}
                    style={{
                      background: 'linear-gradient(135deg, #69E8E1 0%, #38bdf8 100%)',
                      color: '#001F3F',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '25px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontSize: 'clamp(0.9rem, 1.4vw, 0.95rem)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginTop: 'auto',
                      alignSelf: 'flex-start'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(105, 232, 225, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {t('learnMore')}
                    <span style={{ fontSize: '1.2rem' }}>{isArabic ? '←' : '→'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popup Modal */}
      {selectedIndustry && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}
          onClick={() => setSelectedIndustry(null)}
        >
          <div 
            style={{
              background: '#fff',
              borderRadius: '16px',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative',
              direction: isArabic ? 'rtl' : 'ltr'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndustry(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                [isArabic ? 'left' : 'right']: '1rem',
                background: '#f3f4f6',
                border: 'none',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                color: '#666',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e5e7eb';
                e.currentTarget.style.color = '#000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f3f4f6';
                e.currentTarget.style.color = '#666';
              }}
            >
              ×
            </button>

            {/* Content */}
            <div style={{ padding: '3rem 2rem 2rem' }}>
              {/* Image */}
              <div style={{ 
                height: '300px', 
                position: 'relative', 
                overflow: 'hidden',
                borderRadius: '12px',
                marginBottom: '2rem'
              }}>
                <Image
                  src={selectedIndustry.image}
                  alt={selectedIndustry.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Title */}
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                fontWeight: '700',
                color: '#0a0e3d',
                marginBottom: '1.5rem',
                lineHeight: '1.2'
              }}>
                {selectedIndustry.title}
              </h2>

              {/* Description */}
              <p style={{
                fontSize: 'clamp(1.05rem, 2vw, 1.2rem)',
                color: '#475569',
                lineHeight: '1.7',
                marginBottom: '2rem'
              }}>
                {selectedIndustry.description}
              </p>

              {/* Why Choose Section */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: 'clamp(1.3rem, 2.5vw, 1.5rem)',
                  fontWeight: '600',
                  color: '#0a0e3d',
                  marginBottom: '1.5rem'
                }}>
                  {t('whyChooseTitle')}
                </h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {selectedIndustry.reasons.map((reason: string, index: number) => (
                    <li
                      key={index}
                      style={{
                        marginBottom: '1rem',
                        paddingLeft: isArabic ? '0' : '2rem',
                        paddingRight: isArabic ? '2rem' : '0',
                        position: 'relative',
                        fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
                        color: '#475569',
                        lineHeight: '1.6'
                      }}
                    >
                      <span style={{
                        position: 'absolute',
                        [isArabic ? 'right' : 'left']: '0',
                        top: '0',
                        color: '#69E8E1',
                        fontWeight: 'bold'
                      }}>
                        {isArabic ? '◀' : '▶'}
                      </span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div style={{ textAlign: 'center' }}>
                <Link
                  href={`/${currentLocale}/contact`}
                  style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #69E8E1 0%, #38bdf8 100%)',
                    color: '#001F3F',
                    padding: '1rem 2rem',
                    borderRadius: '25px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    fontSize: 'clamp(1rem, 1.8vw, 1.1rem)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(105, 232, 225, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {t('ctaButton')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      
      {/* Resources Section */}
      <section style={{
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
        background: '#fff',
        direction: isArabic ? 'rtl' : 'ltr'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '800',
            color: '#0a0e3d',
            lineHeight: '1.2',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            {tHome('resourcesTitle')}
          </h2>
          <p style={{
            color: '#666',
            lineHeight: '1.8',
            maxWidth: '800px',
            margin: '0 auto 3rem',
            fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
            textAlign: 'center'
          }}>
            {tHome('resourcesDescription')}
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '2rem'
          }}>
            {resourcesCards.map((resource: HomeResourceCard, index: number) => (
              <div
                key={index}
                className={`resource-card tilt-card delay-${(index % 3) + 1}`}
                style={{
                  background: '#0a0e3d',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '200px'
                }}>
                  <Image
                    src={resource.image || '/img/resource1.jpg'}
                    alt={resource.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    ...(isArabic ? { right: '1rem' } : { left: '1rem' }),
                    background: '#fff',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#0a0e3d'
                  }}>
                    {resource.tag ?? ''}
                  </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{
                    fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
                    fontWeight: '700',
                    color: '#fff',
                    lineHeight: '1.4',
                    marginBottom: resource.description ? '0.75rem' : '0',
                    textAlign: isArabic ? 'right' : 'left'
                  }}>
                    {resource.title}
                  </h3>
                  {resource.description && (
                    <p
                      style={{
                        color: 'rgba(255,255,255,0.85)',
                        lineHeight: 1.6,
                        margin: 0,
                        textAlign: isArabic ? 'right' : 'left',
                        fontSize: '0.9rem'
                      }}
                    >
                      {resource.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        position: 'relative',
        padding: '0 clamp(1.5rem, 5vw, 3rem)',
        marginBottom: '-5rem',
        zIndex: 10
      }}>
        <div style={{
          maxWidth: '1200px',
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
              {t('cta.title')}
            </h2>
            <p style={{
              fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
              lineHeight: '1.6',
              marginBottom: '2rem',
              color: '#666',
              maxWidth: '700px',
              margin: '0 auto 2rem'
            }}>
              {t('cta.description')}
            </p>
            <Link
              href={`/${currentLocale}/contact`}
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
              {t('cta.button')}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

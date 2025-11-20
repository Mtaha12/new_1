import Image from 'next/image';
import Link from 'next/link';
import { CSSProperties } from 'react';
import FloatingCTA from '@/components/ui/FloatingCTA';

export type HeroContent = {
  title: string;
  description: string;
  supportingText?: string;
  buttonLabel: string;
  buttonHref: string;
};

type SectionVariant = 'split' | 'centered';

type FullWidthImage = {
  src: string;
  alt: string;
};

export type ContentSection = {
  title: string;
  paragraphs: string[];
  imageSrc?: string;
  imageAlt?: string;
  imageSide?: 'left' | 'right';
  variant?: SectionVariant;
  background?: string;
  fullWidthImage?: FullWidthImage;
};

export type OtherServiceCard = {
  title: string;
  description: string;
  href: string;
  icon?: string;
};

export type ResourceCard = {
  title: string;
  tag: string;
  imageSrc: string;
  href?: string;
};

export type CallToActionContent = {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
};

type ServicePageLayoutProps = {
  hero: HeroContent;
  sections: ContentSection[];
  otherServices: OtherServiceCard[];
  otherServicesTitle: string;
  resourcesTitle: string;
  resourcesIntro: string;
  cta: CallToActionContent;
  resources?: ResourceCard[];
};

const DEFAULT_RESOURCES: ResourceCard[] = [
  {
    title: 'Top 10 Penetration Testing Tools Cybersecurity Experts Are Using Right Now',
    tag: 'Cybersecurity',
    imageSrc: '/img/resource1.jpg'
  },
  {
    title: 'Top Cybersecurity Services Businesses Need in 2025',
    tag: 'Cybersecurity',
    imageSrc: '/img/resource2.jpg'
  },
  {
    title: 'Black Hat USA 2025 Closes Out on a High Note in Las Vegas',
    tag: 'Black Hat',
    imageSrc: '/img/resource3.jpg'
  }
];

const SECTION_VERTICAL_PADDING = 'clamp(3rem, 8vw, 6rem)';
const SECTION_HORIZONTAL_PADDING = 'clamp(1.5rem, 6vw, 3rem)';

const sectionContainerStyle: CSSProperties = {
  maxWidth: '1140px',
  margin: '0 auto'
};

const COLORS = {
  primary: '#69E8E1',
  primaryDark: '#0a0e3d',
  accentBlue: '#1368ff',
  surface: '#f4f7ff',
  surfaceAlt: '#eef4ff',
  text: '#0a0e3d',
  textMuted: '#4d5566'
};

const SERVICE_CARD_CLASS = 'tilt-card hover-glow service-card';
const RESOURCE_CARD_CLASS = 'tilt-card resource-card';

const ServicePageLayout = ({
  hero,
  sections,
  otherServices,
  otherServicesTitle,
  resourcesTitle,
  resourcesIntro,
  cta,
  resources
}: ServicePageLayoutProps) => {
  const resourcesToRender = resources && resources.length ? resources : DEFAULT_RESOURCES;

  return (
    <main style={{ background: '#fff' }}>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(rgba(5, 12, 40, 0.85), rgba(12, 47, 108, 0.85)), url("/img/servicehero.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: '#fff',
          padding: 'clamp(4rem, 10vw, 7rem) clamp(1.5rem, 6vw, 3.5rem)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 12% 18%, rgba(105, 232, 225, 0.3) 0%, transparent 55%)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 80% 30%, rgba(19, 104, 255, 0.2) 0%, transparent 60%)'
          }}
        />
        <div
          className="fade-section"
          style={{ position: 'relative', zIndex: 1, maxWidth: '820px', margin: '0 auto' }}
        >
          <h1
            style={{
              fontSize: 'clamp(2.3rem, 5vw, 3.6rem)',
              fontWeight: 800,
              marginBottom: '1.25rem',
              lineHeight: 1.15
            }}
          >
            {hero.title}
          </h1>
          <p
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
              lineHeight: 1.8,
              opacity: 0.9,
              marginBottom: hero.supportingText ? '1.75rem' : '2.5rem'
            }}
          >
            {hero.description}
          </p>
          {hero.supportingText ? (
            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)',
                opacity: 0.85,
                lineHeight: 1.7,
                marginBottom: '2.5rem'
              }}
            >
              {hero.supportingText}
            </p>
          ) : null}
          <Link
            href={hero.buttonHref}
            prefetch={false}
            style={{
              display: 'inline-block',
              background: COLORS.primary,
              color: '#051138',
              padding: '0.9rem 2.8rem',
              borderRadius: '999px',
              fontWeight: 700,
              fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
              textDecoration: 'none',
              boxShadow: '0 18px 40px rgba(105, 232, 225, 0.3)'
            }}
            className="glow-button"
          >
            {hero.buttonLabel}
          </Link>
        </div>
      </section>

      {/* Content Sections */}
      {sections.map((section, index) => {
        const variant: SectionVariant = section.variant ?? 'split';

        if (variant === 'centered') {
          return (
            <section
              key={section.title + index}
              className="fade-section"
              style={{
                padding: `${SECTION_VERTICAL_PADDING} ${SECTION_HORIZONTAL_PADDING}`,
                background: section.background ?? COLORS.surface
              }}
            >
              <div
                style={{
                  ...sectionContainerStyle,
                  maxWidth: '900px',
                  textAlign: 'center'
                }}
              >
                <h2
                  style={{
                    fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
                    fontWeight: 800,
                    color: COLORS.text,
                    marginBottom: '1.5rem'
                  }}
                >
                  {section.title}
                </h2>
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p
                    key={paragraphIndex}
                    style={{
                      color: COLORS.textMuted,
                      lineHeight: 1.8,
                      fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
                      marginBottom: paragraphIndex === section.paragraphs.length - 1 ? 0 : '1.25rem'
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.fullWidthImage ? (
                <div
                  style={{
                    ...sectionContainerStyle,
                    marginTop: 'clamp(2.5rem, 6vw, 3.5rem)'
                  }}
                >
                  <div
                    className="tilt-card"
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16 / 9',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      boxShadow: '0 25px 55px rgba(10, 14, 61, 0.16)'
                    }}
                  >
                    <Image
                      src={section.fullWidthImage.src}
                      alt={section.fullWidthImage.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 1100px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
              ) : null}
            </section>
          );
        }

        const imageOnLeft = section.imageSide === 'left' || (section.imageSide === undefined && index % 2 === 1);
        const computedBackground = section.background ?? (index % 2 === 0 ? '#fff' : COLORS.surfaceAlt);

        return (
          <section
            key={section.title + index}
            className="fade-section"
            style={{
              padding: `${SECTION_VERTICAL_PADDING} ${SECTION_HORIZONTAL_PADDING}`,
              background: computedBackground
            }}
          >
            <div
              style={{
                ...sectionContainerStyle,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
                gap: 'clamp(2rem, 6vw, 4rem)',
                alignItems: 'center'
              }}
            >
              {imageOnLeft && section.imageSrc ? (
                <div style={{ order: 0 }}>
                  <div
                    className="tilt-card"
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '4 / 3',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      boxShadow: '0 25px 55px rgba(10, 14, 61, 0.16)'
                    }}
                  >
                    <Image
                      src={section.imageSrc}
                      alt={section.imageAlt ?? section.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
              ) : null}

              <div style={{ order: imageOnLeft ? 1 : 0 }}>
                <h2
                  style={{
                    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                    fontWeight: 800,
                    color: COLORS.text,
                    marginBottom: '1.5rem'
                  }}
                >
                  {section.title}
                </h2>
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p
                    key={paragraphIndex}
                    style={{
                      color: COLORS.textMuted,
                      lineHeight: 1.8,
                      fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
                      marginBottom: paragraphIndex === section.paragraphs.length - 1 ? 0 : '1.5rem'
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {!imageOnLeft && section.imageSrc ? (
                <div>
                  <div
                    className="tilt-card"
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '4 / 3',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      boxShadow: '0 25px 55px rgba(10, 14, 61, 0.16)'
                    }}
                  >
                    <Image
                      src={section.imageSrc}
                      alt={section.imageAlt ?? section.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        );
      })}

      {/* Other Services */}
      {otherServices.length ? (
        <section
          className="fade-section"
          style={{
            background: 'linear-gradient(160deg, #050d3d 0%, #051451 50%, #092d64 100%)',
            padding: 'clamp(3.5rem, 9vw, 6.5rem) clamp(1.5rem, 6vw, 3rem)'
          }}
        >
          <div style={{ ...sectionContainerStyle }}>
            <h3
              style={{
                color: '#fff',
                textAlign: 'center',
                fontSize: 'clamp(1.9rem, 3.5vw, 2.5rem)',
                fontWeight: 800,
                marginBottom: 'clamp(2rem, 6vw, 3rem)'
              }}
            >
              {otherServicesTitle}
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                gap: 'clamp(1.75rem, 4vw, 2.5rem)'
              }}
            >
              {otherServices.map((service, cardIndex) => (
                <Link
                  key={service.title + service.href}
                  href={service.href}
                  prefetch={false}
                  style={{
                    textDecoration: 'none',
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 100%)',
                    borderRadius: '20px',
                    padding: '2.2rem',
                    border: '1px solid rgba(255,255,255,0.12)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.2rem',
                    minHeight: '100%'
                  }}
                  className={`${SERVICE_CARD_CLASS} delay-${(cardIndex % 4) + 1}`}
                >
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '16px',
                      background: 'rgba(105, 232, 225, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#69E8E1',
                      fontSize: '1.8rem',
                      fontWeight: 700
                    }}
                    aria-hidden
                  >
                    {service.icon || `0${cardIndex + 1}`}
                  </div>
                  <div>
                    <h4
                      style={{
                        color: '#fff',
                        fontSize: 'clamp(1.15rem, 2.2vw, 1.35rem)',
                        fontWeight: 700,
                        marginBottom: '0.75rem'
                      }}
                    >
                      {service.title}
                    </h4>
                    <p
                      style={{
                        color: 'rgba(255,255,255,0.75)',
                        lineHeight: 1.7,
                        fontSize: 'clamp(0.9rem, 1.4vw, 1rem)'
                      }}
                    >
                      {service.description}
                    </p>
                  </div>
                  <span
                    style={{
                      marginTop: 'auto',
                      color: '#69E8E1',
                      fontWeight: 600,
                      fontSize: '0.95rem'
                    }}
                    className="link-arrow"
                  >
                    Explore service →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Resources */}
      <section
        className="fade-section"
        style={{ padding: 'clamp(3.5rem, 8vw, 6.5rem) clamp(1.5rem, 6vw, 3rem)', background: COLORS.surface }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h3
            style={{
              fontSize: 'clamp(1.9rem, 4vw, 2.6rem)',
              fontWeight: 800,
              color: COLORS.text,
              textAlign: 'center',
              marginBottom: '1rem'
            }}
          >
            {resourcesTitle}
          </h3>
          <p
            style={{
              color: COLORS.textMuted,
              textAlign: 'center',
              maxWidth: '780px',
              margin: '0 auto clamp(2.5rem, 6vw, 3.5rem)',
              lineHeight: 1.8,
              fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)'
            }}
          >
            {resourcesIntro}
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: 'clamp(1.75rem, 4vw, 2.5rem)'
            }}
          >
            {resourcesToRender.map((resourceItem, resourceIndex) => {
              const card = (
                <div
                  className={`${RESOURCE_CARD_CLASS} delay-${(resourceIndex % 3) + 1}`}
                  style={{
                    background: '#0a0e3d',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(5, 12, 40, 0.18)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    height: '250px'
                  }}
                >
                  <div className="resource-card__media" style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <Image
                      src={resourceItem.imageSrc}
                      alt={resourceItem.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
              );

              if (resourceItem.href) {
                return (
                  <Link
                    key={resourceItem.title}
                    href={resourceItem.href}
                    prefetch={false}
                    style={{ textDecoration: 'none' }}
                  >
                    {card}
                  </Link>
                );
              }

              return (
                <div key={resourceItem.title}>
                  {card}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FloatingCTA
        title={cta.title}
        description={cta.description}
        primaryLabel={cta.primaryLabel}
        primaryHref={cta.primaryHref}
        backgroundGradient="linear-gradient(180deg, #f8f9fa 0%, #f8f9fa 60%, #050b3d 60%, #050b3d 100%)"
      />
    </main>
  );
};

export default ServicePageLayout;

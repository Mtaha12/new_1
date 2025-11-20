import Link from 'next/link';
import { CSSProperties } from 'react';

type FloatingCTAProps = {
  title: string;
  description?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  direction?: 'ltr' | 'rtl';
  maxContentWidth?: string;
  containerWidth?: string;
  backgroundGradient?: string;
  overlapTop?: string;
  overlapBottom?: string;
};

const DEFAULT_BACKGROUND = 'linear-gradient(180deg, #f5f8ff 0%, #f5f8ff 62%, #050b3d 62%, #050b3d 100%)';

const OUTER_BASE_STYLE: CSSProperties = {
  position: 'relative',
  padding: '0 clamp(1.5rem, 6vw, 3rem)',
  zIndex: 1000, // High z-index
  isolation: 'isolate'
};

const CARD_STYLE: CSSProperties = {
  background: 'linear-gradient(180deg, #eef4ff 0%, #dfeaff 100%)',
  borderRadius: '30px',
  padding: 'clamp(3rem, 6vw, 4rem) clamp(2rem, 6vw, 3.5rem)',
  textAlign: 'center',
  boxShadow: '0 32px 64px rgba(5, 12, 40, 0.22)',
  border: '1px solid rgba(19, 104, 255, 0.12)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  position: 'relative',
  zIndex: 1001
};

const PRIMARY_BUTTON_STYLE: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #0a53ff 0%, #3e8bff 100%)',
  color: '#fff',
  borderRadius: '999px',
  padding: '0.85rem clamp(2.4rem, 5vw, 3.3rem)',
  fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
  fontWeight: 700,
  textDecoration: 'none',
  boxShadow: '0 18px 42px rgba(10, 83, 255, 0.32)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
};

const SECONDARY_LINK_STYLE: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#0f2f7a',
  fontWeight: 600,
  fontSize: '0.95rem',
  textDecoration: 'none'
};

const CONTAINER_STYLE: CSSProperties = {
  maxWidth: '1140px',
  margin: '0 auto'
};

export default function FloatingCTA({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryHref,
  secondaryLabel,
  direction = 'ltr',
  maxContentWidth = '760px',
  containerWidth,
  backgroundGradient,
  overlapTop = '2rem',
  overlapBottom = '0rem' // POSITIVE value only
}: FloatingCTAProps) {
  const outerStyle: CSSProperties = {
    ...OUTER_BASE_STYLE,
    background: backgroundGradient ?? DEFAULT_BACKGROUND,
    marginTop: overlapTop,
    marginBottom: overlapBottom
  };

  const containerStyle: CSSProperties = {
    ...CONTAINER_STYLE,
    maxWidth: containerWidth ?? CONTAINER_STYLE.maxWidth
  };

  return (
    <section style={outerStyle}>
      <div style={containerStyle}>
        <div
          style={{ ...CARD_STYLE, direction }}
          className="floating-cta"
          onMouseEnter={(event) => {
            event.currentTarget.style.transform = 'translateY(-6px)';
            event.currentTarget.style.boxShadow = '0 38px 70px rgba(5, 12, 40, 0.28)';
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.transform = 'translateY(0)';
            event.currentTarget.style.boxShadow = '0 32px 64px rgba(5, 12, 40, 0.22)';
          }}
        >
          <h3
            style={{
              fontSize: 'clamp(1.9rem, 4vw, 2.6rem)',
              fontWeight: 800,
              color: '#0a0e3d',
              marginBottom: '1rem',
              lineHeight: 1.2
            }}
          >
            {title}
          </h3>
          {description ? (
            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
                lineHeight: 1.75,
                color: '#2f3f66',
                maxWidth: maxContentWidth,
                margin: '0 auto clamp(2.2rem, 5vw, 3rem)'
              }}
            >
              {description}
            </p>
          ) : null}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.1rem',
              justifyContent: 'center'
            }}
          >
            <Link
              href={primaryHref}
              prefetch={false}
              style={PRIMARY_BUTTON_STYLE}
              className="glow-button"
              onMouseEnter={(event) => {
                event.currentTarget.style.transform = 'translateY(-2px)';
                event.currentTarget.style.boxShadow = '0 22px 48px rgba(10, 83, 255, 0.4)';
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.transform = 'translateY(0)';
                event.currentTarget.style.boxShadow = '0 18px 42px rgba(10, 83, 255, 0.32)';
              }}
            >
              {primaryLabel}
            </Link>
            {secondaryHref && secondaryLabel ? (
              <Link href={secondaryHref} prefetch={false} style={SECONDARY_LINK_STYLE} className="hover-underline">
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
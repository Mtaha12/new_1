'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ServicePageLayout, { ResourceCard } from '@/components/services/ServicePageLayout';

export default function TrainingPage() {
  const pathname = usePathname();
  const currentLocale = pathname?.split('/')[1] || 'en';
  const t = useTranslations('ServicesPage.training');
  const tConsulting = useTranslations('ServicesPage.consulting');
  const home = useTranslations('HomePage');

  const resources: ResourceCard[] = [
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

  const hero = {
    title: t('hero'),
    description: t('heroDesc'),
    buttonLabel: t('joinProgram'),
    buttonHref: `/${currentLocale}/contact?topic=training`
  };

  const sections = [
    {
      title: t('section1Title'),
      paragraphs: [t('section1Para1'), t('section1Para2')],
      imageSrc: '/img/s7.jpg',
      imageAlt: t('section1Title')
    },
    {
      title: t('section2Title'),
      paragraphs: [t('section2Para1'), t('section2Para2')],
      imageSrc: '/img/s8.jpg',
      imageAlt: t('section2Title'),
      imageSide: 'left' as const
    }
  ];

  const otherServices = [
    {
      title: tConsulting('resourcing'),
      description: tConsulting('serviceDesc'),
      href: `/${currentLocale}/services/resourcing`,
      icon: '👥'
    },
    {
      title: tConsulting('managedIT'),
      description: tConsulting('serviceDesc'),
      href: `/${currentLocale}/services/managed-it`,
      icon: '⚙️'
    },
    {
      title: tConsulting('devsecops'),
      description: tConsulting('serviceDesc'),
      href: `/${currentLocale}/services/devsecops`,
      icon: '🔧'
    }
  ];

  const cta = {
    title: home('ctaTitle'),
    description: home('ctaDescription'),
    primaryLabel: home('ctaButton'),
    primaryHref: `/${currentLocale}/contact`
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <Header />
      <ServicePageLayout
        hero={hero}
        sections={sections}
        otherServices={otherServices}
        otherServicesTitle={tConsulting('otherServices')}
        resourcesTitle={home('resourcesTitle')}
        resourcesIntro={home('resourcesDescription')}
        resources={resources}
        cta={cta}
      />
      <Footer />
    </div>
  );
}

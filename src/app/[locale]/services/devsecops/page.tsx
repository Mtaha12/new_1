'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ServicePageLayout from '@/components/services/ServicePageLayout';

export default function DevSecOpsPage() {
  const pathname = usePathname();
  const currentLocale = pathname?.split('/')[1] || 'en';
  const t = useTranslations('ServicesPage.devsecops');
  const tConsulting = useTranslations('ServicesPage.consulting');
  const common = useTranslations('Common');

  const hero = {
    title: t('hero'),
    description: t('heroDesc'),
    buttonLabel: t('learnMore'),
    buttonHref: `/${currentLocale}/contact?topic=devsecops`
  };

  const sections = [
    {
      title: t('section1Title'),
      paragraphs: [t('section1Para1'), t('section1Para2')],
      imageSrc: '/img/s11.jpg',
      imageAlt: t('section1Title')
    },
    {
      title: t('section2Title'),
      paragraphs: [t('section2Para1'), t('section2Para2')],
      imageSrc: '/img/s12.jpg',
      imageAlt: t('section2Title'),
      imageSide: 'left' as const
    }
  ];

  const otherServices = [
    {
      title: tConsulting('infrastructure'),
      description: tConsulting('serviceDesc'),
      href: `/${currentLocale}/services/infrastructure`,
      icon: '🏗️'
    },
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
    }
  ];

  const cta = {
    title: t('ctaTitle'),
    description: t('ctaDesc'),
    primaryLabel: common('contactUs'),
    primaryHref: `/${currentLocale}/contact?topic=services`
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <Header />
      <ServicePageLayout
        hero={hero}
        sections={sections}
        otherServices={otherServices}
        otherServicesTitle={tConsulting('otherServices')}
        resourcesTitle={t('resources')}
        resourcesIntro={t('resourcesIntro')}
        cta={cta}
      />
      <Footer />
    </div>
  );
}

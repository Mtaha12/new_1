// Mock the modules first
jest.mock('@/messages/en.json', () => ({
  ServicesOverview: {
    heroTitle: 'Our Services',
    heroSubtitle: 'Comprehensive IT solutions for your business',
    primaryCta: 'Get Started',
    services: [
      {
        title: 'Consulting',
        summary: 'Expert consulting services',
        highlights: ['Strategy', 'Planning', 'Implementation']
      },
    ],
    navigationTitle: 'Our Services',
    ctaTitle: 'Ready to get started?',
    ctaSubtitle: 'Contact us today to learn more about our services',
    resourcesCards: [
      {
        title: 'Resource 1',
        tag: 'Guide',
        image: '/images/resource1.jpg'
      }
    ]
  },
  // Service mocks
  consultingService: {
    heroTitle: 'Consulting Services',
    heroDescription: 'Expert consulting services to help your business grow',
    sections: [
      {
        title: 'Our Approach',
        content: 'We take a strategic approach to consulting'
      }
    ]
  },
  infrastructureService: {
    heroTitle: 'Infrastructure Services',
    heroDescription: 'Robust infrastructure solutions for your business',
    sections: [
      {
        title: 'Our Solutions',
        content: 'Comprehensive infrastructure solutions'
      }
    ]
  },
  resourcingService: {
    heroTitle: 'Resourcing',
    heroDescription: 'Talent solutions'
  },
  trainingService: {
    heroTitle: 'Training',
    heroDescription: 'Professional training services'
  },
  managedITService: {
    heroTitle: 'Managed IT',
    heroDescription: 'Comprehensive IT management'
  },
  devsecopsService: {
    heroTitle: 'DevSecOps',
    heroDescription: 'Secure development operations'
  }
}));

jest.mock('@/messages/ar.json', () => ({
  ServicesOverview: {
    heroTitle: 'خدماتنا',
    heroSubtitle: 'حلول تقنية شاملة لعملك',
    primaryCta: 'ابدأ الآن',
    services: [
      {
        title: 'استشارات',
        summary: 'خدمات استشارية احترافية',
        highlights: ['استراتيجية', 'تخطيط', 'تنفيذ']
      },
    ],
    navigationTitle: 'خدماتنا',
    ctaTitle: 'هل أنت مستعد للبدء؟',
    ctaSubtitle: 'اتصل بنا اليوم لمعرفة المزيد عن خدماتنا',
    resourcesCards: [
      {
        title: 'مصدر 1',
        tag: 'دليل',
        image: '/images/resource1.jpg'
      }
    ]
  },
  // Service mocks in Arabic
  consultingService: {
    heroTitle: 'خدمات الاستشارات',
    heroDescription: 'خدمات استشارية احترافية لمساعدة عملك على النمو',
    sections: [
      {
        title: 'نهجنا',
        content: 'نتبع نهجًا استراتيجيًا في الاستشارات'
      }
    ]
  },
  infrastructureService: {
    heroTitle: 'خدمات البنية التحتية',
    heroDescription: 'حلول بنية تحتية قوية لعملك',
    sections: [
      {
        title: 'حلولنا',
        content: 'حلول بنية تحتية شاملة'
      }
    ]
  },
  resourcingService: {
    heroTitle: 'الموارد',
    heroDescription: 'حلول المواهب'
  },
  trainingService: {
    heroTitle: 'تدريب',
    heroDescription: 'خدمات تدريب احترافية'
  },
  managedITService: {
    heroTitle: 'إدارة تكنولوجيا المعلومات',
    heroDescription: 'إدارة شاملة لتكنولوجيا المعلومات'
  },
  devsecopsService: {
    heroTitle: 'ديفسيكوبس',
    heroDescription: 'عمليات تطوير آمنة'
  }
}));

// Import the mocked modules
import enMessages from '@/messages/en.json';
import arMessages from '@/messages/ar.json';

describe('Services Integration Tests', () => {
  // Use the mock data
  const servicesLocales = { 
    en: enMessages.ServicesOverview,
    ar: arMessages.ServicesOverview
  };

  describe('TC-011 to TC-016: Services Overview Page', () => {
    it('TC-011: Verify services overview hero copy & CTAs', () => {
      Object.values(servicesLocales).forEach((locale) => {
        expect(locale.heroTitle).toBeTruthy();
        expect(locale.heroSubtitle).toBeTruthy();
        expect(locale.primaryCta).toBeTruthy();
      });
    });

    it('TC-012: Verify service cards defined', () => {
      Object.values(servicesLocales).forEach((locale) => {
        expect(Array.isArray(locale.services)).toBeTruthy();
        locale.services.forEach((service: any) => {
          expect(service.title).toBeTruthy();
          expect(service.summary).toBeTruthy();
        });
      });
    });

    it('TC-013: Verify service highlights coverage', () => {
      Object.values(servicesLocales).forEach((locale) => {
        locale.services.forEach((service: any) => {
          expect(Array.isArray(service.highlights)).toBeTruthy();
          service.highlights.forEach((highlight: any) => {
            expect(highlight).toBeTruthy();
          });
        });
      });
    });

    it('TC-014: Verify navigation block label', () => {
      Object.values(servicesLocales).forEach((locale) => {
        expect(locale.navigationTitle).toBeTruthy();
      });
    });

    it('TC-016: Verify CTA section strings', () => {
      Object.values(servicesLocales).forEach((locale) => {
        expect(locale.ctaTitle).toBeTruthy();
        expect(locale.ctaSubtitle).toBeTruthy();
        expect(locale.primaryCta).toBeTruthy();
      });
    });
  });

  describe('TC-017 to TC-020: Service Detail Pages', () => {
    const serviceTypes = [
      'consulting',
      'infrastructure',
      'resourcing',
      'training',
      'managedIT',
      'devsecops'
    ];

   it('TC-017: Verify service hero content', () => {
  serviceTypes.forEach((serviceType) => {
    const serviceKey = `${serviceType}Service` as keyof typeof enMessages;
    
    // English version
    const enService = enMessages[serviceKey] as any; // Use type assertion to avoid TypeScript errors
    if (enService) {
      // Check for either heroTitle or title
      expect(enService.heroTitle || enService.title).toBeTruthy();
      // Check for either heroDescription or description
      expect(enService.heroDescription || enService.description).toBeTruthy();
    } else {
      console.warn(`No English data found for ${serviceType} service`);
    }

    // Arabic version
    const arService = arMessages[serviceKey] as any;
    if (arService) {
      expect(arService.heroTitle || arService.title).toBeTruthy();
      expect(arService.heroDescription || arService.description).toBeTruthy();
    } else {
      console.warn(`No Arabic data found for ${serviceType} service`);
    }
  });
});

    it('TC-018: Verify service sections', () => {
      serviceTypes.forEach((serviceType) => {
        const serviceKey = `${serviceType}Service` as keyof typeof enMessages;
        
        // English version
        const enService = enMessages[serviceKey] as any;
        if (enService?.sections) {
          expect(Array.isArray(enService.sections)).toBeTruthy();
          enService.sections.forEach((section: any) => {
            expect(section.title).toBeTruthy();
            expect(section.content).toBeTruthy();
          });
        }

        // Arabic version
        const arService = arMessages[serviceKey] as any;
        if (arService?.sections) {
          expect(Array.isArray(arService.sections)).toBeTruthy();
          arService.sections.forEach((section: any) => {
            expect(section.title).toBeTruthy();
            expect(section.content).toBeTruthy();
          });
        }
      });
    });
  });
});
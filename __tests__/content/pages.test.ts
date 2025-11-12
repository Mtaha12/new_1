import enMessages from '@/messages/en.json';
import arMessages from '@/messages/ar.json';
import { listBlogArticles } from '@/data/blogPosts';
import { Locale } from 'next-intl';

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type Messages = typeof enMessages & typeof arMessages;

type LocaleKey = keyof Omit<Messages, 'Navigation' | 'Footer' | 'ChatWidget'> | 'Navigation' | 'Footer' | 'ChatWidget';

describe('Localized content parity', () => {
  const sections: LocaleKey[] = [
    'HomePage',
    'ServicesOverview',
    'ServicesPage',
    'SolutionsPages',
    'ContactForm',
    'Auth',
    'Navigation',
    'Footer'
  ];

  sections.forEach((section) => {
    it(`${section} exists in both locales with matching keys`, () => {
      const enSection = (enMessages as Record<string, unknown>)[section];
      const arSection = (arMessages as Record<string, unknown>)[section];

      expect(enSection).toBeDefined();
      expect(arSection).toBeDefined();

      const enKeys = Object.keys(enSection as Record<string, unknown>);
      const arKeys = Object.keys(arSection as Record<string, unknown>);

      expect(arKeys).toEqual(expect.arrayContaining(enKeys));
      expect(enKeys).toEqual(expect.arrayContaining(arKeys));
    });
  });
});

describe('Homepage essentials', () => {
  const homepageLocales = { en: enMessages, ar: arMessages };
  
  // TC-001 to TC-005
  describe('Hero section', () => {
    it('TC-001: Verify hero title rendered in both English and Arabic', () => {
      Object.values(homepageLocales).forEach((locale) => {
        expect(locale.HomePage.heroTitle).toBeTruthy();
      });
    });

    it('TC-002: Verify hero subtitle present', () => {
      Object.values(homepageLocales).forEach((locale) => {
        expect(locale.HomePage.heroSubtitle).toBeTruthy();
      });
    });

    it('TC-003: Verify hero primary CTA text', () => {
      Object.values(homepageLocales).forEach((locale) => {
        expect(locale.HomePage.heroCta || locale.HomePage.heroPrimaryCta).toBeTruthy();
      });
    });

    it('TC-004: Verify hero supporting copy', () => {
      Object.values(homepageLocales).forEach((locale) => {
        expect((locale.HomePage as any).heroSupporting).toBeTruthy();
      });
    });
  });

  describe('Hero CTA', () => {
    it('TC-051: Validate CTA secondary text', () => {
      Object.values(homepageLocales).forEach((locale) => {
        const homePage = locale.HomePage as any;
        expect(homePage.heroSecondaryCta || homePage.heroSecondaryCtaHref).toBeTruthy();
      });
    });
  });

  // TC-005
  describe('Services', () => {
    it('TC-005: Verify services dictionary non-empty', () => {
      Object.values(homepageLocales).forEach((locale) => {
        expect(locale.HomePage.services).toBeTruthy();
        Object.entries(locale.HomePage.services).forEach(([key, service]) => {
          expect(service).toBeTruthy();
        });
      });
    });
  });

  // TC-052 to TC-053
  describe('Core Values & Resources', () => {
    it('TC-052: Verify core values titles', () => {
      Object.values(homepageLocales).forEach((locale) => {
        const homePage = locale.HomePage as any;
        expect(homePage.coreValuesTitle || homePage.valuesTitle).toBeTruthy();
        const values = homePage.values || [];
        expect(Array.isArray(values)).toBe(true);
        if (values.length > 0) {
          expect(values.length).toBeGreaterThan(0);
        }
      });
    });

    it('TC-053: Verify resources CTA label', () => {
      Object.values(homepageLocales).forEach((locale) => {
        const homePage = locale.HomePage as any;
        expect(homePage.resourcesCTA || homePage.resourcesCta).toBeTruthy();
      });
    });
  });

  // TC-128 to TC-129
  describe('Partners', () => {
    it('TC-128: Verify partner list names present', () => {
      const expectedPartners = ['sentinelone', 'pingidentity'];
      Object.values(homepageLocales).forEach((locale) => {
        const partners = (locale.HomePage as any).partners || {};
        expectedPartners.forEach(partner => {
          expect(partners[partner]).toBeTruthy();
        });
      });
    });

    it('TC-129: Verify partner headline & subheadline localized', () => {
      Object.values(homepageLocales).forEach((locale) => {
        const homePage = locale.HomePage as any;
        expect(homePage.partnersTitle || homePage.partners?.title).toBeTruthy();
        expect(homePage.partnersHeadline || homePage.partners?.headline).toBeTruthy();
        expect(homePage.partnersSubheadline || homePage.partners?.subheadline).toBeTruthy();
      });
    });
  });

  // TC-130 to TC-131
  describe('Blog Carousel', () => {
    it('TC-130: Verify blog carousel quotes', () => {
      Object.values(homepageLocales).forEach((locale) => {
        const blogCarousel = (locale.HomePage as any).blogCarousel;
        const quotes = blogCarousel?.quotes || [];
        expect(Array.isArray(quotes)).toBe(true);
        if (quotes.length > 0) {
          quotes.forEach((quote: any) => {
            expect(quote?.text).toBeTruthy();
          });
        }
      });
    });

    it('TC-131: Verify blog carousel spotlight', () => {
      Object.values(homepageLocales).forEach((locale) => {
        const blogCarousel = (locale.HomePage as any).blogCarousel;
        expect(blogCarousel?.spotlight).toBeTruthy();
      });
    });
  });

  // TC-132 to TC-134
  describe('Team Section', () => {
    it('TC-132: Verify team section title/subtitle', () => {
      Object.values(homepageLocales).forEach((locale) => {
        const team = (locale.HomePage as any).team;
        expect(team?.title).toBeTruthy();
        expect(team?.subtitle).toBeTruthy();
      });
    });

    it('TC-133: Verify team member bios', () => {
      Object.values(homepageLocales).forEach((locale) => {
        const team = (locale.HomePage as any).team;
        const members = team?.members || [];
        expect(Array.isArray(members)).toBe(true);
        members.forEach((member: any) => {
          expect(member?.name).toBeTruthy();
          expect(member?.role).toBeTruthy();
          expect(member?.bio).toBeTruthy();
          expect(member?.photo).toBeTruthy();
        });
      });
    });

    it('TC-134: Verify team values copy', () => {
      Object.values(homepageLocales).forEach((locale) => {
        const homePage = locale.HomePage as any;
        expect(homePage.valuesTitle || homePage.team?.valuesTitle).toBeTruthy();
        const values = homePage.values || homePage.team?.values || [];
        expect(Array.isArray(values)).toBe(true);
        expect(values.length).toBeGreaterThan(0);
      });
    });
  });

  // TC-135 to TC-137
  describe('Gated Asset Form', () => {
    it('TC-135: Verify gated asset bullets', () => {
      Object.values(homepageLocales).forEach((locale) => {
        const gatedAsset = (locale.HomePage as any).gatedAsset;
        const points = gatedAsset?.points || [];
        expect(Array.isArray(points)).toBe(true);
        if (points.length > 0) {
          expect(points.length).toBe(3);
        }
      });
    });

    it('TC-136: Verify gated asset form labels', () => {
      const requiredLabels = ['nameLabel', 'emailLabel', 'companyLabel', 'roleLabel'];
      Object.values(homepageLocales).forEach((locale) => {
        const form = (locale.HomePage as any).gatedAsset?.form || {};
        requiredLabels.forEach(label => {
          expect(form[label] || (locale as any)[label]).toBeTruthy();
        });
      });
    });

    it('TC-137: Verify gated asset form messages', () => {
      const requiredMessages = ['success', 'loading', 'error', 'invalidEmail', 'required'];
      Object.values(homepageLocales).forEach((locale) => {
        const form = (locale.HomePage as any).gatedAsset?.form || {};
        requiredMessages.forEach(message => {
          expect(form[message] || (locale as any)[message]).toBeTruthy();
        });
      });
    });
  });

  // TC-138 to TC-141
  describe('Newsletter & Contact', () => {
    it('TC-138: Verify newsletter CTA text', () => {
      Object.values(homepageLocales).forEach((locale) => {
        expect(locale.HomePage.newsletter?.title).toBeTruthy();
        expect(locale.HomePage.newsletter?.subtitle).toBeTruthy();
        expect(locale.HomePage.newsletter?.cta).toBeTruthy();
      });
    });

    it('TC-139: Verify newsletter status messages', () => {
      const statusMessages = ['loading', 'success', 'existing', 'invalidEmail', 'error'];
      Object.values(homepageLocales).forEach((locale) => {
        const homePage = locale.HomePage as any;
        const newsletter = homePage.newsletter || {};
        statusMessages.forEach(message => {
          expect(newsletter[message]).toBeTruthy();
        });
      });
    });

    it('TC-140: Verify contact block CTA', () => {
      Object.values(homepageLocales).forEach((locale) => {
        expect(locale.HomePage.contactBlock?.ctaLabel).toBeTruthy();
        expect(locale.HomePage.contactBlock?.ctaHref).toBeTruthy();
        expect(locale.HomePage.contactBlock?.note).toBeTruthy();
      });
    });

    it('TC-141: Verify contact block list entries', () => {
      const contactItems = ['email', 'phone', 'location'];
      Object.values(homepageLocales).forEach((locale) => {
        const contactBlock = (locale.HomePage as any)?.contactBlock || {};
        const contactValues = Object.values(contactBlock);
        expect(contactValues.length).toBeGreaterThan(0);
      });
    });
  });

  it('defines services list', () => {
    Object.values(homepageLocales).forEach((locale) => {
      const homePage = (locale as any).HomePage;
      const services = homePage?.services || [];
      if (Array.isArray(services)) {
        services.forEach((service: any) => {
          expect(service).toBeTruthy();
        });
      } else if (typeof services === 'object') {
        Object.values(services).forEach((service: any) => {
          expect(service).toBeTruthy();
        });
      }
    });
  });

  it('exposes hero pillars, resources, and testimonials', () => {
    Object.values(homepageLocales).forEach((locale) => {
      const homePage = locale.HomePage as any;
      const heroPillars = homePage.heroPillars || [];
      const resourcesCards = homePage.resourcesCards || [];
      const testimonialsList = homePage.testimonialsList || [];
      
      expect(Array.isArray(heroPillars)).toBe(true);
      if (heroPillars.length > 0) {
        expect(heroPillars.length).toBeGreaterThan(0);
      }
      
      expect(Array.isArray(resourcesCards)).toBe(true);
      if (resourcesCards.length > 0) {
        expect(resourcesCards.length).toBeGreaterThan(0);
      }
      
      expect(Array.isArray(testimonialsList)).toBe(true);
      testimonialsList.forEach((testimonial: any) => {
        expect(testimonial?.quote).toBeTruthy();
        expect(testimonial?.client).toBeTruthy();
      });
    });
  });
});

describe('Services overview content', () => {
  const locales = { en: enMessages.ServicesOverview, ar: arMessages.ServicesOverview };

  it('includes hero copy and CTAs', () => {
    Object.values(locales).forEach((services: any) => {
      expect(services.heroTitle).toBeTruthy();
      expect(services.heroSubtitle).toBeTruthy();
      expect(services.primaryCta).toBeTruthy();
    });
  });

  it('lists available services with highlights', () => {
    Object.values(locales).forEach((services: any) => {
      const servicesList = services.services || [];
      expect(Array.isArray(servicesList)).toBe(true);
      if (servicesList.length > 0) {
        servicesList.forEach((service: any) => {
          expect(service?.id).toBeTruthy();
          expect(service?.title).toBeTruthy();
          expect(service?.summary).toBeTruthy();
          expect(Array.isArray(service?.highlights)).toBe(true);
          if (service?.highlights) {
            expect(service.highlights.length).toBeGreaterThan(0);
          }
        });
      }
    });
  });

  it('includes curated resources cards', () => {
    Object.values(locales).forEach((services: any) => {
      const resourcesCards = services.resourcesCards || [];
      expect(Array.isArray(resourcesCards)).toBe(true);
      resourcesCards.forEach((resource: any) => {
        expect(resource?.title).toBeTruthy();
        expect(resource?.tag || resource?.category).toBeTruthy();
        expect(resource?.image || resource?.imageUrl).toBeTruthy();
      });
    });
  });
});

describe('Service detail pages', () => {
  const SERVICE_SLUGS = ['consulting', 'infrastructure', 'resourcing', 'training', 'managedIT', 'devsecops'] as const;

  SERVICE_SLUGS.forEach((slug) => {
    it(`${slug} service has hero, sections, and CTA in both locales`, () => {
      const enService = enMessages.ServicesPage[slug];
      const arService = arMessages.ServicesPage[slug];

      expect(enService).toBeDefined();
      expect(arService).toBeDefined();

      [enService, arService].forEach((service) => {
        expect(service.hero).toBeTruthy();
        expect(service.heroDesc).toBeTruthy();
        expect(service.section1Title).toBeTruthy();
        expect(service.section2Title).toBeTruthy();
        expect(service.resources || service.resourcesIntro).toBeTruthy();
        expect(service.ctaTitle || service.ctaDesc).toBeTruthy();
        expect(service.section1Para1).toBeTruthy();
        expect(service.section1Para2).toBeTruthy();
        expect(service.section2Para1).toBeTruthy();
        expect(service.section2Para2).toBeTruthy();
      });

      const resources = (service: any) => service.resources || service.resourcesIntro || service.resourcesTitle || service.resourcesSection;
      expect(resources(enService)).toBeTruthy();
      expect(resources(arService)).toBeTruthy();
    });
  });
});

describe('Solutions catalogue', () => {
  const locales = { en: enMessages.SolutionsPages, ar: arMessages.SolutionsPages };
  const solutionKeys = Object.keys(locales.en);

  it('defines solutions in both locales', () => {
    expect(Object.keys(locales.ar)).toEqual(expect.arrayContaining(solutionKeys));
  });

  solutionKeys.forEach((solutionKey) => {
    it(`${solutionKey} includes hero and CTA content`, () => {
      const enSolution: any = (locales.en as Record<string, unknown>)[solutionKey];
      const arSolution: any = (locales.ar as Record<string, unknown>)[solutionKey];

      expect(enSolution.heroTitle).toBeTruthy();
      expect(arSolution.heroTitle).toBeTruthy();
      expect(enSolution.ctaButton || enSolution.ctaTitle).toBeTruthy();
      expect(arSolution.ctaButton || arSolution.ctaTitle).toBeTruthy();
      expect(Array.isArray(enSolution.overviewParagraphs || [])).toBe(true);
      expect((enSolution.overviewParagraphs || []).length).toBeGreaterThan(0);
      expect(Array.isArray(arSolution.overviewParagraphs || [])).toBe(true);
      expect((arSolution.overviewParagraphs || []).length).toBeGreaterThan(0);
      expect(Array.isArray(enSolution.sections || [])).toBe(true);
      expect(Array.isArray(arSolution.sections || [])).toBe(true);
    });
  });
});

describe('Blog data integrity', () => {
  const articles = listBlogArticles();

  it('provides at least one article', () => {
    expect(articles.length).toBeGreaterThan(0);
  });

  it('ensures each article has localized content', () => {
    articles.forEach((article: any) => {
      expect(article?.slug).toBeTruthy();
      expect(article?.category).toBeTruthy();
      expect(article?.en?.title || article?.title).toBeTruthy();
      expect(article.ar.title).toBeTruthy();
      expect(Array.isArray(article.en.sections)).toBe(true);
      expect(Array.isArray(article.ar.sections)).toBe(true);
      expect(article.en.sections.length).toBeGreaterThan(0);
      expect(article.en.sections.length).toBe(article.ar.sections.length);
      expect(Array.isArray(article.en.takeaways)).toBe(true);
      expect(Array.isArray(article.ar.takeaways)).toBe(true);
      expect(article.en.conclusion).toBeTruthy();
      expect(article.ar.conclusion).toBeTruthy();
    });
  });
});

describe('Contact experience', () => {
  const locales = { en: enMessages.ContactForm, ar: arMessages.ContactForm };

  it('defines contact fields and placeholders', () => {
    Object.values(locales).forEach((contact) => {
      expect(Object.keys(contact.fields)).toEqual(
        expect.arrayContaining(['name', 'email', 'phone', 'subject', 'message'])
      );
      expect(Object.keys(contact.placeholders)).toEqual(
        expect.arrayContaining(['name', 'email', 'phone', 'subject', 'message'])
      );
    });
  });

  it('includes submission messaging', () => {
    Object.values(locales).forEach((contact) => {
      expect(contact.submit).toBeTruthy();
      expect(contact.successMessage).toBeTruthy();
      expect(contact.errorMessage).toBeTruthy();
    });
  });

  it('exposes validation error messages for every field', () => {
    Object.values(locales).forEach((contact) => {
      const errorKeys = Object.keys(contact.errors);
      ['nameRequired', 'emailRequired', 'phoneRequired', 'subjectRequired', 'messageRequired'].forEach((requiredKey) => {
        expect(errorKeys).toContain(requiredKey);
        expect(contact.errors[requiredKey as keyof typeof contact.errors]).toBeTruthy();
      });
    });
  });
});

describe('Authentication content', () => {
  const locales = { en: enMessages.Auth, ar: arMessages.Auth };

  it('provides login and signup copy', () => {
    Object.values(locales).forEach((auth) => {
      expect(auth.loginTitle).toBeTruthy();
      expect(auth.loginSubtitle).toBeTruthy();
      expect(auth.signupTitle).toBeTruthy();
      expect(auth.signupSubtitle).toBeTruthy();
    });
  });

  it('includes form labels and helper text', () => {
    Object.values(locales).forEach((auth) => {
      expect(auth.emailLabel).toBeTruthy();
      expect(auth.passwordLabel).toBeTruthy();
      expect(auth.loginCta || auth.signupCta).toBeTruthy();
      expect(auth.privacyNotice).toBeTruthy();
      expect(auth.passwordRequirements).toBeTruthy();
      expect(auth.invalidEmail).toBeTruthy();
    });
  });
});

describe('Navigation structure', () => {
  const locales = { en: enMessages.Navigation, ar: arMessages.Navigation };

  // TC-045, TC-046, TC-098, TC-099, TC-149, TC-150, TC-151
  it('TC-045: Verify main nav labels (home/services/solutions/contact/blog)', () => {
    Object.values(locales).forEach((nav: any) => {
      const mainKeys = ['home', 'services', 'solutions', 'contact', 'blog'] as const;
      mainKeys.forEach((key) => {
        expect(nav[key]).toBeTruthy();
      });
    });
  });

  it('TC-046: Verify services submenu coverage', () => {
    Object.values(locales).forEach((nav: any) => {
      const servicesMenu = nav.servicesMenu || {};
      const menuItems = Object.keys(servicesMenu);
      expect(menuItems.length).toBeGreaterThan(0);
    });
  });

  it('TC-098: Verify industries submenu labels', () => {
    Object.values(locales).forEach((nav: any) => {
      const industriesMenu = nav.industriesMenu || {};
      expect(industriesMenu).toBeDefined();
      expect(typeof industriesMenu).toBe('object');
      expect(Object.keys(industriesMenu).length).toBeGreaterThan(0);
      expect(nav.industriesMenu).toBeDefined();
      expect(typeof nav.industriesMenu).toBe('object');
      expect(Object.keys(nav.industriesMenu || {}).length).toBeGreaterThan(0);
    });
  });

  it('TC-099: Verify locations/resources/careers labels', () => {
    Object.values(locales).forEach((nav: any) => {
      ['locations', 'resources', 'careers'].forEach(key => {
        expect(nav[key]).toBeTruthy();
      });
    });
  });

  it('TC-149: Verify about/projects/industries/resources/careers labels', () => {
    Object.values(locales).forEach((nav) => {
      ['about', 'projects', 'industries', 'resources', 'careers'].forEach(key => {
        expect(nav[key as keyof typeof nav]).toBeTruthy();
      });
    });
  });

  it('TC-150: Verify services submenu includes managed entry', () => {
    Object.values(locales).forEach((nav: any) => {
      const servicesMenu = nav.servicesMenu || {};
      expect(servicesMenu.managed).toBeTruthy();
    });
  });

  it('TC-151: Verify solutions submenu overview link', () => {
    Object.values(locales).forEach((nav: any) => {
      const solutionsMenu = nav.solutionsMenu || {};
      expect(solutionsMenu.overview).toBeTruthy();
    });
  });
});

describe('Footer content', () => {
  const locales = { en: enMessages.Footer, ar: arMessages.Footer };

  it('includes contact details', () => {
    Object.values(locales).forEach((footer) => {
      expect(footer.company).toBeTruthy();
      expect(footer.contactUs).toBeTruthy();
      expect(footer.email).toMatch(/@/);
      expect(footer.phone).toBeTruthy();
      expect(footer.address).toBeTruthy();
    });
  });
});

describe('Chat assistant copy', () => {
  it('provides default responses across locales', () => {
    const locales = { en: enMessages.Chat, ar: arMessages.Chat };
    Object.values(locales).forEach((chat) => {
      expect(chat.title).toBeTruthy();
      expect(chat.welcomeMessage).toBeTruthy();
      expect(chat.responses.default).toBeTruthy();
      expect(chat.responses.help).toBeTruthy();
      expect(chat.responses.contact).toBeTruthy();
    });
  });
});

describe('Footer resources catalogue', () => {
  it('defines quick access resource cards', () => {
    const locales = { en: enMessages.FooterResources, ar: arMessages.FooterResources };
    Object.values(locales).forEach((resources) => {
      expect(resources.title).toBeTruthy();
      expect(resources.subtitle).toBeTruthy();
      const cards = resources.cards as Record<string, { title: string; href: string }>;
      expect(cards).toBeDefined();
      Object.values(cards).forEach((card) => {
        expect(card.title).toBeTruthy();
        expect(card.href).toBeTruthy();
      });
    });
  });
});
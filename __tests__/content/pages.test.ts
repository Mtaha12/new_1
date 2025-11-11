import enMessages from '@/messages/en.json';
import arMessages from '@/messages/ar.json';
import { listBlogArticles } from '@/data/blogPosts';

type LocaleKey = 'HomePage' | 'ServicesOverview' | 'ServicesPage' | 'SolutionsPages' | 'ContactForm' | 'Auth';

describe('Localized content parity', () => {
  const sections: LocaleKey[] = [
    'HomePage',
    'ServicesOverview',
    'ServicesPage',
    'SolutionsPages',
    'ContactForm',
    'Auth'
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
  const locales = { en: enMessages.HomePage, ar: arMessages.HomePage };

  it('provides hero titles, subtitles, and CTAs', () => {
    Object.values(locales).forEach((home) => {
      expect(home.heroTitle).toBeTruthy();
      expect(home.heroSubtitle).toBeTruthy();
      expect(home.heroCta || home.heroPrimaryCta).toBeTruthy();
      expect(home.heroSupporting).toBeTruthy();
    });
  });

  it('defines services list', () => {
    Object.values(locales).forEach((home) => {
      expect(home.services).toBeTruthy();
      expect(typeof home.services).toBe('object');
      Object.values(home.services).forEach((service: any) => {
        expect(service).toBeTruthy();
      });
    });
  });

  it('exposes hero pillars, resources, and testimonials', () => {
    Object.values(locales).forEach((home) => {
      expect(Array.isArray(home.heroPillars)).toBe(true);
      expect(home.heroPillars.length).toBeGreaterThan(0);
      expect(Array.isArray(home.resourcesCards)).toBe(true);
      expect(home.resourcesCards.length).toBeGreaterThan(0);
      expect(Array.isArray(home.testimonialsList)).toBe(true);
      home.testimonialsList.forEach((testimonial: any) => {
        expect(testimonial.quote).toBeTruthy();
        expect(testimonial.client).toBeTruthy();
      });
    });
  });
});

describe('Services overview content', () => {
  const locales = { en: enMessages.ServicesOverview, ar: arMessages.ServicesOverview };

  it('includes hero copy and CTAs', () => {
    Object.values(locales).forEach((services) => {
      expect(services.heroTitle).toBeTruthy();
      expect(services.heroSubtitle).toBeTruthy();
      expect(services.primaryCta).toBeTruthy();
    });
  });

  it('lists available services with highlights', () => {
    Object.values(locales).forEach((services) => {
      expect(Array.isArray(services.services)).toBe(true);
      expect(services.services.length).toBeGreaterThan(0);
      services.services.forEach((service: any) => {
        expect(service.id).toBeTruthy();
        expect(service.title).toBeTruthy();
        expect(service.summary).toBeTruthy();
        expect(Array.isArray(service.highlights)).toBe(true);
        expect(service.highlights.length).toBeGreaterThan(0);
      });
    });
  });

  it('includes curated resources cards', () => {
    Object.values(locales).forEach((services) => {
      expect(Array.isArray(services.resourcesCards || [])).toBe(true);
      (services.resourcesCards || []).forEach((resource: any) => {
        expect(resource.title).toBeTruthy();
        expect(resource.tag).toBeTruthy();
        expect(resource.image).toBeTruthy();
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

      const resources = (service: any) => service.resources || service.resourcesIntro || service.resourcesTitle;
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
    articles.forEach((article) => {
      expect(article.slug).toBeTruthy();
      expect(article.category).toBeTruthy();
      expect(article.en.title).toBeTruthy();
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
  it('exposes primary navigation labels', () => {
    const locales = { en: enMessages.Navigation, ar: arMessages.Navigation };
    Object.values(locales).forEach((nav) => {
      const mainKeys: Array<keyof typeof nav> = ['home', 'services', 'solutions', 'contact', 'blog'];
      mainKeys.forEach((key) => {
        expect(nav[key]).toBeTruthy();
      });
      const servicesMenu = nav.servicesMenu;
      expect(servicesMenu).toBeDefined();
      if (servicesMenu) {
        const serviceKeys: Array<keyof typeof servicesMenu> = ['overview', 'consulting', 'infrastructure', 'resourcing', 'training', 'managed', 'devsecops'];
        serviceKeys.forEach((key) => {
          expect(servicesMenu[key]).toBeTruthy();
        });
      }
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

import { test, expect, type Page } from '@playwright/test';
import enMessages from '../src/messages/en.json';
import arMessages from '../src/messages/ar.json';
import caseStudiesEn from '../src/messages/CaseStudies.en.json';
import caseStudiesAr from '../src/messages/CaseStudies.ar.json';

type LocaleConfig = {
  code: 'en' | 'ar';
  basePath: string;
  messages: Record<string, any>;
  caseStudies: Record<string, any>;
};

const locales: LocaleConfig[] = [
  { code: 'en', basePath: '/en', messages: enMessages as Record<string, any>, caseStudies: caseStudiesEn as Record<string, any> },
  { code: 'ar', basePath: '/ar', messages: arMessages as Record<string, any>, caseStudies: caseStudiesAr as Record<string, any> }
];

const serviceDetails = [
  { slug: 'consulting', key: 'consulting' },
  { slug: 'infrastructure', key: 'infrastructure' },
  { slug: 'resourcing', key: 'resourcing' },
  { slug: 'training', key: 'training' },
  { slug: 'managed-it', key: 'managedIT' },
  { slug: 'devsecops', key: 'devsecops' }
];

const solutionDetails = [
  { slug: 'ai-security', key: 'aiSecurity' },
  { slug: 'identity-management', key: 'identityManagement' },
  { slug: 'zero-trust', key: 'zeroTrust' },
  { slug: 'cloud-security', key: 'cloudSecurity' },
  { slug: 'network-security', key: 'networkSecurity' },
  { slug: 'endpoint-security', key: 'endpointSecurity' }
];

async function expectNavItemVisible(page: Page, label: string) {
  const link = page.getByRole('link', { name: label });
  if (await link.count()) {
    await expect(link.first()).toBeVisible();
    return;
  }
  const button = page.getByRole('button', { name: label });
  if (await button.count()) {
    await expect(button.first()).toBeVisible();
    return;
  }
  throw new Error(`Navigation item not visible: ${label}`);
}

for (const locale of locales) {
  test.describe(`${locale.code.toUpperCase()} locale`, () => {
    test(`homepage renders core content`, async ({ page }) => {
      const home = locale.messages.HomePage as Record<string, any>;
      const newsletter = home.newsletter as Record<string, any>;
      const contactBlock = home.contactBlock as Record<string, any>;
      const navigation = locale.messages.Navigation as Record<string, any>;

      await page.goto(locale.basePath, { waitUntil: 'load', timeout: 120000 });

      await expect(page).toHaveURL(new RegExp(`${locale.basePath}`));
      await expect(page.locator('html')).toHaveAttribute('lang', locale.code);
      await expect(page.locator('html')).toHaveAttribute('dir', locale.code === 'ar' ? 'rtl' : 'ltr');

      await expect(page.locator('h1').first()).toContainText(home.heroTitle);
      await expect(page.getByRole('link', { name: home.heroPrimaryCta })).toBeVisible();
      await expect(page.getByRole('link', { name: home.heroSecondaryCta })).toBeVisible();

      const navItems = [navigation.home, navigation.services, navigation.solutions, navigation.blog, navigation.contact, navigation.login, navigation.signup];
      for (const label of navItems) {
        await expectNavItemVisible(page, label);
      }

      await expect(page.getByText(newsletter.title, { exact: false })).toBeVisible();
      await expect(page.getByPlaceholder(newsletter.emailPlaceholder)).toBeVisible();
      await expect(page.getByText(contactBlock.title, { exact: false })).toBeVisible();
    });

    test(`services overview highlights key offerings`, async ({ page }) => {
      const servicesOverview = locale.messages.ServicesOverview as Record<string, any>;
      await page.goto(`${locale.basePath}/services`, { waitUntil: 'load', timeout: 120000 });

      await expect(page.locator('h1')).toContainText(servicesOverview.heroTitle);
      for (const service of servicesOverview.services as Array<Record<string, string>>) {
        await expect(page.getByText(service.title, { exact: false })).toBeVisible();
        await expect(page.getByText(service.summary, { exact: false })).toBeVisible();
      }
    });

    for (const service of serviceDetails) {
      test(`service detail page renders ${service.slug}`, async ({ page }) => {
        const serviceMessages = locale.messages.ServicesPage?.[service.key] as Record<string, any>;
        await page.goto(`${locale.basePath}/services/${service.slug}`, { waitUntil: 'load', timeout: 120000 });
        await expect(page.locator('h1')).toContainText(serviceMessages.hero);
      });
    }

    for (const solution of solutionDetails) {
      test(`solution detail page renders ${solution.slug}`, async ({ page }) => {
        const solutionMessages = locale.messages.SolutionsPages[solution.key] as Record<string, any>;
        await page.goto(`${locale.basePath}/solutions/${solution.slug}`, { waitUntil: 'load', timeout: 120000 });
        await expect(page.locator('h1')).toContainText(solutionMessages.heroTitle);
        await expect(page.getByText(solutionMessages.heroSubtitle, { exact: false })).toBeVisible();
      });
    }

    test(`case studies index displays hero content`, async ({ page }) => {
      const caseStudies = locale.caseStudies;
      await page.goto(`${locale.basePath}/case-studies`, { waitUntil: 'load', timeout: 120000 });
      await expect(page.locator('h1')).toContainText(caseStudies.heroTitle);
      await expect(page.getByText(caseStudies.heroSubtitle, { exact: false })).toBeVisible();
      for (const entry of caseStudies.caseStudyList as Array<Record<string, any>>) {
        await expect(page.getByText(entry.title, { exact: false })).toBeVisible();
      }
    });

    test(`blog landing page shows featured content`, async ({ page }) => {
      const blog = locale.messages.Blog as Record<string, any>;
      await page.goto(`${locale.basePath}/blog`, { waitUntil: 'load', timeout: 120000 });
      await expect(page.locator('h1')).toContainText(blog.title);
      await expect(page.getByText(blog.description, { exact: false })).toBeVisible();
      for (const post of blog.featuredPosts as Array<Record<string, any>>) {
        await expect(page.getByText(post.title, { exact: false })).toBeVisible();
      }
    });

    test(`contact page exposes form and information`, async ({ page }) => {
      const contact = locale.messages.Contact as Record<string, any>;
      const contactForm = locale.messages.ContactForm as Record<string, any>;
      await page.goto(`${locale.basePath}/contact`, { waitUntil: 'load', timeout: 120000 });
      await expect(page.locator('h1')).toContainText(contact.title);
      await expect(page.getByText(contact.description, { exact: false })).toBeVisible();
      await expect(page.getByLabel(contactForm.fields.name)).toBeVisible();
      await expect(page.getByLabel(contactForm.fields.email)).toBeVisible();
      await expect(page.getByLabel(contactForm.fields.phone)).toBeVisible();
      await expect(page.getByLabel(contactForm.fields.subject)).toBeVisible();
      await expect(page.getByLabel(contactForm.fields.message)).toBeVisible();
    });

    test(`login page renders localized form`, async ({ page }) => {
      const auth = locale.messages.Auth as Record<string, any>;
      await page.goto(`${locale.basePath}/auth/login`, { waitUntil: 'load', timeout: 120000 });
      await expect(page.locator('h1')).toContainText(auth.loginTitle);
      await expect(page.getByLabel(auth.emailLabel)).toBeVisible();
      await expect(page.getByLabel(auth.passwordLabel)).toBeVisible();
      await expect(page.getByRole('button', { name: auth.loginCta })).toBeVisible();
      await expect(page.getByText(auth.rememberMe, { exact: false })).toBeVisible();
    });

    test(`signup page renders localized form`, async ({ page }) => {
      const auth = locale.messages.Auth as Record<string, any>;
      await page.goto(`${locale.basePath}/auth/signup`, { waitUntil: 'load', timeout: 120000 });
      await expect(page.locator('h1')).toContainText(auth.signupTitle);
      await expect(page.getByLabel(auth.nameLabel)).toBeVisible();
      await expect(page.getByLabel(auth.emailLabel)).toBeVisible();
      await expect(page.getByLabel(auth.passwordLabel, { exact: true })).toBeVisible();
      await expect(page.getByLabel(auth.confirmPasswordLabel, { exact: true })).toBeVisible();
      await expect(page.getByRole('button', { name: auth.signupCta })).toBeVisible();
    });
  });
}

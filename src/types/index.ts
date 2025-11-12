// Blog types
export interface BlogArticle {
  id: string;
  slug: string;
  date: string;
  title: {
    en: string;
    ar: string;
  };
  author: string;
  excerpt: {
    en: string;
    ar: string;
  };
  coverImage: string;
  content: {
    en: string;
    ar: string;
  };
  sections?: {
    en: Array<{
      title: string;
      content: string;
    }>;
    ar: Array<{
      title: string;
      content: string;
    }>;
  };
  takeaways?: {
    en: string[];
    ar: string[];
  };
  conclusion?: {
    en: string;
    ar: string;
  };
  kicker?: {
    en: string;
    ar: string;
  };
  categories?: string[];
  tags?: string[];
  readTime?: number;
}

// Case Study types
export interface CaseStudyMetric {
  label: string;
  value: string;
  description: string;
}

export interface CaseStudyItem {
  id: string;
  title: string;
  industry: string;
  summary: string;
  results?: string[];
  ctaLabel?: string;
  ctaHref?: string;
}

export interface CaseStudies {
  heroTitle: string;
  heroSubtitle: string;
  featuredMetrics: CaseStudyMetric[];
  filtersLabel: string;
  caseStudyList: CaseStudyItem[];
  ctaTitle: string;
  ctaSubtitle: string;
  primaryCta?: string;
  secondaryCta?: string;
  resultHeading?: string;
}

// Contact Form types
export interface ContactFormFields {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  [key: string]: string;
}

export interface ContactFormMessages {
  title: string;
  subtitle: string;
  fields: ContactFormFields;
  placeholders: ContactFormFields;
  submitButton: string;
  messages: {
    success: string;
    error: string;
  };
  validation: {
    required: string;
    email: string;
    phone: string;
  };
  loading: string;
  notes: string;
  subjects: {
    general: string;
    consulting: string;
    support: string;
    partnership: string;
    other: string;
    [key: string]: string;
  };
  status: {
    submitting: string;
    success: string;
    error: string;
  };
}

// Solutions types
export type SolutionKey = 'aiSecurity' | 'identity' | 'zeroTrust' | 'cloudSecurity' | 'networkSecurity' | 'endpointSecurity';

export interface Solution {
  heroTitle: string;
  heroSubtitle?: string;
  ctaButton?: string;
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaHref?: string;
  overviewParagraphs: string[];
  sections: Array<{
    title: string;
    content: string;
    image?: {
      src: string;
      alt: string;
    };
  }>;
  useCases?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  highlights?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  secondaryCta?: string;
}

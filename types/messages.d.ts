import enMessages from '@/messages/en.json';
import arMessages from '@/messages/ar.json';

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type Messages = typeof enMessages & typeof arMessages;

type LocaleKey = keyof Omit<Messages, 'Navigation' | 'Footer' | 'ChatWidget'> | 'Navigation' | 'Footer' | 'ChatWidget';

// Extend the existing Message type to include all possible keys
declare module '@/messages/en' {
  const messages: Messages;
  export default messages;
}

declare module '@/messages/ar' {
  const messages: Messages;
  export default messages;
}

// Type for case study metrics
interface CaseStudyMetric {
  label: string;
  value: string;
  description: string;
}

// Type for case study list items
interface CaseStudyItem {
  id: string;
  title: string;
  industry: string;
  summary: string;
  results?: string[];
  ctaLabel?: string;
  ctaHref?: string;
}

// Type for case studies
interface CaseStudies {
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

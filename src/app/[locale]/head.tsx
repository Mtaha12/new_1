type HeadProps = {
  params: {
    locale: string;
  };
};

type SEOEntry = {
  title: string;
  description: string;
};

const metadataByLocale: Record<string, SEOEntry> = {
  en: {
    title: 'The SamurAI | AI-Powered Cybersecurity Consulting',
    description:
      'The SamurAI blends elite consulting, AI-powered defenses, and rapid response teams to help enterprises outpace modern cyber threats.'
  },
  ar: {
    title: 'ذا ساموراي | استشارات أمنية مدعومة بالذكاء الاصطناعي',
    description:
      'ذا ساموراي يجمع بين الاستشارات المتخصصة والدفاعات المدعومة بالذكاء الاصطناعي وفِرق الاستجابة السريعة لحماية المؤسسات من التهديدات الحديثة.'
  }
};

export default function Head({ params }: HeadProps) {
  const { locale } = params;
  const meta = metadataByLocale[locale] ?? metadataByLocale.en;

  return (
    <>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
    </>
  );
}

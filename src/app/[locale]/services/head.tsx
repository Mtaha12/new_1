type HeadProps = {
  params: {
    locale: string;
  };
};

const metadataByLocale: Record<string, { title: string; description: string }> = {
  en: {
    title: 'Cybersecurity & IT Services | The SamurAI',
    description:
      'Explore consulting, infrastructure, resourcing, and automation services from The SamurAI designed to accelerate secure digital transformation.'
  },
  ar: {
    title: 'الخدمات الأمنية والتحول الرقمي | ذا ساموراي',
    description:
      'اكتشف خدمات الاستشارات والبنية التحتية والموارد والأتمتة من ذا ساموراي لتسريع التحول الرقمي الآمن.'
  }
};

export default function Head({ params }: HeadProps) {
  const meta = metadataByLocale[params.locale] ?? metadataByLocale.en;

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

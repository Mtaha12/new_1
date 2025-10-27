'use client';

import { useTranslations } from 'next-intl';

export default function StatsSection() {
  const t = useTranslations('Stats');

  const stats = [
    { number: '100+', label: t('clients') },
    { number: '250+', label: t('projects') },
    { number: '5+', label: t('experience') },
    { number: '15+', label: t('team') },
  ];

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300 text-sm lg:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
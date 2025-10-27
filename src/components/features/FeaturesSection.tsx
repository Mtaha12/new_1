'use client';

import { useTranslations } from 'next-intl';
import Card from '@/components/ui/Card';
import { Code, Shield, HeadphonesIcon, Rocket } from 'lucide-react';

export default function FeaturesSection() {
  const t = useTranslations('Features');

  const features = [
    {
      icon: Code,
      title: t('feature1.title'),
      description: t('feature1.description'),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: t('feature2.title'),
      description: t('feature2.description'),
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: HeadphonesIcon,
      title: t('feature3.title'),
      description: t('feature3.description'),
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Rocket,
      title: t('feature4.title'),
      description: t('feature4.description'),
      color: 'from-orange-500 to-red-500'
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-8 group hover:transform hover:-translate-y-2">
              <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
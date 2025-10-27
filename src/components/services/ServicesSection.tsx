'use client';

import { useTranslations } from 'next-intl';
import { Code, Smartphone, Palette, Users } from 'lucide-react';

export default function ServicesSection() {
  const t = useTranslations('Services');

  const services = [
    {
      icon: Code,
      title: t('webDevelopment'),
      description: 'Modern web applications built with cutting-edge technologies',
      color: 'bg-blue-500'
    },
    {
      icon: Smartphone,
      title: t('mobileApps'),
      description: 'Native and cross-platform mobile applications for iOS and Android',
      color: 'bg-green-500'
    },
    {
      icon: Palette,
      title: t('uiuxDesign'),
      description: 'User-centered design that creates exceptional digital experiences',
      color: 'bg-purple-500'
    },
    {
      icon: Users,
      title: t('consulting'),
      description: 'Strategic guidance for your digital transformation journey',
      color: 'bg-orange-500'
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-4`}>
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
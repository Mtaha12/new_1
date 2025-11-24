'use client';

import ContactForm from '@/components/contacts/ContactForm';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import { Container } from '@/components/layout/Container';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import FloatingCTA from '@/components/ui/FloatingCTA';

const ContactInfoCard = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <div className="text-center bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all duration-300 h-full flex flex-col items-center justify-center">
    <div className="text-4xl mb-4 text-white">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-3 text-white">
      {title}
    </h3>
    <div className="text-indigo-100 text-sm">
      {children}
    </div>
  </div>
);

export default function ContactPage() {
  const t = useTranslations('Contact');
  const pathname = usePathname() ?? '/en';
  const currentLocale = pathname.split('/')[1] || 'en';
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col">
      <Header />
      
      <Hero 
        title={t('title')}
        subtitle={t('description')}
        backgroundImage="/img/c1.jpg"
        height="lg"
        overlayOpacity={0.7}
        className="bg-transparent mb-0"
      />

      <Container className="py-16 md:py-20 -mt-px">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-6 sm:p-8">
              <h2 className="text-3xl font-bold text-indigo-700 mb-6">
                {t('formTitle')}
              </h2>
              <ContactForm />
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white rounded-xl shadow-xl overflow-hidden h-full border border-indigo-500/20">
            <div className="p-6 sm:p-8">
              <h2 className="text-3xl font-bold mb-8 text-white">
                {t('contactInfo')}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ContactInfoCard 
                  icon="📍" 
                  title={t('officeLocation')}
                >
                  {t('address')}
                </ContactInfoCard>

                <ContactInfoCard 
                  icon="📞" 
                  title={t('phone')}
                >
                  {t('phoneNumber1')}<br />
                  {t('phoneNumber2')}
                </ContactInfoCard>

                <ContactInfoCard 
                  icon="✉️" 
                  title={t('email')}
                >
                  {t('email1')}<br />
                  {t('email2')}
                </ContactInfoCard>

                <ContactInfoCard 
                  icon="🕐" 
                  title={t('businessHours')}
                >
                  {t('workingHours')}<br />
                  {t('weekendHours')}
                </ContactInfoCard>
              </div>

              {/* Social Media Links */}
              <div className="mt-12 pt-6 border-t border-indigo-400/30">
                <h3 className="text-xl font-semibold mb-5 text-white">
                  {t('followUs')}
                </h3>
                <div className="flex justify-center">
                  <a
                    href="https://www.linkedin.com/company/thesamurai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    aria-label="LinkedIn"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <div className="h-12 w-12 rounded-full bg-white/10 hover:bg-blue-600 transition-all duration-300 flex items-center justify-center group-hover:scale-110">
                      <span className="text-xl text-white">in</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Map Section */}
      <div className="w-full h-96 bg-gray-100 shadow-inner -mt-px">
        <div className="relative w-full h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2152090573015!2d-73.9878436845938!3d40.74844057932799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            title="Office Location"
            className="opacity-90 hover:opacity-100 transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-50/50 to-transparent pointer-events-none"></div>
        </div>
      </div>

      <FloatingCTA 
        title={t('floatingCta.title', { defaultValue: 'Ready to get started?' })}
        primaryLabel={t('floatingCta.primaryLabel', { defaultValue: 'Contact Us' })}
        primaryHref={`/${currentLocale}/contact`}
        direction={currentLocale === 'ar' ? 'rtl' : 'ltr'}
        className="-mt-px"
      />
      
      <Footer/>
    </div>
  );
}

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
  <div className="group relative text-center bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md p-8 rounded-2xl hover:from-white/25 hover:to-white/15 transition-all duration-500 h-full flex flex-col items-center justify-center border border-white/10 hover:border-white/30 shadow-xl hover:shadow-2xl hover:-translate-y-2">
    {/* Animated background gradient on hover */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/10 group-hover:to-purple-400/10 transition-all duration-500 pointer-events-none"></div>
    
    {/* Icon with enhanced styling */}
    <div className="relative z-10 text-6xl mb-5 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300 transform">
      {icon}
    </div>
    
    {/* Title with improved typography */}
    <h3 className="relative z-10 text-xl font-bold mb-4 text-white drop-shadow-md leading-tight">
      {title}
    </h3>
    
    {/* Children content with better styling */}
    <div className="relative z-10 text-indigo-100 text-sm leading-relaxed font-medium break-words">
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
          <div className="relative bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 text-white rounded-2xl shadow-2xl overflow-hidden h-full border border-indigo-400/30 backdrop-blur-xl">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>
            
            <div className="relative z-10 p-6 sm:p-10 lg:p-12">
              {/* Header section with improved typography */}
              <div className="mb-10">
                <h2 className="text-4xl sm:text-5xl font-black mb-2 text-white leading-tight drop-shadow-lg">
                  {t('contactInfo')}
                </h2>
                <div className="h-1 w-16 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full"></div>
              </div>
              
              {/* Contact Info Cards Grid with enhanced layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
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

              {/* Social Media Links Section with enhanced styling */}
              <div className="mt-12 pt-8 border-t border-white/20">
                <h3 className="text-2xl font-bold mb-6 text-white drop-shadow-md">
                  {t('followUs')}
                </h3>
                <div className="flex justify-center gap-4">
                  <a
                    href="https://www.linkedin.com/company/thesamurai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    aria-label="LinkedIn"
                  >
                    <span className="sr-only">LinkedIn</span>
                    {/* Enhanced social button with gradient and animation */}
                    <div className="relative h-14 w-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-300 hover:to-blue-500 transition-all duration-300 flex items-center justify-center group-hover:scale-125 group-hover:shadow-2xl shadow-lg hover:shadow-blue-500/50 transform">
                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-full bg-blue-300/20 blur-lg group-hover:blur-xl transition-all duration-300"></div>
                      {/* Icon */}
                      <span className="relative text-2xl text-white font-bold drop-shadow-lg">in</span>
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

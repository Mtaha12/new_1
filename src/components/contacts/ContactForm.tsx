'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export default function ContactForm() {
  const t = useTranslations('ContactForm');
  const pathname = usePathname();
  const currentLocale = pathname?.split('/')[1] || 'en';
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s\-\+\(\)\.]+$/;
    const cleanPhone = phone.replace(/\s/g, '');
    return cleanPhone.length >= 10 && phoneRegex.test(phone);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = t('errors.nameRequired');
    } else if (formData.name.trim().length < 2) {
      newErrors.name = t('errors.nameTooShort');
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = t('errors.emailRequired');
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('errors.emailInvalid');
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = t('errors.phoneRequired');
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = t('errors.phoneInvalid');
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = t('errors.subjectRequired');
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = t('errors.messageRequired');
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('errors.messageTooShort');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      console.log('Submitting contact form to API...', formData);

      // Call your actual API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          locale: currentLocale
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      console.log('Form submitted successfully:', data);
      
      setSubmitStatus('success');
      setSubmitMessage(t('successMessage'));
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setSubmitMessage('');
      }, 5000);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage(
        error instanceof Error 
          ? error.message 
          : t('errorMessage')
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: 'clamp(1.5rem, 4vw, 2.5rem)',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fc 100%)',
      borderRadius: '20px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,188,212,0.1)',
      color: '#0a0e3d',
      border: '1px solid rgba(0,188,212,0.2)'
    }}>
      {/* Header Section */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          fontWeight: '900',
          color: '#0a0e3d',
          marginBottom: '1.5rem',
          lineHeight: '1.2',
          letterSpacing: '-0.5px'
        }}>
          {t('title')}
        </h2>
        <div style={{
          width: '60px',
          height: '4px',
          background: 'linear-gradient(90deg, #00bcd4, #0097a7)',
          borderRadius: '2px',
          margin: '0 auto',
          opacity: 0.8
        }}></div>
      </div>
      
      <p style={{
        color: '#666',
        textAlign: 'center',
        marginBottom: '2.5rem',
        fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
        lineHeight: '1.7'
      }}>
        {t('subtitle')}
      </p>

      {/* Success Message */}
      {submitStatus === 'success' && (
        <div style={{
          background: 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)',
          border: '2px solid #28a745',
          color: '#155724',
          padding: '1.25rem 1.5rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          textAlign: 'center',
          fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
          fontWeight: '600',
          animation: 'slideIn 0.3s ease-out'
        }}>
          ✓ {submitMessage}
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div style={{
          background: 'linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%)',
          border: '2px solid #dc3545',
          color: '#721c24',
          padding: '1.25rem 1.5rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          textAlign: 'center',
          fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
          fontWeight: '600',
          animation: 'slideIn 0.3s ease-out'
        }}>
          ⚠ {submitMessage}
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
        gap: '1.75rem',
        marginBottom: '2rem'
      }}>
        {/* Name Field */}
        <div>
          <label htmlFor="name" style={{
            display: 'block',
            marginBottom: '0.75rem',
            fontWeight: '700',
            color: '#0a0e3d',
            fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
            letterSpacing: '-0.3px'
          }}>
            {t('fields.name')} <span style={{ color: '#dc3545', fontWeight: '900' }}>*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t('placeholders.name')}
            style={{
              width: '100%',
              padding: 'clamp(0.9rem, 1.5vw, 1rem)',
              border: errors.name ? '2px solid #dc3545' : '2px solid #e0e0e0',
              borderRadius: '12px',
              fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
              transition: 'all 0.3s ease',
              outline: 'none',
              color: '#0a0e3d',
              backgroundColor: '#fafbff',
              caretColor: '#00bcd4',
              boxShadow: errors.name ? '0 0 0 3px rgba(220, 53, 69, 0.1)' : 'none'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#00bcd4';
              e.target.style.boxShadow = '0 0 0 3px rgba(0, 188, 212, 0.15)';
              e.target.style.backgroundColor = '#fff';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = errors.name ? '#dc3545' : '#e0e0e0';
              e.target.style.boxShadow = errors.name ? '0 0 0 3px rgba(220, 53, 69, 0.1)' : 'none';
              e.target.style.backgroundColor = '#fafbff';
            }}
          />
          {errors.name && (
            <span style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '0.5rem', display: 'block', fontWeight: '600' }}>
              ✕ {errors.name}
            </span>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" style={{
            display: 'block',
            marginBottom: '0.75rem',
            fontWeight: '700',
            color: '#0a0e3d',
            fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
            letterSpacing: '-0.3px'
          }}>
            {t('fields.email')} <span style={{ color: '#dc3545', fontWeight: '900' }}>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t('placeholders.email')}
            style={{
              width: '100%',
              padding: 'clamp(0.9rem, 1.5vw, 1rem)',
              border: errors.email ? '2px solid #dc3545' : '2px solid #e0e0e0',
              borderRadius: '12px',
              fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
              transition: 'all 0.3s ease',
              outline: 'none',
              color: '#0a0e3d',
              backgroundColor: '#fafbff',
              caretColor: '#00bcd4',
              boxShadow: errors.email ? '0 0 0 3px rgba(220, 53, 69, 0.1)' : 'none'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#00bcd4';
              e.target.style.boxShadow = '0 0 0 3px rgba(0, 188, 212, 0.15)';
              e.target.style.backgroundColor = '#fff';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = errors.email ? '#dc3545' : '#e0e0e0';
              e.target.style.boxShadow = errors.email ? '0 0 0 3px rgba(220, 53, 69, 0.1)' : 'none';
              e.target.style.backgroundColor = '#fafbff';
            }}
          />
          {errors.email && (
            <span style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '0.5rem', display: 'block', fontWeight: '600' }}>
              ✕ {errors.email}
            </span>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" style={{
            display: 'block',
            marginBottom: '0.75rem',
            fontWeight: '700',
            color: '#0a0e3d',
            fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
            letterSpacing: '-0.3px'
          }}>
            {t('fields.phone')} <span style={{ color: '#dc3545', fontWeight: '900' }}>*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={t('placeholders.phone')}
            style={{
              width: '100%',
              padding: 'clamp(0.9rem, 1.5vw, 1rem)',
              border: errors.phone ? '2px solid #dc3545' : '2px solid #e0e0e0',
              borderRadius: '12px',
              fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
              transition: 'all 0.3s ease',
              outline: 'none',
              color: '#0a0e3d',
              backgroundColor: '#fafbff',
              caretColor: '#00bcd4',
              boxShadow: errors.phone ? '0 0 0 3px rgba(220, 53, 69, 0.1)' : 'none'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#00bcd4';
              e.target.style.boxShadow = '0 0 0 3px rgba(0, 188, 212, 0.15)';
              e.target.style.backgroundColor = '#fff';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = errors.phone ? '#dc3545' : '#e0e0e0';
              e.target.style.boxShadow = errors.phone ? '0 0 0 3px rgba(220, 53, 69, 0.1)' : 'none';
              e.target.style.backgroundColor = '#fafbff';
            }}
          />
          {errors.phone && (
            <span style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '0.5rem', display: 'block', fontWeight: '600' }}>
              ✕ {errors.phone}
            </span>
          )}
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" style={{
            display: 'block',
            marginBottom: '0.75rem',
            fontWeight: '700',
            color: '#0a0e3d',
            fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
            letterSpacing: '-0.3px'
          }}>
            {t('fields.subject')} <span style={{ color: '#dc3545', fontWeight: '900' }}>*</span>
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: 'clamp(0.9rem, 1.5vw, 1rem)',
              border: errors.subject ? '2px solid #dc3545' : '2px solid #e0e0e0',
              borderRadius: '12px',
              fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
              transition: 'all 0.3s ease',
              outline: 'none',
              backgroundColor: '#fafbff',
              color: '#0a0e3d',
              cursor: 'pointer',
              boxShadow: errors.subject ? '0 0 0 3px rgba(220, 53, 69, 0.1)' : 'none',
              appearance: 'none',
              backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2300bcd4\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.75rem center',
              backgroundSize: '1.2rem',
              paddingRight: '2.5rem'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#00bcd4';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 188, 212, 0.15)';
              e.currentTarget.style.backgroundColor = '#fff';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = errors.subject ? '#dc3545' : '#e0e0e0';
              e.currentTarget.style.boxShadow = errors.subject ? '0 0 0 3px rgba(220, 53, 69, 0.1)' : 'none';
              e.currentTarget.style.backgroundColor = '#fafbff';
            }}
          >
            <option value="">{t('placeholders.subject')}</option>
            <option value="general">{t('subjects.general')}</option>
            <option value="consulting">{t('subjects.consulting')}</option>
            <option value="support">{t('subjects.support')}</option>
            <option value="partnership">{t('subjects.partnership')}</option>
            <option value="other">{t('subjects.other')}</option>
          </select>
          {errors.subject && (
            <span style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '0.5rem', display: 'block', fontWeight: '600' }}>
              ✕ {errors.subject}
            </span>
          )}
        </div>
      </div>

      {/* Message Field */}
      <div style={{ marginTop: '2rem' }}>
        <label htmlFor="message" style={{
          display: 'block',
          marginBottom: '0.75rem',
          fontWeight: '700',
          color: '#0a0e3d',
          fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
          letterSpacing: '-0.3px'
        }}>
          {t('fields.message')} <span style={{ color: '#dc3545', fontWeight: '900' }}>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={t('placeholders.message')}
          rows={6}
          style={{
            width: '100%',
            minHeight: '180px',
            padding: 'clamp(1rem, 1.5vw, 1.1rem)',
            border: errors.message ? '2px solid #dc3545' : '2px solid #e0e0e0',
            borderRadius: '12px',
            fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
            transition: 'all 0.3s ease',
            outline: 'none',
            resize: 'vertical',
            fontFamily: 'inherit',
            color: '#0a0e3d',
            backgroundColor: '#fafbff',
            caretColor: '#00bcd4',
            boxShadow: errors.message ? '0 0 0 3px rgba(220, 53, 69, 0.1)' : 'none',
            lineHeight: '1.6'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#00bcd4';
            e.target.style.boxShadow = '0 0 0 3px rgba(0, 188, 212, 0.15)';
            e.target.style.backgroundColor = '#fff';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = errors.message ? '#dc3545' : '#e0e0e0';
            e.target.style.boxShadow = errors.message ? '0 0 0 3px rgba(220, 53, 69, 0.1)' : 'none';
            e.target.style.backgroundColor = '#fafbff';
          }}
        />
        {errors.message && (
          <span style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '0.5rem', display: 'block', fontWeight: '600' }}>
            ✕ {errors.message}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={!isSubmitting ? 'hover-glow' : ''}
        style={{
          width: '100%',
          marginTop: '2.5rem',
          padding: 'clamp(1rem, 2.5vw, 1.25rem)',
          background: isSubmitting 
            ? 'linear-gradient(135deg, #b0bec5 0%, #90a4ae 100%)' 
            : 'linear-gradient(135deg, #00bcd4 0%, #0097a7 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: '12px',
          fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
          fontWeight: '800',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: isSubmitting 
            ? '0 4px 12px rgba(0,0,0,0.1)' 
            : '0 8px 25px rgba(0, 188, 212, 0.35)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          position: 'relative',
          overflow: 'hidden',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
        onMouseEnter={(e) => {
          if (!isSubmitting) {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 14px 35px rgba(0, 188, 212, 0.45)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isSubmitting) {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 188, 212, 0.35)';
          }
        }}
      >
        {isSubmitting ? t('submitting') : t('submit')}
      </button>

    </form>
  );
}
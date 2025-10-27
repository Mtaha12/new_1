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
  const currentLocale = pathname.split('/')[1] || 'en';
  
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
      padding: 'clamp(1.5rem, 4vw, 2rem)',
      background: '#fff',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      color: '#0a0e3d'
    }}>
      <h2 style={{
        fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
        fontWeight: '800',
        color: '#0a0e3d',
        marginBottom: '1rem',
        textAlign: 'center'
      }}>
        {t('title')}
      </h2>
      
      <p style={{
        color: '#666',
        textAlign: 'center',
        marginBottom: '2rem',
        fontSize: 'clamp(0.95rem, 1.5vw, 1rem)'
      }}>
        {t('subtitle')}
      </p>

      {/* Success Message */}
      {submitStatus === 'success' && (
        <div style={{
          background: '#d4edda',
          border: '1px solid #c3e6cb',
          color: '#155724',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          {submitMessage}
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div style={{
          background: '#f8d7da',
          border: '1px solid #f5c6cb',
          color: '#721c24',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          {submitMessage}
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
        gap: '1.5rem'
      }}>
        {/* Name Field */}
        <div>
          <label htmlFor="name" style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#333',
            fontSize: 'clamp(0.9rem, 1.2vw, 1rem)'
          }}>
            {t('fields.name')} <span style={{ color: '#dc3545' }}>*</span>
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
              padding: 'clamp(0.7rem, 1.5vw, 0.9rem)',
              border: errors.name ? '2px solid #dc3545' : '1px solid #ddd',
              borderRadius: '8px',
              fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
              transition: 'border-color 0.3s',
              outline: 'none',
              color: '#0a0e3d',
              backgroundColor: '#fff',
              caretColor: '#0a0e3d'
            }}
            onFocus={(e) => e.target.style.borderColor = '#00bcd4'}
            onBlur={(e) => e.target.style.borderColor = errors.name ? '#dc3545' : '#ddd'}
          />
          {errors.name && (
            <span style={{ color: '#dc3545', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block' }}>
              {errors.name}
            </span>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#333',
            fontSize: 'clamp(0.9rem, 1.2vw, 1rem)'
          }}>
            {t('fields.email')} <span style={{ color: '#dc3545' }}>*</span>
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
              padding: 'clamp(0.7rem, 1.5vw, 0.9rem)',
              border: errors.email ? '2px solid #dc3545' : '1px solid #ddd',
              borderRadius: '8px',
              fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
              transition: 'border-color 0.3s',
              outline: 'none',
              color: '#0a0e3d',
              backgroundColor: '#fff',
              caretColor: '#0a0e3d'
            }}
            onFocus={(e) => e.target.style.borderColor = '#00bcd4'}
            onBlur={(e) => e.target.style.borderColor = errors.email ? '#dc3545' : '#ddd'}
          />
          {errors.email && (
            <span style={{ color: '#dc3545', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block' }}>
              {errors.email}
            </span>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#333',
            fontSize: 'clamp(0.9rem, 1.2vw, 1rem)'
          }}>
            {t('fields.phone')} <span style={{ color: '#dc3545' }}>*</span>
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
              padding: 'clamp(0.7rem, 1.5vw, 0.9rem)',
              border: errors.phone ? '2px solid #dc3545' : '1px solid #ddd',
              borderRadius: '8px',
              fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
              transition: 'border-color 0.3s',
              outline: 'none',
              color: '#0a0e3d',
              backgroundColor: '#fff',
              caretColor: '#0a0e3d'
            }}
            onFocus={(e) => e.target.style.borderColor = '#00bcd4'}
            onBlur={(e) => e.target.style.borderColor = errors.phone ? '#dc3545' : '#ddd'}
          />
          {errors.phone && (
            <span style={{ color: '#dc3545', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block' }}>
              {errors.phone}
            </span>
          )}
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#333',
            fontSize: 'clamp(0.9rem, 1.2vw, 1rem)'
          }}>
            {t('fields.subject')} <span style={{ color: '#dc3545' }}>*</span>
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: 'clamp(0.7rem, 1.5vw, 0.9rem)',
              border: errors.subject ? '2px solid #dc3545' : '1px solid #ddd',
              borderRadius: '8px',
              fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
              transition: 'border-color 0.3s',
              outline: 'none',
              backgroundColor: '#fff',
              color: '#0a0e3d'
            }}
            onFocus={(e) => e.target.style.borderColor = '#00bcd4'}
            onBlur={(e) => e.target.style.borderColor = errors.subject ? '#dc3545' : '#ddd'}
          >
            <option value="">{t('placeholders.subject')}</option>
            <option value="general">{t('subjects.general')}</option>
            <option value="consulting">{t('subjects.consulting')}</option>
            <option value="support">{t('subjects.support')}</option>
            <option value="partnership">{t('subjects.partnership')}</option>
            <option value="other">{t('subjects.other')}</option>
          </select>
          {errors.subject && (
            <span style={{ color: '#dc3545', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block' }}>
              {errors.subject}
            </span>
          )}
        </div>
      </div>

      {/* Message Field */}
      <div style={{ marginTop: '1.5rem' }}>
        <label htmlFor="message" style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontWeight: '600',
          color: '#333',
          fontSize: 'clamp(0.9rem, 1.2vw, 1rem)'
        }}>
          {t('fields.message')} <span style={{ color: '#dc3545' }}>*</span>
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
            minHeight: '160px',
            padding: 'clamp(0.8rem, 1.5vw, 1rem)',
            border: errors.message ? '2px solid #dc3545' : '1px solid #ddd',
            borderRadius: '8px',
            fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
            transition: 'border-color 0.3s',
            outline: 'none',
            resize: 'vertical',
            fontFamily: 'inherit',
            color: '#0a0e3d',
            backgroundColor: '#fff',
            caretColor: '#0a0e3d'
          }}
          onFocus={(e) => e.target.style.borderColor = '#00bcd4'}
          onBlur={(e) => e.target.style.borderColor = errors.message ? '#dc3545' : '#ddd'}
        />
        {errors.message && (
          <span style={{ color: '#dc3545', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block' }}>
            {errors.message}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          width: '100%',
          marginTop: '2rem',
          padding: 'clamp(0.9rem, 2vw, 1.1rem)',
          background: isSubmitting ? '#6c757d' : '#00bcd4',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
          fontWeight: '700',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s',
          boxShadow: '0 4px 12px rgba(0,188,212,0.3)'
        }}
        onMouseEnter={(e) => {
          if (!isSubmitting) {
            e.currentTarget.style.background = '#00a5b8';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isSubmitting) {
            e.currentTarget.style.background = '#00bcd4';
            e.currentTarget.style.transform = 'translateY(0)';
          }
        }}
      >
        {isSubmitting ? t('submitting') : t('submit')}
      </button>
    </form>
  );
}
'use client';

import { useState, useCallback, useMemo, memo } from 'react';
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

// Debounce hook for performance optimization
function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const newTimeoutId = setTimeout(() => {
        callback(...args);
      }, delay);
      setTimeoutId(newTimeoutId);
    },
    [callback, delay, timeoutId]
  );
}

// Memoized Input Component
const FormInput = memo(({
  id,
  name,
  type,
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  error,
  label,
  required = false
}: {
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
  label: string;
  required?: boolean;
}) => (
  <div>
    <label htmlFor={id} style={{
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: '600',
      color: '#333',
      fontSize: 'clamp(0.9rem, 1.2vw, 1rem)'
    }}>
      {label} {required && <span style={{ color: '#dc3545' }}>*</span>}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: 'clamp(0.7rem, 1.5vw, 0.9rem)',
        border: error ? '2px solid #dc3545' : '1px solid #ddd',
        borderRadius: '8px',
        fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
        transition: 'border-color 0.3s',
        outline: 'none'
      }}
      onFocus={onFocus}
      onBlur={onBlur}
    />
    {error && (
      <span style={{ color: '#dc3545', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block' }}>
        {error}
      </span>
    )}
  </div>
));

FormInput.displayName = 'FormInput';

export default function ContactFormOptimized() {
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

  // Memoized validation functions
  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const validatePhone = useCallback((phone: string): boolean => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phone.length >= 10 && phoneRegex.test(phone);
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t('errors.nameRequired');
    } else if (formData.name.trim().length < 2) {
      newErrors.name = t('errors.nameTooShort');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('errors.emailRequired');
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('errors.emailInvalid');
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t('errors.phoneRequired');
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = t('errors.phoneInvalid');
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t('errors.subjectRequired');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('errors.messageRequired');
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('errors.messageTooShort');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, t, validateEmail, validatePhone]);

  // Debounced field validation
  const debouncedValidateField = useDebounce((name: string, value: string) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'email':
        if (value && !validateEmail(value)) {
          newErrors.email = t('errors.emailInvalid');
        } else {
          delete newErrors.email;
        }
        break;
      case 'phone':
        if (value && !validatePhone(value)) {
          newErrors.phone = t('errors.phoneInvalid');
        } else {
          delete newErrors.phone;
        }
        break;
    }
    
    setErrors(newErrors);
  }, 500);

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    target.style.borderColor = '#00bcd4';
  }, []);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const { name } = target;
    
    // Only update border color for subject and message fields
    if (name === 'subject' || name === 'message') {
      target.style.borderColor = errors[name as keyof FormErrors] ? '#dc3545' : '#ddd';
    }
  }, [errors]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    
    // Debounced validation for email and phone
    if (name === 'email' || name === 'phone') {
      debouncedValidateField(name, value);
    }
  }, [errors, debouncedValidateField]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      console.log('Submitting contact form...', formData);

      // Call backend API
      const response = await fetch(`/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          locale: currentLocale,
          timestamp: new Date().toISOString()
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      console.log('Form submitted successfully:', data);
      
      setSubmitStatus('success');
      setSubmitMessage(t('successMessage'));
      
      // Reset form
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
      setSubmitMessage(error instanceof Error ? error.message : t('errorMessage'));
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, currentLocale, t]);

  // Memoized subject options
  const subjectOptions = useMemo(() => [
    { value: '', label: t('placeholders.subject') },
    { value: 'general', label: t('subjects.general') },
    { value: 'consulting', label: t('subjects.consulting') },
    { value: 'support', label: t('subjects.support') },
    { value: 'partnership', label: t('subjects.partnership') },
    { value: 'other', label: t('subjects.other') }
  ], [t]);

  return (
    <form onSubmit={handleSubmit} style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: 'clamp(1.5rem, 4vw, 2rem)',
      background: '#fff',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
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
        <FormInput
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={t('placeholders.name')}
          error={errors.name}
          label={t('fields.name')}
          required
        />

        <FormInput
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={t('placeholders.email')}
          error={errors.email}
          label={t('fields.email')}
          required
        />

        <FormInput
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={t('placeholders.phone')}
          error={errors.phone}
          label={t('fields.phone')}
          required
        />

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
              background: '#fff'
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {subjectOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
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
            padding: 'clamp(0.7rem, 1.5vw, 0.9rem)',
            border: errors.message ? '2px solid #dc3545' : '1px solid #ddd',
            borderRadius: '8px',
            fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
            transition: 'border-color 0.3s',
            outline: 'none',
            resize: 'vertical',
            fontFamily: 'inherit'
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
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
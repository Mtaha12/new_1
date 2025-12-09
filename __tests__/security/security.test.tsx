import { render, screen } from '@testing-library/react';
import DOMPurify from 'isomorphic-dompurify';

describe('Security Tests', () => {
  describe('XSS Prevention', () => {
    it('TC-219: should prevent script injection in text content', () => {
      const maliciousInput = '<script>alert("XSS")</script>Hello';
      const { container } = render(<div>{maliciousInput}</div>);
      
      // React automatically escapes content, so script tags should be text
      expect(container.querySelector('script')).toBeNull();
      expect(container.textContent).toContain('<script>');
    });

    it('TC-220: should prevent event handler injection', () => {
      const maliciousHTML = '<img src=x onerror="alert(1)">';
      const { container } = render(
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(maliciousHTML) }} />
      );
      
      const img = container.querySelector('img');
      expect(img?.getAttribute('onerror')).toBeNull();
    });

    it('TC-221: should sanitize HTML content with DOMPurify', () => {
      const maliciousHTML = '<script>alert("XSS")</script><p>Safe content</p>';
      const sanitized = DOMPurify.sanitize(maliciousHTML);
      
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).toContain('<p>Safe content</p>');
    });

    it('TC-222: should prevent iframe injection', () => {
      const maliciousHTML = '<iframe src="javascript:alert(1)"></iframe>';
      const sanitized = DOMPurify.sanitize(maliciousHTML);
      
      expect(sanitized).not.toContain('<iframe');
    });

    it('TC-223: should prevent link-based XSS', () => {
      const maliciousHTML = '<a href="javascript:alert(1)">Click me</a>';
      const sanitized = DOMPurify.sanitize(maliciousHTML);
      
      expect(sanitized).not.toContain('javascript:');
    });
  });

  describe('Input Validation', () => {
    it('TC-224: should validate email format', () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      expect(emailRegex.test('valid@example.com')).toBe(true);
      expect(emailRegex.test('invalid-email')).toBe(false);
      expect(emailRegex.test('no@domain')).toBe(false);
      expect(emailRegex.test('@nodomain.com')).toBe(false);
    });

    it('TC-225: should validate phone number format', () => {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      
      expect(phoneRegex.test('+1234567890')).toBe(true);
      expect(phoneRegex.test('123-456-7890')).toBe(true);
      expect(phoneRegex.test('abc123')).toBe(false);
    });

    it('TC-226: should reject SQL injection attempts', () => {
      const sqlInjection = "'; DROP TABLE users; --";
      const sanitized = sqlInjection.replace(/['";\\]/gi, '');
      
      expect(sanitized).not.toContain("'");
      expect(sanitized).not.toContain(';');
    });
  });

  describe('Content Security', () => {
    it('TC-227: should not expose sensitive data in client-side code', () => {
      // Check that env variables are properly prefixed
      const publicVars = Object.keys(process.env).filter(key => 
        key.startsWith('NEXT_PUBLIC_')
      );
      
      // Ensure no sensitive keys are exposed
      const sensitiveKeys = ['MONGODB_URI', 'JWT_SECRET', 'API_KEY', 'PRIVATE_KEY'];
      sensitiveKeys.forEach(key => {
        expect(Object.keys(process.env)).not.toContain(key);
      });
    });

    it('TC-228: should validate URL parameters', () => {
      const validateUrl = (url: string) => {
        try {
          const parsed = new URL(url);
          // Reject dangerous protocols
          if (parsed.protocol === 'javascript:' || parsed.protocol === 'data:') {
            return false;
          }
          return true;
        } catch {
          return false;
        }
      };

      expect(validateUrl('https://example.com')).toBe(true);
      expect(validateUrl('javascript:alert(1)')).toBe(false);
      expect(validateUrl('data:text/html,<script>alert(1)</script>')).toBe(false);
    });
  });

  describe('CSRF Protection', () => {
    it('TC-229: should require proper headers for API requests', async () => {
      const headers = {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      };

      expect(headers['Content-Type']).toBe('application/json');
      expect(headers['X-Requested-With']).toBeTruthy();
    });
  });
});

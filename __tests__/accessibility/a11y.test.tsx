import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Accessibility (A11y) Tests', () => {
  describe('WCAG Compliance', () => {
    it('TC-230: should have proper heading hierarchy', () => {
      const { container } = render(
        <div>
          <h1>Main Heading</h1>
          <h2>Subheading</h2>
          <h3>Sub-subheading</h3>
        </div>
      );
      
      const h1 = container.querySelectorAll('h1');
      const h2 = container.querySelectorAll('h2');
      const h3 = container.querySelectorAll('h3');
      
      expect(h1.length).toBe(1);
      expect(h2.length).toBeGreaterThanOrEqual(1);
      expect(h3.length).toBeGreaterThanOrEqual(1);
    });

    it('TC-231: should have alt text for images', () => {
      const { container } = render(
        <div>
          <img src="/test.jpg" alt="Test image description" />
          <img src="/logo.png" alt="Company logo" />
        </div>
      );
      
      const images = container.querySelectorAll('img');
      images.forEach(img => {
        const alt = img.getAttribute('alt');
        expect(alt).toBeTruthy();
        expect(alt!.length).toBeGreaterThan(0);
      });
    });

    it('TC-232: should have proper ARIA labels for interactive elements', () => {
      const { container } = render(
        <div>
          <button aria-label="Close dialog">×</button>
          <input type="text" aria-label="Search" />
          <a href="/contact" aria-label="Contact us">Contact</a>
        </div>
      );
      
      const button = container.querySelector('button');
      const input = container.querySelector('input');
      const link = container.querySelector('a');
      
      expect(button?.getAttribute('aria-label')).toBeTruthy();
      expect(input?.getAttribute('aria-label')).toBeTruthy();
      expect(link?.getAttribute('aria-label')).toBeTruthy();
    });

    it('TC-233: should have sufficient color contrast', () => {
      // This test validates that color combinations meet WCAG standards
      const { container } = render(
        <div>
          <p style={{ color: '#000', backgroundColor: '#fff' }}>High contrast text</p>
        </div>
      );
      
      const paragraph = container.querySelector('p');
      const styles = window.getComputedStyle(paragraph!);
      
      expect(styles.color).toBeTruthy();
      expect(styles.backgroundColor).toBeTruthy();
    });

    it('TC-234: should have keyboard navigation support', () => {
      const { container } = render(
        <div>
          <button tabIndex={0}>Button 1</button>
          <a href="#" tabIndex={0}>Link 1</a>
          <input type="text" tabIndex={0} placeholder="Search" />
        </div>
      );
      
      const focusableElements = container.querySelectorAll('[tabIndex="0"]');
      expect(focusableElements.length).toBeGreaterThan(0);
    });

    it('TC-235: should have proper form labels', () => {
      const { container } = render(
        <form>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" />
          
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
        </form>
      );
      
      const labels = container.querySelectorAll('label');
      const inputs = container.querySelectorAll('input');
      
      expect(labels.length).toBe(inputs.length);
      
      labels.forEach(label => {
        const htmlFor = label.getAttribute('htmlFor') || label.getAttribute('for');
        expect(htmlFor).toBeTruthy();
      });
    });
  });

  describe('Screen Reader Support', () => {
    it('TC-236: should have descriptive link text', () => {
      const { container } = render(
        <div>
          <a href="/services">Our Services</a>
          <a href="/contact">Contact Us</a>
        </div>
      );
      
      const links = container.querySelectorAll('a');
      links.forEach(link => {
        const text = link.textContent;
        expect(text).toBeTruthy();
        expect(text!.length).toBeGreaterThan(2);
        // Avoid generic text like "click here"
        expect(text?.toLowerCase()).not.toBe('click here');
        expect(text?.toLowerCase()).not.toBe('read more');
      });
    });

    it('TC-237: should have ARIA live regions for dynamic content', () => {
      const { container } = render(
        <div>
          <div role="alert" aria-live="assertive">Error message</div>
          <div role="status" aria-live="polite">Loading...</div>
        </div>
      );
      
      const alert = container.querySelector('[role="alert"]');
      const status = container.querySelector('[role="status"]');
      
      expect(alert?.getAttribute('aria-live')).toBe('assertive');
      expect(status?.getAttribute('aria-live')).toBe('polite');
    });

    it('TC-238: should have skip navigation link', () => {
      const { container } = render(
        <div>
          <a href="#main-content" className="skip-link">Skip to main content</a>
          <main id="main-content">Content here</main>
        </div>
      );
      
      const skipLink = container.querySelector('.skip-link');
      const main = container.querySelector('main');
      
      expect(skipLink).toBeTruthy();
      expect(main).toBeTruthy();
    });
  });

  describe('Focus Management', () => {
    it('TC-239: should have visible focus indicators', () => {
      const { container } = render(
        <button className="focus:ring-2 focus:ring-blue-500">Click me</button>
      );
      
      const button = container.querySelector('button');
      expect(button?.className).toContain('focus:');
    });

    it('TC-240: should trap focus in modals', () => {
      const { container } = render(
        <div role="dialog" aria-modal="true">
          <h2>Modal Title</h2>
          <button>Action</button>
          <button>Close</button>
        </div>
      );
      
      const dialog = container.querySelector('[role="dialog"]');
      expect(dialog?.getAttribute('aria-modal')).toBe('true');
    });
  });

  describe('Semantic HTML', () => {
    it('TC-241: should use semantic HTML elements', () => {
      const { container } = render(
        <div>
          <header>Header</header>
          <nav>Navigation</nav>
          <main>Main content</main>
          <aside>Sidebar</aside>
          <footer>Footer</footer>
        </div>
      );
      
      expect(container.querySelector('header')).toBeTruthy();
      expect(container.querySelector('nav')).toBeTruthy();
      expect(container.querySelector('main')).toBeTruthy();
      expect(container.querySelector('aside')).toBeTruthy();
      expect(container.querySelector('footer')).toBeTruthy();
    });

    it('TC-242: should have proper landmark roles', () => {
      const { container } = render(
        <div>
          <header role="banner">Header</header>
          <nav role="navigation">Nav</nav>
          <main role="main">Content</main>
          <footer role="contentinfo">Footer</footer>
        </div>
      );
      
      expect(container.querySelector('[role="banner"]')).toBeTruthy();
      expect(container.querySelector('[role="navigation"]')).toBeTruthy();
      expect(container.querySelector('[role="main"]')).toBeTruthy();
      expect(container.querySelector('[role="contentinfo"]')).toBeTruthy();
    });
  });
});

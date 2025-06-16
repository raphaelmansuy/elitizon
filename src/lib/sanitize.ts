import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

// For server-side rendering
const window = new JSDOM('').window;
const purify = DOMPurify(window as unknown as Window & typeof globalThis);

export function sanitizeHtml(html: string): string {
  return purify.sanitize(html, {
    ALLOWED_TAGS: ['br', 'p', 'strong', 'em', 'u'],
    ALLOWED_ATTR: []
  });
}

export function sanitizeText(text: string): string {
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

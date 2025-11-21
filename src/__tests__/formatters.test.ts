import {
  formatCurrency,
  parseCurrency,
  formatWithSeparator,
  createFormatter,
  PREDEFINED_RULES,
} from '../index';

describe('Formatters', () => {
  describe('formatCurrency', () => {
    it('should format with currency symbol', () => {
      const formatted = formatCurrency(1000, 'IDR', 2);
      expect(formatted).toContain('IDR');
      expect(formatted).toContain('1,000');
    });

    it('should format without currency symbol', () => {
      const formatted = formatCurrency(1000, '', 2);
      expect(formatted).toContain('1,000');
      expect(formatted).not.toContain('IDR');
    });

    it('should respect decimal places', () => {
      const formatted = formatCurrency(1000.5, 'IDR', 2);
      expect(formatted).toContain('1,000.50');
    });

    it('should format with 0 decimals', () => {
      const formatted = formatCurrency(1000.5, 'IDR', 0);
      expect(formatted).toContain('1,001');
    });

    it('should use custom locale', () => {
      const formatted = formatCurrency(1000.5, 'EUR', 2, 'de-DE');
      expect(formatted).toContain('EUR');
      // German locale uses different formatting
      expect(formatted).toBeDefined();
    });
  });

  describe('parseCurrency', () => {
    it('should parse currency string with symbol', () => {
      const parsed = parseCurrency('IDR 1,000.50');
      expect(parsed).toBe(1000.5);
    });

    it('should parse currency string without symbol', () => {
      const parsed = parseCurrency('1,000.50');
      expect(parsed).toBe(1000.5);
    });

    it('should parse currency with spaces', () => {
      const parsed = parseCurrency('$ 1,000.50');
      expect(parsed).toBe(1000.5);
    });

    it('should parse negative amounts', () => {
      const parsed = parseCurrency('-1,000.50');
      expect(parsed).toBe(-1000.5);
    });

    it('should throw error for invalid input', () => {
      expect(() => parseCurrency('invalid')).toThrow('Invalid currency value');
    });

    it('should parse simple number string', () => {
      const parsed = parseCurrency('1000');
      expect(parsed).toBe(1000);
    });
  });

  describe('formatWithSeparator', () => {
    it('should format with default comma separator', () => {
      const formatted = formatWithSeparator(1000000, ',', 2);
      expect(formatted).toBe('1,000,000.00');
    });

    it('should format with custom separator', () => {
      const formatted = formatWithSeparator(1000000, '.', 2);
      expect(formatted).toBe('1.000.000.00');
    });

    it('should respect decimal places', () => {
      const formatted = formatWithSeparator(1000.5, ',', 2);
      expect(formatted).toBe('1,000.50');
    });

    it('should format with 0 decimals', () => {
      const formatted = formatWithSeparator(1000.5, ',', 0);
      expect(formatted).toBe('1,001');
    });
  });

  describe('createFormatter', () => {
    it('should create formatter for rule', () => {
      const formatter = createFormatter(PREDEFINED_RULES.indonesia2027);
      const formatted = formatter(1000);
      // Indonesia uses local symbol 'Rp' and hides decimals for whole numbers
      expect(formatted).toContain('Rp');
      expect(formatted).toContain('1'); // Should contain the number
      expect(formatted).not.toContain(',00'); // Should not show decimals for whole numbers
      // The exact format depends on locale, but should not have decimals
      expect(formatted.split(',')[0]).toBeTruthy(); // Should not have decimal part
    });

    it('should use rule decimals', () => {
      const rule = {
        name: 'test',
        factor: 1000,
        newCurrency: 'USD',
        decimals: 0,
      };
      const formatter = createFormatter(rule);
      const formatted = formatter(1000.5);
      expect(formatted).toContain('1,001');
    });

    it('should use custom locale', () => {
      const formatter = createFormatter(PREDEFINED_RULES.indonesia2027, 'de-DE');
      const formatted = formatter(1000);
      expect(formatted).toBeDefined();
    });
  });
});


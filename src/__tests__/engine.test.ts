import { RedenominationEngine, PREDEFINED_RULES } from '../index';

describe('RedenominationEngine', () => {
  describe('Constructor', () => {
    it('should create engine with valid rule', () => {
      const rule = {
        name: 'test',
        factor: 1000,
        oldCurrency: 'OLD',
        newCurrency: 'NEW',
        decimals: 2,
      };
      const engine = new RedenominationEngine(rule);
      expect(engine).toBeInstanceOf(RedenominationEngine);
    });

    it('should throw error for invalid factor (zero)', () => {
      const rule = {
        name: 'test',
        factor: 0,
      };
      expect(() => new RedenominationEngine(rule)).toThrow('Conversion factor must be greater than 0');
    });

    it('should throw error for invalid factor (negative)', () => {
      const rule = {
        name: 'test',
        factor: -1000,
      };
      expect(() => new RedenominationEngine(rule)).toThrow('Conversion factor must be greater than 0');
    });
  });

  describe('convertForward', () => {
    it('should convert old currency to new (Indonesia 2027)', () => {
      const engine = new RedenominationEngine(PREDEFINED_RULES.indonesia2027);
      const result = engine.convertForward(1000000);
      expect(result.amount).toBe(1000);
      expect(result.original).toBe(1000000);
      expect(result.direction).toBe('forward');
    });

    it('should convert with custom factor', () => {
      const engine = new RedenominationEngine({
        name: 'test',
        factor: 100,
      });
      const result = engine.convertForward(10000);
      expect(result.amount).toBe(100);
    });

    it('should handle decimal results', () => {
      const engine = new RedenominationEngine({
        name: 'test',
        factor: 3,
      });
      const result = engine.convertForward(10, { rounding: 'none' });
      expect(result.amount).toBeCloseTo(3.333333, 5);
    });

    it('should apply rounding (round)', () => {
      const engine = new RedenominationEngine({
        name: 'test',
        factor: 3,
        decimals: 2,
      });
      const result = engine.convertForward(10, { rounding: 'round' });
      expect(result.amount).toBe(3.33);
    });

    it('should apply rounding (floor)', () => {
      const engine = new RedenominationEngine({
        name: 'test',
        factor: 3,
        decimals: 2,
      });
      const result = engine.convertForward(10, { rounding: 'floor' });
      expect(result.amount).toBe(3.33);
    });

    it('should apply rounding (ceil)', () => {
      const engine = new RedenominationEngine({
        name: 'test',
        factor: 3,
        decimals: 2,
      });
      const result = engine.convertForward(10, { rounding: 'ceil' });
      expect(result.amount).toBe(3.34);
    });

    it('should apply rounding (none)', () => {
      const engine = new RedenominationEngine({
        name: 'test',
        factor: 3,
      });
      const result = engine.convertForward(10, { rounding: 'none' });
      expect(result.amount).toBeCloseTo(3.333333, 5);
    });

    it('should use custom decimals', () => {
      const engine = new RedenominationEngine({
        name: 'test',
        factor: 3,
        decimals: 2,
      });
      const result = engine.convertForward(10, { decimals: 4 });
      expect(result.amount).toBe(3.3333);
    });
  });

  describe('convertReverse', () => {
    it('should convert new currency to old (Indonesia 2027)', () => {
      const engine = new RedenominationEngine(PREDEFINED_RULES.indonesia2027);
      const result = engine.convertReverse(1000);
      expect(result.amount).toBe(1000000);
      expect(result.original).toBe(1000);
      expect(result.direction).toBe('reverse');
    });

    it('should convert with custom factor', () => {
      const engine = new RedenominationEngine({
        name: 'test',
        factor: 100,
      });
      const result = engine.convertReverse(100);
      expect(result.amount).toBe(10000);
    });

    it('should apply rounding', () => {
      const engine = new RedenominationEngine({
        name: 'test',
        factor: 3,
        decimals: 2,
      });
      const result = engine.convertReverse(3.33, { rounding: 'round' });
      expect(result.amount).toBe(9.99);
    });
  });

  describe('format', () => {
    it('should format with currency symbol', () => {
      const engine = new RedenominationEngine({
        name: 'test',
        factor: 1000,
        newCurrency: 'IDR',
        decimals: 2,
      });
      const formatted = engine.format(1000);
      expect(formatted).toContain('IDR');
      expect(formatted).toContain('1,000');
    });

    it('should format without currency symbol', () => {
      const engine = new RedenominationEngine({
        name: 'test',
        factor: 1000,
        decimals: 2,
      });
      const formatted = engine.format(1000);
      expect(formatted).toContain('1,000');
    });

    it('should respect decimals', () => {
      const engine = new RedenominationEngine({
        name: 'test',
        factor: 1000,
        decimals: 0,
      });
      const formatted = engine.format(1000.5);
      expect(formatted).toContain('1,001');
    });
  });

  describe('getRule and updateRule', () => {
    it('should get current rule', () => {
      const rule = {
        name: 'test',
        factor: 1000,
        oldCurrency: 'OLD',
        newCurrency: 'NEW',
      };
      const engine = new RedenominationEngine(rule);
      const currentRule = engine.getRule();
      expect(currentRule).toEqual(rule);
      expect(currentRule).not.toBe(rule); // Should be a copy
    });

    it('should update rule', () => {
      const engine = new RedenominationEngine({
        name: 'test',
        factor: 1000,
      });
      engine.updateRule({ factor: 2000 });
      const rule = engine.getRule();
      expect(rule.factor).toBe(2000);
    });

    it('should throw error when updating to invalid factor', () => {
      const engine = new RedenominationEngine({
        name: 'test',
        factor: 1000,
      });
      expect(() => engine.updateRule({ factor: 0 })).toThrow('Conversion factor must be greater than 0');
    });
  });

  describe('Plugin management', () => {
    it('should add and remove plugins', () => {
      const engine = new RedenominationEngine({
        name: 'test',
        factor: 1000,
      });
      const plugin = {
        beforeConvert: (amount: number) => amount * 2,
      };
      engine.addPlugin(plugin);
      engine.removePlugin(plugin);
      // Should work without errors
      expect(engine).toBeInstanceOf(RedenominationEngine);
    });
  });

  describe('Format option in conversion', () => {
    it('should include formatted string when format option is true', () => {
      const engine = new RedenominationEngine({
        name: 'test',
        factor: 1000,
        newCurrency: 'IDR',
        decimals: 2,
      });
      const result = engine.convertForward(1000000, { format: true });
      expect(result.formatted).toBeDefined();
      expect(result.formatted).toContain('IDR');
    });
  });
});


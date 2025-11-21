import {
  createRoundingPlugin,
  createLoggingPlugin,
  createValidationPlugin,
  createTransformerPlugin,
  createFormattingPlugin,
  RedenominationEngine,
} from '../index';

describe('Plugins', () => {
  describe('createRoundingPlugin', () => {
    it('should round to specified decimals', () => {
      const plugin = createRoundingPlugin(2);
      const engine = new RedenominationEngine(
        { name: 'test', factor: 3 },
        [plugin]
      );
      const result = engine.convertForward(10);
      expect(result.amount).toBe(3.33);
    });

    it('should round to 0 decimals', () => {
      const plugin = createRoundingPlugin(0);
      const engine = new RedenominationEngine(
        { name: 'test', factor: 3 },
        [plugin]
      );
      const result = engine.convertForward(10);
      expect(result.amount).toBe(3);
    });

    it('should round to 4 decimals', () => {
      const plugin = createRoundingPlugin(4);
      const engine = new RedenominationEngine(
        { name: 'test', factor: 3, decimals: 10 }, // High decimals to let plugin handle rounding
        [plugin]
      );
      const result = engine.convertForward(10, { rounding: 'none' }); // Disable engine rounding
      expect(result.amount).toBe(3.3333);
    });
  });

  describe('createLoggingPlugin', () => {
    it('should log conversion operations', () => {
      const logs: string[] = [];
      const logger = (msg: string) => logs.push(msg);
      const plugin = createLoggingPlugin(logger);
      const engine = new RedenominationEngine(
        { name: 'test', factor: 1000 },
        [plugin]
      );
      engine.convertForward(1000000);
      expect(logs.length).toBeGreaterThan(0);
      expect(logs.some(log => log.includes('Converting'))).toBe(true);
      expect(logs.some(log => log.includes('Converted'))).toBe(true);
    });

    it('should use default console.log if no logger provided', () => {
      const plugin = createLoggingPlugin();
      const engine = new RedenominationEngine(
        { name: 'test', factor: 1000 },
        [plugin]
      );
      // Should not throw
      expect(() => engine.convertForward(1000000)).not.toThrow();
    });
  });

  describe('createValidationPlugin', () => {
    it('should validate minimum amount', () => {
      const plugin = createValidationPlugin(0);
      const engine = new RedenominationEngine(
        { name: 'test', factor: 1000 },
        [plugin]
      );
      expect(() => engine.convertForward(-1)).toThrow('Amount -1 is below minimum 0');
    });

    it('should validate maximum amount', () => {
      const plugin = createValidationPlugin(undefined, 1000000);
      const engine = new RedenominationEngine(
        { name: 'test', factor: 1000 },
        [plugin]
      );
      expect(() => engine.convertForward(2000000)).toThrow('Amount 2000000 is above maximum 1000000');
    });

    it('should validate both min and max', () => {
      const plugin = createValidationPlugin(0, 1000000);
      const engine = new RedenominationEngine(
        { name: 'test', factor: 1000 },
        [plugin]
      );
      expect(() => engine.convertForward(500000)).not.toThrow();
      expect(() => engine.convertForward(-1)).toThrow();
      expect(() => engine.convertForward(2000000)).toThrow();
    });

    it('should allow amounts within range', () => {
      const plugin = createValidationPlugin(0, 1000000);
      const engine = new RedenominationEngine(
        { name: 'test', factor: 1000 },
        [plugin]
      );
      const result = engine.convertForward(500000);
      expect(result.amount).toBe(500);
    });
  });

  describe('createTransformerPlugin', () => {
    it('should apply custom transformation', () => {
      const plugin = createTransformerPlugin((amount) => amount * 1.1);
      const engine = new RedenominationEngine(
        { name: 'test', factor: 1000 },
        [plugin]
      );
      const result = engine.convertForward(1000000);
      expect(result.amount).toBe(1100); // 1000 * 1.1
    });

    it('should have access to direction and rule', () => {
      const plugin = createTransformerPlugin((amount, direction, rule) => {
        if (direction === 'forward') {
          return amount * 1.05;
        }
        return amount * 0.95;
      });
      const engine = new RedenominationEngine(
        { name: 'test', factor: 1000 },
        [plugin]
      );
      const forward = engine.convertForward(1000000);
      expect(forward.amount).toBe(1050);
      
      const reverse = engine.convertReverse(1000);
      expect(reverse.amount).toBe(950000);
    });
  });

  describe('createFormattingPlugin', () => {
    it('should use custom formatter', () => {
      const plugin = createFormattingPlugin((amount) => `$${amount.toFixed(2)}`);
      const engine = new RedenominationEngine(
        { name: 'test', factor: 1000, newCurrency: 'IDR' },
        [plugin]
      );
      const formatted = engine.format(1000);
      expect(formatted).toBe('$1000.00');
    });

    it('should use default formatter if plugin formatter returns empty', () => {
      const plugin = createFormattingPlugin(() => '');
      const engine = new RedenominationEngine(
        { name: 'test', factor: 1000, newCurrency: 'IDR', decimals: 2 },
        [plugin]
      );
      const formatted = engine.format(1000);
      // Should fall back to default
      expect(formatted).toContain('IDR');
    });
  });

  describe('Multiple plugins', () => {
    it('should apply multiple plugins in order', () => {
      const roundingPlugin = createRoundingPlugin(2);
      const transformerPlugin = createTransformerPlugin((amount) => amount * 1.1);
      const engine = new RedenominationEngine(
        { name: 'test', factor: 3, decimals: 10 }, // High decimals to let plugin handle rounding
        [transformerPlugin, roundingPlugin] // Transformer first, then rounding
      );
      const result = engine.convertForward(10, { rounding: 'none' }); // Disable engine rounding
      // 10 / 3 = 3.333..., * 1.1 = 3.666..., rounded to 2 decimals = 3.67
      expect(result.amount).toBe(3.67);
    });
  });
});


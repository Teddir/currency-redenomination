import {
  RedenominationEngine,
  batchConvertArray,
  batchConvertObject,
  batchConvertObjects,
  PREDEFINED_RULES,
} from '../index';

describe('Batch Processing', () => {
  const engine = new RedenominationEngine(PREDEFINED_RULES.indonesia2027);

  describe('batchConvertArray', () => {
    it('should convert array of numbers forward', () => {
      const amounts = [1000000, 2000000, 500000];
      const converted = batchConvertArray(engine, amounts, 'forward');
      expect(converted).toEqual([1000, 2000, 500]);
    });

    it('should convert array of numbers reverse', () => {
      const amounts = [1000, 2000, 500];
      const converted = batchConvertArray(engine, amounts, 'reverse');
      expect(converted).toEqual([1000000, 2000000, 500000]);
    });

    it('should use default forward direction', () => {
      const amounts = [1000000, 2000000];
      const converted = batchConvertArray(engine, amounts);
      expect(converted).toEqual([1000, 2000]);
    });

    it('should apply rounding options', () => {
      const customEngine = new RedenominationEngine({
        name: 'test',
        factor: 3,
        decimals: 2,
      });
      const amounts = [10, 20, 30];
      const converted = batchConvertArray(customEngine, amounts, 'forward', {
        rounding: 'round',
        decimals: 2,
      });
      expect(converted[0]).toBeCloseTo(3.33, 2);
    });

    it('should handle empty array', () => {
      const converted = batchConvertArray(engine, [], 'forward');
      expect(converted).toEqual([]);
    });
  });

  describe('batchConvertObject', () => {
    it('should convert specific paths', () => {
      const invoice = {
        subtotal: 1000000,
        tax: 100000,
        total: 1100000,
        description: 'Test',
      };
      const converted = batchConvertObject(engine, invoice, 'forward', {
        paths: ['subtotal', 'tax', 'total'],
      });
      expect(converted.subtotal).toBe(1000);
      expect(converted.tax).toBe(100);
      expect(converted.total).toBe(1100);
      expect(converted.description).toBe('Test');
    });

    it('should convert nested paths', () => {
      const data = {
        item: {
          price: 1000000,
          quantity: 2,
        },
        total: 2000000,
      };
      const converted = batchConvertObject(engine, data, 'forward', {
        paths: ['item.price', 'total'],
      });
      expect(converted.item.price).toBe(1000);
      expect(converted.total).toBe(2000);
      expect(converted.item.quantity).toBe(2);
    });

    it('should deep convert all numeric values', () => {
      const data = {
        items: [
          { price: 1000000, quantity: 2000 }, // Use larger quantity to avoid rounding to 0
          { price: 2000000, quantity: 1000 },
        ],
        total: 4000000,
        metadata: {
          count: 2000,
          processed: true,
        },
      };
      const converted = batchConvertObject(engine, data, 'forward', {
        deep: true,
      });
      expect(converted.items[0].price).toBe(1000);
      expect(converted.items[1].price).toBe(2000);
      expect(converted.total).toBe(4000);
      // Deep conversion converts ALL numbers, so quantities are also converted
      expect(converted.items[0].quantity).toBe(2);
      expect(converted.items[1].quantity).toBe(1);
      expect(converted.metadata.count).toBe(2);
      expect(converted.metadata.processed).toBe(true);
    });

    it('should handle reverse conversion', () => {
      const invoice = {
        subtotal: 1000,
        tax: 100,
        total: 1100,
      };
      const converted = batchConvertObject(engine, invoice, 'reverse', {
        paths: ['subtotal', 'tax', 'total'],
      });
      expect(converted.subtotal).toBe(1000000);
      expect(converted.tax).toBe(100000);
      expect(converted.total).toBe(1100000);
    });

    it('should not convert if paths not specified and deep is false', () => {
      const invoice = {
        subtotal: 1000000,
        tax: 100000,
      };
      const converted = batchConvertObject(engine, invoice, 'forward');
      expect(converted.subtotal).toBe(1000000);
      expect(converted.tax).toBe(100000);
    });

    it('should handle non-numeric values at paths', () => {
      const data = {
        price: 1000000,
        name: 'Product',
      };
      const converted = batchConvertObject(engine, data, 'forward', {
        paths: ['price', 'name'],
      });
      expect(converted.price).toBe(1000);
      expect(converted.name).toBe('Product');
    });

    it('should handle null and undefined values', () => {
      const data = {
        price: 1000000,
        discount: null,
        tax: undefined,
      };
      const converted = batchConvertObject(engine, data, 'forward', {
        deep: true,
      });
      expect(converted.price).toBe(1000);
      expect(converted.discount).toBeNull();
      expect(converted.tax).toBeUndefined();
    });
  });

  describe('batchConvertObjects', () => {
    it('should convert array of objects', () => {
      const invoices = [
        { subtotal: 1000000, tax: 100000, total: 1100000 },
        { subtotal: 2000000, tax: 200000, total: 2200000 },
      ];
      const converted = batchConvertObjects(engine, invoices, 'forward', {
        paths: ['subtotal', 'tax', 'total'],
      });
      expect(converted).toHaveLength(2);
      expect(converted[0].subtotal).toBe(1000);
      expect(converted[0].tax).toBe(100);
      expect(converted[0].total).toBe(1100);
      expect(converted[1].subtotal).toBe(2000);
      expect(converted[1].tax).toBe(200);
      expect(converted[1].total).toBe(2200);
    });

    it('should handle empty array', () => {
      const converted = batchConvertObjects(engine, [], 'forward');
      expect(converted).toEqual([]);
    });

    it('should use deep conversion for objects', () => {
      const products = [
        { name: 'A', price: 1000000 },
        { name: 'B', price: 2000000 },
      ];
      const converted = batchConvertObjects(engine, products, 'forward', {
        deep: true,
      });
      expect(converted[0].price).toBe(1000);
      expect(converted[1].price).toBe(2000);
      expect(converted[0].name).toBe('A');
    });
  });
});


import {
  RedenominationEngine,
  PREDEFINED_RULES,
  createRoundingPlugin,
  formatCurrency,
  batchConvertArray,
} from '../index';

describe('Main exports', () => {
  it('should export RedenominationEngine', () => {
    expect(RedenominationEngine).toBeDefined();
    expect(typeof RedenominationEngine).toBe('function');
  });

  it('should export PREDEFINED_RULES', () => {
    expect(PREDEFINED_RULES).toBeDefined();
    expect(PREDEFINED_RULES.indonesia2027).toBeDefined();
    expect(PREDEFINED_RULES.turkey2005).toBeDefined();
    expect(PREDEFINED_RULES.zimbabwe2008).toBeDefined();
  });

  it('should export plugin creators', () => {
    expect(createRoundingPlugin).toBeDefined();
    expect(typeof createRoundingPlugin).toBe('function');
  });

  it('should export formatters', () => {
    expect(formatCurrency).toBeDefined();
    expect(typeof formatCurrency).toBe('function');
  });

  it('should export batch functions', () => {
    expect(batchConvertArray).toBeDefined();
    expect(typeof batchConvertArray).toBe('function');
  });

  describe('PREDEFINED_RULES', () => {
    it('should have correct Indonesia 2027 rule', () => {
      const rule = PREDEFINED_RULES.indonesia2027;
      expect(rule.name).toBe('id-2027'); // Generated from country code
      expect(rule.factor).toBe(1000);
      expect(rule.oldCurrency).toBe('IDR');
      expect(rule.newCurrency).toBe('IDR');
      expect(rule.newLocalSymbol).toBe('Rp');
      expect(rule.formatting?.hideDecimals).toBe(true);
    });

    it('should have correct Turkey 2005 rule', () => {
      const rule = PREDEFINED_RULES.turkey2005;
      expect(rule.name).toBe('tr-2005'); // Generated from country code
      expect(rule.factor).toBe(1000000);
      expect(rule.oldCurrency).toBe('TRL');
      expect(rule.newCurrency).toBe('TRY');
    });

    it('should have correct Zimbabwe 2008 rule', () => {
      const rule = PREDEFINED_RULES.zimbabwe2008;
      expect(rule.name).toBe('zw-2008'); // Generated from country code
      expect(rule.factor).toBe(10000000000);
      expect(rule.oldCurrency).toBe('ZWD');
      expect(rule.newCurrency).toBe('ZWL');
    });

    it('should work with predefined rules', () => {
      const engine = new RedenominationEngine(PREDEFINED_RULES.indonesia2027);
      const result = engine.convertForward(1000000);
      expect(result.amount).toBe(1000);
    });
  });
});


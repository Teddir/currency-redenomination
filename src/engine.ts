/**
 * Core Redenomination Engine
 */

import type {
  RedenominationRule,
  RedenominationPlugin,
  ConvertOptions,
  ConversionResult,
} from './types';

/**
 * Default rounding function
 */
function roundAmount(amount: number, mode: 'round' | 'floor' | 'ceil' | 'none', decimals: number): number {
  const multiplier = Math.pow(10, decimals);
  
  switch (mode) {
    case 'round':
      return Math.round(amount * multiplier) / multiplier;
    case 'floor':
      return Math.floor(amount * multiplier) / multiplier;
    case 'ceil':
      return Math.ceil(amount * multiplier) / multiplier;
    case 'none':
    default:
      return amount;
  }
}

/**
 * Apply plugins to amount
 */
function applyPlugins(
  amount: number,
  originalAmount: number,
  direction: 'forward' | 'reverse',
  rule: RedenominationRule,
  plugins: RedenominationPlugin[],
  hook: 'beforeConvert' | 'afterConvert'
): number {
  let result = amount;
  
  for (const plugin of plugins) {
    if (hook === 'beforeConvert' && plugin.beforeConvert) {
      const hookResult = plugin.beforeConvert(result, direction, rule);
      if (typeof hookResult === 'number') {
        result = hookResult;
      }
    } else if (hook === 'afterConvert' && plugin.afterConvert) {
      const hookResult = plugin.afterConvert(result, originalAmount, direction, rule);
      if (typeof hookResult === 'number') {
        result = hookResult;
      }
    }
  }
  
  return result;
}

/**
 * Redenomination Engine Class
 */
export class RedenominationEngine {
  private rule: RedenominationRule;
  private defaultPlugins: RedenominationPlugin[];

  constructor(rule: RedenominationRule, defaultPlugins: RedenominationPlugin[] = []) {
    if (rule.factor <= 0) {
      throw new Error('Conversion factor must be greater than 0');
    }
    this.rule = rule;
    this.defaultPlugins = defaultPlugins;
  }

  /**
   * Convert old currency to new currency (forward)
   */
  convertForward(amount: number, options: ConvertOptions = {}): ConversionResult {
    return this.convert(amount, 'forward', options);
  }

  /**
   * Convert new currency to old currency (reverse)
   */
  convertReverse(amount: number, options: ConvertOptions = {}): ConversionResult {
    return this.convert(amount, 'reverse', options);
  }

  /**
   * Core conversion method
   */
  private convert(amount: number, direction: 'forward' | 'reverse', options: ConvertOptions = {}): ConversionResult {
    const {
      rounding = 'round',
      decimals = this.rule.decimals ?? 2,
      plugins = [],
      format = false,
    } = options;

    // Combine default and custom plugins
    const allPlugins = [...this.defaultPlugins, ...plugins];

    // Apply beforeConvert hooks
    let result = applyPlugins(amount, amount, direction, this.rule, allPlugins, 'beforeConvert');

    // Perform conversion
    if (direction === 'forward') {
      result = result / this.rule.factor;
    } else {
      result = result * this.rule.factor;
    }

    // Apply rounding
    result = roundAmount(result, rounding, decimals);

    // Apply afterConvert hooks
    result = applyPlugins(result, amount, direction, this.rule, allPlugins, 'afterConvert');

    const conversionResult: ConversionResult = {
      amount: result,
      original: amount,
      direction,
    };

    // Format if requested
    if (format) {
      conversionResult.formatted = this.format(result, allPlugins);
    }

    return conversionResult;
  }

  /**
   * Format amount using plugins or default formatter
   */
  format(amount: number, plugins: RedenominationPlugin[] = []): string {
    // Try plugin formatters first
    for (const plugin of [...this.defaultPlugins, ...plugins]) {
      if (plugin.format) {
        const formatted = plugin.format(amount, this.rule);
        if (formatted) {
          return formatted;
        }
      }
    }

    // Default formatting
    const decimals = this.rule.decimals ?? 2;
    const currency = this.rule.newCurrency || '';
    const formatted = amount.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    
    return currency ? `${currency} ${formatted}` : formatted;
  }

  /**
   * Get the current rule
   */
  getRule(): RedenominationRule {
    return { ...this.rule };
  }

  /**
   * Update the rule
   */
  updateRule(rule: Partial<RedenominationRule>): void {
    this.rule = { ...this.rule, ...rule };
    if (this.rule.factor <= 0) {
      throw new Error('Conversion factor must be greater than 0');
    }
  }

  /**
   * Add a default plugin
   */
  addPlugin(plugin: RedenominationPlugin): void {
    this.defaultPlugins.push(plugin);
  }

  /**
   * Remove a default plugin
   */
  removePlugin(plugin: RedenominationPlugin): void {
    const index = this.defaultPlugins.indexOf(plugin);
    if (index > -1) {
      this.defaultPlugins.splice(index, 1);
    }
  }
}


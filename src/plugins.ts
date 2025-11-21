/**
 * Built-in Plugins
 */

import type { RedenominationPlugin, RedenominationRule } from './types';

/**
 * Rounding plugin - rounds the result to specified decimal places
 */
export function createRoundingPlugin(decimals: number = 2): RedenominationPlugin {
  return {
    afterConvert: (amount) => {
      return Math.round(amount * Math.pow(10, decimals)) / Math.pow(10, decimals);
    },
  };
}

/**
 * Logging plugin - logs conversion operations
 */
export function createLoggingPlugin(
  logger: (message: string, data?: any) => void = (msg: string, data?: any) => {
    // eslint-disable-next-line no-console
    console.log(msg, data);
  }
): RedenominationPlugin {
  return {
    beforeConvert: (amount, direction, rule) => {
      logger(`[Currency Redenomination] Converting ${direction}: ${amount} (${rule.name})`);
    },
    afterConvert: (amount, originalAmount, direction, rule) => {
      logger(`[Currency Redenomination] Converted ${direction}: ${originalAmount} → ${amount} (${rule.name})`);
    },
  };
}

/**
 * Validation plugin - validates amounts are within acceptable range
 */
export function createValidationPlugin(min?: number, max?: number): RedenominationPlugin {
  return {
    beforeConvert: (amount) => {
      if (min !== undefined && amount < min) {
        throw new Error(`Amount ${amount} is below minimum ${min}`);
      }
      if (max !== undefined && amount > max) {
        throw new Error(`Amount ${amount} is above maximum ${max}`);
      }
    },
  };
}

/**
 * Transformer plugin - applies custom transformation
 */
export function createTransformerPlugin(
  transform: (amount: number, direction: 'forward' | 'reverse', rule: RedenominationRule) => number
): RedenominationPlugin {
  return {
    afterConvert: (amount, originalAmount, direction, rule) => {
      return transform(amount, direction, rule);
    },
  };
}

/**
 * Formatting plugin - custom currency formatting
 */
export function createFormattingPlugin(
  formatter: (amount: number, rule: RedenominationRule) => string
): RedenominationPlugin {
  return {
    format: formatter,
  };
}


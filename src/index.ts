/**
 * Currency Redenomination Package
 * 
 * Clean, flexible engine for currency redenomination, formatting, and batch processing.
 */

// Core engine
export { RedenominationEngine } from './engine';

// Types
export type {
  RedenominationRule,
  RedenominationPlugin,
  ConvertOptions,
  BatchConvertOptions,
  ConversionResult,
} from './types';

// Plugins
export {
  createRoundingPlugin,
  createLoggingPlugin,
  createValidationPlugin,
  createTransformerPlugin,
  createFormattingPlugin,
} from './plugins';

// Formatters
export {
  formatCurrency,
  parseCurrency,
  formatWithSeparator,
  createFormatter,
} from './formatters';

// Batch processing
export {
  batchConvertArray,
  batchConvertObject,
  batchConvertObjects,
} from './batch';

// Predefined rules for common redenominations
export const PREDEFINED_RULES = {
  indonesia2016: {
    name: 'indonesia-2016',
    factor: 1000,
    oldCurrency: 'IDR',
    newCurrency: 'IDR',
    decimals: 2,
  },
  turkey2005: {
    name: 'turkey-2005',
    factor: 1000000,
    oldCurrency: 'TRL',
    newCurrency: 'TRY',
    decimals: 2,
  },
  zimbabwe2008: {
    name: 'zimbabwe-2008',
    factor: 10000000000,
    oldCurrency: 'ZWD',
    newCurrency: 'ZWL',
    decimals: 2,
  },
} as const;


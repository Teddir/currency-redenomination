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
  formatCurrencyGeneral,
  parseCurrency,
  formatWithSeparator,
  createFormatter,
  createGeneralFormatter,
  getCurrencySymbol,
} from './formatters';

// Batch processing
export {
  batchConvertArray,
  batchConvertObject,
  batchConvertObjects,
} from './batch';

// Predefined rules and country-based rules
export {
  PREDEFINED_RULES,
  getRuleByCountry,
  getRulesByCountry,
  getAvailableCountries,
  addCountryRedenomination,
  createCountryRule,
  removeCountryRedenomination,
  getAllRules,
  getRulesByCurrency,
  getRulesByFactor,
} from './rules';

export type { FormattingOptions } from './types';
export type { CountryRedenomination } from './rules';


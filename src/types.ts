/**
 * Currency Redenomination Types
 */

/**
 * Formatting configuration
 */
export interface FormattingOptions {
  /** Locale for international formatting (e.g., 'en-US', 'id-ID', 'tr-TR') */
  locale?: string;
  /** Thousands separator (default: locale-based) */
  thousandsSeparator?: string;
  /** Decimal separator (default: locale-based) */
  decimalSeparator?: string;
  /** Currency symbol position: 'before' | 'after' */
  symbolPosition?: 'before' | 'after';
  /** Space between symbol and amount */
  symbolSpacing?: boolean;
  /** Custom format pattern (e.g., '{symbol}{amount}' or '{amount} {symbol}') */
  formatPattern?: string;
  /** Hide decimal places when zero or when amount is whole number (e.g., Indonesia: 10.000 instead of 10.000,00) */
  hideDecimals?: boolean;
  /** Hide decimal places completely (always show as integer) */
  omitDecimals?: boolean;
}

/**
 * Redenomination rule configuration
 */
export interface RedenominationRule {
  /** Name/identifier for this rule (e.g., 'indonesia-2027') */
  name: string;
  /** Conversion factor: oldAmount * factor = newAmount */
  factor: number;
  /** Old currency symbol/name (ISO code) */
  oldCurrency?: string;
  /** New currency symbol/name (ISO code) */
  newCurrency?: string;
  /** Old local currency symbol (e.g., 'Rp' for Indonesia) */
  oldLocalSymbol?: string;
  /** New local currency symbol (e.g., 'Rp' for Indonesia) */
  newLocalSymbol?: string;
  /** Decimal places for the new currency */
  decimals?: number;
  /** Country code (ISO 3166-1 alpha-2, e.g., 'ID', 'TR', 'ZW') */
  countryCode?: string;
  /** Year of redenomination */
  year?: number;
  /** Formatting options */
  formatting?: FormattingOptions;
  /** Use local symbol instead of ISO code for formatting */
  useLocalSymbol?: boolean;
}

/**
 * Plugin lifecycle hooks
 */
export interface RedenominationPlugin {
  /** Called before conversion */
  beforeConvert?: (amount: number, direction: 'forward' | 'reverse', rule: RedenominationRule) => number | void;
  /** Called after conversion */
  afterConvert?: (amount: number, originalAmount: number, direction: 'forward' | 'reverse', rule: RedenominationRule) => number | void;
  /** Called during formatting */
  format?: (amount: number, rule: RedenominationRule) => string;
}

/**
 * Conversion options
 */
export interface ConvertOptions {
  /** Rounding mode: 'round', 'floor', 'ceil', 'none' */
  rounding?: 'round' | 'floor' | 'ceil' | 'none';
  /** Decimal places for result */
  decimals?: number;
  /** Custom plugins to apply */
  plugins?: RedenominationPlugin[];
  /** Whether to format the result */
  format?: boolean;
}

/**
 * Batch conversion options
 */
export interface BatchConvertOptions extends ConvertOptions {
  /** Key paths to convert in objects (e.g., ['price', 'total']) */
  paths?: string[];
  /** Whether to convert nested objects */
  deep?: boolean;
}

/**
 * Conversion result
 */
export interface ConversionResult {
  /** Converted amount */
  amount: number;
  /** Original amount */
  original: number;
  /** Direction of conversion */
  direction: 'forward' | 'reverse';
  /** Formatted string (if formatting was requested) */
  formatted?: string;
}


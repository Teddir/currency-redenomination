/**
 * Currency Redenomination Types
 */

/**
 * Redenomination rule configuration
 */
export interface RedenominationRule {
  /** Name/identifier for this rule (e.g., 'indonesia-2016') */
  name: string;
  /** Conversion factor: oldAmount * factor = newAmount */
  factor: number;
  /** Old currency symbol/name */
  oldCurrency?: string;
  /** New currency symbol/name */
  newCurrency?: string;
  /** Decimal places for the new currency */
  decimals?: number;
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


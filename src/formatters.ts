/**
 * Currency Formatting Utilities
 */

import type { RedenominationRule, FormattingOptions } from './types';

/**
 * Format currency with symbol (international)
 */
export function formatCurrency(
  amount: number,
  symbol: string = '',
  decimals: number = 2,
  locale: string = 'en-US',
  hideDecimals: boolean = false
): string {
  const isWholeNumber = amount % 1 === 0;
  const actualDecimals = hideDecimals && isWholeNumber ? 0 : decimals;
  
  const formatted = amount.toLocaleString(locale, {
    minimumFractionDigits: actualDecimals,
    maximumFractionDigits: actualDecimals,
  });
  
  return symbol ? `${symbol} ${formatted}` : formatted;
}

/**
 * Format currency with general options (flexible)
 */
export function formatCurrencyGeneral(
  amount: number,
  options: FormattingOptions & {
    symbol?: string;
    decimals?: number;
  } = {}
): string {
  const {
    symbol = '',
    decimals = 2,
    locale,
    thousandsSeparator,
    decimalSeparator,
    symbolPosition = 'before',
    symbolSpacing = true,
    formatPattern,
    hideDecimals = false,
    omitDecimals = false,
  } = options;

  // Determine actual decimals to use
  const isWholeNumber = amount % 1 === 0;
  let actualDecimals = decimals;
  
  if (omitDecimals) {
    actualDecimals = 0;
  } else if (hideDecimals && isWholeNumber) {
    actualDecimals = 0;
  }

  let formatted: string;

  if (locale && !thousandsSeparator && !decimalSeparator) {
    // Use locale-based formatting
    formatted = amount.toLocaleString(locale, {
      minimumFractionDigits: actualDecimals,
      maximumFractionDigits: actualDecimals,
    });
  } else {
    // Use custom separators
    const parts = amount.toFixed(actualDecimals).split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1] || '';

    // Apply thousands separator
    const thousandsSep = thousandsSeparator ?? ',';
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSep);

    // Apply decimal separator only if there are decimals
    if (actualDecimals > 0 && decimalPart) {
      const decimalSep = decimalSeparator ?? '.';
      formatted = `${formattedInteger}${decimalSep}${decimalPart}`;
    } else {
      formatted = formattedInteger;
    }
  }

  // Apply symbol
  if (symbol) {
    if (formatPattern) {
      // Use custom pattern
      formatted = formatPattern
        .replace('{symbol}', symbol)
        .replace('{amount}', formatted);
    } else {
      // Use position-based formatting
      const spacing = symbolSpacing ? ' ' : '';
      if (symbolPosition === 'before') {
        formatted = `${symbol}${spacing}${formatted}`;
      } else {
        formatted = `${formatted}${spacing}${symbol}`;
      }
    }
  }

  return formatted;
}

/**
 * Parse currency string to number
 */
export function parseCurrency(value: string): number {
  // Remove currency symbols and spaces, keep numbers, dots, and commas
  const cleaned = value.replace(/[^\d.,-]/g, '').replace(/,/g, '');
  const parsed = parseFloat(cleaned);
  
  if (isNaN(parsed)) {
    throw new Error(`Invalid currency value: ${value}`);
  }
  
  return parsed;
}

/**
 * Format with thousands separator
 */
export function formatWithSeparator(
  amount: number,
  separator: string = ',',
  decimals: number = 2,
  decimalSeparator: string = '.'
): string {
  const parts = amount.toFixed(decimals).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return parts.join(decimalSeparator);
}

/**
 * Get the appropriate currency symbol for a rule
 */
export function getCurrencySymbol(rule: RedenominationRule, useNew: boolean = true): string {
  const useLocal = rule.useLocalSymbol ?? false;
  
  if (useLocal) {
    return useNew 
      ? (rule.newLocalSymbol || rule.newCurrency || '')
      : (rule.oldLocalSymbol || rule.oldCurrency || '');
  }
  
  return useNew 
    ? (rule.newCurrency || '')
    : (rule.oldCurrency || '');
}

/**
 * Create a formatter function for a specific rule (international)
 */
export function createFormatter(rule: RedenominationRule, locale?: string) {
  return (amount: number): string => {
    // If rule has formatting options, use general formatter
    if (rule.formatting) {
      return createGeneralFormatter(rule)(amount);
    }
    
    // Otherwise use simple international formatter
    const decimals = rule.decimals ?? 2;
    const currency = getCurrencySymbol(rule, true);
    const actualLocale = locale || 'en-US';
    return formatCurrency(amount, currency, decimals, actualLocale, false);
  };
}

/**
 * Create a general formatter function for a specific rule (flexible)
 */
export function createGeneralFormatter(rule: RedenominationRule) {
  return (amount: number): string => {
    const decimals = rule.decimals ?? 2;
    const currency = getCurrencySymbol(rule, true);
    const formatting = rule.formatting || {};

    return formatCurrencyGeneral(amount, {
      symbol: currency,
      decimals,
      ...formatting,
    });
  };
}

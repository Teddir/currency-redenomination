/**
 * Currency Formatting Utilities
 */

import type { RedenominationRule } from './types';

/**
 * Format currency with symbol
 */
export function formatCurrency(
  amount: number,
  symbol: string = '',
  decimals: number = 2,
  locale: string = 'en-US'
): string {
  const formatted = amount.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  
  return symbol ? `${symbol} ${formatted}` : formatted;
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
  decimals: number = 2
): string {
  const parts = amount.toFixed(decimals).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return parts.join('.');
}

/**
 * Create a formatter function for a specific rule
 */
export function createFormatter(rule: RedenominationRule, locale: string = 'en-US') {
  return (amount: number): string => {
    const decimals = rule.decimals ?? 2;
    const currency = rule.newCurrency || '';
    return formatCurrency(amount, currency, decimals, locale);
  };
}


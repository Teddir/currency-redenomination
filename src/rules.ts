/**
 * Predefined Redenomination Rules by Country
 * 
 * Scalable and flexible structure for country-based redenomination rules
 */

import type { RedenominationRule, FormattingOptions } from './types';

/**
 * Country redenomination data structure
 */
export interface CountryRedenomination {
  /** ISO 3166-1 alpha-2 country code */
  countryCode: string;
  /** Country name */
  countryName: string;
  /** Year of redenomination */
  year: number;
  /** Conversion factor */
  factor: number;
  /** Old currency code (ISO) */
  oldCurrency: string;
  /** New currency code (ISO) */
  newCurrency: string;
  /** Old local currency symbol (e.g., 'Rp' for Indonesia) */
  oldLocalSymbol?: string;
  /** New local currency symbol (e.g., 'Rp' for Indonesia) */
  newLocalSymbol?: string;
  /** Decimal places */
  decimals?: number;
  /** Formatting options */
  formatting?: FormattingOptions;
  /** Use local symbol instead of ISO code for formatting (default: true if local symbol is provided) */
  useLocalSymbol?: boolean;
}

/**
 * Database of country redenominations
 */
const COUNTRY_REDENOMINATIONS: CountryRedenomination[] = [
  {
    countryCode: 'ID',
    countryName: 'Indonesia',
    year: 2027,
    factor: 1000,
    oldCurrency: 'IDR',
    newCurrency: 'IDR',
    oldLocalSymbol: 'Rp',
    newLocalSymbol: 'Rp',
    decimals: 2,
    useLocalSymbol: true,
    formatting: {
      locale: 'id-ID',
      thousandsSeparator: '.',
      decimalSeparator: ',',
      symbolPosition: 'before',
      symbolSpacing: true,
      hideDecimals: true, // Indonesia typically doesn't show .00
    },
  },
  {
    countryCode: 'TR',
    countryName: 'Turkey',
    year: 2005,
    factor: 1000000,
    oldCurrency: 'TRL',
    newCurrency: 'TRY',
    oldLocalSymbol: '₺',
    newLocalSymbol: '₺',
    decimals: 2,
    useLocalSymbol: true,
    formatting: {
      locale: 'tr-TR',
      thousandsSeparator: '.',
      decimalSeparator: ',',
      symbolPosition: 'after',
      symbolSpacing: true,
    },
  },
  {
    countryCode: 'ZW',
    countryName: 'Zimbabwe',
    year: 2008,
    factor: 10000000000,
    oldCurrency: 'ZWD',
    newCurrency: 'ZWL',
    oldLocalSymbol: 'Z$',
    newLocalSymbol: 'Z$',
    decimals: 2,
    useLocalSymbol: true,
    formatting: {
      locale: 'en-ZW',
      thousandsSeparator: ',',
      decimalSeparator: '.',
      symbolPosition: 'before',
      symbolSpacing: true,
    },
  },
  {
    countryCode: 'BR',
    countryName: 'Brazil',
    year: 1994,
    factor: 2750,
    oldCurrency: 'BRC',
    newCurrency: 'BRL',
    oldLocalSymbol: 'R$',
    newLocalSymbol: 'R$',
    decimals: 2,
    useLocalSymbol: true,
    formatting: {
      locale: 'pt-BR',
      thousandsSeparator: '.',
      decimalSeparator: ',',
      symbolPosition: 'before',
      symbolSpacing: true,
    },
  },
  {
    countryCode: 'RU',
    countryName: 'Russia',
    year: 1998,
    factor: 1000,
    oldCurrency: 'RUR',
    newCurrency: 'RUB',
    oldLocalSymbol: '₽',
    newLocalSymbol: '₽',
    decimals: 2,
    useLocalSymbol: true,
    formatting: {
      locale: 'ru-RU',
      thousandsSeparator: ' ',
      decimalSeparator: ',',
      symbolPosition: 'after',
      symbolSpacing: true,
    },
  },
  {
    countryCode: 'VN',
    countryName: 'Vietnam',
    year: 1985,
    factor: 10,
    oldCurrency: 'VND',
    newCurrency: 'VND',
    oldLocalSymbol: '₫',
    newLocalSymbol: '₫',
    decimals: 0,
    useLocalSymbol: true,
    formatting: {
      locale: 'vi-VN',
      thousandsSeparator: '.',
      decimalSeparator: ',',
      symbolPosition: 'after',
      symbolSpacing: true,
    },
  },
];

/**
 * Convert country redenomination data to rule
 */
function countryToRule(country: CountryRedenomination): RedenominationRule {
  return {
    name: `${country.countryCode.toLowerCase()}-${country.year}`,
    factor: country.factor,
    oldCurrency: country.oldCurrency,
    newCurrency: country.newCurrency,
    oldLocalSymbol: country.oldLocalSymbol,
    newLocalSymbol: country.newLocalSymbol,
    decimals: country.decimals ?? 2,
    countryCode: country.countryCode,
    year: country.year,
    formatting: country.formatting,
    useLocalSymbol: country.useLocalSymbol ?? (country.newLocalSymbol !== undefined),
  };
}

/**
 * Get rule by country code and year
 */
export function getRuleByCountry(
  countryCode: string,
  year?: number
): RedenominationRule | undefined {
  const country = year
    ? COUNTRY_REDENOMINATIONS.find(
        (c) => c.countryCode === countryCode.toUpperCase() && c.year === year
      )
    : COUNTRY_REDENOMINATIONS.find(
        (c) => c.countryCode === countryCode.toUpperCase()
      );

  return country ? countryToRule(country) : undefined;
}

/**
 * Get all rules for a country
 */
export function getRulesByCountry(countryCode: string): RedenominationRule[] {
  return COUNTRY_REDENOMINATIONS
    .filter((c) => c.countryCode === countryCode.toUpperCase())
    .map(countryToRule);
}

/**
 * Get all available countries
 */
export function getAvailableCountries(): Array<{
  code: string;
  name: string;
  years: number[];
}> {
  const countries = new Map<string, { name: string; years: number[] }>();

  COUNTRY_REDENOMINATIONS.forEach((country) => {
    const existing = countries.get(country.countryCode);
    if (existing) {
      existing.years.push(country.year);
    } else {
      countries.set(country.countryCode, {
        name: country.countryName,
        years: [country.year],
      });
    }
  });

  return Array.from(countries.entries()).map(([code, data]) => ({
    code,
    ...data,
  }));
}

/**
 * Create a new country redenomination rule (helper function)
 */
export function createCountryRule(
  countryCode: string,
  countryName: string,
  year: number,
  factor: number,
  oldCurrency: string,
  newCurrency: string,
  options: {
    oldLocalSymbol?: string;
    newLocalSymbol?: string;
    decimals?: number;
    formatting?: FormattingOptions;
    useLocalSymbol?: boolean;
  } = {}
): CountryRedenomination {
  return {
    countryCode: countryCode.toUpperCase(),
    countryName,
    year,
    factor,
    oldCurrency,
    newCurrency,
    oldLocalSymbol: options.oldLocalSymbol,
    newLocalSymbol: options.newLocalSymbol,
    decimals: options.decimals ?? 2,
    formatting: options.formatting,
    useLocalSymbol: options.useLocalSymbol ?? (options.newLocalSymbol !== undefined),
  };
}

/**
 * Add a custom country redenomination
 */
export function addCountryRedenomination(country: CountryRedenomination): void {
  // Check if already exists
  const exists = COUNTRY_REDENOMINATIONS.some(
    (c) => c.countryCode === country.countryCode && c.year === country.year
  );

  if (!exists) {
    COUNTRY_REDENOMINATIONS.push(country);
  } else {
    // Update existing rule
    const index = COUNTRY_REDENOMINATIONS.findIndex(
      (c) => c.countryCode === country.countryCode && c.year === country.year
    );
    if (index !== -1) {
      COUNTRY_REDENOMINATIONS[index] = country;
    }
  }
}

/**
 * Remove a country redenomination rule
 */
export function removeCountryRedenomination(countryCode: string, year: number): boolean {
  const index = COUNTRY_REDENOMINATIONS.findIndex(
    (c) => c.countryCode === countryCode.toUpperCase() && c.year === year
  );
  
  if (index !== -1) {
    COUNTRY_REDENOMINATIONS.splice(index, 1);
    return true;
  }
  
  return false;
}

/**
 * Get all rules (including dynamically added ones)
 */
export function getAllRules(): RedenominationRule[] {
  return COUNTRY_REDENOMINATIONS.map(countryToRule);
}

/**
 * Find rules by currency code
 */
export function getRulesByCurrency(currencyCode: string): RedenominationRule[] {
  return COUNTRY_REDENOMINATIONS
    .filter(
      (c) =>
        c.oldCurrency.toUpperCase() === currencyCode.toUpperCase() ||
        c.newCurrency.toUpperCase() === currencyCode.toUpperCase()
    )
    .map(countryToRule);
}

/**
 * Find rules by factor range
 */
export function getRulesByFactor(
  minFactor?: number,
  maxFactor?: number
): RedenominationRule[] {
  return COUNTRY_REDENOMINATIONS.filter((c) => {
    if (minFactor !== undefined && c.factor < minFactor) return false;
    if (maxFactor !== undefined && c.factor > maxFactor) return false;
    return true;
  }).map(countryToRule);
}

/**
 * Generate predefined rules object dynamically from country database
 */
function generatePredefinedRules() {
  const rules: Record<string, RedenominationRule> = {};
  
  COUNTRY_REDENOMINATIONS.forEach((country) => {
    const key = `${country.countryCode.toLowerCase()}${country.year}`;
    rules[key] = countryToRule(country);
  });
  
  return rules;
}

/**
 * Predefined rules (backward compatibility + auto-generated)
 */
export const PREDEFINED_RULES = {
  // Legacy named rules for backward compatibility
  indonesia2027: countryToRule(
    COUNTRY_REDENOMINATIONS.find((c) => c.countryCode === 'ID' && c.year === 2027)!
  ),
  turkey2005: countryToRule(
    COUNTRY_REDENOMINATIONS.find((c) => c.countryCode === 'TR' && c.year === 2005)!
  ),
  zimbabwe2008: countryToRule(
    COUNTRY_REDENOMINATIONS.find((c) => c.countryCode === 'ZW' && c.year === 2008)!
  ),
  brazil1994: countryToRule(
    COUNTRY_REDENOMINATIONS.find((c) => c.countryCode === 'BR' && c.year === 1994)!
  ),
  russia1998: countryToRule(
    COUNTRY_REDENOMINATIONS.find((c) => c.countryCode === 'RU' && c.year === 1998)!
  ),
  vietnam1985: countryToRule(
    COUNTRY_REDENOMINATIONS.find((c) => c.countryCode === 'VN' && c.year === 1985)!
  ),
  // Auto-generated rules (includes all countries)
  ...generatePredefinedRules(),
} as const;


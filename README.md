# currency-redenomination

Clean, flexible engine for currency redenomination, formatting, and batch processing.

When governments change currency units (like Indonesia removing 3 zeros), apps must update:
- Prices
- Accounting systems
- Databases
- Invoices & receipts
- UI formatters
- Input parsers

This package provides a clean, customizable engine to:
- Convert old → new currency
- Convert new → old currency
- Automatically format with local symbols (Rp, ₺, ₽, etc.) or ISO codes
- Batch convert data
- Work with any country or denomination rule
- Allow plugins (rounding, logging, transformers)
- Handle countries that don't display decimals (e.g., Indonesia: `10.000` instead of `10.000,00`)

## Installation

```bash
npm install currency-redenomination
```

## Quick Start

```typescript
import { RedenominationEngine, PREDEFINED_RULES } from 'currency-redenomination';

// Create engine with Indonesia 2016 redenomination (remove 3 zeros)
const engine = new RedenominationEngine(PREDEFINED_RULES.indonesia2027);

// Convert old currency to new (1000000 → 1000)
const result = engine.convertForward(1000000);
console.log(result.amount); // 1000

// Convert new currency to old (1000 → 1000000)
const reverse = engine.convertReverse(1000);
console.log(reverse.amount); // 1000000

// Format with local currency symbol (Indonesia uses 'Rp')
const formatted = engine.format(1000);
console.log(formatted); // "Rp 1.000" (decimals hidden for whole numbers)
console.log(engine.format(1000.50)); // "Rp 1.000,50" (decimals shown when present)
```

## Features

### Country-Based Rules

Use predefined rules or find rules by country:

```typescript
import {
  RedenominationEngine,
  PREDEFINED_RULES,
  getRuleByCountry,
  getAvailableCountries,
} from 'currency-redenomination';

// Use predefined rule
const engine1 = new RedenominationEngine(PREDEFINED_RULES.indonesia2027);

// Get rule by country code
const indonesiaRule = getRuleByCountry('ID', 2016);
const engine2 = new RedenominationEngine(indonesiaRule);

// List all available countries
const countries = getAvailableCountries();
// [{ code: 'ID', name: 'Indonesia', years: [2016] }, ...]
```

### Local Currency Symbols

The package supports both local symbols (Rp, ₺, ₽) and ISO codes (IDR, TRY, RUB):

```typescript
import { RedenominationEngine, PREDEFINED_RULES, getCurrencySymbol } from 'currency-redenomination';

const engine = new RedenominationEngine(PREDEFINED_RULES.indonesia2027);

// Format uses local symbol by default
engine.format(1000); // "Rp 1.000"

// Get the symbol
getCurrencySymbol(PREDEFINED_RULES.indonesia2027); // "Rp"
getCurrencySymbol(PREDEFINED_RULES.indonesia2027, false); // "Rp" (old currency)

// Use ISO code instead
const isoEngine = new RedenominationEngine({
  ...PREDEFINED_RULES.indonesia2027,
  useLocalSymbol: false,
});
isoEngine.format(1000); // "IDR 1,000.00"
```

### Custom Rules

Define your own redenomination rules:

```typescript
import { RedenominationEngine } from 'currency-redenomination';

const customRule = {
  name: 'my-country-2024',
  factor: 100, // Remove 2 zeros
  oldCurrency: 'OLD',
  newCurrency: 'NEW',
  oldLocalSymbol: '₿',
  newLocalSymbol: '₿',
  decimals: 2,
  formatting: {
    locale: 'en-US',
    thousandsSeparator: ',',
    decimalSeparator: '.',
    symbolPosition: 'before',
    symbolSpacing: true,
    hideDecimals: true, // Hide .00 for whole numbers
  },
  useLocalSymbol: true,
};

const engine = new RedenominationEngine(customRule);
```

### Creating Rules with Helper Functions

Easily create and manage country rules:

```typescript
import {
  createCountryRule,
  addCountryRedenomination,
  getRuleByCountry,
  getRulesByCurrency,
  getRulesByFactor,
} from 'currency-redenomination';

// Create a new country rule
const japanRule = createCountryRule(
  'JP',           // Country code
  'Japan',        // Country name
  1954,           // Year
  10000,          // Factor
  'JPY',          // Old currency
  'JPY',          // New currency
  {
    newLocalSymbol: '¥',
    decimals: 0,
    formatting: {
      locale: 'ja-JP',
      thousandsSeparator: ',',
      decimalSeparator: '.',
      hideDecimals: true,
    },
  }
);

// Add it to the system
addCountryRedenomination(japanRule);

// Use it
const rule = getRuleByCountry('JP', 1954);
const engine = new RedenominationEngine(rule);

// Find rules by currency
const idrRules = getRulesByCurrency('IDR');

// Find rules by factor range
const largeFactorRules = getRulesByFactor(1000000); // Rules with factor >= 1M
```

### Formatting Options

#### International Formatting

```typescript
import { formatCurrency, createFormatter } from 'currency-redenomination';

// Simple formatting
formatCurrency(1000, 'IDR', 2, 'en-US'); // "IDR 1,000.00"

// Create formatter for a rule
const formatter = createFormatter(PREDEFINED_RULES.indonesia2027);
formatter(1000); // "Rp 1.000" (uses rule's formatting)
```

#### General Formatting (Flexible)

```typescript
import { formatCurrencyGeneral, createGeneralFormatter } from 'currency-redenomination';

// Custom formatting with full control
formatCurrencyGeneral(1000, {
  symbol: 'Rp',
  decimals: 2,
  thousandsSeparator: '.',
  decimalSeparator: ',',
  symbolPosition: 'before',
  symbolSpacing: true,
  hideDecimals: true, // Hide .00 for whole numbers
});
// "Rp 1.000"

// Create general formatter
const formatter = createGeneralFormatter(PREDEFINED_RULES.indonesia2027);
formatter(1000); // "Rp 1.000"
formatter(1000.50); // "Rp 1.000,50"
```

#### Hide Decimals Feature

Some countries (like Indonesia) don't display decimal places for whole numbers:

```typescript
const engine = new RedenominationEngine(PREDEFINED_RULES.indonesia2027);

engine.format(10000); // "Rp 10.000" (no decimals)
engine.format(10000.50); // "Rp 10.000,50" (decimals shown when present)

// Configure in rule
const rule = {
  name: 'custom',
  factor: 1000,
  decimals: 2,
  formatting: {
    hideDecimals: true, // Hide .00 for whole numbers
    // or
    omitDecimals: true, // Always hide decimals
  },
};
```

### Plugins

Use built-in plugins or create custom ones:

```typescript
import {
  RedenominationEngine,
  PREDEFINED_RULES,
  createRoundingPlugin,
  createLoggingPlugin,
  createValidationPlugin,
} from 'currency-redenomination';

const engine = new RedenominationEngine(PREDEFINED_RULES.indonesia2027, [
  createRoundingPlugin(2),
  createLoggingPlugin(console.log),
  createValidationPlugin(0, 1000000000),
]);

// Or add plugins per conversion
const result = engine.convertForward(1000000, {
  plugins: [createRoundingPlugin(0)], // Round to whole numbers
});
```

### Batch Processing

Convert arrays and objects:

```typescript
import {
  RedenominationEngine,
  batchConvertArray,
  batchConvertObject,
  PREDEFINED_RULES,
} from 'currency-redenomination';

const engine = new RedenominationEngine(PREDEFINED_RULES.indonesia2027);

// Convert array
const prices = [1000000, 2000000, 500000];
const converted = batchConvertArray(engine, prices, 'forward');
// [1000, 2000, 500]

// Convert object with specific paths
const invoice = {
  subtotal: 1000000,
  tax: 100000,
  total: 1100000,
};

const convertedInvoice = batchConvertObject(engine, invoice, 'forward', {
  paths: ['subtotal', 'tax', 'total'],
});
// { subtotal: 1000, tax: 100, total: 1100 }

// Deep convert all numeric values
const data = {
  items: [
    { price: 1000000, quantity: 2 },
    { price: 2000000, quantity: 1 },
  ],
  total: 4000000,
};

const convertedData = batchConvertObject(engine, data, 'forward', {
  deep: true,
});
```

### Custom Plugins

Create your own transformation plugins:

```typescript
import { RedenominationPlugin } from 'currency-redenomination';

const customPlugin: RedenominationPlugin = {
  beforeConvert: (amount, direction, rule) => {
    console.log(`Converting ${amount}...`);
  },
  afterConvert: (amount, original, direction, rule) => {
    // Apply custom transformation
    return amount * 1.01; // Add 1% fee
  },
  format: (amount, rule) => {
    return `$${amount.toFixed(2)}`;
  },
};

const engine = new RedenominationEngine(rule, [customPlugin]);
```

## API Reference

### `RedenominationEngine`

Main engine class for currency redenomination.

#### Constructor

```typescript
new RedenominationEngine(rule: RedenominationRule, defaultPlugins?: RedenominationPlugin[])
```

#### Methods

- `convertForward(amount: number, options?: ConvertOptions): ConversionResult`
  - Convert old currency to new currency

- `convertReverse(amount: number, options?: ConvertOptions): ConversionResult`
  - Convert new currency to old currency

- `format(amount: number, plugins?: RedenominationPlugin[], useGeneralFormat?: boolean, overrideOptions?: Partial<FormattingOptions>): string`
  - Format amount with currency symbol
  - Uses local symbol by default if `useLocalSymbol: true` in rule

- `getRule(): RedenominationRule`
  - Get current redenomination rule

- `updateRule(rule: Partial<RedenominationRule>): void`
  - Update the redenomination rule

- `addPlugin(plugin: RedenominationPlugin): void`
  - Add a default plugin

- `removePlugin(plugin: RedenominationPlugin): void`
  - Remove a default plugin

### Types

#### `RedenominationRule`

```typescript
interface RedenominationRule {
  name: string;
  factor: number; // Conversion factor
  oldCurrency?: string; // ISO code
  newCurrency?: string; // ISO code
  oldLocalSymbol?: string; // Local symbol (e.g., 'Rp')
  newLocalSymbol?: string; // Local symbol (e.g., 'Rp')
  decimals?: number;
  countryCode?: string; // ISO 3166-1 alpha-2
  year?: number;
  formatting?: FormattingOptions;
  useLocalSymbol?: boolean; // Use local symbol instead of ISO code
}
```

#### `FormattingOptions`

```typescript
interface FormattingOptions {
  locale?: string; // e.g., 'en-US', 'id-ID', 'tr-TR'
  thousandsSeparator?: string; // e.g., '.', ',', ' '
  decimalSeparator?: string; // e.g., '.', ','
  symbolPosition?: 'before' | 'after';
  symbolSpacing?: boolean;
  formatPattern?: string; // e.g., '{symbol}{amount}'
  hideDecimals?: boolean; // Hide .00 for whole numbers
  omitDecimals?: boolean; // Always hide decimals
}
```

#### `RedenominationPlugin`

```typescript
interface RedenominationPlugin {
  beforeConvert?: (amount: number, direction: 'forward' | 'reverse', rule: RedenominationRule) => number | void;
  afterConvert?: (amount: number, originalAmount: number, direction: 'forward' | 'reverse', rule: RedenominationRule) => number | void;
  format?: (amount: number, rule: RedenominationRule) => string;
}
```

#### `ConvertOptions`

```typescript
interface ConvertOptions {
  rounding?: 'round' | 'floor' | 'ceil' | 'none';
  decimals?: number;
  plugins?: RedenominationPlugin[];
  format?: boolean;
}
```

### Formatters

- `formatCurrency(amount, symbol, decimals, locale, hideDecimals?)` - International formatting
- `formatCurrencyGeneral(amount, options)` - Flexible formatting with custom options
- `parseCurrency(value)` - Parse currency string to number
- `formatWithSeparator(amount, separator, decimals, decimalSeparator)` - Format with custom separators
- `createFormatter(rule, locale?)` - Create formatter for a rule
- `createGeneralFormatter(rule)` - Create general formatter with rule's formatting options
- `getCurrencySymbol(rule, useNew?)` - Get appropriate currency symbol (local or ISO)

### Country Rules Management

- `getRuleByCountry(countryCode, year?)` - Get rule by country code
- `getRulesByCountry(countryCode)` - Get all rules for a country
- `getAvailableCountries()` - List all available countries
- `createCountryRule(...)` - Helper to create a country rule
- `addCountryRedenomination(country)` - Add or update a country rule
- `removeCountryRedenomination(countryCode, year)` - Remove a country rule
- `getAllRules()` - Get all rules (including dynamically added)
- `getRulesByCurrency(currencyCode)` - Find rules by currency code
- `getRulesByFactor(minFactor?, maxFactor?)` - Find rules by factor range

### Built-in Plugins

- `createRoundingPlugin(decimals)` - Round to specified decimal places
- `createLoggingPlugin(logger?)` - Log conversion operations
- `createValidationPlugin(min?, max?)` - Validate amount range
- `createTransformerPlugin(transform)` - Apply custom transformation
- `createFormattingPlugin(formatter)` - Custom currency formatting

### Batch Functions

- `batchConvertArray(engine, amounts, direction, options)` - Convert array of numbers
- `batchConvertObject(engine, data, direction, options)` - Convert object with specified paths
- `batchConvertObjects(engine, objects, direction, options)` - Convert array of objects

### Predefined Rules

- `PREDEFINED_RULES.indonesia2027` - Indonesia 2027 (Rp, ÷1000, hideDecimals: true)
- `PREDEFINED_RULES.turkey2005` - Turkey 2005 (₺, ÷1,000,000)
- `PREDEFINED_RULES.zimbabwe2008` - Zimbabwe 2008 (Z$, ÷10,000,000,000)
- `PREDEFINED_RULES.brazil1994` - Brazil 1994 (R$, ÷2750)
- `PREDEFINED_RULES.russia1998` - Russia 1998 (₽, ÷1000)
- `PREDEFINED_RULES.vietnam1985` - Vietnam 1985 (₫, ÷10, decimals: 0)

All rules also accessible via country code: `PREDEFINED_RULES.id2016`, `PREDEFINED_RULES.tr2005`, etc.

## Use Cases

### Accounting Systems

```typescript
const engine = new RedenominationEngine(PREDEFINED_RULES.indonesia2027);
const ledger = batchConvertObject(engine, oldLedger, 'forward', {
  paths: ['debit', 'credit', 'balance'],
});
```

### E-commerce Platforms

```typescript
const products = batchConvertObjects(engine, productCatalog, 'forward', {
  paths: ['price', 'salePrice', 'cost'],
});
```

### Database Migration

```typescript
const records = await db.query('SELECT * FROM transactions');
const migrated = batchConvertObjects(engine, records, 'forward', {
  paths: ['amount', 'fee', 'total'],
});
await db.insert(migrated);
```

### UI Formatters

```typescript
import { createGeneralFormatter, parseCurrency } from 'currency-redenomination';

const formatter = createGeneralFormatter(PREDEFINED_RULES.indonesia2027);

<input 
  value={formatter(amount)} 
  onChange={(e) => {
    const parsed = parseCurrency(e.target.value);
    const converted = engine.convertForward(parsed);
    setAmount(converted.amount);
  }} 
/>
// Displays: "Rp 10.000" (no decimals for whole numbers)
```

## Examples

### Indonesia (Local Symbol, Hide Decimals)

```typescript
const engine = new RedenominationEngine(PREDEFINED_RULES.indonesia2027);

engine.format(10000); // "Rp 10.000" (no .00)
engine.format(10000.50); // "Rp 10.000,50" (decimals shown)
```

### Turkey (Local Symbol, After Position)

```typescript
const engine = new RedenominationEngine(PREDEFINED_RULES.turkey2005);

engine.format(1000); // "1.000,00 ₺" (symbol after, with decimals)
```

### Custom Country Rule

```typescript
import { createCountryRule, addCountryRedenomination } from 'currency-redenomination';

const malaysiaRule = createCountryRule(
  'MY',
  'Malaysia',
  2024,
  100,
  'MYR',
  'MYR',
  {
    newLocalSymbol: 'RM',
    decimals: 2,
    formatting: {
      locale: 'ms-MY',
      thousandsSeparator: ',',
      decimalSeparator: '.',
      hideDecimals: true,
    },
  }
);

addCountryRedenomination(malaysiaRule);
const engine = new RedenominationEngine(malaysiaRule);
```

## Contributing

### Adding New Country Redenomination Data

We welcome contributions to add new country redenomination rules! Here's how to add a new country to the `COUNTRY_REDENOMINATIONS` database.

#### Step-by-Step Guide

1. **Open the rules file**: `src/rules.ts`

2. **Locate the `COUNTRY_REDENOMINATIONS` array** (around line 40)

3. **Add your country data** following this structure:

```typescript
{
  countryCode: 'XX',              // ISO 3166-1 alpha-2 country code (e.g., 'MY', 'JP', 'SG')
  countryName: 'Country Name',    // Full country name (e.g., 'Malaysia', 'Japan')
  year: 2024,                     // Year of redenomination
  factor: 100,                    // Conversion factor (oldAmount / factor = newAmount)
  oldCurrency: 'OLD',             // Old currency ISO code (e.g., 'MYR', 'JPY')
  newCurrency: 'NEW',             // New currency ISO code
  oldLocalSymbol: '₿',            // Old local currency symbol (optional, e.g., 'RM', '¥')
  newLocalSymbol: '₿',            // New local currency symbol (optional)
  decimals: 2,                    // Decimal places (optional, default: 2, use 0 for currencies without decimals)
  useLocalSymbol: true,           // Use local symbol instead of ISO (optional, default: true if local symbol provided)
  formatting: {                   // Formatting options (optional)
    locale: 'en-XX',              // Locale for formatting (e.g., 'ms-MY', 'ja-JP')
    thousandsSeparator: ',',      // Thousands separator (e.g., ',', '.', ' ')
    decimalSeparator: '.',        // Decimal separator (e.g., '.', ',')
    symbolPosition: 'before',     // 'before' or 'after'
    symbolSpacing: true,          // Space between symbol and amount
    hideDecimals: false,          // Hide .00 for whole numbers (e.g., true for Indonesia)
  },
},
```

#### Complete Example - Adding Malaysia

```typescript
// In src/rules.ts, add to COUNTRY_REDENOMINATIONS array:
{
  countryCode: 'MY',
  countryName: 'Malaysia',
  year: 2024,
  factor: 100,
  oldCurrency: 'MYR',
  newCurrency: 'MYR',
  oldLocalSymbol: 'RM',
  newLocalSymbol: 'RM',
  decimals: 2,
  useLocalSymbol: true,
  formatting: {
    locale: 'ms-MY',
    thousandsSeparator: ',',
    decimalSeparator: '.',
    symbolPosition: 'before',
    symbolSpacing: true,
    hideDecimals: true,
  },
},
```

#### After Adding

The rule will be **automatically available** via:

- **Predefined rule**: `PREDEFINED_RULES.my2024` (auto-generated from country code + year)
- **Country lookup**: `getRuleByCountry('MY', 2024)`
- **All rules for country**: `getRulesByCountry('MY')`

#### Required Information Checklist

When adding a new country, ensure you have:

- ✅ **Country Code**: Valid ISO 3166-1 alpha-2 code (2 uppercase letters)
- ✅ **Country Name**: Official country name
- ✅ **Year**: Accurate year of redenomination
- ✅ **Factor**: Correct conversion factor (verify from official sources)
- ✅ **Currency Codes**: Valid ISO 4217 currency codes
- ✅ **Local Symbols**: Common local currency symbols used in that country
- ✅ **Formatting**: Locale and formatting conventions for that country

#### Formatting Guidelines by Region

**Southeast Asia** (Indonesia, Malaysia, etc.):
- Thousands separator: `.` (dot)
- Decimal separator: `,` (comma)
- Symbol position: `before`
- Often `hideDecimals: true`

**Europe** (Turkey, Russia, etc.):
- Thousands separator: `.` or ` ` (space)
- Decimal separator: `,` (comma)
- Symbol position: varies

**Americas**:
- Thousands separator: `,` (comma)
- Decimal separator: `.` (dot)
- Symbol position: `before`

**East Asia** (Japan, etc.):
- Thousands separator: `,` (comma)
- Decimal separator: `.` (dot)
- Often `decimals: 0`

#### Testing Your Contribution

1. **Rebuild the package**:
   ```bash
   npm run build
   ```

2. **Run tests**:
   ```bash
   npm test
   ```

3. **Verify the rule works**:
   ```typescript
   import { getRuleByCountry, RedenominationEngine } from 'currency-redenomination';
   
   const rule = getRuleByCountry('XX', YYYY);
   if (!rule) {
     console.error('Rule not found!');
   } else {
     const engine = new RedenominationEngine(rule);
     
     // Test forward conversion
     const result = engine.convertForward(1000000);
     console.log('Converted:', result.amount);
     
     // Test formatting
     console.log('Formatted:', engine.format(result.amount));
     
     // Test reverse conversion
     const reverse = engine.convertReverse(result.amount);
     console.log('Reversed:', reverse.amount);
   }
   ```

4. **Check formatting display**:
   - Verify local symbol appears correctly
   - Check thousands/decimal separators
   - Test with whole numbers and decimals
   - Verify `hideDecimals` works if enabled

#### Alternative: Runtime Addition

You can also add rules programmatically without modifying source code:

```typescript
import { createCountryRule, addCountryRedenomination } from 'currency-redenomination';

const newRule = createCountryRule(
  'MY',           // Country code
  'Malaysia',     // Country name
  2024,           // Year
  100,            // Factor
  'MYR',          // Old currency
  'MYR',          // New currency
  {
    newLocalSymbol: 'RM',
    decimals: 2,
    formatting: {
      locale: 'ms-MY',
      thousandsSeparator: ',',
      decimalSeparator: '.',
      hideDecimals: true,
    },
  }
);

addCountryRedenomination(newRule);
```

#### Pull Request Guidelines

When submitting a PR to add a new country:

1. ✅ Add country data to `COUNTRY_REDENOMINATIONS` array in `src/rules.ts`
2. ✅ Include source/reference for redenomination information (official government announcement, central bank notice, etc.)
3. ✅ Verify all data is accurate (factor, year, currency codes)
4. ✅ Test forward and reverse conversion
5. ✅ Verify formatting displays correctly
6. ✅ Ensure all existing tests pass: `npm test`
7. ✅ Update this README's predefined rules list if needed

#### Example Contribution Checklist

- [ ] Added country data to `COUNTRY_REDENOMINATIONS` array
- [ ] Verified country code is correct (ISO 3166-1 alpha-2, uppercase)
- [ ] Confirmed conversion factor is accurate from official sources
- [ ] Added local currency symbols (if commonly used)
- [ ] Configured appropriate formatting options for that country
- [ ] Set `hideDecimals: true` if country doesn't show .00 for whole numbers
- [ ] Tested forward conversion (old → new)
- [ ] Tested reverse conversion (new → old)
- [ ] Verified formatting displays correctly with local symbols
- [ ] Verified formatting displays correctly with ISO codes
- [ ] All tests pass: `npm test`
- [ ] Package builds successfully: `npm run build`

#### Finding Redenomination Information

Good sources for redenomination data:
- Central bank announcements
- Government financial ministry notices
- International Monetary Fund (IMF) records
- Wikipedia (with verification from official sources)
- Financial news archives

#### Questions?

If you're unsure about any formatting or data, feel free to:
- Check existing country entries for reference
- Look at the demo to see formatting in action
- Open an issue to discuss before submitting a PR

Thank you for contributing! 🎉

## License

MIT

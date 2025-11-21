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
- Automatically format
- Batch convert data
- Work with any country or denomination rule
- Allow plugins (rounding, logging, transformers)

## Installation

```bash
npm install currency-redenomination
```

## Quick Start

```typescript
import { RedenominationEngine, PREDEFINED_RULES } from 'currency-redenomination';

// Create engine with Indonesia 2016 redenomination (remove 3 zeros)
const engine = new RedenominationEngine(PREDEFINED_RULES.indonesia2016);

// Convert old currency to new (1000000 → 1000)
const result = engine.convertForward(1000000);
console.log(result.amount); // 1000

// Convert new currency to old (1000 → 1000000)
const reverse = engine.convertReverse(1000);
console.log(reverse.amount); // 1000000

// Format with currency symbol
const formatted = engine.format(1000);
console.log(formatted); // "IDR 1,000.00"
```

## Features

### Custom Rules

Define your own redenomination rules for any country:

```typescript
import { RedenominationEngine } from 'currency-redenomination';

const customRule = {
  name: 'my-country-2024',
  factor: 100, // Remove 2 zeros
  oldCurrency: 'OLD',
  newCurrency: 'NEW',
  decimals: 2,
};

const engine = new RedenominationEngine(customRule);
```

### Plugins

Use built-in plugins or create custom ones:

```typescript
import {
  RedenominationEngine,
  createRoundingPlugin,
  createLoggingPlugin,
  createValidationPlugin,
} from 'currency-redenomination';

const engine = new RedenominationEngine(PREDEFINED_RULES.indonesia2016, [
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

const engine = new RedenominationEngine(PREDEFINED_RULES.indonesia2016);

// Convert array
const prices = [1000000, 2000000, 500000];
const converted = batchConvertArray(engine, prices, 'forward');
// [1000, 2000, 500]

// Convert object
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

### Formatting

```typescript
import { formatCurrency, parseCurrency, createFormatter } from 'currency-redenomination';

// Format currency
formatCurrency(1000, 'IDR', 2); // "IDR 1,000.00"

// Parse currency string
parseCurrency('IDR 1,000.00'); // 1000

// Create formatter for a rule
const formatter = createFormatter(PREDEFINED_RULES.indonesia2016);
formatter(1000); // "IDR 1,000.00"
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

- `format(amount: number, plugins?: RedenominationPlugin[]): string`
  - Format amount with currency symbol

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
  oldCurrency?: string;
  newCurrency?: string;
  decimals?: number;
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

### Built-in Plugins

- `createRoundingPlugin(decimals: number)`
- `createLoggingPlugin(logger?: Function)`
- `createValidationPlugin(min?: number, max?: number)`
- `createTransformerPlugin(transform: Function)`
- `createFormattingPlugin(formatter: Function)`

### Batch Functions

- `batchConvertArray(engine, amounts, direction, options)`
- `batchConvertObject(engine, data, direction, options)`
- `batchConvertObjects(engine, objects, direction, options)`

### Predefined Rules

- `PREDEFINED_RULES.indonesia2016` - Indonesia 2016 (factor: 1000)
- `PREDEFINED_RULES.turkey2005` - Turkey 2005 (factor: 1000000)
- `PREDEFINED_RULES.zimbabwe2008` - Zimbabwe 2008 (factor: 10000000000)

## Use Cases

### Accounting Systems

```typescript
const engine = new RedenominationEngine(rule);
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
const formatter = createFormatter(rule);
<input value={formatter(amount)} onChange={(e) => {
  const parsed = parseCurrency(e.target.value);
  const converted = engine.convertForward(parsed);
  setAmount(converted.amount);
}} />
```

## License

MIT


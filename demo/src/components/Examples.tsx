import ExampleCard from './ExampleCard';

interface ExamplesProps {
  indonesiaFormatted: string;
  turkeyFormatted: string;
}

export default function Examples({ indonesiaFormatted, turkeyFormatted }: ExamplesProps) {
  return (
    <section id="examples" className="container mx-auto px-4 py-16 scroll-mt-20">
      <h2 className="text-4xl font-bold text-center mb-12 text-slate-900 dark:text-slate-100">
        Examples
      </h2>
      <div className="max-w-5xl mx-auto space-y-6">
        <ExampleCard
          title="Indonesia (2027)"
          description="Remove 3 zeros, format with local symbol 'Rp', hide decimals for whole numbers."
          code={`import { RedenominationEngine, PREDEFINED_RULES } from 'currency-redenomination';

const engine = new RedenominationEngine(PREDEFINED_RULES.indonesia2027);

// Convert 1,000,000 old IDR → 1,000 new IDR
const result = engine.convertForward(1000000);
console.log(result.amount); // 1000

// Format: "Rp 1.000" (no .00 for whole numbers)
console.log(engine.format(result.amount)); // "Rp 1.000"
console.log(engine.format(1000.50)); // "Rp 1.000,50"`}
          result={`Output: ${indonesiaFormatted}`}
        />

        <ExampleCard
          title="Turkey (2005)"
          description="Remove 6 zeros, format with Turkish Lira symbol."
          code={`import { RedenominationEngine, PREDEFINED_RULES } from 'currency-redenomination';

const engine = new RedenominationEngine(PREDEFINED_RULES.turkey2005);

// Convert 1,000,000 old TRY → 1 new TRY
const result = engine.convertForward(1000000);
console.log(result.amount); // 1

// Format with local symbol
console.log(engine.format(result.amount)); // "₺ 1,00"`}
          result={`Output: ${turkeyFormatted}`}
        />

        <ExampleCard
          title="Custom Rules"
          description="Create your own redenomination rule with custom formatting."
          code={`import { RedenominationEngine, createCountryRule } from 'currency-redenomination';

// Create custom rule: divide by 100, use custom formatting
const customRule = createCountryRule(
  'MY',           // Country code
  'Malaysia',     // Country name
  2024,           // Year
  100,            // Factor (divide by 100)
  'MYR',          // Old currency
  'MYR',          // New currency
  {
    newLocalSymbol: 'RM',
    decimals: 2,
    formatting: {
      locale: 'ms-MY',
      thousandsSeparator: ',',
      decimalSeparator: '.',
      symbolPosition: 'before',
      hideDecimals: true,
    },
  }
);

const engine = new RedenominationEngine(customRule);
console.log(engine.format(1000)); // "RM 1,000"`}
        />

        <ExampleCard
          title="Plugins"
          description="Extend functionality with rounding, logging, and validation plugins."
          code={`import {
  RedenominationEngine,
  PREDEFINED_RULES,
  createRoundingPlugin,
  createLoggingPlugin,
} from 'currency-redenomination';

const engine = new RedenominationEngine(
  PREDEFINED_RULES.indonesia2027,
  [
    createRoundingPlugin(2), // Round to 2 decimals
    createLoggingPlugin(console.log), // Log all conversions
  ]
);

const result = engine.convertForward(1234567);
// Logs: "Converting 1234567 forward..."
// Result: 1234.57 (rounded)`}
        />

        <ExampleCard
          title="Batch Conversions"
          description="Convert arrays and objects in bulk operations."
          code={`import {
  RedenominationEngine,
  PREDEFINED_RULES,
  batchConvertArray,
  batchConvertObject,
} from 'currency-redenomination';

const engine = new RedenominationEngine(PREDEFINED_RULES.indonesia2027);

// Convert array
const prices = [1000000, 2000000, 3000000];
const converted = batchConvertArray(engine, prices, 'forward');
// Result: [1000, 2000, 3000]

// Convert object
const ledger = {
  debit: 1000000,
  credit: 500000,
  balance: 500000,
};
const convertedLedger = batchConvertObject(engine, ledger, 'forward', {
  paths: ['debit', 'credit', 'balance'],
});
// Result: { debit: 1000, credit: 500, balance: 500 }`}
        />
      </div>
    </section>
  );
}


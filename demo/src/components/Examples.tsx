import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import ExampleCard from './ExampleCard';

interface ExamplesProps {
  indonesiaFormatted: string;
  turkeyFormatted: string;
}

export default function Examples({ indonesiaFormatted, turkeyFormatted }: ExamplesProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section id="examples" className="relative py-16 sm:py-20 md:py-24 lg:py-28 scroll-mt-20">
      {/* Background decoration */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-pink-50/30 dark:via-pink-950/20 to-transparent"></div>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 text-slate-900 dark:text-slate-100">
            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Examples
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Real-world examples showing how to use the library
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="max-w-5xl mx-auto space-y-4 sm:space-y-5 md:space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants}>
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
          </motion.div>

          <motion.div variants={itemVariants}>
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
          </motion.div>

          <motion.div variants={itemVariants}>
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
          </motion.div>

          <motion.div variants={itemVariants}>
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
          </motion.div>

          <motion.div variants={itemVariants}>
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

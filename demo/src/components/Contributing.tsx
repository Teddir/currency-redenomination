import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Button from './Button';
import CodeBlock from './CodeBlock';

export default function Contributing() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="contributing" className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-white dark:bg-slate-900 overflow-hidden scroll-mt-20">
      {/* Background decoration */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className="text-center">
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 sm:mb-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/40 dark:to-purple-900/40 border border-blue-200/60 dark:border-blue-800/60 rounded-full text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span
                className="relative flex h-2 w-2"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </motion.span>
              <span>Open Source</span>
            </motion.div>

            {/* Header */}
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 text-slate-900 dark:text-slate-100"
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Contributing
              </span>
            </motion.h2>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              We welcome contributions! Help us expand the database of country redenomination rules.
            </p>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-8 sm:mb-10 text-left max-w-2xl mx-auto">
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-4">
                To add a new country, simply add an entry to the{' '}
                <code className="bg-slate-200 dark:bg-slate-900 px-2 py-1 rounded text-xs sm:text-sm font-mono text-blue-600 dark:text-blue-400 font-semibold">
                  COUNTRY_REDENOMINATIONS
                </code>{' '}
                array in{' '}
                <code className="bg-slate-200 dark:bg-slate-900 px-2 py-1 rounded text-xs sm:text-sm font-mono text-blue-600 dark:text-blue-400 font-semibold">
                  src/rules.ts
                </code>
                .
              </p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-500">
                Click below to view the complete contribution guide with examples and guidelines.
              </p>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="secondary"
                onClick={() => setIsGuideOpen(!isGuideOpen)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                size="md"
              >
                {isGuideOpen ? 'Hide' : 'View'} Contribution Guide
              </Button>
            </motion.div>
          </div>

          {/* Expandable Contribution Guide */}
          <AnimatePresence>
            {isGuideOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="overflow-hidden"
              >
            <div className="mt-12 sm:mt-16 space-y-8 sm:space-y-10 animate-in fade-in slide-in-from-top-4 duration-300">
              {/* Step 1 */}
              <div className="bg-slate-50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm sm:text-base">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">
                      Add Country Data
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-4">
                      Open <code className="bg-slate-200 dark:bg-slate-900 px-2 py-1 rounded text-xs sm:text-sm font-mono">src/rules.ts</code> and add your country to the <code className="bg-slate-200 dark:bg-slate-900 px-2 py-1 rounded text-xs sm:text-sm font-mono">COUNTRY_REDENOMINATIONS</code> array.
                    </p>
                    <CodeBlock>{`{
  countryCode: 'MY',        // ISO 3166-1 alpha-2 (2 uppercase letters)
  countryName: 'Malaysia',
  year: 2024,
  factor: 100,              // Conversion factor (divide by this)
  oldCurrency: 'MYR',       // ISO 4217 currency code
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
    hideDecimals: true,     // Hide .00 for whole numbers
  },
}`}</CodeBlock>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm sm:text-base">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">
                      Required Information Checklist
                    </h3>
                    <ul className="space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span><strong>Country Code:</strong> Valid ISO 3166-1 alpha-2 code (2 uppercase letters)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span><strong>Year:</strong> Accurate year of redenomination</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span><strong>Factor:</strong> Correct conversion factor (verify from official sources)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span><strong>Currency Codes:</strong> Valid ISO 4217 currency codes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span><strong>Local Symbols:</strong> Common local currency symbols used in that country</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span><strong>Formatting:</strong> Locale and formatting conventions for that country</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm sm:text-base">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">
                      Formatting Guidelines by Region
                    </h3>
                    <div className="space-y-4 text-sm sm:text-base">
                      <div>
                        <strong className="text-slate-900 dark:text-slate-100">Southeast Asia</strong> (Indonesia, Malaysia, etc.):
                        <ul className="list-disc list-inside ml-4 mt-1 text-slate-600 dark:text-slate-400">
                          <li>Thousands separator: <code className="bg-slate-200 dark:bg-slate-900 px-1 rounded">.</code> (dot)</li>
                          <li>Decimal separator: <code className="bg-slate-200 dark:bg-slate-900 px-1 rounded">,</code> (comma)</li>
                          <li>Symbol position: <code className="bg-slate-200 dark:bg-slate-900 px-1 rounded">before</code></li>
                          <li>Often <code className="bg-slate-200 dark:bg-slate-900 px-1 rounded">hideDecimals: true</code></li>
                        </ul>
                      </div>
                      <div>
                        <strong className="text-slate-900 dark:text-slate-100">Europe</strong> (Turkey, Russia, etc.):
                        <ul className="list-disc list-inside ml-4 mt-1 text-slate-600 dark:text-slate-400">
                          <li>Thousands separator: <code className="bg-slate-200 dark:bg-slate-900 px-1 rounded">.</code> or <code className="bg-slate-200 dark:bg-slate-900 px-1 rounded"> </code> (space)</li>
                          <li>Decimal separator: <code className="bg-slate-200 dark:bg-slate-900 px-1 rounded">,</code> (comma)</li>
                        </ul>
                      </div>
                      <div>
                        <strong className="text-slate-900 dark:text-slate-100">Americas:</strong>
                        <ul className="list-disc list-inside ml-4 mt-1 text-slate-600 dark:text-slate-400">
                          <li>Thousands separator: <code className="bg-slate-200 dark:bg-slate-900 px-1 rounded">,</code> (comma)</li>
                          <li>Decimal separator: <code className="bg-slate-200 dark:bg-slate-900 px-1 rounded">.</code> (dot)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-slate-50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm sm:text-base">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">
                      Test Your Contribution
                    </h3>
                    <div className="space-y-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
                      <p>1. <strong>Rebuild the package:</strong></p>
                      <CodeBlock>{`npm run build`}</CodeBlock>
                      <p>2. <strong>Run tests:</strong></p>
                      <CodeBlock>{`npm test`}</CodeBlock>
                      <p>3. <strong>Verify the rule works:</strong></p>
                      <CodeBlock>{`import { getRuleByCountry, RedenominationEngine } from 'currency-redenomination';

const rule = getRuleByCountry('XX', YYYY);
const engine = new RedenominationEngine(rule);

// Test forward conversion
const result = engine.convertForward(1000000);
console.log('Converted:', result.amount);

// Test formatting
console.log('Formatted:', engine.format(result.amount));

// Test reverse conversion
const reverse = engine.convertReverse(result.amount);
console.log('Reversed:', reverse.amount);`}</CodeBlock>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="bg-slate-50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm sm:text-base">
                    5
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">
                      Pull Request Guidelines
                    </h3>
                    <ul className="space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>Add country data to <code className="bg-slate-200 dark:bg-slate-900 px-1 rounded">COUNTRY_REDENOMINATIONS</code> array</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>Include source/reference for redenomination information</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>Verify all data is accurate (factor, year, currency codes)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>Test forward and reverse conversion</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>Verify formatting displays correctly</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>Ensure all existing tests pass: <code className="bg-slate-200 dark:bg-slate-900 px-1 rounded">npm test</code></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sources */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200/50 dark:border-blue-800/50 rounded-xl sm:rounded-2xl p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">
                  Finding Redenomination Information
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-3">
                  Good sources for redenomination data:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-slate-600 dark:text-slate-400 ml-4">
                  <li>Central bank announcements</li>
                  <li>Government financial ministry notices</li>
                  <li>International Monetary Fund (IMF) records</li>
                  <li>Wikipedia (with verification from official sources)</li>
                  <li>Financial news archives</li>
                </ul>
              </div>
            </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}


import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface APIMethod {
  method: string;
  desc: string;
}

const engineMethods: APIMethod[] = [
  { method: 'convertForward(amount, options?)', desc: 'Convert old → new currency' },
  { method: 'convertReverse(amount, options?)', desc: 'Convert new → old currency' },
  { method: 'format(amount, overrideOptions?)', desc: 'Format amount with rule settings' },
];

const ruleHelpers: APIMethod[] = [
  { method: 'getRuleByCountry(code, year)', desc: 'Get rule by country and year' },
  { method: 'getRulesByCountry(code)', desc: 'Get all rules for a country' },
  { method: 'getAvailableCountries()', desc: 'List all available countries' },
  { method: 'createCountryRule(...)', desc: 'Create a new country rule' },
];

const formatters: APIMethod[] = [
  { method: 'formatCurrency(amount, ...)', desc: 'Format with locale' },
  { method: 'formatCurrencyGeneral(amount, options)', desc: 'Format with custom options' },
  { method: 'getCurrencySymbol(rule, useNew?)', desc: 'Get currency symbol' },
];

const batchFunctions: APIMethod[] = [
  { method: 'batchConvertArray(engine, array, direction)', desc: 'Convert array of amounts' },
  {
    method: 'batchConvertObject(engine, object, direction, options)',
    desc: 'Convert object with specified paths',
  },
  {
    method: 'batchConvertObjects(engine, objects, direction, options)',
    desc: 'Convert array of objects',
  },
];

function APISection({ title, methods }: { title: string; methods: APIMethod[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <motion.div
      ref={ref}
      className="group"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.h3
        className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-slate-900 dark:text-slate-100 flex items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          className="w-1 h-6 sm:h-8 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 rounded-full"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        {title}
      </motion.h3>
      <div className="space-y-2.5 sm:space-y-3">
        {methods.map((item, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="group/item bg-white dark:bg-slate-800/50 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl border border-slate-200/50 dark:border-slate-700/50 hover:border-blue-400/60 dark:hover:border-blue-600/60 hover:shadow-md transition-all duration-300"
            whileHover={{ x: 4, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <code className="text-blue-600 dark:text-blue-400 font-mono text-xs sm:text-sm font-semibold block mb-1.5 sm:mb-2">
              {item.method}
            </code>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function APIOverview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="api" className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-white dark:bg-slate-900 scroll-mt-20 overflow-hidden" aria-label="API Overview">
      {/* Background decoration */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 sm:w-[500px] sm:h-[500px] bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 sm:w-[500px] sm:h-[500px] bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 text-slate-900 dark:text-slate-100">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                API Overview
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Comprehensive API reference for all available methods and functions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            <APISection title="Engine Methods" methods={engineMethods} />
            <APISection title="Rule Helpers" methods={ruleHelpers} />
            <APISection title="Formatters" methods={formatters} />
            <APISection title="Batch Functions" methods={batchFunctions} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

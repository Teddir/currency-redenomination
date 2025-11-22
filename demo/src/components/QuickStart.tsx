import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import CodeBlock from './CodeBlock';

export default function QuickStart() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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

  const codeVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
  };

  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-white dark:bg-slate-900 overflow-hidden">
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
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 sm:mb-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/40 dark:to-purple-900/40 border border-blue-200/60 dark:border-blue-800/60 rounded-full text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span>Get Started</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 text-slate-900 dark:text-slate-100">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Quick Start
              </span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed px-4">
              Get started in seconds with predefined rules or create your own custom redenomination rules.
            </p>
          </motion.div>

          {/* Code Block */}
          <motion.div
            variants={codeVariants}
            className="relative group"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          >
            {/* Decorative gradient background */}
            <motion.div
              className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl blur opacity-20 dark:opacity-10"
              animate={{
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <div className="relative bg-slate-900 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
              {/* Code block header */}
              <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50">
                <div className="flex gap-1.5 sm:gap-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-[10px] sm:text-xs font-medium text-slate-400">quick-start.ts</span>
                </div>
              </div>

              {/* Code content */}
              <div className="p-3 sm:p-4 md:p-6">
                <CodeBlock>{`import { RedenominationEngine, PREDEFINED_RULES } from 'currency-redenomination';

// Create engine with Indonesia 2027 redenomination (remove 3 zeros)
const engine = new RedenominationEngine(PREDEFINED_RULES.indonesia2027);

// Convert old currency to new (1000000 → 1000)
const result = engine.convertForward(1000000);
console.log(result.amount); // 1000

// Format with local symbol
console.log(engine.format(result.amount)); // "Rp 1.000"

// Convert back to old currency
const reverse = engine.convertReverse(1000);
console.log(reverse.amount); // 1000000`}</CodeBlock>
              </div>
            </div>
          </motion.div>

          {/* Additional info */}
          <motion.div
            variants={itemVariants}
            className="mt-8 sm:mt-10 md:mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              {[
                { icon: '✓', text: 'Copy and paste ready', color: 'text-green-500' },
                { icon: '⚡', text: 'Works out of the box', color: 'text-blue-500' },
                { icon: '</>', text: 'TypeScript support', color: 'text-purple-500' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-2 text-sm sm:text-base text-slate-500 dark:text-slate-500"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + idx * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className={`${item.color} font-bold`}>{item.icon}</span>
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

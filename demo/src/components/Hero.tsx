import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import CodeBlock from './CodeBlock';
import Button from './Button';

interface HeroProps {
  indonesiaResult: number;
  indonesiaFormatted: string;
}

export default function Hero({ indonesiaResult, indonesiaFormatted }: HeroProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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
    <section id="hero" className="relative overflow-hidden">
      {/* Animated Background decoration */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-16 sm:pb-20 md:pb-24 lg:pb-32">
        <motion.div
          ref={ref}
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Hero Content */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 sm:mb-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/40 dark:to-purple-900/40 border border-blue-200/60 dark:border-blue-800/60 rounded-full text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
              <span>Production Ready</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[1.1] mb-4 sm:mb-6 px-2"
            >
              <motion.span
                className="bg-gradient-to-r from-blue-600 via-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent inline-block"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                currency-redenomination
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-700 dark:text-slate-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4 font-medium"
            >
              Clean, flexible engine for currency redenomination, formatting, and batch processing.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 mb-8 sm:mb-10 max-w-2xl mx-auto px-4"
            >
              Handle currency transitions seamlessly with TypeScript support and extensible plugins.
            </motion.p>

            {/* Action Buttons - Enhanced */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-12 sm:mb-16 md:mb-20 px-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="primary"
                  href="https://github.com/Teddir/currency-redenomination"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="md"
                  className="w-full sm:w-auto min-w-[140px] bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 dark:from-slate-100 dark:to-slate-200 dark:hover:from-slate-200 dark:hover:to-slate-300"
                  icon={
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                >
                  GitHub
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="secondary"
                  href="https://www.npmjs.com/package/currency-redenomination"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="md"
                  className="w-full sm:w-auto min-w-[140px] bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                  icon={
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M0 7.334v2.4h6.666v1.867H0v2.666h6.666v1.867H0v2.4h24V7.334H0zm8 6.666H6.666v-1.866H8v1.866zm0-4.8H6.666V7.334H8v1.866zm2.666 0h1.334V7.334h-1.334v1.866zm2.667 0h1.333V7.334h-1.333v1.866z" />
                    </svg>
                  }
                >
                  NPM
                </Button>
              </motion.div>
            </motion.div>
          </div>
          <motion.div variants={itemVariants} className="my-10">
            {
              [
                { cmd: 'npm install currency-redenomination', short: 'npm i currency-redenomination', title: 'NPM' },
              ].map((install, idx) => (
                <motion.div
                  key={idx}
                  variants={codeVariants}
                  className="max-w-4xl mx-auto px-4"
                  transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                >
                  <motion.div
                    className="relative group"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.3 }}
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
                          <span className="text-[10px] sm:text-xs font-medium text-slate-400">{install.title}</span>
                        </div>
                      </div>
                      <div className="p-3 sm:p-4 md:p-6">
                        <CodeBlock>{install.cmd}</CodeBlock>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))
            }
          </motion.div>

          {/* Live Code Preview - Enhanced */}
          <motion.div
            variants={codeVariants}
            className="max-w-4xl mx-auto px-4"
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          >
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
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
                    <span className="text-[10px] sm:text-xs font-medium text-slate-400">example.ts</span>
                  </div>
                </div>
                <div className="p-3 sm:p-4 md:p-6">
                  <CodeBlock>{`import { RedenominationEngine, PREDEFINED_RULES } from 'currency-redenomination';

const engine = new RedenominationEngine(PREDEFINED_RULES.indonesia2027);
const result = engine.convertForward(1000000);

console.log(result.amount); // ${indonesiaResult}
console.log(engine.format(result.amount)); // "${indonesiaFormatted}"`}</CodeBlock>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface UseCase {
  title: string;
  description: string;
  icon: string;
}

const useCases: UseCase[] = [
  {
    title: 'Accounting Apps',
    description: 'Update ledgers, balance sheets, and financial records during currency transitions',
    icon: '📊',
  },
  {
    title: 'E-commerce Pricing',
    description: 'Migrate product catalogs and price lists to new currency units',
    icon: '🛒',
  },
  {
    title: 'Database Migrations',
    description: 'Batch convert historical data in databases and data warehouses',
    icon: '💾',
  },
  {
    title: 'UI Formatting',
    description: 'Display currencies with proper symbols, separators, and locale conventions',
    icon: '🎨',
  },
];

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
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

export default function UseCases() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="use-cases" className="relative py-16 sm:py-20 md:py-24 lg:py-28 scroll-mt-20">
      {/* Background decoration */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-purple-50/30 dark:via-purple-950/20 to-transparent"></div>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 text-slate-900 dark:text-slate-100">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                Use Cases
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Real-world applications where currency redenomination is essential
            </p>
          </motion.div>

          {/* Use Cases Grid */}
          <motion.div
            ref={ref}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {useCases.map((useCase, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group relative bg-white dark:bg-slate-800/50 backdrop-blur-sm p-5 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl border border-slate-200/50 dark:border-slate-700/50 hover:border-purple-400/60 dark:hover:border-purple-600/60 transition-all duration-300"
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: '0 20px 40px -12px rgba(147, 51, 234, 0.15)',
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Gradient overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-orange-500/0 rounded-xl sm:rounded-2xl pointer-events-none"
                  whileHover={{
                    background: [
                      'linear-gradient(135deg, rgba(147, 51, 234, 0) 0%, rgba(236, 72, 153, 0) 50%, rgba(249, 115, 22, 0) 100%)',
                      'linear-gradient(135deg, rgba(147, 51, 234, 0.08) 0%, rgba(236, 72, 153, 0.08) 50%, rgba(249, 115, 22, 0.08) 100%)',
                    ],
                  }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative">
                  {/* Icon */}
                  <motion.div
                    className="text-3xl sm:text-4xl mb-3 sm:mb-4"
                    whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {useCase.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    {useCase.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

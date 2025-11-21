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

export default function UseCases() {
  return (
    <section id="use-cases" className="container mx-auto px-4 py-16 scroll-mt-20">
      <h2 className="text-4xl font-bold text-center mb-12 text-slate-900 dark:text-slate-100">
        Use Cases
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {useCases.map((useCase, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl mb-4">{useCase.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">
              {useCase.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400">{useCase.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


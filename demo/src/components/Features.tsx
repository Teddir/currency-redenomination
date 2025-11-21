interface Feature {
  title: string;
  description: string;
  icon: string;
}

const features: Feature[] = [
  {
    title: 'Bidirectional Conversion',
    description: 'Convert old → new and new → old currency seamlessly',
    icon: '↔️',
  },
  {
    title: 'Local & ISO Formatting',
    description: 'Support for local symbols (Rp, ₺) and ISO codes (IDR, TRY)',
    icon: '💱',
  },
  {
    title: 'Batch Processing',
    description: 'Convert arrays and objects in bulk operations',
    icon: '📦',
  },
  {
    title: 'Plugin System',
    description: 'Extensible with rounding, logging, and custom transformers',
    icon: '🔌',
  },
  {
    title: 'Country Rules',
    description: 'Predefined rules for Indonesia, Turkey, Zimbabwe, and more',
    icon: '🌍',
  },
  {
    title: 'Smart Formatting',
    description: 'Hide decimals for whole numbers (Indonesia style)',
    icon: '✨',
  },
  {
    title: 'Full Customization',
    description: 'Custom separators, symbol positions, and locales',
    icon: '🎨',
  },
  {
    title: 'TypeScript',
    description: 'Fully typed with comprehensive type definitions',
    icon: '📘',
  },
];

export default function Features() {
  return (
    <section id="features" className="container mx-auto px-4 py-16 scroll-mt-20">
      <h2 className="text-4xl font-bold text-center mb-12 text-slate-900 dark:text-slate-100">
        Key Features
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-3">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-slate-100">
              {feature.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


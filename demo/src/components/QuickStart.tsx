import CodeBlock from './CodeBlock';

export default function QuickStart() {
  return (
    <section className="container mx-auto px-4 py-16 bg-white dark:bg-slate-800">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-slate-100">Quick Start</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
          Get started in seconds with predefined rules or create your own.
        </p>
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
    </section>
  );
}


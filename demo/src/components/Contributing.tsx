import Button from './Button';

export default function Contributing() {
  return (
    <section className="container mx-auto px-4 py-16 bg-white dark:bg-slate-800">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-slate-100">Contributing</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
          We welcome contributions! Help us expand the database of country redenomination rules.
        </p>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          To add a new country, simply add an entry to the{' '}
          <code className="bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded text-sm font-mono">
            COUNTRY_REDENOMINATIONS
          </code>{' '}
          array in{' '}
          <code className="bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded text-sm font-mono">
            src/rules.ts
          </code>
          .
        </p>
        <Button
          variant="secondary"
          href="#contributing"
          className="bg-blue-600 hover:bg-blue-700"
        >
          View Contribution Guide
        </Button>
      </div>
    </section>
  );
}


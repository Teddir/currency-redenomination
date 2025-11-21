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
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-slate-100">{title}</h3>
      <div className="space-y-3">
        {methods.map((item, idx) => (
          <div
            key={idx}
            className="bg-slate-50 dark:bg-slate-900 p-4 rounded border border-slate-200 dark:border-slate-700"
          >
            <code className="text-blue-600 dark:text-blue-400 font-mono text-sm">{item.method}</code>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function APIOverview() {
  return (
    <section id="api" className="container mx-auto px-4 py-16 bg-white dark:bg-slate-800 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-slate-900 dark:text-slate-100">API Overview</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <APISection title="Engine Methods" methods={engineMethods} />
          <APISection title="Rule Helpers" methods={ruleHelpers} />
          <APISection title="Formatters" methods={formatters} />
          <APISection title="Batch Functions" methods={batchFunctions} />
        </div>
      </div>
    </section>
  );
}


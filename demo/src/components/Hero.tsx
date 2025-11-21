import CodeBlock from './CodeBlock';
import Button from './Button';

interface HeroProps {
  indonesiaResult: number;
  indonesiaFormatted: string;
}

export default function Hero({ indonesiaResult, indonesiaFormatted }: HeroProps) {
  return (
    <section id="hero" className="container mx-auto px-4 pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-5xl mx-auto">
        {/* Hero Content */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-full text-sm text-blue-700 dark:text-blue-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span>Production Ready</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              currency-redenomination
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-4 max-w-3xl mx-auto leading-relaxed">
            Clean, flexible engine for currency redenomination, formatting, and batch processing. Handle currency transitions seamlessly with TypeScript support and extensible plugins.
          </p>

          {/* Install Commands - Modern Design */}
          <div className="my-10">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
              Install
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              <div className="group relative">
                <Button
                  variant="install"
                  onClick={() => navigator.clipboard.writeText('npm install currency-redenomination')}
                  className="relative"
                >
                  <span className="text-slate-400 mr-2">$</span>
                  npm install currency-redenomination
                </Button>
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  Click to copy
                </span>
              </div>
              <div className="group relative">
                <Button
                  variant="install"
                  onClick={() => navigator.clipboard.writeText('yarn add currency-redenomination')}
                >
                  <span className="text-slate-400 mr-2">$</span>
                  yarn add currency-redenomination
                </Button>
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  Click to copy
                </span>
              </div>
              <div className="group relative">
                <Button
                  variant="install"
                  onClick={() => navigator.clipboard.writeText('pnpm add currency-redenomination')}
                >
                  <span className="text-slate-400 mr-2">$</span>
                  pnpm add currency-redenomination
                </Button>
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  Click to copy
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons - Enhanced */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-16">
            <div className="group">
              <Button
                variant="primary"
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
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
                <svg
                  className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Button>
            </div>
            <div className="group">
              <Button
                variant="secondary"
                href="https://www.npmjs.com/package/currency-redenomination"
                target="_blank"
                rel="noopener noreferrer"
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
                View on NPM
                <svg
                  className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>

        {/* Live Code Preview - Enhanced */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Decorative gradient background */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-20 dark:opacity-10"></div>
            <div className="relative bg-slate-900 rounded-xl p-1 shadow-2xl">
              {/* Code block header */}
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-t-lg border-b border-slate-700">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs font-medium text-slate-400">example.ts</span>
                </div>
              </div>
              <CodeBlock>{`import { RedenominationEngine, PREDEFINED_RULES } from 'currency-redenomination';

const engine = new RedenominationEngine(PREDEFINED_RULES.indonesia2027);
const result = engine.convertForward(1000000);

console.log(result.amount); // ${indonesiaResult}
console.log(engine.format(result.amount)); // "${indonesiaFormatted}"`}</CodeBlock>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


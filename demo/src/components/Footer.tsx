export default function Footer() {
  return (
    <footer className="container mx-auto px-4 py-8 border-t border-slate-200 dark:border-slate-700">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-slate-600 dark:text-slate-400">
        <div className="mb-4 md:mb-0">
          <p>MIT License</p>
        </div>
        <div className="flex gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/currency-redenomination"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
          >
            NPM
          </a>
        </div>
      </div>
    </footer>
  );
}


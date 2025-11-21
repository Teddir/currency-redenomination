import { useState } from 'react';
import CodeBlock from './CodeBlock';

interface ExampleCardProps {
  title: string;
  description: string;
  code: string;
  result?: string;
}

export default function ExampleCard({ title, description, code, result }: ExampleCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 mb-4">{description}</p>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium mb-2"
      >
        {expanded ? '▼ Hide code' : '▶ Show code'}
      </button>
      {expanded && (
        <div className="mt-4">
          <CodeBlock>{code}</CodeBlock>
          {result && (
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
              <p className="text-sm text-green-800 dark:text-green-300 font-mono">{result}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


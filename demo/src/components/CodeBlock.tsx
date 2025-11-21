import { useState } from 'react';

interface CodeBlockProps {
  children: string;
}

export default function CodeBlock({ children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="bg-slate-950 text-slate-100 p-6 rounded-b-lg overflow-x-auto text-sm font-mono leading-relaxed">
        <code className="text-slate-100">{children}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-md text-xs font-medium shadow-lg hover:shadow-xl"
      >
        {copied ? (
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Copied
          </span>
        ) : (
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy
          </span>
        )}
      </button>
    </div>
  );
}


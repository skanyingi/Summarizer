'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';

const defaultSummary = {
  title: 'Document Summary',
  summary: 'Processing results will appear here.',
  insights: ['Key insights will be extracted during processing.'],
  metadata: {
    filingDate: 'N/A',
    leadAnalyst: 'AI Engine',
    totalLiabilities: 'N/A',
    confidenceScore: 0,
  },
};

function SummaryContent() {
  const searchParams = useSearchParams();
  const fileName = searchParams.get('file') || 'Document.pdf';
  const [data, setData] = useState(defaultSummary);

  useEffect(() => {
    const savedData = sessionStorage.getItem('last_summary');
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (e) {
        console.error('Failed to parse saved summary', e);
      }
    }
  }, []);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'summary-' + data.title.toLowerCase().replace(/\//g, '-') + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="md:ml-64 flex-1">
        <TopBar />
        <section className="flex flex-col lg:flex-row flex-1 overflow-hidden p-6 gap-6">
          <div className="lg:w-5/12 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-500 tracking-wider uppercase">
                Document Preview
              </span>
              <div className="flex gap-2">
                <button className="p-1.5 rounded-md hover:bg-gray-100 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                  </svg>
                </button>
                <button className="p-1.5 rounded-md hover:bg-gray-100 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="bg-gray-100 rounded-xl flex-1 relative overflow-hidden flex items-center justify-center p-8">
              <div className="w-full max-w-md aspect-[3/4] bg-white shadow-lg rounded-sm relative p-12 overflow-hidden">
                <div className="space-y-4 opacity-40">
                  <div className="h-4 bg-gray-200 w-3/4 rounded-sm" />
                  <div className="h-2 bg-gray-200 w-full rounded-sm" />
                  <div className="h-2 bg-gray-200 w-5/6 rounded-sm" />
                  <div className="h-2 bg-gray-200 w-full rounded-sm" />
                  <div className="mt-12 h-32 bg-gray-100 w-full rounded-sm" />
                  <div className="h-2 bg-gray-200 w-full rounded-sm" />
                  <div className="h-2 bg-gray-200 w-4/6 rounded-sm" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <svg className="w-16 h-16 text-blue-800 opacity-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 2a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h2zm6 0a2 2 0 012 2v12a2 2 0 01-2 2h-2a2 2 0 01-2-2V4a2 2 0 012-2h2z" />
                    </svg>
                    <span className="text-xs text-gray-400 font-medium max-w-[150px] text-center">
                      {fileName}
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xl px-4 py-2 rounded-full shadow-lg flex gap-6">
                <button className="text-blue-800 opacity-30 hover:opacity-50">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="text-sm font-medium text-gray-700">Page 1 of 1</span>
                <button className="text-blue-800 opacity-30 hover:opacity-50">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:w-7/12 flex flex-col gap-6">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm">✨</span>
                <span className="text-xs font-bold text-blue-800 tracking-widest uppercase">
                  Executive Summary
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                {data.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {data.summary}
              </p>
              <button
                onClick={handleExport}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Export Summary
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col gap-4">
                <h3 className="text-sm font-bold text-gray-900 tracking-tight border-b border-gray-200 pb-3">
                  Key Insights
                </h3>
                <ul className="space-y-4">
                  {(data.insights || []).map((insight, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-800 mt-1.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">
                        {insight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col gap-4">
                <h3 className="text-sm font-bold text-gray-900 tracking-tight border-b border-gray-200 pb-3">
                  Extracted Metadata
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 font-medium">
                      Analysis Date
                    </span>
                    <span className="text-sm font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">
                      {data.metadata?.filingDate || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 font-medium">
                      Lead Analyst
                    </span>
                    <span className="text-sm font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">
                      {data.metadata?.leadAnalyst || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 font-medium">
                      Est. Value
                    </span>
                    <span className="text-sm font-bold text-blue-800 bg-blue-100 px-2 py-1 rounded">
                      {data.metadata?.totalLiabilities || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 font-medium">
                      Confidence Score
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${(data.metadata?.confidenceScore || 0) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-gray-900">
                        {Math.round((data.metadata?.confidenceScore || 0) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function SummaryPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <SummaryContent />
    </Suspense>
  );
}

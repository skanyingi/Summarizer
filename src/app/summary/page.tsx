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
    a.download = `summary-${data.title.toLowerCase().replace(/\//g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className='flex min-h-screen'>
      <Sidebar />
      <main className='md:ml-64 flex-1'>
        <TopBar />
        <section className='flex flex-col lg:flex-row flex-1 overflow-hidden p-6 gap-6'>
          <div className='lg:w-5/12 flex flex-col gap-4'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-xs font-bold text-gray-500 tracking-wider uppercase'>
                Document Preview
              </span>
              <div className='flex gap-2'>
                <button className='p-1.5 rounded-md hover:bg-gray-100 transition-colors'>
                  <span className='material-symbols-outlined text-sm'>zoom_in</span>
                </button>
                <button className='p-1.5 rounded-md hover:bg-gray-100 transition-colors'>
                  <span className='material-symbols-outlined text-sm'>zoom_out</span>
                </button>
              </div>
            </div>
            <div className='bg-gray-100 rounded-xl flex-1 relative overflow-hidden flex items-center justify-center p-8'>
              <div className='w-full max-w-md aspect-[3/4] bg-white shadow-lg rounded-sm relative p-12 overflow-hidden'>
                <div className='space-y-4 opacity-40'>
                  <div className='h-4 bg-gray-200 w-3/4 rounded-sm' />
                  <div className='h-2 bg-gray-200 w-full rounded-sm' />
                  <div className='h-2 bg-gray-200 w-5/6 rounded-sm' />
                  <div className='h-2 bg-gray-200 w-full rounded-sm' />
                  <div className='mt-12 h-32 bg-gray-100 w-full rounded-sm' />
                  <div className='h-2 bg-gray-200 w-full rounded-sm' />
                  <div className='h-2 bg-gray-200 w-4/6 rounded-sm' />
                </div>
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='flex flex-col items-center gap-4'>
                    <span className='material-symbols-outlined text-6xl text-blue-800/10'>
                      picture_as_pdf
                    </span>
                    <span className='text-xs text-gray-400 font-medium max-w-[150px] text-center'>
                      {fileName}
                    </span>
                  </div>
                </div>
              </div>
              <div className='absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xl px-4 py-2 rounded-full shadow-lg flex gap-6'>
                <span className='material-symbols-outlined text-blue-800 cursor-pointer opacity-30'>
                  arrow_back
                </span>
                <span className='text-sm font-medium text-gray-700'>Page 1 of ?</span>
                <span className='material-symbols-outlined text-blue-800 cursor-pointer opacity-30'>
                  arrow_forward
                </span>
              </div>
            </div>
          </div>

          <div className='lg:w-7/12 flex flex-col gap-6'>
            <div className='bg-white rounded-xl p-8 shadow-lg'>
              <div className='flex items-center gap-2 mb-4'>
                <span className='material-symbols-outlined text-blue-800'>
                  auto_awesome
                </span>
                <span className='text-xs font-bold text-blue-800 tracking-widest uppercase'>
                  Executive Summary
                </span>
              </div>
              <h2 className='text-2xl font-bold text-gray-900 mb-4 leading-tight'>
                {data.title}
              </h2>
              <p className='text-gray-600 leading-relaxed'>
                {data.summary}
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='bg-white rounded-xl p-6 shadow-lg flex flex-col gap-4'>
                <h3 className='text-sm font-bold text-gray-900 tracking-tight border-b border-gray-200 pb-3'>
                  Key Insights
                </h3>
                <ul className='space-y-4'>
                  {(data.insights || []).map((insight, i) => (
                    <li key={i} className='flex gap-3 items-start'>
                      <span className='w-1.5 h-1.5 rounded-full bg-blue-800 mt-1.5 flex-shrink-0' />
                      <span className='text-sm text-gray-600'>
                        {insight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className='bg-white rounded-xl p-6 shadow-lg flex flex-col gap-4'>
                <h3 className='text-sm font-bold text-gray-900 tracking-tight border-b border-gray-200 pb-3'>
                  Extracted Metadata
                </h3>
                <div className='space-y-4'>
                  <div className='flex justify-between items-center group'>
                    <span className='text-xs text-gray-500 font-medium'>
                      Analysis Date
                    </span>
                    <span className='text-sm font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded'>
                      {data.metadata?.filingDate || 'N/A'}
                    </span>
                  </div>
                  <div className='flex justify-between items-center group'>
                    <span className='text-xs text-gray-500 font-medium'>
                      Lead Analyst
                    </span>
                    <span className='text-sm font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded'>
                      {data.metadata?.leadAnalyst || 'N/A'}
                    </span>
                  </div>
                  <div className='flex justify-between items-center group'>
                    <span className='text-xs text-gray-500 font-medium'>
                      Est. Value
                    </span>
                    <span className='text-sm font-bold text-blue-800 bg-blue-100 px-2 py-1 rounded'>
                      {data.metadata?.totalLiabilities || 'N/A'}
                    </span>
                  </div>
                  <div className='flex justify-between items-center group'>
                    <span className='text-xs text-gray-500 font-medium'>
                      Confidence Score
                    </span>
                    <div className='flex items-center gap-2'>
                      <div className='w-16 h-1 bg-gray-200 rounded-full overflow-hidden'>
                        <div
                          className='h-full bg-blue-800'
                          style={{
                            width: `${data.metadata?.confidenceScore || 0}%`,
                          }}
                        />
                      <

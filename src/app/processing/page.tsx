'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

function ProcessingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const fileName = searchParams.get('file') || 'Document.pdf';
  
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const hasStarted = useRef(false);
  
  const stages = [
    { name: 'Extracting text', message: 'OCR scanning document pages...', done: false },
    { name: 'Analyzing content', message: 'Identifying key sections and entities...', done: false },
    { name: 'Generating summary', message: 'Synthesizing document narrative...', done: false },
    { name: 'Finalizing', message: 'Structuring insights for export...', done: false },
  ];

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const processDocument = async () => {
      try {
        const { fileStore } = await import('@/lib/store');
        const file = fileStore.getFile();
        
        if (!file) {
          setError('No file found to process. Please try uploading again.');
          return;
        }

        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 90) return prev;
            const newProgress = prev + Math.random() * 2;
            const stageIndex = Math.min(Math.floor(newProgress / 25), 3);
            setStage(stageIndex);
            return newProgress;
          });
        }, 500);

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/process', {
          method: 'POST',
          body: formData,
        });

        clearInterval(progressInterval);

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Processing failed');
        }

        const result = await response.json();
        
        setProgress(100);
        setStage(3);
        
        sessionStorage.setItem('last_summary', JSON.stringify(result));

        const history = JSON.parse(localStorage.getItem('summary_history') || '[]');
        history.unshift({
          id: Date.now().toString(),
          name: fileName,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          size: (file.size / 1024 / 1024).toFixed(1) + ' MB',
          status: 'completed',
          category: result.title?.includes('Financial') ? 'Finance' : 'General',
          insight: result.insights?.[0],
          fullData: result
        });
        localStorage.setItem('summary_history', JSON.stringify(history));

        setTimeout(() => {
          router.push(`/summary?file=${encodeURIComponent(fileName)}`);
        }, 800);

      } catch (err: any) {
        console.error('Processing error:', err);
        setError(err.message || 'An unexpected error occurred');
      }
    };

    processDocument();
  }, [fileName, router]);

  return (
    <div className=\"flex min-h-screen\">
      <Sidebar />
      <main className=\"md:ml-64 min-h-screen relative flex flex-col items-center justify-center p-8 w-full\">
        <div className=\"max-w-4xl w-full flex flex-col items-center gap-12\">
          {error ? (
            <div className=\"bg-red-50 border border-red-200 p-8 rounded-xl text-center max-w-md\">
              <span className=\"material-symbols-outlined text-red-500 text-5xl mb-4\">error</span>
              <h2 className=\"text-xl font-bold text-red-900 mb-2\">Processing Error</h2>
              <p className=\"text-red-700 mb-6\">{error}</p>
              <button 
                onClick={() => router.push('/upload')}
                className=\"bg-red-600 text-white px-6 py-2 rounded-lg font-medium\"
              >
                Go Back
              </button>
            </div>
          ) : (
            <div className=\"w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center\">
              <div className=\"md:col-span-5\">
                <div className=\"bg-white rounded-xl shadow-lg p-1 overflow-hidden\">
                  <div className=\"aspect-[3/4] bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden\">
                    <div className=\"absolute top-0 left-0 w-full h-1 bg-blue-600 shadow-[0_0_15px_rgba(0,52,97,0.5)] animate-pulse\" />
                    <div className=\"absolute inset-0 flex items-center justify-center pointer-events-none\">
                      <div className=\"bg-white/90 p-6 rounded-full shadow-lg\">
                        <span className=\"material-symbols-outlined text-blue-800 text-5xl\">description</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className=\"md:col-span-7 flex flex-col gap-6\">
                <div className=\"space-y-2\">
                  <span className=\"text-xs font-semibold uppercase tracking-wider text-blue-800\">
                    AI Processing
                  </span>
                  <h2 className=\"text-3xl font-bold text-gray-900 leading-tight\">
                    {fileName}
                  </h2>
                  <p className=\"text-gray-600\">
                    Engaging AI Engine...
                  </p>
                </div>

                <div className=\"space-y-3\">
                  <div className=\"flex justify-between items-end\">
                    <span className=\"text-sm font-medium text-blue-800\">
                      {stages[stage]?.name || 'Complete'}
                    </span>
                    <span className=\"text-lg font-bold text-blue-800\">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className=\"h-3 w-full bg-gray-200 rounded-full overflow-hidden\">
                    <div
                      className=\"h-full bg-gradient-to-r from-blue-700 to-blue-800 transition-all duration-700\"
                      style={{ width: progress + '%' }}
                    />
                  </div>
                </div>

                <div className=\"flex flex-col gap-4 mt-2\">
                  {stages.map((s, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-4 p-4 rounded-xl shadow-sm border-l-4 transition-all ${
                        i < stage
                          ? 'bg-white border-blue-800'
                          : i === stage
                          ? 'bg-white border-blue-800/50'
                          : 'bg-white border-gray-200 opacity-50'
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined ${
                          i < stage ? 'text-green-600' : 'text-blue-800'
                        }`}
                      >
                        {i < stage ? 'check_circle' : 'sync'}
                      </span>
                      <div className=\"flex-1\">
                        <p className=\"text-sm font-semibold text-gray-900\">
                          {s.name}
                        </p>
                        <p className=\"text-xs text-gray-500\">
                          {s.message}
                        </p>
                      </div>
                      {i < stage && (
                        <span className=\"material-symbols-outlined text-green-600\">
                          check_circle
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!error && (
            <div className=\"fixed bottom-12 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xl py-3 px-6 rounded-full sha

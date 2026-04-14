'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

function ProcessingContent() {
  const searchParams = useSearchParams();
  const [fileName, setFileName] = useState('');
  const [isProcessing, setIsProcessing] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const file = searchParams.get('file');
    if (file) {
      setFileName(file);
    }

    // Simulate processing
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsProcessing(false);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [searchParams]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="md:ml-64 min-h-screen relative flex flex-col items-center justify-center p-8 w-full bg-gray-50">
        <div className="max-w-2xl w-full flex flex-col items-center gap-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Processing Document
            </h1>
            <p className="text-gray-600">
              {fileName || 'Your document'}
            </p>
          </div>

          <div className="w-full bg-white rounded-xl p-8 shadow-lg">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {isProcessing ? 'Processing...' : 'Complete'}
                </span>
                <span className="text-sm font-medium text-gray-600">
                  {Math.min(100, Math.round(progress))}%
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, progress)}%` }}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Document Uploaded</p>
                  <p className="text-xs text-gray-500">File received and validated</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${progress > 25 ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  {progress > 25 ? (
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Extracting Text</p>
                  <p className="text-xs text-gray-500">OCR and content parsing</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${progress > 50 ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  {progress > 50 ? (
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Analyzing Content</p>
                  <p className="text-xs text-gray-500">AI semantic analysis in progress</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${progress > 75 ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  {progress > 75 ? (
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Generating Summary</p>
                  <p className="text-xs text-gray-500">Creating insights and metadata</p>
                </div>
              </div>
            </div>
          </div>

          {!isProcessing && (
            <div className="w-full">
              <a
                href="/summary"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium text-center transition-colors"
              >
                View Summary
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function ProcessingPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <ProcessingContent />
    </Suspense>
  );
}

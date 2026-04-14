"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

export default function UploadPage() {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsProcessing(true);
    
    // Store the file globally for the processing page to pick up
    const { fileStore } = await import("@/lib/store");
    fileStore.setFile(file);

    // Give it a brief moment for the progress bar animation
    for (let i = 0; i <= 100; i += 20) {
      setUploadProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    router.push(`/processing?file=${encodeURIComponent(file.name)}`);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="md:ml-64 flex-1">
        <TopBar />
        <section className="max-w-6xl mx-auto p-8 md:p-12">
          <div className="mb-12">
            <h2 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight mb-2">
              Upload Document
            </h2>
            <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed">
              Upload your PDF document for AI-powered summarization and insight extraction.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="bg-surface-container-low rounded-xl p-1 shadow-sm">
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl bg-surface-container-lowest p-12 text-center flex flex-col items-center justify-center min-h-[400px] transition-all ${
                    isDragging
                      ? "bg-primary-fixed/10 border-primary"
                      : "border-outline/30"
                  }`}
                >
                  {file ? (
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 bg-primary-container rounded-full flex items-center justify-center text-on-primary mb-6 editorial-shadow">
                        <span className="material-symbols-outlined text-4xl">picture_as_pdf</span>
                      </div>
                      <h3 className="font-headline text-xl font-bold text-on-surface mb-2">
                        {file.name}
                      </h3>
                      <p className="text-on-surface-variant mb-8">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <button
                        onClick={() => setFile(null)}
                        className="text-primary font-medium text-sm hover:underline"
                      >
                        Remove file
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="w-20 h-20 signature-gradient rounded-full flex items-center justify-center text-on-primary mb-6 editorial-shadow group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-4xl">upload_file</span>
                      </div>
                      <h3 className="font-headline text-2xl font-bold text-on-surface mb-2">
                        Drop your PDF here
                      </h3>
                      <p className="text-on-surface-variant max-w-sm mb-8">
                        or click to browse from your computer
                      </p>
                      <label className="signature-gradient text-on-primary px-8 py-3 rounded-md font-semibold editorial-shadow flex items-center gap-2 cursor-pointer">
                        <input
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={handleFileSelect}
                        />
                        Browse Files
                      </label>
                      <p className="mt-8 text-xs font-label uppercase tracking-widest text-outline">
                        Supported format: PDF (Max 500MB)
                      </p>
                    </>
                  )}
                </div>
              </div>

              {isProcessing && (
                <div className="mt-6 bg-surface-container-lowest rounded-xl p-6">
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-label text-sm font-medium text-primary">
                      Uploading...
                    </span>
                    <span className="font-headline text-lg font-bold text-primary">
                      {uploadProgress}%
                    </span>
                  </div>
                  <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div
                      className="h-full signature-gradient transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-surface-container-lowest rounded-xl p-6 editorial-shadow border border-outline-variant/10">
                <h4 className="font-headline text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    auto_awesome
                  </span>
                  Processing Pipeline
                </h4>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <span className="w-6 h-6 rounded-full bg-primary-fixed text-primary text-[10px] flex items-center justify-center font-bold shrink-0">
                      01
                    </span>
                    <div>
                      <p className="text-sm font-bold text-on-surface">
                        OCR Extraction
                      </p>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        High-accuracy character recognition.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-6 h-6 rounded-full bg-primary-fixed text-primary text-[10px] flex items-center justify-center font-bold shrink-0">
                      02
                    </span>
                    <div>
                      <p className="text-sm font-bold text-on-surface">
                        Semantic Analysis
                      </p>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        AI classifies content and extracts entities.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-6 h-6 rounded-full bg-primary-fixed text-primary text-[10px] flex items-center justify-center font-bold shrink-0">
                      03
                    </span>
                    <div>
                      <p className="text-sm font-bold text-on-surface">
                        Insight Generation
                      </p>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Summary and key insights extraction.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <button
                onClick={handleUpload}
                disabled={!file || isProcessing}
                className={`w-full py-4 signature-gradient text-on-primary rounded-xl font-semibold editorial-shadow flex items-center justify-center gap-2 ${
                  !file || isProcessing ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <span className="material-symbols-outlined">bolt</span>
                {isProcessing ? "Processing..." : "Start Processing"}
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
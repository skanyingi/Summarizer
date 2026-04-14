"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

export default function LibraryPage() {
  const router = useRouter();
  const [documents, setDocuments] = useState<any[]>([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("summary_history") || "[]");
    setDocuments(history);
  }, []);

  const handleViewAnalysis = (doc: any) => {
    sessionStorage.setItem("last_summary", JSON.stringify(doc.fullData));
    router.push(`/summary?file=${encodeURIComponent(doc.name)}`);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="md:ml-64 flex-1">
        <TopBar />
        <section className="p-8 md:p-12 max-w-7xl w-full mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <h2 className="font-headline font-extrabold text-4xl tracking-tight text-on-surface mb-4">
                Library
              </h2>
              <p className="text-on-surface-variant font-body leading-relaxed">
                Access and manage your precision-processed document history.
              </p>
            </div>
          </div>

          {documents.length === 0 ? (
            <div className="bg-surface-container-low border-2 border-dashed border-outline/20 rounded-2xl p-20 text-center">
              <span className="material-symbols-outlined text-6xl text-outline/30 mb-4">inventory_2</span>
              <h3 className="text-xl font-bold text-on-surface mb-2">No Documents Processed</h3>
              <p className="text-on-surface-variant mb-8">Process a document to see it in your library.</p>
              <a href="/upload" className="signature-gradient text-on-primary px-8 py-3 rounded-xl font-semibold inline-block">
                Start Ingestion
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((doc) => (
                <article
                  key={doc.id}
                  className="bg-surface-container-lowest p-6 rounded-xl hover:shadow-xl hover:shadow-on-surface/5 transition-all duration-300 flex flex-col group"
                >
                  <div className="mb-6 w-12 h-12 bg-secondary-container rounded-lg flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-2xl">description</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-headline font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                      {doc.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-outline mb-4">
                      <span className="material-symbols-outlined text-sm">
                        calendar_today
                      </span>
                      {doc.date}
                      <span className="mx-1 opacity-30">•</span>
                      {doc.size}
                    </div>
                    <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3 italic">
                      {doc.insight}
                    </p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-outline-variant/10 flex justify-between items-center">
                    <button 
                      onClick={() => handleViewAnalysis(doc)}
                      className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      View Analysis
                      <span className="material-symbols-outlined text-sm">
                        arrow_forward
                      </span>
                    </button>
                    <span className="text-xs font-label text-on-surface-variant bg-surface-container-highest px-2 py-0.5 rounded-full uppercase tracking-tighter">
                      {doc.category}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

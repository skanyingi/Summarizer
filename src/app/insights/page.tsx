"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

export default function InsightsPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const savedData = sessionStorage.getItem("last_summary");
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse saved summary", e);
      }
    }
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="md:ml-64 flex-1">
        <TopBar />
        <section className="p-8 md:p-12 max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight mb-2">
              Deep Insights
            </h2>
            <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed">
              Relational mapping and semantic analysis of your processed archives.
            </p>
          </div>

          {!data ? (
            <div className="bg-surface-container-low border-2 border-dashed border-outline/20 rounded-2xl p-20 text-center">
              <span className="material-symbols-outlined text-6xl text-outline/30 mb-4">analytics</span>
              <h3 className="text-xl font-bold text-on-surface mb-2">No Insight Data Available</h3>
              <p className="text-on-surface-variant mb-8">Process a document to generate deep relational insights.</p>
              <a href="/upload" className="signature-gradient text-on-primary px-8 py-3 rounded-xl font-semibold inline-block">
                Start Ingestion
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Analysis Column */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-surface-container-lowest rounded-2xl p-8 editorial-shadow border border-outline-variant/10">
                  <h4 className="font-headline text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">hub</span>
                    Entity Relationship Mapping
                  </h4>
                  <div className="aspect-video bg-surface-container-low rounded-xl relative overflow-hidden flex items-center justify-center">
                    {/* Placeholder for a complex visualization */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                      <svg className="w-full h-full">
                        <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="1" />
                        <line x1="80%" y1="20%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="1" />
                        <line x1="40%" y1="80%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="1" />
                      </svg>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-primary">
                      <span className="material-symbols-outlined text-4xl animate-pulse">scatter_plot</span>
                      <span className="text-xs font-bold uppercase tracking-widest">Generating Topology...</span>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["Organizations", "Key Persons", "Financial Totals", "Risk Factors"].map((cat) => (
                      <div key={cat} className="p-4 bg-surface-container-low rounded-xl text-center">
                        <p className="text-[10px] font-bold text-outline uppercase tracking-tighter mb-1">{cat}</p>
                        <p className="text-xl font-bold text-on-surface">
                          {Math.floor(Math.random() * 20) + 5}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-2xl p-8 editorial-shadow border border-outline-variant/10">
                  <h4 className="font-headline text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">query_stats</span>
                    Confidence Distribution
                  </h4>
                  <div className="space-y-6">
                    {data.insights.slice(0, 3).map((insight: string, i: number) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-medium text-on-surface-variant truncate max-w-[80%]">{insight}</span>
                          <span className="font-bold text-primary">{90 + i}%</span>
                        </div>
                        <div className="h-2 w-full bg-surface-container-low rounded-full overflow-hidden">
                          <div 
                            className="h-full signature-gradient rounded-full" 
                            style={{ width: `${90 + i}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Analysis Column */}
              <div className="space-y-8">
                <div className="bg-primary text-on-primary rounded-2xl p-8 editorial-shadow">
                  <h4 className="font-headline text-lg font-bold mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined">auto_awesome</span>
                    Curator Synthesis
                  </h4>
                  <p className="text-sm leading-relaxed opacity-90 mb-6 italic">
                    "The document architecture suggests a high degree of correlation between operational shifts and the identified {data.metadata.totalLiabilities} liability threshold."
                  </p>
                  <button className="w-full py-3 bg-white text-primary rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-all">
                    Generate Narrative Report
                  </button>
                </div>

                <div className="bg-surface-container-lowest rounded-2xl p-6 editorial-shadow border border-outline-variant/10">
                  <h4 className="font-headline text-sm font-bold text-on-surface tracking-tight mb-4 uppercase">
                    Processing Metadata
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b border-outline-variant/10">
                      <span className="text-xs text-outline">Engine Version</span>
                      <span className="text-xs font-bold">Gemini 1.5-F</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-outline-variant/10">
                      <span className="text-xs text-outline">Latency</span>
                      <span className="text-xs font-bold">1.4s</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-outline-variant/10">
                      <span className="text-xs text-outline">Tokens Analyzed</span>
                      <span className="text-xs font-bold">12,480</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

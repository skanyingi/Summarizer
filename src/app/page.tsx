import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="md:ml-64 flex-1">
        <TopBar />
        <section className="max-w-6xl mx-auto p-8 md:p-12">
          <div className="mb-12">
            <h2 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight mb-2">
              Knowledge Ingestion
            </h2>
            <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed">
              Upload your legal briefs, financial reports, or technical manuscripts.
              Our AI curator will architect the data for precision analysis.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <div className="bg-surface-container-low rounded-xl p-1 shadow-sm">
                <a
                  href="/upload"
                  className="border-2 border-dashed border-outline/30 rounded-xl bg-surface-container-lowest p-12 text-center flex flex-col items-center justify-center min-h-[400px] transition-all hover:bg-primary-fixed/10 group cursor-pointer block"
                >
                  <div className="w-20 h-20 signature-gradient rounded-full flex items-center justify-center text-on-primary mb-6 editorial-shadow group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-4xl">upload_file</span>
                  </div>
                  <h3 className="font-headline text-2xl font-bold text-on-surface mb-2">
                    Drop your PDF archives here
                  </h3>
                  <p className="text-on-surface-variant max-w-sm mb-8">
                    Secure, encrypted ingestion of high-fidelity documents for
                    intelligent parsing.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <button className="signature-gradient text-on-primary px-8 py-3 rounded-md font-semibold editorial-shadow flex items-center gap-2">
                      Browse Files
                    </button>
                  </div>
                  <p className="mt-8 text-xs font-label uppercase tracking-widest text-outline">
                    Supported formats: PDF, DOCX, XLSX (Max 500MB)
                  </p>
                </a>
              </div>
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
                        High-accuracy character recognition including handwriting
                        and complex tables.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-6 h-6 rounded-full bg-primary-fixed text-primary text-[10px] flex items-center justify-center font-bold shrink-0">
                      02
                    </span>
                    <div>
                      <p className="text-sm font-bold text-on-surface">Semantic Tagging</p>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        AI automatically classifies content and extracts key entities
                        and metadata.
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
                        Summary reports and relational mapping for your library
                        visualization.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-tertiary-fixed rounded-xl p-6 editorial-shadow">
                <h4 className="font-headline text-on-tertiary-fixed font-bold mb-2">
                  Curator Tip
                </h4>
                <p className="text-sm text-on-tertiary-fixed-variant leading-relaxed">
                  For best results with complex financial tables, ensure documents are
                  scanned at 300dpi or higher.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
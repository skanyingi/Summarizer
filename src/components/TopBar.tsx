"use client";

export default function TopBar() {
  return (
    <header className="flex justify-between items-center px-6 w-full z-40 h-16 sticky top-0 bg-white/80 backdrop-blur-xl shadow-sm border-b-0">
      <div className="flex items-center gap-4">
        <div className="md:hidden">
          <span className="material-symbols-outlined text-primary">menu</span>
        </div>
        <div className="relative hidden sm:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">
            search
          </span>
          <input
            className="bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-sm w-64 focus:ring-2 focus:ring-primary-fixed-dim transition-all"
            placeholder="Search archives..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 text-outline hover:bg-surface-container-low rounded-full transition-colors active:scale-95">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="p-2 text-outline hover:bg-surface-container-low rounded-full transition-colors active:scale-95">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <div className="h-8 w-8 rounded-full bg-secondary-container overflow-hidden">
          <div className="w-full h-full bg-primary/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-sm">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}
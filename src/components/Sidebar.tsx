"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", icon: "dashboard", label: "Dashboard" },
  { href: "/library", icon: "auto_stories", label: "Library" },
  { href: "/processing", icon: "memory", label: "Processing" },
  { href: "/insights", icon: "analytics", label: "Insights" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col py-8 px-4 h-screen w-64 fixed left-0 top-0 bg-surface z-50">
      <div className="mb-10 px-2">
        <h1 className="font-headline font-extrabold text-primary text-2xl tracking-tight">
          The Curator
        </h1>
        <p className="font-label text-xs font-medium tracking-wide text-secondary uppercase mt-1">
          Precision Ledger
        </p>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 py-3 px-4 rounded-lg font-medium transition-all ${
                isActive
                  ? "bg-white text-primary shadow-sm"
                  : "text-outline hover:translate-x-1"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-body text-sm tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-6 space-y-2">
        <Link
          href="/upload"
          className="w-full py-3 signature-gradient text-on-primary rounded-xl font-semibold editorial-shadow flex items-center justify-center gap-2 active:scale-95 duration-150"
        >
          <span className="material-symbols-outlined">add</span>
          New Document
        </Link>
        <Link
          href="/support"
          className="flex items-center gap-3 py-3 px-4 text-outline hover:translate-x-1 transition-transform duration-200"
        >
          <span className="material-symbols-outlined">help_outline</span>
          <span className="font-body text-sm font-medium tracking-wide">Support</span>
        </Link>
        <Link
          href="/signout"
          className="flex items-center gap-3 py-3 px-4 text-outline hover:translate-x-1 transition-transform duration-200"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="font-body text-sm font-medium tracking-wide">Sign Out</span>
        </Link>
      </div>
    </aside>
  );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", icon: "dashboard", label: "Home" },
  { href: "/library", icon: "auto_stories", label: "Library" },
  { href: "/upload", icon: "add", label: "Upload", primary: true },
  { href: "/processing", icon: "memory", label: "Process" },
  { href: "/insights", icon: "analytics", label: "Insights" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-xl flex items-center justify-around border-t border-outline-variant/10 z-40">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const isPrimary = item.primary;
        
        if (isPrimary) {
          return (
            <Link
              key={item.href}
              href={item.href}
              className="-mt-8 w-14 h-14 bg-primary rounded-full flex items-center justify-center text-on-primary shadow-lg"
            >
              <span className="material-symbols-outlined text-2xl">{item.icon}</span>
            </Link>
          );
        }
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 ${
              isActive ? "text-primary" : "text-outline"
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function IconHome({ active }: { active?: boolean }) {
  return active ? (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33z" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 21V12h6v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconSearch({ active }: { active?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" strokeLinecap="round" />
      <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconLibrary({ active }: { active?: boolean }) {
  return active ? (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path fillRule="evenodd" d="M3 22V2h2v20H3zm4-14v14h2V8H7zm4 6v8h2v-8h-2zm4-10v18h2V4h-2z" clipRule="evenodd" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" opacity={0.7}>
      <path fillRule="evenodd" d="M3 22V2h2v20H3zm4-14v14h2V8H7zm4 6v8h2v-8h-2zm4-10v18h2V4h-2z" clipRule="evenodd" />
    </svg>
  );
}

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/",        label: "Home",      Icon: IconHome },
    { href: "/search",  label: "Tìm kiếm",  Icon: IconSearch },
    { href: "/library", label: "Thư viện",  Icon: IconLibrary },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[60px] bg-black/90 backdrop-blur-md border-t border-white/10 flex items-center justify-around z-40 pb-safe">
      {navItems.map(({ href, label, Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 ${
              active ? "text-white" : "text-[var(--text-secondary)] hover:text-white"
            }`}
          >
            <Icon active={active} />
            <span className="text-[10px] font-medium">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

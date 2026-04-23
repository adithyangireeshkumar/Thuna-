"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/public-data", label: "Public Data" },
  { href: "/crime-map", label: "Crime Map" },
  { href: "/news", label: "Verify News" }
];

function isActive(pathname, href) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname.startsWith(href);
}

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/80 backdrop-blur-xl dark:border-darkLine dark:bg-darkCanvas/80">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="interactive-ring text-3xl font-black tracking-tight text-police dark:text-copperSoft">
            THUNA
          </Link>
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-2 sm:gap-4">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`interactive-ring rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-police text-white dark:bg-copperSoft dark:text-ink"
                    : "text-slateText hover:bg-police/5 hover:text-police dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-copperSoft"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle />
          <ThemeToggle />
          <Link
            href="/login"
            className="interactive-ring rounded-full border border-police bg-police px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-policeMuted dark:border-copperSoft dark:bg-copper dark:text-white dark:hover:bg-[#ad8427]"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";

export function Footer() {
  const links = [
    { href: "/public-data", label: "Public Records" },
    { href: "/news", label: "Verified Alerts" },
    { href: "/crime-map", label: "Crime Map" },
    { href: "/login", label: "Citizen Access" }
  ];

  return (
    <footer className="border-t border-line bg-white/80 backdrop-blur-sm dark:border-darkLine dark:bg-darkCanvas/80">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-slateText sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 dark:text-slate-300">
        <p>© 2026 THUNA | Kerala Police Crime Transparency Portal. Official public information interface.</p>
        <div className="flex flex-wrap gap-4">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-police dark:hover:text-copperSoft">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

import "./globals.css";
import { Footer } from "@/components/footer";
import { TopNav } from "@/components/top-nav";

export const metadata = {
  title: "THUNA Public Portal",
  description:
    "Public-facing crime transparency portal for analytics, case tracking, verified alerts, and read-only public access."
};

const themeBootScript = `
(() => {
  try {
    const storedTheme = localStorage.getItem("thuna-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = storedTheme ? storedTheme === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", shouldUseDark);
    document.documentElement.dataset.theme = shouldUseDark ? "dark" : "light";

    const storedLanguage = localStorage.getItem("thuna-language") || "bi";
    document.documentElement.dataset.language = storedLanguage;
  } catch (error) {
    document.documentElement.dataset.language = "bi";
  }
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning data-language="bi">
      <body className="min-h-screen bg-canvas text-ink antialiased dark:bg-darkCanvas dark:text-slate-100">
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <div className="relative flex min-h-screen flex-col overflow-x-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top,_rgba(17,40,79,0.14),_transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(234,215,164,0.12),_transparent_55%)]" />
          <TopNav />
          <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

import Link from "next/link";
import { BilingualText } from "@/components/portal-text";
import { newsItems } from "@/lib/data";

export const metadata = {
  title: "THUNA Verified News"
};

export default function NewsPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="portal-card p-6 lg:p-8">
        <p className="section-kicker">Verified News Feed</p>
        <BilingualText
          en="Official alerts, press notes, and fact-checked public advisories"
          ml="ഔദ്യോഗിക മുന്നറിയിപ്പുകൾ, അറിയിപ്പുകൾ, വസ്തുത പരിശോധിച്ച പൊതുജന സന്ദേശങ്ങൾ"
          enClassName="mt-4 text-4xl font-black tracking-tight text-ink dark:text-white"
          mlClassName="text-lg"
        />
        <p className="mt-6 max-w-3xl text-base leading-8 text-slateText dark:text-slate-300">
          Verified items come from official Kerala Police, traffic enforcement, and district communications channels.
        </p>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {newsItems.map((item) => (
          <article key={item.titleEn} className="portal-card flex h-full flex-col overflow-hidden">
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full border border-line bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-police dark:border-darkLine dark:bg-slate-900 dark:text-copperSoft">
                  {item.badge}
                </span>
                <span className="text-sm text-slateText dark:text-slate-300">{item.date}</span>
              </div>
              <BilingualText
                en={item.titleEn}
                ml={item.titleMl}
                enClassName="mt-6 text-2xl font-semibold leading-tight text-ink dark:text-white"
                mlClassName="text-base"
              />
              <p className="mt-5 flex-1 text-sm leading-7 text-slateText dark:text-slate-300">{item.summaryEn}</p>
            </div>
            <Link
              href={item.href}
              className="interactive-ring flex items-center justify-between border-t border-line px-6 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-police transition hover:bg-police hover:text-white dark:border-darkLine dark:text-copperSoft dark:hover:bg-copperSoft dark:hover:text-ink"
            >
              Read full report
              <span aria-hidden="true">↗</span>
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}

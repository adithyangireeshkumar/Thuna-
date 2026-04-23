import Link from "next/link";
import { DashboardSearch } from "@/components/dashboard-search";
import { BilingualText } from "@/components/portal-text";
import { StatusBadge } from "@/components/status-badge";
import { analytics, caseRecords, quickActions } from "@/lib/data";

const spotlightCases = caseRecords.slice(0, 3);

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="portal-card overflow-hidden">
        <div className="grid gap-8 px-6 py-8 lg:grid-cols-[1.3fr_0.9fr] lg:px-10 lg:py-10">
          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-police/15 bg-police/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-police dark:border-copperSoft/20 dark:bg-copperSoft/10 dark:text-copperSoft">
              Kerala Police Public Access
            </div>
            <div className="max-w-3xl space-y-4">
              <h1 className="text-4xl font-black tracking-tight text-ink sm:text-5xl dark:text-white">
                THUNA Public Crime Transparency Portal
              </h1>
              <BilingualText
                en="Read-only public access to crime trends, FIR lifecycle status, and verified law-enforcement updates."
                ml="കുറ്റകൃത്യ പ്രവണതകൾ, എഫ്‌.ഐ‌.ആർ നില, അന്വേഷണ പുരോഗതി, ഔദ്യോഗിക അറിയിപ്പുകൾ എന്നിവയ്ക്കുള്ള പൊതുജന വായനാവകാശ പോർട്ടൽ."
                enClassName="text-lg text-slateText dark:text-slate-300"
                mlClassName="text-lg"
              />
            </div>
            <DashboardSearch />
            <div className="grid gap-4 md:grid-cols-3">
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="interactive-ring rounded-2xl border border-line bg-slate-50/80 p-4 transition hover:-translate-y-0.5 hover:border-police hover:bg-white dark:border-darkLine dark:bg-slate-900/40 dark:hover:border-copperSoft dark:hover:bg-slate-900"
                >
                  <p className="section-kicker">{action.kicker}</p>
                  <div className="mt-3">
                    <BilingualText
                      en={action.titleEn}
                      ml={action.titleMl}
                      enClassName="text-lg font-semibold text-ink dark:text-white"
                      mlClassName="text-sm"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="grid gap-4 rounded-[28px] border border-police/10 bg-grid bg-[size:36px_36px] p-4 dark:border-copperSoft/10">
            {analytics.map((item) => (
              <article
                key={item.labelEn}
                className="rounded-2xl border border-line bg-white/90 p-5 dark:border-darkLine dark:bg-darkPanel"
              >
                <p className="value-label">{item.labelEn}</p>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <div>
                    <p className={`text-4xl font-black ${item.tone}`}>{item.value}</p>
                    <BilingualText
                      en={item.subEn}
                      ml={item.subMl}
                      enClassName="mt-2 text-sm text-slateText dark:text-slate-300"
                      mlClassName="text-sm"
                    />
                  </div>
                  <div className="rounded-2xl bg-slate-100 px-3 py-2 text-2xl dark:bg-slate-800">
                    {item.icon}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="portal-card p-6 lg:p-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="section-kicker">Public Case Tracking</p>
              <BilingualText
                en="Priority cases visible to citizens"
                ml="പൊതുജനങ്ങൾക്ക് കാണാവുന്ന മുൻഗണന കേസുകൾ"
                enClassName="mt-3 text-2xl font-bold text-ink dark:text-white"
                mlClassName="text-base"
              />
            </div>
            <Link
              href="/public-data"
              className="interactive-ring rounded-full border border-line px-4 py-2 text-sm font-semibold text-police transition hover:border-police hover:bg-police hover:text-white dark:border-darkLine dark:text-copperSoft dark:hover:border-copperSoft dark:hover:bg-copperSoft dark:hover:text-ink"
            >
              View all records
            </Link>
          </div>
          <div className="mt-6 grid gap-4">
            {spotlightCases.map((record) => (
              <Link
                key={record.id}
                href={`/public-data/${record.id}`}
                className="interactive-ring grid gap-4 rounded-2xl border border-line bg-slate-50/75 p-5 transition hover:border-police hover:bg-white dark:border-darkLine dark:bg-slate-900/40 dark:hover:border-copperSoft"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-3">
                    <p className="value-label">{record.firNumber}</p>
                    <BilingualText
                      en={record.categoryEn}
                      ml={record.categoryMl}
                      enClassName="text-2xl font-semibold text-ink dark:text-white"
                      mlClassName="text-base"
                    />
                    <div className="flex flex-wrap gap-4 text-sm text-slateText dark:text-slate-300">
                      <span>{record.date}</span>
                      <span>{record.station}</span>
                      <span>{record.district}</span>
                    </div>
                  </div>
                  <StatusBadge status={record.status} />
                </div>
                <p className="text-sm leading-7 text-slateText dark:text-slate-300">{record.summaryEn}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <section className="portal-card p-6">
            <p className="section-kicker">System Promises</p>
            <ul className="mt-5 grid gap-4 text-sm leading-7 text-slateText dark:text-slate-300">
              <li>Read-only public access with sensitive victim details redacted.</li>
              <li>Bilingual English and Malayalam presentation on every core route.</li>
              <li>Responsive layout for field users, media desks, and citizens on mobile.</li>
              <li>Designed for Next.js, Tailwind CSS, Supabase, and PostgreSQL integration.</li>
            </ul>
          </section>

          <section className="portal-card p-6">
            <p className="section-kicker">Operational Transparency</p>
            <div className="mt-5 space-y-4">
              {[
                {
                  title: "Complaint lifecycle",
                  detail: "Registered, under investigation, court, and closed milestones are surfaced as public-safe status signals."
                },
                {
                  title: "Institutional trust",
                  detail: "Officer, station, and district attribution are displayed to strengthen accountability."
                },
                {
                  title: "Scalable access",
                  detail: "Dashboard summaries and filters are optimized for high-traffic public information events."
                }
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-line p-4 dark:border-darkLine">
                  <h3 className="font-semibold text-ink dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slateText dark:text-slate-300">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

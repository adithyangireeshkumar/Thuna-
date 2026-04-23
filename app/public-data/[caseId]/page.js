import Link from "next/link";
import { notFound } from "next/navigation";
import { BilingualText } from "@/components/portal-text";
import { StatusBadge } from "@/components/status-badge";
import { DownloadFirButton } from "@/components/download-fir-button";
import { findCaseById } from "@/lib/data";

export async function generateMetadata({ params }) {
  const record = findCaseById(params.caseId);
  return {
    title: record ? `${record.firNumber} | THUNA` : "Case Not Found | THUNA"
  };
}

export default function CaseDetailsPage({ params }) {
  const record = findCaseById(params.caseId);

  if (!record) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/public-data"
        className="interactive-ring inline-flex w-fit items-center gap-2 rounded-full border border-line bg-white/80 px-4 py-2 text-sm font-semibold text-slateText transition hover:border-police hover:text-police dark:border-darkLine dark:bg-darkPanel dark:text-slate-300 dark:hover:border-copperSoft dark:hover:text-copperSoft"
      >
        <span aria-hidden="true">←</span>
        Back to public records
      </Link>

      <section className="portal-card overflow-hidden">
        <div className="grid gap-8 px-6 py-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <p className="text-3xl font-black text-ink dark:text-white">{record.firNumber}</p>
              <StatusBadge status={record.status} />
            </div>
            <BilingualText
              en={record.categoryEn}
              ml={record.categoryMl}
              enClassName="text-2xl font-semibold text-ink dark:text-white"
              mlClassName="text-lg"
            />
            <p className="max-w-3xl text-sm leading-7 text-slateText dark:text-slate-300">{record.descriptionEn}</p>
          </div>
          <div className="flex items-start justify-end">
            <DownloadFirButton record={record} />
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <section className="portal-card p-6 lg:p-8">
            <div className="border-b border-line pb-4 dark:border-darkLine">
              <p className="section-kicker">Case Details</p>
              <BilingualText
                en="Public summary"
                ml="പൊതു സാരാംശം"
                enClassName="mt-3 text-2xl font-semibold text-ink dark:text-white"
                mlClassName="text-base"
              />
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div>
                <p className="value-label">IPC Sections</p>
                <div className="mt-2 rounded-2xl border border-line bg-slate-50 p-4 text-lg font-semibold dark:border-darkLine dark:bg-slate-900/40">
                  {record.sections.join(", ")}
                </div>
              </div>
              <div>
                <p className="value-label">Reported Date & Time</p>
                <div className="mt-2 rounded-2xl border border-line bg-slate-50 p-4 text-lg font-semibold dark:border-darkLine dark:bg-slate-900/40">
                  {record.reportedAt}
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="value-label">Incident Location</p>
                <div className="mt-2 rounded-2xl border border-line bg-slate-50 p-4 dark:border-darkLine dark:bg-slate-900/40">
                  <p className="font-semibold text-ink dark:text-white">{record.location.primary}</p>
                  <p className="mt-1 text-sm text-slateText dark:text-slate-300">{record.location.secondary}</p>
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="value-label">Public Description</p>
                <div className="mt-2 rounded-2xl border border-line bg-slate-50 p-4 leading-8 text-slateText dark:border-darkLine dark:bg-slate-900/40 dark:text-slate-300">
                  {record.descriptionEn}
                </div>
              </div>
            </div>
          </section>

          <section className="portal-card p-6 lg:p-8">
            <div className="border-b border-line pb-4 dark:border-darkLine">
              <p className="section-kicker">Investigation Timeline</p>
              <BilingualText
                en="Citizen-visible follow-ups"
                ml="പൗരന്മാർക്ക് കാണാവുന്ന അന്വേഷണ നവീകരണങ്ങൾ"
                enClassName="mt-3 text-2xl font-semibold text-ink dark:text-white"
                mlClassName="text-base"
              />
            </div>
            <div className="mt-8 border-l-2 border-line pl-6 dark:border-darkLine">
              {record.timeline.map((event, index) => (
                <article key={`${event.date}-${index}`} className="relative pb-8 last:pb-0">
                  <span className="absolute -left-[33px] top-2 block h-4 w-4 rounded-full border-4 border-white bg-police dark:border-darkPanel dark:bg-copperSoft" />
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-bold text-ink dark:text-white">{event.date}</p>
                    <StatusBadge status={event.type} compact />
                  </div>
                  <div className="mt-3 rounded-2xl border border-line bg-slate-50 p-4 text-sm leading-7 text-slateText dark:border-darkLine dark:bg-slate-900/40 dark:text-slate-300">
                    {event.detailEn}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="portal-card p-6">
            <p className="section-kicker">Investigating Officer</p>
            <div className="mt-5 flex items-center gap-4 rounded-2xl border border-line bg-slate-50 p-4 dark:border-darkLine dark:bg-slate-900/40">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-police/10 text-2xl dark:bg-copperSoft/10">
                👮
              </div>
              <div>
                <p className="text-xl font-semibold text-ink dark:text-white">{record.officer.name}</p>
                <p className="text-sm text-slateText dark:text-slate-300">{record.officer.rank}</p>
              </div>
            </div>
            <div className="mt-4 grid gap-4">
              <div className="rounded-2xl border border-line p-4 dark:border-darkLine">
                <p className="value-label">Station Details</p>
                <p className="mt-2 font-semibold text-ink dark:text-white">{record.station}</p>
                <p className="text-sm text-slateText dark:text-slate-300">{record.district}</p>
              </div>
              <div className="rounded-2xl border border-line p-4 dark:border-darkLine">
                <p className="value-label">Contact Station</p>
                <p className="mt-2 font-semibold text-ink dark:text-white">{record.officer.contact}</p>
              </div>
            </div>
          </section>

          <section className="portal-card p-6">
            <p className="section-kicker">Transparency Note</p>
            <p className="mt-4 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm leading-7 text-police dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-100">
              This portal intentionally excludes protected personal details. Public summaries are redacted and published to support transparency without compromising investigation integrity.
            </p>
          </section>

          <section className="portal-card p-6">
            <p className="section-kicker">Case Snapshot</p>
            <div className="mt-4 grid gap-3">
              {[
                ["Case stage", record.statusLabelEn],
                ["Case type", record.categoryEn],
                ["Public station", record.station],
                ["District", record.district]
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-4 rounded-2xl border border-line px-4 py-3 dark:border-darkLine">
                  <span className="text-sm text-slateText dark:text-slate-300">{label}</span>
                  <span className="font-semibold text-ink dark:text-white">{value}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BilingualText } from "@/components/portal-text";
import { StatusBadge } from "@/components/status-badge";
import { caseRecords, districts, mapCategories } from "@/lib/data";

export function CrimeMapExplorer() {
  const [district, setDistrict] = useState("");
  const [category, setCategory] = useState("");

  const visibleCases = useMemo(
    () =>
      caseRecords.filter(
        (record) =>
          (!district || record.district === district) && (!category || record.categoryEn === category)
      ),
    [district, category]
  );

  const [activeId, setActiveId] = useState(visibleCases[0]?.id || caseRecords[0].id);
  const activeCase = visibleCases.find((item) => item.id === activeId) || visibleCases[0] || caseRecords[0];

  return (
    <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
      <aside className="portal-card h-fit p-6 xl:sticky xl:top-28">
        <p className="section-kicker">Map Filters</p>
        <BilingualText
          en="Interactive crime map"
          ml="ഇന്ററാക്ടീവ് കുറ്റമാപ്പ്"
          enClassName="mt-4 text-3xl font-black text-ink dark:text-white"
          mlClassName="text-base"
        />
        <div className="mt-6 grid gap-5">
          <div>
            <label className="value-label" htmlFor="map-district">
              District
            </label>
            <select
              id="map-district"
              value={district}
              onChange={(event) => {
                setDistrict(event.target.value);
                setActiveId("");
              }}
              className="interactive-ring mt-2 w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm dark:border-darkLine dark:bg-darkPanel"
            >
              <option value="">All districts</option>
              {districts.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="value-label" htmlFor="map-category">
              Category
            </label>
            <select
              id="map-category"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
                setActiveId("");
              }}
              className="interactive-ring mt-2 w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm dark:border-darkLine dark:bg-darkPanel"
            >
              <option value="">All categories</option>
              {mapCategories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <p className="value-label">Visible reports</p>
          {visibleCases.map((record) => (
            <button
              key={record.id}
              type="button"
              onClick={() => setActiveId(record.id)}
              className={`interactive-ring w-full rounded-2xl border px-4 py-3 text-left transition ${
                record.id === activeCase?.id
                  ? "border-police bg-police text-white dark:border-copperSoft dark:bg-copperSoft dark:text-ink"
                  : "border-line bg-white hover:border-police hover:bg-slate-50 dark:border-darkLine dark:bg-darkPanel dark:hover:border-copperSoft"
              }`}
            >
              <p className="text-xs font-bold uppercase tracking-[0.24em]">{record.firNumber}</p>
              <p className="mt-2 font-semibold">{record.categoryEn}</p>
              <p className="mt-1 text-sm opacity-80">{record.station}</p>
            </button>
          ))}
        </div>
      </aside>

      <section className="grid gap-6">
        <div className="portal-card overflow-hidden p-4 lg:p-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="relative min-h-[560px] rounded-[28px] border border-line bg-[radial-gradient(circle_at_20%_20%,_rgba(17,40,79,0.12),_transparent_18%),_linear-gradient(180deg,_rgba(220,239,244,0.95),_rgba(232,241,236,0.95))] p-6 dark:border-darkLine dark:bg-[radial-gradient(circle_at_20%_20%,_rgba(234,215,164,0.12),_transparent_18%),_linear-gradient(180deg,_rgba(17,29,48,0.98),_rgba(10,21,37,0.98))]">
              <div className="absolute right-4 top-4 grid gap-3">
                {["+", "−", "◎"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="interactive-ring h-12 w-12 rounded-2xl border border-line bg-white text-xl font-semibold text-police dark:border-darkLine dark:bg-darkPanel dark:text-copperSoft"
                  >
                    {item}
                  </button>
                ))}
              </div>

              {visibleCases.map((record) => (
                <button
                  key={record.id}
                  type="button"
                  onClick={() => setActiveId(record.id)}
                  style={{
                    left: `${record.map.x}%`,
                    top: `${record.map.y}%`
                  }}
                  className={`interactive-ring absolute flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[24px] border text-lg font-black transition ${
                    record.id === activeCase?.id
                      ? "border-alert bg-alertSoft text-alert shadow-panel dark:border-red-700 dark:bg-red-950/50 dark:text-red-100"
                      : "border-police/20 bg-white/90 text-police hover:border-police dark:border-copperSoft/20 dark:bg-darkPanel dark:text-copperSoft dark:hover:border-copperSoft"
                  }`}
                >
                  {record.map.intensity}
                </button>
              ))}

              <div className="absolute bottom-4 right-4 rounded-2xl border border-line bg-white/90 p-4 text-sm dark:border-darkLine dark:bg-darkPanel/90">
                <p className="value-label">Legend</p>
                <div className="mt-3 grid gap-2 text-slateText dark:text-slate-300">
                  <span>● Reported crime cluster</span>
                  <span>◎ Police station anchor</span>
                  <span>Highlighted card = current preview</span>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-line bg-white/90 dark:border-darkLine dark:bg-darkPanel">
              <div className="rounded-t-[28px] bg-police px-6 py-6 text-white dark:bg-copper dark:text-ink">
                <p className="value-label text-white/70 dark:text-ink/70">{activeCase.firNumber}</p>
                <p className="mt-3 text-3xl font-bold">{activeCase.categoryEn}</p>
              </div>
              <div className="space-y-5 p-6">
                <div className="flex items-center justify-between gap-4 border-b border-line pb-4 dark:border-darkLine">
                  <span className="text-sm text-slateText dark:text-slate-300">Status</span>
                  <StatusBadge status={activeCase.status} compact />
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-line pb-4 dark:border-darkLine">
                  <span className="text-sm text-slateText dark:text-slate-300">Date</span>
                  <span className="font-semibold text-ink dark:text-white">{activeCase.date}</span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-line pb-4 dark:border-darkLine">
                  <span className="text-sm text-slateText dark:text-slate-300">Station</span>
                  <span className="text-right font-semibold text-ink dark:text-white">{activeCase.station}</span>
                </div>
                <p className="text-sm leading-7 text-slateText dark:text-slate-300">{activeCase.summaryEn}</p>
                <Link
                  href={`/public-data/${activeCase.id}`}
                  className="interactive-ring mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-police px-4 py-3 text-sm font-bold uppercase tracking-[0.22em] text-police transition hover:bg-police hover:text-white dark:border-copperSoft dark:text-copperSoft dark:hover:bg-copperSoft dark:hover:text-ink"
                >
                  View full details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

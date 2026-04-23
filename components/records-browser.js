"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BilingualText } from "@/components/portal-text";
import { StatusBadge } from "@/components/status-badge";
import { caseCategories, caseRecords, districts, statuses } from "@/lib/data";

function matches(record, query, district, status, category) {
  const haystack = [
    record.firNumber,
    record.categoryEn,
    record.categoryMl,
    record.station,
    record.district,
    record.summaryEn
  ]
    .join(" ")
    .toLowerCase();

  return (
    (!query || haystack.includes(query)) &&
    (!district || record.district === district) &&
    (!status || record.status === status) &&
    (!category || record.categoryEn === category)
  );
}

export function RecordsBrowser({ initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery.toLowerCase());
  const [district, setDistrict] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  const filteredRecords = useMemo(
    () => caseRecords.filter((record) => matches(record, query, district, status, category)),
    [query, district, status, category]
  );

  const activeFilters = [
    district ? `District: ${district}` : null,
    status ? `Status: ${statuses.find((item) => item.value === status)?.label}` : null,
    category ? `Category: ${category}` : null
  ].filter(Boolean);

  function clearFilters() {
    setDistrict("");
    setStatus("");
    setCategory("");
    setQuery("");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[300px_1fr]">
      <aside className="portal-card h-fit p-6 xl:sticky xl:top-28">
        <p className="section-kicker">Institutional Filters</p>
        <BilingualText
          en="Case search"
          ml="കേസ് തിരയൽ"
          enClassName="mt-4 text-3xl font-black text-ink dark:text-white"
          mlClassName="text-base"
        />
        <div className="mt-6 grid gap-5">
          <div>
            <label className="value-label" htmlFor="record-query">
              Keyword
            </label>
            <input
              id="record-query"
              value={query}
              onChange={(event) => setQuery(event.target.value.toLowerCase())}
              placeholder="FIR number, station, or keyword"
              className="interactive-ring mt-2 w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm dark:border-darkLine dark:bg-darkPanel"
            />
          </div>

          <div>
            <label className="value-label" htmlFor="district-filter">
              District
            </label>
            <select
              id="district-filter"
              value={district}
              onChange={(event) => setDistrict(event.target.value)}
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
            <label className="value-label" htmlFor="status-filter">
              Status
            </label>
            <select
              id="status-filter"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="interactive-ring mt-2 w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm dark:border-darkLine dark:bg-darkPanel"
            >
              <option value="">All statuses</option>
              {statuses.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="value-label" htmlFor="category-filter">
              Crime category
            </label>
            <select
              id="category-filter"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="interactive-ring mt-2 w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm dark:border-darkLine dark:bg-darkPanel"
            >
              <option value="">All categories</option>
              {caseCategories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="interactive-ring rounded-2xl border border-line px-4 py-3 text-sm font-semibold text-police transition hover:border-police hover:bg-police hover:text-white dark:border-darkLine dark:text-copperSoft dark:hover:border-copperSoft dark:hover:bg-copperSoft dark:hover:text-ink"
          >
            Clear all filters
          </button>
        </div>
      </aside>

      <section className="flex flex-col gap-6">
        <div className="portal-card p-6 lg:p-8">
          <div className="flex flex-col gap-4 border-b border-line pb-6 dark:border-darkLine lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-kicker">Public Crime Records</p>
              <BilingualText
                en="Browse searchable, read-only case summaries"
                ml="തിരയാവുന്ന, വായിക്കാവുന്ന പൊതു കേസ് സാരാംശങ്ങൾ"
                enClassName="mt-4 text-4xl font-black tracking-tight text-ink dark:text-white"
                mlClassName="text-lg"
              />
            </div>
            <div className="rounded-2xl border border-line bg-slate-50 px-4 py-3 text-sm text-slateText dark:border-darkLine dark:bg-slate-900/40 dark:text-slate-300">
              {filteredRecords.length} record{filteredRecords.length === 1 ? "" : "s"} available
            </div>
          </div>

          {activeFilters.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-3">
              {activeFilters.map((filter) => (
                <span
                  key={filter}
                  className="rounded-full border border-line bg-slate-50 px-4 py-2 text-sm font-medium text-slateText dark:border-darkLine dark:bg-slate-900/40 dark:text-slate-200"
                >
                  {filter}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-5 lg:grid-cols-2 2xl:grid-cols-3">
          {filteredRecords.map((record) => (
            <article key={record.id} className="portal-card flex h-full flex-col overflow-hidden">
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="value-label">{record.firNumber}</p>
                    <p className="mt-2 text-sm text-slateText dark:text-slate-300">{record.date}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-100 px-3 py-2 text-xl dark:bg-slate-800">📄</div>
                </div>

                <BilingualText
                  en={record.categoryEn}
                  ml={record.categoryMl}
                  enClassName="mt-6 text-2xl font-semibold text-ink dark:text-white"
                  mlClassName="text-base"
                />

                <p className="mt-4 text-sm leading-7 text-slateText dark:text-slate-300">{record.summaryEn}</p>

                <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-slateText dark:text-slate-300">
                  <span>{record.station}</span>
                  <span>•</span>
                  <span>{record.district}</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-line bg-slate-50/80 px-6 py-4 dark:border-darkLine dark:bg-slate-900/40">
                <StatusBadge status={record.status} />
                <Link
                  href={`/public-data/${record.id}`}
                  className="interactive-ring text-sm font-bold uppercase tracking-[0.22em] text-police transition hover:text-policeMuted dark:text-copperSoft dark:hover:text-white"
                >
                  Details →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredRecords.length === 0 && (
          <div className="portal-card p-10 text-center">
            <p className="text-5xl">🔎</p>
            <p className="mt-4 text-2xl font-semibold text-ink dark:text-white">No public records matched your filters.</p>
            <p className="mt-3 text-sm text-slateText dark:text-slate-300">
              Try widening the district, status, or keyword criteria to continue.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function DashboardSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    const encoded = encodeURIComponent(query.trim());
    router.push(encoded ? `/public-data?q=${encoded}` : "/public-data");
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-[1fr_auto]">
      <label className="sr-only" htmlFor="dashboard-search">
        Search by FIR number, station, or keyword
      </label>
      <input
        id="dashboard-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by case number, station, district, or keyword"
        className="interactive-ring w-full rounded-2xl border border-line bg-white px-5 py-4 text-base text-ink placeholder:text-slate-400 dark:border-darkLine dark:bg-darkPanel dark:text-white"
      />
      <button
        type="submit"
        className="interactive-ring rounded-2xl bg-police px-6 py-4 text-sm font-bold uppercase tracking-[0.24em] text-white transition hover:bg-policeMuted dark:bg-copper dark:hover:bg-[#ad8427]"
      >
        Search portal
      </button>
    </form>
  );
}

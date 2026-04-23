"use client";

import { useEffect, useState } from "react";

const languageOrder = ["bi", "en", "ml"];
const languageLabel = {
  bi: "EN + ML",
  en: "English",
  ml: "മലയാളം"
};

export function LanguageToggle() {
  const [language, setLanguage] = useState("bi");

  useEffect(() => {
    const stored = document.documentElement.dataset.language || "bi";
    setLanguage(stored);
  }, []);

  function cycleLanguage() {
    const currentIndex = languageOrder.indexOf(language);
    const nextLanguage = languageOrder[(currentIndex + 1) % languageOrder.length];
    document.documentElement.dataset.language = nextLanguage;
    localStorage.setItem("thuna-language", nextLanguage);
    setLanguage(nextLanguage);
  }

  return (
    <button
      type="button"
      onClick={cycleLanguage}
      className="interactive-ring rounded-full border border-line bg-white px-3 py-2 text-sm font-semibold text-police transition hover:border-police hover:bg-police hover:text-white dark:border-darkLine dark:bg-darkPanel dark:text-copperSoft dark:hover:border-copperSoft dark:hover:bg-copperSoft dark:hover:text-ink"
      aria-label="Toggle language display"
    >
      {languageLabel[language]}
    </button>
  );
}
